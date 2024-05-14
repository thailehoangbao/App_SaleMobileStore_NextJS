'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginBody, LoginBodyType, LoginResType } from '@/components/schemaValidations/auth.schema';
import { useToast } from '@/components/ui/use-toast';
// import { useAppContext } from '@/app/AppProvider';
import authApiRequest from '@/apiRequest/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { sessionTokenClient } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
type PayloadType = {
    payload: {
        data: LoginResType | Response;
        message: string;
    } | Response,
    status: number;
}
function LoginForm() {
    const searchParams = useSearchParams();
    const pathname = searchParams.get('redirectLogin');
    const [loading,setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    // const { setSessionToken } = useAppContext();
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    // 2. Define a submit handler.
    async function onSubmit(values: LoginBodyType) {
        if(loading) {
            return
        }
        setLoading(true);
        //subtmit thành công in values
        try {
            const {payload} : {payload : LoginResType} = await authApiRequest.login(values)
            //Khi login Thành công gọi 1 api đến next server để setCookies
            await authApiRequest.authNextServer({ sessionToken: payload?.data.token, expiresAt: sessionTokenClient.expiresAt})
            // console.log(resultFromNextServer)
            // sau khi lưu cookie trên server xong set lại sessionToken vào cho các compoent ở client đều xài dc trong context
            // setSessionToken(result.payload.data.token);
            sessionTokenClient.value = payload?.data.token;
            toast({
                title: 'Đăng Nhập Thành Công',
                description: payload.message
            });
            router.push('/me');
            router.refresh();
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError,
                duration: 2000
            })
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if(pathname === '/logout') {
            toast({
                title: 'Buộc Đăng Xuất Thành Công',
                description: 'Bạn đã đăng xuất khỏi hệ thống',            
            })
        }
    },[])
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (error) => {
                    console.log(error);
                })}
                className="space-y-2 max-w-[400px] flex-1"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập Email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Đăng Nhập</Button>
            </form>
        </Form>
    );
}

export default LoginForm;
