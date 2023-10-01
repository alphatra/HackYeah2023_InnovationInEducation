"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import { Check } from "@/components/icons/check";
import { QuestionDef, SurveyData } from "@/types/common";
import { Drawer } from "vaul";

type FormProps = {
  questions: QuestionDef[];
  onComplete: (data: SurveyData) => Promise<void>;
};

const letters = ["A", "B", "C", "D", "E", "F"];

export function Form({ questions, onComplete }: FormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [data, setData] = useState<SurveyData>([]);

  useHotkeys("a,b,c,d,e,f", (event) => {
    const index = letters.indexOf(event.key.toUpperCase());

    if (index !== -1 && index < currentQuestion.answers.length) {
      setAnswerId(currentQuestion.answers[index].answer_id);
    }
  });

  function goToNext() {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
    setAnswerId(null);
    setData((data) => [
      ...data,
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

  useHotkeys("enter", async () => {
    if (currentQuestionIndex < questions.length - 1 && answerId) {
      goToNext();
    } else if (currentQuestionIndex === questions.length - 1 && answerId) {
      await onComplete(data);
    }
  });

  return (
    <main className="container flex flex-col items-start py-6 gap-6">
      <Link
        href="/"
        className="bg-gray-200 rounded px-2 py-1 text-gray-800 font-mono text-sm font-medium"
      >
        Wróć do strony głównej
      </Link>
      <div className="flex flex-col gap-8 w-full h-full justify-between">
        <h1 className="text-3xl font-medium">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </h1>

        <div className="flex flex-col gap-4 w-full md:w-1/2 pb-24">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={answer.answer_id}
              className={cn(
                `px-4 py-3 rounded-md border-2 text-lg flex items-center gap-2 transition-colors hover:bg-gray-50`,
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
              <div className="text-left">{answer.answer}</div>
            </button>
          ))}
        </div>

        <div className="fixed left-0 bottom-0 w-full bg-white shadow-lg">
          <div className="flex items-center justify-between container px-8 py-4">
            <button
              className="bg-gray-200 self-end text-gray-700 px-3 transition-all hover:bg-gray-300 py-2 rounded font-medium font-mono disabled:opacity-60"
              disabled={currentQuestionIndex === 0}
              onClick={() => goToPrevious()}
            >
              Poprzednie
            </button>

            <div className="flex-col gap-1 h-1.5 w-[140px] rounded bg-gray-300 hidden md:flex relative overflow-hidden">
              <div
                className="bg-green-500 h-full absolute left-0 transition-all"
                style={{
                  width: `${(currentQuestionIndex / questions.length) * 100}%`,
                }}
              ></div>
              {/* <div className="flex items-center gap-1">
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
              </div> */}
            </div>

            <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
              <Drawer.Root>
                <Drawer.Trigger className="text-blue-600 px-3 py-2 rounded font-medium font-mono hover:bg-black/5 transition-all">
                  Objaśnienie
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Content className="bg-white shadow-sm fixed bottom-0 w-full py-10 z-20">
                    <div className="container flex flex-col gap-4">
                      <div className="rounded-full bg-gray-200 self-center w-16 h-1"></div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maiores illo esse culpa maxime possimus dolorem eveniet.
                        Minus fugiat totam unde quaerat hic, reprehenderit
                        corporis sit modi! Doloremque iusto quaerat non?
                      </p>
                    </div>
                  </Drawer.Content>
                  <Drawer.Overlay className="fixed bg-black/20 inset-0" />
                </Drawer.Portal>
              </Drawer.Root>
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  className="bg-black px-3 py-2 rounded text-white font-medium font-mono items-center disabled:opacity-60 flex gap-2 transition-all hover:bg-black/80"
                  onClick={() => goToNext()}
                  disabled={answerId === null}
                >
                  Następne
                  <div className="hidden md:flex font-mono font-medium text-sm bg-white/30 text-white/80 h-6 items-center px-1 rounded">
                    Enter
                  </div>
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  className="bg-black px-3 py-2 rounded text-white font-medium font-mono items-center disabled:opacity-60 flex gap-2 hover:bg-black/80 transition-all"
                  onClick={async () => await onComplete(data)}
                  disabled={answerId === null}
                >
                  Zakończ
                  <div className="hidden md:flex font-mono font-medium text-sm bg-white/30 text-white/80 h-6 items-center px-1 rounded">
                    Enter
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
