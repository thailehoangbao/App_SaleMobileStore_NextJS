// const Auth = false;

import { Metadata } from "next";

//SEO
export const metadata: Metadata = {
    title: 'Trang chủ',
};
export default function Home() {
    // if(!Auth) {
    //   redirect('/login');
    // }
    return (
        <main>
            {/* <Card /> */}
            {/* <div className="w-[700px] h-[700px] bg-red-300">
                <Image
                    className="w-[500px] h-[500px]"
                    src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223"
                    alt="123"
                    width={300}
                    height={300}
                    quality={100}
                />
        </div> */}
        </main>
    );
}
