from pathlib import Path

import fitz
from docx import Document

from utils.logger import logger


SUPPORTED_EXTENSIONS = {".pdf", ".docx"}

def read_pdf(file_path: Path) -> str:
    """
    Reads a PDF file and returns all extracted text.
    """

    logger.info(f"Reading PDF: {file_path.name}")

    try:
        pages = []

        with fitz.open(file_path) as document:
            for page in document:
                text = page.get_text()

                if text.strip():
                    pages.append(text)

        return "\n".join(pages)

    except Exception as e:
        logger.error(f"Error reading PDF '{file_path.name}': {e}")
        return ""
    
def read_docx(file_path: Path) -> str:
    """
    Reads a DOCX file and returns all extracted text.
    """

    logger.info(f"Reading DOCX: {file_path.name}")

    try:
        document = Document(file_path)

        paragraphs = []

        for paragraph in document.paragraphs:
            text = paragraph.text.strip()

            if text:
                paragraphs.append(text)

        return "\n".join(paragraphs)

    except Exception as e:
        logger.error(f"Error reading DOCX '{file_path.name}': {e}")
        return ""
    
def read_file(file_path: Path) -> str:
    """
    Detects file type and calls the appropriate reader.
    """

    extension = file_path.suffix.lower()

    if extension == ".pdf":
        return read_pdf(file_path)

    if extension == ".docx":
        return read_docx(file_path)

    logger.warning(f"Unsupported file type: {file_path.name}")

    return ""

def get_resume_files(folder: Path) -> list[Path]:
    """
    Returns all supported resume files from a folder.
    """

    if not folder.exists():
        logger.error(f"Folder not found: {folder}")
        return []

    files = [
        file
        for file in folder.iterdir()
        if file.is_file()
        and file.suffix.lower() in SUPPORTED_EXTENSIONS
    ]

    logger.info(f"Found {len(files)} resume(s).")

    return files

