import AdminDashboard from '../../../src/components/admin/AdminDashboard';
import { getCurrentAdminUser } from '../../../lib/admin/current-user';

export default async function DashboardPage() {
  const currentUser = await getCurrentAdminUser();
  return <AdminDashboard currentUser={currentUser} view="posts" />;
}
