import json
import os

from dotenv import load_dotenv
from groq import Groq

from models.hr_schema import HRRequirements
from models.resume_schema import Resume
from utils.logger import logger

# Load environment variables
load_dotenv()

# Create Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# LLM model
MODEL = "llama-3.3-70b-versatile"


def extract_resume(resume_text: str) -> Resume:
    """
    Converts resume text into a structured Resume object using the LLM.
    """

    logger.info("Extracting resume information using LLM...")

    schema = Resume.model_json_schema()

    system_prompt = f"""
You are an AI Resume Parser.

Extract all candidate information from the resume.

Return ONLY valid JSON.

If any field is missing:
- Use an empty string ("") for string fields.
- Use an empty list ([]) for list fields.

The JSON must strictly follow this schema:

{schema}
"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": resume_text,
                },
            ],
            temperature=0,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content

        data = json.loads(content)

        return Resume.model_validate(data)

    except Exception as e:
        logger.error(f"Error extracting resume: {e}")
        return Resume()


def extract_hr_requirements(job_description: str) -> HRRequirements:
    """
    Converts a job description into a structured HRRequirements object using the LLM.
    """

    logger.info("Extracting HR requirements using LLM...")

    schema = HRRequirements.model_json_schema()

    system_prompt = f"""
You are an AI HR Assistant.

Extract all important job requirements from the job description.

Return ONLY valid JSON.

If any field is missing:
- Use an empty string ("") for string fields.
- Use an empty list ([]) for list fields.

The JSON must strictly follow this schema:

{schema}
"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": job_description,
                },
            ],
            temperature=0,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content

        data = json.loads(content)

        return HRRequirements.model_validate(data)

    except Exception as e:
        logger.error(f"Error extracting HR requirements: {e}")
        return HRRequirements()