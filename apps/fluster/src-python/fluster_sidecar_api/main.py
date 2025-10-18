import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from core.api.v1.ai.chat.ai_chat import AiGeneralChatRoute


app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(AiGeneralChatRoute, "/ai/chat/general")


os.chdir(app.root_path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082)
