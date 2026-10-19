import { describe, expect, it } from "vitest";
import { cleanCertName, moonTimestamp, sleepyLine, SLEEPY_LINES } from "@/lib/pip-logic";

describe("bedtime + keepsake", () => {
  it("cycles sleepy lines", () => {
    expect(sleepyLine(0)).toBe(SLEEPY_LINES[0]);
    expect(sleepyLine(SLEEPY_LINES.length + 1)).toBe(SLEEPY_LINES[1]);
  });
  it("moon timestamp is always 3 AM in-world", () => {
    expect(moonTimestamp(new Date(Date.UTC(2026, 9, 18, 15, 7)))).toBe("Starlight Cycle 291 · 03:07 AM");
  });
  it("certificate names are trimmed and capped at 28 chars", () => {
    expect(cleanCertName("  Ada   Lovelace ")).toBe("Ada Lovelace");
    expect(cleanCertName("x".repeat(40))).toHaveLength(28);
  });
});
