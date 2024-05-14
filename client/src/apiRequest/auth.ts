import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType, SlideSessionResType } from "@/components/schemaValidations/auth.schema";
import { MessageResType } from "@/components/schemaValidations/common.schema";
import http from "@/lib/http";

const authApiRequest = {
    //không truyền options mặc định gửi api về server
    login:  (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
    register:  (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),
    authNextServer: (body: {sessionToken: string, expiresAt: string}) => http.post('/api/auth', body, {
        baseUrl: ''
    }),
    logoutFormNextServerToServer: (sessionToken: string) => http.post<MessageResType>('/auth/logout', {}, {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    }),
    logoutFormNextClientToNextServer: (force?: boolean | undefined, signal? : AbortSignal | undefined) => http.post<MessageResType>('/api/auth/logout', 
    {
        force
    },
    {
        baseUrl:'',
        signal
    }),
    slideSessionNextClientToNextServer: (force?: boolean | undefined) => http.post<SlideSessionResType>('/api/auth/slide-session', {force},{
        baseUrl: ''
    }),
    slideSessionNextServerToServer: (sessionToken: string) => http.post<SlideSessionResType>('/auth/slide-session', {}, {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    })
}

export default authApiRequest;
