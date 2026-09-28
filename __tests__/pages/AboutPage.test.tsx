import { screen } from "@testing-library/react";
import { AboutPage } from "@/components/about/AboutPage";
import { renderWithProviders } from "../test-utils";

describe("AboutPage", () => {
  it("introduces César with a single h1 and sends to the contact form", () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hola, soy César.");
    expect(screen.getByText("De dónde vengo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Hablemos/ })).toHaveAttribute("href", "/#contact");
  });
});
