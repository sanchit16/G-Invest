
import Header from '@/components/header';
import ReadinessCard from '@/components/dashboard/readiness-card';
import ProgressCard from '@/components/dashboard/progress-card';
import AchievementsCard from '@/components/dashboard/achievements-card';
import PortfolioSummaryCard from '@/components/dashboard/portfolio-summary-card';
import HoldingsList from '@/components/dashboard/holdings-list';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ReadinessCard />
          <ProgressCard />
          <AchievementsCard />
        </div>
        <PortfolioSummaryCard />
        <HoldingsList />
      </main>
    </div>
  );
}
