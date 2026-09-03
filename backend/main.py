import os, time, ssl

from smtplib import SMTP, SMTP_SSL, SMTPAuthenticationError
from typing import Annotated
from dotenv import load_dotenv
from email.mime.text import MIMEText
from pydantic import EmailStr
from fastapi import FastAPI, File, Form, Request, UploadFile, HTTPException
from fastapi.responses import FileResponse
from logging_config import logger

from captcha import validate_captcha
from store_attachments import saveAttachment


app = FastAPI(root_path='/api')

load_dotenv()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    started_at = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - started_at) * 1000
    client_ip = request.client.host if request.client else "unknown"
    logger.info(
        "HTTP request method=%s path=%s status=%s duration_ms=%.2f ip=%s",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
        client_ip,
    )
    return response

@app.post("/email")
def send_email(
    name: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    phone: Annotated[str, Form()],
    service: Annotated[str, Form()],
    message: Annotated[str, Form()],
    request: Request,
    address: Annotated[str | None, Form()] = None,
    budget: Annotated[str | None, Form()] = None,
    attachments: Annotated[list[UploadFile] | None, File()] = None,
    website: Annotated[str | None, Form()] = None,
    captcha_response: Annotated[str | None, Form()] = None,
):
    client_ip = request.client.host if request.client else None
    logger.info("Email request received ip=%s service=%s attachments=%s", client_ip, service, len(attachments or []))

    if website:
        logger.warning("Honeypot triggered ip=%s", client_ip)
        raise HTTPException(status_code=400, detail="Bot detected")

    if not validate_captcha(captcha_response or "", client_ip):
        raise HTTPException(status_code=400, detail="Invalid CAPTCHA")
    
    stored_attachments = [saveAttachment(attachment) for attachment in attachments or []]
    
    email_body = build_email_body(name, email, phone, service, message, address, budget, [])

    # Email message
    msg = MIMEText(email_body, "html")
    msg['From'] = os.environ.get("SERVER_EMAIL_ADDRESS")
    msg['To'] = os.environ.get("RECIPIENT_EMAIL_ADDRESS")
    msg['Subject'] = "New invoice request from your website!"

    context = ssl.create_default_context()
    try:
        with SMTP_SSL("smtp.mail.yahoo.com", 465, context=context) as smtp:
            smtp.set_debuglevel(1)
            smtp.login(os.environ.get("SERVER_EMAIL_ADDRESS"), os.environ.get("SERVER_EMAIL_APP_PASSWORD"))
            smtp.send_message(
                msg,
                from_addr=os.environ.get("SERVER_EMAIL_ADDRESS"),
                to_addrs=os.environ.get("RECIPIENT_EMAIL_ADDRESS"),
            )
        logger.info("Email sent successfully ip=%s attachment_count=%s", client_ip, len(stored_attachments))
    except SMTPAuthenticationError:
        logger.exception("SMTP authentication failed ip=%s", client_ip)
    except Exception as e:
        logger.exception("Email delivery failed ip=%s error=%s", client_ip, e)

@app.get("/attachments/{file_id}")
def get_attachment(file_id: str):
    """
    Retrieve an attachment by its unique file ID.
    """
    attachment_path = os.path.join(os.environ.get("ATTACHMENT_SAVE_PATH"), file_id)
    if not os.path.isfile(attachment_path):
        raise HTTPException(status_code=404, detail="Attachment not found")
    return FileResponse(attachment_path)