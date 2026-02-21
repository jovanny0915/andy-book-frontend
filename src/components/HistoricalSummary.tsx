export function HistoricalSummary() {
  const summaries = [
    {
      name: 'Ronald Waterman',
      slug: 'waterman',
      text: 'Brief factual summary of Ronald Waterman’s service and Victoria Cross case. (Content to be supplied.)',
    },
    {
      name: 'Alphonsus Hickey',
      slug: 'hickey',
      text: 'Brief factual summary of Alphonsus Hickey’s service and Victoria Cross case. (Content to be supplied.)',
    },
    {
      name: 'Christopher Vokes',
      slug: 'vokes',
      text: 'Brief factual summary of Christopher Vokes and his connection to these cases. (Content to be supplied.)',
    },
  ];

  return (
    <section className="py-6" id="history">
      <h2 className="font-serif text-xl text-heritage-navy border-b border-heritage-gold/40 pb-2 mb-8">
        Historical context
      </h2>
      <div className="space-y-12">
        {summaries.map((item) => (
          <article key={item.slug} className="prose prose-lg max-w-none">
            <h3 className="font-serif text-xl text-heritage-navy">{item.name}</h3>
            <p className="text-heritage-charcoal leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
