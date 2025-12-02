import { createClient } from '@/src/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    // **عملیات اصلی: تبادل کد با سشن**
    // این متد کوکی‌های سوپابیس (Access Token, Refresh Token) را در مرورگر تنظیم می‌کند.
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // ریدایرکت به مسیر اصلی پس از لاگین موفق
      return NextResponse.redirect(requestUrl.origin)
    }
  }

  // در صورت خطا در احراز هویت، به صفحه لاگین بازگردانده شود.
  return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`)
}