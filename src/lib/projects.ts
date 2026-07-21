export type ProjectCategory =
  | "Tous"
  | "Web"
  | "Mobile"
  | "Backend"
  | "DevSecOps"
  | "Python"
  | "Archives";

export type Project = {
  name: string;
  slug: string;
  category: Exclude<ProjectCategory, "Tous">;
  description: string;
  longDescription: string;
  stack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  year: string;
  accent: "cyan" | "violet" | "amber" | "emerald" | "rose" | "blue";
  highlights: string[];
};

const githubBase = "https://github.com/medlamsiah";

export const projects: Project[] = [
  {
    name: "V-Secure Review Studio",
    slug: "augmented-video-review-player",
    category: "Web",
    description:
      "Studio B2B de revue vidéo collaborative, annotations synchronisées et streaming HLS sécurisé.",
    longDescription:
      "Une expérience de revue vidéo complète avec commentaires horodatés, annotations Canvas, synchronisation temps réel entre utilisateurs et persistance par vidéo.",
    stack: ["React", "TypeScript", "Socket.IO", "Prisma", "HLS"],
    github: `${githubBase}/augmented-video-review-player`,
    featured: true,
    year: "2026",
    accent: "cyan",
    highlights: ["Temps réel", "Streaming AES-128", "SQLite & Prisma"],
  },
  {
    name: "Tradixa",
    slug: "tradixa",
    category: "Web",
    description:
      "Plateforme de traduction professionnelle multilingue avec commandes, chat et paiement.",
    longDescription:
      "Une plateforme full-stack en français, anglais et arabe avec espaces client, traducteur et administrateur, suivi de commandes et base PostgreSQL.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    github: `${githubBase}/Tradixa`,
    demo: "https://tradixa.vercel.app",
    featured: true,
    year: "2026",
    accent: "violet",
    highlights: ["i18n & RTL", "Rôles métier", "Paiement Stripe"],
  },
  {
    name: "VivoVTC",
    slug: "vivovtc",
    category: "Web",
    description:
      "Plateforme de recrutement VTC avec candidature, dashboard et simulateur de revenus.",
    longDescription:
      "Un produit Next.js full-stack conçu pour transformer les visiteurs en candidatures qualifiées et donner à l'équipe un suivi opérationnel clair.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    github: `${githubBase}/VivoVTC`,
    featured: true,
    year: "2026",
    accent: "amber",
    highlights: ["Dashboard", "Export CSV", "Calcul métier"],
  },
  {
    name: "TravelMate",
    slug: "travelmate-react-native",
    category: "Mobile",
    description:
      "Compagnon de voyage mobile : itinéraires, activités, journal, favoris et profil.",
    longDescription:
      "Application Expo Router connectée à une API Express, avec recherche, filtres, gestion des voyages et statistiques utilisateur.",
    stack: ["React Native", "Expo", "TypeScript", "Express", "Node.js"],
    github: `${githubBase}/travelmate-react-native`,
    featured: true,
    year: "2025",
    accent: "emerald",
    highlights: ["Expo Router", "CRUD complet", "Upload avatar"],
  },
  {
    name: "Electronic Shop API",
    slug: "go-electronic-shop",
    category: "Backend",
    description:
      "API multi-boutiques sécurisée pour produits, transactions, stocks et ventes WhatsApp.",
    longDescription:
      "Backend Go multi-tenant avec isolation stricte des boutiques, authentification JWT, permissions par rôle et reporting commercial.",
    stack: ["Go", "Gin", "GORM", "PostgreSQL", "Docker"],
    github: `${githubBase}/GoProjectElectronicShop`,
    featured: true,
    year: "2026",
    accent: "blue",
    highlights: ["Multi-tenant", "JWT & RBAC", "Docker Compose"],
  },
  {
    name: "GymFit",
    slug: "gymfit-mobile",
    category: "Mobile",
    description:
      "Application fitness mobile avec programmes, exercices, progression et profil sécurisé.",
    longDescription:
      "Une application React Native orientée expérience utilisateur, avec navigation par onglets, authentification Firebase et mode sombre.",
    stack: ["React Native", "Expo", "Firebase", "TypeScript"],
    github: `${githubBase}/GymFit-MobileApp`,
    featured: true,
    year: "2025",
    accent: "rose",
    highlights: ["Firebase Auth", "Suivi sportif", "Mode sombre"],
  },
  {
    name: "Admin Edu",
    slug: "admin-edu-nextjs",
    category: "Web",
    description:
      "Interface d'administration éducative moderne avec composants accessibles et Firebase.",
    longDescription:
      "Un dashboard Next.js et TypeScript structuré autour de composants Radix, de formulaires de gestion et d'une couche Firebase.",
    stack: ["Next.js", "TypeScript", "Firebase", "Radix UI", "Tailwind"],
    github: `${githubBase}/Admin-Edu-NextJs`,
    featured: false,
    year: "2025",
    accent: "violet",
    highlights: ["Dashboard", "Design system", "Firebase"],
  },
  {
    name: "SyncVote API",
    slug: "syncvote-api",
    category: "Backend",
    description:
      "API de vote sécurisée avec authentification, validation, stockage cloud et cache Redis.",
    longDescription:
      "Service REST TypeScript avec Express, sécurité HTTP, gestion d'administrateurs et intégrations Firebase et Google Cloud Storage.",
    stack: ["Node.js", "TypeScript", "Express", "Firebase", "Redis"],
    github: `${githubBase}/AppVote-API`,
    featured: false,
    year: "2024",
    accent: "cyan",
    highlights: ["REST API", "JWT", "Cloud Storage"],
  },
  {
    name: "Gestion des tâches",
    slug: "gestion-taches",
    category: "Web",
    description:
      "Application MERN pour créer, suivre et terminer ses tâches dans une interface simple.",
    longDescription:
      "Projet full-stack associant une interface React à une API Express et une persistance MongoDB via Mongoose.",
    stack: ["React", "Express", "MongoDB", "Mongoose", "Material UI"],
    github: `${githubBase}/gestion-taches`,
    featured: false,
    year: "2022",
    accent: "blue",
    highlights: ["MERN", "CRUD", "Material UI"],
  },
  {
    name: "DevSecOps Project",
    slug: "devsecops-project",
    category: "DevSecOps",
    description:
      "Microservice Flask conteneurisé, pensé comme base d'une chaîne de livraison sécurisée.",
    longDescription:
      "Une application Python minimale et reproductible grâce à Docker, destinée à l'expérimentation CI/CD et sécurité applicative.",
    stack: ["Python", "Flask", "Docker"],
    github: `${githubBase}/devsecops-project`,
    featured: false,
    year: "2026",
    accent: "emerald",
    highlights: ["Conteneurisation", "Flask", "CI/CD ready"],
  },
  {
    name: "Calculator Python",
    slug: "calculator-python",
    category: "Python",
    description:
      "Calculatrice desktop en Python avec interface graphique Tkinter et export exécutable.",
    longDescription:
      "Une application de bureau compacte pour explorer les interfaces natives Python et le packaging avec PyInstaller.",
    stack: ["Python", "Tkinter", "PyInstaller"],
    github: `${githubBase}/Calculator-PY`,
    featured: false,
    year: "2025",
    accent: "amber",
    highlights: ["Desktop", "Tkinter", "Executable"],
  },
  {
    name: "Project Cryptographie",
    slug: "project-cryptographie",
    category: "Archives",
    description:
      "Travail académique consacré aux principes et méthodes de cryptographie.",
    longDescription:
      "Un projet d'étude documentant des notions de sécurité et de cryptographie, conservé dans les archives GitHub.",
    stack: ["Cryptographie", "Sécurité", "Documentation"],
    github: `${githubBase}/ProjectCryptographie`,
    featured: false,
    year: "2022",
    accent: "violet",
    highlights: ["Sécurité", "Recherche", "Projet académique"],
  },
  {
    name: "Vote Project",
    slug: "vote-project",
    category: "Archives",
    description:
      "Prototype et documentation initiale d'une solution de vote numérique.",
    longDescription:
      "Dépôt de conception ayant servi de point de départ aux travaux autour de l'API SyncVote.",
    stack: ["Conception", "Vote numérique"],
    github: `${githubBase}/voteProject`,
    featured: false,
    year: "2024",
    accent: "cyan",
    highlights: ["Prototype", "Documentation"],
  },
  {
    name: "Etu Admin",
    slug: "etu-admin",
    category: "Archives",
    description:
      "Dépôt de préparation pour une interface d'administration étudiante Next.js et Firebase.",
    longDescription:
      "Une première base de travail conservée pour retracer l'évolution vers le projet Admin Edu.",
    stack: ["Next.js", "Firebase"],
    github: `${githubBase}/Etu-Admin`,
    featured: false,
    year: "2025",
    accent: "blue",
    highlights: ["Exploration", "Administration"],
  },
  {
    name: "Club Achbal",
    slug: "club-achbal",
    category: "Archives",
    description:
      "Concept d'outil web pour centraliser la gestion des clients d'un club.",
    longDescription:
      "Un dépôt historique représentant les premiers travaux de conception d'une solution de gestion client.",
    stack: ["Web", "Gestion client"],
    github: `${githubBase}/ClubAchbalSiteWeb`,
    featured: false,
    year: "2020",
    accent: "emerald",
    highlights: ["Concept", "Gestion client"],
  },
  {
    name: "Mohamed Lamsiah — Archives",
    slug: "mohamed-lamsiah-archive",
    category: "Archives",
    description:
      "Premier dépôt GitHub personnel, conservé comme point de départ du parcours.",
    longDescription:
      "Archive historique du compte, témoin des débuts du parcours de développement.",
    stack: ["Archive GitHub"],
    github: `${githubBase}/Mohamed-LAMSIAH`,
    featured: false,
    year: "2020",
    accent: "amber",
    highlights: ["Historique", "Premier dépôt"],
  },
  {
    name: "Portfolio professionnel",
    slug: "portfolio-professionnel",
    category: "Web",
    description:
      "Portfolio premium, accessible et administrable, déployé sur Vercel.",
    longDescription:
      "Une refonte React complète avec galerie filtrable, SEO avancé et gestion sécurisée du CV sans redéploiement.",
    stack: ["Next.js", "React", "TypeScript", "Vercel Blob"],
    github: `${githubBase}/medlamsiah.github.io`,
    featured: false,
    year: "2026",
    accent: "rose",
    highlights: ["Admin sécurisé", "CV dynamique", "SEO"],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Tous",
  "Web",
  "Mobile",
  "Backend",
  "DevSecOps",
  "Python",
  "Archives",
];
