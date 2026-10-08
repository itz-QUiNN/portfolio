from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

VALID = {
    "name": "Test User",
    "email": "test@example.com",
    "project_type": "scraping",
    "budget": "unsure",
    "message": "I need data from a website.",
}


def test_contact_ok() -> None:
    response = client.post("/api/contact", json=VALID)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_contact_rejects_bad_email() -> None:
    response = client.post("/api/contact", json={**VALID, "email": "nope"})
    assert response.status_code == 422


def test_contact_rejects_short_message() -> None:
    response = client.post("/api/contact", json={**VALID, "message": "short"})
    assert response.status_code == 422


def test_contact_honeypot_returns_ok() -> None:
    response = client.post("/api/contact", json={**VALID, "website": "spam.example"})
    assert response.status_code == 200
