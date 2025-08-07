import Header from '@/components/header';
import SearchClient from '@/components/ai/search-client';

export default function SearchPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Concept Search" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <SearchClient />
      </main>
    </div>
  );
}
