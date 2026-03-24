import { useState } from "react";
import { GrainOverlay } from "./components/UI";
import { Landing } from "./pages/Landing";
import { Studio } from "./pages/Studio";
import "./global.css";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap";
document.head.appendChild(fontLink);

export default function App() {
  const [page, setPage] = useState("landing");
  return (
    <>
      <GrainOverlay />
      {page === "landing" ? (
        <Landing onEnter={() => setPage("studio")} />
      ) : (
        <Studio onBack={() => setPage("landing")} />
      )}
    </>
  );
}
