import type { BuildStory } from './types';

const story: BuildStory = {
  "slug": "betterbet",
  "question": "How do you turn an uncertain product opinion into a decision someone else can inspect?",
  "concept": "BETTERBET is an independent product decision workspace, not a dashboard that tells a team what to do. It connects Diagnose, Evidence, Decide, Experiment, Deliver, and Review so the reasoning can travel with the recommendation.",
  "audience": "Product practitioners and learners who want to examine a problem, compare alternatives, and articulate what would change their mind. Guided synthetic cases make the method explorable without pretending to be real customer research.",
  "bet": "A decision becomes more useful when its evidence, assumptions, alternatives, and learning plan remain connected rather than disappearing into separate slides.",
  "principle": "Make uncertainty visible. Keep the raw counting unit and observation window next to the interpretation, and keep an assumption distinct from an observed result.",
  "scope": "No connected company analytics, AI inference, team permissions, or automatic experiment execution. This is a browser-local decision lab.",
  "contribution": "Independent product concept, method structure, experience and interface direction, prototype iteration, and the connection between each stage’s artifacts.",
  "walkthrough": [
    {
      "title": "Start with a specific case",
      "action": "Choose a guided domain case and inspect its diagnosis instead of beginning with an empty dashboard.",
      "response": "The workspace selects that case’s dataset, counting unit, and ordered funnel. KPI targets are computed from those records.",
      "lesson": "A percentage is not a diagnosis until you know who or what was counted, in what order, and over which window."
    },
    {
      "title": "Make the decision inspectable",
      "action": "Connect evidence and assumptions to a decision, compare alternatives, then define an experiment.",
      "response": "The decision snapshot keeps edited reasoning, linked source IDs, competing options, and the experiment together.",
      "lesson": "The recommendation should explain the trade-off and what evidence could invalidate it."
    },
    {
      "title": "Bring data, then review the learning",
      "action": "Start from a supplied CSV template, import rows, inspect validation errors, and review a linked outcome dataset.",
      "response": "Predefined schemas validate required fields and types. Review separates raw counts, absolute difference, relative uplift, and uncertainty.",
      "lesson": "Synthetic demo data and actual imports must remain distinguishable. A statistical display is not proof of valid random assignment."
    }
  ],
  "model": {
    "intro": "The six-stage workflow carries one decision thread. Select a lens to see what the artifact must retain; this is an explanation of the Lab, not a second analytics engine.",
    "states": [
      {
        "label": "Evidence",
        "title": "Keep the counting contract attached.",
        "explanation": "Diagnosis and evidence retain the selected counting unit, chronological event order, and cohort/window assumptions before an interpretation is made.",
        "nodes": [
          "Diagnose",
          "Evidence",
          "Decide",
          "Experiment",
          "Deliver",
          "Review"
        ]
      },
      {
        "label": "Decision",
        "title": "Make alternatives travel with the recommendation.",
        "explanation": "The edited decision snapshot connects source IDs, options, assumptions, an experiment, and a delivery brief instead of reducing the work to a score.",
        "nodes": [
          "Diagnose",
          "Evidence",
          "Decide",
          "Experiment",
          "Deliver",
          "Review"
        ]
      },
      {
        "label": "Learning",
        "title": "Return to what was actually observed.",
        "explanation": "Review uses linked imported outcomes where supplied. Unmeasured guardrails remain visibly unmeasured; a scenario sandbox stays labeled as simulation.",
        "nodes": [
          "Diagnose",
          "Evidence",
          "Decide",
          "Experiment",
          "Deliver",
          "Review"
        ]
      }
    ]
  },
  "decisions": [
    {
      "title": "Templates before a blank import",
      "choice": "V1.1 starts CSV imports with predefined case schemas, downloadable templates, and validation before analysis.",
      "tradeoff": "This makes the contract clearer, but advanced Template Studio and new custom mapping are deferred. The existing OrbitDesk custom import remains available.",
      "next": "Observe where people misunderstand a counting unit or repair an invalid row before expanding mapping."
    },
    {
      "title": "Explain a metric’s provenance",
      "choice": "Calculate KPI targets from the selected raw dataset and keep simulated examples clearly identified.",
      "tradeoff": "A truthful empty analysis is less impressive than a populated demo when an import is missing, but it protects the meaning of the result.",
      "next": "Make provenance easier to inspect without suggesting the workspace has live business integrations."
    },
    {
      "title": "Keep a connected local workspace",
      "choice": "Separate case workspaces and keep decisions exportable as Markdown and JSON backups.",
      "tradeoff": "Local persistence avoids sending source records to a service, but browser storage is not shared collaboration or an enterprise vault.",
      "next": "Test the handoff between a decision bundle and another person’s review before adding cloud collaboration."
    }
  ],
  "craft": {
    "stack": "React 19, Vite, Three.js, GSAP/ScrollTrigger, Lenis, and Lucide. Inter and Space Grotesk are self-hosted in the actual build.",
    "architecture": "Deterministic analytics, schema-based imports, workspace storage, and counter behavior live in separate modules. The public presentation and native-scrolling Lab are separate experiences.",
    "motion": "The public decision field loads Three.js lazily. SVG remains available on phones, reduced-motion devices, or WebGL failure. KPI counters cancel obsolete targets and announce only the final value to screen readers.",
    "storage": "Small state uses localStorage; imported event and outcome records use IndexedDB. Backups preserve local work. The app does not upload those source records."
  },
  "today": [
    "Eight authored domain cases share the ordered-funnel engine.",
    "Six connected workflow stages, editable decision snapshots, and exports.",
    "Template-first import validation, case workspaces, and computed KPI counters.",
    "Bilingual public and Lab interfaces with readable fallback artwork."
  ],
  "next": [
    "Test real users’ understanding of evidence versus assumptions.",
    "Improve provenance reading before extending the import surface.",
    "Consider collaboration only after validating the individual review workflow."
  ],
  "limits": "This is an independent learning and product-thinking experiment. Demonstration events and research notes are synthetic. It does not claim live customer analytics or measured adoption."
};
export default story;
