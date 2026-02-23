type DocItem = {
  title: string;
  description?: string;
};

type DocumentListProps = {
  items: DocItem[];
};

export function DocumentList({ items }: DocumentListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-sm border-l-2 border-heritage-gold/30 pl-4 py-1"
        >
          <span className="text-heritage-gold font-serif">†</span>
          <div>
            <span className="font-medium text-heritage-navy">{item.title}</span>
            {item.description && (
              <p className="text-heritage-charcoal/80 mt-0.5">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
