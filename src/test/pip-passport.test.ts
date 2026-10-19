import { describe, expect, it } from "vitest";
import { addStamp, canPack, cleanRecipient, parseStamps, passportComplete, toggleIngredient } from "@/lib/pip-logic";

describe("passport", () => {
  it("completes only after all four stamps", () => {
    let s = addStamp([], "wake");
    s = addStamp(s, "compose");
    s = addStamp(s, "courier");
    expect(passportComplete(s)).toBe(false);
    expect(passportComplete(addStamp(s, "stars"))).toBe(true);
  });
  it("ignores duplicates and junk storage", () => {
    expect(addStamp(["wake"], "wake")).toEqual(["wake"]);
    expect(parseStamps("nope")).toEqual([]);
    expect(parseStamps('["stars","bogus"]')).toEqual(["stars"]);
  });
});

describe("pack a dream", () => {
  it("keeps at most two ingredients", () => {
    expect(toggleIngredient(["a", "b"], "c")).toEqual(["b", "c"]);
    expect(toggleIngredient(["a"], "a")).toEqual([]);
  });
  it("needs a name and exactly two ingredients", () => {
    expect(canPack("  ", ["a", "b"])).toBe(false);
    expect(canPack("Mimsy", ["a"])).toBe(false);
    expect(canPack("Mimsy", ["a", "b"])).toBe(true);
    expect(cleanRecipient("x".repeat(40)).length).toBe(24);
  });
});
