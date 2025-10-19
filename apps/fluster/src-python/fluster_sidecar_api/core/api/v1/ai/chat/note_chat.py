from flask_restful import Resource, reqparse

parser = reqparse.RequestParser()
parser.add_argument(
    "file", required=True, type=str, help="The absolute path to the mdx file."
)


class SingleNoteChat(Resource):
    def post(self):
        args = parser.parse_args()
        print("Args", args)
        return args
