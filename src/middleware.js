import { NextResponse } from 'next/server'

const accessRules = {
  '/dashboard': ['ADMIN', 'INSTITUTE ADMIN'],

  '/user-management/users': ['ADMIN', 'INSTITUTE ADMIN'],
  '/user-management/admin': ['ADMIN'],

  '/library-department/institute': ['ADMIN'],
  '/library-department/library/add': ['ADMIN'],
  '/library-department/library': ['ADMIN','INSTITUTE ADMIN'],
  '/library-department/department/add': ['ADMIN'],
  '/library-department/department': ['ADMIN','INSTITUTE ADMIN'],
  '/library-department/user-type/add': ['ADMIN'],
  '/library-department/user-type': ['ADMIN', 'INSTITUTE ADMIN'],
  '/library-department/content-group/add': ['ADMIN'],
  '/library-department/content-group': ['ADMIN', 'INSTITUTE ADMIN'],
  '/library-department/program/add': ['ADMIN'],
  '/library-department/program': ['ADMIN', 'INSTITUTE ADMIN'],
  '/library-department/service-group/add': ['ADMIN'],
  '/library-department/service-group': ['ADMIN','INSTITUTE ADMIN'],
  // '/library-department': ['ADMIN', 'INSTITUTE ADMIN'],

  '/resources/item': ['ADMIN', 'INSTITUTE ADMIN'],
  '/resources/item/add': ['ADMIN'],
  '/resources/': ['ADMIN'],
  '/resources/publishers': ['ADMIN'],
  '/resources/publisher-package': ['ADMIN'],

  '/reports': ['ADMIN', 'INSTITUTE ADMIN'],

  '/configuration': ['ADMIN', 'INSTITUTE ADMIN'],

  '/profile/view': ['ADMIN', 'INSTITUTE ADMIN'],
  '/profile/edit': ['ADMIN', 'INSTITUTE ADMIN'],

  '/student-profile': ['STUDENT','STAFF','FACULTY'],
  '/logs': ['ADMIN', 'INSTITUTE ADMIN'],
  '/notification': ['ADMIN', 'INSTITUTE ADMIN'],
  '/search': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
  '/advance-search-filter': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
  '/advance-search': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
  '/change-password': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
  '/e-news-clipping': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
  '/saved-catalog': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
  '/read-history': ['ADMIN', 'INSTITUTE ADMIN','STUDENT','STAFF','FACULTY'],
}

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch (e) {
    return null
  }
}

export function middleware(req) {
  const token = req.cookies.get('access_token')?.value
  const { pathname } = req.nextUrl

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const decoded = decodeJwt(token)
  if (!decoded || !decoded.role) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const userRole = decoded.role.toUpperCase()

  const matchedRoute = Object.keys(accessRules).find((route) =>
    pathname.startsWith(route)
  )

  if (matchedRoute) {
    const allowedRoles = accessRules[matchedRoute]
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/user-management/:path*',
    '/library-department/:path*',
    '/resources/:path*',
    '/configuration/:path*',
    '/profile/:path*',
    '/logs/:path*',
    '/notification/:path*',
    '/reports/:path*',
    '/search/:path*',
    '/student-profile/:path*',
    '/advance-search-filter/:path*',
    '/change-password/:path*',
    '/e-news-clipping/:path*',
  ],
}
