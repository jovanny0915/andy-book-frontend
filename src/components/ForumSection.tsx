'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getForumToken } from '@/lib/forumAuth';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

type Thread = {
  id: string;
  title: string;
  author_email: string;
  created_at: string;
  reply_count?: number;
};

export function ForumSection() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState('');

  useEffect(() => {
    setToken(getForumToken());
  }, []);

  useEffect(() => {
    fetch(`${apiUrl()}/api/forum/threads`)
      .then((r) => r.json())
      .then((data) => setThreads(data.threads || []))
      .catch(() => setThreads([]))
      .finally(() => setLoading(false));
  }, []);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterMessage('');
    setRegisterLoading(true);
    try {
      const res = await fetch(`${apiUrl()}/api/forum/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registerEmail }),
      });
      const data = await res.json().catch(() => ({}));
      setRegisterMessage(data.message || (res.ok ? 'Check your email to verify.' : 'Something went wrong.'));
      if (res.ok) setRegisterEmail('');
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
        body: JSON.stringify({ title: newTitle, body: newBody }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPostError(data.message || 'Failed to post.');
        return;
      }
      setThreads((prev) => [{ ...data, created_at: data.created_at }, ...prev]);
      setNewTitle('');
      setNewBody('');
      setShowNewThread(false);
    } catch {
      setPostError('Request failed.');
    } finally {
      setPostLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <section className="space-y-8">
      {/* Discussion forum header */}
      <header>
        <h1 className="font-serif text-2xl md:text-3xl text-heritage-navy">
          Discussion forum
        </h1>
        <p className="text-heritage-charcoal/90 mt-1">
          Share your thoughts on historical insights.
        </p>
      </header>

      {/* Email registration when not verified */}
      {!token && (
        <div className="border border-heritage-navy/20 rounded-lg p-6 bg-white/80 shadow-sm">
          <p className="text-sm text-heritage-charcoal mb-3">
            Register with your email to post. We’ll send a verification link. Posts may be held for moderation.
          </p>
          <form onSubmit={onRegister} className="flex flex-wrap gap-2">
            <input
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="border border-heritage-charcoal/30 rounded px-3 py-2 flex-1 min-w-[200px] bg-white"
            />
            <button
              type="submit"
              disabled={registerLoading}
              className="bg-heritage-navy text-white px-4 py-2 rounded font-medium disabled:opacity-50 hover:bg-heritage-navy-light"
            >
              {registerLoading ? 'Sending…' : 'Send verification email'}
            </button>
          </form>
          {registerMessage && (
            <p className="text-sm mt-2 text-heritage-charcoal">{registerMessage}</p>
          )}
        </div>
      )}

      {/* New Topic row + table */}
      <div className="rounded-lg border border-heritage-navy/15 bg-white/90 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-heritage-navy/10 bg-heritage-stone/40">
          <h2 className="font-serif text-lg text-heritage-navy">New Topic</h2>
          {token && (
            <button
              type="button"
              onClick={() => setShowNewThread(true)}
              className="inline-flex items-center gap-2 bg-heritage-navy text-white px-4 py-2 rounded font-medium hover:bg-heritage-navy-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              New Topic
            </button>
          )}
        </div>

        {showNewThread && token && (
          <form
            onSubmit={onCreateThread}
            className="p-4 md:p-6 bg-heritage-stone/30 border-b border-heritage-navy/10 space-y-3"
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Topic title"
              required
              className="w-full border border-heritage-charcoal/30 rounded px-3 py-2 bg-white"
            />
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Your message"
              required
              rows={4}
              className="w-full border border-heritage-charcoal/30 rounded px-3 py-2 bg-white"
            />
            {postError && <p className="text-sm text-red-600">{postError}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={postLoading}
                className="bg-heritage-navy text-white px-4 py-2 rounded font-medium disabled:opacity-50"
              >
                {postLoading ? 'Posting…' : 'Post'}
              </button>
              <button
                type="button"
                onClick={() => setShowNewThread(false)}
                className="border border-heritage-charcoal/30 px-4 py-2 rounded bg-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Topics table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-heritage-navy/15 bg-heritage-stone/50">
                <th className="text-left py-3 px-4 font-medium text-heritage-navy w-8">
                  <span className="sr-only">Select</span>
                </th>
                <th className="text-left py-3 px-4 font-medium text-heritage-navy">Topic</th>
                <th className="text-left py-3 px-4 font-medium text-heritage-navy w-20">Views</th>
                <th className="text-left py-3 px-4 font-medium text-heritage-navy w-20">Replies</th>
                <th className="text-left py-3 px-4 font-medium text-heritage-navy w-28">Last Post</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-6 px-4 text-heritage-charcoal/70">
                    Loading…
                  </td>
                </tr>
              ) : threads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 px-4 text-heritage-charcoal/70">
                    No threads yet. Be the first to post (after verifying your email).
                  </td>
                </tr>
              ) : (
                threads.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-heritage-navy/5 hover:bg-heritage-stone/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded border-heritage-charcoal/30" aria-label={`Select ${t.title}`} />
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/forum/${t.id}`} className="font-medium text-heritage-charcoal hover:text-heritage-navy hover:underline">
                        {t.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-heritage-charcoal/80">—</td>
                    <td className="py-3 px-4 text-heritage-charcoal/80">
                      {t.reply_count !== undefined ? t.reply_count : '—'}
                    </td>
                    <td className="py-3 px-4 text-heritage-charcoal/80">
                      {formatDate(t.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical contest – two cards */}
      <div>
        <h2 className="font-serif text-xl text-heritage-navy border-b border-heritage-gold/30 pb-2 mb-4">
          Historical contest
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card: Review of Waterman VC Case */}
          <div className="rounded-xl border border-heritage-navy/15 bg-white/95 p-6 shadow-md flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden border border-heritage-gold/20 bg-heritage-navy/10">
              <Image
                src="/history-book.png"
                alt=""
                width={80}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-heritage-navy">Review of Waterman VC case</h3>
              <p className="text-sm text-heritage-charcoal/80 mt-1 mb-4">
                Add your verified signature. Name, email, and consent required.
              </p>
              <Link
                href="/petitions"
                className="inline-flex items-center rounded-lg bg-heritage-navy px-4 py-2 text-white text-sm font-medium hover:bg-heritage-navy-light"
              >
                View details
              </Link>
            </div>
          </div>

          {/* Card: Join the Discussion */}
          <div className="rounded-xl border border-heritage-navy/15 bg-white/95 p-6 shadow-md">
            <h3 className="font-serif text-lg text-heritage-navy">Join the discussion</h3>
            <p className="text-sm text-heritage-charcoal/80 mt-1 mb-4">
              A simple, moderated discussion. Register with your email and verify to post. Respectful dialogue only.
            </p>
            <p className="text-xs text-heritage-charcoal/60 mb-4">Sample moderated discussion.</p>
            <Link
              href="/forum"
              className="inline-flex items-center rounded-lg border border-heritage-navy/30 px-4 py-2 text-heritage-navy text-sm font-medium hover:bg-heritage-navy/5"
            >
              Join the discussion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
