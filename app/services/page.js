import Services from '../../src/site-pages/Services';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/services');

export default function ServicesPage() {
  return <Services />;
}
