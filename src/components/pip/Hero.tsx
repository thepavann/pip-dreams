import { useRef, useState } from "react";
import { FallingStar } from "./FallingStar";
import { sleepyLine } from "@/lib/pip-logic";
import pipCloud from "@/assets/pip_avatar_cloud.png";
import { useFinePointer, usePrefersReducedMotion, useSite } from "@/lib/site-state";
import { Sky, Sparkle, StarGlyph } from "./shared";

export function Hero() {
  const { chaos, setChaos, effects, setEffects, setStatus, chime, stamp } = useSite();
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const art = useRef<HTMLDivElement>(null);
  const [waking, setWaking] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [line, setLine] = useState(0);
  const tuck = () => {
    if (!tucked) {
      setLine((n) => n + 1);
      setStatus("PIP IS TUCKED IN… SHHH");
    } else setStatus("DREAMING…");
    setTucked(!tucked);
    chime(true);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!fine || reduced || e.pointerType !== "mouse" || !art.current) return;
    const r = art.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    art.current.style.setProperty("--tx", String(Math.max(-1, Math.min(1, x))));
    art.current.style.setProperty("--ty", String(Math.max(-1, Math.min(1, y))));
  };
  const reset = () => {
    art.current?.style.setProperty("--tx", "0");
    art.current?.style.setProperty("--ty", "0");
  };
  const wake = () => {
    setWaking(false);
    requestAnimationFrame(() => setWaking(true));
    chime(true);
    stamp("wake");
  };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden" onPointerMove={onMove} onPointerLeave={reset}>
      <FallingStar />
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-sky/0 via-blush/40 to-background dark:via-sky/60" aria-hidden="true" />
      <Sky density={0.8} />
      <svg aria-hidden="true" className="pointer-events-none absolute -right-24 top-6 h-[520px] w-[520px] text-primary/40 md:right-0" viewBox="0 0 400 400">
        <ellipse cx="200" cy="200" rx="190" ry="120" fill="none" stroke="currentColor" className="dotted-orbit" />
        <ellipse cx="200" cy="200" rx="150" ry="190" fill="none" stroke="currentColor" className="dotted-orbit" transform="rotate(30 200 200)" />
        <path d="M330 60a34 34 0 1 0 22 58 28 28 0 1 1-22-58z" fill="var(--gold)" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-16">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Midnight Nursery · Est. after naptime</p>
          <h1 id="hero-title" className="mt-5 font-display text-[clamp(2.2rem,9vw,5.2rem)] font-medium leading-[1.02] tracking-tight">
            I build the dreams
            <br />
            you fall asleep <em className="chaos-accent font-light italic text-primary">inside.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Hi, I’m Pip — a very small Junior Dream Engineer. Every night I tinker with fallen stars, warm lanterns and music boxes so that
            nobody, not even the tiniest creature, goes to sleep without a dream.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#inventions" onClick={() => chime()} className="rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5">
              Explore my little universe
            </a>
            <a href="#about" onClick={() => chime()} className="rounded-full border border-foreground/30 px-6 py-3.5 font-medium transition hover:border-primary hover:text-primary">
              Meet the dream engineer
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-muted-foreground">Dream controls:</span>
            <button
              type="button"
              aria-pressed={chaos}
              onClick={() => {
                setChaos(!chaos);
                setStatus(!chaos ? "WHEEE… A LITTLE CHAOS" : "DREAMING…");
                chime(true);
              }}
              className={`min-h-11 rounded-full border px-3.5 py-2 transition ${chaos ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}
            >
              A little chaos {chaos ? "· on" : ""}
            </button>
            <button
              type="button"
              aria-pressed={effects}
              onClick={() => setEffects(!effects)}
              className={`min-h-11 rounded-full border px-3.5 py-2 transition ${effects ? "border-border bg-card" : "border-dashed border-border"} hover:border-primary`}
            >
              Sparkle trail {effects ? "on" : "off"}
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="anim-float">
            <div
              ref={art}
              className="relative transition-transform duration-300 ease-out"
              style={{ transform: "perspective(800px) rotateY(calc(var(--tx,0) * 6deg)) rotateX(calc(var(--ty,0) * -5deg))" }}
            >
              <button
                type="button"
                onClick={wake}
                onAnimationEnd={() => setWaking(false)}
                aria-label="Tap Pip to wake them up a little"
                className={`block w-full overflow-hidden rounded-[46%_54%_42%_58%/52%_44%_56%_48%] border-4 border-card bg-card shadow-[var(--shadow-soft)] ${waking ? "anim-wake" : ""}`}
              >
                <img src={pipCloud} width={896} height={1090} alt="Pip the skull baby in a starry nightcap, dozing on a soft cloud" className="h-auto w-full" />
              </button>
              {[
                { l: "-6%", t: "12%", s: 22, c: "text-gold" },
                { l: "92%", t: "6%", s: 16, c: "text-primary" },
                { l: "96%", t: "62%", s: 20, c: "text-gold" },
                { l: "-4%", t: "78%", s: 14, c: "text-lavender" },
              ].map((s, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`pointer-events-none absolute transition-transform duration-500 ${s.c} ${waking ? "scale-150" : ""}`}
                  style={{ left: s.l, top: s.t, translate: `calc(var(--tx,0) * ${-14 - i * 4}px) calc(var(--ty,0) * ${-10 - i * 3}px)` }}
                >
                  <Sparkle size={s.s} className="anim-twinkle" />
                </span>
              ))}
              {tucked && (
                <>
                  <div aria-hidden="true" className="quilt pointer-events-none absolute inset-x-[4%] bottom-[2%] h-[34%] rounded-[40%_40%_46%_46%/30%_30%_70%_70%]" />
                  {!reduced && [0, 1, 2].map((i) => (
                    <span key={i} aria-hidden="true" className="pointer-events-none absolute font-display text-2xl italic text-lavender" style={{ left: `${58 + i * 9}%`, top: "10%", animation: `note-rise 3.2s ease-out ${i * 0.9}s infinite` }}>z</span>
                  ))}
                  <p className="absolute -top-4 left-1/2 w-56 -translate-x-1/2 -translate-y-full rounded-3xl border border-border bg-card px-4 py-2 text-center font-play text-sm shadow-[var(--shadow-soft)]">
                    “{sleepyLine(line)}”
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              aria-pressed={tucked}
              onClick={tuck}
              className={`min-h-11 rounded-full border px-4 font-play text-sm transition ${tucked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}
            >
              {tucked ? "☾ Pip is tucked in · tap to peek" : "Tuck Pip in ☾"}
            </button>
          </div>
          <div className="relative mx-auto mt-4 w-64 rounded-full border border-border bg-card/90 px-4 py-2 font-mono text-[10px] uppercase tracking-wider shadow-[var(--shadow-soft)]">
            <div className="flex justify-between text-muted-foreground">
              <span>Dream #482</span>
              <span className="text-primary">in transit</span>
            </div>
            <div className="relative mt-1.5 h-1 rounded-full bg-secondary">
              <span className="absolute -top-1.5 text-gold" style={{ animation: "travel 5s ease-in-out infinite alternate" }}>
                <StarGlyph size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="relative pb-6 text-center font-play text-sm text-muted-foreground">Psst… the stars are listening. ✦</p>
    </section>
  );
}
