from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    cors_origins: list[str] = ["http://localhost:5173"]

    # Email delivery. If the key or recipient is empty, messages are only logged.
    resend_api_key: str = ""
    contact_to: str = ""
    contact_from: str = "Portfolio <onboarding@resend.dev>"


settings = Settings()
print(settings)
