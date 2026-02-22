import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import "./app.css";

const STORAGE_KEY = "git-demo:name";

export default function App() {
  const [name, setName] = useState("World");
  const [theme, setTheme] = useState("dark");

  const inputRef = useRef(null);

  // Autofocus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Load saved name once
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim().length > 0) setName(saved);
    } catch {
      // ignore storage errors (demo friendly)
    }
  }, []);

  // Persist name
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      // ignore storage errors
    }
  }, [name]);

  const today = useMemo(() => dayjs().format("dddd, MMM D, YYYY"), []);

  const canClear = name.trim() !== "" && name !== "World";

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

          {/* INTENTIONALLY BROKEN for git bisect demo:
              This onClick no longer toggles theme. */}
          <button
            className="button"
            onClick={() => setTheme(theme)} // BUG: doesn't change anything
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </header>

        <main className="grid">
          <section className="card mainCard">
            <p className="cardText">Type something...</p>

            <div className="fieldRow">
              <input
                ref={inputRef}
                id="nameInput"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name…"
                aria-label="Name"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setName("World");
                }}
              />

              {canClear && (
                <button
                  className="button"
                  type="button"
                  onClick={() => setName("World")}
                  style={{ marginTop: 10 }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="previewShell">
              <div className="preview">
                <div className="previewMeta">Preview</div>
                <div className="previewTitle">Hello, {name || "World"} 👋</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}