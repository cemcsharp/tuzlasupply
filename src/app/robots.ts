import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/login',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: 'https://tuzlasupply.com/sitemap.xml',
  }
}
