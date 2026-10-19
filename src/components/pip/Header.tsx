import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { useSite } from "@/lib/site-state";
import { StarGlyph } from "./shared";

const LINKS = [
  { href: "#about", label: "About Pip" },
  { href: "#inventions", label: "Inventions" },
  { href: "#story", label: "My Story" },
];

export function Header() {
  const { night, setNight, muted, setMuted, status, chime } = useSite();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);
  const ctl =
    "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-primary";

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 pt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="truncate" role="status" aria-live="polite">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary align-middle" />
          Observatory status: <span className="text-primary">{status}</span>
        </span>
        <span className="hidden shrink-0 sm:inline">est. after naptime</span>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 md:flex md:justify-between">
        <a href="#top" className="flex min-h-11 min-w-0 items-center gap-2 font-play text-lg font-semibold">
          <StarGlyph className="shrink-0 text-primary" size={18} />
          <span className="truncate">Pip’s Dream Observatory</span>
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm hover:bg-secondary hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            className={ctl}
            aria-pressed={night}
            aria-label={night ? "Switch to day nursery mode" : "Switch to night dream mode"}
            onClick={() => {
              setNight(!night);
              chime();
            }}
          >
            {night ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:inline">{night ? "Day" : "Night"}</span>
          </button>
          <button
            type="button"
            className={`${ctl} ${muted ? "" : "border-primary text-primary"}`}
            aria-pressed={!muted}
            aria-label={muted ? "Sound is off. Turn sound on" : "Sound is on. Mute all sounds"}
            onClick={() => {
              setMuted(!muted);
            }}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="text-xs">{muted ? "Muted" : "Sound"}</span>
          </button>
          <button
            type="button"
            className={`${ctl} md:hidden`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-4 pb-4 md:hidden">
          <ul className="grid gap-1 pt-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-play text-lg hover:bg-secondary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
