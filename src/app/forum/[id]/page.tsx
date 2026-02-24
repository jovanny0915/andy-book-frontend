'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getForumToken } from '@/lib/forumAuth';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

type Reply = { id: string; body: string; author_email: string; created_at: string };

export default function ForumThreadPage() {
  const params = useParams();
  const id = params?.id as string;
  const [thread, setThread] = useState<{
    id: string;
    title: string;
    body: string;
    author_email: string;
    created_at: string;
    replies: Reply[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportedIds, setReportedIds] = useState<Set<string>>(new Set());
  const [token, setToken] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  const fetchThread = useCallback(() => {
    if (!id) return;
    fetch(`${apiUrl()}/api/forum/threads/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setThread);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetch(`${apiUrl()}/api/forum/threads/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setThread)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setToken(typeof window !== 'undefined' ? getForumToken() : null);
  }, []);

  const onReport = async (targetType: 'thread' | 'reply', targetId: string) => {
    setReportingId(targetId);
    try {
      const res = await fetch(`${apiUrl()}/api/forum/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(
          targetType === 'thread'
            ? { thread_id: targetId, reason: 'Report from thread page' }
            : { reply_id: targetId, thread_id: id, reason: 'Report reply' }
        ),
      });
      if (res.ok) setReportedIds((prev) => new Set(prev).add(targetId));
    } catch {
      // backend may not have report yet
    } finally {
      setReportingId(null);
    }
  };

  const onSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = replyBody.trim();
    if (!body || !token || !id) return;
    setReplyError('');
    setReplySuccess(false);
    setReplyLoading(true);
    try {
      const res = await fetch(`${apiUrl()}/api/forum/threads/${id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setReplyError(data.message || 'Failed to post reply.');
        return;
      }
      setReplyBody('');
      setReplySuccess(true);
      fetchThread();
    } catch {
      setReplyError('Something went wrong. Try again.');
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-heritage-stone/50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="rounded-2xl bg-white/80 p-8 shadow-lg">
            <p className="text-heritage-charcoal/80">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="min-h-screen bg-heritage-stone/50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 p-8 shadow-xl">
            <p className="text-heritage-charcoal">Thread not found or not yet approved.</p>
            <Link
              href="/forum"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-heritage-navy text-white px-4 py-2.5 text-sm font-medium hover:bg-heritage-navy-dark"
            >
              ← Back to forum
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-stone/50">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-heritage-navy hover:text-heritage-navy-dark font-medium text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to forum
        </Link>

        <article className="rounded-2xl border border-heritage-gold/20 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold mb-2">
                  {thread.title}
                </h1>
                <p className="text-sm text-heritage-charcoal/70">
                  {thread.author_email} · {new Date(thread.created_at).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onReport('thread', thread.id)}
                disabled={!!reportingId}
                className="inline-flex items-center gap-1.5 rounded-xl border border-heritage-charcoal/20 px-3 py-2 text-xs font-medium text-heritage-charcoal hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors disabled:opacity-50"
                title="Report this post"
              >
                {reportedIds.has(thread.id) ? (
                  'Reported'
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Report post
                  </>
                )}
              </button>
            </div>
            <div className="prose prose-heritage mt-4 text-heritage-charcoal whitespace-pre-wrap leading-relaxed">
              {thread.body}
            </div>
          </div>
        </article>

        {/* Reply to post */}
        <section className="mt-8">
          <h2 className="font-serif text-xl font-semibold text-heritage-navy mb-4">
            Replies {thread.replies?.length ? `(${thread.replies.length})` : ''}
          </h2>

          {token ? (
            <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 shadow-lg shadow-heritage-navy/5 overflow-hidden mb-8">
              <div className="px-5 py-4 border-b border-heritage-navy/10 bg-gradient-to-r from-heritage-stone/60 to-heritage-parchment/40">
                <h3 className="font-semibold text-heritage-navy">Post a reply</h3>
                <p className="text-xs text-heritage-charcoal/70 mt-0.5">
                  Your reply will be held for moderation before it appears.
                </p>
              </div>
              <form onSubmit={onSubmitReply} className="p-5 md:p-6 space-y-4">
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  placeholder="Write your reply…"
                  rows={4}
                  disabled={replyLoading}
                  className="w-full rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-3 text-heritage-charcoal placeholder:text-heritage-charcoal/50 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 focus:border-heritage-gold resize-y min-h-[120px] transition-shadow disabled:opacity-70"
                />
                {replyError && (
                  <p className="text-sm text-red-600" role="alert">{replyError}</p>
                )}
                {replySuccess && (
                  <p className="text-sm text-green-700 flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reply submitted. It will appear after moderation.
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={replyLoading || !replyBody.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-heritage-navy text-white px-5 py-2.5 font-semibold shadow-lg shadow-heritage-navy/20 hover:bg-heritage-navy-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {replyLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Posting…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Post reply
                      </>
                    )}
                  </button>
                  {replyBody.trim() && (
                    <button
                      type="button"
                      onClick={() => { setReplyBody(''); setReplyError(''); setReplySuccess(false); }}
                      className="rounded-xl border border-heritage-charcoal/30 bg-white px-4 py-2.5 font-medium text-heritage-charcoal hover:bg-heritage-stone/80 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl border border-heritage-gold/20 bg-heritage-stone/30 p-6 mb-8">
              <p className="text-heritage-charcoal/90 text-sm">
                <Link href="/forum" className="text-heritage-navy font-medium hover:underline">
                  Sign in with your verified email
                </Link>
                {' '}to post a reply.
              </p>
            </div>
          )}

          {thread.replies && thread.replies.length > 0 ? (
            <ul className="space-y-4" role="list">
              {thread.replies.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-heritage-navy/10 bg-white/95 p-5 md:p-6 shadow-md hover:shadow-lg hover:border-heritage-gold/20 transition-all duration-200 flex flex-wrap items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1 flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-heritage-navy/10 flex items-center justify-center text-heritage-navy font-semibold text-sm">
                      {(r.author_email || '?').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-heritage-navy">
                        {r.author_email}
                      </p>
                      <p className="text-xs text-heritage-charcoal/60 mt-0.5">
                        {new Date(r.created_at).toLocaleString()}
                      </p>
                      <p className="text-heritage-charcoal whitespace-pre-wrap mt-3 leading-relaxed">
                        {r.body}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onReport('reply', r.id)}
                    disabled={!!reportingId}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-heritage-charcoal/20 px-2.5 py-1.5 text-xs font-medium text-heritage-charcoal hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors disabled:opacity-50 flex-shrink-0"
                    title="Report this reply"
                  >
                    {reportedIds.has(r.id) ? (
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
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-heritage-charcoal/70 text-sm py-4">
              No replies yet. Be the first to reply.
            </p>
          )}
        </section>
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
