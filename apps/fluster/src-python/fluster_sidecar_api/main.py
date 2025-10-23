import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from core.api.v1.ai.sync.index import ai_sync_router
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origin_regex="*",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)


app.include_router(ai_sync_router)

print("Root Path: ", app.root_path)

if app.root_path.__len__() > 0:
    os.chdir(app.root_path)

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.environ.get("FLUSTER_API_PORT", "8082")),
    )
