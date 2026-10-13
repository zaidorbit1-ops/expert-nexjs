import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/nursing-assignments');

export default function NursingAssignmentsPage() {
  return <SubjectAssignmentPage page="nursing" />;
}
