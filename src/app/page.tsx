
import { redirect } from 'next/navigation';

// On first load, we check if the user has completed onboarding.
// This would typically be a check against a user profile or a persistent flag.
// For this prototype, we'll assume a new user and always redirect to onboarding.
// After onboarding, the user is sent to /dashboard.
// Subsequent visits should ideally land on /dashboard directly.

export default function HomePage() {
  const userHasOnboarded = false; // In a real app, this would be dynamic.

  if (!userHasOnboarded) {
    redirect('/onboarding');
  } else {
    redirect('/dashboard');
  }
}
