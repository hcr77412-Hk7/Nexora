import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface FeaturedArticlesSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  bookmarks: string[];
  onToggleBookmark: (article: Article, e: React.MouseEvent) => void;
}

export const FeaturedArticlesSection: React.FC<FeaturedArticlesSectionProps> = ({
  articles,
  onSelectArticle,
  bookmarks,
  onToggleBookmark
}) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-14 sm:py-18 border-b border-stone-200/70 dark:border-stone-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200/60 dark:border-stone-800/60 gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
              Curated Selections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mt-1">
              Featured Inquiries
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Handpicked investigations into cognition, computational leverage, and emergent societal patterns.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={bookmarks.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
