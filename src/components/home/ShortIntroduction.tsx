import { BookPassage } from '@/content/bookPassage';

export function ShortIntroduction() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-6">
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/90 shadow-lg shadow-heritage-navy/5 p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-6">
          About the Book
        </h2>
        <div className="prose prose-lg text-heritage-charcoal leading-relaxed space-y-4">
          <BookPassage />
        </div>
      </div>
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/90 shadow-lg shadow-heritage-navy/5 p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-6">
          From The Chaplain&apos;s Diary
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <blockquote className="rounded-xl border border-heritage-gold/20 bg-heritage-stone/25 p-5 text-heritage-charcoal leading-relaxed">
            Placeholder excerpt one. A brief diary preview will be added here once final text is ready.
          </blockquote>
          <blockquote className="rounded-xl border border-heritage-gold/20 bg-heritage-stone/25 p-5 text-heritage-charcoal leading-relaxed">
            Placeholder excerpt two. A second short preview from the diary will be inserted here.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
