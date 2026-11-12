import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio web y de contratación de la mentoría de IA de 1to1 Digital Solutions: servicio, precio, forma de pago, garantía y responsabilidad.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditions() {
  return (
    <main className="bg-background relative min-h-screen w-full overflow-hidden px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-foreground/70 hover:text-primary mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Volver a Inicio
        </Link>

        <h1 className="font-display mb-8 text-4xl font-bold tracking-tight">
          Términos y <span className="text-primary">Condiciones</span>
        </h1>

        <div className="text-foreground/80 space-y-8 text-sm leading-relaxed md:text-base">
          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              1. Datos Identificativos del Titular
            </h2>
            <p>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
              Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular de este
              sitio web es:
            </p>
            <ul className="text-foreground/70 mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground/90">Razón social:</strong> 1TO1 DIGITAL SOLUTIONS
                SL.
              </li>
              <li>
                <strong className="text-foreground/90">NIF:</strong> B27630136
              </li>
              <li>
                <strong className="text-foreground/90">Domicilio social:</strong> Avda. de Buendía,
                11, 19005, Guadalajara, España
              </li>
              <li>
                <strong className="text-foreground/90">Correo electrónico:</strong>{" "}
                <a
                  href="mailto:info@1to1digital.solutions"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  info@1to1digital.solutions
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">2. Objeto</h2>
            <p>
              Estas condiciones regulan el uso de este sitio web y la contratación de la mentoría de
              inteligencia artificial que ofrece 1TO1 DIGITAL SOLUTIONS SL (en adelante, &quot;1to1
              Digital Solutions&quot;) a autónomos y empresas. Al navegar por el sitio o contratar
              la mentoría, usted acepta estas condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">3. El servicio</h2>
            <p>
              La mentoría dura 8 semanas, con una sesión online de 1 hora a la semana por
              videollamada. Incluye un plan adaptado a la empresa, la puesta en marcha de un sistema
              y de las primeras herramientas, la formación del cliente y de su equipo, y una
              política de uso seguro de la IA por escrito. El alcance concreto de cada mentoría se
              recoge en el plan que se envía por escrito antes de empezar.
            </p>
            <p className="mt-3">
              La primera reunión, de 15 minutos, es gratuita y no obliga a contratar.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">4. Contratación</h2>
            <p>
              Escribirnos por LinkedIn o por correo electrónico desde este sitio web es una
              solicitud de información, sin coste alguno. La mentoría sólo se considera contratada
              cuando ambas partes firman el contrato correspondiente. Si algo de lo que dice el
              contrato difiere de estas condiciones, prevalece el contrato.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              5. Precio y forma de pago
            </h2>
            <p>
              El precio de la mentoría es de <strong>2.500 € más el IVA correspondiente</strong>,
              igual para todos los clientes. Se paga en dos plazos de 1.250 € (más IVA): el primero
              al firmar el contrato y el segundo después de la cuarta sesión. Cada pago se factura
              por separado.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">6. Garantía</h2>
            <p>
              Si después de la segunda sesión el cliente no está conforme o considera que la
              mentoría no le está sirviendo, puede comunicarlo por escrito antes de la tercera
              sesión y se le devolverá íntegro el importe pagado. En ese caso, la mentoría termina
              en ese momento.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">7. Sesiones</h2>
            <p>
              Las fechas de las sesiones se acuerdan entre ambas partes. Si alguna de las partes no
              puede asistir, la sesión se cambia a otra fecha de mutuo acuerdo.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              8. Obligaciones del cliente
            </h2>
            <p>
              El cliente se compromete a facilitar la información necesaria sobre su forma de
              trabajar y a dedicar el tiempo acordado. Las herramientas de terceros que se usen
              durante la mentoría (por ejemplo, Claude o ChatGPT) se rigen por las condiciones de
              sus proveedores, y su suscripción, si el cliente decide contratarla, corre a su cargo.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">9. Propiedad intelectual</h2>
            <p>
              Las herramientas, la documentación y la política de uso seguro creadas para el cliente
              durante la mentoría son del cliente una vez abonado el precio. 1to1 Digital Solutions
              conserva los conocimientos, métodos y materiales generales que usa en todas sus
              mentorías.
            </p>
            <p className="mt-3">
              Los textos, diseños y elementos de este sitio web pertenecen a 1to1 Digital Solutions
              y no pueden reproducirse sin autorización.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">10. Confidencialidad</h2>
            <p>
              La información del negocio del cliente a la que se tenga acceso durante la mentoría se
              trata como confidencial y sólo se usa para prestar el servicio. El tratamiento de los
              datos personales se rige por la{" "}
              <Link
                href="/privacy-policy"
                className="text-primary underline-offset-2 hover:underline"
              >
                política de privacidad
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              11. Limitación de responsabilidad
            </h2>
            <p>
              La mentoría es un servicio de acompañamiento y formación. 1to1 Digital Solutions no
              garantiza resultados económicos concretos, y el uso que el cliente haga de las
              herramientas una vez terminada la mentoría es responsabilidad suya. Las referencias a
              normativa (como el RGPD o el Reglamento Europeo de IA) tienen carácter informativo y
              no constituyen asesoramiento legal.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              12. Legislación aplicable
            </h2>
            <p>
              Estas condiciones se rigen por la legislación española. Para cualquier controversia,
              las partes se someten a los juzgados y tribunales que correspondan conforme a la ley.
            </p>
          </section>

          <p className="text-foreground/70 border-foreground/10 border-t pt-8 text-xs">
            Última actualización: Noviembre 2026
          </p>
        </div>
      </div>
    </main>
  );
}
