import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PageView, Article, Category } from './types';
import { ARTICLES } from './data/articles';
import { updateMetaTags } from './utils/seo';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturedArticlesSection } from './components/FeaturedArticlesSection';
import { AllArticlesSection } from './components/AllArticlesSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ArticleView } from './components/ArticleView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { SitemapModal } from './components/SitemapModal';
import { RobotsModal } from './components/RobotsModal';

export default function App() {
  // 1. Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nexora_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexora_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexora_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // 2. Bookmarks State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexora_bookmarks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return ['1', '8']; // sensible default saved essays
  });

  useEffect(() => {
    localStorage.setItem('nexora_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) =>
      prev.includes(article.id) ? prev.filter((id) => id !== article.id) : [...prev, article.id]
    );
  };

  const removeBookmark = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => prev.filter((id) => id !== article.id));
  };

  const clearAllBookmarks = () => setBookmarks([]);

  // 3. Routing & Navigation
  const parseHashToPage = useCallback((): PageView => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === '') return { type: 'home' };
    if (hash === 'articles') return { type: 'articles' };
    if (hash === 'about') return { type: 'about' };
    if (hash === 'contact') return { type: 'contact' };
    if (hash === 'sitemap') return { type: 'sitemap' };
    if (hash === 'robots') return { type: 'robots' };
    if (hash.startsWith('article/') || hash.startsWith('articles/')) {
      const slug = hash.replace(/^articles?\//, '');
      return { type: 'article', slug };
    }
    return { type: 'home' };
  }, []);

  const [currentPage, setCurrentPage] = useState<PageView>(parseHashToPage);

  const navigateTo = useCallback((page: PageView) => {
    setCurrentPage(page);
    let newHash = '';
    if (page.type === 'home') newHash = '';
    else if (page.type === 'articles') newHash = 'articles';
    else if (page.type === 'about') newHash = 'about';
    else if (page.type === 'contact') newHash = 'contact';
    else if (page.type === 'sitemap') newHash = 'sitemap';
    else if (page.type === 'robots') newHash = 'robots';
    else if (page.type === 'article') newHash = `articles/${page.slug}`;

    window.history.pushState(null, '', newHash ? `#${newHash}` : window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser Back / Forward events
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(parseHashToPage());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [parseHashToPage]);

  // 4. Modals State
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [robotsOpen, setRobotsOpen] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / slash)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName || '')
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 5. Active Article resolution
  const activeArticle = useMemo(() => {
    if (currentPage.type === 'article') {
      return ARTICLES.find((a) => a.slug === currentPage.slug) || ARTICLES[0];
    }
    return null;
  }, [currentPage]);

  // Featured articles
  const leadFeaturedArticle = ARTICLES[0]; // Your Phone Knows More About You Than You Think
  const secondaryFeaturedArticles = useMemo(
    () => ARTICLES.filter((a) => a.id === '2' || a.id === '3' || a.id === '6'),
    []
  );

  const savedArticleObjects = useMemo(
    () => ARTICLES.filter((a) => bookmarks.includes(a.id)),
    [bookmarks]
  );

  // 6. Dynamic SEO & Meta synchronization
  useEffect(() => {
    if (currentPage.type === 'article' && activeArticle) {
      updateMetaTags({
        title: `${activeArticle.title} – Nexora Journal`,
        description: activeArticle.excerpt,
        canonicalUrl: `https://nexora.publication/articles/${activeArticle.slug}`,
        ogType: 'article',
        ogImage: activeArticle.image,
        article: activeArticle
      });
    } else if (currentPage.type === 'articles') {
      updateMetaTags({
        title: 'All 10 Inquiries – Nexora: The Hidden Side of Technology',
        description:
          'Explore our collection of 10 thoughtful inquiries into algorithms, smartphones, privacy, artificial intelligence, attention, and the future of work.',
        canonicalUrl: 'https://nexora.publication/articles'
      });
    } else if (currentPage.type === 'about') {
      updateMetaTags({
        title: 'About & Curatorial Manifesto – Nexora',
        description:
          'Discover the founding philosophy and curatorial standards of Nexora—a thoughtful publication exploring the hidden mechanics of modern technology.',
        canonicalUrl: 'https://nexora.publication/about'
      });
    } else if (currentPage.type === 'contact') {
      updateMetaTags({
        title: 'Editorial Bureau & Submissions – Nexora',
        description:
          'Send letters to the editor, research pitches, factual inquiries, and syndication requests directly to the Nexora editorial desk.',
        canonicalUrl: 'https://nexora.publication/contact'
      });
    } else {
      updateMetaTags({
        title: 'Nexora – The Hidden Side of Technology',
        description:
          'A thoughtful editorial publication exploring how technology quietly affects our everyday lives, behavior, privacy, attention, relationships, work, and the future.',
        canonicalUrl: 'https://nexora.publication/'
      });
    }
  }, [currentPage, activeArticle]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 dark:bg-[#121110] dark:text-stone-100 transition-colors duration-200">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
        savedCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {currentPage.type === 'home' && (
          <>
            <HeroSection
              featuredArticle={leadFeaturedArticle}
              onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
              onSelectCategory={(cat: Category) =>
                navigateTo({ type: 'articles', categoryFilter: cat })
              }
            />

            <FeaturedArticlesSection
              articles={secondaryFeaturedArticles}
              onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
            />

            <AllArticlesSection
              articles={ARTICLES}
              onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
            />

            <NewsletterSection />
          </>
        )}

        {/* VIEW 2: ARTICLES DIRECTORY */}
        {currentPage.type === 'articles' && (
          <div className="pt-4">
            <AllArticlesSection
              articles={ARTICLES}
              onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
              initialCategory={currentPage.categoryFilter || 'All'}
              initialSearch={currentPage.searchQuery || ''}
            />
            <NewsletterSection />
          </div>
        )}

        {/* VIEW 3: INDIVIDUAL ARTICLE VIEW */}
        {currentPage.type === 'article' && activeArticle && (
          <ArticleView
            article={activeArticle}
            allArticles={ARTICLES}
            onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
            onBackToArticles={() => navigateTo({ type: 'articles' })}
            isBookmarked={bookmarks.includes(activeArticle.id)}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {/* VIEW 4: ABOUT VIEW */}
        {currentPage.type === 'about' && <AboutView onNavigate={navigateTo} />}

        {/* VIEW 5: CONTACT VIEW */}
        {currentPage.type === 'contact' && <ContactView />}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenSitemap={() => setSitemapOpen(true)}
        onOpenRobots={() => setRobotsOpen(true)}
      />

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
      />

      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        savedArticles={savedArticleObjects}
        onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
        onRemoveBookmark={removeBookmark}
        onClearAll={clearAllBookmarks}
      />

      <SitemapModal
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(art) => navigateTo({ type: 'article', slug: art.slug })}
      />

      <RobotsModal
        isOpen={robotsOpen}
        onClose={() => setRobotsOpen(false)}
      />
    </div>
  );
}
