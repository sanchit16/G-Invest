
"use client";

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const indices = [
  { name: 'S&P 500', price: 5464.62, change: '+16.73', changeType: 'increase' },
  { name: 'NASDAQ', price: 19659.80, change: '-34.22', changeType: 'decrease' },
  { name: 'DOW JONES', price: 39150.33, change: '+299.90', changeType: 'increase' },
  { name: 'RUSSELL 2000', price: 2022.03, change: '-3.97', changeType: 'decrease' },
  { name: 'FTSE 100', price: 8237.72, change: '-43.83', changeType: 'decrease' },
];

export default function TickerBanner() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee hover:pause w-max">
        {indices.concat(indices).map((item, index) => (
          <Card key={index} className="flex-shrink-0 w-48 mx-2">
            <div className="p-2">
              <p className="font-semibold text-xs">{item.name}</p>
              <div className="flex items-baseline gap-2">
                <p className="font-bold text-base">{item.price.toLocaleString()}</p>
                <p className={cn('text-xs font-semibold', item.changeType === 'increase' ? 'text-secondary' : 'text-destructive')}>
                  {item.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
