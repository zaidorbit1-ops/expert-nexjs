import SubjectAssignmentPage from '../../src/site-pages/SubjectAssignmentPage';
import { metadataForPage } from '../../src/seo';

export const metadata = metadataForPage('/finance-assignments');

export default function FinanceAssignmentsPage() {
  return <SubjectAssignmentPage page="finance" />;
}
