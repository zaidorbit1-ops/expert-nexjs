import NotFound from '../src/site-pages/NotFound';

export const metadata = {
  title: 'Page Not Found | Expert Assignment Writers',
  description: 'The page you requested could not be found. Return to the Expert Assignment Writers homepage or use the site navigation.',
  robots: { index: false, follow: false },
};

export default function AppNotFound() {
  return <NotFound />;
}
