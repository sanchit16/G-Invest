
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Rocket, TrendingUp, PiggyBank, GraduationCap, BrainCircuit, BarChart, CheckCircle } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const onboardingSteps = [
  {
    step: 1,
    component: "Welcome",
  },
  {
    step: 2,
    question: "What's your primary financial goal right now?",
    component: "Goal",
    options: [
      { id: "big-purchase", icon: PiggyBank, text: "Saving for a big purchase" },
      { id: "retirement", icon: Rocket, text: "Planning for retirement" },
      { id: "wealth-growth", icon: TrendingUp, text: "Growing my wealth" },
      { id: "learning", icon: GraduationCap, text: "Just learning the ropes" },
    ],
  },
  {
    step: 3,
    question: "How comfortable are you with investing today?",
    component: "Knowledge",
    options: [
      { id: "beginner", icon: GraduationCap, text: "I'm a complete beginner" },
      { id: "intermediate", icon: BrainCircuit, text: "I know the basics" },
      { id: "advanced", icon: BarChart, text: "I'm pretty confident" },
    ],
  },
  {
    step: 4,
    component: "Finished",
  }
];

const WelcomeStep = ({ onNext }: { onNext: () => void }) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">
      <div className="p-4 rounded-full bg-primary/10">
        <DollarSign className="h-12 w-12 text-primary stroke-[2.5]" />
      </div>
    </div>
    <h1 className="text-3xl font-bold mb-2">Welcome to G-Invest!</h1>
    <p className="text-muted-foreground max-w-md mx-auto mb-6">
      We know that navigating the world of finance can feel overwhelming. That's why we're here to guide you, one step at a time.
    </p>
    <Button size="lg" onClick={onNext}>
      Let's Get Started
    </Button>
  </div>
);

const QuestionStep = ({
  question,
  options,
  onSelect,
}: {
  question: string;
  options: { id: string; icon: React.ElementType; text: string }[];
  onSelect: (value: {id: string, text: string}) => void;
}) => (
  <div className="text-center">
    <h2 className="text-2xl font-semibold mb-6">{question}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="h-20 text-md flex items-center justify-start gap-4 p-4"
          onClick={() => onSelect(option)}
        >
          <option.icon className="h-8 w-8 text-primary" />
          <span className="text-wrap text-left">{option.text}</span>
        </Button>
      ))}
    </div>
  </div>
);

const FinishedStep = ({ onFinish }: { onFinish: () => void }) => (
    <div className="text-center">
      <div className="flex justify-center mb-4">
         <CheckCircle className="h-16 w-16 text-secondary" />
      </div>
      <h1 className="text-3xl font-bold mb-2">You're all set!</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Ready, set, grow! Your personalized G-Invest plan is waiting.
      </p>
      <Button size="lg" onClick={onFinish}>
        Go to Dashboard
      </Button>
    </div>
  );

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, {id: string; text: string}>>({});
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSelect = (value: {id: string; text: string}) => {
    setAnswers({ ...answers, [onboardingSteps[currentStep].component.toLowerCase()]: value });
    handleNext();
  };

  const handleFinish = () => {
    localStorage.setItem('onboardingAnswers', JSON.stringify(answers));
    localStorage.setItem('onboardingComplete', 'true');
    console.log("Onboarding complete, answers:", answers);
    router.push('/dashboard-redirect');
  };

  const currentStepData = onboardingSteps[currentStep];
  const progress = (currentStep / (onboardingSteps.length - 1)) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 dark:bg-slate-900/50 p-4">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-2xl">
              <CardHeader>
                {currentStep > 0 && currentStep < onboardingSteps.length - 1 && (
                  <Progress value={progress} className="w-full h-2 mb-4" />
                )}
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                {currentStepData.component === 'Welcome' && <WelcomeStep onNext={handleNext} />}
                {currentStepData.component === 'Goal' && (
                  <QuestionStep
                    question={currentStepData.question!}
                    options={currentStepData.options!}
                    onSelect={handleSelect}
                  />
                )}
                {currentStepData.component === 'Knowledge' && (
                  <QuestionStep
                    question={currentStepData.question!}
                    options={currentStepData.options!}
                    onSelect={handleSelect}
                  />
                )}
                {currentStepData.component === 'Finished' && <FinishedStep onFinish={handleFinish} />}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
