import lancedb
import appdirs
from pathlib import Path

from lancedb.db import Table


def get_database_dir():
    return Path(appdirs.user_data_dir(appname="Fluster")) / "data" / "database"


def get_database() -> lancedb.DBConnection:
    db_path = get_database_dir()
    return lancedb.connect(db_path)


def get_table(table_name: str) -> Table:
    db = get_database()
    return db.open_table(table_name)


def test_get_database():
    res = get_database()
    table_names = res.table_names()
    assert list(table_names).__len__() > 0
