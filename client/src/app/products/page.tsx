import { Metadata } from "next";
// import AddFormProduct from "./_add-product";
import ProductList from "./product-list/page";

//SEO
export const metadata: Metadata = {
    title: 'Trang Danh Sách Sản Phẩm',
    description: 'Danh sách sản phẩm được tạo bởi Thái Bảo dev'
};


function Product() {
    return ( <div>
        <h1>Product Page</h1>
        {/* <AddFormProduct /> */}
        {/* <ProductList /> */}
    </div> );
}

export default Product;