import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ProgressCard() {
  return (
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
  );
}
