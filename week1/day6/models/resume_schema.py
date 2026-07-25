from pydantic import BaseModel, Field


class Resume(BaseModel):
    """
    Structured representation of a candidate's resume.
    """

    name: str = Field(
        default="",
        description="Candidate's full name"
    )

    email: str = Field(
        default="",
        description="Candidate's email address"
    )

    phone: str = Field(
        default="",
        description="Candidate's phone number"
    )

    skills: list[str] = Field(
        default_factory=list,
        description="List of technical and soft skills"
    )

    projects: list[str] = Field(
        default_factory=list,
        description="Projects completed by the candidate"
    )

    experience: list[str] = Field(
        default_factory=list,
        description="Work experience"
    )

    education: list[str] = Field(
        default_factory=list,
        description="Educational qualifications"
    )

    certifications: list[str] = Field(
        default_factory=list,
        description="Professional certifications"
    )