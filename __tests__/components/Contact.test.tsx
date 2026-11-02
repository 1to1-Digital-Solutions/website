import { screen } from "@testing-library/react";
import { Contact, CONTACT_EMAIL, LINKEDIN_URL } from "@/components/Contact";
import { renderWithProviders } from "../test-utils";

describe("Contact", () => {
  it("puts LinkedIn first and keeps email, with no form", () => {
    const { container } = renderWithProviders(<Contact />);

    expect(container.querySelector("form")).toBeNull();
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", LINKEDIN_URL);
    const email = screen.getByRole("link", { name: /Prefiero el correo/ });
    expect(email.getAttribute("href")).toMatch(new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=`));
    expect(screen.getByRole("link", { name: /Hablemos por LinkedIn/ })).toBeInTheDocument();
    expect(screen.getByText(CONTACT_EMAIL)).toBeInTheDocument();
  });
});
