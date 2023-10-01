from pydantic import BaseModel
from typing import List

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

class SurveyResponse(BaseModel):
    survey_entries: List[Survey]


class ApiForAi(BaseModel):
    answer_id: int
    technical: int
    medical: int
    lingual: int
    art: int