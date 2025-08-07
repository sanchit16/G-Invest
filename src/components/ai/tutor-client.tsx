"use client";

import { useEffect, useState } from 'react';
import { BookOpen, Bot, Sparkles } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiFinancialTutor, type AiFinancialTutorOutput } from '@/ai/flows/ai-financial-tutor';
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function AITutorClient() {
  const [curriculum, setCurriculum] = useState<AiFinancialTutorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateCurriculum() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await aiFinancialTutor({});
        setCurriculum(result);
      } catch (e: any) {
        console.error(e);
        if (e.message?.includes('SERVICE_DISABLED')) {
          setError('The AI Tutor is being set up. This can take a few minutes. Please try again shortly.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
    generateCurriculum();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            AI-Generated Curriculum
          </CardTitle>
          <CardDescription>
            A personalized set of lessons on investing principles, inspired by "The Intelligent Investor."
          </CardDescription>
        </CardHeader>
      </Card>

      {isLoading && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6 animate-pulse" />
              AI Tutor is building your curriculum...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
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

      {curriculum && !error && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6" />
              Your Investing Curriculum
            </CardTitle>
             <CardDescription>
              Expand each section below to view your lesson.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {curriculum.lessons.map((lesson, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                          {lesson.title}
                        </AccordionTrigger>
                        <AccordionContent className="prose dark:prose-invert max-w-none">
                          <p className="whitespace-pre-wrap">{lesson.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
