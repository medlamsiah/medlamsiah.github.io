import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mohamed Lamsiah — Développeur Full-Stack Web & Mobile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#07090c",
        color: "#f4f7fb",
        padding: "72px 82px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          right: -80,
          top: -120,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(94,232,210,.38) 0%, rgba(94,232,210,0) 68%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 16,
              background: "#5ee8d2",
            }}
          />
          <span style={{ fontSize: 24, letterSpacing: 5 }}>PORTFOLIO 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3 }}>
            Mohamed Lamsiah
          </span>
          <span style={{ fontSize: 38, color: "#a5b4c4", marginTop: 14 }}>
            Développeur Full-Stack Web & Mobile
          </span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 22, color: "#5ee8d2" }}>
          <span>React</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>React Native</span>
          <span>·</span>
          <span>Node.js</span>
          <span>·</span>
          <span>Go</span>
        </div>
      </div>
    </div>,
    size,
  );
}
