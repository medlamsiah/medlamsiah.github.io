import { ArrowUpRight } from "lucide-react";
import { timeline } from "@/lib/site";
import { Reveal } from "./reveal";

export function TimelineSection() {
  return (
    <section className="content-section timeline-section" id="parcours">
      <div className="shell timeline-layout">
        <Reveal className="timeline-intro">
          <span className="eyebrow">03 · Parcours</span>
          <h2>Construire, apprendre, recommencer mieux.</h2>
          <p>
            Un parcours à la croisée du développement, des systèmes
            d’information et de l’exploitation technique.
          </p>
          <a className="text-link" href="/api/cv">
            Consulter le CV complet
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>

        <div className="timeline-list">
          {timeline.map((item, index) => (
            <Reveal className="timeline-item" delay={index * 70} key={item.title}>
              <span className="timeline-number">0{index + 1}</span>
              <div>
                <span className="timeline-period">{item.period}</span>
                <h3>{item.title}</h3>
                <strong>{item.organization}</strong>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
