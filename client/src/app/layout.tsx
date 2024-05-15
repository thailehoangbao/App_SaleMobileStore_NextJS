import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppProvider from './AppProvider';
import { baseOpenGraph } from './shared-metadata';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/components/Header'), { ssr: false })


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

    return (
        <html lang="en" suppressHydrationWarning>
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
