import About from '../../src/site-pages/About';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/about');

export default function AboutPage() {
  return <About />;
}
