export const FORUM_TOKEN_KEY = 'victoriacross_forum_token';

export function getForumToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(FORUM_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearForumToken(): void {
  try {
    localStorage.removeItem(FORUM_TOKEN_KEY);
  } catch {}
}
