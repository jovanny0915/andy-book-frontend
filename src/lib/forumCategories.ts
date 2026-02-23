/** Forum categories per Phase 2 requirements: Waterman, Hickey, Wilmot, General Discussion */
export const FORUM_CATEGORIES = [
  { id: 'waterman', label: 'Waterman', slug: 'waterman' },
  { id: 'hickey', label: 'Hickey', slug: 'hickey' },
  { id: 'wilmot', label: 'Wilmot', slug: 'wilmot' },
  { id: 'general', label: 'General Discussion', slug: 'general' },
] as const;

export type ForumCategoryId = (typeof FORUM_CATEGORIES)[number]['id'];
