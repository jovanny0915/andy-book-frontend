import Link from 'next/link';

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/history', label: 'History' },
  { href: '/media', label: 'Media' },
  { href: '/petitions', label: 'Petitions' },
  { href: '/forum', label: 'Forum' },
  { href: '/book', label: 'Book' },
  { href: '/support', label: 'Support' },
];

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@victoriacross.ca';

export function Footer() {
  return (
    <footer className="mt-auto bg-heritage-navy text-heritage-stone/90 pt-12 pb-28 md:pb-12 z-10">
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
          <div className="flex items-center gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-44 sm:w-52 rounded-md border border-heritage-stone/30 bg-heritage-navy-light/30 px-3 py-2 text-sm text-heritage-stone placeholder:text-heritage-stone/60 focus:outline-none focus:ring-2 focus:ring-heritage-gold/70"
            />
            <button
              type="button"
              className="rounded-md bg-heritage-gold px-3 py-2 text-sm font-semibold text-heritage-navy transition-colors duration-200 hover:bg-heritage-gold/90"
            >
              Subscribe
            </button>
          </div>
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
          <p className="mx-auto mt-4 inline-flex max-w-3xl items-center rounded-full border border-heritage-gold/30 bg-heritage-navy-light/30 px-4 py-2 text-xs font-medium tracking-wide text-heritage-stone/90 sm:text-sm">
            Researched and written using official war diaries, regimental records, and archival sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
