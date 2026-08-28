import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
});

const SYSTEM_PROMPT =
  "You are WorkEazy, a concise and professional AI business assistant. Help with emails, meeting summaries, task prioritisation, research and general workplace productivity. Keep answers practical and under 180 words unless more detail is requested. When relevant, point users to the WorkEazy tools: Smart Email Generator, Meeting Notes Summarizer, AI Task Planner and AI Research Assistant.";

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { ok: false as const, error: "The assistant is not configured yet." };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) {
        return { ok: false as const, error: "Too many requests right now — please try again in a moment." };
      }
      if (res.status === 402) {
        return {
          ok: false as const,
          error: "AI credits are exhausted. Add credits in Lovable to keep using the assistant.",
        };
      }
      console.error("Assistant gateway error", res.status, body);
      return { ok: false as const, error: "The assistant could not respond just now." };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) return { ok: false as const, error: "The assistant returned an empty response." };
    return { ok: true as const, text };
  });
