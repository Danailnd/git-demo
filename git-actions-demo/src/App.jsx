import { useMemo, useState } from "react";
import dayjs from "dayjs";
import "./App.css";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState("World");
  const [theme, setTheme] = useState("dark");

  const today = useMemo(() => dayjs().format("dddd, MMM D, YYYY"), []);

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

          <button
            className="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </header>

        <main className="grid">
          <section className="card mainCard">
            <p className="cardText">Type something...</p>

            <div className="fieldRow">
              <input
                id="nameInput"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
