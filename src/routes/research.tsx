import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

import { PageHeader, Panel } from "@/components/PageHeader";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkEazy" },
      {
        name: "description",
        content: "Research topics faster and turn information into useful, structured insights.",
      },
      { property: "og:title", content: "AI Research Assistant — WorkEazy" },
      {
        property: "og:description",
        content: "Research topics faster and turn information into useful, structured insights.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [brief, setBrief] = useState<string[] | null>(null);

  const build = () => {
    const t = topic.trim();
    if (!t) return;
    setBrief([
      `Define the scope: what exactly do you need to know about ${t}, and for which decision?`,
      `Gather 3–5 credible sources on ${t} — industry reports, primary data and recent news.`,
      `Note the key numbers, dates and named players connected to ${t}.`,
      `Identify counter-arguments or risks that could change your conclusion about ${t}.`,
      `Write a one-paragraph summary of ${t} plus the single recommended next action.`,
    ]);
  };

  return (
    <div>
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Research topics faster and turn information into useful insights. WorkEazy builds a structured research plan you can work through and edit."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Research topic">
          <label htmlFor="topic" className="mb-1.5 block text-[14px] font-semibold text-navy">
            What are you researching?
          </label>
          <input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && build()}
            placeholder="Fintech adoption among SMEs in South Africa"
            className="w-full rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none"
          />
          <button
            type="button"
            onClick={build}
            className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Build research plan
          </button>
          <p className="mt-4 text-[14px] text-body-soft">
            This planner structures your research. It does not browse the web, so verify facts
            against your own sources.
          </p>
        </Panel>

        <Panel title="Research plan">
          {brief ? (
            <ol className="space-y-3">
              {brief.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-[10px] border border-border-grey bg-blue-tint/60 px-3.5 py-3"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-blue text-[12px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-relaxed text-navy">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[15px] text-body">
              Enter a topic to generate a step-by-step research plan.
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}
