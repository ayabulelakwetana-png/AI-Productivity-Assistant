import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Bell,
  ChevronRight,
  ChevronDown,
  FileText,
  Info,
  LayoutGrid,
  LifeBuoy,
  Mail,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Sun,
  ListChecks,
  X,
} from "lucide-react";

import logo from "@/assets/workeazy-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Summarizer", icon: FileText },
  { to: "/tasks", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: Search },
  { to: "/assistant", label: "AI Assistant", icon: MessageSquare },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col bg-navy-deep">
      <div className="px-7 pt-7 pb-5 text-center">
        <img
          src={logo}
          alt="WorkEazy logo"
          width={160}
          height={160}
          className="mx-auto h-16 w-auto"
        />
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-nav-label">
          Work Smart. Live Eazy.
        </p>
      </div>

      <nav aria-label="Workspace" className="flex-1 overflow-y-auto px-5 pb-4">
        <p className="px-2 pb-3 text-[13px] font-semibold uppercase tracking-[1.5px] text-nav-label">
          Workspace
        </p>
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "flex h-12 items-center gap-3 rounded-xl px-3.5 text-[15px] font-semibold transition-colors",
                    active
                      ? "bg-brand-blue text-white shadow-glow"
                      : "text-white/80 hover:bg-[rgb(23_105_255_/_0.20)] hover:text-white",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-5 pb-5">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span className="text-[15px] font-bold text-white">WorkEazy</span>
          </div>
          <p className="mt-1 text-[13px] text-nav-label">Work Smart. Live Eazy.</p>
        </div>

        <ul className="mt-4 space-y-1">
          {[
            { label: "Settings", icon: Settings },
            { label: "Help &amp; Support", icon: LifeBuoy },
          ].map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="flex h-11 w-full items-center gap-3 rounded-xl px-3.5 text-[15px] font-medium text-white/75 transition-colors hover:bg-[rgb(23_105_255_/_0.20)] hover:text-white"
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-4 grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue text-[13px] font-bold text-white">
            WS
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold text-white">
              WorkEazy User
            </span>
            <span className="block truncate text-[12px] text-nav-label">Premium Plan</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-nav-label" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-workspace">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[274px] lg:block">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-navy-deep/60"
          />
          <div className="absolute inset-y-0 left-0 w-[274px] max-w-[85vw]">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-white/80 hover:bg-white/10"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-[274px]">
        <header className="sticky top-0 z-30 border-b border-[#E5EAF2] bg-white">
          <div className="mx-auto flex h-[88px] max-w-[1250px] items-center gap-4 px-5 sm:px-7">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="shrink-0 rounded-lg p-2 text-navy transition-colors hover:bg-grey-light"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="hidden min-w-0 items-center gap-2 rounded-full border border-[#D7E6FA] bg-blue-tint px-4 py-2 md:flex">
              <Info className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
              <p className="truncate text-[14px] font-medium text-navy">
                AI-generated content may require human review.
              </p>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Toggle theme"
                className="rounded-lg p-2 text-navy transition-colors hover:bg-grey-light"
              >
                <Sun className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Notifications: 3 unread"
                className="relative rounded-lg p-2 text-navy transition-colors hover:bg-grey-light"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-blue px-1 text-[11px] font-bold text-white">
                  3
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-grey-light"
                aria-label="Account menu for WorkEazy User"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-[13px] font-bold text-white">
                  WS
                </span>
                <ChevronDown className="h-4 w-4 text-body-soft" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1250px] px-5 py-7 sm:px-7 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
