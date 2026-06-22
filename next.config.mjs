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
            // www → apex (http & https)
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.cybexonics.com' }],
                destination: 'https://cybexonics.com/:path*',
                permanent: true,
            },
            // http → https (non-www)
            {
                source: '/:path*',
                has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
                destination: 'https://cybexonics.com/:path*',
                permanent: true,
            },
        ]
    },

    async headers() {
        return [{
            source: '/:path*',
            headers: [
                // Tell Google the canonical domain
                {
                    key: 'Link',
                    value: '<https://cybexonics.com>; rel="canonical"',
                },
            ],
        }, ]
    },
}

export default nextConfig