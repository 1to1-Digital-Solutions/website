import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo trata 1to1 Digital Solutions los datos personales recabados a través del sitio web: responsable, finalidades, encargados, transferencias internacionales y derechos del interesado.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-background relative min-h-screen w-full overflow-hidden px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-foreground/70 hover:text-primary mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Volver a Inicio
        </Link>

        <h1 className="font-outfit mb-8 text-4xl font-bold tracking-tight">
          Política de <span className="text-primary">Privacidad</span>
        </h1>

        <div className="text-foreground/80 space-y-8 text-sm leading-relaxed md:text-base">
          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              1. Responsable del Tratamiento
            </h2>
            <p>
              De acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de
              Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD), le
              informamos de que el responsable del tratamiento de los datos personales recogidos a
              través de este sitio web es:
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
                <strong className="text-foreground/90">Domicilio:</strong> Avda. de Buendía, 11,
                19005, Guadalajara, España
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
            <h2 className="text-foreground mb-3 text-xl font-semibold">2. Datos que recopilamos</h2>
            <p>
              A través del formulario de contacto de este sitio web recopilamos exclusivamente los
              datos que usted nos facilita voluntariamente:
            </p>
            <ul className="text-foreground/70 mt-3 list-disc space-y-1 pl-5">
              <li>Nombre</li>
              <li>Dirección de correo electrónico</li>
              <li>Tipo de proyecto y rango de presupuesto seleccionados</li>
              <li>Contenido del mensaje que nos envía</li>
              <li>
                Evidencia de la aceptación de esta Política de Privacidad (marca temporal y estado
                de la casilla)
              </li>
            </ul>
            <p className="mt-3">
              No recopilamos datos especiales (categorías sensibles del Art. 9 RGPD) y le rogamos
              que no los incluya en el campo de mensaje.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              3. Finalidades y base legal del tratamiento
            </h2>
            <p>Tratamos sus datos con las siguientes finalidades:</p>
            <ul className="text-foreground/70 mt-3 list-disc space-y-1 pl-5">
              <li>
                Atender su consulta o solicitud, elaborar presupuestos y gestionar la relación
                precontractual y, en su caso, contractual.
              </li>
              <li>
                Llevar un registro interno de oportunidades comerciales (CRM-lite), conservando el
                histórico de contactos.
              </li>
            </ul>
            <p className="mt-3">
              La <strong>base legal</strong> del tratamiento es su <strong>consentimiento</strong>{" "}
              expreso al marcar la casilla de aceptación de esta Política de Privacidad en el
              formulario (Art. 6.1.a RGPD), así como la ejecución de medidas precontractuales a
              petición del interesado (Art. 6.1.b RGPD) cuando su consulta tenga por objeto valorar
              la contratación de nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              4. Encargados del tratamiento
            </h2>
            <p>
              Para prestar el servicio utilizamos los siguientes proveedores tecnológicos
              (encargados del tratamiento según el Art. 28 RGPD), que tratan sus datos únicamente
              siguiendo nuestras instrucciones:
            </p>
            <ul className="text-foreground/70 mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground/90">Vercel Inc.</strong>: hosting y entrega del
                sitio web.
              </li>
              <li>
                <strong className="text-foreground/90">Resend (Resend, Inc.)</strong>: envío del
                correo electrónico de aviso al responsable.
              </li>
              <li>
                <strong className="text-foreground/90">Google LLC (Google Workspace)</strong>:
                gestión del correo electrónico recibido y almacenamiento del registro de contactos
                en Google Sheets.
              </li>
              <li>
                <strong className="text-foreground/90">Google LLC (Google Analytics 4)</strong>:
                análisis estadístico y agregado del uso del sitio web. Únicamente se activa cuando
                el usuario otorga consentimiento previo en el banner de cookies y puede revocarse en
                cualquier momento. Configurado con anonimización de IP y sin señales publicitarias.
              </li>
            </ul>
            <p className="mt-3">
              No cedemos, vendemos ni alquilamos sus datos a terceros distintos de los anteriores
              salvo obligación legal.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              5. Transferencias internacionales
            </h2>
            <p>
              Vercel, Resend y Google son proveedores con sede en Estados Unidos. La transferencia
              de sus datos fuera del Espacio Económico Europeo se realiza al amparo de las
              salvaguardas previstas por el RGPD: <strong>EU-US Data Privacy Framework</strong> (en
              el que dichos proveedores se han certificado) y/o las{" "}
              <strong>Cláusulas Contractuales Tipo</strong> aprobadas por la Comisión Europea, que
              garantizan un nivel de protección adecuado.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">6. Plazo de conservación</h2>
            <p>
              Conservaremos sus datos durante el tiempo necesario para gestionar su consulta y, en
              caso de que se inicie una relación contractual, durante toda la vigencia de la misma y
              los plazos legales de prescripción aplicables (en particular, los previstos en la
              normativa mercantil y fiscal). Si no llega a formalizarse contrato, los datos se
              conservarán por un máximo de <strong>2 años</strong> desde el último contacto, salvo
              que usted solicite antes su supresión.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              7. Tecnologías de rastreo e IP
            </h2>
            <p>
              Nuestro sitio web utiliza únicamente cookies estrictamente necesarias para su
              funcionamiento, como la conservación de su preferencia de idioma o el registro de su
              consentimiento de cookies. No utilizamos rastreadores publicitarios ni elaboramos
              perfiles. Puede consultar el detalle en nuestra{" "}
              <Link
                href="/cookie-policy"
                className="text-primary underline-offset-2 hover:underline"
              >
                Política de Cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">8. Sus derechos</h2>
            <p>Como interesado, le asisten los siguientes derechos:</p>
            <ul className="text-foreground/70 mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground/90">Acceso</strong> a sus datos personales.
              </li>
              <li>
                <strong className="text-foreground/90">Rectificación</strong> de datos inexactos.
              </li>
              <li>
                <strong className="text-foreground/90">Supresión</strong> (&laquo;derecho al
                olvido&raquo;).
              </li>
              <li>
                <strong className="text-foreground/90">Oposición</strong> al tratamiento.
              </li>
              <li>
                <strong className="text-foreground/90">Limitación</strong> del tratamiento.
              </li>
              <li>
                <strong className="text-foreground/90">Portabilidad</strong> de sus datos a otro
                responsable.
              </li>
              <li>
                <strong className="text-foreground/90">Retirar el consentimiento</strong> en
                cualquier momento, sin que ello afecte a la licitud del tratamiento previo.
              </li>
            </ul>
            <p className="mt-3">
              Puede ejercerlos enviándonos una solicitud a{" "}
              <a
                href="mailto:info@1to1digital.solutions"
                className="text-primary underline-offset-2 hover:underline"
              >
                info@1to1digital.solutions
              </a>{" "}
              indicando el derecho que desea ejercer y adjuntando, si fuese necesario, copia de un
              documento que acredite su identidad. Responderemos en el plazo de un mes.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-xl font-semibold">
              9. Reclamaciones ante la autoridad de control
            </h2>
            <p>
              Si considera que sus datos no están siendo tratados conforme a la normativa, puede
              presentar una reclamación ante la{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                Agencia Española de Protección de Datos (AEPD)
              </a>
              .
            </p>
          </section>

          <p className="text-foreground/70 border-foreground/10 border-t pt-8 text-xs">
            Última actualización: Mayo 2026
          </p>
        </div>
      </div>
    </main>
  );
}
