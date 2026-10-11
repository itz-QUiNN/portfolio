import logging

import httpx

from app.config import settings
from app.schemas.contact import ContactRequest

logger = logging.getLogger(__name__)

RESEND_URL = "https://api.resend.com/emails"


class DeliveryError(Exception):
    pass


def _one_line(value: str) -> str:
    return " ".join(value.split())


def deliver_contact(request: ContactRequest) -> None:
    if not (settings.resend_api_key and settings.contact_to):
        logger.info(
            "Contact request from %s <%s> [%s, %s] (email not configured)",
            request.name,
            request.email,
            request.project_type,
            request.budget,
        )
        return

    body = (
        f"Name: {request.name}\n"
        f"Email: {request.email}\n"
        f"Project type: {request.project_type}\n"
        f"Budget: {request.budget}\n\n"
        f"{request.message}\n"
    )
    payload = {
        "from": settings.contact_from,
        "to": [settings.contact_to],
        "reply_to": request.email,
        "subject": f"Project enquiry: {_one_line(request.name)}",
        "text": body,
    }
    try:
        response = httpx.post(
            RESEND_URL,
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json=payload,
            timeout=10,
        )
        response.raise_for_status()
    except httpx.HTTPError as exc:
        logger.error("Contact delivery failed: %s", exc)
        raise DeliveryError from exc
