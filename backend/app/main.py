from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, Text, ForeignKey, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Database connection
DATABASE_URL="mysql+mysqlconnector://root:password@hackyeah_db:3306/hackyeah_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Model items
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question = Column(Text(), index=True)
    
    answers = relationship("Answer", back_populates="quest")

class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    answer = Column(String(255), index=True)
    question_id = Column(Integer, ForeignKey("items.id"))

    quest = relationship("Item", back_populates="answers")
    
   
    
class Answer_sch(BaseModel):
    answer_id: int
    answer: str
    question_id: int
    class Config:
        orm_mode = True

class Item_sch(BaseModel):
    question: str
    answers: list[str]

    class Config:
        orm_mode = True

class ItemResponse(BaseModel):
    question: str
    answers: List[str]

    class Config:
        orm_mode = True


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

@app.post("/create_item/", response_model=ItemResponse)
def create_item(item: Item_sch, db: Session = Depends(get_db)):
    db_item = Item(question=item.question)
    
    for ans_text in item.answers:
        answer = Answer(answer=ans_text)
        db_item.answers.append(answer)
    
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    # Extract answers from db_item's relationships
    answers = [ans.answer for ans in db_item.answers]
    
    # Create a response model for the created item
    response_item = ItemResponse(question=db_item.question, answers=answers)
    
    return response_item