
import { Share2, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CertificatePage() {
  const shareUrl = "https://g-invest-app.com"; 
  const shareText = "I just became a Certified Market Expert with G-Invest! Start your journey to financial confidence today.";
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 p-4 md:p-6">
      <Card className="max-w-2xl w-full text-center shadow-2xl animate-in fade-in">
        <CardHeader className="bg-primary/10 p-8">
          <div className="mx-auto w-fit rounded-full bg-primary p-4 text-primary-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold mt-4">
            Certified Market Expert
          </CardTitle>
          <CardDescription className="text-lg">
            This certifies that
            <span className="block font-semibold text-xl text-primary mt-2">A G-Invest User</span>
            has successfully completed the G-Invest financial education program.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-2xl font-semibold italic text-muted-foreground">
            "I unlocked financial confidence with G-Invest."
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-4 p-8 border-t">
            <p className="font-semibold">Share Your Achievement!</p>
            <div className="flex gap-4">
                 <Button asChild>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                        <Twitter />
                        Share on X
                    </a>
                </Button>
                <Button asChild>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                         <Linkedin />
                        Share on LinkedIn
                    </a>
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
