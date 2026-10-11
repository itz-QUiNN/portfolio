import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.youtube_demo import InvalidYouTubeUrl, extract_video_id

client = TestClient(app)


@pytest.mark.parametrize(
    "url",
    [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://youtu.be/dQw4w9WgXcQ",
        "http://m.youtube.com/watch?v=dQw4w9WgXcQ&t=10",
    ],
)
def test_extracts_video_id(url: str) -> None:
    assert extract_video_id(url) == "dQw4w9WgXcQ"


@pytest.mark.parametrize(
    "url",
    [
        "https://evil.example/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=short",
        "ftp://youtube.com/watch?v=dQw4w9WgXcQ",
        "not a url",
    ],
)
def test_rejects_bad_urls(url: str) -> None:
    with pytest.raises(InvalidYouTubeUrl):
        extract_video_id(url)


def test_demo_endpoint_returns_sample() -> None:
    response = client.post("/api/demos/youtube", json={"url": "https://youtu.be/dQw4w9WgXcQ"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_sample"] is True
    assert data["video_id"] == "dQw4w9WgXcQ"


def test_demo_endpoint_rejects_bad_url() -> None:
    response = client.post("/api/demos/youtube", json={"url": "https://example.com"})
    assert response.status_code == 422
