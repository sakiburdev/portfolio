import cn from "@/lib/utils";

export default function SectionHeading({ title, subtitle, center = false }) {
  return (
    <div className={cn("mb-10 md:mb-12", center && "text-center")}>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <div className={cn("mt-3 flex items-center gap-1.5", center && "justify-center")}>
        <span aria-hidden="true" className="h-1 w-10 rounded-full bg-amber-500" />
        <span aria-hidden="true" className="h-1 w-4 rounded-full bg-amber-500/60" />
        <span aria-hidden="true" className="h-1 w-2 rounded-full bg-amber-500/30" />
      </div>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
