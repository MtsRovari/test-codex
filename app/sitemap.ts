import { MetadataRoute } from 'next';
import { countries, getVisasByCountry } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://visa-atlas.example';
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/countries`, lastModified: new Date() },
    { url: `${baseUrl}/topics`, lastModified: new Date() },
    { url: `${baseUrl}/search`, lastModified: new Date() },
    { url: `${baseUrl}/legal/disclaimer`, lastModified: new Date() },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date() }
  ];

  countries.forEach((country) => {
    routes.push({ url: `${baseUrl}/countries/${country.slug}`, lastModified: new Date(country.lastUpdated) });
    routes.push({ url: `${baseUrl}/countries/${country.slug}/visas`, lastModified: new Date(country.lastUpdated) });
    const visas = getVisasByCountry(country.slug);
    visas.forEach((visa) => {
      routes.push({ url: `${baseUrl}/countries/${country.slug}/visa/${visa.code}`, lastModified: new Date(visa.lastUpdated) });
    });
  });

  return routes;
}
