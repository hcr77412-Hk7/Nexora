import React from 'react';
import { Article } from '../types';
import { SafeImage } from './SafeImage';
import { Bookmark, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (article: Article, e: React.MouseEvent) => void;
  priority?: boolean;
  layout?: 'standard' | 'horizontal' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
  priority = false,
  layout = 'standard'
}) => {
  if (layout === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 -mx-4 rounded-xl hover:bg-stone-100/70 dark:hover:bg-stone-850/60 transition-colors"
      >
        <div className="md:col-span-5 overflow-hidden rounded-lg">
          <SafeImage
            src={article.image}
            alt={article.imageAlt}
            aspectRatioClass="aspect-[16/10]"
            category={article.category}
            className="group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>

        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-3">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span className="text-amber-800 dark:text-amber-400">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-5 h-5 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span>{article.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {onToggleBookmark && (
                <button
                  onClick={(e) => onToggleBookmark(article, e)}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
                  className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked ? 'fill-amber-700 text-amber-700 dark:fill-amber-400 dark:text-amber-400' : ''
                    }`}
                  />
                </button>
              )}
              <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-medium text-stone-700 dark:text-stone-200">
                Read essay <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer flex flex-col justify-between bg-stone-50/50 dark:bg-stone-900/40 rounded-xl border border-stone-200/70 dark:border-stone-800/70 overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 hover:shadow-xs"
    >
      <div>
        <div className="overflow-hidden">
          <SafeImage
            src={article.image}
            alt={article.imageAlt}
            aspectRatioClass="aspect-[16/10]"
            category={article.category}
            className="group-hover:scale-[1.04] transition-transform duration-700"
          />
        </div>

        <div className="p-6 space-y-3">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span className="text-amber-800 dark:text-amber-400">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-5 h-5 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="truncate max-w-[120px]">{article.author.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleBookmark && (
            <button
              onClick={(e) => onToggleBookmark(article, e)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
              className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-amber-700 text-amber-700 dark:fill-amber-400 dark:text-amber-400' : ''
                }`}
              />
            </button>
          )}
          <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-medium text-stone-700 dark:text-stone-200">
            Read <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
