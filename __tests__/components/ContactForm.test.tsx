import { render, screen, fireEvent } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";
import { LanguageProvider } from "@/context/LanguageContext";

describe("ContactForm", () => {
  it("renders form inputs and gates submit on privacy consent", () => {
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

    const privacy = screen.getByRole("checkbox");
    fireEvent.click(privacy);
    expect(submit).not.toBeDisabled();

    fireEvent.click(privacy);
    expect(submit).toBeDisabled();
  });
});
