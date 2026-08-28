export type Task = { id: string; title: string; urgent: boolean; important: boolean };

export type Quadrant = "do" | "schedule" | "delegate" | "later";

export const QUADRANTS: Quadrant[] = ["do", "schedule", "delegate", "later"];

/** Every task lands in exactly one quadrant — no task can ever be lost. */
export function bucket(task: Pick<Task, "urgent" | "important">): Quadrant {
  if (task.urgent && task.important) return "do";
  if (!task.urgent && task.important) return "schedule";
  if (task.urgent && !task.important) return "delegate";
  return "later";
}

let counter = 0;
export function newTaskId(): string {
  counter += 1;
  return `t-${Date.now().toString(36)}-${counter.toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/**
 * Guarantees the invariants the planner depends on:
 * - every entry is a well-formed task with a non-empty title
 * - flags are strict booleans (so bucketing is deterministic)
 * - ids are unique (duplicates are re-issued, never dropped)
 */
export function normalizeTasks(input: unknown): Task[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const out: Task[] = [];

  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const t = raw as Partial<Task>;
    const title = typeof t.title === "string" ? t.title.trim() : "";
    if (!title) continue;

    let id = typeof t.id === "string" && t.id.trim() ? t.id.trim() : newTaskId();
    if (seen.has(id)) id = newTaskId();
    seen.add(id);

    out.push({ id, title, urgent: t.urgent === true, important: t.important === true });
  }

  return out;
}

/** Toggle a flag safely — rapid repeated calls stay consistent because the
 * update is derived from the passed-in list, never from stale component state. */
export function setTaskFlag(
  tasks: Task[],
  id: string,
  field: "urgent" | "important",
  value: boolean,
): Task[] {
  let changed = false;
  const next = tasks.map((t) => {
    if (t.id !== id || t[field] === value) return t;
    changed = true;
    return { ...t, [field]: value };
  });
  return changed ? next : tasks;
}

export function addTask(tasks: Task[], title: string, urgent: boolean, important: boolean): Task[] {
  const clean = title.trim();
  if (!clean) return tasks;
  return [...tasks, { id: newTaskId(), title: clean, urgent: !!urgent, important: !!important }];
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id);
}

/** Groups tasks into all four quadrants — empty columns are always present. */
export function groupTasks(tasks: Task[]): Record<Quadrant, Task[]> {
  const groups: Record<Quadrant, Task[]> = { do: [], schedule: [], delegate: [], later: [] };
  for (const t of tasks) groups[bucket(t)].push(t);
  return groups;
}
