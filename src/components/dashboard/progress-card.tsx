
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ProgressCard() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <Award className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Level 5</div>
              <p className="text-xs text-muted-foreground">1,250 / 2,000 XP to next level</p>
              <Progress value={62.5} className="mt-4 h-2" />
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="p-1">
            <p className="font-bold mb-2">Progress Bar Guide</p>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm">Current XP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-sm">XP to next level</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
