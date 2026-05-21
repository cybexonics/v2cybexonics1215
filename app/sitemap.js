export default function sitemap() {
    return [{
            url: 'https://cybexonics.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://cybexonics.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://cybexonics.com/services',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://cybexonics.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]
}