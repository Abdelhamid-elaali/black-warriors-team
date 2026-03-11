import { MetadataRoute } from 'next';

const DOMAIN = process.env.NEXT_PUBLIC_BASE_URL || 'https://blackwarriors.vercel.app'; // Update this to production domain if known

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['en', 'fr', 'ar'];
  const routes = ['', '/squad', '/history', '/media', '/news', '/recruitment'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the absolute root domain
  sitemapEntries.push({
    url: DOMAIN,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Loop through languages and routes
  for (const lang of languages) {
    for (const route of routes) {
      // The default locale structure might require checking base paths
      const relativePath = `/${lang}${route}`;
      sitemapEntries.push({
        url: `${DOMAIN}${relativePath}`,
        lastModified: new Date(),
        changeFrequency: route === '/news' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
