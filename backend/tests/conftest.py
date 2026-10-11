import pytest

from app.limiter import limiter


@pytest.fixture(autouse=True)
def reset_rate_limit() -> None:
    limiter.reset()
