import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import box from "@/assets/pip_lullaby_box.png";
import lantern from "@/assets/pip_dream_lantern.png";
import { audio, LULLABY } from "@/lib/audio";
import { canPack, cleanRecipient, INGREDIENTS, toggleIngredient } from "@/lib/pip-logic";
import { usePrefersReducedMotion, useSite } from "@/lib/site-state";
import { Eyebrow, Reveal, Sky, Sparkle, StarGlyph } from "./shared";

export function Inventions() {
  return (
    <section id="inventions" aria-labelledby="inv-title" className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Eyebrow>Workbench · three inventions</Eyebrow>
      <h2 id="inv-title" className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
        Things I made
        <br />
        <em className="italic text-primary">after lights-out.</em>
      </h2>
      <div className="mt-14 space-y-20 md:space-y-28">
        <LullabyLab />
        <Nightlights />
        <DeliveryRoutes />
      </div>
    </section>
  );
}

function ProjectHead({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div>
      <p className="font-mono text-xs text-primary">PROJECT {n}</p>
      <h3 id={`p${Number(n)}`} className="mt-2 font-display text-3xl font-medium sm:text-4xl">{title}</h3>
      <p className="mt-2 font-play text-lg text-muted-foreground">“{desc}”</p>
    </div>
  );
}

/* ---------- 01 Lullaby Lab ---------- */
function LullabyLab() {
  const { muted, setMuted, setStatus } = useSite();
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState(-1);
  const [unsupported, setUnsupported] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const toggle = () => {
    if (playing) {
      stopRef.current?.();
      stopRef.current = null;
      setPlaying(false);
      setNote(-1);
      return;
    }
    const stop = audio.startLullaby((i) => setNote(i));
    if (!stop) return setUnsupported(true);
    stopRef.current = stop;
    setPlaying(true);
    setStatus("LULLABY PLAYING…");
  };

  return (
    <Reveal>
      <article aria-labelledby="p1" className="grid items-center gap-8 md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <div className={`relative overflow-hidden rounded-[28px] border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition ${playing ? "ring-4 ring-gold/60" : ""}`}>
            <img src={box} width={1024} height={924} alt="Pip's little music box with a wind-up key" className="h-auto w-full rounded-[20px]" />
            <svg aria-hidden="true" viewBox="0 0 40 40" className={`absolute right-6 top-6 h-14 w-14 text-gold drop-shadow ${playing ? "anim-spin" : ""}`}>
              <circle cx="20" cy="20" r="4" fill="currentColor" />
              <path d="M20 20 L20 4 M20 4 a6 6 0 1 1 0.1 0 M20 20 L20 36 M20 36 a6 6 0 1 0 0.1 0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
            {playing && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="anim-float absolute text-gold" style={{ left: `${15 + i * 17}%`, top: `${10 + (i % 2) * 14}%`, animationDelay: `${i * 0.4}s` }}>
                    <Sparkle size={14} />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="order-1 min-w-0 md:order-2">
          <ProjectHead n="01" title="The Lullaby Lab" desc="Tiny melodies for enormous dreams." />
          <p className="mt-4 max-w-md leading-relaxed">
            Wind the key and my music box hums a soft pentatonic lullaby, made fresh each time by your browser — no recordings, just tiny glowing tones.
          </p>
          <div className="paper mt-6 rounded-[24px] border border-border p-5">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={playing}
                disabled={unsupported}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
                {playing ? "Pause the lullaby" : "Wind the music box"}
              </button>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground" aria-live="polite">
                {unsupported ? "Music box unavailable here" : playing ? "● Playing" : "○ Stopped"}
              </span>
            </div>
            <div aria-hidden="true" className="mt-5 flex h-12 items-end gap-1">
              {LULLABY.map((f, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${i === note ? "bg-gold" : f ? "bg-lavender" : "bg-transparent"}`}
                  style={{ height: f ? `${playing ? (i === note ? 100 : 25 + ((f - 380) / 520) * 50) : 12}%` : "6%" }}
                />
              ))}
            </div>
            <StarKeys onPlay={() => setNote(-1)} />
            {unsupported && <p className="mt-3 text-sm">Your browser can’t make sounds this way, but Pip is humming along quietly anyway.</p>}
            {playing && muted && (
              <p className="mt-3 text-sm">
                The whole observatory is muted.{" "}
                <button type="button" className="font-medium text-primary underline underline-offset-4" onClick={() => setMuted(false)}>
                  Turn sound on
                </button>{" "}
                to hear it.
              </p>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const KEYS = [
  { n: "C", f: 523.25, h: 100 },
  { n: "D", f: 587.33, h: 90 },
  { n: "E", f: 659.25, h: 80 },
  { n: "G", f: 783.99, h: 70 },
  { n: "A", f: 880, h: 60 },
];

/** Five playable star keys: a tiny celesta you can compose on. */
function StarKeys({ onPlay }: { onPlay: () => void }) {
  const { muted, stamp } = useSite();
  const [lit, setLit] = useState(-1);
  const [notes, setNotes] = useState<{ id: number; i: number }[]>([]);
  const id = useRef(0);
  const timers = useRef(new Set<number>());
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const play = (i: number) => {
    const k = KEYS[i];
    if (!k) return;
    audio.pluck(k.f);
    onPlay();
    stamp("compose");
    setLit(i);
    const nid = ++id.current;
    setNotes((ns) => [...ns.slice(-7), { id: nid, i }]);
    const t = window.setTimeout(() => {
      timers.current.delete(t);
      setNotes((ns) => ns.filter((x) => x.id !== nid));
      setLit((l) => (l === i ? -1 : l));
    }, 1100);
    timers.current.add(t);
  };

  return (
    <div className="mt-6 border-t border-dashed border-border pt-5">
      <p className="font-play text-sm">Or compose your own — tap the star keys{muted ? " (sound is off up top)" : ""}:</p>
      <div
        role="group"
        aria-label="Star keys. Press 1 to 5 to play."
        className="relative mt-3 flex items-end justify-center gap-2"
        onKeyDown={(e) => {
          const n = Number(e.key);
          if (n >= 1 && n <= 5) play(n - 1);
        }}
      >
        {notes.map((x) => (
          <span key={x.id} aria-hidden="true" className="note-rise pointer-events-none absolute bottom-full text-lg text-gold" style={{ left: `${10 + x.i * 20}%` }}>
            ♪
          </span>
        ))}
        {KEYS.map((k, i) => (
          <button
            key={k.n}
            type="button"
            onClick={() => play(i)}
            aria-label={`Play note ${k.n}`}
            className={`flex w-12 flex-col items-center justify-end rounded-2xl border border-border pb-2 font-mono text-xs transition hover:-translate-y-1 sm:w-14 ${lit === i ? "bg-gold text-[#211b35] shadow-[0_0_24px_var(--gold)]" : "bg-card"}`}
            style={{ height: `${k.h}px` }}
          >
            <StarGlyph size={14} className={lit === i ? "" : "text-primary"} />
            <span className="mt-1">{k.n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- 02 Nightlights ---------- */
const LIGHTS = [
  { id: "moon", name: "Moon Milk", glow: "#F2CE83", note: "A warm golden glow, like a cup of something cozy. Best for creatures afraid of the dark corner by the wardrobe.", palette: ["#F2CE83", "#FFE9BD", "#C9954A"] },
  { id: "cloud", name: "Cloudberry", glow: "#E58BAA", note: "A soft berry-pink glow that smells faintly of jam. For anyone who needs a hug but is already in bed.", palette: ["#E58BAA", "#F3DCE2", "#A34063"] },
  { id: "stardust", name: "Stardust", glow: "#B79BE0", note: "A dreamy lavender shimmer that drifts across the ceiling. For big thinkers and tiny astronomers.", palette: ["#B79BE0", "#D9C6ED", "#6B54A0"] },
];

function Nightlights() {
  const { setNight, night, setStatus, chime } = useSite();
  const [sel, setSel] = useState(0);
  const l = LIGHTS[sel] ?? LIGHTS[0]!;
  return (
    <Reveal>
      <article aria-labelledby="p2" className="relative overflow-hidden rounded-[32px] bg-sky p-6 text-sky-foreground sm:p-10">
        <Sky density={0.6} />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_1fr]">
          <div className="min-w-0">
            <p className="font-mono text-xs text-gold">PROJECT 02</p>
            <h3 id="p2" className="mt-2 font-display text-3xl font-medium sm:text-4xl">The Nightlight Collection</h3>
            <p className="mt-2 font-play text-lg opacity-80">“A little light for every sleepy creature.”</p>
            <p className="mt-4 text-sm opacity-90">One trusty lantern, three different glows. Pick one to try it.</p>
            <div role="radiogroup" aria-label="Choose a nightlight glow" className="mt-6 grid gap-2 sm:grid-cols-3">
              {LIGHTS.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={i === sel}
                  onClick={() => {
                    setSel(i);
                    chime();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") setSel((i + 1) % 3);
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") setSel((i + 2) % 3);
                  }}
                  tabIndex={i === sel ? 0 : -1}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-left font-play transition ${i === sel ? "border-gold bg-white/10" : "border-white/15 hover:border-white/40"}`}
                >
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: x.glow, boxShadow: `0 0 12px ${x.glow}` }} />
                  {x.name}
                </button>
              ))}
            </div>
            <div aria-live="polite" className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="font-play font-semibold" style={{ color: l.glow }}>{l.name}</p>
              <p className="mt-1 text-sm opacity-85">{l.note}</p>
              <div className="mt-3 flex gap-2" aria-label={`${l.name} palette`}>
                {l.palette.map((c) => (
                  <span key={c} className="flex items-center gap-1 font-mono text-[11px] opacity-90">
                    <span className="h-5 w-5 rounded-md border border-white/20" style={{ background: c }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              aria-pressed={night}
              onClick={() => {
                setNight(!night);
                setStatus(!night ? "OBSERVATORY LIT ✦" : "DREAMING…");
                audio.sparkleRun();
              }}
              className="mt-6 rounded-full bg-gold px-5 py-3 font-medium text-[#211b35] transition hover:-translate-y-0.5"
            >
              {night ? "Let the morning in" : "Light the observatory"}
            </button>
          </div>
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="absolute inset-[-10%] rounded-full blur-3xl transition-colors duration-700" style={{ background: `radial-gradient(circle, ${l.glow}aa, transparent 65%)` }} aria-hidden="true" />
            <img
              src={lantern}
              width={1024}
              height={914}
              alt={`Pip's dream lantern glowing with the ${l.name} light`}
              className="relative h-auto w-full rounded-[28px] transition-shadow duration-700"
              style={{ boxShadow: `0 0 60px -6px ${l.glow}` }}
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- 03 Delivery Routes ---------- */
const STOPS = [
  { name: "The Cloud Cottage", creature: "Mimsy, a cloud bunny", dream: "a dream about flying", msg: "Ears up, Mimsy! Tonight the wind holds you like a pillow.", at: 0.18 },
  { name: "The Lantern House", creature: "Bram, a shy hedgehog", dream: "a dream about warm summer rain", msg: "Puddles that feel like bathwater. You’ll love it, Bram.", at: 0.55 },
  { name: "The Moonlit Treehouse", creature: "Ollie, an owlet", dream: "a dream about talking stars", msg: "They’ve been wanting to say hello for ages, Ollie.", at: 0.92 },
];
const ROUTE = "M30 300 C 120 300, 120 170, 210 170 S 330 280, 420 250 S 520 110, 610 120 S 740 200, 770 90";

function DeliveryRoutes() {
  const { markDelivered, chime, stamp } = useSite();
  const [to, setTo] = useState("Mimsy the Bunny");
  const [ings, setIngs] = useState<string[]>(["Cloud wings"]);
  const [parcel, setParcel] = useState<{ to: string; ings: string[] } | null>(null);
  const [ledger, setLedger] = useState<string[]>([]);
  const reduced = usePrefersReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [delivered, setDelivered] = useState<Set<number>>(new Set());
  const [runner, setRunner] = useState<{ x: number; y: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    setPts(STOPS.map((s) => p.getPointAtLength(L * s.at)));
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const begin = (pkg?: { to: string; ings: string[] }) => {
    const p = pathRef.current;
    if (!p || runner) return;
    const L = p.getTotalLength();
    const dur = reduced ? 300 : 5200;
    const t0 = performance.now();
    const hit = new Set<number>();
    setDelivered(new Set());
    setParcel(null);
    const map = document.getElementById("route-map");
    if (map) {
      const r = map.getBoundingClientRect();
      if (r.top < 80 || r.bottom > window.innerHeight) map.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pt = p.getPointAtLength(L * e);
      setRunner({ x: pt.x, y: pt.y });
      setProgress(e);
      if (!pkg) STOPS.forEach((s, i) => {
        if (e >= s.at && !hit.has(i)) {
          hit.add(i);
          setDelivered(new Set(hit));
          setOpen(i);
          chime(true);
        }
      });
      if (t < 1) raf.current = requestAnimationFrame(step);
      else {
        setRunner(null);
        if (pkg) {
          setOpen(null);
          setParcel(pkg);
          try { localStorage.setItem("pip-last-parcel", JSON.stringify({ to: pkg.to, ings: pkg.ings })); } catch {}
          setLedger((l) => [`${pkg.to} · ${pkg.ings.join(" + ")}`, ...l].slice(0, 4));
          markDelivered(`a dream for ${pkg.to}`);
          stamp("courier");
          audio.sparkleRun();
        } else markDelivered("All three rooftops");
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  const select = (i: number) => {
    setOpen(i);
    setDelivered((d) => new Set(d).add(i));
    markDelivered(STOPS[i]?.name ?? "a rooftop");
    chime();
  };

  const s = open !== null ? (STOPS[open] ?? null) : null;

  return (
    <Reveal>
      <article aria-labelledby="p3" className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.75fr_1.25fr]">
        <div className="min-w-0">
          <ProjectHead n="03" title="Dream Delivery Routes" desc="Every rooftop has a dream waiting." />
          <p className="mt-4 leading-relaxed">Tap a star stop to see who’s dreaming what — or send me off on tonight’s whole round.</p>
          <button
            type="button"
            onClick={() => begin()}
            disabled={!!runner}
            className="mt-5 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {runner ? "Delivering…" : "Begin delivery"}
          </button>
          <div aria-live="polite" className="paper mt-6 min-h-[150px] rounded-[24px] border border-border p-5">
            {parcel ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">✦ Special delivery for {parcel.to}</p>
                <p className="mt-2 font-play text-lg">A dream of {parcel.ings[0]?.toLowerCase()} and {parcel.ings[1]?.toLowerCase()}, tucked in gently.</p>
                <p className="mt-2 text-sm italic text-muted-foreground">“Packed it myself. Sleep tight, {parcel.to.split(" ")[0]}.” — Pip</p>
              </>
            ) : s ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">✦ Delivered to {s.name}</p>
                <p className="mt-2 font-play text-lg">{s.creature} is receiving {s.dream}.</p>
                <p className="mt-2 text-sm italic text-muted-foreground">“{s.msg}” — Pip</p>
              </>
            ) : (
              <p className="font-play text-muted-foreground">No dream selected yet. The town is quiet… choose a glowing star to peek inside a window.</p>
            )}
          </div>
          <form
            className="mt-6 rounded-[24px] border-2 border-dashed border-primary/40 p-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (canPack(to, ings)) begin({ to: cleanRecipient(to), ings });
            }}
          >
            <p className="font-display text-xl">Pack a dream</p>
            <label htmlFor="dream-to" className="mt-3 block font-play text-sm">Who’s it for?</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Mimsy the Bunny", "Bram the Hedgehog", "Ollie the Owlet"].map((n) => (
                <button key={n} type="button" aria-pressed={to === n} onClick={() => setTo(n)} className={`inline-flex min-h-10 items-center rounded-full border px-3.5 py-1.5 text-xs font-play transition ${to === n ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                  {n}
                </button>
              ))}
            </div>
            <input id="dream-to" value={to} maxLength={24} onChange={(e) => setTo(e.target.value)} placeholder="…or type any sleepy name" className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <fieldset className="mt-4">
              <legend className="font-play text-sm">Pick two ingredients <span className="font-mono text-xs text-muted-foreground">({ings.length}/2)</span></legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {INGREDIENTS.map((x) => (
                  <button key={x} type="button" aria-pressed={ings.includes(x)} onClick={() => { setIngs((v) => toggleIngredient(v, x)); chime(); }} className={`inline-flex min-h-10 items-center rounded-full border px-3.5 py-1.5 text-xs font-play transition ${ings.includes(x) ? "border-gold bg-gold/30" : "border-border hover:border-gold"}`}>
                    {ings.includes(x) ? "✦ " : ""}{x}
                  </button>
                ))}
              </div>
            </fieldset>
            <button type="submit" disabled={!canPack(to, ings) || !!runner} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-50">
              {runner ? "Pip is flying…" : "Send with Pip"}
            </button>
            {ledger.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tonight’s ledger</p>
                <ul className="mt-1 space-y-0.5 font-mono text-xs">
                  {ledger.map((l, i) => <li key={i}>✓ {l}</li>)}
                </ul>
              </div>
            )}
          </form>
        </div>
        <div id="route-map" className="relative self-start overflow-hidden rounded-[32px] bg-sky md:sticky md:top-24">
          <Sky density={0.5} />
          <div className="relative aspect-[8/4] min-h-[240px] w-full">
            <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="690" cy="60" r="26" fill="var(--gold)" opacity=".9" />
              <g className="anim-drift" fill="#ffffff" opacity=".12">
                <ellipse cx="180" cy="70" rx="70" ry="18" />
                <ellipse cx="480" cy="50" rx="90" ry="16" />
              </g>
              {/* town */}
              <g fill="#3b3052">
                <path d="M0 400V330h60v-30l30-25 30 25v30h60v100z" />
                <path d="M160 400V210l50-40 50 40v190z" />
                <path d="M360 400V280l60-45 60 45v120z" />
                <path d="M560 400V160l50-40 50 40v240z" />
                <path d="M680 400V140l40-50h20l40 50v260z" />
              </g>
              <g fill="var(--gold)" opacity=".85">
                <rect x="196" y="230" width="14" height="18" rx="3" />
                <rect x="410" y="300" width="16" height="18" rx="3" />
                <rect x="600" y="180" width="14" height="18" rx="3" />
                <rect x="722" y="160" width="12" height="16" rx="3" />
              </g>
              <path ref={pathRef} d={ROUTE} fill="none" stroke="var(--lavender)" strokeOpacity=".35" strokeWidth="3" strokeDasharray="3 9" strokeLinecap="round" />
              <path d={ROUTE} fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} style={{ filter: "drop-shadow(0 0 6px var(--gold))" }} />
              {runner && (
                <g transform={`translate(${runner.x} ${runner.y})`}>
                  <circle r="14" fill="var(--gold)" opacity=".35" />
                  <circle r="6" fill="#fffdfa" />
                </g>
              )}
            </svg>
            {pts.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => select(i)}
                aria-label={`${STOPS[i]?.name}${delivered.has(i) ? ", delivered" : ""}`}
                aria-pressed={open === i}
                className={`absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition hover:scale-110 ${delivered.has(i) ? "text-gold" : "text-lavender"} ${open === i ? "scale-125" : ""}`}
                style={{ left: `${(p.x / 800) * 100}%`, top: `${(p.y / 400) * 100}%` }}
              >
                <StarGlyph size={26} className="drop-shadow-[0_0_8px_var(--gold)]" />
              </button>
            ))}
          </div>
          <ol className="relative grid gap-1 border-t border-white/10 p-3 text-sky-foreground sm:grid-cols-3">
            {STOPS.map((x, i) => (
              <li key={x.name}>
                <button type="button" onClick={() => select(i)} className={`w-full rounded-xl px-3 py-2 text-left font-play text-sm transition hover:bg-white/10 ${open === i ? "bg-white/10" : ""}`}>
                  <span className={delivered.has(i) ? "text-gold" : "opacity-60"}>{delivered.has(i) ? "✦" : "○"}</span> {x.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </Reveal>
  );
}
