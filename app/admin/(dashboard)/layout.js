import { redirect } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import DashboardShell from '../../../src/components/admin/DashboardShell';

export const metadata = {
  title: 'Blog Dashboard | Expert Assignment Writers',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect('/admin/login?error=setup');
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name, role')
    .eq('id', user.id)
    .maybeSingle();
  if (error) redirect('/admin/login?error=setup');
  if (!profile || !['admin', 'writer'].includes(profile.role)) {
    redirect('/admin/login?error=access');
  }

  return (
    <DashboardShell
      currentUser={{ id: user.id, email: user.email, ...profile }}
    >
      {children}
    </DashboardShell>
  );
}
