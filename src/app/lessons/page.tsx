import Header from '@/components/header';
import AITutorClient from '@/components/ai/tutor-client';

export default function LessonsPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="AI Financial Tutor" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
            <AITutorClient />
        </div>
      </main>
    </div>
  );
}
