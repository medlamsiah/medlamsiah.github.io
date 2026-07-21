import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <span className="brand-mark">ML</span>
          <p>Conçu avec exigence, développé pour durer.</p>
        </div>
        <div className="footer-links">
          <a href="#accueil">Retour en haut</a>
          <a href="https://github.com/medlamsiah" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/admin">Administration</Link>
        </div>
        <small>© {new Date().getFullYear()} Mohamed Lamsiah</small>
      </div>
    </footer>
  );
}
