import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/computer-science-assignments');

export default function ComputerScienceAssignmentsPage() {
  return <SubjectAssignmentPage page="computerScience" />;
}
