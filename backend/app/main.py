from fastapi import FastAPI, Depends, HTTPException, Path
from sqlalchemy import create_engine, Column, Integer, Text, ForeignKey, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

origins = ["http://localhost:3000"]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Database connection
DATABASE_URL = "mysql+mysqlconnector://root:password@hackyeah_db:3306/hackyeah_db"
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Model items
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question = Column(String(255), index=True)
    answers = relationship("Answer", back_populates="quest")

class Answer(Base):
    __tablename__ = "answers"
    answer_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    answer = Column(String(255), index=True)
    question_id = Column(Integer, ForeignKey("items.id", ondelete="CASCADE", onupdate="CASCADE"))
    technical = Column(Integer)
    medical = Column(Integer)
    lingual = Column(Integer)
    art = Column(Integer)

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

class AnswerResponse(BaseModel):
    answer_id: int
    answer: str

class ItemResponse(BaseModel):
    id: int
    
    question: str
    answers: List[AnswerResponse]
    class Config:
        orm_mode = True

class Survey(BaseModel):
    question_id: int
    answer_id: int


class ApiForAi(BaseModel):
    answer_id: int
    technical: int
    medical: int
    lingual: int
    art: int
   

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

   
    answers = [ans.answer for ans in db_item.answers]
    
    
    response_item = ItemResponse(question=db_item.question, answers=answers)
    
    return response_item


@app.get("/get_items/", response_model=List[ItemResponse])
def get_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()

    item_responses = []
    for item in items:
       
        answers = [{"answer_id": ans.answer_id, "answer": ans.answer} for ans in item.answers]
        
       
        item_response = ItemResponse(id=item.id, question=item.question, answers=answers)
        item_responses.append(item_response)


    return item_responses

@app.get("/get_item/{answer_id}", response_model=ApiForAi)
def get_item(answer_id: int = Path(..., title="Answer ID", description="The ID of the answer to retrieve"), db: Session = Depends(get_db)):
    answer = db.query(Answer).filter(Answer.answer_id == answer_id).first()

    if answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")

    # Create an instance of ApiForAi with the answer data
    api_for_ai_response = ApiForAi(
        answer_id=answer.answer_id,
        technical=answer.technical,
        medical=answer.medical,
        lingual=answer.lingual,
        art=answer.art,
    )

    return api_for_ai_response


@app.post("/survey/submit")
async def process_survey(data: Survey):
    return {"question_id":data.question_id, "answer_id": data.answer_id}

