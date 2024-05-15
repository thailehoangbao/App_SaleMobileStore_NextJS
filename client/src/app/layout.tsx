import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import {Roboto} from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppProvider from './AppProvider';
import { cookies } from 'next/headers';
import accountApiRequest from '@/apiRequest/account';
import { baseOpenGraph } from './shared-metadata';
import { AccountResType } from '@/components/schemaValidations/account.schema';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/components/Header'), { ssr: false })
// Font files can be colocated inside of `pages`
// const myFont = localFont({
//     src: [
//         {
//             path: './Poppins/Poppins-ExtraBold.ttf',
//             weight: 'bold',
//         },
//         {
//             path: './Poppins/Poppins-Regular.ttf',
//             weight: 'normal',
//         },
//     ],
//     display: 'swap',
//     variable: '--font-tailwind',
// });

const inter = Inter({ subsets: ['vietnamese'] });

//SEO
export const metadata: Metadata = {
    title: {
        template: '%s | Productic',
        default: 'Productic'
    },
    description: 'Thái Bảo Dev',
    openGraph: baseOpenGraph
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const cookieStore = cookies();
    // const sessionToken = cookieStore.get('sessionToken');
    // if(sessionToken) {
    //     const {payload} = await accountApiRequest.meServer(sessionToken.value)
    //     if(payload) {
    //         user = payload.data;
    //     }
    // }
    return (
        <html lang="en" suppressHydrationWarning>
            {/* <body className={`${inter.className}`}>
                <Toaster />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AppProvider innititalSessionToken={sessionToken?.value} user={user}>
                        <Header user={user}/>
                        {children}
                    </AppProvider>
                </ThemeProvider>
            </body> */}
            <body className={`${inter.className}`}>
                <Toaster />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AppProvider>
                        <Header/>
                        {children}
                    </AppProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
