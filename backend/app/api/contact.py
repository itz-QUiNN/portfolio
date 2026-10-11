from fastapi import APIRouter, HTTPException

from app.schemas.contact import ContactRequest, ContactResponse
from app.services.contact import DeliveryError, deliver_contact

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
def submit_contact(request: ContactRequest) -> ContactResponse:
    if request.website:
        # Honeypot tripped: pretend success, send nothing.
        return ContactResponse(status="ok")
    try:
        deliver_contact(request)
    except DeliveryError:
        raise HTTPException(status_code=502, detail="Could not deliver message") from None
    return ContactResponse(status="ok")
