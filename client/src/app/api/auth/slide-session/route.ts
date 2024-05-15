import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    if( body.force ) {
        return Response.json({
            message: 'Buộc đăng xuất thành công'
        }, {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
            },
        });
    }
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    if (!sessionToken) {
        return Response.json(
            { message: 'Không nhận được token' },
            {
                status: 400,
            },
        );
    }

    try {
        const result = await authApiRequest.slideSessionNextServerToServer(sessionToken.value);
        const expiresTime = result.payload.data.expiresAt;
        const newExpiresTime = new Date(expiresTime).toUTCString();
        return Response.json(result.payload, {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=${sessionToken.value}; Path=/; HttpOnly; Expires=${newExpiresTime}; SameSite=Lax; Secure`,
            },
        });
    } catch (error) {
        if (error instanceof HttpError) {
            return Response.json(
                error.payload, {
                    status: error.status,
                }
            );
        } else {
            return Response.json({
                message: 'Lỗi không xác định',
            }, {
                status: 500,
            })
        }
    }
}
