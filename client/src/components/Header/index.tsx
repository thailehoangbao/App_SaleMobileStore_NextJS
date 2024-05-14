import Link from 'next/link';
import ButtonLogOut from './Button-Logout';
import SlideSession from '../Slide_Session';
import clsx from 'clsx'
import style from './Header.module.css'
import { cookies } from 'next/headers';
import { AccountResType } from '../schemaValidations/account.schema';
import accountApiRequest from '@/apiRequest/account';
import { useAppContext } from '@/app/AppProvider';
async function Header({ user }: { user: AccountResType['data'] | undefined }) {
    // const cookieStore = cookies();
    // const sessionToken = cookieStore.get('sessionToken');
    // let user = undefined;
    // if(sessionToken){
    //     const {payload} = await accountApiRequest.meServer(sessionToken.value);
    //     user = payload.data as AccountResType['data'];
    // }
    return (
        <div>
            <ul className='flex justify-center align-middle'>
                {!user ? (<>
                    <li className={clsx(`${style.style__li}`)}>
                        <Link href="/login">Đăng Nhập</Link>
                    </li>
                    <li className={clsx(`${style.style__li}`)}>
                        <Link href="/register">Đăng Ký</Link>
                    </li>
                </>) : (<>
                    <li className={clsx(`${style.style__li}`)}>
                        <Link href={'/me'}>
                            <span>Xin chào ! {user?.name}</span>
                        </Link>
                    </li>

                    <li className={clsx(`${style.style__li}`)}>
                        <Link href="/products">Sản Phẩm</Link>
                    </li>
                </>)}

                <li className={clsx(`${style.style__li}`)}>
                    <Link href="/products/product-list">Danh Sách Sản Phẩm</Link>
                </li>

                {
                    user && (
                        <li className={clsx(`${style.style__li}`)}>
                            <ButtonLogOut />
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Header;
