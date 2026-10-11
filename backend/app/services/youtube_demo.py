import re
from urllib.parse import parse_qs, urlparse

from app.schemas.demo import Chapter, TranscriptSegment, YouTubeDemoResponse

VIDEO_ID = re.compile(r"^[A-Za-z0-9_-]{11}$")
HOSTS = {"youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"}


class InvalidYouTubeUrl(ValueError):
    pass


def extract_video_id(url: str) -> str:
    parsed = urlparse(url.strip())
    if parsed.scheme not in {"http", "https"} or parsed.hostname not in HOSTS:
        raise InvalidYouTubeUrl
    if parsed.hostname == "youtu.be":
        candidate = parsed.path.lstrip("/")
    else:
        candidate = parse_qs(parsed.query).get("v", [""])[0]
    if not VIDEO_ID.match(candidate):
        raise InvalidYouTubeUrl
    return candidate


def build_sample(video_id: str) -> YouTubeDemoResponse:
    return YouTubeDemoResponse(
        is_sample=True,
        video_id=video_id,
        metadata={
            "title": "Sample video title",
            "channel": "Sample channel",
            "duration_seconds": 600,
            "view_count": 12345,
        },
        chapters=[
            Chapter(start_seconds=0, title="Introduction"),
            Chapter(start_seconds=120, title="Main topic"),
            Chapter(start_seconds=480, title="Summary"),
        ],
        transcript=[
            TranscriptSegment(start_seconds=0, text="Sample transcript line one."),
            TranscriptSegment(start_seconds=6, text="Sample transcript line two."),
        ],
    )
