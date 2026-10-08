import React from 'react';
import { Article, Category } from '../types';
import { SafeImage } from './SafeImage';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  featuredArticle: Article;
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (category: Category) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredArticle,
  onSelectArticle,
  onSelectCategory
}) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-20 border-b border-stone-200/70 dark:border-stone-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header & Headline */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-medium mb-3">
            <span>Special Report</span>
            <span aria-hidden="true">·</span>
            <span>The Hidden Side of Technology</span>
            <span aria-hidden="true">·</span>
            <span>Nexora Tech</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-[1.12]">
            How technology quietly shapes our everyday lives.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
            Nexora Tech is a thoughtful technology publication exploring the unseen mechanisms behind algorithms, smartphones, digital privacy, artificial intelligence, and the psychology of our connected world.
          </p>
        </div>

        {/* Lead Featured Essay Banner */}
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800/90 bg-stone-100/40 dark:bg-stone-900/40 hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Visual Column */}
          <div className="lg:col-span-7 relative overflow-hidden min-h-[320px] lg:min-h-[460px]">
            <SafeImage
              src={featuredArticle.image}
              alt={featuredArticle.imageAlt}
              aspectRatioClass="h-full w-full"
              category={featuredArticle.category}
              className="group-hover:scale-102 transition-transform duration-700 h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Editorial Lead Text Column */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Zero-Pill Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                <span className="text-amber-800 dark:text-amber-400 font-semibold uppercase tracking-wider">
                  Lead Essay
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3 lg:line-clamp-4">
                {featuredArticle.subtitle} {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-8 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-300 dark:ring-stone-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {featuredArticle.author.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {featuredArticle.publishDate}
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                Read full essay <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
