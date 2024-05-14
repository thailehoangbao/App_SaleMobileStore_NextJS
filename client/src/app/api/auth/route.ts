// import { PayloadJWT, decodeJWT } from "@/lib/utils";

export async function POST(request: Request) {
    const res = await request.json();
    const sessionToken = res.sessionToken as string;
    const expiresAt = res.expiresAt as string;
    if (!sessionToken) {
        return Response.json(
            { message: 'Không nhận được token' },
            {
                status: 400,
            },
        );
    }
    // const payload = decodeJWT<PayloadJWT>(sessionToken);
    // const expireDate = new Date(payload.exp * 1000).toUTCString(); // convert timestamp to UTC string
    const expireDate = new Date(expiresAt).toUTCString()
    // lưu sessionToken vào client bằng path=/ và next server
    return Response.json(res, {
        status: 200,
        headers: {
            'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expireDate}; SameSite=Lax; Secure`,
        },
    });
}
