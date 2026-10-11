from fastapi import APIRouter, HTTPException, Request

from app.limiter import limiter
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.contact import DeliveryError, deliver_contact

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
@limiter.limit("5/minute")
def submit_contact(request: Request, body: ContactRequest) -> ContactResponse:
    if body.website:
        # Honeypot tripped: pretend success, send nothing.
        return ContactResponse(status="ok")
    try:
        deliver_contact(body)
    except DeliveryError:
        raise HTTPException(status_code=502, detail="Could not deliver message") from None
    return ContactResponse(status="ok")
