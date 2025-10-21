from flusterpy.core.static.database_tables import DatabaseTable
from flusterpy.features.db.methods.get_table import get_table


def get_chat_messages(chat_id: str):
    table = get_table(DatabaseTable.AiChatMessage)
    res = table.search(f"chat_id={chat_id}")
    return res.to_pandas()
