
"use client";

import { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type AiQuizGeneratorOutput } from '@/ai/flows/ai-quiz-generator';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

const hardcodedQuiz: AiQuizGeneratorOutput = {
  quizTitle: "Stock Market Fundamentals",
  questions: [
    {
      questionText: "What is the primary purpose for companies to issue shares on the stock market?",
      options: [
        "To pay their employees",
        "To get a loan from the bank",
        "To raise capital and expand their business",
        "To lower their taxes"
      ],
      correctAnswer: "To raise capital and expand their business",
      explanation: "Companies issue shares on the stock market to raise capital for business expansion, research and development, and other corporate initiatives."
    },
    {
      questionText: "In the United States, which organization regulates companies that want to sell shares to the public?",
      options: [
        "The Federal Reserve (The Fed)",
        "The New York Stock Exchange (NYSE)",
        "The Financial Industry Regulatory Authority (FINRA)",
        "The Securities and Exchange Commission (SEC)"
      ],
      correctAnswer: "The Securities and Exchange Commission (SEC)",
      explanation: "In the U.S., the Securities and Exchange Commission (SEC) regulates companies that want to sell shares to the public, requiring them to register and provide periodic disclosures."
    },
    {
      questionText: "What is a stock exchange?",
      options: [
        "A type of government bond",
        "A private club for wealthy investors",
        "An organized and regulated venue where stocks are bought and sold",
        "A company's annual shareholder meeting"
      ],
      correctAnswer: "An organized and regulated venue where stocks are bought and sold",
      explanation: "Stock exchanges are organized and regulated 'places' (today mostly virtual) where stocks and other securities are bought and sold, playing a crucial role in the financial system."
    },
    {
      questionText: "What is the key difference between an investor and a trader?",
      options: [
        "Investors use brokers, while traders do not.",
        "Traders focus on short-term market volatility, while investors focus on long-term growth.",
        "Investors can only buy stocks, while traders can buy bonds and commodities.",
        "There is no difference; the terms are interchangeable."
      ],
      correctAnswer: "Traders focus on short-term market volatility, while investors focus on long-term growth.",
      explanation: "Investors generally approach the market from a long-term perspective, expecting value to grow over time. Traders take a more short-term approach, aiming to capitalize on the market’s volatility."
    }
  ]
};


export default function QuizClient() {
  const [quiz, setQuiz] = useState<AiQuizGeneratorOutput | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answerStates, setAnswerStates] = useState<Record<number, AnswerState>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setQuiz(hardcodedQuiz);
  }, []);

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };
  
  const resetQuiz = () => {
    setSelectedAnswers({});
    setAnswerStates({});
    setShowResults(false);
  }

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    const newAnswerStates: Record<number, AnswerState> = {};
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        newAnswerStates[i] = 'correct';
      } else {
        newAnswerStates[i] = 'incorrect';
      }
    });
    setAnswerStates(newAnswerStates);
    setShowResults(true);
  };

  if (!quiz) {
    return null; 
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="animate-in fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <HelpCircle className="h-6 w-6" />
            {quiz.quizTitle}
          </CardTitle>
          <CardDescription>
            Test your knowledge about the fundamentals of the stock market.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {quiz.questions.map((q, i) => (
              <div key={i} className="space-y-4">
                <p className="font-semibold">{i + 1}. {q.questionText}</p>
                <div className="space-y-2">
                  {q.options.map((option) => {
                    const isSelected = selectedAnswers[i] === option;
                    const state = answerStates[i];
                    const isCorrectAnswer = q.correctAnswer === option;

                    return (
                      <Button
                        key={option}
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left h-auto py-2 whitespace-normal",
                          showResults && isCorrectAnswer && 'border-green-500 bg-green-500/10',
                          showResults && isSelected && state === 'incorrect' && 'border-red-500 bg-red-500/10',
                          !showResults && isSelected && 'bg-accent',
                        )}
                        onClick={() => !showResults && handleAnswerSelect(i, option)}
                        disabled={showResults}
                      >
                        {option}
                        {showResults && isCorrectAnswer && <CheckCircle className="ml-auto h-5 w-5 text-green-600" />}
                        {showResults && isSelected && state === 'incorrect' && <XCircle className="ml-auto h-5 w-5 text-red-600" />}
                      </Button>
                    );
                  })}
                </div>

                {showResults && (
                   <Collapsible>
                      <CollapsibleTrigger asChild>
                         <Button variant="link" className="p-0 text-sm">
                            Show Explanation
                         </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                         <Alert className="mt-2">
                            <AlertDescription>{q.explanation}</AlertDescription>
                         </Alert>
                      </CollapsibleContent>
                   </Collapsible>
                )}
                {i < quiz.questions.length - 1 && <Separator />}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            {!showResults ? (
              <Button onClick={handleSubmitQuiz} disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}>
                Submit Quiz
              </Button>
            ) : (
               <Button onClick={resetQuiz}>
                  Try Again
               </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
