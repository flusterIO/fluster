import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from core.api.v1.ai.chat.ai_chat import AiGeneralChatRoute
from core.api.v1.ai.chat.note_chat import SingleNoteChat


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "Content-Type"
app.config["CORS_SUPPORTS_CREDENTIALS"] = True
api = Api(app)

api.add_resource(AiGeneralChatRoute, "/ai/chat/general")
api.add_resource(SingleNoteChat, "/ai/chat/note")


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:1420")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


os.chdir(app.root_path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("FLUSTER_API_PORT", "8082")))
