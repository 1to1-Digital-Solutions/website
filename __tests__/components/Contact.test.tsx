import { screen } from "@testing-library/react";
import { Contact, CONTACT_EMAIL, LINKEDIN_URL } from "@/components/Contact";
import { renderWithProviders } from "../test-utils";

describe("Contact", () => {
  it("offers email and LinkedIn instead of a form", () => {
    const { container } = renderWithProviders(<Contact />);

    expect(container.querySelector("form")).toBeNull();
    const email = screen.getByRole("link", { name: /Escríbeme un correo/ });
    expect(email.getAttribute("href")).toMatch(new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=`));
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", LINKEDIN_URL);
    expect(screen.getByText(CONTACT_EMAIL)).toBeInTheDocument();
  });
});
