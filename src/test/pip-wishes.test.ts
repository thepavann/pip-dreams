import { describe, expect, it } from "vitest";
import { addWish, jarLabel, parseWishes } from "@/lib/pip-logic";
describe("wish pad", () => {
  it("ignores empty wishes", () => expect(addWish([], "A", "   ")).toEqual([]));
  it("caps at 12 and 80 chars", () => {
    let l: ReturnType<typeof addWish> = [];
    for (let i = 0; i < 15; i++) l = addWish(l, "", "x".repeat(100));
    expect(l).toHaveLength(12);
    expect(l[0]!.text).toHaveLength(80);
    expect(l[0]!.from).toBe("A sleepy visitor");
  });
  it("survives bad storage", () => expect(parseWishes("{bad")).toEqual([]));
  it("jar unlocks at 3", () => {
    expect(jarLabel(2)).toBe("2 / 3 stars caught");
    expect(jarLabel(3)).toBe("Starlight Harvester!");
  });
});
