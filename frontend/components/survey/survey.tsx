"use client";

import { useState } from "react";
import { Form } from "./form";
import { Results } from "./results";
import { QuestionDef, SurveyData } from "@/types/common";

async function submitSurvey(data: SurveyData): Promise<any> {
  // const response = await fetch("http://localhost:8000/survey/submit", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });

  // const json = await response.json();

  // console.log(json);

  // return json;
  // delay 2s
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

type SurveyProps = {
  questions: QuestionDef[];
};

export function Survey({ questions }: SurveyProps) {
  const [state, setState] = useState<"in-progress" | "loading" | "completed">(
    "in-progress"
  );
  const [resultsData, setResultsData] = useState<any>(null);

  function reset() {
    setState("in-progress");
    setResultsData(null);
  }

  if (state === "in-progress") {
    return (
      <Form
        questions={questions}
        onComplete={async (data: SurveyData) => {
          setState("loading");
          const resultsData = await submitSurvey(data);
          setResultsData(resultsData);
          setState("completed");
        }}
      />
    );
  }

  return (
    <Results
      data={resultsData}
      isLoading={state === "loading"}
      onReset={() => reset()}
    />
  );
}
