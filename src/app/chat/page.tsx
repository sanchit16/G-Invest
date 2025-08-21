
import Header from '@/components/header';
import MarketChatClient from '@/components/ai/market-chat-client';

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Market Chat" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <MarketChatClient />
      </main>
    </div>
  );
}
