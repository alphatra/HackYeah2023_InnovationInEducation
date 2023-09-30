"use client";

import { useState } from "react";
import { Check } from "./icons/check";
import { cn } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";

type AnswerDef = {
  answer_id: number;
  answer: string;
};

type QuestionDef = {
  id: number;
  question: string;
  answers: AnswerDef[];
};

type Result = {
  question_id: number;
  answer_id: number;
}[];

type WizardProps = {
  questions: QuestionDef[];
};

const letters = ["A", "B", "C", "D", "E", "F"];

async function submitResult(result: Result) {
  const response = await fetch("http://localhost:8000/survey/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  const json = await response.json();

  console.log(json);

  return json;
}

export function Wizard({ questions }: WizardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [result, setResult] = useState<Result>([]);

  useHotkeys("a,b,c,d,e,f", (event) => {
    const index = letters.indexOf(event.key.toUpperCase());

    if (index !== -1) {
      setAnswerId(currentQuestion.answers[index].answer_id);
    }
  });

  function goToNext() {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
    setAnswerId(null);
    setResult((result) => [
      ...result,
      {
        question_id: currentQuestion.id,
        answer_id: answerId!,
      },
    ]);
  }

  function goToPrevious() {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
    setAnswerId(null);
  }

  async function submit() {
    setResult((result) => [
      ...result,
      {
        question_id: currentQuestion.id,
        answer_id: answerId!,
      },
    ]);

    await submitResult(result);
  }

  useHotkeys("enter", () => {
    if (currentQuestionIndex < questions.length - 1 && answerId) {
      goToNext();
    } else if (currentQuestionIndex === questions.length - 1 && answerId) {
      submit();
    }
  });

  return (
    <div className="flex flex-col gap-8 w-full h-full justify-between">
      <h1 className="text-3xl font-medium">
        {currentQuestionIndex + 1}. {currentQuestion.question}
      </h1>

      <div className="flex flex-col gap-4 w-full md:w-1/2 pb-16">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={answer.answer_id}
            className={cn(
              `px-4 py-3 rounded-md border-2 text-lg flex items-center gap-2 transition-colors`,
              answerId === answer.answer_id
                ? "border-blue-600"
                : "border-gray-200"
            )}
            onClick={() => setAnswerId(answer.answer_id)}
          >
            <div
              className={cn(
                `text-sm rounded aspect-square h-6 w-6 font-mono font-medium flex items-center justify-center transition-colors`,
                answerId === answer.answer_id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              )}
            >
              {answerId === answer.answer_id ? (
                <Check className="w-4 h-4" />
              ) : (
                letters[index]
              )}
            </div>
            <div>{answer.answer}</div>
          </button>
        ))}
      </div>

      <div className="fixed left-0 bottom-0 w-full bg-white shadow-lg">
        <div className="flex items-center justify-between container px-8 py-4">
          <button
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded font-medium font-mono disabled:opacity-60"
            disabled={currentQuestionIndex === 0}
            onClick={() => goToPrevious()}
          >
            Poprzednie
          </button>

          <div className="flex-col gap-1 hidden md:flex">
            <div className="flex items-center gap-1">
              {questions.map((_, index) =>
                currentQuestionIndex > index ? (
                  <div
                    key={index}
                    className="rounded-full h-4 w-4 border border-green-500 bg-green-500 text-white flex items-center justify-center"
                  ></div>
                ) : (
                  <div
                    key={index}
                    className="rounded-full h-4 w-4 border border-gray-300"
                  ></div>
                )
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-blue-600 px-3 py-2 rounded font-medium font-mono">
              Objaśnienie
            </button>
            {currentQuestionIndex < questions.length - 1 && (
              <button
                className="bg-black px-3 py-2 rounded text-white font-medium font-mono items-center disabled:opacity-60 flex gap-2"
                onClick={() => goToNext()}
                disabled={answerId === null}
              >
                Następne
                <div className="font-mono font-medium text-sm bg-white/30 text-white/80 h-6 flex items-center px-1 rounded">
                  Enter
                </div>
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button
                className="bg-black px-3 py-2 rounded text-white font-medium font-mono items-center disabled:opacity-60 flex gap-2"
                onClick={async () => await submit()}
                disabled={answerId === null}
              >
                Zakończ
                <div className="font-mono font-medium text-sm bg-white/30 text-white/80 h-6 flex items-center px-1 rounded">
                  Enter
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
