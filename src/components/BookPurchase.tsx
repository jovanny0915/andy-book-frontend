'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const bookTitle = "The Chaplain's Diary";
const description =
  "A compelling account of the Victoria Cross case, drawn from the chaplain's diary. This volume offers historical context and firsthand perspective on the events and individuals involved.";

const defaultAmazonUrl = 'https://www.amazon.ca/s?k=The+Chaplain%27s+Diary';
const amazonUrl = process.env.NEXT_PUBLIC_BOOK_URL || defaultAmazonUrl;
const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';
const learnMoreUrl = '/history';
const price = process.env.NEXT_PUBLIC_BOOK_PRICE || '24.99';

const hasBookCover = true;

const productDetails = [
  {
    title: 'Price',
    value: `$${price}`,
    description: 'Before applicable taxes.',
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
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountCheckLoading, setDiscountCheckLoading] = useState(false);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const [discountFeedback, setDiscountFeedback] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCanceled, setPaymentCanceled] = useState(false);
  const showCover = hasBookCover && !coverError;
  const basePrice = Number.parseFloat(price);
  const discountRate = 0.2;
  const hasValidBasePrice = Number.isFinite(basePrice);
  const formattedBasePrice = hasValidBasePrice ? `$${basePrice.toFixed(2)}` : `$${price}`;
  const discountedPrice = hasValidBasePrice
    ? `$${(basePrice * (1 - discountRate)).toFixed(2)}`
    : formattedBasePrice;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setPaymentSuccess(params.get('success') === '1');
    setPaymentCanceled(params.get('canceled') === '1');
  }, []);

  const startCheckout = async () => {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const normalizedDiscountCode = isDiscountValid ? discountCode.trim() : '';
      const res = await fetch(`${apiUrl()}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentType: 'book',
          discountCode: normalizedDiscountCode,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCheckoutError(data.message || 'Unable to start checkout.');
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError('No checkout URL received.');
    } catch {
      setCheckoutError('Network error. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const checkDiscountCode = async () => {
    const normalizedDiscountCode = discountCode.trim();
    setCheckoutError(null);
    setDiscountFeedback(null);
    setIsDiscountValid(false);

    if (!normalizedDiscountCode) {
      setDiscountFeedback('Enter a code first, or continue at regular price.');
      return;
    }

    setDiscountCheckLoading(true);
    try {
      const validationRes = await fetch(`${apiUrl()}/api/stripe/validate-discount-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountCode: normalizedDiscountCode }),
      });
      const validationData = await validationRes.json().catch(() => ({}));
      if (validationRes.ok && validationData.valid !== false) {
        setIsDiscountValid(true);
        setDiscountFeedback('Code verified. Discount will be applied at checkout.');
      } else {
        setIsDiscountValid(false);
        setDiscountFeedback('Code is invalid. Checkout will continue at regular price.');
      }
    } catch {
      setIsDiscountValid(false);
      setDiscountFeedback('Could not verify code right now. Checkout will continue at regular price.');
    } finally {
      setDiscountCheckLoading(false);
    }
  };

  const openCheckoutModal = () => {
    setCheckoutError(null);
    setDiscountFeedback(null);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    if (checkoutLoading) return;
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Product card */}
      <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 backdrop-blur-sm shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Cover + main info — add book-cover.jpg to public to fill this spot */}
          <div className="flex flex-col sm:flex-row sm:items-start lg:flex-1 p-4 sm:p-6 md:p-8 gap-4 sm:gap-6 md:gap-8">
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
              <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold mb-2 md:mb-3">
                {bookTitle}
              </h2>
              <p className="text-heritage-charcoal/90 leading-relaxed mb-4 md:mb-6 flex-1">
                {description}
              </p>
              <div className="md:hidden mb-4 rounded-xl border border-heritage-gold/35 bg-heritage-stone/30 px-4 py-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-heritage-navy/80 mb-2">
                  Quick Purchase
                </p>
                <button
                  type="button"
                  onClick={openCheckoutModal}
                  className="w-full inline-flex items-center justify-center gap-2 bg-heritage-navy text-white px-5 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy-dark transition-all duration-200 shadow-lg shadow-heritage-navy/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Buy Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="mt-1 md:mt-2 border-y border-heritage-gold/30 py-4 md:py-8">
                <div className="max-w-3xl mx-auto rounded-2xl border border-heritage-navy/10 bg-gradient-to-b from-white via-white to-heritage-stone/40 shadow-lg shadow-heritage-navy/5 px-4 md:px-8 py-4 md:py-8">
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-heritage-gold mb-3">
                    Featured Excerpt
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold mb-4 md:mb-5 leading-tight">
                    Read an Excerpt from The Chaplain’s Diary
                  </h3>
                  <div className="h-px bg-gradient-to-r from-heritage-gold/50 via-heritage-navy/20 to-transparent mb-5" />
                  <div className="relative rounded-2xl border border-heritage-navy/10 bg-white/80 shadow-inner shadow-heritage-navy/5">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-2xl bg-gradient-to-b from-white via-white/85 to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-2xl bg-gradient-to-t from-white via-white/85 to-transparent z-10" />
                    <div className="max-h-[360px] overflow-y-auto px-4 md:px-5 py-5 md:py-6 pr-3 md:pr-4 space-y-4 text-heritage-charcoal/90 leading-8 text-[1rem] md:text-[1.04rem] scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(11,35,66,0.35)_transparent]">
                    {featuredExcerpt.map((line, index) => (
                      <p
                        key={`${line}-${index}`}
                        className={index === 0 ? 'font-serif text-xl text-heritage-navy' : undefined}
                      >
                        {line}
                      </p>
                    ))}
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-heritage-navy/20 to-heritage-gold/50 mt-6 mb-5" />
                  <p className="font-semibold text-heritage-navy text-base md:text-lg mb-4">
                    <strong>Read the full account and decide for yourself.</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={openCheckoutModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-heritage-navy text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy-dark transition-all duration-200 shadow-lg shadow-heritage-navy/20 hover:shadow-heritage-gold/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Buy Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    <Link
                      href={learnMoreUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-heritage-navy border-2 border-heritage-navy/30 px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200"
                    >
                      Learn More
                    </Link>
                  </div>
                  {paymentSuccess && (
                    <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm">
                      Thank you! Your book purchase was successful.
                    </div>
                  )}
                  {paymentCanceled && (
                    <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 text-sm">
                      Checkout was canceled. You can try again any time.
                    </div>
                  )}
                  {checkoutError && (
                    <p className="mt-4 text-red-600 text-sm" role="alert">
                      {checkoutError}
                    </p>
                  )}
                  {/* <a
                    href={amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-heritage-stone/70 text-heritage-charcoal border border-heritage-navy/20 px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-stone transition-all duration-200"
                  >
                    Buy on Amazon
                  </a> */}
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

      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close checkout modal"
            className="absolute inset-0 bg-black/50"
            onClick={closeCheckoutModal}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-heritage-gold/25 bg-gradient-to-b from-white to-heritage-stone/25 p-6 md:p-7 shadow-[0_28px_80px_rgba(11,35,66,0.28)]">
            <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-heritage-gold/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-heritage-navy/10 blur-2xl" />
            <h3 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold tracking-tight">Complete Purchase</h3>
            <p className="text-sm text-heritage-charcoal/80 mt-2">
              Enter an optional discount code, then continue to secure Stripe checkout.
            </p>

            <div className="mt-4 rounded-xl border border-heritage-navy/10 bg-white/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-heritage-navy/65">Book Price</p>
              {!isDiscountValid ? (
                <p className="mt-1 font-serif text-2xl font-bold text-heritage-navy">{formattedBasePrice}</p>
              ) : (
                <div className="mt-1 flex items-end gap-3">
                  <p className="text-sm font-semibold text-heritage-charcoal/55 line-through">{formattedBasePrice}</p>
                  <p className="font-serif text-2xl font-bold text-emerald-700">{discountedPrice}</p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    20% OFF
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="book-discount-code-modal" className="mb-2 block text-sm font-semibold text-heritage-navy/90">
                Discount code (optional)
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <input
                  id="book-discount-code-modal"
                  type="text"
                  value={discountCode}
                  disabled={isDiscountValid || discountCheckLoading || checkoutLoading}
                  onChange={(e) => {
                    setDiscountCode(e.target.value.toUpperCase());
                    setIsDiscountValid(false);
                    setDiscountFeedback(null);
                  }}
                  placeholder="Enter code for 20% off"
                  className="h-11 w-full rounded-xl border border-heritage-navy/25 bg-white/95 px-3.5 text-sm font-medium tracking-wide text-heritage-charcoal shadow-sm transition focus:border-heritage-gold/70 focus:outline-none focus:ring-4 focus:ring-heritage-gold/20 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-50/70 disabled:text-emerald-800"
                />
                <button
                  type="button"
                  onClick={checkDiscountCode}
                  disabled={discountCheckLoading || checkoutLoading || isDiscountValid}
                  className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-xl border border-heritage-navy/20 bg-heritage-navy px-4 text-sm font-semibold text-white shadow-md shadow-heritage-navy/20 transition hover:-translate-y-0.5 hover:bg-heritage-navy-dark disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-800 disabled:shadow-none"
                >
                  {isDiscountValid ? 'Verified' : discountCheckLoading ? 'Checking...' : 'Check Code'}
                </button>
              </div>
              <p className="mt-2 text-xs text-heritage-charcoal/70">
                Valid code gives 20% off.
              </p>
              {discountFeedback && (
                <p
                  className={`mt-2 rounded-lg border px-3 py-2 text-xs font-medium ${
                    isDiscountValid
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-amber-200 bg-amber-50 text-amber-700'
                  }`}
                >
                  {discountFeedback}
                </p>
              )}
            </div>

            {checkoutError && (
              <p className="text-red-600 text-sm mt-3" role="alert">
                {checkoutError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeCheckoutModal}
                disabled={checkoutLoading}
                className="inline-flex items-center justify-center rounded-xl border border-heritage-navy/20 bg-white px-4 py-2.5 text-heritage-charcoal font-semibold transition hover:bg-heritage-stone/40 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={startCheckout}
                disabled={checkoutLoading}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-heritage-navy to-heritage-navy-dark px-5 py-2.5 text-white font-semibold shadow-lg shadow-heritage-navy/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-heritage-navy/35 disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? 'Redirecting…' : 'Buy Book'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
