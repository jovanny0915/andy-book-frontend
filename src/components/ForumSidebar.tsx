'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const supportUrl = process.env.NEXT_PUBLIC_COFFEE_URL || '/support';

export function ForumSidebar() {
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);

  return (
    <aside
      className="flex-shrink-0 w-full lg:w-64 xl:w-72"
      aria-label="Support the project"
    >
      <div
        className="sticky top-24 rounded-sm p-3 md:p-4 text-center"
        style={{
          border: '4px solid #c9a227',
          boxShadow: 'inset 0 0 0 1px rgba(201, 162, 39, 0.3), 0 2px 8px rgba(0,0,0,0.1)',
          backgroundColor: 'rgba(255, 252, 245, 0.98)',
        }}
      >
        {/* Book image */}
        <div className="relative w-24 h-32 mx-auto rounded overflow-hidden border border-heritage-gold/30 bg-heritage-navy/90 flex items-center justify-center">
          <Image
            src="/history-book.png"
            alt="The Victoria Cross – support the project"
            width={96}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-serif text-lg text-heritage-navy mt-3 mb-4">
          Support the Project
        </h2>

        {/* Donation buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <a
            href={supportUrl}
            className="border-2 border-heritage-navy/40 text-heritage-navy px-3 py-2 rounded text-sm font-medium hover:bg-heritage-navy/5 transition-colors"
          >
            $5
          </a>
          <a
            href={supportUrl}
            className="bg-heritage-bronze/90 text-white px-3 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Buy the Coffee
          </a>
          <a
            href={supportUrl}
            className="border-2 border-heritage-navy/40 text-heritage-navy px-3 py-2 rounded text-sm font-medium hover:bg-heritage-navy/5 transition-colors"
          >
            $20
          </a>
        </div>

        <form className="text-left space-y-3">
          <div>
            <label htmlFor="forum-sidebar-name" className="block text-sm font-medium text-heritage-charcoal mb-1">
              Name <span className="text-heritage-navy">*</span>
            </label>
            <input
              id="forum-sidebar-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-heritage-charcoal/25 rounded px-3 py-2 text-sm bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-navy"
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              id="forum-sidebar-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-heritage-charcoal/30"
            />
            <label htmlFor="forum-sidebar-consent" className="text-xs text-heritage-charcoal">
              I consent to receive updates and reply emails from Victoriacross.ca.
            </label>
          </div>
          <Link
            href={supportUrl}
            className="block w-full text-center bg-heritage-navy text-white py-2.5 rounded font-medium text-sm hover:bg-heritage-navy-light transition-colors"
          >
            Buy Now
          </Link>
          <Link
            href="/book"
            className="block w-full text-center border border-heritage-navy/30 text-heritage-navy py-2.5 rounded font-medium text-sm hover:bg-heritage-navy/5 transition-colors"
          >
            Buy Now
          </Link>
        </form>
      </div>
    </aside>
  );
}
