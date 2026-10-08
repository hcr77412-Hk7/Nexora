import { Article } from '../types';

export function updateMetaTags(options: {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  article?: Article;
}) {
  const { title, description, canonicalUrl = window.location.href, ogType = 'website', ogImage, article } = options;

  // 1. Update Title
  document.title = title;

  // 2. Helper to set or update meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attribute, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Update standard meta
  setMeta('description', description);

  // 4. Update Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', ogType, true);
  setMeta('og:url', canonicalUrl, true);
  if (ogImage) {
    setMeta('og:image', ogImage, true);
  }

  // 5. Update Twitter / X
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  if (ogImage) {
    setMeta('twitter:image', ogImage);
  }

  // 6. Update Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 7. Update JSON-LD Script
  let jsonLdEl = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.id = 'dynamic-jsonld';
    jsonLdEl.type = 'application/ld+json';
    document.head.appendChild(jsonLdEl);
  }

  if (article) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      headline: article.title,
      alternativeHeadline: article.subtitle,
      description: article.excerpt,
      inLanguage: 'en-US',
      datePublished: article.isoDate,
      dateModified: article.isoDate,
      wordCount: article.wordCount,
      articleSection: article.category,
      keywords: article.tags.join(', '),
      image: article.image,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
        description: article.author.bio
      },
      publisher: {
        '@type': 'Organization',
        name: 'Nexora',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nexora.publication/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    };
    jsonLdEl.textContent = JSON.stringify(articleSchema, null, 2);
  } else {
    const generalSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Nexora',
      url: canonicalUrl,
      description: description,
      publisher: {
        '@type': 'Organization',
        name: 'Nexora Editorial'
      }
    };
    jsonLdEl.textContent = JSON.stringify(generalSchema, null, 2);
  }
}

export function generateSitemapXml(articles: Article[]): string {
  const baseUrl = 'https://nexora.publication';
  const currentDate = new Date().toISOString().split('T')[0];

  interface SitemapItem {
    loc: string;
    lastmod?: string;
    priority: string;
    changefreq: string;
  }

  const staticUrls: SitemapItem[] = [
    { loc: `${baseUrl}/`, lastmod: currentDate, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/articles`, lastmod: currentDate, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/contact`, priority: '0.6', changefreq: 'monthly' }
  ];

  const articleUrls: SitemapItem[] = articles.map((article) => ({
    loc: `${baseUrl}/articles/${article.slug}`,
    lastmod: article.isoDate,
    priority: article.featured ? '0.9' : '0.8',
    changefreq: 'monthly'
  }));

  const allUrls: SitemapItem[] = [...staticUrls, ...articleUrls];

  const xmlItems = allUrls
    .map(
      (item) => `  <url>
    <loc>${item.loc}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : `<lastmod>${currentDate}</lastmod>`}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;
}

export function generateRobotsTxt(): string {
  return `# Robots.txt for Nexora Ideas & Thought Publication
# Canonical Host: https://nexora.publication

User-agent: *
Allow: /
Disallow: /api/
Disallow: /private/

# Sitemaps
Sitemap: https://nexora.publication/sitemap.xml
`;
}
