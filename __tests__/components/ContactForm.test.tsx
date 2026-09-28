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

  it("does not preselect any answer and does not ask for a budget", () => {
    render(
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    );

    for (const name of ["projectType", "tech", "timeline", "source"]) {
      const select = document.querySelector<HTMLSelectElement>(`select[name="${name}"]`);
      expect(select).not.toBeNull();
      expect(select!.value).toBe("");
    }
    expect(document.querySelector('select[name="budget"]')).toBeNull();
    expect(screen.getByText(/horquilla orientativa para el tuyo/)).toBeInTheDocument();
  });
});
