import { ContactSection } from "@/components/contact-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TimelineSection } from "@/components/timeline-section";
import { projects } from "@/lib/projects";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Lamsiah",
    url: "https://medlamsiah.vercel.app",
    image: "https://medlamsiah.vercel.app/mohamed-lamsiah.png",
    email: "mailto:mohamedlamsiah33@gmail.com",
    jobTitle: "Développeur Full-Stack Web & Mobile",
    sameAs: ["https://github.com/medlamsiah"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Node.js",
      "Go",
      "PostgreSQL",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main id="contenu">
        <HeroSection />
        <ExpertiseSection />
        <TimelineSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
