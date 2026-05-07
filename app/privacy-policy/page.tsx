import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          Política de <span className="text-primary">Privacidad</span>
        </h1>

        <div className="text-foreground/80 space-y-8 text-sm leading-relaxed md:text-base">
          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              1. Recopilación de Información
            </h2>
            <p>
              En 1to1 Digital Solutions valoramos enormemente su privacidad. Solo recopilamos información
              personal (como nombre, correo electrónico, presupuesto y detalles del proyecto) a
              través de nuestros formularios de contacto, con el único fin de comunicarnos y
              proporcionar los presupuestos o servicios solicitados.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              2. Uso de Datos y Contacto
            </h2>
            <p>
              Los datos que nos proporciona nunca serán vendidos, alquilados ni compartidos de forma
              masiva con terceros sin su consentimiento explícito, a menos que sea estrictamente
              necesario para el cumplimiento de una obligación legal o para la ejecución de
              herramientas de infraestructura imprescindibles (ej. servidores de base de datos
              cifrados).
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              3. Tecnologías de Rastreo e IP
            </h2>
            <p>
              Nuestro sitio web utiliza tecnologías modernas y eficientes (Three.js/GSAP). Podemos
              utilizar cookies técnicas que son estrictamente necesarias para el funcionamiento del
              sistema, como almacenar su preferencia de idioma entre sesiones. No utilizamos
              rastreadores publicitarios intrusivos ni vendemos métricas de su interacción con
              nuestro lienzo 3D.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              4. Sus Derechos Digitales
            </h2>
            <p>
              Usted tiene derecho pleno a solicitar el acceso, la rectificación o la eliminación
              total de cualquier información personal que podamos tener sobre usted en nuestras
              bases de datos en cualquier momento. Puede ejercer este derecho contactándonos
              directamente a través de nuestro correo electrónico oficial.
            </p>
          </section>

          <p className="text-foreground/50 border-foreground/10 border-t pt-8 text-xs">
            Última actualización: Noviembre 2026
          </p>
        </div>
      </div>
    </main>
  );
}
