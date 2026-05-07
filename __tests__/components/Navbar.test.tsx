import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href, className, onClick }: any) => {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  };
});

describe("Navbar", () => {
  it("renders logo and navigation links", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    expect(screen.getAllByText(/1to1 Digital Solutions/i)[0]).toBeInTheDocument();

    // In Spanish by default
    const links = screen.queryAllByText("Servicios");
    expect(links.length).toBeGreaterThan(0);
  });

  it("toggles language when globe button is clicked", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    // Two globe buttons present (desktop / mobile)
    const langButtons = screen.getAllByRole("button", { name: /es/i });

    // Click desktop toggle
    fireEvent.click(langButtons[0]);

    // After clicking, language should toggle to EN and "Services" should appear instead of "Servicios"
    expect(screen.queryAllByText("Services").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Servicios").length).toBe(0);
  });
});
