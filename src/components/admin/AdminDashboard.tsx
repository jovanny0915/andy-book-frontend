'use client';

import { useState, useEffect, useCallback } from 'react';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  // We will set this after Supabase session is confirmed on admin page
  return sessionStorage.getItem('admin_access_token');
}

type PendingThread = {
  id: string;
  title: string;
  body: string;
  author_email: string;
  created_at: string;
  status: string;
};

type PendingReply = {
  id: string;
  thread_id: string;
  body: string;
  author_email: string;
  created_at: string;
  status: string;
};

type AuthUser = {
  id: string;
  email: string;
  created_at?: string;
  last_sign_in_at?: string;
  banned_until?: string | null;
};

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'admins'>('posts');
  const [threads, setThreads] = useState<PendingThread[]>([]);
  const [replies, setReplies] = useState<PendingReply[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState('');
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersPage, setUsersPage] = useState(1);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [resetPasswordLink, setResetPasswordLink] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(false);
  const [adminsError, setAdminsError] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [addAdminLoading, setAddAdminLoading] = useState(false);

  const token = getAccessToken();

  const fetchPending = useCallback(() => {
    if (!token) return;
    setPostsLoading(true);
    setPostsError('');
    fetch(`${apiUrl()}/api/admin/posts/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load pending posts.');
        return r.json();
      })
      .then((data) => {
        setThreads(data.threads ?? []);
        setReplies(data.replies ?? []);
      })
      .catch(() => setPostsError('Failed to load pending posts.'))
      .finally(() => setPostsLoading(false));
  }, [token]);

  const fetchUsers = useCallback(() => {
    if (!token) return;
    setUsersLoading(true);
    setUsersError('');
    fetch(
      `${apiUrl()}/api/admin/users?page=${usersPage}&per_page=20`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load users.');
        return r.json();
      })
      .then((data) => {
        setUsers(data.users ?? []);
        setUsersTotal(data.total ?? 0);
      })
      .catch(() => setUsersError('Failed to load users.'))
      .finally(() => setUsersLoading(false));
  }, [token, usersPage]);

  useEffect(() => {
    if (activeTab === 'posts') fetchPending();
  }, [activeTab, fetchPending]);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
  }, [activeTab, fetchUsers]);

  const fetchAdmins = useCallback(() => {
    if (!token) return;
    setAdminsLoading(true);
    setAdminsError('');
    fetch(`${apiUrl()}/api/admin/admins`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load admins.');
        return r.json();
      })
      .then((data) => setAdmins(data.admins ?? []))
      .catch(() => setAdminsError('Failed to load admins.'))
      .finally(() => setAdminsLoading(false));
  }, [token]);

  useEffect(() => {
    if (activeTab === 'admins') fetchAdmins();
  }, [activeTab, fetchAdmins]);

  const addAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newAdminEmail.trim().toLowerCase();
    if (!email || !token) return;
    setAddAdminLoading(true);
    setActionMessage('');
    const res = await fetch(`${apiUrl()}/api/admin/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    setAddAdminLoading(false);
    if (res.ok) {
      setActionMessage('Admin added. They must sign up in Supabase Auth with this email and a password to sign in.');
      setNewAdminEmail('');
      fetchAdmins();
    } else {
      setActionMessage(data.message || 'Failed to add admin.');
    }
  };

  const removeAdmin = async (id: string) => {
    if (!token) return;
    setActionMessage('');
    const res = await fetch(`${apiUrl()}/api/admin/admins/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setActionMessage('Admin removed.');
      fetchAdmins();
    } else {
      setActionMessage(data.message || 'Failed to remove admin.');
    }
  };

  const updateThreadStatus = async (id: string, status: 'approved' | 'rejected') => {
    if (!token) return;
    setActionMessage('');
    const res = await fetch(`${apiUrl()}/api/admin/posts/threads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setActionMessage(status === 'approved' ? 'Thread approved.' : 'Thread rejected.');
      fetchPending();
    } else {
      setActionMessage(data.message || 'Action failed.');
    }
  };

  const updateReplyStatus = async (id: string, status: 'approved' | 'rejected') => {
    if (!token) return;
    setActionMessage('');
    const res = await fetch(`${apiUrl()}/api/admin/posts/replies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setActionMessage(status === 'approved' ? 'Reply approved.' : 'Reply rejected.');
      fetchPending();
    } else {
      setActionMessage(data.message || 'Action failed.');
    }
  };

  const banUser = async (userId: string, ban: boolean) => {
    if (!token) return;
    setActionMessage('');
    const res = await fetch(`${apiUrl()}/api/admin/users/${userId}/ban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ban }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setActionMessage(data.message || (ban ? 'User banned.' : 'User unbanned.'));
      fetchUsers();
    } else {
      setActionMessage(data.message || 'Action failed.');
    }
  };

  const requestResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = resetPasswordEmail.trim().toLowerCase();
    if (!email || !token) return;
    setResetLoading(true);
    setResetPasswordLink(null);
    const res = await fetch(`${apiUrl()}/api/admin/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    setResetLoading(false);
    if (res.ok && data.action_link) {
      setResetPasswordLink(data.action_link);
      setResetPasswordEmail('');
    } else {
      setActionMessage(data.message || 'Failed to generate link.');
    }
  };

  const card =
    'rounded-2xl border border-heritage-gold/25 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden';
  const cardHead =
    'px-5 py-4 border-b border-heritage-navy/10 bg-gradient-to-r from-heritage-navy/5 to-heritage-stone/50';
  const btnPrimary =
    'rounded-xl bg-heritage-navy text-white px-4 py-2 text-sm font-medium hover:bg-heritage-navy-dark disabled:opacity-50 transition-colors';
  const btnSuccess =
    'rounded-xl bg-green-700 text-white px-4 py-2 text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors';
  const btnDanger =
    'rounded-xl bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors';

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-heritage-charcoal/20 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'posts'
              ? 'bg-heritage-navy text-white'
              : 'bg-heritage-stone/50 text-heritage-charcoal hover:bg-heritage-stone'
          }`}
        >
          Pending posts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'users'
              ? 'bg-heritage-navy text-white'
              : 'bg-heritage-stone/50 text-heritage-charcoal hover:bg-heritage-stone'
          }`}
        >
          Users
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('admins')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'admins'
              ? 'bg-heritage-navy text-white'
              : 'bg-heritage-stone/50 text-heritage-charcoal hover:bg-heritage-stone'
          }`}
        >
          Admin users
        </button>
      </div>

      {actionMessage && (
        <p
          className={`text-sm ${
            actionMessage.includes('failed') ? 'text-red-600' : 'text-green-700'
          }`}
        >
          {actionMessage}
        </p>
      )}

      {activeTab === 'posts' && (
        <div className={card}>
          <div className={cardHead}>
            <h3 className="font-semibold text-heritage-navy">Pending forum posts</h3>
            <p className="text-xs text-heritage-charcoal/70 mt-0.5">
              Approve or reject new threads and replies.
            </p>
            <button
              type="button"
              onClick={fetchPending}
              disabled={postsLoading}
              className="mt-2 rounded-lg bg-heritage-gold/20 text-heritage-navy px-3 py-1.5 text-sm font-medium hover:bg-heritage-gold/30 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
          <div className="p-5 space-y-6">
            {postsError && <p className="text-sm text-red-600">{postsError}</p>}
            {postsLoading && <p className="text-sm text-heritage-charcoal/70">Loading…</p>}
            {!postsLoading && !postsError && threads.length === 0 && replies.length === 0 && (
              <p className="text-sm text-heritage-charcoal/70">No pending posts.</p>
            )}

            {threads.length > 0 && (
              <div>
                <h4 className="font-medium text-heritage-navy mb-2">Threads</h4>
                <ul className="space-y-3">
                  {threads.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-xl border border-heritage-navy/10 bg-heritage-stone/30 p-4"
                    >
                      <p className="font-medium text-heritage-navy">{t.title}</p>
                      <p className="text-sm text-heritage-charcoal/80 mt-1 line-clamp-2">
                        {t.body}
                      </p>
                      <p className="text-xs text-heritage-charcoal/60 mt-2">
                        {t.author_email} · {new Date(t.created_at).toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => updateThreadStatus(t.id, 'approved')}
                          className={btnSuccess}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateThreadStatus(t.id, 'rejected')}
                          className={btnDanger}
                        >
                          Reject
                        </button>
                        <a
                          href={`/forum/${t.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-heritage-charcoal/25 px-4 py-2 text-sm text-heritage-charcoal hover:bg-heritage-stone/50"
                        >
                          View thread
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {replies.length > 0 && (
              <div>
                <h4 className="font-medium text-heritage-navy mb-2">Replies</h4>
                <ul className="space-y-3">
                  {replies.map((r) => (
                    <li
                      key={r.id}
                      className="rounded-xl border border-heritage-navy/10 bg-heritage-stone/30 p-4"
                    >
                      <p className="text-sm text-heritage-charcoal line-clamp-2">{r.body}</p>
                      <p className="text-xs text-heritage-charcoal/60 mt-2">
                        {r.author_email} · {new Date(r.created_at).toLocaleString()} · thread{' '}
                        {r.thread_id}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => updateReplyStatus(r.id, 'approved')}
                          className={btnSuccess}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateReplyStatus(r.id, 'rejected')}
                          className={btnDanger}
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <>
          <div className={card}>
            <div className={cardHead}>
              <h3 className="font-semibold text-heritage-navy">Reset password</h3>
              <p className="text-xs text-heritage-charcoal/70 mt-0.5">
                Generate a password reset link for a user. Send them the link securely.
              </p>
            </div>
            <form onSubmit={requestResetLink} className="p-5 flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-heritage-charcoal mb-1">
                  User email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={resetPasswordEmail}
                  onChange={(e) => setResetPasswordEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
                />
              </div>
              <button type="submit" disabled={resetLoading} className={btnPrimary}>
                {resetLoading ? 'Generating…' : 'Generate reset link'}
              </button>
            </form>
            {resetPasswordLink && (
              <div className="px-5 pb-5">
                <p className="text-sm text-green-700 mb-1">Link generated. Copy and send to user:</p>
                <textarea
                  readOnly
                  value={resetPasswordLink}
                  rows={3}
                  className="w-full rounded-xl border border-heritage-charcoal/25 bg-heritage-stone/30 p-3 text-sm font-mono break-all"
                />
              </div>
            )}
          </div>

          <div className={card}>
            <div className={`${cardHead} flex flex-wrap items-center justify-between gap-3`}>
              <div>
                <h3 className="font-semibold text-heritage-navy">User list</h3>
                <p className="text-xs text-heritage-charcoal/70 mt-0.5">
                  Auth users. Ban or unban by user ID.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchUsers}
                disabled={usersLoading}
                className="rounded-lg bg-heritage-gold/20 text-heritage-navy px-3 py-1.5 text-sm font-medium hover:bg-heritage-gold/30 disabled:opacity-50"
              >
                Refresh
              </button>
            </div>
            <div className="p-5 overflow-x-auto">
              {usersError && <p className="text-sm text-red-600">{usersError}</p>}
              {usersLoading && <p className="text-sm text-heritage-charcoal/70">Loading…</p>}
              {!usersLoading && !usersError && users.length === 0 && (
                <p className="text-sm text-heritage-charcoal/70">No users found.</p>
              )}
              {!usersLoading && users.length > 0 && (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-heritage-charcoal/20">
                      <th className="text-left py-2 pr-4 font-medium text-heritage-navy">Email</th>
                      <th className="text-left py-2 pr-4 font-medium text-heritage-navy">Last sign in</th>
                      <th className="text-left py-2 pr-4 font-medium text-heritage-navy">Status</th>
                      <th className="text-left py-2 font-medium text-heritage-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-heritage-charcoal/10">
                        <td className="py-2 pr-4 text-heritage-charcoal">{u.email || u.id}</td>
                        <td className="py-2 pr-4 text-heritage-charcoal/70">
                          {u.last_sign_in_at
                            ? new Date(u.last_sign_in_at).toLocaleString()
                            : '—'}
                        </td>
                        <td className="py-2 pr-4">
                          {u.banned_until ? (
                            <span className="text-red-600 font-medium">Banned</span>
                          ) : (
                            <span className="text-green-700">Active</span>
                          )}
                        </td>
                        <td className="py-2">
                          {u.banned_until ? (
                            <button
                              type="button"
                              onClick={() => banUser(u.id, false)}
                              className="rounded-lg bg-amber-600 text-white px-3 py-1 text-xs font-medium hover:bg-amber-700"
                            >
                              Unban
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => banUser(u.id, true)}
                              className="rounded-lg bg-red-600 text-white px-3 py-1 text-xs font-medium hover:bg-red-700"
                            >
                              Ban
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {usersTotal > users.length && (
                <p className="text-xs text-heritage-charcoal/60 mt-3">
                  Showing {users.length} of {usersTotal}. Adjust page in a future update.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'admins' && (
        <div className={card}>
          <div className={`${cardHead} flex flex-wrap items-center justify-between gap-3`}>
            <div>
              <h3 className="font-semibold text-heritage-navy">Admin users</h3>
              <p className="text-xs text-heritage-charcoal/70 mt-0.5">
                Users who can access this admin page. They must sign in with Supabase Auth (email + password).
              </p>
            </div>
            <button
              type="button"
              onClick={fetchAdmins}
              disabled={adminsLoading}
              className="rounded-lg bg-heritage-gold/20 text-heritage-navy px-3 py-1.5 text-sm font-medium hover:bg-heritage-gold/30 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
          <div className="p-5 space-y-5">
            <form onSubmit={addAdmin} className="flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor="new-admin-email" className="block text-sm font-medium text-heritage-charcoal mb-1">
                  Add admin by email
                </label>
                <input
                  id="new-admin-email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="newadmin@example.com"
                  className="rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
                />
              </div>
              <button type="submit" disabled={addAdminLoading} className={btnPrimary}>
                {addAdminLoading ? 'Adding…' : 'Add admin'}
              </button>
            </form>
            {adminsError && <p className="text-sm text-red-600">{adminsError}</p>}
            {adminsLoading && <p className="text-sm text-heritage-charcoal/70">Loading…</p>}
            {!adminsLoading && admins.length === 0 && (
              <p className="text-sm text-heritage-charcoal/70">No admin users yet.</p>
            )}
            {!adminsLoading && admins.length > 0 && (
              <ul className="space-y-2">
                {admins.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-heritage-navy/10 bg-heritage-stone/30 px-4 py-2"
                  >
                    <span className="text-heritage-charcoal">{a.email}</span>
                    <span className="text-xs text-heritage-charcoal/60">
                      Added {new Date(a.created_at).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAdmin(a.id)}
                      className="rounded-lg bg-red-600 text-white px-3 py-1 text-xs font-medium hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
