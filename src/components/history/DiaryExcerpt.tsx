type DiaryExcerptProps = {
  children: React.ReactNode;
  source?: string;
};

export function DiaryExcerpt({ children, source = "The Chaplain's Diary" }: DiaryExcerptProps) {
  return (
    <blockquote className="border-l-4 border-heritage-gold bg-heritage-parchment/50 py-4 px-5 md:px-6 rounded-r-lg my-6 not-italic">
      <p className="text-heritage-charcoal leading-relaxed">{children}</p>
      {source && (
        <cite className="mt-3 block text-sm text-heritage-charcoal/70 not-italic">
          — {source}
        </cite>
      )}
    </blockquote>
  );
}
