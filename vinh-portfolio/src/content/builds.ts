export type BuildSlug = 'betterbet' | 'pulse-city' | 'ship-it' | 'gieo';
export type BuildKind = 'evidence' | 'city' | 'office' | 'garden';
export interface BuildImage {
  src: string; width: number; height: number; alt: string;
  position: string; temporary: boolean; caption: string;
}
export interface BuildSupportingImage extends BuildImage { id: string; afterStep: number }
export interface BuildPreview {
  slug: BuildSlug; number: string; name: string; kind: BuildKind;
  category: string; line: string; summary: string; accent: string;
  tags: string[]; media: BuildImage; detailMedia: BuildImage; supportingMedia: BuildSupportingImage[]; liveUrl: string | null;
}

// Authored independent-build group. The original Work generator stays separate.
// Demo URLs come from the owners' actual published deployments, never guessed.
// Media sources, focal points, and temporary status live here for simple replacement.
export const builds: readonly BuildPreview[] = [
  {
    "slug": "betterbet",
    "number": "05",
    "name": "BETTERBET.",
    "kind": "evidence",
    "category": "Product Decision Lab · Evidence-Driven Product Thinking",
    "line": "From scattered signals to a decision you can defend.",
    "summary": "A connected decision workspace that makes evidence, assumptions, alternatives, and learning inspectable.",
    "accent": "#CDEB69",
    "tags": [
      "Product reasoning",
      "Interaction design",
      "Local workspace"
    ],
    "media": {
      "src": "/images/builds/v2-2/home-betterbet2.png",
      "width": 1448,
      "height": 1086,
      "alt": "Supplied BETTERBET product mockup on a desktop monitor, showing the Diagnose workspace and its synthetic-data label",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "liveUrl": "https://betterbet-lab.vercel.app/",
    "detailMedia": {
      "src": "/images/builds/v2-2/detail-betterbet.png",
      "width": 1672,
      "height": 941,
      "alt": "Supplied BETTERBET product mockup showing decision options and trade-offs on a desktop monitor",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "supportingMedia": [
      {
        "src": "/images/builds/v2-2/home-betterbet.png",
        "width": 1448,
        "height": 1086,
        "alt": "Supplied BETTERBET case-library product mockup on a laptop, showing the different guided example contexts",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — guided cases provide different contexts for the same decision method.",
        "id": "case-library",
        "afterStep": 0
      },
      {
        "src": "/images/builds/v2-2/detail-betterbet2.png",
        "width": 1672,
        "height": 941,
        "alt": "Supplied BETTERBET product mockup on a laptop, showing observations, linked evidence, and a working hypothesis",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — evidence and competing explanations beside the working hypothesis.",
        "id": "evidence",
        "afterStep": 1
      }
    ]
  },
  {
    "slug": "pulse-city",
    "number": "06",
    "name": "PULSE CITY",
    "kind": "city",
    "category": "3D Logistics Simulator · Operational Systems",
    "line": "Every delivery decision moves the city — and changes a trade-off.",
    "summary": "An isometric delivery experiment that turns dispatch policies into observable rider, route, and customer consequences.",
    "accent": "#BAA8F4",
    "tags": [
      "Systems modeling",
      "Spatial interaction",
      "Decision feedback"
    ],
    "media": {
      "src": "/images/builds/v2-2/home-pulsecity.png",
      "width": 1448,
      "height": 1086,
      "alt": "Supplied PULSE CITY product mockup on a desktop monitor with the isometric city and simulation interface",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "liveUrl": "https://pulse-city-three.vercel.app/",
    "detailMedia": {
      "src": "/images/builds/v2-2/detail-pulsecity.png",
      "width": 1672,
      "height": 941,
      "alt": "Supplied PULSE CITY product mockup showing the demand Heatmap on a monitor and the city overview on a laptop",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "supportingMedia": [
      {
        "src": "/images/builds/v2-2/detail-pulsecity2.png",
        "width": 1672,
        "height": 941,
        "alt": "Supplied PULSE CITY product mockup on a laptop showing route-choice controls, an illustrated route, and decision feedback",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — route choice and its modeled consequences.",
        "id": "route-impact",
        "afterStep": 1
      },
      {
        "src": "/images/builds/v2-2/detail-pulsecity3.png",
        "width": 1672,
        "height": 941,
        "alt": "Supplied PULSE CITY product mockup on a desktop monitor showing a heavy-rain disruption and competing simulated priorities",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — rain disruption and competing operational priorities.",
        "id": "rain-tradeoffs",
        "afterStep": 2
      }
    ]
  },
  {
    "slug": "ship-it",
    "number": "07",
    "name": "SHIP IT!",
    "kind": "office",
    "category": "Product Manager Simulator · Interactive Learning",
    "line": "Thirty days, one product, and decisions that refuse to stay simple.",
    "summary": "A living product-management office where scope, time, stakeholder relationships, and product health share one simulation.",
    "accent": "#E87458",
    "tags": [
      "Learning experience",
      "Game systems",
      "Product judgment"
    ],
    "media": {
      "src": "/images/builds/v2-2/home-PMShip.png",
      "width": 1448,
      "height": 1086,
      "alt": "Supplied SHIP IT product mockup on a desktop monitor, showing the miniature office and product-management simulation interface",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "liveUrl": "https://pmshipit-pmshipit.vercel.app/",
    "detailMedia": {
      "src": "/images/builds/v2-2/detail-PMShip3.png",
      "width": 1672,
      "height": 941,
      "alt": "Supplied SHIP IT product mockup showing an MVP scope and prioritization board on a desktop monitor",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "supportingMedia": [
      {
        "src": "/images/builds/v2-2/detail-PMShip.png",
        "width": 1672,
        "height": 941,
        "alt": "Supplied SHIP IT product mockup showing a stakeholder request and its decision options on a desktop monitor",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — stakeholder pressure framed as a choice.",
        "id": "stakeholder-choice",
        "afterStep": 1
      },
      {
        "src": "/images/builds/v2-2/detail-PMShip2.png",
        "width": 1672,
        "height": 941,
        "alt": "Supplied SHIP IT product mockup showing the Analytics Wall, with uncertainty and insufficient-data labels preserved",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — a learning view that keeps uncertainty visible.",
        "id": "learning-signals",
        "afterStep": 2
      }
    ]
  },
  {
    "slug": "gieo",
    "number": "08",
    "name": "GIEO.",
    "kind": "garden",
    "category": "Mindfulness Experience · Interactive Editorial Design",
    "line": "Make space to understand a thought — and return to a breath.",
    "summary": "A bilingual reflective experience connecting philosophical reading, quiet practice, and a private, local garden of reflections.",
    "accent": "#CDEB69",
    "tags": [
      "Editorial experience",
      "EN / VI",
      "Reflective interaction"
    ],
    "media": {
      "src": "/images/builds/v2-2/home-GIEO.png",
      "width": 1448,
      "height": 1086,
      "alt": "Supplied GIEO product mockup on a desktop monitor, showing the seed and landscape composition",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "liveUrl": "https://gieo-gieo.vercel.app/",
    "detailMedia": {
      "src": "/images/builds/v2-2/detail-GIEO.png",
      "width": 1672,
      "height": 941,
      "alt": "Supplied GIEO product mockup showing the Wisdom Library on a monitor and the seed journey on a laptop",
      "position": "50% 50%",
      "temporary": false,
      "caption": "Product mockup"
    },
    "supportingMedia": [
      {
        "src": "/images/builds/v2-2/detail-GIEO2.png",
        "width": 1672,
        "height": 941,
        "alt": "Supplied GIEO product mockup on a desktop monitor showing the leaf and impermanence reading experience",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — an idea explored through an experiential reading view.",
        "id": "impermanence",
        "afterStep": 0
      },
      {
        "src": "/images/builds/v2-2/home-GIEO2.png",
        "width": 1448,
        "height": 1086,
        "alt": "Supplied GIEO Sanctuary product mockup on a laptop, showing quiet-time choices and a practice timer",
        "position": "50% 50%",
        "temporary": false,
        "caption": "Product mockup — Sanctuary practice with room to pause.",
        "id": "sanctuary",
        "afterStep": 1
      }
    ]
  }
];
export function getBuild(slug: BuildSlug): BuildPreview {
  const build = builds.find(item => item.slug === slug);
  if (!build) throw new Error('Unknown independent build: ' + slug);
  return build;
}

// Manifesto imagery reuses the canonical supplied mockups, without new device shells.
export const manifestoPanels: readonly { label: string; media: BuildImage }[] = [
  { label: 'Testable', media: getBuild('betterbet').media },
  { label: 'Visible', media: getBuild('pulse-city').media },
  { label: 'Felt', media: getBuild('gieo').supportingMedia.find(image => image.id === 'sanctuary')! },
];
