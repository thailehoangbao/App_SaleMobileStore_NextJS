//middlware chạy trên môi trường server
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
//nếu đường dẫn mà người ta truy cập vào là những đường dẫn thuộc private path
const privatePath = ['/me'];
const authPath = ['/login', '/register'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get('sessionToken')?.value;
    //Chưa đăng nhập thì không cho vào privatePath
    if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    //Đăng nhập rồi thì kg cho vào login/register
    if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
        return NextResponse.redirect(new URL('/me', request.url));
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/me', '/login', '/register'],
};
