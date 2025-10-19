import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from core.api.v1.ai.chat.ai_chat import AiGeneralChatRoute
from core.api.v1.ai.chat.note_chat import SingleNoteChat


app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(AiGeneralChatRoute, "/ai/chat/general")
api.add_resource(SingleNoteChat, "/ai/chat/note")


os.chdir(app.root_path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082)
