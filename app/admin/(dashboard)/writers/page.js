import { redirect } from 'next/navigation';

export default function WritersPage() {
  redirect('/admin/authors');
}
