import { screen } from "@testing-library/react";
import { Services } from "@/components/Services";
import { renderWithProviders } from "../test-utils";

describe("Services", () => {
  it("renders section title and all cards", () => {
    renderWithProviders(<Services />);

    expect(screen.getByText("Lo Que")).toBeInTheDocument();
    expect(screen.getByText("Hacemos.")).toBeInTheDocument();

    expect(screen.getByText("Desarrollo de MVP")).toBeInTheDocument();
    expect(screen.getByText("Integración Blockchain")).toBeInTheDocument();
    expect(screen.getByText("Realidad Mixta y 3D")).toBeInTheDocument();
    expect(screen.getByText("Arquitectura y Escalabilidad")).toBeInTheDocument();
  });
});
