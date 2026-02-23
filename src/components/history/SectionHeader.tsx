import Image from 'next/image';

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle?: string;
  /** Portrait image shown on the left (right on mobile). */
  image?: { src: string; alt: string };
  /** Short biography block rendered directly under the name (heading + content). */
  bio?: { heading: string; content: React.ReactNode };
};

export function SectionHeader({ id, title, subtitle, image, bio }: SectionHeaderProps) {
  const content = (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
      {image && (
        <div
          className="relative w-full max-w-[200px] aspect-[3/4] md:w-44 md:max-w-none md:aspect-[3/4] rounded overflow-hidden border border-heritage-gold/70 flex-shrink-0 bg-heritage-parchment"
          style={{ boxShadow: '2px 2px 8px rgba(0,0,0,0.08)' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 200px, 176px"
          />
        </div>
      )}
      <div className="min-w-0">
        <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-heritage-charcoal/90 text-base md:text-lg max-w-2xl font-normal">
            {subtitle}
          </p>
        )}
        <div className="mt-4 h-px w-16 bg-heritage-gold/90" aria-hidden />
        {bio && (
          <div className="mt-6">
            <h3 className="font-serif text-lg text-heritage-navy font-semibold mb-2">
              {bio.heading}
            </h3>
            <div className="text-heritage-charcoal leading-relaxed text-[15px] md:text-base">
              {bio.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header id={id} className="scroll-mt-24 pt-12 md:pt-16 first:pt-8">
      {image ? (
        <div className="rounded-lg bg-[#FBF8F0] p-6 md:p-8">{content}</div>
      ) : (
        content
      )}
    </header>
  );
} 
