import workCommerce from "@/assets/work-commerce.jpg";
import workFintech from "@/assets/work-fintech.jpg";
import workHealth from "@/assets/work-health.jpg";
import workLogistics from "@/assets/work-logistics.jpg";

export type Project = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  image: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  services: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "neobank-platform",
    title: "A neobank built for 1.2M daily transactions",
    client: "Meridian Pay",
    sector: "Fintech",
    year: "2025",
    image: workFintech,
    summary:
      "A ground-up digital banking platform with onboarding, KYC, card issuance and a real-time ledger.",
    challenge:
      "The client had a monolithic core that could not clear settlement within its SLA and blocked every new product launch.",
    approach:
      "We redesigned the ledger as an event-sourced service, split onboarding into an independently deployable flow, and rebuilt the mobile experience around a single design system.",
    outcome:
      "Settlement moved from nightly batches to under two seconds, and the product team now ships features weekly without core changes.",
    services: ["Platform engineering", "UI/UX design", "Cloud architecture"],
    stack: ["React Native", "Node.js", "PostgreSQL", "Kafka", "AWS"],
    metrics: [
      { value: "1.2M", label: "Daily transactions" },
      { value: "2s", label: "Settlement time" },
      { value: "4.8★", label: "App store rating" },
    ],
  },
  {
    slug: "commerce-replatform",
    title: "Headless commerce replatform with 3x faster storefront",
    client: "Northline Retail",
    sector: "E-commerce",
    year: "2025",
    image: workCommerce,
    summary:
      "Migration from a legacy storefront to a headless architecture with a conversion-focused design refresh.",
    challenge:
      "Peak-season traffic degraded the storefront, and merchandising changes required a developer for every edit.",
    approach:
      "We introduced a headless front end with edge caching, moved merchandising into a content layer the marketing team owns, and rebuilt checkout around measured drop-off points.",
    outcome:
      "Largest Contentful Paint dropped below one second and the marketing team ships campaigns without engineering time.",
    services: ["Web engineering", "UI/UX design", "Performance"],
    stack: ["React", "TanStack", "Shopify API", "Cloudflare"],
    metrics: [
      { value: "3x", label: "Faster storefront" },
      { value: "+31%", label: "Checkout completion" },
      { value: "0", label: "Peak-season incidents" },
    ],
  },
  {
    slug: "fleet-intelligence",
    title: "Fleet intelligence for a cross-border logistics operator",
    client: "Axis Freight",
    sector: "Logistics",
    year: "2024",
    image: workLogistics,
    summary:
      "A live operations console unifying telematics, routing and exception handling across four countries.",
    challenge:
      "Dispatchers worked across five disconnected tools and discovered delays only after customers complained.",
    approach:
      "We built a streaming data pipeline, a single operations console with map-first triage, and automated exception alerts tied to customer SLAs.",
    outcome:
      "Dispatchers resolve exceptions before they breach SLA, and on-time delivery improved across every corridor.",
    services: ["Custom software", "Data engineering", "Design systems"],
    stack: ["React", "Mapbox", "Python", "TimescaleDB", "GCP"],
    metrics: [
      { value: "+18%", label: "On-time delivery" },
      { value: "5→1", label: "Tools consolidated" },
      { value: "40k", label: "Events per minute" },
    ],
  },
  {
    slug: "patient-portal",
    title: "A patient portal that cut admin load by a third",
    client: "Caldera Health",
    sector: "Healthcare",
    year: "2024",
    image: workHealth,
    summary:
      "Scheduling, records access and secure messaging in one accessible, compliance-ready portal.",
    challenge:
      "Front-desk staff handled every appointment change by phone, and records requests took days to fulfil.",
    approach:
      "We designed an accessible self-service portal, integrated it with the existing records system, and instrumented each flow to find remaining friction.",
    outcome:
      "Most appointment changes are now self-served, and records requests complete the same day.",
    services: ["Product design", "Custom software", "Accessibility"],
    stack: ["React", "TypeScript", "FHIR", "Azure"],
    metrics: [
      { value: "-34%", label: "Admin workload" },
      { value: "WCAG AA", label: "Accessibility" },
      { value: "72%", label: "Self-service rate" },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
