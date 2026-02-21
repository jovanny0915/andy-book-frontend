'use client';

import Link from 'next/link';

const heroCards = [
  {
    name: 'Ronald Waterman',
    src: '/hero-waterman.png',
    cta: 'Review the case',
    href: '/petitions',
  },
  {
    name: 'Christopher Vokes',
    src: '/hero-vokes.png',
    cta: 'Learn more about his service',
    href: '/history',
  },
  {
    name: 'Alphonsus Hickey',
    src: '/hero-hickey.png',
    cta: 'Review the case',
    href: '/petitions',
  },
];

export function HeroWithPortraits() {
  return (
    <section className="relative bg-heritage-navy/85 text-white overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23c9a227' stroke-width='0.3' opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='25' fill='none' stroke='%23c9a227' stroke-width='0.2' opacity='0.15'/%3E%3Cpath d='M50 10 L50 90 M10 50 L90 50' stroke='%23c9a227' stroke-width='0.2' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14 text-center">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-sm animate-fade-in">
          Remembering Waterman, Hickey & Vokes
        </h1>
        <p className="mt-3 text-lg md:text-xl text-heritage-stone/90 max-w-2xl mx-auto animate-fade-in">
          Historical context, petitions for review, and a place for respectful discussion.
        </p>
        {/* Three hero cards – framed portraits with VC medal */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto animate-fade-in">
          {heroCards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-navy"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-heritage-gold/30 bg-heritage-navy-light/20 transition-all duration-300 group-hover:border-heritage-gold/60 group-hover:shadow-glow-gold group-hover:scale-[1.02]">
                <img
                  src={card.src}
                  alt={`${card.name} – Victoria Cross recipient`}
                  className="w-full h-auto object-cover aspect-[3/4] object-top"
                />
                <span className="sr-only">{card.cta}</span>
              </div>
              <p className="mt-2 text-sm text-heritage-gold/90 font-medium group-hover:text-heritage-gold">
                {card.cta}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
