import { Boxes, Code2, DatabaseZap } from "lucide-react";
import { expertise } from "@/lib/site";
import { Reveal } from "./reveal";

const icons = [Code2, Boxes, DatabaseZap];

export function ExpertiseSection() {
  return (
    <section className="content-section section-grid" id="expertise">
      <div className="shell">
        <Reveal className="section-heading split-heading">
          <div>
            <span className="eyebrow">02 · Expertise</span>
            <h2>Une vision produit, du premier écran à la production.</h2>
          </div>
          <p>
            Mon approche combine design d’interface, architecture logicielle et
            compréhension métier pour livrer des produits cohérents à chaque
            niveau.
          </p>
        </Reveal>

        <div className="expertise-grid">
          {expertise.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal
                className="expertise-card"
                delay={index * 90}
                key={item.title}
              >
                <div className="card-topline">
                  <span className="expertise-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul aria-label={`Technologies : ${item.title}`}>
                  {item.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="philosophy-strip">
          <span>Code propre</span>
          <i aria-hidden="true" />
          <span>Design accessible</span>
          <i aria-hidden="true" />
          <span>Sécurité intégrée</span>
          <i aria-hidden="true" />
          <span>Performance mesurée</span>
        </Reveal>
      </div>
    </section>
  );
}
