import svcDesign from "@/assets/svc-design.jpg";
import svcGrowth from "@/assets/svc-growth.jpg";
import svcPrototype from "@/assets/svc-prototype.jpg";
import svcSoftware from "@/assets/svc-software.jpg";

export const services = [
  {
    slug: "custom-software",
    title: "Custom Software Development",
    image: svcSoftware,
    blurb:
      "Architecture-first engineering for platforms that must survive scale. We build resilient systems, internal tooling and cloud backends tuned to your operating model rather than a generic template.",
    points: ["Cloud-native architecture", "API & platform engineering", "Legacy modernisation"],
    span: "lg:col-span-3",
  },
  {
    slug: "prototyping",
    title: "Web & App Prototyping",
    image: svcPrototype,
    blurb:
      "From concept to a clickable, investor-ready product in weeks. Rapid validation loops that de-risk spend before a single production line is written.",
    points: ["Interactive prototypes", "Validation sprints", "Design-to-code handoff"],
    span: "lg:col-span-3",
  },
  {
    slug: "ui-ux",
    title: "UI/UX Design",
    image: svcDesign,
    blurb:
      "Interface systems engineered around behaviour and conversion — design tokens, motion language and accessibility built in from the first frame.",
    points: ["Design systems", "Motion & interaction", "Usability research"],
    span: "lg:col-span-3",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing — Meta Ads",
    image: svcGrowth,
    blurb:
      "Performance campaigns run like an engineering discipline: structured testing, clean attribution and creative that compounds return on ad spend.",
    points: ["Meta & paid social", "Funnel & creative testing", "Attribution reporting"],
    span: "lg:col-span-3",
  },
] as const;
