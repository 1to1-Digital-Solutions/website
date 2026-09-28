import { readAttribution } from "@/lib/attribution";

describe("readAttribution", () => {
  const url = (q: string) => new URL(`https://1to1digital.solutions/services${q}`);

  it("se queda con las UTM, la procedencia externa y la página de entrada", () => {
    expect(
      readAttribution(url("?utm_source=linkedin&utm_medium=post&x=1"), "https://www.google.com/")
    ).toEqual({
      utm_source: "linkedin",
      utm_medium: "post",
      referrer: "https://www.google.com/",
      landing_page: "/services",
    });
  });

  it("no cuenta como origen venir del propio sitio", () => {
    expect(readAttribution(url(""), "https://1to1digital.solutions/about")).toEqual({
      landing_page: "/services",
    });
  });

  it("recorta los valores largos", () => {
    const long = "a".repeat(500);
    expect(readAttribution(url(`?utm_campaign=${long}`), "").utm_campaign).toHaveLength(200);
  });
});
