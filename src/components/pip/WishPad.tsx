import { useEffect, useState } from "react";
import { addWish, parseWishes, SEED_WISHES, type Wish } from "@/lib/pip-logic";
import { useSite } from "@/lib/site-state";

export function WishPad() {
  const { chime } = useSite();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  useEffect(() => setWishes(parseWishes(localStorage.getItem("pip-wishes"))), []);
  const save = (l: Wish[]) => {
    setWishes(l);
    localStorage.setItem("pip-wishes", JSON.stringify(l));
  };
  return (
    <section aria-labelledby="wish-title" className="mt-10 rounded-[24px] border border-white/20 bg-white/5 p-5">
      <h3 id="wish-title" className="font-display text-2xl">Leave a bedtime wish</h3>
      <p className="mt-1 font-mono text-[11px] opacity-80">Local demo · wishes stay in your own browser only.</p>
      <form
        className="mt-4 grid gap-2 sm:grid-cols-[140px_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          const next = addWish(wishes, from, text);
          if (next !== wishes) { save(next); setText(""); chime(true); }
        }}
      >
        <label className="sr-only" htmlFor="wish-from">Your name</label>
        <input id="wish-from" value={from} onChange={(e) => setFrom(e.target.value)} maxLength={24} placeholder="Your name" className="min-h-11 rounded-full border border-white/25 bg-transparent px-4 placeholder:text-current placeholder:opacity-60" />
        <label className="sr-only" htmlFor="wish-text">Your wish</label>
        <input id="wish-text" value={text} onChange={(e) => setText(e.target.value)} maxLength={80} placeholder="I wish tonight…" className="min-h-11 rounded-full border border-white/25 bg-transparent px-4 placeholder:text-current placeholder:opacity-60" />
        <button className="min-h-11 rounded-full bg-gold px-5 font-play text-[#211b35] transition hover:brightness-110">Pin wish</button>
      </form>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2" aria-live="polite">
        {[...wishes, ...SEED_WISHES].map((w, i) => (
          <li key={i} className={`relative rounded-2xl bg-card p-4 pt-5 text-card-foreground shadow ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
            <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" />
            <p className="font-play">“{w.text}”</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">— {w.from}</p>
          </li>
        ))}
      </ul>
      {wishes.length > 0 && (
        <button type="button" onClick={() => save([])} className="mt-3 min-h-11 font-mono text-xs underline underline-offset-4 opacity-85 hover:text-gold">Clear my wishes</button>
      )}
    </section>
  );
}
