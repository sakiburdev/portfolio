import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsList from "@/components/projects/ProjectsList";
import { PROJECTS } from "@/lib/data";

export const metadata = {
  title: "Projects | Sakibur Rahman",
  description:
    "Projects built by Sakibur Rahman — BazarDor, FitLog and DevStack, with descriptions, screenshots, technologies and links.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-zinc-400 dark:hover:text-amber-400"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </Link>

      <div className="mt-8">
        <SectionHeading
          title="Projects"
          subtitle="Everything I have built so far, in detail — screenshots, the stack behind each app, challenges faced, and what comes next. Click any screenshot to open the gallery."
          center
        />
      </div>

      {/* items-start keeps each card at its own content height in this
          single-column view. */}
      <ProjectsList className="grid items-start gap-10" />
    </div>
  );
}
