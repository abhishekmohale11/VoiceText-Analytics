from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.get("/status")
def api_status():
    return {
        "message": "VoiceText Analytics API is working",
        "status": "ready"
    }