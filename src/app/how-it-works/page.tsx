import Header from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ShieldAlert } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50/50 dark:bg-slate-900/50">
      <Header title="How the AI Works" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Understanding Our AI Agents</CardTitle>
                <CardDescription>
                    We use AI to enhance your learning experience. Here’s a look at how our key AI features make decisions.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        The AI Financial Tutor
                    </h2>
                    <div className="prose dark:prose-invert max-w-none text-base">
                        <p>
                            The AI Financial Tutor is designed to be your personal guide to the world of finance. Its primary goal is to provide accurate and relevant answers based on a controlled set of information.
                        </p>
                        <p>
                            <strong>How it works:</strong>
                        </p>
                        <ul>
                            <li>
                                <strong>Focused Knowledge Base:</strong> The AI doesn't browse the internet. Instead, it relies on a specific, built-in knowledge base covering the fundamentals of the stock market. This ensures the information is consistent and reliable.
                            </li>
                            <li>
                                <strong>Retrieval-Augmented Generation (RAG):</strong> When you ask a question, the AI first searches its knowledge base to find the most relevant paragraphs. It then uses this retrieved information to generate a clear and concise answer.
                            </li>
                            <li>
                                <strong>Safety First:</strong> By limiting the AI to a specific context, we prevent it from providing speculative financial advice or generating information from unverified sources. If the answer isn't in its knowledge base, it will tell you so.
                            </li>
                        </ul>
                    </div>
                </div>

                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <ShieldAlert className="h-6 w-6 text-destructive" />
                        The Trade Risk Percentage
                    </h2>
                    <div className="prose dark:prose-invert max-w-none text-base">
                        <p>
                           When you make a trade, you see a "Risk Assessment" percentage. This feature is designed as an educational tool to encourage mindful investing.
                        </p>
                        <p>
                            <strong>How it works:</strong>
                        </p>
                        <ul>
                            <li>
                                <strong>Illustrative Value:</strong> The risk percentage is currently generated as a <strong>random number</strong>. It is not a real-time analysis of the stock's actual market risk.
                            </li>
                            <li>
                                <strong>A Moment for Reflection:</strong> The purpose of this step is to introduce a moment of friction and encourage you to pause and consider the potential risks of any investment. In a real-world scenario, a risk assessment would involve complex factors like market volatility, company health, and economic indicators.
                            </li>
                            <li>
                                <strong>Educational Simulation:</strong> This feature simulates a step that professional traders often take. It serves as a reminder that all investments carry some level of risk.
                            </li>
                        </ul>
                    </div>
                </div>

            </CardContent>
        </Card>
      </main>
    </div>
  );
}
