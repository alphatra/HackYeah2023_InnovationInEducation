from fastapi import FastAPI, Depends, HTTPException, Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from .models.all import *
from .schemas.all import *


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

