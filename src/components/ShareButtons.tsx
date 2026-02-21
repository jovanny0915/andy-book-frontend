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

  const links = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded(url)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encoded(url)}&text=${encoded(text)}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded(url)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encoded(text + ' ' + url)}` },
    { name: 'Email', href: `mailto:?subject=${encoded(title)}&body=${encoded(text)}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-heritage-charcoal">Share:</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-heritage-navy hover:underline text-sm"
        >
          {link.name}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="text-heritage-navy hover:underline text-sm"
      >
        Copy link
      </button>
    </div>
  );
}
