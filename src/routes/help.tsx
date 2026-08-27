import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LifeBuoy, ChevronDown, Mail, FileText, ListChecks, Search, MessageSquare } from "lucide-react";

import { PageHeader, Panel } from "@/components/PageHeader";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — WorkEazy" },
      {
        name: "description",
        content: "Guides, FAQs and quick links for getting the most out of your WorkEazy tools.",
      },
      { property: "og:title", content: "Help & Support — WorkEazy" },
      {
        property: "og:description",
        content: "Guides, FAQs and quick links for getting the most out of your WorkEazy tools.",
      },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  {
    q: "How does the Smart Email Generator work?",
    a: "Add your key points, choose a recipient and a tone, then generate. The draft is fully editable — copy it into your email client and review before sending.",
  },
  {
    q: "Where is my data stored?",
    a: "Everything you type runs in your browser for this demo workspace. Nothing is uploaded, and clearing your browser data removes your preferences.",
  },
  {
    q: "Can I trust the AI output?",
    a: "Treat every output as a first draft. WorkEazy structures your thinking, but you should always review facts, names and numbers before acting.",
  },
  {
    q: "How does the Task Planner prioritise?",
    a: "It uses the urgency/importance matrix: urgent + important is Do now, important only is Schedule, urgent only is Delegate, and everything else is Later.",
  },
];

const quickLinks = [
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Notes Summarizer", icon: FileText },
  { to: "/tasks", label: "AI Task Planner", icon: ListChecks },
  { to: "/research", label: "AI Research Assistant", icon: Search },
  { to: "/assistant", label: "WorkEazy AI Assistant", icon: MessageSquare },
] as const;

function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <PageHeader
        icon={LifeBuoy}
        title="Help & Support"
        description="Quick answers, tool guides and a direct line to the WorkEazy team."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Panel title="Frequently asked questions">
          <ul className="space-y-3">
            {faqs.map((f, i) => (
              <li key={f.q} className="rounded-[10px] border border-border-grey bg-grey-light">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] font-semibold text-navy"
                >
                  <span className="min-w-0 flex-1">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-body-soft transition-transform ${open === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {open === i && (
                  <p className="px-4 pb-4 text-[15px] leading-relaxed text-body">{f.a}</p>
                )}
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-5">
          <Panel title="Jump to a tool">
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-3 rounded-[10px] border border-border-grey bg-white px-3.5 py-3 text-[15px] font-semibold text-navy transition-colors hover:bg-blue-tint"
                  >
                    <l.icon className="h-[18px] w-[18px] shrink-0 text-brand-blue" aria-hidden="true" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Contact us">
            <p className="text-[15px] leading-relaxed text-body">
              Still stuck? Email the WorkEazy team and we usually respond within one business day.
            </p>
            <a
              href="mailto:support@workeazy.app"
              className="mt-4 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              support@workeazy.app
            </a>
          </Panel>
        </div>
      </div>
    </div>
  );
}
