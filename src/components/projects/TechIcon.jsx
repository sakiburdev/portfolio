import {
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  Navigation,
  Plug,
  Shapes,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TECH_ICONS } from "./icons";
import cn from "@/lib/utils";

const FALLBACK_RULES = [
  { pattern: /auth|security|ssl/i, Icon: ShieldCheck },
  { pattern: /api|fetch/i, Icon: Plug },
  { pattern: /json|data|database/i, Icon: Database },
  { pattern: /router|navigation/i, Icon: Navigation },
  { pattern: /icon/i, Icon: Shapes },
  { pattern: /test/i, Icon: FlaskConical },
  { pattern: /git/i, Icon: GitBranch },
  { pattern: /ai\b/i, Icon: Sparkles },
];

export default function TechIcon({ name, icon, tooltip = false, className }) {
  const entry = icon ? TECH_ICONS[icon] : undefined;
  const svgPath = entry?.d;
  const sizeClass = className ?? "h-4 w-4";

  let visual;
  if (svgPath) {
    visual = (
      <svg viewBox="0 0 24 24" fill="currentColor" className={sizeClass} aria-hidden="true">
        <path d={svgPath} />
      </svg>
    );
  } else {
    const Fallback = FALLBACK_RULES.find((rule) => rule.pattern.test(name))?.Icon ?? Code2;
    visual = <Fallback className={sizeClass} aria-hidden="true" />;
  }

  if (!tooltip) {
    return <span className="inline-flex shrink-0">{visual}</span>;
  }

  return (
    <span
      className="group/tech relative inline-flex shrink-0 cursor-help rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      tabIndex={0}
      role="img"
      aria-label={name}
    >
      {visual}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 opacity-0 shadow-md transition-opacity duration-150 group-hover/tech:opacity-100 group-focus/tech:opacity-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      >
        {name}
      </span>
    </span>
  );
}
