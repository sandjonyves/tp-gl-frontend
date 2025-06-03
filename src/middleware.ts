import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes qui nécessitent une authentification
const protectedRoutes = ['/dashboard', '/vehicles'];
// Liste des routes d'authentification
const authRoutes = ['/auth/signin', '/auth/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('auth-token');

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Si l'utilisateur est authentifié et essaie d'accéder aux routes d'authentification
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    // Rediriger vers la page d'accueil au lieu du dashboard
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 