import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "@/components/FAQ";
import { LanguageProvider } from "@/context/LanguageContext";

describe("FAQ", () => {
  it("renders questions and toggles answers", () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );

    // Check first question
    const q1 = screen.getByText("¿Necesito saber de tecnología?");
    expect(q1).toBeInTheDocument();

    // Answer to Q1 should be visible
    const a1 = screen.getByText(/pensada para negocios sin perfil tecnológico/i);
    expect(a1).toBeInTheDocument();

    // Click q2 to open it
    const q2 = screen.getByText("¿Sirve también para autónomos?");
    fireEvent.click(q2);

    // Q2 answer becomes visible (testing presence in document)
    const a2 = screen.getByText(/Un autónomo es un negocio de una persona/i);
    expect(a2).toBeInTheDocument();
  });
});
