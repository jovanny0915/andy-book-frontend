'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export function HeroSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${apiUrl}/api/newsletter/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: 'error', message: json.message || 'Unable to sign up right now. Please try again.' });
        return;
      }

      setFeedback({ type: 'success', message: 'You are subscribed for book updates.' });
      setEmail('');
    } catch {
      setFeedback({ type: 'error', message: 'Unable to sign up right now. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative bg-heritage-navy text-white overflow-hidden min-h-[70vh] flex flex-col justify-center">
      {/* Subtle radial gradient and pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,39,0.08) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30 30 60 0 30z' fill='none' stroke='%23c9a227' stroke-width='0.15' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2">
          <Image
            src="/vc-medal.png"
            alt=""
            width={420}
            height={620}
            className="h-[46vh] lg:h-[62vh] w-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <div className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2">
          <Image
            src="/dcm-medal.png"
            alt=""
            width={360}
            height={560}
            className="h-[44vh] lg:h-[60vh] w-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="flex justify-center items-end gap-6 md:gap-10 mb-6 md:mb-8 animate-fade-in md:hidden">
          <Image
            src="/vc-medal.png"
            alt="Victoria Cross"
            width={120}
            height={160}
            className="w-20 h-auto md:w-28 object-contain drop-shadow-md"
            priority
          />
          <Image
            src="/dcm-medal.png"
            alt="Distinguished Conduct Medal"
            width={100}
            height={130}
            className="w-16 h-auto md:w-24 object-contain drop-shadow-md"
            priority
          />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-sm animate-fade-in">
          The Chaplain&apos;s Diary
        </h1>
        <h2 className="mt-3 font-serif text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-heritage-stone/95 max-w-3xl mx-auto animate-fade-in">
          The Untold Story Behind Canada&apos;s Unawarded Victoria Cross
        </h2>
        <p className="mt-5 text-lg md:text-xl lg:text-2xl text-heritage-stone/95 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          This book documents the actions of Waterman and Hickey at the Gothic Line in 1944 and examines why Canada&apos;s Victoria Cross remains unawarded.
        </p>
        <div className="mt-6 max-w-xl mx-auto animate-fade-in">
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="home-email-signup" className="sr-only">
              Email Address
            </label>
            <input
              id="home-email-signup"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Email Address"
              className="w-full rounded-lg px-4 py-3 text-base bg-white/95 text-heritage-charcoal placeholder:text-heritage-charcoal/60 border border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-heritage-gold text-heritage-navy px-6 py-3 text-base font-semibold shadow-lg hover:bg-heritage-bronze transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-navy disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get Book Updates'}
            </button>
          </form>
          {feedback && (
            <p className={`mt-2 text-sm ${feedback.type === 'success' ? 'text-emerald-200' : 'text-red-200'}`}>
              {feedback.message}
            </p>
          )}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-lg bg-heritage-gold text-heritage-navy px-8 py-4 text-lg font-semibold shadow-lg hover:bg-heritage-bronze hover:shadow-glow-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-navy"
          >
            Buy the Book
          </Link>
          <Link
            href="/petitions"
            className="inline-flex items-center justify-center rounded-lg border border-heritage-gold/60 text-heritage-stone px-6 py-2.5 text-sm md:text-base font-medium hover:bg-heritage-gold/10 hover:text-heritage-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-navy"
          >
            Vote and Sign Petition
          </Link>
        </div>
      </div>
    </section>
  );
}
