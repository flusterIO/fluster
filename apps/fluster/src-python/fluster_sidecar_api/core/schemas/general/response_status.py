from enum import Enum, IntEnum
from pydantic import BaseModel, Field


class SuccessStatus(Enum):
    success = "success"
    fail = "fail"


class ResponseStatus(BaseModel):
    success: SuccessStatus = Field(
        ..., description="'success' if the request was a success, otherwise 'fail'."
    )
