import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Plus, Trash2 } from "lucide-react";

import { PageHeader, Panel } from "@/components/PageHeader";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkEazy" },
      {
        name: "description",
        content: "Prioritize your day using urgency and importance with the WorkEazy task planner.",
      },
      { property: "og:title", content: "AI Task Planner — WorkEazy" },
      {
        property: "og:description",
        content: "Prioritize your day using urgency and importance with the WorkEazy task planner.",
      },
    ],
  }),
  component: TaskPlanner,
});

type Task = { id: number; title: string; urgent: boolean; important: boolean };

const quadrants = [
  { key: "do", label: "Do now", hint: "Urgent + Important", accent: "bg-brand-blue" },
  { key: "schedule", label: "Schedule", hint: "Important, not urgent", accent: "bg-navy" },
  { key: "delegate", label: "Delegate", hint: "Urgent, not important", accent: "bg-gold" },
  { key: "later", label: "Later", hint: "Neither", accent: "bg-body-soft" },
] as const;

function bucket(task: Task) {
  if (task.urgent && task.important) return "do";
  if (task.important) return "schedule";
  if (task.urgent) return "delegate";
  return "later";
}

function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Send client proposal", urgent: true, important: true },
    { id: 2, title: "Plan Q3 roadmap", urgent: false, important: true },
    { id: 3, title: "Reply to vendor invoice email", urgent: true, important: false },
  ]);
  const [title, setTitle] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [important, setImportant] = useState(true);

  const add = () => {
    if (!title.trim()) return;
    setTasks((t) => [...t, { id: Date.now(), title: title.trim(), urgent, important }]);
    setTitle("");
  };

  return (
    <div>
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="Capture what's on your plate and WorkEazy sorts it by urgency and importance so you always know what to do next."
      />

      <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <Panel title="Add a task">
          <label htmlFor="task" className="mb-1.5 block text-[14px] font-semibold text-navy">
            Task
          </label>
          <input
            id="task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Prepare board update"
            className="w-full rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none"
          />
          <div className="mt-4 space-y-2.5">
            {[
              { label: "Urgent", value: urgent, set: setUrgent },
              { label: "Important", value: important, set: setImportant },
            ].map((f) => (
              <label
                key={f.label}
                className="flex items-center gap-3 text-[15px] font-medium text-navy"
              >
                <input
                  type="checkbox"
                  checked={f.value}
                  onChange={(e) => f.set(e.target.checked)}
                  className="h-4 w-4 accent-[#1769FF]"
                />
                {f.label}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={add}
            className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add task
          </button>
        </Panel>

        <div className="grid gap-5 sm:grid-cols-2">
          {quadrants.map((q) => {
            const items = tasks.filter((t) => bucket(t) === q.key);
            return (
              <section
                key={q.key}
                className="rounded-2xl border border-border-grey bg-white p-5 shadow-card"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${q.accent}`} aria-hidden="true" />
                  <h2 className="text-[17px] font-bold text-navy">{q.label}</h2>
                </div>
                <p className="mt-0.5 text-[13px] font-medium text-body-soft">{q.hint}</p>
                <ul className="mt-4 space-y-2">
                  {items.length === 0 && (
                    <li className="text-[15px] text-body-soft">Nothing here yet.</li>
                  )}
                  {items.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="min-w-0 flex-1 text-[15px] text-navy">{t.title}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${t.title}`}
                          onClick={() => setTasks((all) => all.filter((x) => x.id !== t.id))}
                          className="shrink-0 rounded-md p-1 text-body-soft hover:bg-white hover:text-navy"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3">
                        {(
                          [
                            { key: "urgent", label: "Urgent" },
                            { key: "important", label: "Important" },
                          ] as const
                        ).map((f) => (
                          <label
                            key={f.key}
                            className="flex items-center gap-2 text-[13px] font-semibold text-body-soft"
                          >
                            <input
                              type="checkbox"
                              checked={t[f.key]}
                              onChange={(e) =>
                                setTasks((all) =>
                                  all.map((x) =>
                                    x.id === t.id ? { ...x, [f.key]: e.target.checked } : x,
                                  ),
                                )
                              }
                              className="h-3.5 w-3.5 accent-[#1769FF]"
                            />
                            {f.label}
                          </label>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>

              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
