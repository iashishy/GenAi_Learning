import json
import os
import time

from dotenv import load_dotenv

from models.hr_schema import HRRequirements
from models.match_schema import MatchResult
from models.resume_schema import Resume
from services.llm_parser import MODEL, client
from utils.logger import logger

load_dotenv()

REQUEST_DELAY = float(
    os.getenv("REQUEST_DELAY", "0")
)

def match_resume(
    resume: Resume,
    requirements: HRRequirements,
) -> MatchResult:

    logger.info(f"Matching resume: {resume.name}")

    system_prompt = """
You are an experienced ATS and HR recruiter.

You will receive:

1. Structured Job Description
2. Structured Candidate Resume

Evaluate the candidate considering:

- Required skills
- Preferred skills
- Experience
- Education
- Certifications
- Projects

Scoring Guidelines:

90-100:
Excellent match.
Candidate satisfies almost all requirements.

75-89:
Good match.
Missing only a few skills.

50-74:
Average match.
Needs improvement in several areas.

Below 50:
Poor match.

Return ONLY valid JSON.

{
    "candidate_name":"",
    "job_title":"",
    "overall_score":0,
    "strengths":[],
    "missing_skills":[],
    "summary":"",
    "recommendation":""
}
"""

    user_prompt = f"""
Job Description

{requirements.model_dump_json(indent=2)}

Candidate Resume

{resume.model_dump_json(indent=2)}
"""

    try:

        if REQUEST_DELAY > 0:
            logger.info(
                f"Waiting {REQUEST_DELAY} seconds..."
            )
            time.sleep(REQUEST_DELAY)

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
            temperature=0,
            response_format={
                "type": "json_object"
            },
        )

        data = json.loads(
            response.choices[0].message.content
        )

        return MatchResult.model_validate(data)

    except Exception as e:

        logger.error(e)

        return MatchResult(
            candidate_name=resume.name,
            job_title=requirements.job_title,
            summary="Unable to evaluate candidate.",
            recommendation="Manual Review Required",
        )