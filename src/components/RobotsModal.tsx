import React, { useState } from 'react';
import { generateRobotsTxt } from '../utils/seo';
import { X, Copy, Check, ShieldCheck } from 'lucide-react';

interface RobotsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RobotsModal: React.FC<RobotsModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const robotsContent = generateRobotsTxt();

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#FAF8F5] dark:bg-[#181716] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
              Robots.txt Crawl Directive
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Standard crawler directive instructing search spiders (Googlebot, Bingbot, DuckDuckBot) to index all public essay routes while excluding internal API stubs.
          </p>

          <pre className="p-4 bg-stone-900 text-stone-200 text-xs rounded-xl font-mono leading-relaxed overflow-x-auto selection:bg-stone-700">
            {robotsContent}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-100/70 dark:bg-stone-850/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Declared at: /robots.txt</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 rounded text-stone-900 dark:text-stone-100 font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Directive'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
