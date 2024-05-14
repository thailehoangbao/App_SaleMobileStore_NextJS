/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        //cho phép thẻ Image src là đường dẫn của website khác, chinh hostname, pathname
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'chiemtaimobile.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
