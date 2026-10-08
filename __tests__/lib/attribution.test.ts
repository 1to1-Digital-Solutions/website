import { readAttribution } from "@/lib/attribution";

describe("readAttribution", () => {
  const url = (q: string) => new URL(`https://1to1digital.solutions/services${q}`);

  it("keeps the UTMs, the external referrer and the landing page", () => {
    expect(
      readAttribution(url("?utm_source=linkedin&utm_medium=post&x=1"), "https://www.google.com/")
    ).toEqual({
      utm_source: "linkedin",
      utm_medium: "post",
      referrer: "https://www.google.com/",
      landing_page: "/services",
    });
  });

  it("does not count the site itself as a source", () => {
    expect(readAttribution(url(""), "https://1to1digital.solutions/about")).toEqual({
      landing_page: "/services",
    });
  });

  it("truncates long values", () => {
    const long = "a".repeat(500);
    expect(readAttribution(url(`?utm_campaign=${long}`), "").utm_campaign).toHaveLength(200);
  });
});
