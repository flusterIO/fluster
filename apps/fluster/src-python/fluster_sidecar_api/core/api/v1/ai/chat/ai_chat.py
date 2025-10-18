from flask_restful import Resource


class AiGeneralChatRoute(Resource):
    def get(self):
        return "Ai Chat"
