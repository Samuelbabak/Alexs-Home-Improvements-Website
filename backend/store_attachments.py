import os
import uuid
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv
from fastapi import UploadFile
from logging_config import logger

load_dotenv()

@dataclass
class StoredAttachment:
    file_id: str
    original_filename: str
    content_type: str | None

def saveAttachment(file: UploadFile) -> StoredAttachment:
    """
    Save an uploaded file to the specified folder and return the file path.
    """
    # Ensure the folder exists
    save_path = os.environ.get("ATTACHMENT_SAVE_PATH")
    if not save_path:
        raise RuntimeError("ATTACHMENT_SAVE_PATH is not configured")
    Path(save_path).mkdir(parents=True, exist_ok=True)

    original_filename = file.filename or "unnamed-file"
    extension = Path(original_filename).suffix.lower()
    file_id = f"{uuid.uuid4()}{extension}"
    file_path = Path(save_path) / file_id

    with file_path.open("wb") as f:
        f.write(file.file.read())

    logger.info(
        "Attachment stored file_id=%s filename=%s content_type=%s size=%s",
        file_id,
        original_filename,
        file.content_type,
        file_path.stat().st_size,
    )
    return StoredAttachment(file_id, original_filename, file.content_type)