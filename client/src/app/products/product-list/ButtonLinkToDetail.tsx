'use client'
import { useAppContext } from "@/app/AppProvider";
import { ProductListResType } from "@/components/schemaValidations/product.schema";
import { Link } from "lucide-react";
import Image from "next/image";

function ButtonLinkToDetail({product}: {product : ProductListResType['data'][0]}) {
    const { isAuthenticated } : any = useAppContext();
    return (<>
        {!isAuthenticated ? (
            <Link href={`/products/product-detail/${product.id}`}>
                <Image src={product.image} alt={product.name} width={60} height={60} />
            </Link>
        ) : (
            <Image src={product.image} alt={product.name} width={60} height={60} />
        )}
    </>);
}

export default ButtonLinkToDetail;