import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsList from "@/components/projects/ProjectsList";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A selection of things I have designed and built — each one solving a real problem. Click a screenshot to open the gallery."
        />

        {/* items-start: every card is sized to its own content, so expanding
            "View details" grows only the selected card — neighbors do NOT
            stretch to match it. Three cards side by side from xl (>=1280px),
            two on md, one on mobile. */}
        <ProjectsList className="grid items-start gap-8 md:grid-cols-2 xl:grid-cols-3" />

        {PROJECTS.length ? (
          <div className="mt-12 text-center">
            <Button href="/projects" variant="secondary">
              Browse all projects
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
