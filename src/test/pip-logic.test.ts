import { describe, expect, it } from "vitest";
import { advanceSequence, formatOdometer, nextVisitorCount, SECRET_SEQUENCE } from "@/lib/pip-logic";

describe("secret constellation", () => {
  it("unlocks only after all five stars in order", () => {
    let p: number[] = [];
    let done = false;
    for (const s of SECRET_SEQUENCE) ({ progress: p, done } = advanceSequence(p, s));
    expect(done).toBe(true);
  });
  it("resets on a wrong star", () => {
    expect(advanceSequence([0, 2], 1)).toMatchObject({ progress: [], wrong: true, done: false });
  });
});

describe("local visitor counter", () => {
  it("counts a new session once", () => {
    expect(nextVisitorCount("4", false)).toBe(5);
    expect(nextVisitorCount("5", true)).toBe(5);
    expect(nextVisitorCount(null, false)).toBe(1);
  });
  it("pads to six digits", () => {
    expect(formatOdometer(1)).toBe("000001");
  });
});
