import { screen } from "@testing-library/react";
import { ServicesPage } from "@/components/services/ServicesPage";
import { MENTORSHIP } from "@/content/services";
import { renderWithProviders } from "../test-utils";

describe("ServicesPage", () => {
  it("renders the mentoring with its 4 steps and what the client takes away", () => {
    renderWithProviders(<ServicesPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Entiende e integra la IA en tu negocio."
    );
    expect(MENTORSHIP.es.steps).toHaveLength(4);
    for (const item of [...MENTORSHIP.es.steps, ...MENTORSHIP.es.outcomes]) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
    }
  });

  it("shows one public price, + VAT, paid in two halves", () => {
    renderWithProviders(<ServicesPage />);
    expect(screen.getAllByText("1.900 €").length).toBeGreaterThan(0);
    expect(screen.getByText(/2 pagos de 950 €/)).toBeInTheDocument();
  });

  it("keeps both languages in step", () => {
    const { es, en } = MENTORSHIP;
    for (const key of ["facts", "forWho", "steps", "outcomes", "proofs"] as const) {
      expect(en[key]).toHaveLength(es[key].length);
    }
  });
});
