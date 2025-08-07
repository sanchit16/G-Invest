import Header from '@/components/header';
import PortfolioCard from '@/components/dashboard/portfolio-card';
import ReadinessCard from '@/components/dashboard/readiness-card';
import ProgressCard from '@/components/dashboard/progress-card';
import StocksCard from '@/components/dashboard/stocks-card';
import AchievementsCard from '@/components/dashboard/achievements-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PortfolioCard />
          <ReadinessCard />
          <ProgressCard />
          <AchievementsCard />
        </div>
        <div className="mt-6">
          <StocksCard />
        </div>
      </main>
    </div>
  );
}
