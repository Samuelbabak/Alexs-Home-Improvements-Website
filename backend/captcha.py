import os

import requests
from dotenv import load_dotenv
from logging_config import logger

load_dotenv()

def validate_captcha(captcha_response: str, client_ip: str) -> bool:
    """
    Validate the CAPTCHA response with the cloudflare turstile API.

    Args:
        captcha_response (str): The CAPTCHA response token from the client.
        client_ip (str): The IP address of the client.

    Returns:
        bool: True if the CAPTCHA is valid, False otherwise.
    """
    logger.debug("Validating CAPTCHA ip=%s token_present=%s", client_ip, bool(captcha_response))
    response = requests.post(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        data={
            "secret": os.environ.get("CLOUDFLARE_TURNSTILE_SECRET_KEY"),
            "response": captcha_response,
            "remoteip": client_ip,
        },
    )
    if response.json().get("error-codes"):
        logger.warning("CAPTCHA validation errors ip=%s errors=%s", client_ip, response.json().get("error-codes"))

    if response.json().get("success"):
        logger.info("CAPTCHA validation succeeded ip=%s", client_ip)
        return True

    logger.warning("CAPTCHA validation failed ip=%s", client_ip)
    return False 