import logging

from app.schemas.contact import ContactRequest

logger = logging.getLogger(__name__)


def deliver_contact(request: ContactRequest) -> None:
    """Dev stub: log instead of sending. Replace with real email delivery."""
    logger.info(
        "Contact request from %s <%s> [%s, %s]",
        request.name,
        request.email,
        request.project_type,
        request.budget,
    )
