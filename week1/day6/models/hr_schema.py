from pydantic import BaseModel, Field


class HRRequirements(BaseModel):
    """
    Structured representation of a job description.
    """

    job_title: str = Field(
        default="",
        description="Job title"
    )

    required_skills: list[str] = Field(
        default_factory=list,
        description="Skills required for the job"
    )

    preferred_skills: list[str] = Field(
        default_factory=list,
        description="Nice-to-have skills"
    )

    experience: str = Field(
        default="",
        description="Required years or level of experience"
    )

    education: str = Field(
        default="",
        description="Required education"
    )

    certifications: list[str] = Field(
        default_factory=list,
        description="Required certifications"
    )

    responsibilities: list[str] = Field(
        default_factory=list,
        description="Main job responsibilities"
    )