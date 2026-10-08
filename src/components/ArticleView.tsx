import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { SafeImage } from './SafeImage';
import { ArticleCard } from './ArticleCard';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  Check,
  Twitter,
  Linkedin,
  Type,
  Printer,
  Clock,
  Calendar,
  BookOpen
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onBackToArticles: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article, e: React.MouseEvent) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onSelectArticle,
  onBackToArticles,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Previous & Next navigation
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Related articles
  const relatedArticles = allArticles.filter(
    (a) => article.relatedIds.includes(a.id) || (a.category === article.category && a.id !== article.id)
  ).slice(0, 3);

  // Copy Link Handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" via Nexora Tech`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-xl leading-relaxed sm:text-[22px] sm:leading-[1.85]'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed sm:text-[19px] sm:leading-[1.8]'
      : 'text-base leading-relaxed sm:text-lg sm:leading-[1.75]';

  return (
    <article className="min-h-screen pb-24">
      {/* Sticky Reading Progress Rail */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-stone-200/40 dark:bg-stone-800/40 z-50">
        <div
          className="h-full bg-amber-700 dark:bg-amber-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/60 dark:border-stone-800/60 text-xs text-stone-500 dark:text-stone-400">
          <button
            onClick={onBackToArticles}
            className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Essays</span>
          </button>

          <div className="flex items-center gap-2 font-mono">
            <span>{article.category}</span>
            <span aria-hidden="true">/</span>
            <span>{article.wordCount} words</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-14">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400 mb-4">
            <span className="text-amber-800 dark:text-amber-400 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.publishDate}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-[1.18] max-w-3xl" style={{ textWrap: 'balance' }}>
            {article.title}
          </h1>

          <p className="mt-4 sm:mt-5 text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Card & Actions Bar */}
          <div className="mt-8 pt-6 border-t border-stone-200/70 dark:border-stone-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover ring-1 ring-stone-300 dark:ring-stone-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {article.author.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  {article.author.role}
                </div>
              </div>
            </div>

            {/* Social Share & Reading Utilities */}
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
              {/* Text size selector */}
              <div className="flex items-center bg-stone-100 dark:bg-stone-850 rounded-lg p-0.5 border border-stone-200/70 dark:border-stone-700/70 text-xs font-medium">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded transition-colors ${
                    fontSize === 'normal'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'hover:text-stone-900 dark:hover:text-white'
                  }`}
                  title="Standard text size"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded transition-colors text-sm font-semibold ${
                    fontSize === 'large'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'hover:text-stone-900 dark:hover:text-white'
                  }`}
                  title="Larger text size"
                >
                  A+
                </button>
              </div>

              {/* Bookmark */}
              <button
                onClick={(e) => onToggleBookmark(article, e)}
                aria-label={isBookmarked ? 'Remove from bookmarks' : 'Save essay to bookmarks'}
                className="p-2 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg bg-stone-100/70 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-700/70 transition-colors"
                title="Bookmark for later"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked ? 'fill-amber-700 text-amber-700 dark:fill-amber-400 dark:text-amber-400' : ''
                  }`}
                />
              </button>

              {/* Share Twitter */}
              <button
                onClick={shareToTwitter}
                className="p-2 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg bg-stone-100/70 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-700/70 transition-colors"
                title="Share to X"
                aria-label="Share to X"
              >
                <Twitter className="w-4 h-4" />
              </button>

              {/* Share LinkedIn */}
              <button
                onClick={shareToLinkedin}
                className="p-2 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg bg-stone-100/70 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-700/70 transition-colors"
                title="Share to LinkedIn"
                aria-label="Share to LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="p-2 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg bg-stone-100/70 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-700/70 transition-colors relative"
                title="Copy essay link"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Print */}
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex p-2 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg bg-stone-100/70 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-700/70 transition-colors"
                title="Print or PDF view"
                aria-label="Print essay"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {copied && (
            <div className="mt-3 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center animate-fadeIn">
              Essay link copied to clipboard.
            </div>
          )}
        </header>

        {/* Hero Image & Figure Caption */}
        <figure className="mb-12">
          <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
            <SafeImage
              src={article.image}
              alt={article.imageAlt}
              aspectRatioClass="aspect-[16/10] sm:aspect-[16/9]"
              category={article.category}
            />
          </div>
          {article.caption && (
            <figcaption className="mt-3 text-xs text-stone-500 dark:text-stone-400 italic text-center font-serif">
              {article.caption}
            </figcaption>
          )}
        </figure>

        {/* Curated Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <aside className="mb-12 p-6 sm:p-7 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border-l-4 border-amber-800 dark:border-amber-400">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Key Editorial Insights</span>
            </div>
            <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-amber-800 dark:text-amber-400 text-xs mt-0.5 font-bold">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Editorial Reading Body */}
        <div className={`prose-container max-w-none text-stone-800 dark:text-stone-200 ${fontSizeClass}`}>
          
          {/* Opening Sections */}
          {article.sections.map((section, idx) => (
            <section key={idx} className="mb-10">
              {section.title && (
                <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mt-10 mb-4 tracking-tight">
                  {section.title}
                </h2>
              )}

              <div className="space-y-5">
                {section.content.map((paragraph, pIdx) => {
                  const isDropcap = idx === 0 && pIdx === 0;
                  
                  // Helper to parse markdown links [Text](slug)
                  const renderTextWithLinks = (raw: string) => {
                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    const elements: React.ReactNode[] = [];
                    let lastIdx = 0;
                    let m: RegExpExecArray | null;

                    while ((m = linkRegex.exec(raw)) !== null) {
                      if (m.index > lastIdx) {
                        elements.push(raw.substring(lastIdx, m.index));
                      }
                      const linkLabel = m[1];
                      const linkTarget = m[2];
                      const cleanSlug = linkTarget.replace(/^#?\/?(articles\/)?/, '');
                      const matchedArticle = allArticles.find((a) => a.slug === cleanSlug);

                      if (matchedArticle) {
                        elements.push(
                          <button
                            key={`${m.index}-${cleanSlug}`}
                            type="button"
                            onClick={() => onSelectArticle(matchedArticle)}
                            className="inline font-medium text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-800/40 hover:decoration-amber-800 dark:decoration-amber-400/40 dark:hover:decoration-amber-400 underline-offset-2 transition-colors cursor-pointer text-left"
                            title={`Read related Nexora inquiry: ${matchedArticle.title}`}
                          >
                            {linkLabel}
                          </button>
                        );
                      } else {
                        elements.push(
                          <a
                            key={`${m.index}-${linkTarget}`}
                            href={linkTarget}
                            className="inline font-medium text-amber-800 dark:text-amber-400 hover:underline"
                          >
                            {linkLabel}
                          </a>
                        );
                      }
                      lastIdx = m.index + m[0].length;
                    }

                    if (lastIdx < raw.length) {
                      elements.push(raw.substring(lastIdx));
                    }

                    return elements.length > 0 ? elements : raw;
                  };

                  return (
                    <p
                      key={pIdx}
                      className={`leading-relaxed ${isDropcap ? 'dropcap' : ''}`}
                    >
                      {renderTextWithLinks(paragraph)}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Pull Quote */}
          {article.pullQuote && (
            <blockquote className="my-12 py-8 px-6 sm:px-10 border-y border-stone-200 dark:border-stone-800 text-center bg-stone-50/50 dark:bg-stone-900/30 rounded-lg">
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif-editorial italic text-stone-900 dark:text-stone-100 leading-snug">
                “{article.pullQuote.text}”
              </p>
              <cite className="block mt-4 text-xs tracking-wider uppercase text-stone-500 dark:text-stone-400 font-sans not-italic font-medium">
                — {article.pullQuote.author}
              </cite>
            </blockquote>
          )}

          {/* Conclusion */}
          {article.conclusion && (
            <section className="mt-10 pt-8 border-t border-stone-200/80 dark:border-stone-800/80">
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
                Synthesized Perspective
              </h2>
              <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif-editorial italic text-lg sm:text-xl">
                {article.conclusion}
              </p>
            </section>
          )}

        </div>

        {/* Tags Row */}
        <div className="mt-12 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono mr-2">
              Tags:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Detailed Author Bio Box */}
        <section className="mt-12 p-6 sm:p-8 rounded-xl bg-stone-100/60 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-300 dark:ring-stone-700 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {article.author.name}
              </h3>
              <span className="text-xs text-stone-400 dark:text-stone-500">·</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">{article.author.role}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </section>

        {/* Previous / Next Article Navigation Bar */}
        <nav aria-label="Previous and Next Articles" className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="p-5 text-left rounded-xl border border-stone-200/70 dark:border-stone-800/70 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-900/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500 font-medium mb-1">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Essay</span>
              </div>
              <h4 className="text-sm font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 line-clamp-1 transition-colors">
                {prevArticle.title}
              </h4>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextArticle && (
            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="p-5 text-right rounded-xl border border-stone-200/70 dark:border-stone-800/70 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-900/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1 text-xs text-stone-400 dark:text-stone-500 font-medium mb-1">
                <span>Next Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-sm font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 line-clamp-1 transition-colors">
                {nextArticle.title}
              </h4>
            </button>
          )}
        </nav>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-800">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
                Further Reading
              </span>
              <h3 className="text-2xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mt-1">
                Related Inquiries
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onSelect={onSelectArticle}
                  isBookmarked={false}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
