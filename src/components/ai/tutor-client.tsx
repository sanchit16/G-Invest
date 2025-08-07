"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BookOpen, Bot, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { aiFinancialTutor, type AiFinancialTutorOutput } from '@/ai/flows/ai-financial-tutor';
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  topic: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AITutorClient() {
  const [curriculum, setCurriculum] = useState<AiFinancialTutorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('beginner investing principles');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function generateCurriculum(topic: string) {
    setIsLoading(true);
    setError(null);
    setCurriculum(null);
    setCurrentTopic(topic || 'beginner investing principles');
    try {
      const result = await aiFinancialTutor({ topic });
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

  useEffect(() => {
    generateCurriculum('');
  }, []);

  function onSubmit(values: FormValues) {
    generateCurriculum(values.topic);
    form.reset();
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            AI-Generated Curriculum
          </CardTitle>
          <CardDescription>
            Enter a topic or book name below to generate a custom curriculum, or leave it blank for general investing lessons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'The Intelligent Investor', 'value investing', 'crypto basics'" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate'}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-6">
        {isLoading && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bot className="h-6 w-6 animate-pulse" />
                AI Tutor is building your curriculum...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
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
          <Card className="animate-in fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bot className="h-6 w-6" />
                <span className="capitalize">Your Curriculum on "{currentTopic}"</span>
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
                            <div className="flex-1 text-left">{lesson.title}</div>
                            <div className="text-sm font-normal text-muted-foreground ml-4 shrink-0">
                                1 lecture &bull; {lesson.duration}
                            </div>
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
    </div>
  );
}
