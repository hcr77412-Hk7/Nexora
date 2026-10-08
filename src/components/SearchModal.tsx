import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import { Search, X, ArrowUpRight, Clock } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.author.name.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#181716] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 10 essays, authors, topics..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 px-4 text-center">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Type a term such as <span className="text-stone-800 dark:text-stone-200 font-medium">"Attention"</span>,{' '}
                <span className="text-stone-800 dark:text-stone-200 font-medium">"Habits"</span>,{' '}
                <span className="text-stone-800 dark:text-stone-200 font-medium">"Artificial Intelligence"</span>, or{' '}
                <span className="text-stone-800 dark:text-stone-200 font-medium">"2035"</span>.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500 dark:text-stone-400">
              No matching inquiries found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Matching Inquiries ({results.length})
              </div>
              {results.map((article) => (
                <button
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-stone-200/60 dark:hover:bg-stone-800/80 transition-colors flex items-start justify-between gap-4 group cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="text-amber-800 dark:text-amber-400 font-medium">{article.category}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="text-sm font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                      {article.title}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-stone-100/70 dark:bg-stone-850/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
          <span>Search spans titles, full essay texts & citations</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
