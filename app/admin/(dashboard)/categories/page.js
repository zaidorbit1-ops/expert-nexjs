import AdminDashboard from '../../../../src/components/admin/AdminDashboard';
import { getCurrentAdminUser } from '../../../../lib/admin/current-user';

export default async function CategoriesPage() {
  const currentUser = await getCurrentAdminUser();
  return <AdminDashboard currentUser={currentUser} view="categories" />;
}
