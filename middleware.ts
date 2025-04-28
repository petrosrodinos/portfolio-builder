import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname == '/auth') {
    //     return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    // }

    await updateSession(request)


}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}