'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const bookTitle = "The Chaplain's Diary";
const description =
  "A compelling account of the Victoria Cross case, drawn from the chaplain's diary. This volume offers historical context and firsthand perspective on the events and individuals involved.";

const defaultAmazonUrl = 'https://www.amazon.ca/s?k=The+Chaplain%27s+Diary';
const buyUrl = process.env.NEXT_PUBLIC_BOOK_URL || defaultAmazonUrl;
const learnMoreUrl = '/history';
const price = process.env.NEXT_PUBLIC_BOOK_PRICE || '24.99';

const hasBookCover = true;

const productDetails = [
  {
    title: 'Price',
    value: `$${price}`,
    description: 'CAD, before applicable taxes.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Confirmation email',
    value: 'Sent right after order',
    description: 'You’ll receive an order confirmation and tracking details by email.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const bookCoverSrc = '/book-cover.jpg';
const featuredExcerpt = [
  'September 1944. Gothic Line.',
  'The night smelled of cordite and crushed fennel. The ridge ahead was little more than a dark outline against a starless sky, but everyone knew what waited there. Machine guns were stitched into stone walls. Mortars were zeroed to the inch. Mines lay in shallow earth, patient and impartial.',
  'Orders came at dusk. Advance.',
  'There was no reconnaissance. No armour. Limited artillery.',
  'Just men.',
  'Corporal Alphonsus Hickey checked the Bren gun by touch alone. He had worked steel in Cape Breton before the war. Quiet man. Strong hands. The kind who spoke only when necessary. He did not make speeches. He made decisions.',
  'The first mortar round fell behind them.',
  'The second fell short.',
  'Then the hillside opened.',
  'Machine guns tore through the dark. Mines snapped upward in metal bursts. Men dropped and crawled and called out into a night that gave no answer. The attack faltered before it properly began.',
  'The order to withdraw moved along the line in fragments.',
  'Hickey did not move.',
  '“Leave the cartridges,” he said. No drama. No raised voice. “I’ll hold.”',
  'He set the Bren behind a low stone wall. Short bursts. Controlled. Deliberate. Not wasteful. Each squeeze of the trigger bought seconds. Seconds became yards. Yards became lives.',
  'The men behind him crawled back through mud and wire and shattered vines.',
  'He stayed.',
  'The gun cut the night with steady rhythm. Not frantic. Measured. As if time itself could be disciplined.',
  'At dawn the firing stopped.',
  'They found him upright behind the wall. Barrel burned. Magazines empty. Six enemy dead in a rough arc before him. The slope littered with silence.',
  'He had held the line alone.',
  'The battalion chaplain buried him near the river that afternoon. No band. No citation. Just frost settling early on helmets placed in mud.',
  'A recommendation went forward.',
  'It did not return.',
  'The official record reduced him to a line. A Mention in Despatches.',
  'Thin ink for a full life.',
  'Elsewhere that same night, Lieutenant Colonel Ronald Waterman crossed open ground under machine gun fire to drag wounded men back by hand. He rallied a broken company in darkness and held a ridge that should have collapsed. A Victoria Cross was recommended.',
  'It vanished.',
  'The division commander, Major General Christopher Vokes, approved a lesser decoration. Clean. Proper. Contained.',
  'Too many Victoria Crosses in Italy would raise questions.',
  'Why so much desperate bravery.',
  'Why so many dead.',
  'Why were men forced into situations that required such sacrifice.',
  'Medals shine.',
  'But they also expose.',
  'Canada created its own Victoria Cross in 1993. Identical in shape. Cast from the same metal. Inscribed Pro Valore.',
  'Thirty years later, it remains unworn.',
  'The bronze waits.',
  'The question is not whether courage existed.',
  'The question is whether we chose to see it.',
];

export function BookPurchase() {
  const [coverError, setCoverError] = useState(false);
  const showCover = hasBookCover && !coverError;

  return (
    <div className="animate-fade-in">
      {/* Product card */}
      <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 backdrop-blur-sm shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Cover + main info — add book-cover.jpg to public to fill this spot */}
          <div className="flex flex-col sm:flex-row sm:items-start lg:flex-1 p-6 md:p-8 gap-6 md:gap-8">
            <div className="flex-shrink-0 self-start w-full max-w-[250px] mx-auto sm:mx-0 rounded-2xl border border-heritage-gold/30 bg-white p-2 shadow-xl shadow-heritage-navy/10 ring-1 ring-heritage-gold/10">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-heritage-navy/10 bg-heritage-stone/30">
              {showCover ? (
                <Image
                  src={bookCoverSrc}
                  alt={`${bookTitle} – cover`}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                  sizes="250px"
                  priority
                  onError={() => setCoverError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-heritage-charcoal/40 p-4">
                  <span className="font-serif text-lg">The Chaplain&apos;s Diary</span>
                  <span className="text-xs mt-1">Cover</span>
                </div>
              )}
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold mb-3">
                {bookTitle}
              </h2>
              <p className="text-heritage-charcoal/90 leading-relaxed mb-6 flex-1">
                {description}
              </p>
              <div className="mt-2 border-y border-heritage-gold/30 py-6 md:py-8">
                <div className="max-w-3xl mx-auto rounded-2xl border border-heritage-navy/10 bg-gradient-to-b from-white via-white to-heritage-stone/40 shadow-lg shadow-heritage-navy/5 px-5 md:px-8 py-6 md:py-8">
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-heritage-gold mb-3">
                    Featured Excerpt
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold mb-5 leading-tight">
                    Read an Excerpt from The Chaplain’s Diary
                  </h3>
                  <div className="h-px bg-gradient-to-r from-heritage-gold/50 via-heritage-navy/20 to-transparent mb-5" />
                  <div className="max-h-[420px] overflow-y-auto pr-2 md:pr-3 space-y-4 text-heritage-charcoal/90 leading-8 text-[1rem] md:text-[1.04rem]">
                    {featuredExcerpt.map((line, index) => (
                      <p
                        key={`${line}-${index}`}
                        className={index === 0 ? 'font-serif text-xl text-heritage-navy' : undefined}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-heritage-navy/20 to-heritage-gold/50 mt-6 mb-5" />
                  <p className="font-semibold text-heritage-navy text-base md:text-lg">
                    <strong>Continue reading the full story inside The Chaplain’s Diary.</strong>
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={buyUrl}
                      target={buyUrl.startsWith('http') ? '_blank' : undefined}
                      rel={buyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center gap-2 bg-heritage-navy text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy-dark transition-all duration-200 shadow-lg shadow-heritage-navy/20 hover:shadow-heritage-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Buy Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <Link
                      href={learnMoreUrl}
                      className="inline-flex items-center justify-center gap-2 bg-white text-heritage-navy border-2 border-heritage-navy/30 px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price, Confirmation email */}
        <div className="border-t border-heritage-navy/10 bg-heritage-stone/50">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10">
            {productDetails.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 md:p-6 text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-heritage-gold/15 text-heritage-gold flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-heritage-navy/70 mb-0.5">
                    {item.title}
                  </p>
                  <p className="font-serif text-lg font-bold text-heritage-navy">
                    {item.value}
                  </p>
                  <p className="text-sm text-heritage-charcoal/80 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
