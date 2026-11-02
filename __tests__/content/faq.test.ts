import { FAQ } from "@/content/faq";

describe("FAQ content", () => {
  it("has six questions in both languages", () => {
    expect(FAQ.es.items).toHaveLength(6);
    expect(FAQ.en.items).toHaveLength(FAQ.es.items.length);
  });
});
