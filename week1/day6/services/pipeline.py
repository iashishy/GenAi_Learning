from pathlib import Path

from services.file_reader import read_file
from services.llm_parser import (
    extract_resume,
    extract_hr_requirements,
)
from services.matcher import match_resume
from services.report_generator import generate_report


def analyze_resumes(job_description: str, resume_paths: list[Path]):
    """
    Complete AI Resume Matching Pipeline
    """

    hr = extract_hr_requirements(job_description)

    results = []

    for resume_path in resume_paths:

        text = read_file(resume_path)

        resume = extract_resume(text)

        match = match_resume(resume, hr)

        generate_report(match)

        results.append(match)

    results.sort(
        key=lambda x: x.overall_score,
        reverse=True,
    )

    return results