
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bot, Sparkles, AlertTriangle, MessageSquare } from 'lucide-react';

import { stockMarketChat } from '@/ai/flows/stock-market-chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';

const chatFormSchema = z.object({
  message: z.string().min(2, 'Your message must be at least 2 characters.'),
});
type ChatFormValues = z.infer<typeof chatFormSchema>;

export default function MarketChatClient() {
    const [conversation, setConversation] = useState<{ question: string; answer: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<ChatFormValues>({
        resolver: zodResolver(chatFormSchema),
        defaultValues: {
            message: '',
        },
    });

    async function onSubmit(values: ChatFormValues) {
        setIsLoading(true);
        setError(null);
        try {
            const result = await stockMarketChat({
                message: values.message,
            });
            setConversation(prev => [...prev, { question: values.message, answer: result.answer }]);
            form.reset();
        } catch (e: any) {
            console.error(e);
            if (e.message?.includes('API_KEY_SERVICE_BLOCKED')) {
                setError('The request is blocked. Please check your API key restrictions in the Google Cloud Console and ensure the "Generative Language API" is allowed.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-6 w-6" />
                        Market Chat Assistant
                    </CardTitle>
                    <CardDescription>Ask about stock prices or market concepts. For example: "What is the current price of GOOG?"</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2 max-h-80 overflow-y-auto p-4 rounded-md bg-muted/50 border">
                            {conversation.length === 0 && <p className="text-center text-sm text-muted-foreground">Ask a question to start the conversation.</p>}
                            {conversation.map((entry, index) => (
                                <div key={index} className="space-y-2">
                                    <p className="font-semibold text-primary">You:</p>
                                    <p className="ml-2">{entry.question}</p>
                                    <p className="font-semibold text-secondary">AI Assistant:</p>
                                    <p className="prose dark:prose-invert max-w-none ml-2">{entry.answer}</p>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-4">
                                    <Bot className="h-6 w-6 text-primary animate-pulse" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="sr-only">Your Question</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 'What is the price of TSLA?'" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Thinking...' : 'Ask'}
                                    <Sparkles className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </Form>
                        {error && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Action Required</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
