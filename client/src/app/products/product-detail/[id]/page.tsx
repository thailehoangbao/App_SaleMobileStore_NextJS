import productsApiRequest from "@/apiRequest/product";
import { cache } from 'react'
import { baseOpenGraph } from "@/app/shared-metadata";
import { AccountResType } from "@/components/schemaValidations/account.schema";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from 'next'
import { ProductResType } from "@/components/schemaValidations/product.schema";
import envConfig from "@/config";

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

    const { payload }: { payload: ProductResType } = await getDetail(Number(id));
    const url = envConfig.NEXT_PUBLIC_URL + '/products/product-detail/' + id;
    return {
        //Open Graph seo metadata
        openGraph: {
            ...baseOpenGraph,
            title: payload.data.name,
            description: payload.data.description,
            url,
            siteName: 'Productics Company',
            images: [
                {
                    url: payload.data.image, // Must be an absolute URL
                    width: 800,
                    height: 600,
                }
            ]
        },
        alternates: {
            canonical:url,
            languages: {
                'en-US': '/en-US',
                'de-DE': '/de-DE',
            },
        }
    }
}

async function ProductDetail({ params, searchParams }: Props) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    const { id } = params;
    const { payload } = await getDetail(Number(id));
    const product = payload?.data;
    return (<div className="flex justify-center align-middle">
        {!product && (<h1>Không có sản phẩm</h1>)}
        <Card className="w-96 h-96">
            <CardHeader>
                <CardTitle>Tên Sản Phẩm: {product.name}</CardTitle>
                <CardDescription>Mô Tả: {product.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Giá : {product.price}</p>
            </CardContent>
            <CardFooter>
                <Image src={product.image} alt={product.name} width={200} height={300} />
                {sessionToken && (
                    <Link href={`/products/product-edit/${id}`}><Button variant={'destructive'} >Edit</Button></Link>
                )}
            </CardFooter>
        </Card>
    </div>);
}

export default ProductDetail;