'use client';

export function BuyMeACoffee() {
  const amounts = [5, 10, 20];
  const supportUrl = process.env.NEXT_PUBLIC_COFFEE_URL || '#'; // Stripe or Buy Me a Coffee

  return (
    <section className="pt-10 mt-10 border-t border-heritage-navy/10">
      <h2 className="font-serif text-xl text-heritage-navy border-b border-heritage-gold/40 pb-2 mb-4">
        One-time donation
      </h2>
      <p className="text-heritage-charcoal text-sm mb-6">
        Optional one-time support. Not commercial—just supportive.
      </p>
      <div className="flex flex-wrap gap-3">
        {amounts.map((amount) => (
          <a
            key={amount}
            href={supportUrl}
            className="border border-heritage-navy/30 text-heritage-navy px-4 py-2 rounded font-medium hover:bg-heritage-navy/5"
          >
            ${amount}
          </a>
        ))}
      </div>
      <p className="text-xs text-heritage-charcoal/60 mt-4">
        Stripe integration preferred – to be configured in backend.
      </p>
    </section>
  );
}
