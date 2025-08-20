
"use client";

import { useState, useEffect } from 'react';

type HeaderProps = {
  title: string;
  showGoal?: boolean;
};

export default function Header({ title, showGoal = false }: HeaderProps) {
  const [goal, setGoal] = useState<string | null>(null);

  useEffect(() => {
    if (showGoal) {
      const storedAnswers = localStorage.getItem('onboardingAnswers');
      if (storedAnswers) {
        const answers = JSON.parse(storedAnswers);
        setGoal(answers.goal?.text || "Not set");
      } else {
        setGoal("Not set");
      }
    }
  }, [showGoal]);

  return (
    <header className="sticky top-0 z-10 flex h-auto min-h-16 items-start justify-between gap-4 border-b bg-card px-4 py-3 md:px-6">
      <div>
        <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
        {showGoal && goal && (
          <p className="text-sm text-muted-foreground mt-1">
            Your primary goal: <span className="font-semibold text-primary">{goal}</span>
          </p>
        )}
      </div>
    </header>
  );
}
