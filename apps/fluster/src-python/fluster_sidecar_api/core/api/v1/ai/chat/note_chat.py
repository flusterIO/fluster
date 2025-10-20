from flask_restful import Resource, reqparse


class SingleNoteChat(Resource):
    def get(self):
        return "here"

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "file",
            # required=True,
            # type=str,
            help="The absolute path to the mdx file.",
        )
        parser.add_argument(
            "msg",
            # required=True,
            # type=str,
            help="The user message to the chatbot.",
        )
        try:
            args = parser.parse_args()
        except Exception as e:
            # Handle parsing errors (e.g., missing required field or wrong type)
            return {"message": "Invalid request data.", "error": str(e)}, 400
        print("Args", args)
        return "Here", 200
