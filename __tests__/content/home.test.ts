import { HOME } from "@/content/home";

describe("home copy", () => {
  it("has the same shape in Spanish and English", () => {
    expect(HOME.en.stakes).toHaveLength(HOME.es.stakes.length);
    expect(HOME.en.explain).toHaveLength(HOME.es.explain.length);
    expect(Object.keys(HOME.en).sort()).toEqual(Object.keys(HOME.es).sort());
  });

  it("follows the style rules: no long dash", () => {
    expect(JSON.stringify(HOME)).not.toMatch(/—/);
  });
});
