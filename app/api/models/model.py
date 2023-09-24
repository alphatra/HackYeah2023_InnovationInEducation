from sqlalchemy import Table, Column
from api.config.db import meta
from sqlalchemy.sql.sqltypes import Integer, String

questions = Table(
    'questions', meta,
    Column('id',Integer, primary_key=True),
    Column('quest',String()),
    Column('answer',String()),
)