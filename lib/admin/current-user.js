import { createClient } from '../supabase/server';

export async function getCurrentAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name, role')
    .eq('id', user.id)
    .single();

  if (error) throw new Error(`Could not load editorial profile: ${error.message}`);
  return { id: user.id, email: user.email, ...profile };
}
