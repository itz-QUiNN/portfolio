export default function App() {
  return (
    <main className="min-h-screen bg-bg text-ink px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          Python · Playwright · FastAPI
        </p>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
          Web scraping &amp; browser automation engineer
        </h1>
        <p className="text-lg text-muted">
          I build reliable systems that turn complex websites, repetitive
          workflows, and unstructured data into usable information.
        </p>
        <button className="rounded-md border border-line bg-surface px-4 py-2 transition-colors duration-(--motion-micro) hover:border-accent">
          Focus and hover test
        </button>
      </div>
    </main>
  );
}
