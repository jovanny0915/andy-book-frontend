import { BookPassage } from '@/content/bookPassage';

export function ShortIntroduction() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/90 shadow-lg shadow-heritage-navy/5 p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-6">
          About the Book
        </h2>
        <div className="prose prose-lg text-heritage-charcoal leading-relaxed space-y-4">
          <BookPassage />
        </div>
      </div>
    </section>
  );
}
