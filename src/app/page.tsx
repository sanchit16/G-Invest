
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// On first load, we check if the user has completed onboarding.
// We use localStorage to persist this state across sessions.
export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage only on the client-side
    const userHasOnboarded = localStorage.getItem('onboardingComplete') === 'true';

    if (!userHasOnboarded) {
      router.replace('/onboarding');
    } else {
      router.replace('/dashboard');
    }
  }, [router]);

  // Render a loading state while we determine the redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
