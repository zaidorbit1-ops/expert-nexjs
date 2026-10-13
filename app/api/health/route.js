import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('categories').select('id').limit(1);
    if (error) throw error;
    return NextResponse.json({ success: true, database: true, provider: 'supabase' });
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return NextResponse.json({
      success: false,
      database: false,
      message: 'Could not connect to Supabase. Check the URL, anon key, and schema setup.',
    }, { status: 503 });
  }
}
