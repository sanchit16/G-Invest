"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HelpCircle, Bot, Sparkles, CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generateQuiz, type AiQuizGeneratorOutput } from '@/ai/flows/ai-quiz-generator';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function QuizClient() {
  const [quiz, setQuiz] = useState<AiQuizGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answerStates, setAnswerStates] = useState<Record<number, AnswerState>>({});
  const [showResults, setShowResults] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  const resetQuizState = () => {
    setQuiz(null);
    setSelectedAnswers({});
    setAnswerStates({});
    setShowResults(false);
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    resetQuizState();
    setError(null);
    try {
      const result = await generateQuiz(values);
      setQuiz(result);
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes('SERVICE_DISABLED')) {
        setError('The Generative Language API is disabled. Please enable it in your Google Cloud project console and try again in a few minutes.');
      } else {
        setError('The AI failed to generate a quiz for this topic. Please try a different topic.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

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

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6" />
            Generate a Quiz
          </CardTitle>
          <CardDescription>
            Enter a financial topic to generate a quiz and test your knowledge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Stock Market Basics' or 'Retirement Accounts'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Quiz'}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6 animate-pulse" />
              Generating your quiz...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}
      
      {error && (
         <Alert variant="destructive" className="mt-6">
            <Bot className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
      )}

      {quiz && !isLoading && !error && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6" />
              {quiz.quizTitle}
            </CardTitle>
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
                 <Button onClick={() => form.handleSubmit(onSubmit)()}>
                    Try a New Quiz
                 </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
