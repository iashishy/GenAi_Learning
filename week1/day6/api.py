from pathlib import Path
import shutil
from typing import Annotated

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from services.pipeline import analyze_resumes

app = FastAPI(title="AI Resume Matcher")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = Path("temp_uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@app.get("/")
def home():
    return {"status": "API Running"}


@app.post("/analyze")
async def analyze(
    job_description: Annotated[str, Form()],
    files: Annotated[list[UploadFile], File()],
):
    paths = []

    for file in files:
        path = UPLOAD_FOLDER / file.filename

        with open(path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        paths.append(path)

    results = analyze_resumes(job_description, paths)

    for path in paths:
        path.unlink(missing_ok=True)

    return {
        "success": True,
        "total_candidates": len(results),
        "candidates": [
           result.model_dump(mode="json")
           for result in results
    ]
}