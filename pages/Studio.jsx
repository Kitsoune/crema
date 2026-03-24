import { useState, useRef, useCallback } from "react";
import { C } from "../utils/theme";
import { TopBar, CupIcon } from "../components/UI";
import { applyLatteArt } from "../utils/latteArt";

export function Studio({ onBack }) {
  const [stage, setStage] = useState("idle");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("latte_art");
  const fileRef = useRef();

  const process = useCallback((file) => {
    if (!file?.type.startsWith("image/")) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setStage("processing");
      const img = new Image();
      img.onload = () => {
        const maxSz = 720;
        let w = img.width,
          h = img.height;
        if (w > maxSz || h > maxSz) {
          if (w > h) {
            h = Math.round((h * maxSz) / w);
            w = maxSz;
          } else {
            w = Math.round((w * maxSz) / h);
            h = maxSz;
          }
        }
        const src = document.createElement("canvas");
        src.width = w;
        src.height = h;
        src.getContext("2d").drawImage(img, 0, 0, w, h);
        setTimeout(() => {
          setResult(applyLatteArt(src).toDataURL("image/png"));
          setStage("done");
        }, 120);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = () => {
    setStage("idle");
    setPreview(null);
    setResult(null);
  };
  const download = () => {
    const a = document.createElement("a");
    a.href = result;
    a.download = `crema_${fileName}.png`;
    a.click();
  };

  return (
    <div style={{ minHeight: "100vh", background: C.espresso }}>
      <TopBar
        showBack
        onBack={onBack}
        showNew={stage === "done"}
        onNew={reset}
      />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "110px 28px 72px",
        }}
      >
        {stage === "idle" && (
          <div
            style={{
              width: "100%",
              maxWidth: 540,
              animation: "fadeUp 0.7s ease both",
            }}
          >
            <p
              className="overline"
              style={{ marginBottom: 20, textAlign: "center" }}
            >
              Studio
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(30px,5vw,52px)",
                color: C.foam,
                marginBottom: 44,
                textAlign: "center",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Upload your image
            </h2>
            <div
              className={`drop-zone${dragging ? " dragging" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                process(e.dataTransfer.files[0]);
              }}
              onClick={() => fileRef.current.click()}
            >
              <div style={{ marginBottom: 18 }}>
                <CupIcon size={42} color={dragging ? C.copper : C.mahogany} />
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: 20,
                  color: C.foam,
                  marginBottom: 10,
                }}
              >
                Drop your image here
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond',Georgia,serif",
                  fontSize: 15,
                  color: C.caramel,
                }}
              >
                or click to browse — JPG, PNG, WEBP
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => process(e.target.files[0])}
              />
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: 24,
                fontFamily: "'EB Garamond',Georgia,serif",
                fontSize: 13,
                color: C.mid,
                fontStyle: "italic",
              }}
            >
              All processing happens in your browser. Nothing is uploaded.
            </p>
          </div>
        )}

        {stage === "processing" && (
          <div
            style={{ textAlign: "center", animation: "fadeUp 0.5s ease both" }}
          >
            <div
              style={{
                position: "relative",
                width: 96,
                height: 96,
                margin: "0 auto 36px",
              }}
            >
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke={C.mahogany}
                  strokeWidth="1"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke={C.copper}
                  strokeWidth="2"
                  strokeDasharray="36 228"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "48px 48px",
                    animation: "spin 1.4s linear infinite",
                  }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <CupIcon size={30} color={C.caramel} />
              </div>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 32,
                color: C.foam,
                marginBottom: 14,
                fontWeight: 700,
              }}
            >
              Brewing your art…
            </h2>
            <p
              style={{
                fontFamily: "'EB Garamond',Georgia,serif",
                fontSize: 15,
                color: C.caramel,
                fontStyle: "italic",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              Detecting edges · Remapping tones · Pouring foam
            </p>
          </div>
        )}

        {stage === "done" && result && (
          <div
            style={{
              width: "100%",
              maxWidth: 920,
              animation: "fadeUp 0.7s ease both",
            }}
          >
            <div className="result-grid" style={{ marginBottom: 36 }}>
              <div>
                <p className="overline" style={{ marginBottom: 14 }}>
                  Original
                </p>
                <div
                  style={{
                    borderRadius: 2,
                    overflow: "hidden",
                    background: C.dark,
                  }}
                >
                  <img
                    src={preview}
                    alt="Original"
                    style={{ width: "100%", display: "block", opacity: 0.82 }}
                  />
                </div>
              </div>
              <div>
                <p
                  className="overline"
                  style={{ marginBottom: 14, color: C.copper }}
                >
                  Latte Art
                </p>
                <div
                  style={{
                    background: `radial-gradient(ellipse at 40% 30%, ${C.roast} 0%, ${C.dark} 100%)`,
                    borderRadius: 2,
                    padding: "28px 24px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 200,
                  }}
                >
                  <div style={{ maxWidth: 300, width: "100%" }}>
                    <div
                      style={{
                        borderRadius: "50%",
                        padding: 10,
                        background: "linear-gradient(135deg, #ddd5c8, #c0b5a8)",
                        boxShadow: `0 16px 48px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4)`,
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                          overflow: "hidden",
                          boxShadow: `inset 0 4px 16px rgba(0,0,0,0.5)`,
                        }}
                      >
                        <img
                          src={result}
                          alt="Latte Art"
                          style={{ width: "100%", display: "block" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button className="btn-copper" onClick={download}>
                ↓ Download
              </button>
              <button className="btn-ghost" onClick={reset}>
                Try Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
