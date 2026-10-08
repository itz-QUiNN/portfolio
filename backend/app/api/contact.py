from fastapi import APIRouter

from app.schemas.contact import ContactRequest, ContactResponse
from app.services.contact import deliver_contact

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
def submit_contact(request: ContactRequest) -> ContactResponse:
    if request.website:
        # Honeypot tripped: pretend success, send nothing.
        return ContactResponse(status="ok")
    deliver_contact(request)
    return ContactResponse(status="ok")
