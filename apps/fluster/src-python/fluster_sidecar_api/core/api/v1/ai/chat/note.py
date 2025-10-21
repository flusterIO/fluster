from flask_restful import Resource, reqparse
from langchain_community.document_loaders import UnstructuredMarkdownLoader


class SingleNoteChat(Resource):
    def get(self):
        return "here"

    async def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "file",
            required=True,
            type=str,
            help="The absolute path to the mdx file.",
        )
        parser.add_argument(
            "msg",
            required=True,
            type=str,
            help="The user message to the chatbot.",
        )
        try:
            args = parser.parse_args()
        except Exception as e:
            # Handle parsing errors (e.g., missing required field or wrong type)
            return {"message": "Invalid request data.", "error": str(e)}, 400
        loader = UnstructuredMarkdownLoader(
            args["file"], mode="elements", strategy="fast"
        )
        docs = []
        async for doc in loader.alazy_load():
            print("Doc: ", doc)
            docs.append(doc)
        return "Here", 200
