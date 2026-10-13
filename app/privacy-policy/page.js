import PrivacyPolicy from '../../src/site-pages/PrivacyPolicy';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/privacy-policy');

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
