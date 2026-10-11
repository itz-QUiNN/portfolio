from fastapi import APIRouter, HTTPException, Request

from app.limiter import limiter
from app.schemas.demo import YouTubeDemoRequest, YouTubeDemoResponse
from app.services.youtube_demo import InvalidYouTubeUrl, build_sample, extract_video_id

router = APIRouter()


@router.post("/demos/youtube", response_model=YouTubeDemoResponse)
@limiter.limit("20/minute")
def youtube_demo(request: Request, body: YouTubeDemoRequest) -> YouTubeDemoResponse:
    try:
        video_id = extract_video_id(body.url)
    except InvalidYouTubeUrl:
        raise HTTPException(status_code=422, detail="Not a valid YouTube video URL") from None
    return build_sample(video_id)
