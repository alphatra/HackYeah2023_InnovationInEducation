from fastapi import FastAPI
from api.schemas.schema import Question
from api.config.db import con
from api.models.model import questions


app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

#insert data
@app.post('/api/question')
async def store(question:Question):
    con.execute(questions.insert().values(
        quest = question.quest,
        answer = question.answer,
    ))
    return con.execute(questions.select()).fetchall()