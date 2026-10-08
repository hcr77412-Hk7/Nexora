import React from 'react';
import { PageView, Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenSitemap: () => void;
  onOpenRobots: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSitemap,
  onOpenRobots
}) => {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#121110] text-stone-600 dark:text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
              Nexora
            </span>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed">
              A thoughtful technology publication investigating how algorithms, digital privacy, smartphones, artificial intelligence, and digital incentives quietly reshape human life.
            </p>
            <div className="pt-2 text-xs text-stone-400 dark:text-stone-500 font-mono">
              ISSN 2981-402X · The Hidden Side of Technology
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-900 dark:text-stone-200 font-semibold mb-3">
              Journal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'home' })}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'articles' })}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  All 10 Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  About & Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Topics Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-900 dark:text-stone-200 font-semibold mb-3">
              Core Inquiries
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {(['Privacy', 'Attention', 'Algorithms', 'Artificial Intelligence', 'Social Behavior', 'Digital Culture', 'Future of Work'] as Category[]).map(
                (cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => onNavigate({ type: 'articles', categoryFilter: cat })}
                      className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {cat}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Discover & SEO Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-900 dark:text-stone-200 font-semibold mb-3">
              Standards & SEO
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Sitemap Protocol</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRobots}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Robots.txt Directive</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <span className="text-stone-400 dark:text-stone-500 cursor-not-allowed">
                  RSS Feed (2.0)
                </span>
              </li>
              <li>
                <span className="text-stone-400 dark:text-stone-500 cursor-not-allowed">
                  JSON-LD Graph
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 dark:text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Nexora Publication. All rights reserved. Content crafted with editorial rigor.
          </div>

          {/* Social placeholders */}
          <div className="flex items-center gap-5 text-stone-500 dark:text-stone-400">
            <span className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer transition-colors">
              X / Twitter
            </span>
            <span className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer transition-colors">
              Substack
            </span>
            <span className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer transition-colors">
              LinkedIn
            </span>
            <span className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer transition-colors">
              GitHub
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
