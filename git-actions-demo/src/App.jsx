import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import "./App.css";

const STORAGE_KEY = "git-demo:name";

export default function App() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("dark");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setName(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      // ignore
    }
  }, [name]);

  const today = useMemo(() => dayjs().format("dddd, MMM D, YYYY"), []);

  const canClear = name.trim() !== "";

  return (
    <div className={`page ${theme}`}>
      <div className="glow" aria-hidden="true" />

      <div className="container">
        <header className="header">
          <div>
            <h1 className="title">
              Git demo <span className="gradientText">frontend</span>
            </h1>
            <p className="meta">{today}</p>
          </div>

          <button className="button" onClick={() => setTheme(theme)}>
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </header>

        <main className="grid">
          <section
            className="card mainCard"
            style={{
              maxWidth: 740,
              padding: 26,
            }}
          >
            <p className="cardText" style={{ fontSize: 16, marginBottom: 14 }}>
              Type something...
            </p>

            <div
              className="fieldRow"
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                id="nameInput"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name…"
                aria-label="Name"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setName("");
                }}
                style={{
                  flex: "1 1 auto",
                  minWidth: 0,
                }}
              />

              {canClear && (
                <button
                  type="button"
                  className="button"
                  onClick={() => setName("")}
                  aria-label="Clear input"
                  style={{
                    flex: "0 0 auto",
                    padding: "12px 14px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    opacity: 0.92,
                    height: 44,
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="previewShell" style={{ marginTop: 18 }}>
              <div className="preview" style={{ padding: 18 }}>
                <div className="previewMeta">Preview</div>
                <div className="previewTitle" style={{ fontSize: 32 }}>
                  Hello, {name.trim() ? name : "World"} 👋
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
