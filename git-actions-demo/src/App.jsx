import { useMemo, useState } from "react";
import dayjs from "dayjs";
import "./app.css";

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
            <div className="pills">
              <Pill>Git</Pill>
              <Pill>GitHub Actions</Pill>
              <Pill>CI/CD Demo</Pill>
            </div>

            <h1 className="title">
              Ship confidently with <span className="gradientText">automation</span>
            </h1>

            <p className="subtitle">
              A sleek one-page app to demonstrate commits, PRs, and GitHub Actions checks on every push.
            </p>

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
            <h2 className="cardTitle">Quick interaction</h2>
            <p className="cardText">
              Type your name and watch the UI update. Perfect for small commits and fast CI feedback.
            </p>

            <div className="fieldRow">
              <label className="label" htmlFor="nameInput">
                Your name
              </label>
              <input
                id="nameInput"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ada"
              />
            </div>

            <div className="previewShell">
              <div className="preview">
                <div className="previewMeta">Preview</div>
                <div className="previewTitle">Hello, {name || "World"} 👋</div>
                <div className="previewText">
                  Make a tiny tweak, commit, push — then show the Actions checks.
                </div>
              </div>
            </div>

            <div className="pills pillsBottom">
              <Pill>vite</Pill>
              <Pill>react</Pill>
              <Pill>css</Pill>
              <Pill>frontend</Pill>
            </div>
          </section>

          <aside className="side">
            <div className="sideGrid">
              <Stat label="Status" value="Ready for CI ✅" />
              <Stat label="Build Tool" value="Vite" />
              <Stat label="Demo Focus" value="GitHub Actions" />

              <div className="card">
                <h3 className="cardTitle">Suggested demo steps</h3>
                <ol className="list">
                  <li>Commit initial scaffold</li>
                  <li>Create a branch + commit a small UI change</li>
                  <li>Open PR → show checks</li>
                  <li>Break build → watch it fail</li>
                  <li>Fix → checks pass → merge</li>
                </ol>
              </div>
            </div>
          </aside>
        </main>

        <footer className="footer">Built for a Git + GitHub Actions demo.</footer>
      </div>
    </div>
  );
}