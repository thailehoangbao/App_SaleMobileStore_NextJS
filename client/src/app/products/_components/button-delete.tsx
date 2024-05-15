'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import productsApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { HttpError } from "@/lib/http";

// import { HttpError, sessionTokenClient } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

function ButtonDelete({ id }: { id: number }) {
    const { toast } = useToast();
    const router = useRouter();
    // const sessionToken = sessionTokenClient.value;
    const sessionToken = String(localStorage.getItem('sessionToken'));
    const handleDelete = async () => {
        try {
            const { payload } = await productsApiRequest.productDelete(id, sessionToken, {});
            if (payload) {
                toast({
                    title: 'Product Deleted',
                    description: payload.message,
                });
            }
            router.prefetch('/products/product-list');
            router.push('/products/product-list');
            router.refresh()
        } catch (error) {
            if (error instanceof HttpError) {
                handleErrorApi({error});
            }
        }
    }
    
    return (<div>
        <AlertDialog>
            <AlertDialogTrigger asChild>

            <Button className='bg-red-500 text-yellow-50 hover:text-red-500' >Delete</Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn chắc chắn muốn xóa ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bấm continue để xóa sản phẩm vĩnh viễn
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction  onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </div>);
}

export default ButtonDelete;