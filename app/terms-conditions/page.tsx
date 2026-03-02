import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsConditions() {
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
          Términos y <span className="text-primary">Condiciones</span>
        </h1>

        <div className="text-foreground/80 space-y-8 text-sm leading-relaxed md:text-base">
          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">1. Introducción</h2>
            <p>
              Bienvenido a 1to1 Studio. Al acceder a nuestro sitio web y utilizar nuestros
              servicios, usted acepta estar sujeto a los siguientes términos y condiciones. Si no
              está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestros
              servicios.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">2. Propiedad Intelectual</h2>
            <p>
              Todo el código fuente original, diseños y arquitectura desarrollados bajo contrato
              serán transferidos íntegramente al cliente una vez recibido el pago final acordado.
              Hasta entonces, 1to1 Studio retiene los derechos de autor temporales que garantizan la
              seguridad de la transacción. Los repositorios serán entregados mediante GitHub u otra
              plataforma tras la aprobación final.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              3. Servicios y Entregables
            </h2>
            <p>
              Nos especializamos en Desarrollo de MVP, integraciones de Blockchain y experiencias
              3D. Los plazos y entregables específicos se acuerdan de antemano mediante un contrato
              o presupuesto detallado. Las demoras en la provisión de recursos por parte del cliente
              pueden afectar directamente a los tiempos de entrega acordados.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              4. Limitación de Responsabilidad
            </h2>
            <p>
              1to1 Studio no será responsable de ningún daño indirecto, incidental o consecuente que
              resulte del uso de nuestros productos de software o de Smart Contracts una vez
              desplegados en entornos de producción verificados y controlados por el cliente,
              incluyendo pérdida de datos o interrupciones de negocio.
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
