import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [cadence, setCadence] = useState<'weekly' | 'monthly'>('weekly');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>The Sunday Dispatch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 tracking-tight">
          One deeply considered idea, delivered each Sunday.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          No algorithmic clickbait, promotional sponsorships, or daily noise. Just rigorous synthesis exploring technology, psychology, and the future.
        </p>

        {submitted ? (
          <div className="mt-8 p-6 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700 max-w-md mx-auto text-left flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                You are enrolled in The Sunday Dispatch.
              </h3>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                A confirmation note has been dispatched to <span className="font-mono text-stone-800 dark:text-stone-200">{email}</span>. You can adjust frequency or unsubscribe with a single click at any time.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            {/* Cadence selector */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center p-1 bg-stone-200/70 dark:bg-stone-800/70 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-400">
                <button
                  type="button"
                  onClick={() => setCadence('weekly')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    cadence === 'weekly'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  Weekly Synthesis
                </button>
                <button
                  type="button"
                  onClick={() => setCadence('monthly')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    cadence === 'monthly'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  Monthly Retrospective
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-500 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {error && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 text-left">{error}</p>}

            <p className="mt-3 text-[11px] text-stone-500 dark:text-stone-400">
              Free forever. We respect your attention and never share your data.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
