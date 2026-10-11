from pydantic import BaseModel, Field


class YouTubeDemoRequest(BaseModel):
    url: str = Field(min_length=1, max_length=200)


class Chapter(BaseModel):
    start_seconds: int
    title: str


class TranscriptSegment(BaseModel):
    start_seconds: int
    text: str


class YouTubeDemoResponse(BaseModel):
    is_sample: bool
    video_id: str
    metadata: dict[str, str | int]
    chapters: list[Chapter]
    transcript: list[TranscriptSegment]
