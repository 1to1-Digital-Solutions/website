import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLanguage, translations } from "@/context/LanguageContext";

const TestComponent = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="translated">{t("navServices")}</span>
      <button onClick={() => setLang("en")}>Set EN</button>
      <button onClick={() => setLang("es")}>Set ES</button>
    </div>
  );
};

describe("LanguageContext", () => {
  it("provides default spanish language and translations", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("lang")).toHaveTextContent("es");
    expect(screen.getByTestId("translated")).toHaveTextContent(translations.es.navServices);
  });

  it("allows language switching", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    act(() => {
      screen.getByText("Set EN").click();
    });

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("translated")).toHaveTextContent(translations.en.navServices);
  });
});
