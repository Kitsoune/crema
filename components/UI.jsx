import { C } from "../utils/theme";

export function GrainOverlay() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.038,
      }}
      aria-hidden
    >
      <filter id="cg">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.73"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#cg)" />
    </svg>
  );
}

export function CupIcon({ size = 24, color = C.copper }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

export function Logo({ size = "md" }) {
  const sz = size === "lg" ? 28 : 20,
    fs = size === "lg" ? 26 : 20;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size === "lg" ? 12 : 9,
      }}
    >
      <CupIcon size={sz} color={C.copper} />
      <span
        style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: fs,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: C.foam,
        }}
      >
        CREMA
      </span>
    </div>
  );
}

export function TopBar({ onBack, onNew, showBack, showNew }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "22px 44px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${C.mahogany}44`,
        background: `${C.espresso}dd`,
        backdropFilter: "blur(20px)",
      }}
    >
      {showBack ? (
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: C.caramel,
            fontSize: 13,
            cursor: "pointer",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "'EB Garamond',Georgia,serif",
            padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = C.foam)}
          onMouseLeave={(e) => (e.target.style.color = C.caramel)}
        >
          ← Home
        </button>
      ) : (
        <div />
      )}
      <Logo />
      {showNew ? (
        <button
          onClick={onNew}
          className="btn-ghost"
          style={{ padding: "8px 22px", fontSize: 12 }}
        >
          New Image
        </button>
      ) : (
        <div />
      )}
    </nav>
  );
}
