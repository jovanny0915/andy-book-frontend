'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getForumToken } from '@/lib/forumAuth';
import { FORUM_CATEGORIES, type ForumCategoryId } from '@/lib/forumCategories';
import { supabase, isSupabaseAuthConfigured } from '@/lib/supabase';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

type Thread = {
  id: string;
  title: string;
  author_email: string;
  created_at: string;
  reply_count?: number;
  category?: string;
  status?: string;
};

export function ForumSection() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'general';
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState<ForumCategoryId>('general');
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState('');
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  useEffect(() => {
    setToken(getForumToken());
  }, []);

  // Fetch threads for the current category (server-side filter)
  useEffect(() => {
    const want = (categoryParam || 'general').trim().toLowerCase();
    const url = `${apiUrl()}/api/forum/threads${want ? `?category=${encodeURIComponent(want)}` : ''}`;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((data) => setThreads(data.threads || []))
      .catch(() => setThreads([]))
      .finally(() => setLoading(false));
  }, [categoryParam]);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterMessage('');
    setRegisterLoading(true);
    try {
      if (isSupabaseAuthConfigured() && supabase) {
        const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/verify-forum` : '';
        const { error } = await supabase.auth.signInWithOtp({
          email: registerEmail.trim().toLowerCase(),
          options: { emailRedirectTo: redirectTo },
        });
        if (error) {
          setRegisterMessage(error.message || 'Something went wrong.');
          return;
        }
        setRegisterMessage('Check your email for a verification link. Click it to verify and start posting.');
        setRegisterEmail('');
      } else {
        const res = await fetch(`${apiUrl()}/api/forum/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: registerEmail }),
        });
        const data = await res.json().catch(() => ({}));
        setRegisterMessage(data.message || (res.ok ? 'Check your email to verify.' : 'Something went wrong.'));
        if (res.ok) setRegisterEmail('');
      }
    } catch {
      setRegisterMessage('Request failed.');
    } finally {
      setRegisterLoading(false);
    }
  };

  const onCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostError('');
    setPostLoading(true);
    const t = getForumToken();
    if (!t) {
      setPostError('Please verify your email first.');
      setPostLoading(false);
      return;
    }
    try {
      const res = await fetch(`${apiUrl()}/api/forum/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({ title: newTitle, body: newBody, category: newCategory }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPostError(data.message || 'Failed to post.');
        return;
      }
      const currentCat = (categoryParam || 'general').toLowerCase();
      const newCat = String(newCategory).toLowerCase();
      if (currentCat === newCat) {
        setThreads((prev) => [{ ...data, created_at: data.created_at, category: newCategory }, ...prev]);
      }
      setNewTitle('');
      setNewBody('');
      setShowNewThread(false);
    } catch {
      setPostError('Request failed.');
    } finally {
      setPostLoading(false);
    }
  };

  const onReport = async (threadId: string, threadTitle: string) => {
    setReportingId(threadId);
    setReportSuccess(null);
    try {
      const res = await fetch(`${apiUrl()}/api/forum/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ thread_id: threadId, reason: 'Report from forum list' }),
      });
      if (res.ok) {
        setReportSuccess(threadId);
      }
    } catch {
      // silent; backend may not have report yet
    } finally {
      setReportingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const categoryLabel = (cat?: string) => FORUM_CATEGORIES.find((c) => c.slug === cat || c.id === cat)?.label ?? 'General';

  // Threads are already filtered by category from the API
  const displayedThreads = threads;

  return (
    <section className="space-y-8 animate-fade-in">
      <header>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="font-serif text-2xl md:text-3xl text-heritage-navy">
            Discussion forum
          </h1>
          <span className="rounded-full bg-heritage-gold/20 text-heritage-navy px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
            Phase 2
          </span>
        </div>
        <p className="text-heritage-charcoal/90 mt-1">
          Share your thoughts on historical insights. Email registration required. Respectful dialogue only.
        </p>
      </header>

      {/* Email registration – modern card */}
      {!token && (
        <div className="rounded-2xl border border-heritage-gold/25 bg-white/95 backdrop-blur-sm shadow-xl shadow-heritage-navy/5 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 md:p-8">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-heritage-gold/15 flex items-center justify-center">
              <svg className="w-7 h-7 text-heritage-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-lg font-semibold text-heritage-navy">
                Email registration required
              </h2>
              <p className="text-sm text-heritage-charcoal/85 mt-1">
                {isSupabaseAuthConfigured()
                  ? 'Register with your email to post. We’ll send a verification link. Posts may be held for moderation.'
                  : 'Register with your email to post. Email verification must be configured (Supabase) to receive the link.'}
              </p>
              <form onSubmit={onRegister} className="flex flex-wrap gap-3 mt-4">
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 min-w-[200px] rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-3 text-heritage-charcoal placeholder:text-heritage-charcoal/50 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 focus:border-heritage-gold transition-shadow"
                />
                <button
                  type="submit"
                  disabled={registerLoading}
                  className="rounded-xl bg-heritage-navy text-white px-5 py-3 font-semibold shadow-lg shadow-heritage-navy/20 hover:bg-heritage-navy-dark hover:shadow-heritage-gold/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {registerLoading ? 'Sending…' : 'Send verification email'}
                </button>
              </form>
              {registerMessage && (
                <p className="text-sm mt-3 text-heritage-charcoal">{registerMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Topic + thread list card */}
      <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 backdrop-blur-sm shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-heritage-navy/10 bg-gradient-to-r from-heritage-stone/80 to-heritage-parchment/50">
          <h2 className="font-serif text-lg font-semibold text-heritage-navy">
            {categoryLabel(categoryParam)}
          </h2>
          {token && (
            <button
              type="button"
              onClick={() => setShowNewThread(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-heritage-navy text-white px-4 py-2.5 font-semibold shadow-lg shadow-heritage-navy/20 hover:bg-heritage-navy-dark hover:shadow-heritage-gold/20 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Topic
            </button>
          )}
        </div>

        {showNewThread && token && (
          <form
            onSubmit={onCreateThread}
            className="p-5 md:p-6 bg-heritage-stone/40 border-b border-heritage-navy/10 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-heritage-navy/80 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ForumCategoryId)}
                className="w-full max-w-xs rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2.5 text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
              >
                {FORUM_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Topic title"
              required
              className="w-full rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-3 text-heritage-charcoal placeholder:text-heritage-charcoal/50 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
            />
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Your message"
              required
              rows={4}
              className="w-full rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-3 text-heritage-charcoal placeholder:text-heritage-charcoal/50 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 resize-y"
            />
            {postError && <p className="text-sm text-red-600">{postError}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={postLoading}
                className="rounded-xl bg-heritage-navy text-white px-5 py-2.5 font-semibold disabled:opacity-50 hover:bg-heritage-navy-dark transition-colors"
              >
                {postLoading ? 'Posting…' : 'Post'}
              </button>
              <button
                type="button"
                onClick={() => setShowNewThread(false)}
                className="rounded-xl border border-heritage-charcoal/30 bg-white px-5 py-2.5 font-medium text-heritage-charcoal hover:bg-heritage-stone/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Thread list – modern table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-heritage-navy/15 bg-heritage-stone/50">
                <th className="text-left py-3.5 px-4 font-semibold text-heritage-navy">Topic</th>
                <th className="text-left py-3.5 px-4 font-semibold text-heritage-navy w-24">Replies</th>
                <th className="text-left py-3.5 px-4 font-semibold text-heritage-navy w-28">Last post</th>
                <th className="text-right py-3.5 px-4 font-semibold text-heritage-navy w-20">Report</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-10 px-4 text-center text-heritage-charcoal/70">
                    Loading…
                  </td>
                </tr>
              ) : displayedThreads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 px-4 text-center text-heritage-charcoal/70">
                    No threads in this category yet. Be the first to post (after verifying your email).
                  </td>
                </tr>
              ) : (
                displayedThreads.map((t, i) => (
                  <tr
                    key={t.id}
                    className="border-b border-heritage-navy/5 hover:bg-heritage-stone/30 transition-colors"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={t.status === 'pending' ? '#' : `/forum/${t.id}`}
                          className={`font-medium hover:underline ${t.status === 'pending' ? 'text-heritage-charcoal/70 cursor-default' : 'text-heritage-charcoal hover:text-heritage-navy'}`}
                          onClick={t.status === 'pending' ? (e) => e.preventDefault() : undefined}
                        >
                          {t.title}
                        </Link>
                        <span className="rounded-full bg-heritage-navy/10 text-heritage-navy px-2 py-0.5 text-xs font-medium">
                          {categoryLabel(t.category)}
                        </span>
                        {t.status === 'pending' && (
                          <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs font-medium">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-heritage-charcoal/60 mt-0.5">{t.author_email}</p>
                    </td>
                    <td className="py-3.5 px-4 text-heritage-charcoal/80">
                      {t.reply_count !== undefined ? t.reply_count : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-heritage-charcoal/80">
                      {formatDate(t.created_at)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onReport(t.id, t.title)}
                        disabled={!!reportingId}
                        className="inline-flex items-center gap-1 rounded-lg border border-heritage-charcoal/20 px-2.5 py-1.5 text-xs font-medium text-heritage-charcoal hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors disabled:opacity-50"
                        title="Report this post"
                      >
                        {reportSuccess === t.id ? (
                          'Reported'
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Report
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical contest cards */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-heritage-gold/30 pb-2 mb-4">
          <h2 className="font-serif text-xl font-semibold text-heritage-navy">
            Historical contest
          </h2>
          <Link
            href="/forum/admin"
            className="text-xs font-medium text-heritage-charcoal/70 hover:text-heritage-navy"
          >
            Moderation →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 p-6 shadow-xl shadow-heritage-navy/5 flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden border border-heritage-gold/20 bg-heritage-navy/10">
              <Image
                src="/history-book.png"
                alt=""
                width={80}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-semibold text-heritage-navy">Review of Waterman VC case</h3>
              <p className="text-sm text-heritage-charcoal/80 mt-1 mb-4">
                Add your verified signature. Name, email, and consent required.
              </p>
              <Link
                href="/petitions"
                className="inline-flex items-center rounded-xl bg-heritage-navy px-4 py-2.5 text-white text-sm font-semibold hover:bg-heritage-navy-dark transition-colors shadow-lg shadow-heritage-navy/20"
              >
                View details
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 p-6 shadow-xl shadow-heritage-navy/5">
            <h3 className="font-serif text-lg font-semibold text-heritage-navy">Join the discussion</h3>
            <p className="text-sm text-heritage-charcoal/80 mt-1 mb-4">
              A simple, moderated discussion. Register with your email and verify to post. Respectful dialogue only.
            </p>
            <p className="text-xs text-heritage-charcoal/60 mb-4">Moderated discussion.</p>
            <Link
              href="/forum"
              className="inline-flex items-center rounded-xl border-2 border-heritage-navy/30 px-4 py-2.5 text-heritage-navy text-sm font-semibold hover:bg-heritage-navy/5 transition-colors"
            >
              Join the discussion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
