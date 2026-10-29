"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import cn from "@/lib/utils";
import { PERSONAL } from "@/lib/data";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const LINK_CLASSES =
  "rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500";

function linkState(pathname, href) {
  if (href.startsWith("/#")) return false; // section links never stay "active"
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (event, href) => {
    if (!href.startsWith("/#")) {
      setMenuOpen(false);
      return;
    }
    if (pathname === "/") {
      event.preventDefault();
      document.getElementById(href.slice(2))?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", href.replace("/", ""));
    }
    setMenuOpen(false);
  };

  const renderLinks = (block) =>
    NAV_LINKS.map((link) => {
      const active = linkState(pathname, link.href);
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={(event) => handleSectionClick(event, link.href)}
          aria-current={active ? "page" : undefined}
          className={cn(
            LINK_CLASSES,
            block && "block w-full px-4 py-2.5",
            active
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/70 dark:hover:text-white"
          )}
        >
          {link.label}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-lg font-semibold tracking-tight text-zinc-900 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-white"
        >
          {PERSONAL?.name ?? "Portfolio"}
          <span aria-hidden="true" className="text-amber-500">
            &nbsp;Rahman
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {renderLinks(false)}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-xl border border-zinc-300 p-2 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 md:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="border-t border-zinc-200/80 bg-white md:hidden dark:border-zinc-800/80 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
          {renderLinks(true)}
        </div>
      </nav>
    </header>
  );
}
