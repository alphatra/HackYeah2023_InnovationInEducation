from fastapi import FastAPI, Depends, HTTPException, Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware

from .models.all import *
from .schemas.all import *
from fastapi.testclient import TestClient
import json


app = FastAPI()
client = TestClient(app)

origins = ["*"]  

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

# Funkcja data_process przetwarza dane z tabeli JSON.
def data_process(data_table):
    # Initialize variables for different categories.
    tech = 0
    med = 0
    ling = 0
    art = 0

    # Process each item in the data_table.
    for item in data_table:
        answer_id = item[0]
        link = f"/get_item/{answer_id}"  # Construct the FastAPI endpoint URL
        
        # Make an HTTP GET request to the FastAPI endpoint.
        response = client.get(link)
        
        # Check the status code of the response.
        if response.status_code == 200:
            # Parse the JSON data from the response.
            data = response.json()
            
            # Update category variables based on data from JSON.
            tech += data["technical"]
            med += data["medical"]
            ling += data["lingual"]
            art += data["art"]

    # Create a list of processed data.
    data_processed = [tech, med, ling, art]
    return collage_finder(data_processed)

# Funkcja collage_finder znajduje kategorie o największych wartościach i zwraca listę.
def collage_finder(data_done):
    sum = data_done[0] + data_done[1] + data_done[2] + data_done[3]
    name_list = ["technical", "medical", "lingual", "art"]
    tag_list = [[name_list[i], round(data_done[i] / sum *100)] for i in range(len(name_list))]
    
    return tag_list


@app.post("/survey/submit")
async def process_survey(survey_data: SurveyResponse):
    test_table = []

    for entry in survey_data.survey_entries:
        question_id = entry.question_id
        answer_id = entry.answer_id
        test_table.append([question_id, answer_id])
    
    print("test.table: ", test_table)
    way = data_process(test_table)
    
    json_data = json.dumps(way)
    
    return json_data, way

