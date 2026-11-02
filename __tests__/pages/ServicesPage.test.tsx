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
    expect(screen.getAllByText("2.900 €").length).toBeGreaterThan(0);
    expect(screen.getByText(/2 pagos de 1.450 €/)).toBeInTheDocument();
    expect(screen.getByText(/te devuelvo íntegro lo que hayas pagado/)).toBeInTheDocument();
    expect(screen.queryByText(/mismo precio para todos/)).toBeNull();
  });

  it("says who it is not for and covers security and regulation", () => {
    renderWithProviders(<ServicesPage />);
    expect(screen.getByRole("heading", { name: "¿Para quién no es?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Seguridad y normativa" })).toBeInTheDocument();
    for (const item of MENTORSHIP.es.safety) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
    }
  });

  it("keeps both languages in step", () => {
    const { es, en } = MENTORSHIP;
    for (const key of [
      "facts",
      "forWho",
      "notFor",
      "steps",
      "outcomes",
      "safety",
      "proofs",
    ] as const) {
      expect(en[key]).toHaveLength(es[key].length);
    }
  });
});
