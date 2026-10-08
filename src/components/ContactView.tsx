import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, MessageSquare, BookOpen, Shield } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Editorial Pitch',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Editorial Bureau</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100 tracking-tight">
            Letters, Inquiries & Pitches
          </h1>

          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Nexora welcomes rigorous pitches, corrections, letters to the editor, and institutional dialogues. Every substantive message is reviewed by our editorial desk.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Form Column */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-xl bg-stone-100 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-left space-y-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xl font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
                  Message Transmitted
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900 dark:text-stone-100">{formData.name}</span>. Your dispatch has been logged in the editorial queue. Our desk reviews incoming correspondence each Thursday.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', department: 'Editorial Pitch', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-750 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  Send another dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-stone-50/50 dark:bg-stone-900/30 p-6 sm:p-8 rounded-xl border border-stone-200/80 dark:border-stone-800/80">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Arthur Miller"
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-500 text-stone-900 dark:text-stone-100 placeholder-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. arthur@oxford.edu"
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-500 text-stone-900 dark:text-stone-100 placeholder-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold mb-1.5">
                    Department / Inquiry Type
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-500 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Editorial Pitch">Essay Pitch / Proposal</option>
                    <option value="Letter to the Editor">Letter to the Editor</option>
                    <option value="Factual Correction">Factual Correction / Citation</option>
                    <option value="Syndication & Rights">Syndication & Academic Rights</option>
                    <option value="General Inquiry">General Correspondence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold mb-1.5">
                    Your Dispatch *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide your thesis, proposal, or feedback with clarity..."
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-500 text-stone-900 dark:text-stone-100 placeholder-stone-400 leading-relaxed"
                  />
                </div>

                {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit to Editorial Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-stone-100/60 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>Pitching Guidelines</span>
              </div>
              <h3 className="text-base font-serif-editorial font-medium text-stone-900 dark:text-stone-100">
                What We Look For
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                We accept original essays between 1,400 and 2,500 words. We prioritize contrarian, research-backed theses over derivative summaries.
              </p>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc list-inside">
                <li>Clear first-principles thesis in paragraph 1</li>
                <li>Primary scientific or historical citations</li>
                <li>No sponsored or promotional bylines</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-stone-100/60 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                <Shield className="w-4 h-4" />
                <span>Editorial Privacy</span>
              </div>
              <p className="leading-relaxed">
                Sources may request confidential background communications. We do not log visitor IP addresses or share editorial inboxes with external services.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
