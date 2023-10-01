import { Survey } from "@/components/survey/survey";
import { QuestionDef } from "@/types/common";

export const dynamic = "force-dynamic";

async function getQuestions(): Promise<QuestionDef[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get_items`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function SurveyPage() {
  const questions = await getQuestions();

  return <Survey questions={questions} />;
}
