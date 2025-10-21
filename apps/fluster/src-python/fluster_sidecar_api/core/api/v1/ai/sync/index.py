from typing import List
from flask_restful import Resource, reqparse
from flusterpy.core.static.database_tables import DatabaseTable
from flusterpy.features.db.methods.get_table import get_database, get_database_dir
from langchain_ollama.llms import OllamaLLM
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_community.vectorstores.lancedb import LanceDB
from langchain_core.documents import Document
import pandas as pd

from core.utils.add_ai_temperature_arguments import add_ai_temperature_arguments


class SyncAi(Resource):
    tables_to_drop: List[DatabaseTable] = [DatabaseTable.Vector]

    async def drop_tables(self):
        db = get_database()
        for table in self.tables_to_drop:
            db.drop_table(str(table))

    async def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "notes_directory",
            required=True,
            type=str,
            help="The absolute path to the user's notes directory.",
        )
        parser.add_argument(
            "database_directory",
            required=True,
            type=str,
            help="The absolute path to the database directory.",
        )
        parser.add_argument(
            "parsable_files",
            required=True,
            type=List[str],
            help="A list of absolute paths to all parsable files.",
        )
        add_ai_temperature_arguments(parser)
        try:
            args = parser.parse_args()
        except Exception as e:
            # Handle parsing errors (e.g., missing required field or wrong type)
            return {"message": "Invalid request data.", "error": str(e)}, 400
        await self.drop_tables()
        embeddings = OllamaEmbeddings(model=args["model"])
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
