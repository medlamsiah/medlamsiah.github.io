import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  GitBranch,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { Reveal } from "./reveal";

const metrics = [
  { value: "17", label: "dépôts publics" },
  { value: "5+", label: "écosystèmes maîtrisés" },
  { value: "Web · Mobile", label: "produits de bout en bout" },
];

export function HeroSection() {
  return (
    <section className="hero section-grid" id="accueil">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <Reveal>
            <div className="eyebrow hero-eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              Portfolio · Paris, France
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1>
              Je transforme des idées en
              <span> produits numériques remarquables.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-lead">
              Je suis <strong>Mohamed Lamsiah</strong>, développeur Full-Stack
              Web & Mobile. Je conçois des expériences React rapides, des API
              robustes et des produits pensés pour durer.
            </p>
          </Reveal>

          <Reveal delay={220} className="hero-actions">
            <a className="button button-primary" href="#projets">
              Découvrir mes projets
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="/api/cv">
              <Download size={18} aria-hidden="true" />
              Télécharger mon CV
            </a>
          </Reveal>

          <Reveal delay={280} className="hero-meta">
            <span>
              <MapPin size={16} aria-hidden="true" /> Paris, France
            </span>
            <a
              href="https://github.com/medlamsiah"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={16} aria-hidden="true" /> @medlamsiah
            </a>
          </Reveal>
        </div>

        <Reveal delay={180} className="hero-visual-wrap">
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" aria-hidden="true" />
            <div className="visual-orbit orbit-two" aria-hidden="true" />
            <div className="portrait-card">
              <div className="portrait-media">
                <span className="portrait-index">01 / PORTRAIT</span>
                <Image
                  src="/mohamed-lamsiah-professional.jpeg"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 900px) 88vw, 520px"
                  priority
                  alt="Mohamed Lamsiah, développeur Full-Stack Web et Mobile"
                />
                <span className="portrait-sheen" aria-hidden="true" />
              </div>
            </div>
            <div className="floating-card floating-card-top">
              <span className="status-dot" aria-hidden="true" />
              <div>
                <small>Statut actuel</small>
                <strong>Disponible pour collaborer</strong>
              </div>
            </div>
            <a
              className="floating-card floating-card-bottom"
              href="mailto:mohamedlamsiah33@gmail.com"
            >
              <div>
                <small>Un projet en tête ?</small>
                <strong>Parlons-en</strong>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="shell metrics-row" aria-label="Quelques chiffres">
        {metrics.map((metric, index) => (
          <Reveal delay={index * 70} className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
