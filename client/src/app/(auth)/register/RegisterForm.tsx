'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterBody, RegisterBodyType, RegisterResType } from '@/components/schemaValidations/auth.schema';
import authApiRequest from '@/apiRequest/auth';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';
import { useAppContext } from '@/app/AppProvider';

function RegiterForm() {

    const [loading,setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    const { setUser }: any = useAppContext();
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });
    // 2. Define a submit handler.
    async function onSubmit(values: RegisterBodyType) {
        //subtmit thành công in values
        if(loading) {
            return
        }
        setLoading(true);
        try {
            const {payload} : {payload: RegisterResType} = await authApiRequest.register(values)

            //Khi login Thành công gọi 1 api đến next server để setCookies
            await authApiRequest.authNextServer({ sessionToken: payload.data.token, expiresAt: payload.data.expiresAt})
            toast({
                title: 'Đăng Nhập Thành Công',
                description: payload?.message,
            });
            setUser(payload.data.account);
            router.push('/login');
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
                    name="name"
                    render={({ field, formState: { errors } }) => (
                        <FormItem>
                            <FormLabel>UserName</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập User Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            <div>{errors.name && <span className="text-red-500">{errors.name.message}</span>}</div>
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập lại password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Đăng Ký</Button>
            </form>
        </Form>
    );
}

export default RegiterForm;
