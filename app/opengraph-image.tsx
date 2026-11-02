import { ImageResponse } from "next/og";

export const alt =
  "1to1 Digital Solutions: entiende e integra la IA en tu negocio, de forma segura";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRIMARY = "#3ff8ec";
const BACKGROUND = "#1e1e21";
const FOREGROUND = "#ededed";
const MUTED = "rgba(237, 237, 237, 0.6)";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: BACKGROUND,
        backgroundImage: `radial-gradient(circle at 20% 100%, ${PRIMARY}33, transparent 50%), radial-gradient(circle at 80% 0%, ${PRIMARY}22, transparent 50%)`,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: PRIMARY,
          }}
        />
        <span
          style={{
            color: MUTED,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          1to1 Digital Solutions
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <h1
          style={{
            color: FOREGROUND,
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 800,
            margin: 0,
            maxWidth: 1000,
          }}
        >
          Entiende e integra la <span style={{ color: PRIMARY }}>IA</span>
          <br />
          en tu negocio, de forma <span style={{ color: PRIMARY }}>segura</span>.
        </h1>
        <p
          style={{
            color: MUTED,
            fontSize: 32,
            margin: 0,
            fontWeight: 500,
          }}
        >
          Mentoría online de 8 semanas · 1.900 € + IVA
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: MUTED,
          fontSize: 24,
          fontWeight: 500,
        }}
      >
        <span>Para pymes y autónomos</span>
        <span>1to1digital.solutions</span>
      </div>
    </div>,
    { ...size }
  );
}
