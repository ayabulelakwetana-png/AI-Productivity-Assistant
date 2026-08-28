// Small localStorage helpers scoped to the current WorkEazy profile so each
// person using this device keeps their own tasks and assistant history.

export function currentUserKey(): string {
  if (typeof window === "undefined") return "guest";
  try {
    const raw = localStorage.getItem("workeazy-prefs");
    const name = raw ? (JSON.parse(raw) as { name?: string }).name : undefined;
    const slug = (name ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return slug || "guest";
  } catch {
    return "guest";
  }
}

export function loadScoped<T>(namespace: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`workeazy:${namespace}:${currentUserKey()}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export function saveScoped(namespace: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`workeazy:${namespace}:${currentUserKey()}`, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — keep working in memory */
  }
}

export function clearScoped(namespace: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`workeazy:${namespace}:${currentUserKey()}`);
  } catch {
    /* ignore */
  }
}
