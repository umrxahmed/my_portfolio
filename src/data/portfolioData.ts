// ─────────────────────────────────────────────────────────────
// portfolioData.ts — Centralized content configuration
// Add new projects, skills, or links here without touching UI code.
// ─────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Badge {
  text: string;
  icon: "location" | "status";
}

export interface LoadingData {
  brand: string;
  topLabel: string;
  statusMessages: string[];
  progressLabel: string;
  footerLeft: string;
  footerRight: string;
}

export interface HeroData {
  eyebrow: string;
  headline: string;
  subHeadline: string;
  actions: { label: string; href: string; variant: "primary" | "secondary" }[];
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface MarqueeItem {
  text: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectTag {
  label: string;
}

export interface Project {
  index: string;
  title: string;
  category: string;
  description: string;
  tags: ProjectTag[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: "linkedin" | "github" | "instagram";
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutData {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  stats: AboutStat[];
}

export interface ContactFormData {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  mailtoMessage: string;
  errorMessage: string;
}

export interface ContactData {
  headline: string;
  subtext: string;
  form: ContactFormData;
}

export interface FooterData {
  brand: string;
  tagline: string;
  credit: string;
  copyright: string;
}

export interface DeckPhoto {
  src: string;
  alt: string;
}

// ─── Profile ────────────────────────────────────────────────

export const profileData = {
  name: "Mohammed Umair Ahmed",
  shortName: "Umair",
  logo: "Umair.",
  role: "AI Engineer & Creative Director",
  profileImage: "/profile.jpg",
  location: "Hyderabad, India",
  email: "3umair.ahmed7@gmail.com",
};

// ─── About Photo Deck ───────────────────────────────────────
// Drop profile1.jpg through profile7.jpg into /public.
// The deck falls back to /profile.jpg until those files exist.

export const photoDeck: DeckPhoto[] = [
  { src: "/profile1.jpg", alt: "Umair Ahmed — portrait one" },
  { src: "/profile2.jpg", alt: "Umair Ahmed — portrait two" },
  { src: "/profile3.jpg", alt: "Umair Ahmed — portrait three" },
  { src: "/profile4.jpg", alt: "Umair Ahmed — portrait four" },
  { src: "/profile5.jpg", alt: "Umair Ahmed — portrait five" },
  { src: "/profile6.jpg", alt: "Umair Ahmed — portrait six" },
  { src: "/profile7.jpg", alt: "Umair Ahmed — portrait seven" },
];

// ─── Loading Screen ─────────────────────────────────────────

export const loadingData: LoadingData = {
  brand: "UMAIR.",
  topLabel: "Opening Portfolio",
  statusMessages: [
    "BOOTING UP INTERFACE...",
    "ANALYZING CODE & CREATIVITY...",
    "PREPARING SOMETHING AWESOME...",
  ],
  progressLabel: "Loading Experience",
  footerLeft: "Based in India",
  footerRight: "Mohammed Umair Ahmed",
};

// ─── Navigation ─────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
  {
    label: "RESUME",
    href: "/Mohammed-Umair-Ahmed-Resume.pdf",
    external: true,
  },
];

export const headerBadges: Badge[] = [
  { text: "Based in Hyderabad, India", icon: "location" },
  { text: "Available for work", icon: "status" },
];

// ─── Hero ───────────────────────────────────────────────────

export const heroData: HeroData = {
  eyebrow: "AI Engineer & Creative Director",
  headline: "BUILDING DIGITAL VALUE.",
  subHeadline:
    "I bridge high-end visual design with advanced AI and data-driven systems to build digital products that scale.",
  actions: [
    { label: "View Selected Work", href: "#work", variant: "primary" },
    { label: "My Profile", href: "#about", variant: "secondary" },
  ],
};

// ─── About ──────────────────────────────────────────────────

export const aboutData: AboutData = {
  eyebrow: "About",
  title: "Hi, I'm Umair.",
  paragraphs: [
    `I'm a multidisciplinary builder based in ${profileData.location}, working at the intersection of AI engineering, creative direction, and digital operations.`,
    "I specialize in designing intelligent multi-agent systems, crafting high-retention visual media, and orchestrating complex digital logistics. My approach bridges deep technical architecture with premium visual storytelling.",
    "From building RAG pipelines and deploying cloud infrastructure, to directing brand campaigns and managing cross-functional community operations — I thrive in the space where technology meets creative ambition.",
  ],
  stats: [
    { label: "Focus", value: "AI & Design" },
    { label: "Based in", value: "Hyderabad" },
    { label: "Status", value: "Available" },
  ],
};

// ─── Section Intros ─────────────────────────────────────────

export const sectionIntros: Record<
  "skills" | "services" | "work" | "process",
  SectionIntro
> = {
  skills: {
    eyebrow: "Capabilities",
    title: "Skills & Tools",
    description:
      "The stack I use to design, build, and ship intelligent digital products.",
  },
  services: {
    eyebrow: "What I Do",
    title: "Services",
    description:
      "End-to-end capability, from intelligent systems to visual identity.",
  },
  work: {
    eyebrow: "Portfolio",
    title: "Selected Works",
    description:
      "A collection of projects spanning AI systems, creative pipelines, and digital operations.",
  },
  process: {
    eyebrow: "How I Work",
    title: "Process",
    description:
      "A focused, four-step path from first conversation to launch.",
  },
};

// ─── Skills ─────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "FastAPI", "LangChain", "LangGraph", "CrewAI"],
  },
  {
    title: "AI & Cloud",
    skills: [
      "Vector DBs (FAISS/Chroma)",
      "MCP",
      "Docker",
      "GCP",
      "AWS",
      "Azure",
    ],
  },
  {
    title: "Design & Media",
    skills: ["Figma", "Canva", "Premiere Pro", "CapCut PC", "Motion Graphics"],
  },
  {
    title: "Digital Operations",
    skills: [
      "Alliance Diplomacy",
      "Cross-Functional Leadership",
      "Logistics",
      "MVP Scaling",
      "Automation",
    ],
  },
];

export const marqueeItems: MarqueeItem[] = [
  { text: "Python" },
  { text: "FastAPI" },
  { text: "LangChain" },
  { text: "CrewAI" },
  { text: "LangGraph" },
  { text: "Docker" },
  { text: "GCP" },
  { text: "AWS" },
  { text: "Azure" },
  { text: "Figma" },
  { text: "Premiere Pro" },
  { text: "n8n" },
  { text: "SQL" },
  { text: "Claude Code" },
  { text: "GitHub" },
  { text: "Vercel" },
  { text: "MCP" },
  { text: "Vector DBs" },
];

// ─── Services ───────────────────────────────────────────────

export const services: Service[] = [
  {
    title: "AI Architecture",
    description:
      "Building LLM-driven applications, intelligent multi-agent workflows, and custom RAG pipelines.",
    icon: "brain",
  },
  {
    title: "Design & Media",
    description:
      "Crafting high-retention motion media, brand identities, and UI/UX prototypes.",
    icon: "palette",
  },
  {
    title: "Backend & Cloud",
    description:
      "Developing scalable APIs, deploying cloud infrastructure, and engineering data pipelines.",
    icon: "server",
  },
  {
    title: "Digital Operations",
    description:
      "Managing community ecosystems, cross-functional diplomacy, and large-scale digital logistics.",
    icon: "globe",
  },
];

// ─── Selected Works ─────────────────────────────────────────

export const projects: Project[] = [
  {
    index: "01",
    title: "DocuMind",
    category: "RAG Assistant",
    description:
      "Engineered a Retrieval-Augmented Generation assistant utilizing vector databases and FastAPI to securely query private knowledge bases.",
    tags: [
      { label: "Python" },
      { label: "LangChain" },
      { label: "Vector DBs" },
      { label: "FastAPI" },
      { label: "GCP" },
    ],
  },
  {
    index: "02",
    title: "The Pulse",
    category: "Creative Pipeline",
    description:
      'Directed the visual identity, recruitment campaigns, and end-to-end production infrastructure for the "Beyond the Classroom" podcast incubator.',
    tags: [
      { label: "Figma" },
      { label: "Premiere Pro" },
      { label: "Creative Strategy" },
      { label: "CapCut" },
    ],
  },
  {
    index: "03",
    title: "OpsAgent",
    category: "Logistics",
    description:
      "Managed complex server migrations and diplomacy for global digital communities, modeling multi-agent orchestration to streamline cross-functional logistics.",
    tags: [
      { label: "CrewAI" },
      { label: "n8n" },
      { label: "MCP" },
      { label: "Python" },
      { label: "Automation APIs" },
    ],
  },
  {
    index: "04",
    title: "Cinematic Motion",
    category: "Visual Media",
    description:
      "Produced high-retention short-form video media focusing on precision audio-syncing, motion typography, and dynamic automotive visual edits.",
    tags: [
      { label: "Premiere Pro" },
      { label: "Audio Syncing" },
      { label: "Motion Graphics" },
    ],
  },
];

// ─── Process ────────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Mapping system architecture, vector data flows, and creative vision.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Crafting minimalist visual systems, UI prototypes, and typography hierarchies.",
  },
  {
    number: "03",
    title: "Engineering",
    description:
      "Writing clean backend code, training models, and editing dynamic media.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deploying containerized, API-driven solutions to the cloud.",
  },
];

// ─── Contact ────────────────────────────────────────────────

export const contactData: ContactData = {
  headline: "Let's work together.",
  subtext:
    "Currently available for freelance projects and open to full-time opportunities.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "jane@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about the project, timeline, and goals…",
    submitLabel: "Send Message",
    sendingLabel: "Sending…",
    successMessage:
      "Thanks — your message is on its way. I'll get back to you soon.",
    mailtoMessage:
      "Your email app is opening with the message ready to send.",
    errorMessage:
      "Something went wrong. Please email me directly at {email}.",
  },
};

// ─── Social Links ───────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/mohammed-umair-ahmed-9435b4358/",
    icon: "linkedin",
  },
  {
    platform: "GitHub",
    url: "https://github.com/umrxahmed",
    icon: "github",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/umr.ax/",
    icon: "instagram",
  },
];

// ─── Footer ─────────────────────────────────────────────────

export const footerData: FooterData = {
  brand: "Umair.",
  tagline: "Crafting digital experiences that leave a lasting impression.",
  credit: "Designed & Built",
  copyright: "© 2026 Mohammed Umair Ahmed. All rights reserved.",
};
