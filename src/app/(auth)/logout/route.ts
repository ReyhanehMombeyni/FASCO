import { createClient } from '@/src/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed.' }, 
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}