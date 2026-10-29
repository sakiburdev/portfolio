"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/data";

export default function ProjectsList({ className }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className={className}>
      {PROJECTS.map((project, index) => {
        const key = project?.id ?? project?.name ?? `project-${index}`;
        return (
          <ProjectCard
            key={key}
            project={project}
            expanded={expandedId === key}
            onToggleDetails={() => {
              // Toggle this project only: other cards keep their state.
              setExpandedId((current) => (current === key ? null : key));
            }}
          />
        );
      })}
    </div>
  );
}
