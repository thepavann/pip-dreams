import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion, useSite } from "@/lib/site-state";

const MAX = 18;
const COLORS = ["var(--gold)", "var(--primary)", "var(--lavender)"];

/** Bounded, non-blocking sparkle trail for fine pointers only. */
export function SparkleTrail() {
  const { effects } = useSite();
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!effects || reduced) return;
    let last = 0;
    let n = 0;
    const onMove = (e: PointerEvent) => {
      if (!layer.current || (e.pointerType === "mouse" && !fine) || (e.pointerType !== "mouse" && e.type === "pointermove")) return;
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const root = layer.current;
      while (root.childElementCount >= MAX) root.firstElementChild?.remove();
      const s = document.createElement("span");
      s.textContent = "✦";
      s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:${8 + (n % 3) * 3}px;color:${COLORS[n++ % 3]};animation:sparkle-fade .8s ease-out forwards;`;
      s.addEventListener("animationend", () => s.remove(), { once: true });
      root.appendChild(s);
    };
    const onTap = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || !layer.current) return;
      const root = layer.current;
      for (let k = 0; k < 6; k++) {
        while (root.childElementCount >= MAX) root.firstElementChild?.remove();
        const a = (k / 6) * Math.PI * 2;
        const s = document.createElement("span");
        s.textContent = "✦";
        s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:12px;color:${COLORS[k % 3]};--bx:${Math.cos(a) * 28}px;--by:${Math.sin(a) * 28}px;animation:burst .7s ease-out forwards;`;
        s.addEventListener("animationend", () => s.remove(), { once: true });
        root.appendChild(s);
      }
    };
    window.addEventListener("pointerdown", onTap, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onTap);
      if (layer.current) layer.current.innerHTML = "";
    };
  }, [effects, fine, reduced]);

  return <div ref={layer} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 select-none" />;
}
