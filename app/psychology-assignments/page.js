import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/psychology-assignments');

export default function PsychologyAssignmentsPage() {
  return <SubjectAssignmentPage page="psychology" />;
}
