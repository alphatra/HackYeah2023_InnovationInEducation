import { Header } from "@/components/header";

export default function AboutPage() {
  return (
    <main>
      <Header variant="light" />

      <div className="container flex flex-col gap-6 pt-24">
        <h1 className="text-3xl font-medium">O nas</h1>
      </div>
    </main>
  );
}
