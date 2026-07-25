from uuid import uuid4

from pydantic import BaseModel, Field


class MatchResult(BaseModel):
    candidate_id: str = Field(
        default_factory=lambda: str(uuid4())
    )

    candidate_name: str = Field(default="")

    job_title: str = Field(default="")

    overall_score: float = Field(default=0.0)

    strengths: list[str] = Field(default_factory=list)

    missing_skills: list[str] = Field(default_factory=list)

    summary: str = Field(default="")

    recommendation: str = Field(default="")