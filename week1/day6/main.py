from pathlib import Path

from services.file_reader import get_resume_files, read_file
from services.llm_parser import (
    extract_hr_requirements,
    extract_resume,
)
from services.matcher import match_resume
from services.report_generator import generate_report
from utils.logger import logger


HR_FILE = Path("hr") / "backend.txt"


def main() -> None:
    """
    AI Resume Matcher

    Workflow:

    1. Read Job Description
    2. Parse Job Description
    3. Scan Resume Folder
    4. Parse Each Resume
    5. Match Resume Against Job
    6. Generate JSON Report
    """

    logger.info("=" * 60)
    logger.info("Starting AI Resume Matcher")
    logger.info("=" * 60)

    # ----------------------------------------------------
    # Read HR Job Description
    # ----------------------------------------------------

    if not HR_FILE.exists():
        logger.error(f"Job description not found: {HR_FILE}")
        return

    logger.info("Reading job description...")

    job_description = HR_FILE.read_text(
        encoding="utf-8"
    )

    logger.info("Parsing job description...")

    requirements = extract_hr_requirements(
        job_description
    )

    logger.info(
        f"Job Title: {requirements.job_title}"
    )

    # ----------------------------------------------------
    # Find Resume Files
    # ----------------------------------------------------

    resume_files = get_resume_files()

    if not resume_files:
        logger.warning("No resume files found.")
        return

    logger.info(
        f"Found {len(resume_files)} resume(s)."
    )

    processed = 0

    # ----------------------------------------------------
    # Process Each Resume
    # ----------------------------------------------------

    for resume_path in resume_files:

        logger.info("-" * 60)
        logger.info(
            f"Processing: {resume_path.name}"
        )

        try:

            # Read Resume

            resume_text = read_file(
                resume_path
            )

            # Parse Resume

            resume = extract_resume(
                resume_text
            )

            # Match Resume

            result = match_resume(
                resume,
                requirements,
            )

            # Generate Report

            report_path = generate_report(
                result
            )

            logger.info(
                f"ATS Score : {result.overall_score}"
            )

            logger.info(
                f"Recommendation : {result.recommendation}"
            )

            logger.info(
                f"Report Saved : {report_path}"
            )

            processed += 1

        except Exception as e:

            logger.exception(
                f"Failed to process {resume_path.name}: {e}"
            )

    logger.info("=" * 60)
    logger.info(
        f"Completed Successfully ({processed}/{len(resume_files)})"
    )
    logger.info("=" * 60)


if __name__ == "__main__":
    main()