
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tuzlasupply.com';
  
  // CORE PAGES
  const routes = [
    '',
    '/catalog',
    '/company/about',
    '/company/contact',
    '/company/insights',
    '/rfq',
    '/solutions/provision',
    '/solutions/technical',
    '/solutions/safety',
    '/solutions/logistics',
  ];

  // PORT SEO HUB
  const ports = ['tuzla', 'yalova', 'istanbul', 'izmit', 'aliaga'];
  
  // BLOG/INSIGHTS EXPANSION (FOR SEO DEPTH)
  const insights = [
    'understanding-impa-codes',
    'engine-overhaul-optimization',
    'maritime-safety-standards',
    'logistics-hub-turkey',
    'provisioning-quality-control',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Promise<Date>((resolve) => resolve(new Date())),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...ports.map((port) => ({
      url: `${baseUrl}/ports/${port}`,
      lastModified: new Promise<Date>((resolve) => resolve(new Date())),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...insights.map((slug) => ({
      url: `${baseUrl}/company/insights/${slug}`,
      lastModified: new Promise<Date>((resolve) => resolve(new Date())),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return sitemapEntries;
}
