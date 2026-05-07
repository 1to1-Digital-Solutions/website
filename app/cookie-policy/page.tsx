import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | 1to1 Digital Solutions",
  description: "Learn how 1to1 Digital Solutions uses cookies and how you can control them.",
};

export default function CookiePolicy() {
  return (
    <main className="bg-background relative min-h-screen w-full overflow-hidden px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-foreground/60 hover:text-primary mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Volver a Inicio
        </Link>

        <h1 className="font-outfit mb-8 text-4xl font-bold tracking-tight">
          Política de <span className="text-primary">Cookies</span>
        </h1>

        <div className="text-foreground/80 space-y-8 text-sm leading-relaxed md:text-base">
          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web almacena en su dispositivo
              (ordenador, tableta o móvil) cuando lo visita. Permiten que el sitio recuerde sus
              acciones y preferencias durante un periodo de tiempo, para que no tenga que volver a
              introducirlas cada vez que visite el sitio o navegue de una página a otra.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              2. ¿Qué cookies utilizamos?
            </h2>
            <div className="space-y-4">
              <div className="border-foreground/10 rounded-xl border p-4">
                <h3 className="text-foreground mb-1 font-semibold">Cookies estrictamente necesarias</h3>
                <p className="text-foreground/70 text-sm">
                  Son esenciales para el funcionamiento del sitio. Sin ellas, servicios como la
                  navegación entre secciones o el guardado de preferencias de idioma no funcionarían.
                  No requieren consentimiento y no pueden desactivarse.
                </p>
                <ul className="text-foreground/60 mt-2 list-disc pl-5 text-xs space-y-1">
                  <li><strong className="text-foreground/80">1to1_cookie_consent</strong> — Almacena tu preferencia de consentimiento de cookies. Duración: 1 año.</li>
                  <li><strong className="text-foreground/80">lang_preference</strong> — Guarda el idioma seleccionado (ES/EN). Duración: sesión.</li>
                </ul>
              </div>

              <div className="border-foreground/10 rounded-xl border p-4">
                <h3 className="text-foreground mb-1 font-semibold">Cookies analíticas (opcionales)</h3>
                <p className="text-foreground/70 text-sm">
                  Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando
                  información de forma anónima. Solo se activan si aceptas todas las cookies.
                </p>
                <ul className="text-foreground/60 mt-2 list-disc pl-5 text-xs space-y-1">
                  <li><strong className="text-foreground/80">_ga, _ga_*</strong> — Google Analytics. Miden el tráfico y comportamiento de navegación de forma anonimizada. Duración: 2 años.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              3. ¿Cómo controlar las cookies?
            </h2>
            <p>
              Puedes gestionar o eliminar las cookies en cualquier momento desde la configuración de
              tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar a la
              funcionalidad del sitio. A continuación encontrarás instrucciones para los navegadores
              más comunes:
            </p>
            <ul className="text-foreground/70 mt-3 list-disc pl-5 space-y-1">
              <li>
                <strong className="text-foreground/90">Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.
              </li>
              <li>
                <strong className="text-foreground/90">Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio.
              </li>
              <li>
                <strong className="text-foreground/90">Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web.
              </li>
              <li>
                <strong className="text-foreground/90">Edge:</strong> Configuración → Cookies y permisos del sitio.
              </li>
            </ul>
            <p className="mt-4">
              También puedes retirar tu consentimiento en cualquier momento borrando las cookies de
              tu navegador. La próxima vez que visites el sitio, verás de nuevo el banner de
              consentimiento.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              4. Transferencias internacionales
            </h2>
            <p>
              Algunos proveedores de servicios analíticos (como Google Analytics) pueden transferir
              datos a servidores ubicados fuera del Espacio Económico Europeo. Estas transferencias
              están cubiertas por las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea,
              garantizando un nivel de protección adecuado.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">5. Base legal (RGPD)</h2>
            <p>
              De conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley de
              Servicios de la Sociedad de la Información (LSSI), el uso de cookies no estrictamente
              necesarias requiere tu consentimiento previo e informado. Puedes otorgar o revocar
              dicho consentimiento en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">6. Contacto</h2>
            <p>
              Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos a través del{" "}
              <Link href="/#contact" className="text-primary hover:underline underline-offset-2">
                formulario de contacto
              </Link>{" "}
              o consultar nuestra{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-2">
                Política de Privacidad
              </Link>
              .
            </p>
          </section>

          <p className="text-foreground/50 border-foreground/10 border-t pt-8 text-xs">
            Última actualización: Marzo 2026
          </p>
        </div>
      </div>
    </main>
  );
}
