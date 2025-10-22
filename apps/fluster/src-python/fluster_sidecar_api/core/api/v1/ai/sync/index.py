from typing import List
from flask_restx import Resource, reqparse
from flusterpy.core.static.database_tables import DatabaseTable
from flusterpy.features.db.methods.get_table import get_database
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain_ollama.llms import OllamaLLM
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_community.vectorstores.lancedb import LanceDB
from langchain_core.documents import Document
from langchain_text_splitters.markdown import MarkdownTextSplitter

from core.utils.add_ai_temperature_arguments import add_ai_temperature_arguments


class SyncAi(Resource):
    tables_to_drop: List[DatabaseTable] = [DatabaseTable.Vector]

    async def drop_tables(self):
        db = get_database()
        for table in self.tables_to_drop:
            db.drop_table(str(table))

    async def post(self):
        parser = reqparse.RequestParser()
        # TODO: Pass embedded documentation as well to make that retrievable.
        parser.add_argument(
            "notes_directory",
            required=True,
            type=str,
            help="The absolute path to the user's notes directory.",
        )
        parser.add_argument(
            "embedded_docs",
            required=True,
            type=str,
            help="A list of EmbeddedDocFile to include in rag responses.",
        )
        parser.add_argument(
            "database_directory",
            required=True,
            type=str,
            help="The absolute path to the database directory.",
        )
        parser.add_argument(
            "mdx_files",
            required=True,
            type=List[str],
            help="A list of absolute paths to all mdx files.",
        )
        parser.add_argument(
            "override_default_sync_settings",
            required=True,
            type=bool,
            help="If true, apply default Ai settings during sync.",
        )
        add_ai_temperature_arguments(parser)
        try:
            args = parser.parse_args()
        except Exception as e:
            # Handle parsing errors (e.g., missing required field or wrong type)
            return {"message": "Invalid request data.", "error": str(e)}, 400
        await self.drop_tables()
        # -- Load Data --
        docs = []
        for mdx_file_path in args["mdx_files"]:
            data = await UnstructuredMarkdownLoader(
                mdx_file_path, mode="elements"
            ).aload()
            docs.extend(data)
        # -- Split Documents --
        md_splitter = MarkdownTextSplitter()
        docs = md_splitter.split_documents(docs)
        # -- Handle Embedding Storage --
        embeddings = OllamaEmbeddings(
            model=args["model"],
            temperature=args["temperature"]
            if args["override_default_sync_settings"]
            else None,
            top_k=args["top_k"] if args["override_default_sync_settings"] else None,
            top_p=args["top_p"] if args["override_default_sync_settings"] else None,
        )
        vector_store = LanceDB(
            table=DatabaseTable.Vector,
            embedding=embeddings,
            uri=args["database_directory"],
        )
        vector_store.add_documents(docs)
        return {"success": True}, 200
