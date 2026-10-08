import React, { useState, useMemo } from 'react';
import { Article, Category } from '../types';
import { CATEGORIES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

interface AllArticlesSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  bookmarks: string[];
  onToggleBookmark: (article: Article, e: React.MouseEvent) => void;
  initialCategory?: Category | 'All';
  initialSearch?: string;
}

export const AllArticlesSection: React.FC<AllArticlesSectionProps> = ({
  articles,
  onSelectArticle,
  bookmarks,
  onToggleBookmark,
  initialCategory = 'All',
  initialSearch = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [readTimeFilter, setReadTimeFilter] = useState<'all' | 'short' | 'long'>('all');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category check
      if (selectedCategory !== 'All' && article.category !== selectedCategory) {
        return false;
      }

      // Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchSubtitle = article.subtitle.toLowerCase().includes(query);
        const matchExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchCategory = article.category.toLowerCase().includes(query);
        const matchTags = article.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchAuthor = article.author.name.toLowerCase().includes(query);

        if (!matchTitle && !matchSubtitle && !matchExcerpt && !matchCategory && !matchTags && !matchAuthor) {
          return false;
        }
      }

      // Read time filter (minutes)
      const minutes = parseInt(article.readTime.split(' ')[0], 10) || 7;
      if (readTimeFilter === 'short' && minutes >= 7) return false;
      if (readTimeFilter === 'long' && minutes < 7) return false;

      return true;
    });
  }, [articles, selectedCategory, searchQuery, readTimeFilter]);

  return (
    <section id="all-articles" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200/60 dark:border-stone-800/60 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
              The Complete Library
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mt-1">
              All Essays & Dispatches
            </h2>
          </div>

          <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Showing {filteredArticles.length} of {articles.length} essays
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          {/* Top row: Search input & Quick Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ideas, topics, thinkers, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Read Time Filter */}
            <div className="flex items-center gap-1 p-1 bg-stone-100/90 dark:bg-stone-850 rounded-lg border border-stone-200/80 dark:border-stone-800/80 text-xs font-medium">
              <button
                onClick={() => setReadTimeFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  readTimeFilter === 'all'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                All Lengths
              </button>
              <button
                onClick={() => setReadTimeFilter('short')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  readTimeFilter === 'short'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Quick (&lt;7m)
              </button>
              <button
                onClick={() => setReadTimeFilter('long')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  readTimeFilter === 'long'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Deep (&ge;7m)
              </button>
            </div>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-100/90 dark:bg-stone-850 rounded-lg border border-stone-200/80 dark:border-stone-800/80">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  layoutMode === 'grid'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                title="Grid layout"
                aria-label="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  layoutMode === 'list'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                title="List layout"
                aria-label="List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom row: Category Filter Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List / Grid */}
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 p-8">
            <p className="text-base text-stone-600 dark:text-stone-400">
              No essays match your current criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setReadTimeFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : layoutMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                isBookmarked={bookmarks.includes(article.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800 space-y-2">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                layout="horizontal"
                onSelect={onSelectArticle}
                isBookmarked={bookmarks.includes(article.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
