"use client";

import {
  Archive,
  ArrowUpRight,
  Code2,
  ExternalLink,
  GitBranch,
  Server,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
} from "lucide-react";
import { useState } from "react";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

function CategoryIcon({ category }: { category: Project["category"] }) {
  const iconProps = { size: 24, strokeWidth: 1.6, "aria-hidden": true } as const;
  if (category === "Mobile") return <Smartphone {...iconProps} />;
  if (category === "Backend") return <Server {...iconProps} />;
  if (category === "DevSecOps") return <ShieldCheck {...iconProps} />;
  if (category === "Python") return <TerminalSquare {...iconProps} />;
  if (category === "Archives") return <Archive {...iconProps} />;
  return <Code2 {...iconProps} />;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-card-head">
        <span className="project-icon">
          <CategoryIcon category={project.category} />
        </span>
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <ul className="project-highlights" aria-label="Points clés">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="project-stack" aria-label="Technologies">
        {project.stack.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer">
          <GitBranch size={17} aria-hidden="true" /> Code source
        </a>
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noreferrer">
            <ExternalLink size={17} aria-hidden="true" /> Voir la démo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("Tous");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const visibleProjects =
    activeCategory === "Tous" && !showAll
      ? filteredProjects.slice(0, 9)
      : filteredProjects;

  function selectCategory(category: ProjectCategory) {
    setActiveCategory(category);
    setShowAll(category !== "Tous");
  }

  return (
    <section className="content-section projects-section section-grid" id="projets">
      <div className="shell">
        <div className="section-heading projects-heading">
          <div>
            <span className="eyebrow">04 · Projets</span>
            <h2>Des produits concrets, dans plusieurs écosystèmes.</h2>
          </div>
          <p>
            Tous mes dépôts sont présentés ici, des plateformes full-stack aux
            applications mobiles, API et travaux d’exploration.
          </p>
        </div>

        <div className="project-filters" role="toolbar" aria-label="Filtrer les projets">
          {projectCategories.map((category) => (
            <button
              className={activeCategory === category ? "is-active" : ""}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => selectCategory(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid" aria-live="polite">
          {visibleProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>

        {activeCategory === "Tous" && !showAll ? (
          <div className="projects-more">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setShowAll(true)}
            >
              Afficher les {projects.length} projets
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
