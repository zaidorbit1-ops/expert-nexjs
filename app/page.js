import { metadataForPage } from '../src/seo';
import Home from '../src/site-pages/Home';

export const metadata = metadataForPage('/');

export default function HomePage() {
  return <Home />;
}
