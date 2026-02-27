export function ShortIntroduction() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-6">
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/90 shadow-xl shadow-heritage-navy/10 p-8 md:p-10 backdrop-blur-sm">
        <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy border-b border-heritage-gold/40 pb-3 mb-6">
          About the Book
        </h2>
        <div className="space-y-5">
          <p className="text-base md:text-lg text-heritage-charcoal leading-relaxed">
            <em>The Chaplain&apos;s Diary</em> is a deeply researched account of courage, memory, and military decision-making.
            It follows the campaign through Sicily, Ortona, and the Gothic Line, then examines how medal recommendations
            were assessed, reduced, or set aside. The result is a concise, evidence-led narrative that challenges long-held
            assumptions about Canada&apos;s most extraordinary wartime acts.
          </p>
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
