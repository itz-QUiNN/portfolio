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


def test_contact_is_rate_limited() -> None:
    for _ in range(5):
        assert client.post("/api/contact", json=VALID).status_code == 200
    assert client.post("/api/contact", json=VALID).status_code == 429


def test_oversized_body_rejected() -> None:
    response = client.post("/api/contact", json={**VALID, "message": "x" * 20_000})
    assert response.status_code == 413


def test_security_headers_present() -> None:
    response = client.get("/api/health")
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"
