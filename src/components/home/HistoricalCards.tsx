import Link from 'next/link';

const figures = [
  {
    name: 'Ronald Waterman',
    slug: 'waterman',
    teaser: 'Served in WWI. Ronald Waterman was recognized for his VC courage and sacrifice.',
  },
  {
    name: 'Alphonsus Hickey',
    slug: 'hickey',
    teaser: 'Service and valour in the field. Alphonsus Hickey’s case remains part of the historical record.',
  },
  {
    name: 'Christopher Vokes',
    slug: 'vokes',
    teaser: 'Major-General Christopher Vokes and his connection to these Victoria Cross cases.',
  },
];

export function HistoricalCards() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="font-serif text-xl md:text-2xl text-heritage-navy border-b border-heritage-gold/40 pb-2 mb-6">
        Historical context
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {figures.map((fig) => (
          <Link
            key={fig.slug}
            href="/history"
            className="block rounded-lg border border-heritage-navy/15 bg-white/80 p-6 shadow-sm hover:shadow-glow-gold hover:border-heritage-gold/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <h3 className="font-serif text-lg text-heritage-navy font-medium">{fig.name}</h3>
            <p className="mt-2 text-sm text-heritage-charcoal/80 leading-relaxed">{fig.teaser}</p>
            <span className="mt-3 inline-block text-sm text-heritage-gold font-medium">View details →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
