import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/economics-assignments');

export default function EconomicsAssignmentsPage() {
  return <SubjectAssignmentPage page="economics" />;
}
