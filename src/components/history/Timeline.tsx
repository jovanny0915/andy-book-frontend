type TimelineItem = {
  year?: string;
  label: string;
  detail?: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px bg-heritage-gold/40"
        aria-hidden
      />
      <ul className="space-y-6">
        {items.map((item, i) => (
          <li key={i} className="relative flex gap-4 pl-0">
            <span
              className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-heritage-gold bg-heritage-stone mt-0.5"
              aria-hidden
            />
            <div>
              {item.year && (
                <span className="text-sm font-semibold text-heritage-gold uppercase tracking-wide">
                  {item.year}
                </span>
              )}
              <p className="font-medium text-heritage-navy mt-0.5">{item.label}</p>
              {item.detail && (
                <p className="text-sm text-heritage-charcoal/80 mt-1">{item.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
