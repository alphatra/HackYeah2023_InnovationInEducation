export type AnswerDef = {
  answer_id: number;
  answer: string;
};

export type QuestionDef = {
  id: number;
  question: string;
  answers: AnswerDef[];
};

export type SurveyData = {
  question_id: number;
  answer_id: number;
}[];

export type ResultsData = [string, [name: string, value: number][]];
