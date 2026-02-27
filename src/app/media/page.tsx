type CoverageItem = {
  outlet: string;
  format: string;
  title: string;
  summary: string;
  status: 'Planned' | 'In Review' | 'Upcoming';
};

const mockCoverage: CoverageItem[] = [
  {
    outlet: 'Canadian History Review',
    format: 'Feature Article',
    title: 'Revisiting Unawarded Bravery in the Italian Campaign',
    summary: 'A long-form editorial examining archival evidence and the campaign for renewed honours review.',
    status: 'Planned',
  },
  {
    outlet: 'Veterans Voice Podcast',
    format: 'Interview',
    title: 'The Story Behind The Chaplain\'s Diary',
    summary: 'A discussion about military ethics, remembrance, and why documented courage still matters today.',
    status: 'In Review',
  },
  {
    outlet: 'Maple National News',
    format: 'Segment',
    title: 'How Public Petitions Reopen Historical Questions',
    summary: 'A broadcast segment focused on community support and historical accountability.',
    status: 'Upcoming',
  },
];

function StatusBadge({ status }: { status: CoverageItem['status'] }) {
  const statusStyles: Record<CoverageItem['status'], string> = {
    Planned: 'bg-heritage-gold/20 text-heritage-navy',
    'In Review': 'bg-heritage-navy/10 text-heritage-navy',
    Upcoming: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function CoverageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 13h6" />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6 10a6 6 0 0 0 12 0M12 16v5M9 21h6" />
    </svg>
  );
}

function PressKitIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 7h12a2 2 0 0 1 2 2v8H4V9a2 2 0 0 1 2-2Z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2M10 12h4" />
    </svg>
  );
}

export const metadata = {
  title: 'Media – The Chaplain\'s Diary | Victoriacross.ca',
  description: 'Media coverage, interviews, and endorsements related to The Chaplain\'s Diary.',
};

export default function MediaPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-heritage-stone">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.14),transparent_45%),radial-gradient(circle_at_20%_20%,rgba(26,47,74,0.14),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-parchment-texture opacity-60" />

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="rounded-3xl border border-heritage-gold/20 bg-white/75 backdrop-blur-md shadow-xl shadow-heritage-navy/10 p-8 md:p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-heritage-navy/15 bg-heritage-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage-navy">
            <span aria-hidden>✦</span>
            Media Center
          </p>
          <h1 className="mt-5 font-serif text-3xl md:text-5xl font-bold tracking-tight text-heritage-navy">
            Media
          </h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-heritage-charcoal/90">
            Media coverage and endorsements will be posted here.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-heritage-navy text-white p-4">
              <CoverageIcon />
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Coverage</p>
              <p className="mt-1 text-2xl font-semibold">{mockCoverage.length}</p>
            </div>
            <div className="rounded-2xl border border-heritage-navy/15 bg-white p-4">
              <MicrophoneIcon />
              <p className="text-xs uppercase tracking-[0.16em] text-heritage-charcoal/70">Interviews</p>
              <p className="mt-1 text-2xl font-semibold text-heritage-navy">Soon</p>
            </div>
            <div className="rounded-2xl border border-heritage-gold/25 bg-heritage-gold/10 p-4">
              <PressKitIcon />
              <p className="text-xs uppercase tracking-[0.16em] text-heritage-charcoal/70">Press Kit</p>
              <p className="mt-1 text-2xl font-semibold text-heritage-navy">Coming</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-20">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-heritage-navy">Mockup Coverage</h2>
        <p className="mt-3 text-heritage-charcoal/85 leading-relaxed">
          While this section is being prepared, here is a modern mockup of how coverage highlights and endorsements will appear.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {mockCoverage.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-heritage-navy/15 bg-white/90 p-5 shadow-md shadow-heritage-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-heritage-navy/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-heritage-charcoal/65">{item.format}</p>
                  <p className="mt-1 text-sm text-heritage-charcoal/80">{item.outlet}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="mt-4 font-serif text-xl leading-tight text-heritage-navy group-hover:text-heritage-navy-light">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-heritage-charcoal/85">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
