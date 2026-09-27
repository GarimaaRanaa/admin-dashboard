// Card.tsx — a plain reusable content container. Use this as the base for any project-specific card (MenuCard, NewsCard, ListingCard, etc) instead of starting from scratch.
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-panel ${className}`}>{children}</div>;
}
