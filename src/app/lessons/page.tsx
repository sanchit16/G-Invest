import Header from '@/components/header';
import AITutorClient from '@/components/ai/tutor-client';
import SearchClient from '@/components/ai/search-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LessonsPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="AI Learning Center" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="tutor" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutor">AI Financial Tutor</TabsTrigger>
            <TabsTrigger value="search">Concept Search</TabsTrigger>
          </TabsList>
          <TabsContent value="tutor">
            <AITutorClient />
          </TabsContent>
          <TabsContent value="search">
            <SearchClient />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
