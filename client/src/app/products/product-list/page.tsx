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
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
const ButtonLinkToDetail = dynamic(() => import('./ButtonLinkToDetail'), { ssr: false })
const ButtonLinkToDelete = dynamic(() => import('./ButtonLinkToDelete'), { ssr: false })


type ProductList = ProductListResType['data']
type Product = ProductResType['data']


export default async function ProductList() {
    const cookieStore = cookies()
    const { payload }: { payload: ProductListResType } = await productsApiRequest.products();
    const productLists: ProductList = payload?.data;
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
                                <ButtonLinkToDetail product={product} />
                            </CardContent>
                            <CardContent>
                                <p>Chi tiết: {product?.description}</p>
                            </CardContent>
                            <ButtonLinkToDelete product={product} />
                        </Card>
                    </div>
                ))}

            </div>
        </div>
    )
}
