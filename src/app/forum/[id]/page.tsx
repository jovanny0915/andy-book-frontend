'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getForumToken } from '@/lib/forumAuth';

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
  const token = typeof window !== 'undefined' ? getForumToken() : null;

  useEffect(() => {
    if (!id) return;
    fetch(`${apiUrl()}/api/forum/threads/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setThread)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

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

        {thread.replies && thread.replies.length > 0 && (
          <div className="mt-8">
            <h2 className="font-serif text-xl font-semibold text-heritage-navy mb-4">
              Replies ({thread.replies.length})
            </h2>
            <ul className="space-y-4">
              {thread.replies.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-heritage-navy/10 bg-white/90 p-5 shadow-md flex flex-wrap items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-heritage-charcoal/80">
                      {r.author_email} · {new Date(r.created_at).toLocaleString()}
                    </p>
                    <p className="text-heritage-charcoal whitespace-pre-wrap mt-2 leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onReport('reply', r.id)}
                    disabled={!!reportingId}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-heritage-charcoal/20 px-2.5 py-1.5 text-xs font-medium text-heritage-charcoal hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors disabled:opacity-50"
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
          </div>
        )}
      </div>
    </div>
  );
}
