import { screen } from "@testing-library/react";
import { ServicesPage } from "@/components/services/ServicesPage";
import { SERVICES } from "@/content/services";
import { renderWithProviders } from "../test-utils";

describe("ServicesPage", () => {
  it("renders one section per service, reachable from the index", () => {
    const { container } = renderWithProviders(<ServicesPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Lo que hacemos.");
    for (const service of SERVICES) {
      // The home page card links to /services#slug: the anchor has to exist.
      expect(container.querySelector(`#${service.slug}`)).not.toBeNull();
      expect(screen.getByRole("heading", { level: 3, name: service.es.title })).toBeInTheDocument();
    }
  });

  it("keeps both languages in step", () => {
    for (const service of SERVICES) {
      expect(service.en.deliverables).toHaveLength(service.es.deliverables.length);
      expect(Boolean(service.en.proof)).toBe(Boolean(service.es.proof));
    }
  });
});
