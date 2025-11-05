import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/countries', '/topics', '/search', '/countries/*'],
      disallow: ['/account']
    },
    sitemap: 'https://visa-atlas.example/sitemap.xml'
  };
}
