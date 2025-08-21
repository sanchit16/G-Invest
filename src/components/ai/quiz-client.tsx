"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type AiQuizGeneratorOutput } from '@/ai/flows/ai-quiz-generator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

// In a real app, these quizzes would likely be fetched based on the level.
const quizzes: Record<string, AiQuizGeneratorOutput> = {
  beginner: {
    quizTitle: "Beginner: Stock Market Fundamentals",
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
        questionText: "What does the SEC (Securities and Exchange Commission) do?",
        options: [
          "It sets the prices for stocks.",
          "It regulates companies that sell shares to the public.",
          "It guarantees that all investments will be profitable.",
          "It acts as a brokerage for individual investors."
        ],
        correctAnswer: "It regulates companies that sell shares to the public.",
        explanation: "In the U.S., the Securities and Exchange Commission (SEC) regulates companies that want to sell shares to the public, requiring them to register and provide periodic disclosures."
      }
    ]
  },
  intermediate: {
      quizTitle: "Intermediate: Market Mechanics",
      questions: [
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
  }
};


export default function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizLevel = searchParams.get('level') || 'beginner';

  const [quiz, setQuiz] = useState<AiQuizGeneratorOutput | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answerStates, setAnswerStates] = useState<Record<number, AnswerState>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  useEffect(() => {
    setQuiz(quizzes[quizLevel] || quizzes['beginner']);
    resetQuiz();
  }, [quizLevel]);

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };
  
  const resetQuiz = () => {
    setSelectedAnswers({});
    setAnswerStates({});
    setShowResults(false);
    setQuizPassed(false);
  }

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    const newAnswerStates: Record<number, AnswerState> = {};
    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        newAnswerStates[i] = 'correct';
        correctCount++;
      } else {
        newAnswerStates[i] = 'incorrect';
      }
    });
    setAnswerStates(newAnswerStates);
    setShowResults(true);

    if (correctCount === quiz.questions.length) {
        setQuizPassed(true);
        const storedQuizzes = localStorage.getItem('g-invest-quiz-completed');
        const completedQuizzes = storedQuizzes ? JSON.parse(storedQuizzes) : [];
        if (!completedQuizzes.includes(quizLevel)) {
            completedQuizzes.push(quizLevel);
            localStorage.setItem('g-invest-quiz-completed', JSON.stringify(completedQuizzes));
        }
    }
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
            Test your knowledge to unlock the next set of lessons. You must answer all questions correctly to pass.
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

            {showResults && (
                <Alert variant={quizPassed ? 'default' : 'destructive'} className="mt-6">
                    <AlertTitle>{quizPassed ? "Quiz Passed!" : "Try Again!"}</AlertTitle>
                    <AlertDescription>
                        {quizPassed ? "Excellent work! You've unlocked the next level of lessons." : "You need to answer all questions correctly to pass. Feel free to review the lessons and try again."}
                    </AlertDescription>
                </Alert>
            )}

          <div className="mt-8 flex justify-end">
            {!showResults ? (
              <Button onClick={handleSubmitQuiz} disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}>
                Submit Quiz
              </Button>
            ) : (
                quizPassed ? (
                     <Button onClick={() => router.push('/lessons')}>
                        Back to Lessons
                     </Button>
                ) : (
                     <Button onClick={resetQuiz}>
                        Try Again
                     </Button>
                )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
