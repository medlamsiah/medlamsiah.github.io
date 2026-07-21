import { ArrowUpRight, GitBranch, Mail } from "lucide-react";
import { Reveal } from "./reveal";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell">
        <Reveal className="contact-card">
          <div className="contact-orb" aria-hidden="true" />
          <span className="eyebrow">05 · Contact</span>
          <h2>Une idée ambitieuse mérite une exécution à sa hauteur.</h2>
          <p>
            Produit web, application mobile ou API métier : racontez-moi ce que
            vous voulez construire.
          </p>
          <div className="contact-actions">
            <a
              className="button button-light"
              href="mailto:mohamedlamsiah33@gmail.com"
            >
              <Mail size={18} aria-hidden="true" />
              m’envoyer un e-mail
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="button button-ghost-light"
              href="https://github.com/medlamsiah"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={18} aria-hidden="true" />
              GitHub
            </a>
          </div>
          <a className="contact-email" href="mailto:mohamedlamsiah33@gmail.com">
            mohamedlamsiah33@gmail.com
          </a>
        </Reveal>
      </div>
    </section>
  );
}
