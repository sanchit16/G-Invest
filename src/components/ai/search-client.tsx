"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Search, Bot, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { financialConceptSearch, type FinancialConceptSearchOutput } from '@/ai/flows/financial-concept-search';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  concept: z.string().min(2, 'Concept must be at least 2 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SearchClient() {
  const [result, setResult] = useState<FinancialConceptSearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const searchResult = await financialConceptSearch(values);
      setResult(searchResult);
    } catch (e: any)
      {
      console.error(e);
      if (e.message?.includes('SERVICE_DISABLED')) {
        setError('The Concept Search is being set up. This can take a few minutes. Please try again shortly.');
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
            <Search className="h-6 w-6" />
            Search Financial Concepts
          </CardTitle>
          <CardDescription>
            Enter a financial term or concept you want to understand better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Concept</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., '401(k)', 'Index Fund', 'Capital Gains'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
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
              AI is searching...
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

      {result && !isLoading && !error && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="h-6 w-6" />
              Explanation for "{form.getValues('concept')}"
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{result.explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
