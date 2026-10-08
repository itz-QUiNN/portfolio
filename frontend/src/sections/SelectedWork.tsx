import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
        Selected work
      </h2>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="grid gap-4 py-8 md:grid-cols-[4rem_1fr_1fr]"
          >
            <span className="font-mono text-sm text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                <Link
                  to={`/work/${project.slug}`}
                  className="transition-colors duration-(--motion-micro) hover:text-accent"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-md text-muted">{project.summary}</p>
            </div>

            {project.stack.length > 0 && (
              <ul className="flex flex-wrap content-start gap-2 md:justify-end">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-line px-2 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
