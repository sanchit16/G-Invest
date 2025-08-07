import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'G-Invest',
  description: 'Gamified stock trading and financial education platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', 'bg-background')}>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
