from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.contact import router as contact_router
from app.api.health import router as health_router
from app.config import settings

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(health_router, prefix="/api")
app.include_router(contact_router, prefix="/api")
