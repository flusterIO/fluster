from typing import List, Optional
from pydantic import BaseModel, Field

from core.schemas.ai.ai_temperature_args import AiTemperatureArgs


class EmbeddedDocFile(BaseModel):
    content: str = Field(
        ..., description="The string content of the embedded document."
    )
    path: str = Field(..., description="The path to the embedded doc file.")


class SyncAiArgs(AiTemperatureArgs):
    notes_directory: str = Field(
        ...,
        min_length=1,
        description="The absolute path to the user's notes directory.",
    )
    embedded_docs: List[EmbeddedDocFile] = Field(
        ...,
        min_length=1,
        description="A list of EmbeddedDocFile to include in rag responses.",
    )
    database_directory: str = Field(
        ..., min_length=1, description="The absolute path to the database's directory."
    )
    mdx_files: List[str] = Field(
        ..., description="A list of absolute paths to all mdx files."
    )
    override_default_sync_settings: Optional[bool] = Field(
        ...,
        description="If true, apply default Ai settings during sync.",
    )
