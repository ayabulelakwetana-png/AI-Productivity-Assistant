import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MessageSquare, Send } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { askAssistant } from "@/lib/assistant.functions";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

function Assistant() {
  const ask = useServerFn(askAssistant);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi, I'm your WorkEazy assistant. What would you like to get done today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || loading) return;

    const history = [...messages, { id: Date.now(), role: "user" as const, text: value }];
    setMessages(history);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const result = await ask({
        data: {
          messages: history
            .filter((m) => m.id !== 0)
            .slice(-16)
            .map((m) => ({ role: m.role, content: m.text })),
        },
      });
      if (result.ok) {
        setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: result.text }]);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong reaching the assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        icon={MessageSquare}
        title="WorkEazy AI Assistant"
        description="Ask WorkEazy to help with any workplace task. Responses are guidance only — always review before acting."
      />

      <section className="flex h-[560px] flex-col rounded-2xl border border-border-grey bg-white shadow-card">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <p
                className={
                  m.role === "user"
                    ? "max-w-[75%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-brand-blue px-4 py-3 text-[15px] leading-relaxed text-white"
                    : "max-w-[75%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-border-grey bg-blue-tint px-4 py-3 text-[15px] leading-relaxed text-navy"
                }
              >
                {m.text}
              </p>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <p className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border-grey bg-blue-tint px-4 py-3 text-[15px] text-navy">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Thinking…
              </p>
            </div>
          )}
          {error && (
            <p role="alert" className="text-[14px] font-semibold text-gold">
              {error}
            </p>
          )}
        </div>

        <div className="border-t border-border-grey p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={loading}
                onClick={() => void send(s)}
                className="rounded-full border border-border-grey bg-white px-3.5 py-1.5 text-[14px] font-semibold text-navy transition-colors hover:bg-blue-tint disabled:opacity-50"
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
              onKeyDown={(e) => e.key === "Enter" && void send(input)}
              placeholder="Ask WorkEazy anything about your work…"
              className="min-w-0 flex-1 rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => void send(input)}
              disabled={loading || !input.trim()}
              className="inline-flex h-[50px] shrink-0 items-center gap-2 rounded-[10px] bg-brand-blue px-5 text-[15px] font-bold text-white transition-colors hover:bg-brand-blue-bright disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
