from typing import Optional
from pydantic import BaseModel, Field


class AiTemperatureArgs(BaseModel):
    model: str = Field(...,
                       description="The embedding model to use with Ollama.")
    temperature: Optional[float] = Field(
        ..., description="The temperature to use for the embedding model."
    )
    top_k: Optional[int] = Field(
        ..., description="The top_k to use for the embedding model."
    )
    top_p: Optional[float] = Field(
        ..., description="The top_p to use for the embedding model."
    )
    ollama_url_override: Optional[str] = Field(
        ..., description="The ollama connection url to use."
    )
