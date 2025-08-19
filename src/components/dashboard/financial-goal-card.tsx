
"use client";

import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

export default function FinancialGoalCard() {
  const [goal, setGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('onboardingAnswers');
    if (storedAnswers) {
      const answers = JSON.parse(storedAnswers);
      setGoal(answers.goal?.text || "Not set");
    } else {
      setGoal("Not set");
    }
    setLoading(false);
  }, []);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Primary Financial Goal</CardTitle>
        <Target className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
            <Skeleton className="h-8 w-3/4" />
        ) : (
            <div className="text-2xl font-bold">{goal}</div>
        )}
      </CardContent>
    </Card>
  );
}
