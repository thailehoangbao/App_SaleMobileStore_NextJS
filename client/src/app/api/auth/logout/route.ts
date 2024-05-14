import authApiRequest from '@/apiRequest/auth';
import { HttpError } from '@/lib/http';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const res = await request.json();
    const force = res.force as Boolean | undefined;
    //nếu client truyền lên giá trị force trong body thì buộc xóa token
    if(force) {
        return Response.json({
            message: 'Buộc đăng xuất thành công'
        }, {
            status: 200,
            headers: {
                //Xóa cookie
                'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
            },
        });
    }
    //api logout cần sessionToken từ client gửi lên next server để nextserver gửi lên backend
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    if (!sessionToken) {
        return Response.json(
            { message: 'Không nhận được token' },
            {
                status: 401,
            },
        );
    }

    try {
        const result = await authApiRequest.logoutFormNextServerToServer(sessionToken.value);
        return Response.json(result.payload, {
            status: 200,
            headers: {
                //Xóa cookie
                'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
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
