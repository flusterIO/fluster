from enum import Enum, IntEnum
from pydantic import BaseModel, Field


class SuccessStatusValue(Enum):
    success = "success"
    fail = "fail"


class ResponseStatus(BaseModel):
    success: SuccessStatusValue = Field(
        ..., description="'success' if the request was a success, otherwise 'fail'."
    )
