// Global in-memory loading state
// - Resets on full browser refresh (F5 / reload button), so the loading screen appears on refresh.
// - Persists during client-side navigation (Next.js Link clicks, Logo, Home button),
//   preventing the loading screen from appearing on in-app navigation.

let hasShown = false;

// If browser loads directly on any page other than '/', mark as already shown
// so subsequent navigation to Home won't trigger the loading screen.
if (typeof window !== 'undefined' && window.location.pathname !== '/') {
  hasShown = true;
}

export function shouldShowLoadingScreen(): boolean {
  return !hasShown;
}

export function markLoadingScreenShown(): void {
  hasShown = true;
}
