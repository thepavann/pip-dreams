import { useEffect, useRef, useState } from "react";
import { audio } from "@/lib/audio";
import { advanceSequence, cleanCertName, formatOdometer, nextVisitorCount, passportComplete, STAMPS } from "@/lib/pip-logic";
import { BASE_STATUS, useSite } from "@/lib/site-state";
import { Sky, StarGlyph } from "./shared";
import { WishPad } from "./WishPad";

// Pentagon points (index order matters for the secret) + two decoys.
const POINTS = [
  { x: 50, y: 8 },
  { x: 90, y: 38 },
  { x: 75, y: 88 },
  { x: 25, y: 88 },
  { x: 10, y: 38 },
];
const DECOYS = [
  { x: 52, y: 50 },
  { x: 96, y: 80 },
];

function Constellation() {
  const { setStatus, chime, stamp } = useSite();
  const [progress, setProgress] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [burst, setBurst] = useState(0);

  const press = (i: number) => {
    if (done) return;
    const r = advanceSequence(progress, i);
    setProgress(r.progress);
    if (r.wrong) {
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
      return;
    }
    chime(true);
    if (r.done) {
      setDone(true);
      setBurst((b) => b + 1);
      setStatus("SECRET DREAM UNLOCKED");
      stamp("stars");
      audio.sparkleRun();
    }
  };
  const replay = () => {
    setDone(false);
    setProgress([]);
    setStatus(BASE_STATUS);
  };

  // Star index -> position. Indices 0..4 are the pentagon in clockwise order.
  const pos = (i: number) => POINTS[i] ?? POINTS[0]!;

  return (
    <div className="relative">
      <div className={`relative mx-auto h-40 w-40 transition-transform ${shake ? "translate-x-1" : ""}`} aria-label="A small constellation" role="group">
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {progress.slice(1).map((s, k) => {
            const a = pos(progress[k] ?? 0);
            const b = pos(s);
            return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--gold)" strokeWidth="1" />;
          })}
          {done && <line x1={pos(3).x} y1={pos(3).y} x2={pos(0).x} y2={pos(0).y} stroke="var(--gold)" strokeWidth="1" />}
        </svg>
        {[...POINTS, ...DECOYS].map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => (i < 5 ? press(i) : press(-1))}
            aria-label={`Star ${i + 1}`}
            className={`absolute grid h-9 w-9 after:absolute after:-inset-1.5 after:content-[''] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:scale-125 ${progress.includes(i) || done ? "text-gold" : "text-lavender/70"}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <StarGlyph size={i < 5 ? 12 : 9} />
          </button>
        ))}
        {burst > 0 && <Burst key={burst} />}
      </div>
      <p className="mt-2 text-center font-play text-xs opacity-90">Pip’s favourite shape has five points.</p>
      <p className="sr-only" aria-live="polite">{done ? "Secret unlocked." : progress.length ? `${progress.length} of 5 stars connected.` : ""}</p>
      {done && (
        <div role="region" aria-label="Secret dream card" className="mx-auto mt-4 max-w-sm rotate-[-1.5deg] rounded-[22px] border-2 border-dashed border-gold bg-card p-5 text-foreground shadow-[var(--shadow-soft)]">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Secret dream card · no. 000</p>
          <p className="mt-2 font-display text-xl">“You found my favourite stars! That means tonight’s first dream is yours. Sleep tight, explorer.”</p>
          <p className="mt-2 font-play text-sm text-muted-foreground">— Pip, with a very big yawn</p>
          <button type="button" onClick={replay} className="mt-3 text-sm font-medium text-primary underline underline-offset-4">
            Hide the secret again
          </button>
        </div>
      )}
    </div>
  );
}

function Burst() {
  const parts = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    const d = 60 + (i % 4) * 22;
    return { bx: `${Math.cos(a) * d}px`, by: `${Math.sin(a) * d}px`, c: ["var(--gold)", "var(--primary)", "var(--lavender)"][i % 3] };
  });
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 1600);
    return () => window.clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {parts.map((p, i) => (
        <span key={i} className="absolute h-2 w-2 rounded-[2px]" style={{ background: p.c, animation: "burst 1.4s ease-out forwards", ["--bx" as string]: p.bx, ["--by" as string]: p.by }} />
      ))}
    </div>
  );
}

function Passport() {
  const { stamps } = useSite();
  const full = passportComplete(stamps);
  return (
    <div className="mt-8 rounded-[22px] border border-white/15 bg-white/5 p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-gold">Observatory passport · {stamps.length}/4</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STAMPS.map((s) => {
          const got = stamps.includes(s.id);
          return (
            <li key={s.id} className={`flex flex-col items-center rounded-2xl border border-dashed p-3 text-center transition ${got ? "rotate-[-3deg] border-gold text-gold" : "border-white/25 opacity-85"}`}>
              <StarGlyph size={20} />
              <span className="mt-1 font-play text-xs">{got ? s.label : "???"}</span>
              <span className="sr-only">{got ? "stamped" : `not yet. Hint: ${s.hint}`}</span>
              {!got && <span aria-hidden="true" className="mt-1 text-[11px] leading-tight opacity-90">{s.hint}</span>}
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="mt-3 font-play text-sm">
        {full ? "✦ Certified Junior Dream Engineer — Pip is very proud of you." : "Explore the observatory to collect all four stamps."}
      </p>
      <Certificate />
    </div>
  );
}

function Certificate() {
  const { stamps, chime } = useSite();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const make = async () => {
    setBusy(true);
    try {
      let parcel: { to?: string; ings?: string[] } = {};
      try { parcel = JSON.parse(localStorage.getItem("pip-last-parcel") || "{}"); } catch {}
      const { drawKeepsake, downloadBlob } = await import("@/lib/keepsake");
      const blob = await drawKeepsake({ name: cleanCertName(name), recipient: parcel.to, ingredients: parcel.ings, stamps: stamps.length });
      downloadBlob(blob, "pip-dream-engineer-certificate.png");
      chime(true);
      setDone(true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form
      className="mt-5 flex flex-col gap-2 border-t border-dashed border-white/20 pt-4 sm:flex-row sm:items-end"
      onSubmit={(e) => { e.preventDefault(); void make(); }}
    >
      <label className="flex-1 font-play text-sm">
        Your name for Pip’s keepsake certificate
        <input
          value={name}
          maxLength={28}
          onChange={(e) => setName(e.target.value)}
          placeholder="A Sleepy Visitor"
          className="mt-1 block min-h-11 w-full rounded-full border border-white/25 bg-black/20 px-4 text-sm placeholder:text-white/60 focus:border-gold focus:outline-none"
        />
      </label>
      <button type="submit" disabled={busy} className="min-h-11 rounded-full bg-gold px-5 font-medium text-[#211B35] transition hover:-translate-y-0.5 disabled:opacity-60">
        {busy ? "Sealing…" : "Download keepsake (.png)"}
      </button>
      <span aria-live="polite" className="sr-only">{done ? "Certificate downloaded" : ""}</span>
    </form>
  );
}

function Badges() {
  const b = ["Best viewed at 3:00 AM", "Under a cozy blanket", "Midnight star-webring ✦", "Made with Web Audio"];
  return (
    <ul aria-label="Retro web badges" className="mt-6 flex flex-wrap gap-2">
      {b.map((x) => (
        <li key={x} className="border-2 border-gold/70 bg-black/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-gold [box-shadow:2px_2px_0_var(--primary)]">{x}</li>
      ))}
    </ul>
  );
}

function Odometer() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    try {
      const counted = sessionStorage.getItem("pip-counted") === "1";
      const next = nextVisitorCount(localStorage.getItem("pip-visitors"), counted);
      localStorage.setItem("pip-visitors", String(next));
      sessionStorage.setItem("pip-counted", "1");
      setN(next);
    } catch {
      setN(1);
    }
  }, []);
  const digits = formatOdometer(n ?? 0);
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-widest opacity-80">Dream visitors:</p>
      <div className="mt-1 inline-flex gap-0.5 rounded-md border border-white/20 bg-black/40 p-1" aria-label={`${n ?? 0} visits from this browser`}>
        {digits.split("").map((d, i) => (
          <span key={i} className="w-5 rounded-sm bg-[#120e1f] py-0.5 text-center font-mono text-sm text-gold">{d}</span>
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] opacity-85">local demo · counts visits from this browser only</p>
    </div>
  );
}

export function Footer() {
  const { lastDelivered } = useSite();
  const top = useRef<HTMLAnchorElement>(null);
  return (
    <footer className="cloud-edge relative overflow-hidden bg-sky text-sky-foreground">
      <Sky />
      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">The end · for tonight</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">
              Close your eyes.
              <br />
              <em className="italic">I’ll take it from here.</em>
            </h2>
            <p className="mt-4 max-w-md opacity-80">Thanks for visiting my little observatory. Somewhere above your roof, a dream is already on its way.</p>
            <p className="mt-6 font-mono text-xs opacity-75">
              Last dream delivered <span className="opacity-85">(fictional in-world time)</span>: <span className="text-gold">{lastDelivered}</span>
            </p>
            <div className="mt-8">
              <Odometer />
            </div>
            <Badges />
            <Passport />
          </div>
          <Constellation />
        </div>
        <WishPad />
        <div className="mt-16 grid gap-6 border-t border-white/15 pt-6 text-sm opacity-85 md:grid-cols-[1fr_auto]">
          <p className="max-w-2xl leading-relaxed">
            <strong className="font-medium">Credits.</strong> Pip and all character artwork are official assets from{" "}
            <a className="underline underline-offset-4 hover:text-gold" href="https://hax.baby" target="_blank" rel="noreferrer">haX.baby</a> · Baby’s First Website Hackathon, Track 1.
            Built with React, TanStack Start, Tailwind CSS and Lucide icons. Type: Fraunces, Fredoka, DM Sans &amp; Space Mono (Google Fonts). All sounds are synthesized live with the Web Audio API.
          </p>
          <a ref={top} href="#top" className="inline-flex min-h-11 items-center self-end rounded-full border border-white/25 px-4 py-2 font-play transition hover:border-gold hover:text-gold">
            ↑ Back to the stars
          </a>
        </div>
      </div>
    </footer>
  );
}
