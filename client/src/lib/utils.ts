import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UseFormSetError } from 'react-hook-form';
import { EntityError } from './http';
import { toast } from '@/components/ui/use-toast';
import { decode } from 'jsonwebtoken';
export type PayloadJWT = {
    userId: string;
    iat: number;
    exp: number;
    tokenType: string;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
    error,
    setError,
    duration,
}: {
    error: any;
    setError?: UseFormSetError<any>;
    duration?: number;
}) => {
    if (error instanceof EntityError && setError) {
        if (error.status === 422) {
            error.payload.errors.forEach((item) => {
                setError(item.field, {
                    type: 'server',
                    message: item.message,
                });
            });
        } else {
            toast({
                title: 'Error',
                description: error.payload.message ?? 'Lỗi không xác định',
                variant: 'destructive',
                duration: duration ?? 5000,
            });
        }
    }
    return [{ field: '', message: 'Something went wrong' }];
};

/**
 * Hàm check / nếu có thì xóa đi
 */
export const clearPath = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path;
};

export const decodeJWT = <Payload = PayloadJWT>(token: string) => {
    return decode(token) as Payload;
};
