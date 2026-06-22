/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },

    async redirects() {
        return [
            // Only this one — www → apex
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.cybexonics.com' }],
                destination: 'https://cybexonics.com/:path*',
                permanent: true,
            },
        ]
    },
}

export default nextConfig