from core.schemas.ai.sync_props import SyncAiArgs
from core.schemas.general.response_status import (
    ResponseStatus,
    SuccessStatusValue,
)
from fluster_py.core.static.database_tables import DatabaseTable
from fluster_py.features.db.methods.get_table import get_database
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_community.vectorstores.lancedb import LanceDB
from langchain_text_splitters.markdown import MarkdownTextSplitter

from fastapi.routing import APIRouter


ai_sync_router = APIRouter(prefix="/ai")


def drop_tables():
    tables_to_drop = [DatabaseTable.Vector]
    db = get_database()
    tables = db.table_names()
    for table in tables_to_drop:
        s = str(table)
        if s in tables:
            db.drop_table(s)


@ai_sync_router.post("/sync", response_model=SuccessStatusValue)
async def sync(args: SyncAiArgs):
    drop_tables()
    # -- Load Data --
    docs = []
    for mdx_file_path in args.mdx_files:
        data = await UnstructuredMarkdownLoader(
            mdx_file_path, mode="elements"
        ).aload()
        docs.extend(data)
    # -- Split Documents --
    md_splitter = MarkdownTextSplitter()
    docs = md_splitter.split_documents(docs)
    # -- Handle Embedding Storage --
    embeddings = OllamaEmbeddings(
        model=args.model,
        temperature=args.temperature
        if args.override_default_sync_settings
        else None,
        top_k=args.top_k if args.override_default_sync_settings else None,
        top_p=args.top_p if args.override_default_sync_settings else None,
    )
    vector_store = LanceDB(
        table=DatabaseTable.Vector,
        embedding=embeddings,
        uri=args.database_directory,
    )
    vector_store.add_documents(docs)
    return ResponseStatus(success=SuccessStatusValue.success), 200
