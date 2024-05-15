'use client';
import React, {  useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from '@/components/schemaValidations/account.schema';
import accountApiRequest from '@/apiRequest/account';
import SlideSession from '@/components/Slide_Session';

type ProfileType = AccountResType['data']
function ProfileForm({ profile }: { profile: ProfileType }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: profile.name,
        },
    });
    // 2. Define a submit handler.
    async function onSubmit(values: UpdateMeBodyType) {
        if (loading) {
            return
        }
        setLoading(true);
        //subtmit thành công in values
        try {
            const {payload} : {payload: AccountResType} = await accountApiRequest.updateMe(values)
            toast({
                title: 'Đăng Nhập Thành Công',
                description: payload?.message
            });
            // Giúp gọi lại api lên next server cập nhật payload, refresh lại server
            router.refresh()
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
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, (error) => {
                        console.log(error);
                    })}
                    className="space-y-2 max-w-[400px] flex-1"
                >
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Nhập Email" type="email" disabled value={profile.email} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập Tên" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='bg-green-500 hover:bg-green-950 text-white hover:text-green-400'>Cập Nhật</Button>
                </form>
            </Form>
            <SlideSession />
        </>
    );
}

export default ProfileForm;
