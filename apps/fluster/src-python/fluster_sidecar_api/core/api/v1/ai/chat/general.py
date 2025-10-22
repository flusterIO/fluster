from flask_restx import Resource


class AiGeneralChatRoute(Resource):
    def get(self):
        return "Ai Chat"
