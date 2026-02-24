'use client';

import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
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
      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="flex justify-center items-end gap-6 md:gap-10 mb-6 md:mb-8 animate-fade-in">
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
        <p className="mt-5 text-lg md:text-xl lg:text-2xl text-heritage-stone/95 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          A historical investigation into courage, command, and Canada&apos;s unawarded Victoria Cross.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
          <Link
            href="/petitions"
            className="inline-flex items-center justify-center rounded-lg bg-heritage-gold text-heritage-navy px-8 py-4 text-lg font-semibold shadow-lg hover:bg-heritage-bronze hover:shadow-glow-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-navy"
          >
            Vote and Sign Petition
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-lg border-2 border-heritage-gold/70 text-heritage-gold px-8 py-4 text-lg font-semibold hover:bg-heritage-gold/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-navy"
          >
            Buy the Book
          </Link>
        </div>
      </div>
    </section>
  );
}
