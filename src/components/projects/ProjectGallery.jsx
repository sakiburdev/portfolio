"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import cn from "@/lib/utils";

const DIALOG_CLASSES =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8";

const CONTROL_CLASSES =
  "rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

export default function ProjectGallery({
  name,
  images = [],
  layout = "scattered",
  className,
}) {
  const items = (images ?? [])
    .filter(Boolean)
    .map((src, index) => ({ src, alt: `${name} screenshot ${index + 1}` }));
  const [active, setActive] = useState(null);
  const scattered = layout === "scattered";

  useEffect(() => {
    if (active === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight" && items.length > 1) {
        setActive((current) => (current + 1) % items.length);
      }
      if (event.key === "ArrowLeft" && items.length > 1) {
        setActive((current) => (current - 1 + items.length) % items.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, items.length]);

  if (!items.length) return null;

  return (
    <>
      <div
        className={cn(
          scattered
            ? "grid auto-rows-[88px] grid-cols-3 gap-2.5 sm:auto-rows-[112px] xl:auto-rows-[150px]"
            : "grid gap-3",
          className,
        )}
      >
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Open screenshot ${index + 1} of ${name}`}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm transition duration-300 hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-800 dark:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900",
              scattered && index === 0
                ? "col-span-2 row-span-2"
                : cn(
                    scattered && index % 2 === 1
                      ? "z-10 rotate-1 hover:z-20 hover:rotate-0"
                      : scattered && "z-0 -rotate-1 hover:z-20 hover:rotate-0",
                    !scattered && "aspect-[16/9]",
                  ),
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10"
            />
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className={DIALOG_CLASSES}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} screenshots`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setActive(null)}
            aria-label="Close image viewer"
            className={cn(CONTROL_CLASSES, "absolute right-4 top-4")}
          >
            <X size={20} aria-hidden="true" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() =>
                  setActive((active - 1 + items.length) % items.length)
                }
                className={cn(
                  CONTROL_CLASSES,
                  "absolute left-3 top-1/2 -translate-y-1/2 sm:left-6",
                )}
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => setActive((active + 1) % items.length)}
                className={cn(
                  CONTROL_CLASSES,
                  "absolute right-3 top-1/2 -translate-y-1/2 sm:right-6",
                )}
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          ) : null}

          <div className="relative h-[75vh] max-h-[900px] w-full max-w-5xl">
            <Image
              src={items[active].src}
              alt={items[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
            {active + 1} / {items.length}
          </p>
          <p className="sr-only">{items[active].alt}</p>
        </div>
      ) : null}
    </>
  );
}
