import { Check } from "@/components/icons/check";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wizard } from "@/components/wizard";
import Link from "next/link";

type AnswerDef = {
  answer_id: number;
  answer: string;
};

type QuestionDef = {
  id: number;
  question: string;
  answers: AnswerDef[];
};

async function getQuestions(): Promise<QuestionDef[]> {
  const res = await fetch("http://localhost:8000/get_items", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Quiz() {
  const questions = await getQuestions();

  return (
    <main className="container flex flex-col items-start py-6 gap-6">
      <Link
        href="/"
        className="bg-gray-200 rounded px-2 py-1 text-gray-800 font-mono text-sm font-medium"
      >
        Wróć do strony głównej
      </Link>
      <Wizard questions={questions} />
    </main>
  );
}
