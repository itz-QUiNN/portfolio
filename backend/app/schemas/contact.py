from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    project_type: Literal["scraping", "automation", "data-pipeline", "other"]
    budget: Literal["under-500", "500-2000", "2000-5000", "5000-plus", "unsure"]
    message: str = Field(min_length=10, max_length=5000)
    website: str = ""  # honeypot, real users leave this empty


class ContactResponse(BaseModel):
    status: Literal["ok"]
