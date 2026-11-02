import { screen } from "@testing-library/react";
import { AboutPage } from "@/components/about/AboutPage";
import { renderWithProviders } from "../test-utils";

describe("AboutPage", () => {
  it("introduces César with a single h1 and sends to contact and lists the own products", () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hola, soy César.");
    expect(screen.getByText("De dónde vengo")).toBeInTheDocument();
    expect(screen.queryByText("8 semanas")).toBeNull();
    expect(screen.getByRole("link", { name: /Hoy Entreno/ })).toHaveAttribute(
      "href",
      "https://hoy-entreno.app/"
    );
    expect(screen.getByRole("link", { name: /^Hablemos$/ })).toHaveAttribute("href", "/#contact");
  });
});
