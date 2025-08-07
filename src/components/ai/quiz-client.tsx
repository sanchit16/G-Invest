"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HelpCircle, Bot, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz, type AiQuizGeneratorOutput } from '@/ai/flows/ai-quiz-generator';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuizClient() {
  const [quiz, setQuiz] = useState<AiQuizGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setQuiz(null);
    setError(null);
    try {
      const result = await generateQuiz(values);
      setQuiz(result);
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes('SERVICE_DISABLED')) {
        setError('The Quiz Generator is being set up. This can take a few minutes. Please try again shortly.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
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
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}
      
      {error && (
         <Alert variant="destructive" className="mt-6">
            <Bot className="h-4 w-4" />
            <AlertTitle>Setup in Progress</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
      )}

      {quiz && !error && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6" />
              Your Quiz on "{form.getValues('topic')}"
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{quiz.quiz}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
