import lancedb
import appdirs
from lancedb.db import Table
from pathlib import Path
from fluster_py.core.static.database_tables import DatabaseTable


def get_database_dir():
    return Path(appdirs.user_data_dir(appname="Fluster")) / "data" / "database"


def get_database() -> lancedb.DBConnection:
    db_path = get_database_dir()
    return lancedb.connect(db_path)


def get_table(table_name: DatabaseTable) -> Table:
    db = get_database()
    return db.open_table(str(table_name))
