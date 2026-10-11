from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _failed(data: dict) -> list[str]:
    return [check["name"] for check in data["checks"] if not check["passed"]]


def test_lists_samples() -> None:
    response = client.get("/api/demos/invoices")
    assert response.status_code == 200
    assert [s["id"] for s in response.json()] == ["clean", "transposed-total", "missing-number"]


def test_clean_invoice_is_valid() -> None:
    response = client.post("/api/demos/invoice", json={"sample_id": "clean"})
    data = response.json()
    assert response.status_code == 200
    assert data["is_sample"] is True
    assert data["valid"] is True
    assert _failed(data) == []


def test_transposed_total_fails_total_check_only() -> None:
    data = client.post("/api/demos/invoice", json={"sample_id": "transposed-total"}).json()
    assert data["valid"] is False
    assert _failed(data) == ["Subtotal plus tax equals total"]


def test_missing_number_fails_number_check_only() -> None:
    data = client.post("/api/demos/invoice", json={"sample_id": "missing-number"}).json()
    assert data["valid"] is False
    assert _failed(data) == ["Invoice number present"]


def test_unknown_sample_returns_404() -> None:
    response = client.post("/api/demos/invoice", json={"sample_id": "nope"})
    assert response.status_code == 404
