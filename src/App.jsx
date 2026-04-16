import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PALETTE = [
  "#c9e265",
  "#f19e9e",
  "#9fc1df",
  "#d3b0e3",
  "#f2d56c",
  "#98dfb9",
];

export default function App() {
  const [activeFace, setActiveFace] = useState("front"); // front, about, contact
  const [hoveredFace, setHoveredFace] = useState(null);
  const [lastBackFace, setLastBackFace] = useState("about");

  useEffect(() => {
    const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    document.documentElement.style.setProperty("--bg-color", randomColor);
  }, []);

  const handleSetActiveFace = (face) => {
    setActiveFace(face);
    if (face === "about" || face === "contact") {
      setLastBackFace(face);
    }
  };

  const getRotation = () => {
    if (activeFace === "about") return 180;
    if (activeFace === "contact") return -180;

    // Front face peek effects
    if (hoveredFace === "about") return 10;
    if (hoveredFace === "contact") return -10;

    return 0;
  };

  return (
    <div className="scene">
      <motion.div
        className="cube"
        animate={{ rotateY: getRotation() }}
        transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1.0] }}
      >
        {/* FRONT FACE */}
        <div className="face face-front">
          <div className="front-content">
            {/* <img src="/logo.svg" className="logo-svg" alt="JACOBS+TALBOURDET-NAPOLEONE" /> */}

            <h1 className="title">miguel.software</h1>
          </div>
          <BottomNav
            activeFace={activeFace}
            setActiveFace={handleSetActiveFace}
            setHoveredFace={setHoveredFace}
          />
        </div>

        {/* ABOUT FACE */}
        <div
          className="face face-about"
          style={{ zIndex: lastBackFace === "about" ? 2 : 1 }}
        >
          <button
            className="close-btn"
            onClick={() => handleSetActiveFace("front")}
            aria-label="Close"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <div className="about-content">
            <div className="about-text">
              <p>
                Miguel Gomez is a creative developer and software engineer based
                in London, focusing on designing innovative web experiences.
              </p>

              <p>
                A <strong>TypeScript/Javascript</strong> developer with a strong
                emphasis on <strong>frontend</strong> design and implementation.
              </p>

              <p>
                Drawing on his deep expertise in the modern Javascript
                ecosystem—including React, Typescript, and Node.js—he crafts
                robust, interactive, accessible, highly performant,
                conversion-oriented interfaces — backed by full-stack fluency.
              </p>

              <p>
                Available for contract — remote, on-site, or hybrid across
                London and the UK.
              </p>
            </div>
            <div className="stack-list">
              <ul>
                <li>Javascript/Typescript</li>
                <li>React</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>Tailwind CSS</li>
                <li>Vite</li>
                <li>Three.js</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CONTACT FACE */}
        <div
          className="face face-contact"
          style={{ zIndex: lastBackFace === "contact" ? 2 : 1 }}
        >
          <button
            className="close-btn"
            onClick={() => handleSetActiveFace("front")}
            aria-label="Close"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <div className="contact-content">
            <a href="mailto:hello@miguelgomez.co.uk" className="contact-link">
              hello@miguelgomez.co.uk
            </a>
            <p className="contact-quip">
              replies faster than <code>npm install</code>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BottomNav({ activeFace, setActiveFace, setHoveredFace }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-link ${activeFace === "about" ? "active" : ""}`}
        onClick={() => setActiveFace("about")}
        onMouseEnter={() => setHoveredFace && setHoveredFace("about")}
        onMouseLeave={() => setHoveredFace && setHoveredFace(null)}
      >
        About
      </button>
      <button
        className={`nav-link ${activeFace === "contact" ? "active" : ""}`}
        onClick={() => setActiveFace("contact")}
        onMouseEnter={() => setHoveredFace && setHoveredFace("contact")}
        onMouseLeave={() => setHoveredFace && setHoveredFace(null)}
      >
        Contact
      </button>
    </nav>
  );
}
