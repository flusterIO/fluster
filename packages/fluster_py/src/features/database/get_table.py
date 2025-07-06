import lancedb

from src.features.database.get_database_directory import get_database_directory
from src.features.database.tables import DatabaseTable


def get_table(tbl_name: DatabaseTable, database_directory: str):
    directory = get_database_directory()
    if directory is None:
        print(
            """An error occurred while locating your database.
            Have you installed the Fluster application
            to initialize your database?"""
        )
        return
    db = lancedb.connect(database_directory)
    tbl = db.open_table(tbl_name.__str__())
    df = tbl.to_pandas()
    return df
