import os
from flask import Flask
from flask_cors import CORS
# from core.api.v1.ai.chat import ai_chat


app = Flask(__name__)
CORS(app)


@app.route("/ai")
def greet():
    return {"message": "Hello World"}


os.chdir(app.root_path)

app.run(host="0.0.0.0", port=8082)
