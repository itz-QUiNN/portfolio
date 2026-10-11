import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import { ApiError, fetchYouTubeDemo } from "../lib/api";
import type { YouTubeDemo as YouTubeDemoResult } from "../lib/api";
import { formatTime } from "../lib/format";

const TABS = ["metadata", "transcript", "chapters", "json"] as const;
type Tab = (typeof TABS)[number];

const LABELS: Record<Tab, string> = {
  metadata: "Metadata",
  transcript: "Transcript",
  chapters: "Chapters",
  json: "JSON",
};

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 422)
      return "That does not look like a YouTube video URL.";
    if (error.status === 429)
      return "Too many attempts. Please wait a minute and try again.";
  }
  return "Something went wrong. Please try again.";
}

export default function YouTubeDemo() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<YouTubeDemoResult | null>(null);
  const [tab, setTab] = useState<Tab>("metadata");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setResult(await fetchYouTubeDemo(url));
      setTab("metadata");
    } catch (err) {
      setResult(null);
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + TABS.length) % TABS.length;
    else return;
    event.preventDefault();
    setTab(TABS[next]);
    document.getElementById(`tab-${TABS[next]}`)?.focus();
  }

  return (
    <div className="mt-12 max-w-3xl">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1 text-sm">
          <span className="sr-only">YouTube URL</span>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
            maxLength={200}
            inputMode="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-md border border-line bg-surface px-3 py-3 font-mono text-sm text-ink placeholder:text-muted"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity duration-(--motion-micro) hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Process URL"}
        </button>
      </form>

      <p role="status" className="mt-4 min-h-6 text-sm text-muted">
        {error}
      </p>

      {result && (
        <div className="mt-6 rounded-lg border border-line bg-surface">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
            <div
              role="tablist"
              aria-label="Result views"
              className="flex gap-1"
            >
              {TABS.map((name, index) => (
                <button
                  key={name}
                  id={`tab-${name}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === name}
                  aria-controls={`panel-${name}`}
                  tabIndex={tab === name ? 0 : -1}
                  onClick={() => setTab(name)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`rounded-sm px-3 py-1.5 text-sm transition-colors duration-(--motion-micro) ${
                    tab === name
                      ? "bg-line text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {LABELS[name]}
                </button>
              ))}
            </div>
            {result.is_sample && (
              <span className="rounded-sm border border-accent px-2 py-1 font-mono text-xs uppercase tracking-widest text-accent">
                Sample data
              </span>
            )}
          </div>

          <div
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            tabIndex={0}
            className="p-4 text-sm"
          >
            {tab === "metadata" && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className="font-mono text-muted">video_id</dt>
                <dd className="font-mono">{result.video_id}</dd>
                {Object.entries(result.metadata).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="font-mono text-muted">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "transcript" && (
              <ol className="space-y-2">
                {result.transcript.map((segment) => (
                  <li key={segment.start_seconds} className="flex gap-4">
                    <span className="font-mono text-muted">
                      {formatTime(segment.start_seconds)}
                    </span>
                    <span>{segment.text}</span>
                  </li>
                ))}
              </ol>
            )}

            {tab === "chapters" && (
              <ol className="space-y-2">
                {result.chapters.map((chapter) => (
                  <li key={chapter.start_seconds} className="flex gap-4">
                    <span className="font-mono text-muted">
                      {formatTime(chapter.start_seconds)}
                    </span>
                    <span>{chapter.title}</span>
                  </li>
                ))}
              </ol>
            )}

            {tab === "json" && (
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
