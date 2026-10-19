import { useEffect, useRef, useState, type ReactNode } from "react";
import { starField } from "@/lib/pip-logic";
import { useSite } from "@/lib/site-state";

export function StarGlyph({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 1.5l2.6 7.1 7.4.3-5.8 4.6 2 7.2L12 16.6 5.8 20.7l2-7.2L2 8.9l7.4-.3z" fill="currentColor" />
    </svg>
  );
}

export function Sparkle({ className = "", size = 12 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.8 6.6 4.4 10.4 12 12-7.6 1.6-11.2 5.4-12 12-.8-6.6-4.4-10.4-12-12 7.6-1.6 11.2-5.4 12-12z" fill="currentColor" />
    </svg>
  );
}

const STARS = starField(46);
const CHAOS = starField(30, 99);

/** Decorative star sky used behind sections. */
export function Sky({ density = 1, className = "" }: { density?: number; className?: string }) {
  const { chaos } = useSite();
  const stars = STARS.slice(0, Math.round(STARS.length * density));
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className={`anim-twinkle absolute rounded-full ${s.gold ? "bg-gold" : "bg-lavender"}`}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, ["--delay" as string]: `${s.delay}s`, ["--dur" as string]: `${s.dur}s` }}
        />
      ))}
      {chaos &&
        CHAOS.map((s) => (
          <span key={`c${s.id}`} className="anim-float absolute" style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.delay}s` }}>
            <Sparkle size={6 + s.r * 5} className={s.gold ? "text-gold" : "text-primary"} />
          </span>
        ))}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{children}</p>;
}

/** Adds .is-in when scrolled into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setIn(true);
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setIn(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
