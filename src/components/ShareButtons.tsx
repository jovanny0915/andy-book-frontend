'use client';

type Props = {
  url: string;
  title: string;
  text: string;
};

const encoded = (s: string) => encodeURIComponent(s);

export function ShareButtons({ url, title, text }: Props) {
  const copyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };

  const emailBody = text.includes(url) ? text : `${text}\n\n${url}`;
  const emailHref = `mailto:?subject=${encoded(title)}&body=${encoded(emailBody)}`;

  const links = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded(url)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encoded(url)}&text=${encoded(text)}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded(url)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encoded(text + ' ' + url)}` },
  ];

  return (
    <div className="space-y-3">
      <a
        href={emailHref}
        className="inline-flex items-center justify-center rounded-lg bg-heritage-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-heritage-navy-light transition-colors"
      >
        Share by email to your contacts
      </a>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-heritage-charcoal/80">Or share on social:</span>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-white border border-heritage-charcoal/15 px-3 py-2 text-sm font-medium text-heritage-navy hover:bg-heritage-navy/5 hover:border-heritage-gold/30 transition-colors"
          >
            {link.name}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center rounded-lg bg-white border border-heritage-charcoal/15 px-3 py-2 text-sm font-medium text-heritage-navy hover:bg-heritage-navy/5 hover:border-heritage-gold/30 transition-colors"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}
