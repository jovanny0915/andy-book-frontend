import Link from 'next/link';

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/history', label: 'History' },
  { href: '/petitions', label: 'Petitions' },
  { href: '/forum', label: 'Forum' },
  { href: '/book', label: 'Book' },
  { href: '/support', label: 'Support' },
];

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@victoriacross.ca';

export function Footer() {
  return (
    <footer className="mt-auto bg-heritage-navy text-heritage-stone/90 py-12 z-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <nav className="flex flex-wrap items-center gap-6 text-sm" aria-label="Footer">
            {menuLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-heritage-gold transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-heritage-gold transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-heritage-gold transition-colors duration-200">
              Terms
            </Link>
            <Link href="/disclosure" className="hover:text-heritage-gold transition-colors duration-200">
              Disclosure
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="hover:text-heritage-gold transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-heritage-navy-light/30 text-center text-sm text-heritage-stone/70">
          <p>Victoriacross.ca – The Chaplain&apos;s Diary. Historical context and petitions.</p>
          <p className="mt-1">Respectful, non-political, factual.</p>
        </div>
      </div>
    </footer>
  );
}
