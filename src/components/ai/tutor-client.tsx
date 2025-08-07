"use client";

import { useEffect, useState } from 'react';
import { BookOpen, Bot, Sparkles } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { aiFinancialTutor, type AiFinancialTutorOutput } from '@/ai/flows/ai-financial-tutor';
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function AITutorClient() {
  const [curriculum, setCurriculum] = useState<AiFinancialTutorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function generateCurriculum() {
      setIsLoading(true);
      try {
        const result = await aiFinancialTutor({});
        setCurriculum(result);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error generating curriculum',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
    generateCurriculum();
  }, [toast]);

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

      {curriculum && (
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
