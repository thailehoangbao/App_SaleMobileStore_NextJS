import { ProductListResType, ProductResType, UpdateProductBodyType } from "@/components/schemaValidations/product.schema";
import http from "@/lib/http";

const productsApiRequest = {
    products: () => http.get<ProductListResType>('/products'),
    createProduct: (body: UpdateProductBodyType) => http.post<ProductResType>('/products', body),
    updateProduct: (id: string, body: UpdateProductBodyType) => http.put<ProductResType>(`/products/${id}`, body),
    uploadImage: (body: FormData) => http.post<{ message: string, data: string }>('/media/upload', body),
    productDetail: (id: number) => http.get<ProductResType>(`/products/${id}`),
    productDelete: (id: number, sessionToken: string, body: {} ) => http.delete<{ message: string}>(`/products/${id}`,body,{
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })
}

export default productsApiRequest;