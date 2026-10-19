// Pure, testable rules for Pip's observatory.

/** Order (by star index) that unlocks the secret constellation: drawing a five-point star. */
export const SECRET_SEQUENCE = [0, 2, 4, 1, 3] as const;

export function advanceSequence(progress: number[], star: number) {
  const next = [...progress, star];
  const ok = next.every((s, i) => SECRET_SEQUENCE[i] === s);
  if (!ok) {
    return { progress: star === SECRET_SEQUENCE[0] ? [star] : [], done: false, wrong: true };
  }
  return { progress: next, done: next.length === SECRET_SEQUENCE.length, wrong: false };
}

/** Local-only demo counter: +1 per new browser session, never global. */
export function nextVisitorCount(stored: string | null, alreadyCountedThisSession: boolean) {
  const n = Math.max(0, parseInt(stored ?? "0", 10) || 0);
  return alreadyCountedThisSession ? Math.max(n, 1) : n + 1;
}

export const formatOdometer = (n: number) => String(Math.min(n, 999999)).padStart(6, "0");

/** Deterministic star field so server and client render identically. */
export function starField(count: number, seed = 7) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rnd() * 100,
    y: rnd() * 100,
    r: 0.6 + rnd() * 1.6,
    delay: rnd() * 6,
    dur: 3 + rnd() * 4,
    gold: rnd() > 0.7,
  }));
}

/** Observatory Passport: four stamps earned by exploring. */
export const STAMPS = [
  { id: "wake", label: "Woke Pip up", hint: "Pip is napping on a cloud…" },
  { id: "compose", label: "Nighttime composer", hint: "The star keys love to be tapped." },
  { id: "courier", label: "Courier of dreams", hint: "Pack a dream for someone." },
  { id: "stars", label: "Star reader", hint: "Some stars hide a secret." },
] as const;
export type StampId = (typeof STAMPS)[number]["id"];

export function parseStamps(raw: string | null): StampId[] {
  try {
    const arr = JSON.parse(raw ?? "[]");
    if (!Array.isArray(arr)) return [];
    return STAMPS.map((s) => s.id).filter((id) => arr.includes(id));
  } catch {
    return [];
  }
}
export function addStamp(have: StampId[], id: StampId): StampId[] {
  return have.includes(id) ? have : STAMPS.map((s) => s.id).filter((x) => x === id || have.includes(x));
}
export const passportComplete = (have: StampId[]) => STAMPS.every((s) => have.includes(s.id));

/** Pack-a-dream: exactly two ingredients, recipient name trimmed and capped. */
export const INGREDIENTS = ["Starlight soup", "Cloud wings", "Moonbeam blanket", "Warm summer rain", "Talking stars", "Lantern hum"] as const;
export function toggleIngredient(sel: string[], ing: string, max = 2): string[] {
  if (sel.includes(ing)) return sel.filter((x) => x !== ing);
  return sel.length >= max ? [...sel.slice(1), ing] : [...sel, ing];
}
export function cleanRecipient(name: string) {
  return name.replace(/\s+/g, " ").trim().slice(0, 24);
}
export const canPack = (recipient: string, sel: string[]) => cleanRecipient(recipient).length > 0 && sel.length === 2;

// ---- Bedtime + keepsake ----
export const SLEEPY_LINES = [
  "Just five more minutes… the clouds are so soft.",
  "Did Bram get his warm rain dream yet?",
  "Mmm… the stars are humming my song.",
  "Wake me if a dream falls off the shelf…",
];
export function sleepyLine(n: number) {
  return SLEEPY_LINES[((n % SLEEPY_LINES.length) + SLEEPY_LINES.length) % SLEEPY_LINES.length];
}
/** Fictional in-world time: "Starlight Cycle 291 · 03:42 AM" (cycle = day of year). */
export function moonTimestamp(d: Date) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const day = Math.floor((d.getTime() - start) / 86400000);
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `Starlight Cycle ${day} · 03:${m} AM`;
}
export function cleanCertName(raw: string) {
  return raw.replace(/\s+/g, " ").trim().slice(0, 28);
}

// ---- Wish pad (local demo) + star jar ----
export type Wish = { from: string; text: string };
export const SEED_WISHES: Wish[] = [
  { from: "Bram the Hedgehog", text: "Warm socks for everyone." },
  { from: "Mimsy the Bunny", text: "Clover dreams only, please." },
];
export const cleanWish = (t: string) => t.replace(/\s+/g, " ").trim().slice(0, 80);
export function parseWishes(raw: string | null): Wish[] {
  try {
    const a = JSON.parse(raw ?? "[]");
    return Array.isArray(a) ? a.filter((w) => w && typeof w.text === "string" && typeof w.from === "string").slice(0, 12) : [];
  } catch {
    return [];
  }
}
export function addWish(list: Wish[], from: string, text: string): Wish[] {
  const t = cleanWish(text);
  if (!t) return list;
  return [{ from: cleanRecipient(from) || "A sleepy visitor", text: t }, ...list].slice(0, 12);
}
export const STAR_JAR_GOAL = 3;
export const jarLabel = (n: number) => (n >= STAR_JAR_GOAL ? "Starlight Harvester!" : `${n} / ${STAR_JAR_GOAL} stars caught`);
