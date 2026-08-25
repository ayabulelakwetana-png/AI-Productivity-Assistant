import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  ListChecks,
  Zap,
} from "lucide-react";

import logo from "@/assets/workeazy-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkEazy Dashboard — Your AI Business Assistant" },
      {
        name: "description",
        content:
          "Automate emails, summarize meetings, plan your work and research smarter from one simple WorkEazy workspace.",
      },
      { property: "og:title", content: "WorkEazy Dashboard — Your AI Business Assistant" },
      {
        property: "og:description",
        content:
          "Automate emails, summarize meetings, plan your work and research smarter from one simple WorkEazy workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  {
    icon: Clock,
    value: "8.5h",
    label: "Hours saved per week",
    iconBg: "bg-blue-tint",
    iconColor: "text-brand-blue",
  },
  {
    icon: Zap,
    value: "12×",
    label: "Faster response time",
    iconBg: "bg-grey-light",
    iconColor: "text-navy",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Editable & private",
    iconBg: "bg-gold-light",
    iconColor: "text-gold",
  },
] as const;

const tools = [
  {
    icon: Mail,
    iconBg: "bg-blue-tint",
    iconColor: "text-brand-blue",
    title: "Smart Email Generator",
    description: "Draft polished emails in seconds with tone control.",
    action: "Open tool",
    to: "/email",
  },
  {
    icon: FileText,
    iconBg: "bg-grey-light",
    iconColor: "text-navy",
    title: "Meeting Notes Summarizer",
    description: "Turn meeting notes into decisions and action items.",
    action: "Open tool",
    to: "/meetings",
  },
  {
    icon: ListChecks,
    iconBg: "bg-gold-light",
    iconColor: "text-gold",
    title: "AI Task Planner",
    description: "Prioritize your day using urgency + importance.",
    action: "Open tool",
    to: "/tasks",
  },
  {
    icon: Search,
    iconBg: "bg-blue-tint",
    iconColor: "text-brand-blue",
    title: "AI Research Assistant",
    description: "Research topics faster and turn information into useful insights.",
    action: "Open tool",
    to: "/research",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-grey-light",
    iconColor: "text-navy",
    title: "WorkEazy AI Assistant",
    description: "Ask WorkEazy to help with any workplace task.",
    action: "Open assistant",
    to: "/assistant",
  },
] as const;

function Dashboard() {
  return (
    <div className="space-y-7">
      <section className="hero-surface relative overflow-hidden rounded-[20px] border border-[#D6E4F5] p-7 shadow-card sm:p-9 lg:min-h-[310px]">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D6E4F5] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy">
              <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
              Powered by AI
            </span>

            <h1 className="mt-5 text-[34px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[46px] lg:text-[50px]">
              Your <span className="text-brand-blue">AI</span> Business Assistant
            </h1>

            <p className="mt-4 max-w-[650px] text-[17px] leading-[1.6] text-body sm:text-[18px]">
              Automate emails, summarize meetings, plan your work, and research smarter — all from
              one beautifully simple workspace.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/email"
                className="inline-flex h-[52px] items-center gap-2 rounded-[10px] bg-brand-blue px-6 text-[16px] font-bold text-white transition-colors hover:bg-brand-blue-bright"
              >
                Start with Email
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/assistant"
                className="inline-flex h-[52px] items-center rounded-[10px] border border-[#C9D8EA] bg-white px-6 text-[16px] font-bold text-navy transition-colors hover:bg-blue-tint"
              >
                Open AI Assistant
              </Link>
            </div>
          </div>

          <img
            src={logo}
            alt=""
            width={320}
            height={320}
            className="mx-auto w-[180px] opacity-95 lg:w-[240px]"
          />
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="flex min-h-[120px] items-center gap-4 rounded-2xl border border-border-grey bg-white p-5 shadow-card"
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
            >
              <stat.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[26px] font-extrabold leading-none text-navy">{stat.value}</p>
              <p className="mt-1.5 text-[15px] font-medium text-body">{stat.label}</p>
              <span className="mt-2 inline-block rounded-md bg-grey-light px-2 py-0.5 text-[12px] font-semibold text-body-soft">
                Demo estimate
              </span>
            </div>
          </article>
        ))}
      </section>

      <section>
        <h2 className="text-[24px] font-bold text-navy">Productivity Tools</h2>
        <p className="mt-1 text-[16px] text-body-soft">Pick a tool to get started.</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              to={tool.to}
              className="group flex h-full flex-col rounded-2xl border border-border-grey bg-white p-[22px] shadow-card transition-all hover:-translate-y-1 hover:border-[#B9D2F7] hover:shadow-card-hover"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${tool.iconBg} ${tool.iconColor}`}
              >
                <tool.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[18px] font-bold text-navy">{tool.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{tool.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-blue">
                {tool.action}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
