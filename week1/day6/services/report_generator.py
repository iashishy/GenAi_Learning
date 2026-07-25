import json
from pathlib import Path

from models.match_schema import MatchResult
from utils.logger import logger


REPORTS_FOLDER = Path("reports")
MASTER_REPORT = REPORTS_FOLDER / "results.json"


def _sanitize_filename(name: str) -> str:
    """
    Converts a candidate name into a safe filename.
    """

    return (
        name.strip()
        .replace(" ", "_")
        .replace("/", "_")
        .replace("\\", "_")
    )


def generate_report(result: MatchResult) -> Path:
    """
    Saves an individual candidate report as JSON.

    Also updates the master results.json file.

    Returns:
        Path to the generated report.
    """

    REPORTS_FOLDER.mkdir(exist_ok=True)

    filename = (
        f"{_sanitize_filename(result.candidate_name)}"
        f"_{result.candidate_id[:8]}"
    )

    report_path = REPORTS_FOLDER / f"{filename}.json"

    # Save individual report
    with report_path.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            result.model_dump(),
            file,
            indent=4,
            ensure_ascii=False,
        )

    logger.info(f"Generated report: {report_path}")

    update_master_report(result)

    return report_path


def update_master_report(result: MatchResult) -> None:
    """
    Updates the master results.json file.

    If the same candidate already exists,
    their report is updated instead of duplicated.
    """

    REPORTS_FOLDER.mkdir(exist_ok=True)

    if MASTER_REPORT.exists():

        with MASTER_REPORT.open(
            "r",
            encoding="utf-8",
        ) as file:

            try:
                reports = json.load(file)

            except json.JSONDecodeError:
                reports = []

    else:
        reports = []

    # Remove previous report for the same candidate ID
    reports = [
        report
        for report in reports
        if report["candidate_id"] != result.candidate_id
    ]

    # Add current report
    reports.append(result.model_dump())

    # Highest ATS score first
    reports.sort(
        key=lambda report: report["overall_score"],
        reverse=True,
    )

    with MASTER_REPORT.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            reports,
            file,
            indent=4,
            ensure_ascii=False,
        )

    logger.info("Master report updated.")