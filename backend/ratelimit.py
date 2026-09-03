import os
from dotenv import load_dotenv

from redis.asyncio import Redis
from fastapi import HTTPException, Request, Response
from logging_config import logger

redis_client = Redis.from_url("redis://redis:6379", decode_responses=True)

APPLICATION_NAME_PREFIX = os.environ.get("APPLICATION_NAME_PREFIX", "AHI")
RATELIMIT_PREFIX = f"{APPLICATION_NAME_PREFIX}:ratelimit:"
RATELIMIT_HOURLY_PREFIX = f"{APPLICATION_NAME_PREFIX}:ratelimit:hourly:"
RATELIMIT_DAILY_PREFIX = f"{APPLICATION_NAME_PREFIX}:ratelimit:daily:"

MAX_IP_REQUESTS_ONE_HOUR = 10  # Maximum requests allowed per IP in one hour
MAX_IP_REQUESTS_ONE_DAY = 10  # Maximum requests allowed per IP in one day

async def enforce_ratelimit(request: Request, response: Response):
    """
    Middleware to enforce rate limiting based on the client's IP address.
    """
    client_ip = request.client.host if request.client else "unknown"
    allowed = await is_request_allowed(client_ip)
    logger.debug("Rate limit checked ip=%s allowed=%s", client_ip, allowed)
    if not allowed:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")

async def is_request_allowed(client_ip: str) -> bool:
    """
    Check if the request from the given IP address is allowed based on rate limits.

    Args:
        client_ip (str): The IP address of the client.
    """

    hourly_key = RATELIMIT_HOURLY_PREFIX + client_ip
    daily_key = RATELIMIT_DAILY_PREFIX + client_ip
    hourly_count = await redis_client.incr(hourly_key)
    daily_count = await redis_client.incr(daily_key)

    if hourly_count == 1:
        await redis_client.expire(hourly_key, 3600)
    if daily_count == 1:
        await redis_client.expire(daily_key, 86400)

    allowed = hourly_count <= MAX_IP_REQUESTS_ONE_HOUR and daily_count <= MAX_IP_REQUESTS_ONE_DAY
    logger.info(
        "Rate limit values ip=%s hourly=%s/%s daily=%s/%s allowed=%s",
        client_ip,
        hourly_count,
        MAX_IP_REQUESTS_ONE_HOUR,
        daily_count,
        MAX_IP_REQUESTS_ONE_DAY,
        allowed,
    )
    return allowed
