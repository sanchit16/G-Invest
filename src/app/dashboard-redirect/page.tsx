
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a temporary component to redirect from onboarding to the original dashboard page.
// In a real app, you would likely set a flag in localStorage or a cookie
// and the root page.tsx would decide whether to show onboarding or the dashboard.
export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // We rename the original page to /dashboard and redirect there
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}
