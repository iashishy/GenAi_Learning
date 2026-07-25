from pathlib import Path

from services.file_reader import get_resume_files, read_file

resume_folder = Path("resumes")

files = get_resume_files(resume_folder)

for file in files:
    print("=" * 60)
    print(file.name)
    print("=" * 60)

    text = read_file(file)

    print(text[:300])
    print()