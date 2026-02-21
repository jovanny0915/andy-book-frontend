export function Hero() {
  return (
    <section className="relative bg-heritage-navy text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundColor: '#1e3a5f',
        }}
        aria-hidden
      />
      <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Remembering Waterman, Hickey & Vokes
        </h1>
        <p className="mt-4 text-lg md:text-xl text-heritage-stone/90 max-w-2xl mx-auto">
          Historical context, petitions for review, and a place for respectful discussion.
        </p>
      </div>
    </section>
  );
}
