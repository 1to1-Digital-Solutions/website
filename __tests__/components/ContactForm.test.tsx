import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";
import { LanguageProvider } from "@/context/LanguageContext";

describe("ContactForm", () => {
  it("renders form inputs and handles submission", async () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    // Form elements
    const nameInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const msgInput = screen.getByLabelText(/Cuéntame sobre tu idea/i);

    expect(nameInput).toBeInTheDocument();

    // Fill out form
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(msgInput, { target: { value: "Test message" } });

    // Submit form (wrap in act implicitly by using fireEvent)
    fireEvent.submit(screen.getByRole("button", { name: /Enviar Mensaje/i }));

    // Should change button text to loading state
    expect(screen.getByRole("button", { name: /Enviando\.\.\./i })).toBeInTheDocument();

    // After a timeout (1500ms in component), it shows success message
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: /¡Mensaje Enviado!/i })).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
