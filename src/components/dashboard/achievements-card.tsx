import { Medal, ShieldCheck, Flame, Handshake, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const achievements = [
  {
    icon: Handshake,
    title: 'First Trade',
    description: 'Earned after the first virtual buy or sell.',
    earned: true,
  },
  {
    icon: ShieldCheck,
    title: 'Diversification Expert',
    description: 'Awarded for building a portfolio with assets from different sectors.',
    earned: true,
  },
  {
    icon: Flame,
    title: 'Daily Streak',
    description: 'Encourages daily check-ins to monitor their portfolio or complete a short lesson.',
    earned: false,
  },
    {
    icon: Medal,
    title: 'Learning Legend',
    description: 'Complete all tutorials in the AI Tutor section.',
    earned: false,
  },
  {
    icon: Award,
    title: 'Market Expert',
    description: 'Achieved by completing all beginner, intermediate, and advanced lessons.',
    earned: false,
  },
];

export default function AchievementsCard() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="h-5 w-5 text-muted-foreground" />
          Achievements
        </CardTitle>
        <CardDescription>Badges you've earned. Hover to see details.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            {achievements.map((badge) => (
              <Tooltip key={badge.title}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      badge.earned ? 'border-primary bg-primary/10' : 'border-dashed border-muted-foreground bg-muted'
                    }`}
                  >
                    <badge.icon
                      className={`h-6 w-6 ${
                        badge.earned ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{badge.title}</p>
                  <p>{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
