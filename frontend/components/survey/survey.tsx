"use client";

import { useState } from "react";
import { Form } from "./form";
import { Results } from "./results";
import { QuestionDef, ResultsData, SurveyData } from "@/types/common";

async function submitSurvey(data: SurveyData): Promise<ResultsData> {
  const response = await fetch("http://localhost:8000/survey/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      survey_entries: data,
    }),
  });

  const json = await response.json();

  return json;
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
