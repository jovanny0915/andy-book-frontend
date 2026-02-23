'use client';

import { useState } from 'react';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

export function ForumAdminPanel() {
  const [banEmail, setBanEmail] = useState('');
  const [banReason, setBanReason] = useState('');
  const [banLoading, setBanLoading] = useState(false);
  const [banMessage, setBanMessage] = useState('');
  const [reportedPosts, setReportedPosts] = useState<{ id: string; type: 'thread' | 'reply'; title?: string; author_email: string; reason?: string; created_at: string }[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  const loadReportedPosts = () => {
    setReportsLoading(true);
    fetch(`${apiUrl()}/api/forum/admin/reports`, {
      headers: { Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('victoriacross_forum_admin') || '' : ''}` },
    })
      .then((r) => r.json())
      .then((data) => setReportedPosts(data.reports || []))
      .catch(() => setReportedPosts([]))
      .finally(() => setReportsLoading(false));
  };

  const onBanUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanMessage('');
    setBanLoading(true);
    try {
      const res = await fetch(`${apiUrl()}/api/forum/admin/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('victoriacross_forum_admin') || '' : ''}`,
        },
        body: JSON.stringify({ email: banEmail, reason: banReason || 'Banned by moderator' }),
      });
      const data = await res.json().catch(() => ({}));
      setBanMessage(data.message || (res.ok ? 'User banned.' : 'Failed to ban.'));
      if (res.ok) {
        setBanEmail('');
        setBanReason('');
      }
    } catch {
      setBanMessage('Request failed.');
    } finally {
      setBanLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-serif text-xl font-semibold text-heritage-navy">
          Admin moderation panel
        </h2>
        <p className="text-sm text-heritage-charcoal/80 mt-1">
          Ban users by email, review reported posts, and moderate content.
        </p>
      </header>

      {/* Ban user by email */}
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-heritage-navy/10 bg-gradient-to-r from-red-50/80 to-heritage-stone/50">
          <h3 className="font-semibold text-heritage-navy">Ban user by email</h3>
          <p className="text-xs text-heritage-charcoal/70 mt-0.5">
            Banned users cannot post or reply. Use with care.
          </p>
        </div>
        <form onSubmit={onBanUser} className="p-5 space-y-4">
          <div>
            <label htmlFor="admin-ban-email" className="block text-sm font-medium text-heritage-charcoal mb-1">
              Email address
            </label>
            <input
              id="admin-ban-email"
              type="email"
              value={banEmail}
              onChange={(e) => setBanEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full max-w-md rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
            />
          </div>
          <div>
            <label htmlFor="admin-ban-reason" className="block text-sm font-medium text-heritage-charcoal mb-1">
              Reason (optional)
            </label>
            <input
              id="admin-ban-reason"
              type="text"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="e.g. Spam, abuse"
              className="w-full max-w-md rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
            />
          </div>
          {banMessage && (
            <p className={`text-sm ${banMessage.startsWith('User banned') ? 'text-green-700' : 'text-red-600'}`}>
              {banMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={banLoading}
            className="rounded-xl bg-red-600 text-white px-5 py-2.5 font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {banLoading ? 'Banning…' : 'Ban user'}
          </button>
        </form>
      </div>

      {/* Reported posts */}
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-heritage-navy/10 bg-gradient-to-r from-amber-50/80 to-heritage-stone/50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-heritage-navy">Reported posts</h3>
            <p className="text-xs text-heritage-charcoal/70 mt-0.5">
              Review and dismiss or take action.
            </p>
          </div>
          <button
            type="button"
            onClick={loadReportedPosts}
            disabled={reportsLoading}
            className="rounded-xl bg-heritage-navy text-white px-4 py-2 text-sm font-medium hover:bg-heritage-navy-dark disabled:opacity-50"
          >
            {reportsLoading ? 'Loading…' : 'Refresh reports'}
          </button>
        </div>
        <div className="p-5">
          {reportedPosts.length === 0 && !reportsLoading ? (
            <p className="text-sm text-heritage-charcoal/70 py-4">
              No reported posts, or reports not yet loaded. Use &quot;Refresh reports&quot; when your backend supports it.
            </p>
          ) : (
            <ul className="space-y-3">
              {reportedPosts.map((r) => (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-heritage-navy/10 bg-heritage-stone/30 p-4"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-heritage-gold uppercase tracking-wider">
                      {r.type}
                    </span>
                    {r.title && <p className="font-medium text-heritage-navy mt-0.5">{r.title}</p>}
                    <p className="text-sm text-heritage-charcoal/80">{r.author_email}</p>
                    {r.reason && <p className="text-xs text-heritage-charcoal/60 mt-1">{r.reason}</p>}
                  </div>
                  <span className="text-xs text-heritage-charcoal/60">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
