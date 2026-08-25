import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

import { PageHeader, Panel } from "@/components/PageHeader";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkEazy" },
      {
        name: "description",
        content: "Turn raw meeting notes into clear decisions, action items and follow-ups.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkEazy" },
      {
        property: "og:description",
        content: "Turn raw meeting notes into clear decisions, action items and follow-ups.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

const inputClass =
  "w-full rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none";

type Summary = { highlights: string[]; decisions: string[]; actions: string[] };

function MeetingSummarizer() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);

  const summarize = () => {
    const lines = notes
      .split(/\n|\. /)
      .map((l) => l.trim().replace(/\.$/, ""))
      .filter((l) => l.length > 2);

    const decisions = lines.filter((l) => /decide|agree|approv|sign.?off|confirm/i.test(l));
    const actions = lines.filter((l) => /will |need|todo|action|follow.?up|by |assign/i.test(l));
    const highlights = lines
      .filter((l) => !decisions.includes(l) && !actions.includes(l))
      .slice(0, 6);

    setSummary({
      highlights: highlights.length ? highlights : ["No general discussion points detected."],
      decisions: decisions.length ? decisions : ["No explicit decisions detected in these notes."],
      actions: actions.length ? actions : ["No action items detected in these notes."],
    });
  };

  return (
    <div>
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Paste your raw meeting notes and WorkEazy will organise them into highlights, decisions and action items you can edit."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Meeting notes">
          <label htmlFor="notes" className="sr-only">
            Meeting notes
          </label>
          <textarea
            id="notes"
            rows={16}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              "Team agreed to launch on 12 April\nSipho will prepare the budget by Friday\nDiscussed customer feedback from pilot"
            }
            className={inputClass}
          />
          <button
            type="button"
            onClick={summarize}
            className="mt-4 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Summarize notes
          </button>
        </Panel>

        <Panel title="Summary">
          {summary ? (
            <div className="space-y-6">
              {[
                { label: "Highlights", items: summary.highlights },
                { label: "Decisions", items: summary.decisions },
                { label: "Action items", items: summary.actions },
              ].map((block) => (
                <div key={block.label}>
                  <h3 className="text-[15px] font-bold uppercase tracking-wide text-body-soft">
                    {block.label}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {block.items.map((item, i) => (
                      <li
                        key={`${block.label}-${i}`}
                        className="rounded-[10px] border border-border-grey bg-blue-tint/60 px-3.5 py-2.5 text-[15px] text-navy"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[15px] text-body">
              Your structured summary will appear here once you summarize your notes.
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}
