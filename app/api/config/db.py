from sqlalchemy import create_engine, MetaData
import pymysql

DATABASE_URL = "mysql+pymysql://root@localhost:3306/hackyeah"
engine = create_engine(DATABASE_URL)
meta = MetaData()
con = engine.connect()