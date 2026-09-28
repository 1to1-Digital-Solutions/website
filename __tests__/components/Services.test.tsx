import { screen } from "@testing-library/react";
import { Services } from "@/components/Services";
import { SERVICES } from "@/content/services";
import { renderWithProviders } from "../test-utils";

describe("Services", () => {
  it("renders the summary with every service", () => {
    renderWithProviders(<Services />);

    expect(screen.getByText("Lo que")).toBeInTheDocument();
    expect(screen.getByText("hacemos.")).toBeInTheDocument();

    for (const service of SERVICES) {
      expect(screen.getByText(service.es.title)).toBeInTheDocument();
    }
  });

  it("links each card to its section on /services", () => {
    renderWithProviders(<Services />);

    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    for (const service of SERVICES) {
      expect(hrefs).toContain(`/services#${service.slug}`);
    }
    expect(hrefs).toContain("/services");
  });
});
