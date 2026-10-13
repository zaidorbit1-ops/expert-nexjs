import Contact from '../../src/site-pages/Contact';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/contact');

export default function ContactPage() {
  return <Contact />;
}
