'use client';
import React, {  Ref, RefObject, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {  LoginResType } from '@/components/schemaValidations/auth.schema';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/lib/utils';
import { CreateProductBody, CreateProductBodyType } from '@/components/schemaValidations/product.schema';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import productsApiRequest from '@/apiRequest/product';

function AddFormProduct() {
    const refInput = useRef<HTMLInputElement | null>(null)
    const [image, setImage] = useState<File | null>(null);
    const [loading,setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: '',
            description: '',
            image: '',
            price: 0,
        },
    });
    // 2. Define a submit handler.
    async function onSubmit(values: CreateProductBodyType) {
        if(loading) {
            return
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', image as Blob);
            const result = await productsApiRequest.uploadImage(formData);
            // console.log(result)
            const rs = await productsApiRequest.createProduct({
                ...values,
                image: result.payload.data
            })
            toast({
                title: 'Thêm thành công sản phẩm',
                description: result.payload?.data?.message
            });
            router.prefetch('/products/product-list');
            router.push('/products/product-list');
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên Sản Phẩm</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập Tên Sản Phẩm" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá </FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập Giá" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô Tả </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Nhập Mô Tả" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hình Ảnh </FormLabel>
                            <FormControl>
                                <Input 
                                    ref={refInput}
                                    placeholder="Nhập Hình Ảnh" 
                                    type="file" 
                                    accept='image/*'
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImage(file);
                                            field.onChange('http://localhost:3000/'+ file.name);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {image && (
                    <div>
                        <Image src={URL.createObjectURL(image)} alt="image" className="w-20 h-20" width={100} height={100} />
                        <Button onClick={() => {
                            setImage(null)
                            form.setValue('image', '')
                            if(refInput.current) {
                                refInput.current.value = ''
                            }
                        }}>Xóa Ảnh</Button>
                    </div>
                
                ) }
                <Button type="submit">Cập Nhật</Button>
            </form>
        </Form>
    );
}

export default AddFormProduct;
