import React from 'react';
import { Article } from '../types';
import { X, Bookmark, ArrowUpRight, Trash2, BookOpen } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (article: Article, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  const totalMinutes = savedArticles.reduce((acc, a) => {
    const mins = parseInt(a.readTime.split(' ')[0], 10) || 7;
    return acc + mins;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#FAF8F5] dark:bg-[#181716] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <h3 className="text-base font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
              Your Reading Tray
            </h3>
            <span className="text-xs font-mono text-stone-400">({savedArticles.length})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-stone-300 dark:text-stone-700 mx-auto" />
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Your reading tray is currently empty.
              </p>
              <p className="text-xs text-stone-400">
                Click the bookmark icon on any essay to curate your personal queue.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 hover:bg-stone-100/50 dark:hover:bg-stone-850/50 transition-colors flex items-start justify-between gap-4 group"
              >
                <div
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="space-y-1 cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="text-amber-800 dark:text-amber-400 font-medium">{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="text-sm font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-1">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => onRemoveBookmark(article, e)}
                    className="p-1 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title="Remove from tray"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    title="Read essay"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="px-6 py-3.5 bg-stone-100/70 dark:bg-stone-850/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>Approx. {totalMinutes} minutes total reading time</span>
            <button
              onClick={onClearAll}
              className="text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Clear tray
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
