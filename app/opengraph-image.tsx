import { ImageResponse } from "next/og";

// Social card shown by Discord, X, etc. when cvrse.lol is shared.
export const alt = "curse — The last moderation bot you'll ever need.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(60% 70% at 25% 0%, rgba(139,124,246,0.35), transparent 70%)",
        }}
      >
        {/* mark */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
          <svg
            width="120"
            height="72"
            viewBox="0 0 40 24"
            fill="none"
            stroke="#8b7cf6"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: "rotate(-18deg)" }}
          >
            <path d="M7 8 14 12 7 16" />
            <path d="M33 8 26 12 33 16" />
            <circle cx="20" cy="14" r="2" fill="#8b7cf6" stroke="none" />
          </svg>
        </div>

        {/* wordmark */}
        <div style={{ display: "flex", fontSize: 132, fontWeight: 700, color: "#fafafa" }}>
          curse<span style={{ color: "#8b7cf6" }}>.</span>
        </div>

        {/* tagline */}
        <div style={{ display: "flex", marginTop: 16, fontSize: 44, color: "#a1a1aa" }}>
          The last moderation bot you&rsquo;ll ever need.
        </div>

        {/* url chip */}
        <div style={{ display: "flex", marginTop: 56, fontSize: 28, color: "#71717a" }}>
          cvrse.lol
        </div>
      </div>
    ),
    { ...size },
  );
}
