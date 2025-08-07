"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BookOpen, Bot, Sparkles, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { aiFinancialTutor, type AiFinancialTutorOutput } from '@/ai/flows/ai-financial-tutor';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  skillLevel: z.string().min(1, 'Please select a skill level.'),
  learningGoal: z.string().min(3, 'Learning goal must be at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AITutorClient() {
  const [lesson, setLesson] = useState<AiFinancialTutorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillLevel: '',
      learningGoal: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setLesson(null);
    try {
      const result = await aiFinancialTutor(values);
      setLesson(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating lesson',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Personalized Lesson
          </CardTitle>
          <CardDescription>
            Tell us about your learning goals and get a customized lesson from our AI tutor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skill Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current skill level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you want to learn?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'What are ETFs?' or 'How to diversify a portfolio'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Get Lesson'}
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
              AI Tutor is thinking...
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

      {lesson && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6" />
              Your Personalized Lesson
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
             <p className="whitespace-pre-wrap">{lesson.lesson}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
