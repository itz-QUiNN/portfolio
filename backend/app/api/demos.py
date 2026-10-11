from fastapi import APIRouter, HTTPException, Request

from app.limiter import limiter
from app.schemas.demo import YouTubeDemoRequest, YouTubeDemoResponse
from app.schemas.invoice import InvoiceDemoRequest, InvoiceDemoResponse, InvoiceSample
from app.services.invoice_demo import UnknownSample, analyze, list_samples
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


@router.get("/demos/invoices", response_model=list[InvoiceSample])
@limiter.limit("60/minute")
def invoice_samples(request: Request) -> list[InvoiceSample]:
    return list_samples()


@router.post("/demos/invoice", response_model=InvoiceDemoResponse)
@limiter.limit("20/minute")
def invoice_demo(request: Request, body: InvoiceDemoRequest) -> InvoiceDemoResponse:
    try:
        return analyze(body.sample_id)
    except UnknownSample:
        raise HTTPException(status_code=404, detail="Unknown sample") from None
