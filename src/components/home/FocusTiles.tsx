'use client';

import Link from 'next/link';
import Image from 'next/image';

const tiles = [
  {
    name: 'Colonel Ronald Waterman',
    slug: 'waterman',
    image: '/hero-waterman.png?v=real',
    href: '/history#waterman',
    teaser: 'Leadership, valour, and the case for review.',
  },
  {
    name: 'Corporal Alphonsus Hickey',
    slug: 'hickey',
    image: '/hero-hickey.png?v=real',
    href: '/history#hickey',
    teaser: 'Gallantry in the field and an unawarded VC.',
  },
  {
    name: 'Padre Laurence Wilmot MC',
    slug: 'wilmot',
    image: '/hero-wilmot.png?v=real',
    href: '/history#wilmot',
    teaser: 'The chaplain whose diary illuminates the story.',
  },
];

export function FocusTiles() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy text-center border-b border-heritage-gold/40 pb-3 mb-10 inline-block w-full text-left md:text-center">
        The People at the Heart of the Story
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.slug}
            href={tile.href}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 rounded-xl overflow-hidden"
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-heritage-navy/15 bg-white/90 shadow-md hover:shadow-glow-gold hover:border-heritage-gold/40 transition-all duration-300 group-hover:-translate-y-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-navy/90 via-heritage-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-serif text-xl font-semibold text-white drop-shadow-sm">
                    {tile.name}
                  </h3>
                  <p className="text-sm text-heritage-stone/95 mt-1">{tile.teaser}</p>
                  <span className="mt-3 inline-block text-sm text-heritage-gold font-medium group-hover:underline">
                    Read their story →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
