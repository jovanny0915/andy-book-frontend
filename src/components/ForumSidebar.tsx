'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FORUM_CATEGORIES } from '@/lib/forumCategories';

const supportUrl = process.env.NEXT_PUBLIC_COFFEE_URL || '/support';

export function ForumSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const currentCategory = searchParams.get('category') || 'general';

  const categoryHref = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'general') params.delete('category');
    else params.set('category', slug);
    const q = params.toString();
    return `/forum${q ? `?${q}` : ''}`;
  };

  return (
    <aside
      className="flex-shrink-0 w-full lg:w-72"
      aria-label="Forum sidebar"
    >
      <div className="sticky top-24 space-y-6">
        {/* Categories – Phase 2: Waterman, Hickey, Wilmot, General Discussion */}
        <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 backdrop-blur-sm shadow-xl shadow-heritage-navy/5 overflow-hidden">
          <div className="px-4 py-3 border-b border-heritage-navy/10 bg-gradient-to-r from-heritage-navy/5 to-transparent">
            <h2 className="font-serif text-lg font-semibold text-heritage-navy">
              Categories
            </h2>
            <p className="text-xs text-heritage-charcoal/70 mt-0.5">
              Choose a topic to browse
            </p>
          </div>
          <nav className="p-2" aria-label="Forum categories">
            {FORUM_CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={categoryHref(cat.slug)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-heritage-navy text-white shadow-md'
                      : 'text-heritage-charcoal hover:bg-heritage-stone/80 hover:text-heritage-navy'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      isActive ? 'bg-heritage-gold' : 'bg-heritage-gold/50'
                    }`}
                    aria-hidden
                  />
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Support the project */}
        <div
          className="rounded-2xl overflow-hidden border-2 border-heritage-gold/30 bg-white/98 shadow-lg shadow-heritage-navy/5"
          style={{ boxShadow: '0 4px 24px rgba(26, 47, 74, 0.08)' }}
        >
          <div className="p-4 text-center">
            <div className="relative w-20 h-28 mx-auto rounded-lg overflow-hidden border border-heritage-gold/30 bg-heritage-navy/10 flex items-center justify-center">
              <Image
                src="/history-book.png"
                alt="Support the project"
                width={80}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-serif text-lg font-semibold text-heritage-navy mt-3 mb-1">
              Support the Project
            </h2>
            <p className="text-xs text-heritage-charcoal/80 mb-4">
              Buy the book or coffee to help the cause
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <a
                href={supportUrl}
                className="rounded-xl border-2 border-heritage-navy/30 text-heritage-navy px-4 py-2 text-sm font-medium hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200"
              >
                $5
              </a>
              <a
                href={supportUrl}
                className="rounded-xl bg-heritage-bronze/90 text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Buy Coffee
              </a>
              <a
                href={supportUrl}
                className="rounded-xl border-2 border-heritage-navy/30 text-heritage-navy px-4 py-2 text-sm font-medium hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200"
              >
                $20
              </a>
            </div>
            <div className="space-y-3 text-left">
              <div>
                <label
                  htmlFor="forum-sidebar-name"
                  className="block text-xs font-medium text-heritage-charcoal mb-1"
                >
                  Name <span className="text-heritage-navy">*</span>
                </label>
                <input
                  id="forum-sidebar-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-heritage-charcoal/20 rounded-lg px-3 py-2 text-sm bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 focus:border-heritage-gold"
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  id="forum-sidebar-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded border-heritage-charcoal/30 text-heritage-navy focus:ring-heritage-gold"
                />
                <label
                  htmlFor="forum-sidebar-consent"
                  className="text-xs text-heritage-charcoal"
                >
                  I consent to receive updates and reply emails from Victoriacross.ca.
                </label>
              </div>
              <Link
                href={supportUrl}
                className="block w-full text-center rounded-xl bg-heritage-navy text-white py-2.5 font-medium text-sm hover:bg-heritage-navy-dark transition-all duration-200 shadow-lg shadow-heritage-navy/20"
              >
                Support Now
              </Link>
              <Link
                href="/book"
                className="block w-full text-center rounded-xl border-2 border-heritage-navy/30 text-heritage-navy py-2.5 font-medium text-sm hover:bg-heritage-navy/5 transition-colors"
              >
                Buy the Book
              </Link>
              <Link
                href="/forum/admin"
                className="block w-full text-center rounded-xl border border-heritage-charcoal/20 text-heritage-charcoal/80 py-2 text-xs font-medium hover:bg-heritage-stone/80 hover:text-heritage-navy transition-colors"
              >
                Moderation panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
