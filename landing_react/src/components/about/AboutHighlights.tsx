interface AboutHighlightsProps {
  items: string[];
}

export function AboutHighlights({ items }: AboutHighlightsProps) {
  return (
    <ul className="space-y-3 text-sm text-black/85 sm:text-base">
      {items.map((item) => (
        <li key={item} className="rounded-lg bg-white px-4 py-3">
          {item}
        </li>
      ))}
    </ul>
  );
}
