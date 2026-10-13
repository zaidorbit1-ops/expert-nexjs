import AdminDashboard from '../../../../../../src/components/admin/AdminDashboard';
import { getCurrentAdminUser } from '../../../../../../lib/admin/current-user';

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  const currentUser = await getCurrentAdminUser();
  return <AdminDashboard currentUser={currentUser} view="editor" postId={id} />;
}
