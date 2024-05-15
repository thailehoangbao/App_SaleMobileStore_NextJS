import { LoginResType } from '@/components/schemaValidations/auth.schema';
import { clearPath } from './utils';
import { redirect } from 'next/navigation';

type CustomOptions = RequestInit & { baseUrl?: string; headers?: {} };

const ENTITY_ERROR_STATUS = 422;

//401 khai báo hết hạn token
const AUTHENTICATION_ERROR_STATUS = 401;

//Do backend quy định trả về
type EntityErrorPayload = {
    message: string;
    errors: {
        field: string;
        message: string;
    }[];
};

export class HttpError extends Error {
    status: number;
    payload: {
        message: string;
        [key: string]: any;
    };
    constructor({ status, payload }: { status: number; payload: any }) {
        super('Http Error');
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    status: 422;
    payload: EntityErrorPayload; // định dạng theo form error backend
    constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
        super({ status, payload });
        if (status !== ENTITY_ERROR_STATUS) {
            throw new Error('EntityError must have 422 status');
        }
        this.status = status;
        this.payload = payload;
    }
}

// class SessionTokenClient {
//     private token = '';
//     private _expiresAt = new Date().toISOString();
//     get value() {
//         return this.token;
//     }
//     set value(token: string) {
//         //Nếu gọi method này ở server thì bi lỗi
//         if (typeof window === 'undefined') {
//             throw new Error('Cannot set token on server side');
//         }
//         this.token = token;
//     }
//     get expiresAt() {
//         return this._expiresAt;
//     }
//     set expiresAt(expiresAt: string) {
//         if (typeof window === 'undefined') {
//             throw new Error('Cannot set expirerAt on server side');
//         }
//         this._expiresAt = expiresAt;
//     }
// }

// export const sessionTokenClient = new SessionTokenClient();

let logoutRequestOneCall: any = null;
export const isClient = () => typeof window !== 'undefined';
const request = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    let body: FormData | undefined | string = undefined;
    if (options?.body) {
        if (options.body instanceof FormData) {
            body = options.body;
        } else {
            body = JSON.stringify(options.body);
        }
    }
    // const body = options?.body ? JSON.stringify(options.body) : undefined;
    // const baseHeaders = body instanceof FormData ?
    // {
    //     Authorization: sessionTokenClient.value ? `Bearer ${sessionTokenClient.value}` : '',
    // } :  {
    //     'Content-Type': 'application/json',
    //     Authorization: sessionTokenClient.value ? `Bearer ${sessionTokenClient.value}` : '',
    // }

    //Nếu không truyền baseUrl hoặc baseurl = undefined thì lấy từ biến môi trường NEXT_PUBLIC_API_ENDPOINT
    // Nếu có truyền vào thì lấy giá trị đó còn truyền rỗng thì đồng nghĩa ta gọi APi đến next server
    const baseHeaders: {
        [key: string]: string;
    } = body instanceof FormData ? {} : { 'Content-Type': 'application/json' };
    if (isClient()) {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`;
        }
    }
    const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_ENDPOINT : options?.baseUrl;

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    const response = await fetch(fullUrl, {
        method,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as any,
        body,
    });

    const payload: any = await response.json();
    const data = {
        status: response.status,
        payload,
    };

    if (!response.ok) {
        if (response.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(data as { status: 422; payload: EntityErrorPayload });
        } else if (response.status === AUTHENTICATION_ERROR_STATUS) {
            //Xử lí hết hạn token khi backend trả lỗi 401 token hết hạn, client gửi api lên next server xóa token
            if (!logoutRequestOneCall) {
                if (isClient()) {
                    logoutRequestOneCall = await fetch('/api/auth/logout', {
                        method: 'POST',
                        body: JSON.stringify({ force: true }),
                        headers: {
                            ...baseHeaders,
                        } as any,
                    });
                    try {
                        await logoutRequestOneCall;
                    } catch (error) {
                        
                    } finally {
                        //phía client xóa token
                        // sessionTokenClient.value = '';
                        // sessionTokenClient.expiresAt = new Date().toISOString();
                        localStorage.removeItem('sessionToken');
                        localStorage.removeItem('expiresAt');
                        //sử dụng location chỉ ở client
                        logoutRequestOneCall = null;
                        location.href = `/login?redirectLogin=/logout`;
                    }
                } else {
                    //gọi api logout từ next server => serverbackend, cho gọi đến component logout
                    const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1];
                    redirect(`/logout?sessionToken=${sessionToken}`);
                }
            }
        } else {
            throw new HttpError(data);
        }
    }

    //Đoạn code dưới chỉ hoạt động trong moi trường client
    if (isClient()) {
        if (['auth/login', 'auth/register'].some((item) => item === clearPath(url))) {
            const {token} = (payload as LoginResType).data;
            const {expiresAt} = (payload as LoginResType).data;
            localStorage.setItem('sessionToken', token);
            localStorage.setItem('expiresAt', expiresAt);
            // sessionTokenClient.value = (payload as LoginResType).data.token;
            // sessionTokenClient.expiresAt = (payload as LoginResType).data.expiresAt;
        } else if ('auth/logout' === clearPath(url)) {
            // sessionTokenClient.value = '';
            // sessionTokenClient.expiresAt = new Date().toISOString();
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('expiresAt');
        }
    }

    return data;
};

const http = {
    //Omit là loại bỏ kiểu dữ liệu kg cần thiết trong 1 kiểu dữ liệu cho trước
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('POST', url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('PUT', url, { ...options, body });
    },
    delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('DELETE', url, { ...options, body });
    },
};

export default http;
