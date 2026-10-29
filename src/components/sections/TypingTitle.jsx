"use client";

import { useEffect, useRef, useState } from "react";
import cn from "@/lib/utils";

export default function TypingTitle({ titles, className }) {
  const items = (Array.isArray(titles) ? titles : [titles]).filter(Boolean);
  const [display, setDisplay] = useState(items[0] ?? "");
  const stateRef = useRef({ text: items[0] ?? "", index: 0, deleting: false });

  useEffect(() => {
    if (!items.length || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timerId;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const state = stateRef.current;
      const full = items[state.index] ?? items[0];

      if (!state.deleting) {
        const nextText = full.slice(0, state.text.length + 1);
        state.text = nextText;
        const complete = full.length > 0 && nextText.length === full.length;
        if (complete) state.deleting = true;
        setDisplay(nextText);
        timerId = setTimeout(tick, complete ? 1600 : 90);
      } else {
        const nextText = full.slice(0, Math.max(0, state.text.length - 1));
        state.text = nextText;
        setDisplay(nextText);
        if (nextText.length === 0) {
          state.deleting = false;
          state.index = (state.index + 1) % items.length;
          timerId = setTimeout(tick, 350);
        } else {
          timerId = setTimeout(tick, 45);
        }
      }
    };

    timerId = setTimeout(tick, 1600);
    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [items]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span aria-hidden="true">{display}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse rounded-full bg-current align-middle"
      />
      <span className="sr-only">{items.join(", ")}</span>
    </span>
  );
}
