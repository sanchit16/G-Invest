import Header from '@/components/header';
import QuizClient from '@/components/ai/quiz-client';

export default function QuizzesPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Knowledge Quizzes" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <QuizClient />
      </main>
    </div>
  );
}
