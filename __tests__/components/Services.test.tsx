import { screen } from "@testing-library/react";
import { Services } from "@/components/Services";
import { MENTORSHIP } from "@/content/services";
import { renderWithProviders } from "../test-utils";

describe("Services", () => {
  it("renders the mentoring summary with everything the client takes away", () => {
    renderWithProviders(<Services />);

    expect(screen.getByText("bajo tu control.")).toBeInTheDocument();
    for (const outcome of MENTORSHIP.es.outcomes) {
      expect(screen.getByText(outcome.title)).toBeInTheDocument();
    }
  });

  it("links to the detail on /services", () => {
    renderWithProviders(<Services />);

    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/services");
  });
});
