import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuthStore } from 'stores/auth'

export function middleware(request: NextRequest) {
    const { isLoggedIn } = useAuthStore()
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/sign-in'))
    }
}

export const config = {
    matcher: '/console/*',
}