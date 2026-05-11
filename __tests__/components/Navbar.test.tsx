import { fireEvent, screen } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";
import { renderWithProviders } from "../test-utils";

// Mock Next.js Link
jest.mock("next/link", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockLink = ({ children, href, className, onClick }: any) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Navbar", () => {
  it("renders logo and navigation links", () => {
    renderWithProviders(<Navbar />);

    // Brand is rendered as an image with alt text
    expect(screen.getByAltText(/1to1 Digital Solutions/i)).toBeInTheDocument();

    // In Spanish by default
    const links = screen.queryAllByText("Servicios");
    expect(links.length).toBeGreaterThan(0);
  });

  it("toggles language when globe button is clicked", () => {
    renderWithProviders(<Navbar />);

    // Two language toggle buttons present (desktop / mobile) — default lang is ES,
    // so aria-label is "Cambiar a inglés"
    const langButtons = screen.getAllByRole("button", { name: /cambiar a inglés/i });

    fireEvent.click(langButtons[0]);

    expect(screen.queryAllByText("Services").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Servicios").length).toBe(0);
  });
});
