import React, { cache } from 'react'
import EditProductForm from './EditProductForm';
import { Metadata, ResolvingMetadata } from 'next'
import { ProductResType } from "@/components/schemaValidations/product.schema";
import productsApiRequest from '@/apiRequest/product';

//hàm hoc cache này dùng để tránh gọi 1 api 2 lần trong khi trước đó đã gọi rồi thì lấy trong cache ra
const getDetail = cache(productsApiRequest.productDetail)
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

//Chỉ dùng được ở server component
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    const { payload } : { payload : ProductResType} = await getDetail(Number(id));

    return {
        title: "Edit sản phẩm "+ payload.data.name,
        description: payload.data.description,
    }
}

export default function EditPage({ params, searchParams }: Props) {
    const { id } = params;
    return (
        <div>
            <h1>Edit Sản Phẩm</h1>
            <EditProductForm id={id}/>
        </div>
    )
}
