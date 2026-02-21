import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'History – Victoriacross.ca',
  description: 'Historical context on Ronald Waterman, Alphonsus Hickey, and Christopher Vokes.',
};

const historyRows: Array<{
  left: { name: string; slug: string; image: string; text: string; ctaHref: string; showMedal?: boolean };
  right: { name: string; text: string };
}> = [
  {
    left: {
      name: 'Ronald Waterman',
      slug: 'waterman',
      image: '/hero-waterman.png',
      text: "Brief factual summary of Ronald's service and Victoria Cross case. (Content to be supplied)",
      ctaHref: '/petitions',
    },
    right: {
      name: 'Alphonus Hickey',
      text: "Brief factual summary of Ronald's service and Victoria Cross case. (Content to be supplied.)",
    },
  },
  {
    left: {
      name: 'Alphonus Hickey',
      slug: 'hickey',
      image: '/hero-hickey.png',
      text: "Brief factual summary of Alphonus's service and Victoria Cross to be supplied.",
      ctaHref: '/petitions',
      showMedal: true,
    },
    right: {
      name: 'Christopher Vokes',
      text: "Brief factual summary of Lionel's service and Victoria Cross case. (Content to be supplied.)",
    },
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-heritage-stone">
      {/* Hero: book background with title and subtitle */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-heritage-stone/90"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.12] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/history-book.png)' }}
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heritage-navy">
            History
          </h1>
          <p className="mt-3 text-heritage-charcoal text-base md:text-lg max-w-2xl mx-auto">
            Brief factual summaries of the individuals&apos; cases at the heart of this project.
          </p>
          <div className="mt-6 h-px w-full max-w-md mx-auto bg-heritage-gold/30" aria-hidden />
          <h2 className="mt-6 font-sans text-lg md:text-xl text-heritage-navy font-medium">
            Historical context
          </h2>
        </div>
      </section>

      {/* Two-column grid: each row = portrait + CTA | text-only */}
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="space-y-0">
          {historyRows.map((row, rowIndex) => (
            <div key={row.left.slug + rowIndex}>
              {/* Separator line above each history entry row */}
              <div
                className="w-full h-px bg-heritage-gold/40 my-0"
                aria-hidden
              />
              <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Left: framed portrait, name, description, CTA button */}
                <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-36 h-44 sm:w-40 sm:h-52 rounded overflow-hidden border-2 border-heritage-gold/40 shadow-md">
                    <Image
                      src={row.left.image}
                      alt=""
                      width={160}
                      height={208}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {row.left.showMedal && (
                    <div
                      className="absolute -bottom-1 -left-1 w-9 h-9 rounded-full bg-heritage-gold/90 border-2 border-heritage-navy flex items-center justify-center text-heritage-navy text-xs font-bold"
                      aria-hidden
                    >
                      VC
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl text-heritage-navy font-semibold">
                    {row.left.name}
                  </h3>
                  <p className="mt-2 text-sm text-heritage-charcoal leading-relaxed">
                    {row.left.text}
                  </p>
                  <Link
                    href={row.left.ctaHref}
                    className="mt-4 inline-block bg-heritage-navy text-white px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-heritage-navy-light transition-colors"
                  >
                    LEARN MORE ABOUT HIS SERVICE
                  </Link>
                </div>
              </div>
              {/* Right: name + description only */}
              <article className="flex flex-col justify-center md:pt-0">
                <h3 className="font-serif text-xl text-heritage-navy font-semibold">
                  {row.right.name}
                </h3>
                <p className="mt-2 text-sm text-heritage-charcoal leading-relaxed">
                  {row.right.text}
                </p>
              </article>
              </div>
            </div>
          ))}
          {/* Closing separator line after last entry */}
          <div
            className="w-full h-px bg-heritage-gold/40 mt-0"
            aria-hidden
          />
        </div>
      </section>

      <div className="pb-12" aria-hidden />
    </div>
  );
}
