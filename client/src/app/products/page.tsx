import { Metadata } from "next";
import ProductList from "./product-list/page";

//SEO
export const metadata: Metadata = {
    title: 'Trang Danh Sách Sản Phẩm',
    description: 'Danh sách sản phẩm được tạo bởi Thái Bảo dev'
};


function Product() {
    return ( <div>
        <h1>Product Page</h1>
    </div> );
}

export default Product;