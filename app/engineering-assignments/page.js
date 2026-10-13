import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/engineering-assignments');

export default function EngineeringAssignmentsPage() {
  return <SubjectAssignmentPage page="engineering" />;
}
