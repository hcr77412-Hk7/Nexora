import React, { useState } from 'react';
import { Article } from '../types';
import { generateSitemapXml } from '../utils/seo';
import { X, Copy, Check, FileCode, ListTree, ArrowUpRight } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml'>('visual');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const xmlContent = generateSitemapXml(articles);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#181716] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
              Sitemap Architecture (sitemap.xml)
            </h3>
            <div className="flex items-center p-0.5 bg-stone-200/80 dark:bg-stone-800 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'visual'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white font-medium shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <ListTree className="w-3.5 h-3.5" />
                <span>Visual Tree</span>
              </button>
              <button
                onClick={() => setActiveTab('xml')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'xml'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white font-medium shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Raw XML</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm">
          {activeTab === 'visual' ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold mb-2 font-mono">
                  Static Core Routes (Priority 1.0 - 0.7)
                </h4>
                <div className="space-y-2 border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-900 dark:text-stone-100">/</span>
                    <span className="text-stone-500">Homepage (Daily) · 1.0</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-900 dark:text-stone-100">/articles</span>
                    <span className="text-stone-500">Articles Directory (Daily) · 0.9</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-900 dark:text-stone-100">/about</span>
                    <span className="text-stone-500">Manifesto & Masthead (Monthly) · 0.7</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-900 dark:text-stone-100">/contact</span>
                    <span className="text-stone-500">Bureau Contact (Monthly) · 0.6</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold mb-2 font-mono">
                  Canonical Essay URLs ({articles.length} Inquiries)
                </h4>
                <div className="space-y-2 border-l-2 border-amber-800/40 dark:border-amber-400/40 pl-4 py-1">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="flex items-center justify-between text-xs hover:bg-stone-100 dark:hover:bg-stone-850 p-1.5 rounded cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-stone-700 dark:text-stone-300 group-hover:text-amber-800 dark:group-hover:text-amber-300">
                          /articles/{article.slug}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-stone-400 font-mono text-[11px]">
                        {article.isoDate} · {article.featured ? '0.9' : '0.8'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <pre className="p-4 bg-stone-900 text-stone-200 text-xs rounded-xl font-mono overflow-x-auto max-h-[50vh] leading-relaxed selection:bg-stone-700">
                {xmlContent}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-100/70 dark:bg-stone-850/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Compliant with sitemaps.org 0.9 standard</span>
          {activeTab === 'xml' && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 rounded text-stone-900 dark:text-stone-100 font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy XML'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
