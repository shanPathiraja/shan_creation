export const site = {
  name: "Shan Creation",
  tagline: "Digital ideas, real impact.",
  description:
    "Shan Creation designs, builds, and markets websites, apps, and brands for businesses that want to stand out online.",
  email: "prasadh.pathiraja@gmail.com",
  // TODO: replace with your real Shan Creation Facebook page URL
  facebook: "https://facebook.com/shancreation",
  location: "Sri Lanka",
};

export const services = [
  {
    slug: "web-graphic-design",
    title: "Web & Graphic Design",
    short: "Brand identity, UI/UX, and marketing visuals that make you memorable.",
    icon: "design",
    points: [
      "Brand identity & logo design",
      "Website & product UI/UX design",
      "Social media & marketing graphics",
      "Motion / interactive web design",
    ],
  },
  {
    slug: "web-app-development",
    title: "Web & App Development",
    short: "Fast, modern, properly engineered websites and applications.",
    icon: "dev",
    points: [
      "Custom business & marketing websites",
      "Web applications (React / Next.js)",
      "Mobile apps (Flutter, iOS & Android)",
      "E-commerce & booking systems",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Get found, get traffic, and turn visitors into customers.",
    icon: "marketing",
    points: [
      "Facebook & Instagram page management",
      "Paid ad campaigns",
      "SEO fundamentals & content strategy",
      "Growth reporting & analytics",
    ],
  },
];

export type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricing: PricingTier[] = [
  {
    name: "Starter Site",
    price: "LKR 25,000 – 45,000",
    description: "1–3 page landing or business site.",
    features: ["Mobile responsive design", "Basic SEO setup", "Contact form", "1 round of revisions"],
  },
  {
    name: "Business Website",
    price: "LKR 60,000 – 120,000",
    description: "6–10 pages, custom design.",
    features: ["Custom design system", "Blog / CMS", "SEO setup", "2 rounds of revisions"],
    highlighted: true,
  },
  {
    name: "Premium / Motion Site",
    price: "LKR 150,000+",
    description: "Custom animated or 3D-driven brand site.",
    features: ["Motion & interactive design", "Custom illustration/3D", "Performance tuning", "Priority support"],
  },
  {
    name: "Digital Marketing",
    price: "LKR 15,000 – 40,000 / mo",
    description: "Ongoing social media & ad management.",
    features: ["Content calendar", "Ad campaign management", "Monthly performance report", "Page optimization"],
  },
];

export type PortfolioItem = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  gradient: string;
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "creative-paradise",
    title: "Creative Paradise",
    tagline: "We will design your idea",
    description:
      "A WebGL reimagining of a Sri Lankan design studio site — GPU water-ripple cursor, scroll-driven 3D scenes, and a 28-piece portfolio gallery rendered on canvas.",
    tags: ["Next.js", "React Three Fiber", "GLSL", "Tailwind"],
    link: "https://creative-paradise-webgl.vercel.app",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
  },
  {
    slug: "wilpattu-wilds",
    title: "Wilpattu Wilds",
    tagline: "Into the wild heart of Sri Lanka",
    description:
      "Safari lodge and tour booking experience built around an immersive 3D jungle canvas with layered parallax depth.",
    tags: ["Next.js", "Three.js", "React Three Fiber", "Tailwind"],
    link: "https://wilpattu-travels.vercel.app",
    gradient: "from-emerald-500 via-teal-500 to-blue-600",
  },
  {
    slug: "nexus",
    title: "Nexus",
    tagline: "We make brands win",
    description:
      "Full-service digital agency site — case-study portfolio, service breakdown, and a five-stage process narrative.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://nexus-agency-liard.vercel.app",
    gradient: "from-violet-500 via-purple-500 to-pink-600",
  },
  {
    slug: "solara",
    title: "Solara",
    tagline: "Stop managing tasks. Start finishing them.",
    description:
      "SaaS marketing site for an AI task-intelligence platform — priority engine, smart scheduling, and team analytics.",
    tags: ["Next.js", "Tailwind", "SaaS"],
    link: "https://solara-saas.vercel.app",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
  },
  {
    slug: "fittrack",
    title: "FitTrack",
    tagline: "Train smarter, not harder",
    description:
      "Product site for an AI fitness app: adaptive workout plans, camera form analysis, recovery scoring, and tiered pricing.",
    tags: ["Next.js", "Tailwind", "Product Site"],
    link: "https://fittrack-app-nine.vercel.app",
    gradient: "from-orange-500 via-pink-500 to-purple-600",
  },
];
