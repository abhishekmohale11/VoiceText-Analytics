from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="VoiceText Analytics API",
    description="Multimodal speech and text analysis platform",
    version="0.1.0"
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "project": "VoiceText Analytics",
        "status": "running",
        "version": "0.1.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }