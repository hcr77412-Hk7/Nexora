export type Category =
  | 'Privacy'
  | 'Attention'
  | 'Algorithms'
  | 'Artificial Intelligence'
  | 'Social Behavior'
  | 'Digital Culture'
  | 'Future of Work';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleSection {
  title?: string;
  level?: 'h2' | 'h3';
  content: string[];
  quote?: {
    text: string;
    attribution?: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: Category;
  readTime: string; // e.g. "6 min read"
  publishDate: string; // e.g. "October 4, 2026"
  isoDate: string; // e.g. "2026-10-04"
  wordCount: number;
  featured?: boolean;
  author: Author;
  image: string;
  imageAlt: string;
  caption?: string;
  tags: string[];
  keyTakeaways: string[];
  pullQuote?: {
    text: string;
    author: string;
  };
  sections: ArticleSection[];
  conclusion: string;
  relatedIds: string[];
}

export type PageView =
  | { type: 'home' }
  | { type: 'articles'; categoryFilter?: Category | 'All'; searchQuery?: string }
  | { type: 'article'; slug: string }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'sitemap' }
  | { type: 'robots' };
