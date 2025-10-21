from typing import List
from flask_restful import Resource, reqparse
from flusterpy.core.static.database_tables import DatabaseTable
from flusterpy.features.db.methods.get_table import get_database, get_database_dir
from langchain_ollama.llms import OllamaLLM


class SyncAi(Resource):
    tables_to_drop: List[DatabaseTable] = [DatabaseTable.Vector]

    async def drop_tables(self):
        db = get_database()
        for table in self.tables_to_drop:
            db.drop_table(str(table))

    async def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "model",
            required=True,
            type=str,
            help="The embedding model to use with Ollama.",
        )
        parser.add_argument(
            "notes_directory",
            required=True,
            type=str,
            help="The absolute path to the user's notes directory.",
        )
        parser.add_argument(
            "parsable_files",
            required=True,
            type=List[str],
            help="A list of absolute paths to all parsable files.",
        )
        parser.add_argument(
            "temperature",
            required=False,
            type=List[str],
            help="The temperature to use for the embedding model.",
        )

        parser.add_argument(
            "top_k",
            required=False,
            type=int | None,
            help="The top_k to use for the embedding model.",
        )

        parser.add_argument(
            "url_override",
            required=False,
            type=int | None,
            help="The ollama connection url to use.",
        )
        parser.add_argument(
            "top_p",
            required=False,
            type=float | None,
            help="The top_p to use for the embedding model.",
        )
        try:
            args = parser.parse_args()
        except Exception as e:
            # Handle parsing errors (e.g., missing required field or wrong type)
            return {"message": "Invalid request data.", "error": str(e)}, 400
        vector_store = OllamaLLM(
            model=args["model"],
            temperature=args["temperature"],
            top_k=args["top_k"],
            top_p=args["top_p"],
            base_url=args["url_override"],
            # embedding_func
        )
        model = Ollama(model=args["model"])
        return "Syncing..."
