import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";
import { LanguageProvider } from "@/context/LanguageContext";

describe("ContactForm", () => {
  it("renders form inputs and a disabled submit button", () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cuéntame sobre tu idea/i)).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /Enviar Mensaje/i });
    expect(submit).toBeDisabled();
  });
});
