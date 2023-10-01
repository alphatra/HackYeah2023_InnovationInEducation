from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

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