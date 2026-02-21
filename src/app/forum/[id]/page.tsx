'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

export default function ForumThreadPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [thread, setThread] = useState<{
    id: string;
    title: string;
    body: string;
    author_email: string;
    created_at: string;
    replies: { id: string; body: string; author_email: string; created_at: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-heritage-charcoal">Loading…</p>
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-heritage-charcoal">Thread not found or not yet approved.</p>
        <Link href="/forum" className="mt-4 inline-block text-heritage-navy hover:underline">Back to forum</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/forum" className="text-heritage-navy hover:underline text-sm mb-6 inline-block">← Back to forum</Link>
        <article className="border border-heritage-navy/20 rounded-lg p-6 bg-heritage-stone/30">
          <h1 className="font-serif text-2xl text-heritage-navy mb-2">{thread.title}</h1>
          <p className="text-sm text-heritage-charcoal/70 mb-4">
            {thread.author_email} · {new Date(thread.created_at).toLocaleString()}
          </p>
          <div className="prose text-heritage-charcoal whitespace-pre-wrap">{thread.body}</div>
        </article>
        {thread.replies && thread.replies.length > 0 && (
          <div className="mt-6">
            <h2 className="font-serif text-lg text-heritage-navy mb-3">Replies</h2>
            <ul className="space-y-4">
              {thread.replies.map((r) => (
                <li key={r.id} className="border-l-2 border-heritage-gold/40 pl-4 py-2">
                  <p className="text-sm text-heritage-charcoal/70">{r.author_email} · {new Date(r.created_at).toLocaleString()}</p>
                  <p className="text-heritage-charcoal whitespace-pre-wrap">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
