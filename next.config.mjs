/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.20',
                port: '8080',
                pathname: '/api/media/publisher/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.28',
                port: '8080',
                pathname: '/api/media/publisher/**',
            },
        ],
    },
};

export default nextConfig;
