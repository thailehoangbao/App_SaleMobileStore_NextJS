import productsApiRequest from '@/apiRequest/product'
import Image from 'next/image';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductListResType, ProductResType } from '@/components/schemaValidations/product.schema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ButtonDelete from '../_components/button-delete';
import { cookies } from 'next/headers';

type ProductList = ProductListResType['data']
type Product = ProductResType['data']

export default async function ProductList() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const isAuth = sessionToken ? true : false
    const { payload } : {payload : ProductListResType} = await productsApiRequest.products();
    const productLists : ProductList = payload?.data;
    return (
        <div>
            <h1 className='text-center mt-10'>DANH SÁCH SẢN PHẨM</h1>
            <div className='pt-5 pl-20 pr-20 flex flex-wrap justify-center align-middle'>
                {productLists?.map((product: Product) => (
                    <div key={product?.id}>
                        <Card className='p-3 mr-2 mb-2 w-80 h-80'>
                            <CardHeader>
                                <CardTitle>Tên Sản Phẩm: {product?.name}</CardTitle>
                                <CardDescription>Mô Tả</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Giá bán: {product.price}$</p>
                                {!isAuth ? (
                                    <Link href={`/products/product-detail/${product.id}`}>
                                        <Image src={product.image} alt={product.name} width={60} height={60} />
                                    </Link>
                                ) : (
                                    <Image src={product.image} alt={product.name} width={60} height={60} />
                                )}
                            </CardContent>
                            <CardContent>
                                <p>Chi tiết: {product?.description}</p>
                            </CardContent>
                            {
                                isAuth && (
                                    <CardFooter >
                                        <Link href={`/products/product-detail/${product?.id}`}>
                                            <Button className='bg-green-500 text-white hover:text-green-500'>Detail</Button>
                                        </Link>
                                        <ButtonDelete id={product?.id} />
                                    </CardFooter>
                                )}
                        </Card>
                    </div>
                ))}

            </div>
        </div>
    )
}
