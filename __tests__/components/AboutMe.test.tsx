import { screen } from "@testing-library/react";
import { AboutMe } from "@/components/AboutMe";
import { renderWithProviders } from "../test-utils";

describe("AboutMe", () => {
  it("renders content correctly", () => {
    renderWithProviders(<AboutMe />);

    expect(screen.getByText("¿Quién está")).toBeInTheDocument();
    expect(screen.getByText("detrás?")).toBeInTheDocument();
    expect(screen.getByText(/Hola, soy César/i)).toBeInTheDocument();
  });
});
