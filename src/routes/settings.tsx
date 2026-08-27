import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Check } from "lucide-react";

import { PageHeader, Panel } from "@/components/PageHeader";
import { getStoredTheme, setTheme, type Theme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WorkEazy" },
      {
        name: "description",
        content: "Manage your WorkEazy workspace preferences, appearance and default writing tone.",
      },
      { property: "og:title", content: "Settings — WorkEazy" },
      {
        property: "og:description",
        content: "Manage your WorkEazy workspace preferences, appearance and default writing tone.",
      },
    ],
  }),
  component: SettingsPage;
});

const inputClass =
  "w-full rounded-[10px] border border-border-grey bg-grey-light px-3.5 py-3 text-[15px] text-navy placeholder:text-body-soft/70 focus:border-brand-blue focus:bg-white focus:outline-none";

type Prefs = { name: string; company: string; tone: string; notify: boolean; autosave: boolean };

const defaults: Prefs = {
  name: "WorkEazy User",
  company: "",
  tone: "Professional",
  notify: true,
  autosave: true,
};

function SettingsPage() {
  const [prefs, setPrefs] = useState<Prefs>(defaults);
  const [theme, setThemeState] = useState<Theme>("light");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setThemeState(getStoredTheme());
    try {
      const raw = localStorage.getItem("workeazy-prefs");
      if (raw) setPrefs({ ...defaults, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const save = () => {
    localStorage.setItem("workeazy-prefs", JSON.stringify(prefs));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div>
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        description="Personalise your workspace. Preferences are saved on this device only."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Profile">
          <label htmlFor="name" className="mb-1.5 block text-[14px] font-semibold text-navy">
            Display name
          </label>
          <input
            id="name"
            value={prefs.name}
            onChange={(e) => setPrefs({ ...prefs, name: e.target.value })}
            className={inputClass}
          />

          <label
            htmlFor="company"
            className="mb-1.5 mt-4 block text-[14px] font-semibold text-navy"
          >
            Company
          </label>
          <input
            id="company"
            value={prefs.company}
            placeholder="WorkEazy (Pty) Ltd"
            onChange={(e) => setPrefs({ ...prefs, company: e.target.value })}
            className={inputClass}
          />

          <label htmlFor="tone" className="mb-1.5 mt-4 block text-[14px] font-semibold text-navy">
            Default email tone
          </label>
          <select
            id="tone"
            value={prefs.tone}
            onChange={(e) => setPrefs({ ...prefs, tone: e.target.value })}
            className={inputClass}
          >
            {["Professional", "Friendly", "Persuasive", "Direct", "Apologetic"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={save}
            className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand-blue text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
          >
            {saved ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
            {saved ? "Preferences saved" : "Save preferences"}
          </button>
        </Panel>

        <Panel title="Appearance & alerts">
          <p className="text-[14px] font-semibold text-navy">Theme</p>
          <div className="mt-2 flex gap-2">
            {(["light", "dark"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTheme(t);
                  setThemeState(t);
                }}
                className={
                  theme === t
                    ? "rounded-[10px] bg-brand-blue px-4 py-2.5 text-[15px] font-bold text-white"
                    : "rounded-[10px] border border-border-grey bg-white px-4 py-2.5 text-[15px] font-semibold text-navy hover:bg-blue-tint"
                }
              >
                {t === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                label: "In-app notifications",
                value: prefs.notify,
                set: (v: boolean) => setPrefs({ ...prefs, notify: v }),
              },
              {
                label: "Autosave drafts on this device",
                value: prefs.autosave,
                set: (v: boolean) => setPrefs({ ...prefs, autosave: v }),
              },
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

          <p className="mt-6 text-[14px] text-body-soft">
            WorkEazy tools run in your browser. Nothing you type is sent to a server.
          </p>
        </Panel>
      </div>
    </div>
  );
}
