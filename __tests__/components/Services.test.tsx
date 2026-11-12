import { screen } from "@testing-library/react";
import { Services } from "@/components/Services";
import { MENTORSHIP } from "@/content/services";
import { renderWithProviders } from "../test-utils";

describe("Services", () => {
  it("renders the mentoring summary with everything the client takes away", () => {
    renderWithProviders(<Services />);

    expect(screen.getByText("bajo tu control.")).toBeInTheDocument();
    expect(screen.getByText("para autónomos y pymes sin perfil técnico")).toBeInTheDocument();
    for (const outcome of MENTORSHIP.es.outcomes.filter((o) => !o.homeHidden)) {
      expect(screen.getByText(outcome.title)).toBeInTheDocument();
    }
  });
});
