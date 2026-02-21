'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/history', label: 'History' },
  { href: '/petitions', label: 'Petitions' },
  { href: '/forum', label: 'Forum' },
  { href: '/book', label: 'Book' },
  { href: '/support', label: 'Support' },
] as const;

export function NavHeader() {
  const pathname = usePathname();
  return (
    <header className="bg-heritage-navy text-white shadow z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight hover:opacity-90">
          Victoriacross.ca
        </Link>
        <nav className="flex flex-wrap items-center gap-6 text-sm" aria-label="Main">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`hover:text-heritage-gold transition-colors duration-200 ${isActive ? 'font-semibold underline underline-offset-4' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
