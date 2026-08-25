import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "WorkEazy AI Assistant" },
      {
        name: "description",
        content: "Ask WorkEazy for help with emails, meetings, planning and any workplace task.",
      },
      { property: "og:title", content: "WorkEazy AI Assistant" },
      {
        property: "og:description",
        content: "Ask WorkEazy for help with emails, meetings, planning and any workplace task.",
      },
    ],
  }),
  component: Assistant,
});

type Message = { id: number; role: "user" | "assistant"; text: string };

const suggestions = [
  "Draft a follow-up email to a client",
  "Summarize my meeting notes",
  "Help me prioritize today",
  "Outline a research brief",
];

function reply(input: string) {
  const t = input.toLowerCase();
  if (t.includes("email"))
    return "Head to the Smart Email Generator, add your key points and pick a tone — I'll produce an editable draft you can send in seconds.";
  if (t.includes("meeting") || t.includes("notes"))
    return "Paste your notes into the Meeting Notes Summarizer and I'll split them into highlights, decisions and action items.";
  if (t.includes("task") || t.includes("priorit") || t.includes("today"))
    return "Open the AI Task Planner, add your tasks and flag urgency and importance — I'll sort them into Do now, Schedule, Delegate and Later.";
  if (t.includes("research"))
    return "The AI Research Assistant turns any topic into a five-step research plan covering scope, sources, key facts, risks and a recommendation.";
  return "I can help with emails, meeting summaries, task prioritisation and research. Tell me what you're working on and I'll point you to the fastest route.";
}

function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi, I'm your WorkEazy assistant. What would you like to get done today?",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [
      ...m,
      { id: Date.now(), role: "user", text: value },
      { id: Date.now() + 1, role: "assistant", text: reply(value) },
    ]);
    setInput("");
  };

  return (
    <div>
      <PageHeader
        icon={MessageSquare}
        title="WorkEazy AI Assistant"
        description="Ask WorkEazy to help with any workplace task. Responses are guidance only — always review before acting."
      />

      <section className="flex h-[560px] flex-col rounded-2xl border border-border-grey bg-white shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <p
                className={
                  m.role === "user"
                    ? "max-w-[75%] rounded-2xl rounded-br-sm bg-brand-blue px-4 py-3 text-[15px] leading-relaxed text-white"
                    : "max-w-[75%] rounded-2xl rounded-bl-sm border border-border-grey bg-blue-tint px-4 py-3 text-[15px] leading-relaxed text-navy"
                }
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-border-grey p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border-grey bg-white px-3.5 py-1.5 text-[14px] font-semibold text-navy transition-colors hover:bg-blue-tint"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <label htmlFor="chat" className="sr-only">
              Message WorkEazy
            </label>
            <input
              id="chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask WorkEazy anything about your work…"
              className="min-w-0 flex-1 rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => send(input)}
              className="inline-flex h-[50px] shrink-0 items-center gap-2 rounded-[10px] bg-brand-blue px-5 text-[15px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
