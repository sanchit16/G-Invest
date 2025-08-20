import { Trophy } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';

const leaderboardData = [
  {
    rank: 1,
    name: 'Alex T.',
    points: 250,
    avatar: 'https://placehold.co/40x40.png',
    initials: 'AT',
  },
  {
    rank: 2,
    name: 'Samantha P.',
    points: 225,
    avatar: 'https://placehold.co/40x40.png',
    initials: 'SP',
  },
  {
    rank: 3,
    name: 'You',
    points: 200,
    avatar: 'https://placehold.co/40x40.png',
    initials: 'YOU',
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: 'Ben C.',
    points: 175,
    avatar: 'https://placehold.co/40x40.png',
    initials: 'BC',
  },
];

export default function LeaderboardCard() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-muted-foreground" />
          Leaderboard
        </CardTitle>
        <CardDescription>
          See how you rank against other investors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Rank</TableHead>
              <TableHead className="w-1/2">User</TableHead>
              <TableHead className="w-1/4 text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow
                key={user.rank}
                className={user.isCurrentUser ? 'bg-primary/10' : ''}
              >
                <TableCell className="font-bold">{user.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage data-ai-hint="avatar" src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                    {user.isCurrentUser && <Badge variant="secondary">You</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {user.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
