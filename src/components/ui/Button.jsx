import Link from "next/link";
import cn from "@/lib/utils";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950";

const VARIANTS = {
  primary:
    "bg-zinc-900 text-white shadow-sm hover:bg-zinc-700 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400",
  secondary:
    "border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/60",
};

export default function Button({ href, variant = "primary", className, children, ...props }) {
  const classes = cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
