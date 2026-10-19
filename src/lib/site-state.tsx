import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { audio } from "./audio";
import { addStamp, parseStamps, type StampId } from "./pip-logic";

export const BASE_STATUS = "DREAMING…";

type SiteState = {
  night: boolean;
  setNight: (v: boolean) => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
  chaos: boolean;
  setChaos: (v: boolean) => void;
  effects: boolean;
  setEffects: (v: boolean) => void;
  status: string;
  setStatus: (s: string) => void;
  lastDelivered: string;
  markDelivered: (where: string) => void;
  chime: (high?: boolean) => void;
  stamps: StampId[];
  stamp: (id: StampId) => void;
};

// Keep one context instance across hot reloads so provider and consumers always match.
const g = globalThis as { __pipSiteCtx?: React.Context<SiteState | null> };
const Ctx = (g.__pipSiteCtx ??= createContext<SiteState | null>(null));

let night_ = 482;
function moonTime() {
  const d = new Date();
  night_ += 0;
  return `Moon-time ${String(d.getMinutes() % 12 || 12).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")} · Night ${night_}`;
}

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const [night, setNightRaw] = useState(false);
  const [muted, setMutedRaw] = useState(true);
  const [chaos, setChaos] = useState(false);
  const [effects, setEffects] = useState(true);
  const [status, setStatus] = useState(BASE_STATUS);
  const [lastDelivered, setLast] = useState("Moon-time 03:12 · Night 481 · Cloud Cottage");

  const [stamps, setStamps] = useState<StampId[]>([]);
  useEffect(() => {
    try {
      setStamps(parseStamps(localStorage.getItem("pip-stamps")));
    } catch {}
  }, []);
  const stamp = useCallback((id: StampId) => {
    setStamps((have) => {
      const next = addStamp(have, id);
      if (next !== have) {
        try {
          localStorage.setItem("pip-stamps", JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem("pip-theme") === "night") setNightRaw(true);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", night);
  }, [night]);
  useEffect(() => {
    document.documentElement.classList.toggle("chaos", chaos);
  }, [chaos]);
  useEffect(() => {
    audio.setMuted(muted);
  }, [muted]);

  const setNight = useCallback((v: boolean) => {
    setNightRaw(v);
    try {
      localStorage.setItem("pip-theme", v ? "night" : "day");
    } catch {}
  }, []);
  const setMuted = useCallback((v: boolean) => setMutedRaw(v), []);
  const chime = useCallback((high?: boolean) => audio.chime(high), []);
  const markDelivered = useCallback((where: string) => {
    setLast(`${moonTime()} · ${where}`);
    setStatus("DREAM DELIVERED!");
  }, []);

  const value = useMemo(
    () => ({ night, setNight, muted, setMuted, chaos, setChaos, effects, setEffects, status, setStatus, lastDelivered, markDelivered, chime, stamps, stamp }),
    [night, setNight, muted, setMuted, chaos, effects, status, lastDelivered, markDelivered, chime, stamps, stamp],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSite must be used inside SiteStateProvider");
  return v;
}

export function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}

export function useFinePointer() {
  const [f, setF] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(hover: hover) and (pointer: fine)");
    setF(m.matches);
    const on = () => setF(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return f;
}
