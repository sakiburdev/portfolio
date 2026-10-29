"use client";

import { useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Layers,
  Lightbulb,
  Wrench,
} from "lucide-react";
import ProjectGallery from "./ProjectGallery";
import TechIcon from "./TechIcon";
import cn from "@/lib/utils";
import Link from "next/link";

function DetailList({ icon: Icon, title, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        <Icon size={14} aria-hidden="true" className="text-amber-500" />
        {title}
      </h4>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-300"
          >
            <span
              aria-hidden="true"
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectCard({
  project,
  className,
  expanded,
  onToggleDetails,
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  if (!project) return null;
  const {
    id,
    name,
    description,
    images = [],
    imageLayout,
    technologies = [],
    liveUrl,
    githubUrl,
    challenges = [],
    futurePlans = [],
    features = [],
  } = project;

  const controlled =
    typeof expanded === "boolean" && typeof onToggleDetails === "function";
  const detailsOpen = controlled ? expanded : internalOpen;
  const handleToggle = () => {
    if (controlled) onToggleDetails();
    else setInternalOpen((open) => !open);
  };

  const detailsId = id ? `details-${id}` : undefined;

  return (
    <article
      id={id ? `project-${id}` : undefined}
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60",
        className,
      )}
    >
      <div className="p-3 pb-0">
        <ProjectGallery
          name={name ?? "Project"}
          images={images}
          layout={imageLayout}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {name}
          </h3>
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>

        {technologies.length ? (
          <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
            {technologies.map((tech) =>
              tech?.name ? (
                <li
                  key={tech.name}
                  className="inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 transition hover:border-amber-500/50 dark:border-zinc-800 dark:bg-zinc-800/50"
                >
                  <TechIcon
                    name={tech.name}
                    icon={tech.icon}
                    tooltip
                    className="h-4 w-4 text-zinc-600 dark:text-zinc-300"
                  />
                </li>
              ) : null,
            )}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2.5">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
            >
              Live Demo
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
          {githubUrl ? (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
            >
              GitHub
              <TechIcon name="GitHub" icon="github" className="h-3.5 w-3.5" />
            </Link>
          ) : null}

          {challenges.length || futurePlans.length || features.length ? (
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={detailsOpen}
              aria-controls={detailsOpen ? detailsId : undefined}
              className="ml-auto inline-flex items-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold text-amber-600 transition hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
            >
              {detailsOpen ? "Hide details" : "View details"}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn(
                  "transition-transform duration-200",
                  detailsOpen && "rotate-180",
                )}
              />
            </button>
          ) : null}
        </div>

        <div
          aria-hidden={detailsOpen ? undefined : "true"}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            detailsOpen
              ? "opacity-100 [grid-template-rows:1fr]"
              : "opacity-0 [grid-template-rows:0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              id={detailsId}
              className={cn(
                "grid gap-4 border-t border-dashed border-zinc-200 pt-4 dark:border-zinc-800 sm:grid-cols-2 lg:grid-cols-1",
                detailsOpen ? "visible" : "invisible",
              )}
            >
              <DetailList icon={Layers} title="Features" items={features} />
              <DetailList icon={Wrench} title="Challenges" items={challenges} />
              <DetailList
                icon={Lightbulb}
                title="Future plans"
                items={futurePlans}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
