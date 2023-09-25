from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy import create_engine, Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel

app = FastAPI()

# Database connection
DATABASE_URL = "mysql+mysqlconnector://root@localhost:3306/hackyeah"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Model items
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question = Column(Text(), index=True)

# Pydantic
class ItemResponse(BaseModel):
    question: str


@app.on_event("startup")
def startup_db_client():
    Base.metadata.create_all(bind=engine)

@app.on_event("shutdown")
def shutdown_db_client():
    engine.dispose()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# add new item
@app.post("/api/items/", response_model=ItemResponse)
def create_item(item: ItemResponse, db: Session = Depends(get_db)):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# get item from id
@app.get("/api/items/{item_id}", response_model=ItemResponse)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Element nie został znaleziony")
    
    item_response = ItemResponse(id=item.id, question=item.question)
    return item_response