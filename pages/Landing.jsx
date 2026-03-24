import { useState, useEffect } from "react";
import { C } from "../utils/theme";
import { TopBar, Logo } from "../components/UI";

export function Landing({ onEnter }) {
  const [in_, setIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setIn(true), 80);
  }, []);
  const anim = (delay) => ({
    opacity: in_ ? 1 : 0,
    transform: in_ ? "translateY(0)" : "translateY(28px)",
    transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.espresso,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TopBar />
      <div
        style={{
          position: "fixed",
          top: "28%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800,
          height: 600,
          background: `radial-gradient(ellipse, ${C.roast}99 0%, transparent 72%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 580,
          height: 580,
          borderRadius: "50%",
          border: `1px solid ${C.mahogany}3A`,
          pointerEvents: "none",
          animation: "ringPulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 390,
          height: 390,
          borderRadius: "50%",
          border: `1px solid ${C.mahogany}26`,
          pointerEvents: "none",
          animation: "ringPulse 4s ease-in-out infinite 1.8s",
        }}
      />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={anim(0.12)}>
          <p
            className="overline"
            style={{ marginBottom: 28, color: C.caramel }}
          >
            Latte Art · Image Transformation
          </p>
        </div>
        <div style={anim(0.28)}>
          <h1
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(58px,10.5vw,116px)",
              fontWeight: 700,
              lineHeight: 0.9,
              color: C.foam,
              letterSpacing: "-0.025em",
              marginBottom: 8,
            }}
          >
            Any image,
          </h1>
          <h1
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(58px,10.5vw,116px)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 0.9,
              color: "transparent",
              WebkitTextStroke: `1.5px ${C.mid}`,
              letterSpacing: "-0.025em",
              marginBottom: 52,
            }}
          >
            as latte art.
          </h1>
        </div>
        <div style={anim(0.46)}>
          <p
            style={{
              fontFamily: "'EB Garamond',Georgia,serif",
              fontSize: 20,
              lineHeight: 1.8,
              color: C.caramel,
              maxWidth: 420,
              margin: "0 auto 52px",
              fontStyle: "italic",
            }}
          >
            Upload any photograph. Watch it transform into the ephemeral art of
            steamed milk and espresso.
          </p>
          <button className="btn-copper" onClick={onEnter}>
            Begin Brewing
          </button>
        </div>
      </main>

      <section
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 40px 110px",
          ...anim(0.65),
        }}
      >
        <div style={{ borderTop: `1px solid ${C.mahogany}55`, paddingTop: 68 }}>
          <p className="overline" style={{ marginBottom: 52 }}>
            The Process
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 40,
            }}
          >
            {[
              {
                n: "01",
                t: "Upload",
                d: "Drop any image — portrait, illustration, photo, logo.",
              },
              {
                n: "02",
                t: "Brew",
                d: "The algorithm reads edges, remaps tones to espresso and foam.",
              },
              {
                n: "03",
                t: "Pour",
                d: "Your image surfaces as latte art, ready to download.",
              },
            ].map((s) => (
              <div key={s.n}>
                <p
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: 50,
                    color: C.mahogany,
                    marginBottom: 16,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: 22,
                    color: C.foam,
                    marginBottom: 10,
                  }}
                >
                  {s.t}
                </p>
                <p
                  style={{
                    fontFamily: "'EB Garamond',Georgia,serif",
                    fontSize: 16,
                    color: C.caramel,
                    lineHeight: 1.7,
                  }}
                >
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${C.mahogany}33`,
          padding: "26px 44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <p className="overline" style={{ color: C.mahogany }}>
          Latte Art Generator
        </p>
      </footer>
    </div>
  );
}
