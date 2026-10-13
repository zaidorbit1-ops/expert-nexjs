import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/law-assignments');

export default function LawAssignmentsPage() {
  return <SubjectAssignmentPage page="law" />;
}
