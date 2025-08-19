
import Header from '@/components/header';
import PortfolioCard from '@/components/dashboard/portfolio-card';
import ReadinessCard from '@/components/dashboard/readiness-card';
import ProgressCard from '@/components/dashboard/progress-card';
import AchievementsCard from '@/components/dashboard/achievements-card';
import FinancialGoalCard from '@/components/dashboard/financial-goal-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PortfolioCard />
          <FinancialGoalCard />
          <ReadinessCard />
          <ProgressCard />
        </div>
        <div className="mt-6 grid gap-6">
          <AchievementsCard />
        </div>
      </main>
    </div>
  );
}
