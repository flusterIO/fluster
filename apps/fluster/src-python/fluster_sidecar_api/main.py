import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

# from core.api.v1.ai.chat.general import AiGeneralChatRoute
# from core.api.v1.ai.chat.note import SingleNoteChat
# from core.api.v1.ai.sync.index import SyncAi


app = FastAPI()
CORSMiddleware(
    app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/ai/sync")
def sync():
    return {"success": True}


# api.add_resource(AiGeneralChatRoute, "/ai/chat/general")
# api.add_resource(SingleNoteChat, "/ai/chat/note")
# api.add_resource(SyncAi, "/ai/sync")


# os.chdir(app.root_path)

# if __name__ == "__main__":
# app.run(host="0.0.0.0", port=int(os.environ.get("FLUSTER_API_PORT", "8082")))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8082)
