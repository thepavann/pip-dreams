import portrait from "@/assets/pip_portrait.png";
import { Eyebrow, Reveal, StarGlyph } from "./shared";

const PROFILE = [
  ["Name", "Pip"],
  ["Species", "Skull Baby"],
  ["Role", "Junior Dream Engineer"],
  ["Home", "Midnight Nursery"],
  ["Personality", "Sleepy, curious, gentle, and a little clumsy"],
  ["Favorite things", "Falling stars, warm lanterns, music boxes"],
  ["Biggest mission", "Making sure no little creature goes to sleep without a dream"],
];

const NOTES = [
  "I yawn exactly three times before every big idea.",
  "My nightcap bow is a tiny emergency star-catcher.",
  "I once tripped over a moonbeam. It said sorry first.",
];

const GROWTH = [
  ["Height", "3½ teacups, stacked carefully"],
  ["Heart wingspan", "One entire constellation"],
  ["Weight", "Lighter than a star-cookie"],
  ["Favourite nap spot", "Second cloud left of the moon"],
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-[340px]">
          <div className="rotate-[-2deg] rounded-[28px] border border-border bg-card p-3 pb-12 shadow-[var(--shadow-soft)] transition hover:rotate-0">
            <img src={portrait} width={682} height={1024} alt="Portrait of Pip: a round skull face with soft amber-lit eyes, a starry nightcap and a pink bow" className="h-auto w-full rounded-[20px]" />
            <p className="absolute bottom-4 left-0 right-0 text-center font-play text-sm text-muted-foreground">Pip, age: one very long nap</p>
          </div>
        </Reveal>
        <div className="min-w-0">
          <Eyebrow>Meet the dream engineer</Eyebrow>
          <h2 id="about-title" className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
            A very small engineer
            <br />
            with <em className="italic text-primary">very big</em> dreams.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I work the night shift at the Midnight Nursery. My tools are small — a screwdriver shaped like a crescent, a pocketful of stardust — but
            the dreams I build are enormous. If you’ve ever woken up smiling, hello. That might’ve been me.
          </p>
          <dl className="paper mt-8 divide-y divide-dashed divide-border rounded-[24px] border border-border">
            {PROFILE.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-primary">{k}</dt>
                <dd className="font-play">{v}</dd>
              </div>
            ))}
          </dl>
          <aside aria-label="Pip's pocket notes" className="mt-6 rounded-[22px] border-2 border-dashed border-primary/40 bg-blush/50 p-5 dark:bg-accent/30">
            <p className="font-play font-semibold text-primary">Pip’s pocket notes</p>
            <ul className="mt-2 space-y-2">
              {NOTES.map((n) => (
                <li key={n} className="flex gap-2 text-sm">
                  <StarGlyph size={12} className="mt-1 shrink-0 text-gold" />
                  {n}
                </li>
              ))}
            </ul>
          </aside>
          <aside aria-label="Pip's nursery growth chart" className="mt-6 rounded-[22px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <p className="font-play font-semibold text-primary">Nursery growth chart</p>
            <div aria-hidden="true" className="mt-3 h-3 rounded-full bg-[repeating-linear-gradient(90deg,var(--gold)_0_2px,transparent_2px_16px)] bg-gold/20" />
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {GROWTH.map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-secondary/60 p-3 transition hover:-translate-y-0.5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-primary">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
