import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel } from "@/components/PageHeader";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkEazy" },
      {
        name: "description",
        content: "Draft polished, professional emails in seconds with tone control in WorkEazy.",
      },
      { property: "og:title", content: "Smart Email Generator — WorkEazy" },
      {
        property: "og:description",
        content: "Draft polished, professional emails in seconds with tone control in WorkEazy.",
      },
    ],
  }),
  component: EmailGenerator,
});

const tones = ["Professional", "Friendly", "Concise", "Persuasive", "Apologetic"] as const;

const inputClass =
  "w-full rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none";

function EmailGenerator() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState<string>("Professional");
  const [draft, setDraft] = useState("");

  const generate = () => {
    const name = recipient.trim() || "there";
    const body = points
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const openings: Record<string, string> = {
      Professional: `Dear ${name},\n\nI hope this message finds you well.`,
      Friendly: `Hi ${name},\n\nHope you're having a great week!`,
      Concise: `Hi ${name},`,
      Persuasive: `Hi ${name},\n\nI wanted to share something I think will make a real difference for you.`,
      Apologetic: `Dear ${name},\n\nThank you for your patience — I want to address this directly.`,
    };

    const closings: Record<string, string> = {
      Professional: "Kind regards,\nWorkEazy User",
      Friendly: "Thanks so much,\nWorkEazy User",
      Concise: "Thanks,\nWorkEazy User",
      Persuasive: "Looking forward to your thoughts,\nWorkEazy User",
      Apologetic: "With appreciation,\nWorkEazy User",
    };

    const middle = body.length
      ? body.map((line) => `• ${line}`).join("\n")
      : "• Add a few key points on the left and regenerate this draft.";

    setDraft(
      `Subject: ${subject.trim() || "Quick update"}\n\n${openings[tone]}\n\n${middle}\n\nPlease let me know if you'd like me to expand on any of the above.\n\n${closings[tone]}`,
    );
  };

  return (
    <div>
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Draft polished emails in seconds with tone control. Every draft is fully editable before you send it."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Email details">
          <div className="space-y-4">
            <div>
              <label htmlFor="recipient" className="mb-1.5 block text-[14px] font-semibold text-navy">
                Recipient name
              </label>
              <input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Thandi Mokoena"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-[14px] font-semibold text-navy">
                Subject
              </label>
              <input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project timeline update"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="points" className="mb-1.5 block text-[14px] font-semibold text-navy">
                Key points (one per line)
              </label>
              <textarea
                id="points"
                rows={6}
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder={"Delivery moved to 14 March\nBudget approved\nNeed sign-off by Friday"}
                className={inputClass}
              />
            </div>
            <fieldset>
              <legend className="mb-2 text-[14px] font-semibold text-navy">Tone</legend>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    aria-pressed={tone === t}
                    className={
                      tone === t
                        ? "rounded-full bg-brand-blue px-4 py-2 text-[14px] font-semibold text-white"
                        : "rounded-full border border-border-grey bg-white px-4 py-2 text-[14px] font-semibold text-navy hover:bg-blue-tint"
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              onClick={generate}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Generate draft
            </button>
          </div>
        </Panel>

        <Panel title="Draft">
          <textarea
            aria-label="Generated email draft"
            rows={18}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Your generated email will appear here, ready to edit."
            className={inputClass}
          />
          <button
            type="button"
            disabled={!draft}
            onClick={() => {
              navigator.clipboard.writeText(draft);
              toast.success("Draft copied to clipboard");
            }}
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-[10px] border border-[#C9D8EA] bg-white px-5 text-[15px] font-bold text-navy transition-colors hover:bg-blue-tint disabled:opacity-50"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            Copy draft
          </button>
        </Panel>
      </div>
    </div>
  );
}
