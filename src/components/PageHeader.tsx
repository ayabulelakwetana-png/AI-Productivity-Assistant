import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-7 flex items-start gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-tint text-brand-blue">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h1 className="text-[28px] font-extrabold leading-tight text-navy">{title}</h1>
        <p className="mt-1 max-w-[650px] text-[16px] leading-relaxed text-body">{description}</p>
      </div>
    </header>
  );
}

export function Panel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border-grey bg-white p-6 shadow-card">
      {title && <h2 className="mb-4 text-[18px] font-bold text-navy">{title}</h2>}
      {children}
    </section>
  );
}
