import { useEffect, useRef, useState } from "react";
import box from "@/assets/pip_lullaby_box.png";
import lantern from "@/assets/pip_dream_lantern.png";
import pip from "@/assets/pip_portrait.png";
import { Eyebrow, Sparkle, StarGlyph } from "./shared";

const SCENES = [
  {
    title: "The falling star",
    text: "Pip was a sleepy little dream engineer who lived above the quiet town. One evening, a tiny star slipped from the sky and landed beside Pip’s nursery window. It wasn’t broken. It simply had a dream it couldn’t deliver.",
  },
  {
    title: "The first lullaby",
    text: "Pip placed the star beside an old music box. When the key turned, a soft melody drifted into the night. The star began to glow, and somewhere in the town, a little creature smiled in its sleep.",
  },
  {
    title: "The observatory",
    text: "By morning, Pip had built a tiny observatory where dreams could be designed, polished, and delivered. Every night since, Pip has sent little dreams across the rooftops, one sleepy creature at a time.",
  },
  {
    title: "The dream delivery",
    text: "Now, when the town goes quiet, Pip pulls on the starry nightcap and floats from rooftop to rooftop. Each little dream is tucked gently under a pillow. By sunrise Pip is very sleepy, a little clumsy, and completely happy.",
  },
];

function SceneArt({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="relative aspect-square overflow-hidden rounded-[32px] bg-gradient-to-b from-sky to-[#4a3c66]">
        <div aria-hidden="true" className="absolute right-[18%] top-[10%] text-gold anim-fall">
          <StarGlyph size={34} className="drop-shadow-[0_0_12px_var(--gold)]" />
        </div>
        <div aria-hidden="true" className="absolute bottom-[30%] left-[8%] h-[34%] w-[30%] rounded-t-full border-8 border-[#5c4033] bg-gold/90 shadow-[0_0_60px_var(--gold)]" />
        <img src={pip} alt="" width={682} height={1024} className="absolute bottom-0 right-[8%] w-[42%] rounded-t-[999px] border-4 border-card" />
      </div>
    );
  if (i === 1)
    return (
      <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[32px] bg-blush dark:bg-accent">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-gold">
          {[0, 1, 2].map((k) => (
            <circle key={k} cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth=".6" className="anim-ring" style={{ animationDelay: `${k * 0.8}s` }} />
          ))}
        </svg>
        <img src={box} alt="" width={1024} height={924} className="relative w-[62%] rounded-[24px] shadow-[var(--shadow-soft)]" />
        {[[12, 22], [28, 70], [74, 18], [86, 64]].map(([x, y]) => (
          <span key={x} aria-hidden="true" className="anim-float absolute text-gold" style={{ left: `${x}%`, top: `${y}%` }}>
            <Sparkle size={14} />
          </span>
        ))}
      </div>
    );
  if (i === 3)
    return (
      <div className="relative aspect-square overflow-hidden rounded-[32px] bg-gradient-to-b from-[#3b3052] to-sky">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="78" cy="20" r="9" fill="var(--gold)" opacity=".85" />
          <path d="M0 100V70l10-8 10 8v30zM24 100V62h18v38zM46 100V74l9-7 9 7v26zM68 100V66h14v34zM86 100V72l7-6 7 6v28z" fill="#211b35" />
          <path d="M5 60 Q 30 30 55 55 T 95 50" fill="none" stroke="var(--gold)" strokeWidth=".8" strokeDasharray="1.5 2.5" />
          {[[15, 64], [33, 58], [55, 68], [75, 62], [93, 66]].map(([x, y]) => (
            <rect key={x} x={x! - 1.5} y={y} width="3" height="3" rx=".5" fill="var(--gold)" className="anim-twinkle" />
          ))}
        </svg>
        <img src={pip} alt="" width={682} height={1024} className="anim-float absolute left-[36%] top-[22%] w-[26%] rounded-full border-4 border-card" />
      </div>
    );
  return (
    <div className="relative aspect-square overflow-hidden rounded-[32px] bg-sky">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <path d="M0 100V78h14V70l7-6 7 6v8h12V66l8-6 8 6v34zM60 100V74h16v-8l6-5 6 5v8h12v26z" fill="#3b3052" />
        <path d="M8 80 Q 25 60 44 66 T 80 70 T 96 60" fill="none" stroke="var(--gold)" strokeWidth=".8" strokeDasharray="1.5 2.5" />
        <path d="M38 40 a12 12 0 0 1 24 0z" fill="var(--lavender)" />
        <rect x="40" y="40" width="20" height="16" fill="#302742" />
        <rect x="58" y="30" width="16" height="4" rx="2" fill="var(--gold)" transform="rotate(-25 58 30)" />
      </svg>
      <img src={lantern} alt="" width={1024} height={914} className="absolute bottom-[8%] left-[38%] w-[24%] rounded-xl shadow-[0_0_40px_var(--gold)]" />
    </div>
  );
}

export function Story() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [seen, setSeen] = useState<boolean[]>([false, false, false, false]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return setSeen([true, true, true, true]);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset["i"]);
          if (e.isIntersecting) {
            setSeen((s) => s.map((v, k) => v || k === i));
            setActive(i);
          }
        }),
      { threshold: 0.45 },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="story" aria-labelledby="story-title" className="relative bg-secondary/50 py-20 md:py-28 dark:bg-card/40">
      <div className="mx-auto max-w-6xl px-5">
        <Eyebrow>Chapter one · an origin story</Eyebrow>
        <h2 id="story-title" className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
          How one little star
          <br />
          <em className="italic text-primary">changed everything.</em>
        </h2>
        <div className="sticky top-[96px] z-10 max-w-md mt-8 flex items-center gap-3 rounded-full border border-border bg-background/90 px-4 py-2 backdrop-blur" role="progressbar" aria-label="Story progress" aria-valuemin={1} aria-valuemax={4} aria-valuenow={active + 1}>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Page {active + 1} / 4</span>
          <div className="flex flex-1 gap-1.5">
            {SCENES.map((_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>
        <ol className="mt-10 space-y-20 md:space-y-32">
          {SCENES.map((s, i) => (
            <li key={s.title}>
              <div ref={(el) => { refs.current[i] = el; }} data-i={i} className={`reveal grid items-center gap-8 md:grid-cols-2 ${seen[i] ? "is-in" : ""}`}>
                <div className={`story-page ${i % 2 ? "md:order-2 rotate-[1deg]" : "rotate-[-1deg]"}`}>
                  <SceneArt i={i} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-primary">SCENE {i + 1}</p>
                  <h3 className="mt-2 font-display text-3xl font-medium">{s.title}</h3>
                  <p className="mt-4 max-w-md font-display text-xl font-light leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-primary">
                    {s.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
