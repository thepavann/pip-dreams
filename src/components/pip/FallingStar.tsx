import { useEffect, useState } from "react";
import { jarLabel, STAR_JAR_GOAL } from "@/lib/pip-logic";
import { useSite, usePrefersReducedMotion } from "@/lib/site-state";
import { StarGlyph } from "./shared";

/** Occasional catchable shooting star; static (still catchable) under reduced motion. */
export function FallingStar() {
  const { chime, setStatus } = useSite();
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [caught, setCaught] = useState(0);
  useEffect(() => {
    if (visible) {
      const t = window.setTimeout(() => setVisible(false), reduced ? 12000 : 5000);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => { setRun((r) => r + 1); setVisible(true); }, run === 0 ? 4000 : 14000);
    return () => window.clearTimeout(t);
  }, [visible, run, reduced]);
  const catchIt = () => {
    setVisible(false);
    chime(true);
    setCaught((c) => {
      const n = c + 1;
      if (n === STAR_JAR_GOAL) setStatus("STARLIGHT HARVESTER!");
      return n;
    });
  };
  return (
    <>
      {visible && (
        <button
          key={run}
          type="button"
          onClick={catchIt}
          aria-label="Catch the falling star"
          className={`absolute z-20 grid h-11 w-11 place-items-center text-gold ${reduced ? "" : "anim-shoot"}`}
          style={{ left: `${20 + ((run * 23) % 50)}%`, top: "12%" }}
        >
          <StarGlyph size={20} className="drop-shadow-[0_0_10px_var(--gold)]" />
        </button>
      )}
      {caught > 0 && (
        <p className="absolute bottom-3 left-5 z-20 rounded-full bg-background/85 px-3 py-1 font-mono text-[11px] text-foreground" aria-live="polite">
          ✦ Starlight jar: {jarLabel(caught)}
        </p>
      )}
    </>
  );
}
