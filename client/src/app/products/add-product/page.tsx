// import AddFormProduct from ".";
import dynamic from 'next/dynamic';
const AddFormProduct = dynamic(() => import('./AddFormProduct'), { ssr: false })
export default function AddProduct() {
    return ( <>
        <AddFormProduct />
    </> );
}

