'use client';

export function BuyMeACoffeeSection() {
  const supportUrl = process.env.NEXT_PUBLIC_COFFEE_URL || '/support';
  const amounts = [5, 10, 20, 50];

  return (
    <section className="max-w-2xl mx-auto px-4 py-10 md:py-12">
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/90 shadow-lg p-8 text-center">
        <h2 className="font-serif text-2xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-3">
          Buy Me a Coffee
        </h2>
        <p className="text-heritage-charcoal/90 text-sm md:text-base mb-6">
          Optional one-time support for the project. Not commercial—just supportive. All donations go toward research and maintaining this site.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {amounts.map((amount) => (
            <a
              key={amount}
              href={supportUrl}
              className="inline-flex items-center justify-center min-w-[4rem] rounded-lg border-2 border-heritage-navy/25 text-heritage-navy px-5 py-3 font-semibold hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200"
            >
              ${amount}
            </a>
          ))}
        </div>
        <p className="text-xs text-heritage-charcoal/60 mt-4">
          Secure payment via Stripe. No recurring charges unless you choose to.
        </p>
      </div>
    </section>
  );
}
