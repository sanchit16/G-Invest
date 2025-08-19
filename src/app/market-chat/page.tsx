
import Header from '@/components/header';
import MarketChatClient from '@/components/ai/market-chat-client';
import StocksCard from '@/components/dashboard/stocks-card';

export default function MarketChatPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Market Chat & Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <StocksCard />
        <MarketChatClient />
      </main>
    </div>
  );
}
