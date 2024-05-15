'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import ButtonDelete from '../_components/button-delete'
import { ProductListResType } from '@/components/schemaValidations/product.schema'
import { useAppContext } from '@/app/AppProvider'

export default function ButtonLinkToDelete({product}: {product : ProductListResType['data'][0]}) {
    const { isAuthenticated } : any = useAppContext();

    return (
        <>
            {isAuthenticated && (
                <CardFooter >
                    <Link href={`/products/product-detail/${product?.id}`}>
                        <Button className='bg-green-500 text-white hover:text-green-500'>Detail</Button>
                    </Link>
                    <ButtonDelete id={product?.id} />
                </CardFooter>
            )}
        </>
    )
}
