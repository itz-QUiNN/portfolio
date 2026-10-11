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


def _configure(monkeypatch) -> None:
    from app.config import settings

    monkeypatch.setattr(settings, "resend_api_key", "test-key")
    monkeypatch.setattr(settings, "contact_to", "me@example.com")


def test_contact_sends_email(monkeypatch) -> None:
    _configure(monkeypatch)
    calls = []

    class FakeResponse:
        def raise_for_status(self) -> None:
            pass

    def fake_post(url, **kwargs):
        calls.append((url, kwargs))
        return FakeResponse()

    monkeypatch.setattr("app.services.contact.httpx.post", fake_post)

    response = client.post("/api/contact", json=VALID)

    assert response.status_code == 200
    assert len(calls) == 1
    sent = calls[0][1]["json"]
    assert sent["to"] == ["me@example.com"]
    assert sent["reply_to"] == "test@example.com"


def test_contact_delivery_failure_returns_502(monkeypatch) -> None:
    import httpx

    _configure(monkeypatch)

    def fail(*args, **kwargs):
        raise httpx.ConnectError("boom")

    monkeypatch.setattr("app.services.contact.httpx.post", fail)

    response = client.post("/api/contact", json=VALID)

    assert response.status_code == 502
