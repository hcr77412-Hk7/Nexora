import React from 'react';
import { PageView } from '../types';
import { ArrowRight, BookOpen, Compass, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
            <span>Manifesto & Purpose</span>
            <span aria-hidden="true">·</span>
            <span>The Hidden Side of Technology</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15]">
            Illuminating the unseen mechanics of modern technology.
          </h1>

          <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-300 font-serif-editorial italic leading-relaxed">
            Nexora Tech is an independent editorial publication exploring how software, algorithms, smartphones, and artificial intelligence quietly alter our psychology, privacy, attention, and future.
          </p>
        </div>

        {/* Founding Philosophy */}
        <section className="space-y-6 text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            Most technology coverage focuses either on gadget consumerism—reviewing the latest camera lenses and phone iterations—or celebratory press releases from Silicon Valley venture rounds.
          </p>
          <p>
            Nexora Tech was founded to explore the questions left in the shadows: What does our smartphone sensor telemetry reveal about our emotional state? How do recommendation engines quietly shape the bounds of public discourse? What happens to the human capacity for deep creativity when micro-stimulus eliminates boredom?
          </p>
          <p>
            We do not publish daily gadget news or partisan outrage. We publish deeply researched, accessible investigations into the systems quietly re-architecting human society.
          </p>
        </section>

        {/* Editorial Pillars */}
        <section className="pt-8 border-t border-stone-200 dark:border-stone-800">
          <h2 className="text-2xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mb-8">
            The Nexora Tech Editorial Principles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2.5 p-6 rounded-xl bg-stone-100/50 dark:bg-stone-900/40 border border-stone-200/70 dark:border-stone-800/70">
              <div className="text-amber-800 dark:text-amber-400 font-mono text-xs font-semibold">
                Principle 01
              </div>
              <h3 className="text-lg font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
                High-Signal, Zero-Filler
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Every essay is written to stand the test of years, not hours. If an argument can be stated in three sentences, we do not stretch it to three thousand.
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-xl bg-stone-100/50 dark:bg-stone-900/40 border border-stone-200/70 dark:border-stone-800/70">
              <div className="text-amber-800 dark:text-amber-400 font-mono text-xs font-semibold">
                Principle 02
              </div>
              <h3 className="text-lg font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
                Multidisciplinary Anchoring
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Breakthroughs do not happen in siloes. We weave neurobiology with economics, classical philosophy with computational complexity, and history with forecasting.
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-xl bg-stone-100/50 dark:bg-stone-900/40 border border-stone-200/70 dark:border-stone-800/70">
              <div className="text-amber-800 dark:text-amber-400 font-mono text-xs font-semibold">
                Principle 03
              </div>
              <h3 className="text-lg font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
                Attentional Sovereignty
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                No third-party behavioral telemetry, no floating video popups, and no gamified notification bells. We treat our readers’ attention with dignity.
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-xl bg-stone-100/50 dark:bg-stone-900/40 border border-stone-200/70 dark:border-stone-800/70">
              <div className="text-amber-800 dark:text-amber-400 font-mono text-xs font-semibold">
                Principle 04
              </div>
              <h3 className="text-lg font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
                Intellectual Courage
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We are unafraid to challenge comfortable consensus, explore counterintuitive probabilities, and question the structural orthodoxies of our time.
              </p>
            </div>
          </div>
        </section>

        {/* Masthead / Curatorial Board */}
        <section className="pt-8 border-t border-stone-200 dark:border-stone-800">
          <h2 className="text-2xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 mb-8">
            The Curatorial Board
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800/70">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
                className="w-14 h-14 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Elena Rostova
                </h3>
                <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                  Editor-at-Large · Cognitive Culture
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Investigates attentional sovereignty, digital minimalism, and modern behavioral science.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800/70">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Marcus Vance"
                className="w-14 h-14 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Dr. Marcus Vance
                </h3>
                <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                  Senior Fellow · Computational Epistemology
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Examines neural interfaces, machine intelligence, and the philosophical boundaries of human reasoning.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800/70">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
                alt="Julian Sterling"
                className="w-14 h-14 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Julian Sterling
                </h3>
                <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                  Contributing Editor · Risk & Futures
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Focuses on complex systems, technological forecasting, and structural labor dynamics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800/70">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Timothy P. Callow"
                className="w-14 h-14 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Dr. Timothy P. Callow
                </h3>
                <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                  Research Fellow · Behavioral Psychology
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Studies emotional self-regulation, time perception, and the cognitive traps of avoidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to explore essays */}
        <div className="pt-8 text-center">
          <button
            onClick={() => onNavigate({ type: 'articles' })}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
          >
            <span>Explore The 10 Inquiries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
