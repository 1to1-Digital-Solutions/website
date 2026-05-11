import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { ConsentProvider } from "@/context/ConsentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ConsentProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ConsentProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";
