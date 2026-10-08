import React, { useState } from 'react';
import { PageView } from '../types';
import { Search, Sun, Moon, Menu, X, Bookmark, Compass } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSearch,
  savedCount,
  onOpenBookmarks
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCurrent = (type: PageView['type']) => currentPage.type === type;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#121110]/90 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onNavigate({ type: 'home' });
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer"
          aria-label="Nexora Home"
        >
          <span className="text-2xl sm:text-3xl font-serif-editorial tracking-tight font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">
            Nexora
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className={`cursor-pointer transition-colors hover:text-stone-900 dark:hover:text-white ${
              isCurrent('home') ? 'text-stone-900 dark:text-white font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate({ type: 'articles' })}
            className={`cursor-pointer transition-colors hover:text-stone-900 dark:hover:text-white ${
              isCurrent('articles') ? 'text-stone-900 dark:text-white font-semibold' : ''
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => onNavigate({ type: 'about' })}
            className={`cursor-pointer transition-colors hover:text-stone-900 dark:hover:text-white ${
              isCurrent('about') ? 'text-stone-900 dark:text-white font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate({ type: 'contact' })}
            className={`cursor-pointer transition-colors hover:text-stone-900 dark:hover:text-white ${
              isCurrent('contact') ? 'text-stone-900 dark:text-white font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Saved, Theme Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 rounded-lg transition-colors cursor-pointer"
            aria-label="Search articles"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-200/70 dark:bg-stone-700/70 rounded text-stone-500 dark:text-stone-400">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="View saved articles"
            title="Saved reading list"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-amber-700 text-white rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#121110] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => {
              onNavigate({ type: 'home' });
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
              isCurrent('home')
                ? 'bg-stone-200/60 dark:bg-stone-800/80 text-stone-900 dark:text-white'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate({ type: 'articles' });
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
              isCurrent('articles')
                ? 'bg-stone-200/60 dark:bg-stone-800/80 text-stone-900 dark:text-white'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => {
              onNavigate({ type: 'about' });
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
              isCurrent('about')
                ? 'bg-stone-200/60 dark:bg-stone-800/80 text-stone-900 dark:text-white'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            About Nexora
          </button>
          <button
            onClick={() => {
              onNavigate({ type: 'contact' });
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
              isCurrent('contact')
                ? 'bg-stone-200/60 dark:bg-stone-800/80 text-stone-900 dark:text-white'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Contact & Submissions
          </button>
        </div>
      )}
    </header>
  );
};
