from features.db.methods.get_database import get_table


def get_chat_messages(chat_id: str):
    table = get_table("ai_chat_message")
    res = table.search(f"chat_id={chat_id}")
    print("Res", res)
    return table.to_pandas()
