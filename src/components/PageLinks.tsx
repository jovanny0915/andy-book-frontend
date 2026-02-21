import Link from 'next/link';

const links = [
  { href: '/history', label: 'History', description: 'Brief context on Ronald Waterman, Alphonsus Hickey, and Christopher Vokes.' },
  { href: '/petitions', label: 'Petitions', description: 'Add your verified signature to support a review of the VC cases.' },
  { href: '/forum', label: 'Forum', description: 'Join the moderated discussion.' },
  { href: '/book', label: 'The Chaplain\'s Diary', description: 'Purchase the book.' },
  { href: '/support', label: 'Support', description: 'Share the project or make a one-time donation.' },
];

export function PageLinks() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="sr-only">Explore</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ href, label, description }) => (
          <li key={href}>
            <Link
              href={href}
              className="block border border-heritage-navy/20 rounded-lg p-6 bg-white hover:border-heritage-gold/50 hover:shadow-md transition-all"
            >
              <span className="font-serif text-lg text-heritage-navy font-medium">{label}</span>
              <p className="mt-2 text-sm text-heritage-charcoal/80">{description}</p>
              <span className="mt-3 inline-block text-sm text-heritage-navy hover:underline">Go →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
