import logging
import os
import threading
from datetime import datetime
from pathlib import Path


class DailyFileHandler(logging.Handler):
    """Write logs to logs/YYYY/MM/DD.log and switch files when the date changes."""

    def __init__(self, log_directory: str | Path):
        super().__init__()
        self.log_directory = Path(log_directory)
        self._stream = None
        self._date = None
        self._lock = threading.RLock()

    def _ensure_stream(self) -> None:
        current_date = datetime.now().date()
        if self._stream is not None and self._date == current_date:
            return

        if self._stream is not None:
            self._stream.close()

        log_path = self.log_directory / f"{current_date:%Y}" / f"{current_date:%m}" / f"{current_date:%d}.log"
        log_path.parent.mkdir(parents=True, exist_ok=True)
        self._stream = log_path.open("a", encoding="utf-8")
        self._date = current_date

    def emit(self, record: logging.LogRecord) -> None:
        try:
            with self._lock:
                self._ensure_stream()
                self._stream.write(self.format(record) + "\n")
                self._stream.flush()
        except Exception:
            self.handleError(record)

    def close(self) -> None:
        with self._lock:
            if self._stream is not None:
                self._stream.close()
                self._stream = None
        super().close()


def configure_logging() -> logging.Logger:
    logger = logging.getLogger("ahi")
    if logger.handlers:
        return logger

    logger.setLevel(os.environ.get("LOG_LEVEL", "INFO").upper())
    logger.propagate = False

    formatter = logging.Formatter(
        "%(asctime)s %(levelname)s [%(name)s] %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S%z",
    )
    file_handler = DailyFileHandler(os.environ.get("LOG_DIRECTORY", "/app/logs"))
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    return logger


logger = configure_logging()
