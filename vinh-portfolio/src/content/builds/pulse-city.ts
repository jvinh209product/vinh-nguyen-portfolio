import type { BuildStory } from './types';

const story: BuildStory = {
  "slug": "pulse-city",
  "question": "How can an invisible dispatch policy become a consequence you can actually see?",
  "concept": "PULSE CITY is a browser-local, isometric last-mile delivery experiment. Orders, riders, preparation waits, batching, deadlines, and weather are connected through a deterministic road graph and simulation state.",
  "audience": "People exploring product and operational systems who want to understand why faster service for one order can make another customer wait. It is a learning environment, not a courier control room.",
  "bet": "If a policy changes the relevant riders, routes, customers, and explanations together, a user can reason about the trade-off instead of treating a metric as a mysterious score.",
  "principle": "Show who moves, who waits, and when an effect becomes real. A policy that applies to the next eligible event should not be presented as an immediate outcome.",
  "scope": "No live courier integrations, geographic routing service, or real operational forecasts. All orders and metrics are simulated.",
  "contribution": "Independent concept, dispatch-story structure, operational model direction, spatial interface design, decision feedback, and prototype iteration.",
  "walkthrough": [
    {
      "title": "Read the city and its demand",
      "action": "Inspect an order, rider, or district and switch between the city and demand Heatmap.",
      "response": "Entity inspection reads the current simulation. Heatmap assigns each active order to one district rather than counting an order twice.",
      "lesson": "A useful overview reveals where demand is concentrated without confusing weather with demand."
    },
    {
      "title": "Choose a policy and follow the people",
      "action": "Make an assignment or batching choice, or adjust a strategic control in exploration.",
      "response": "DecisionFeedback captures before/after state, tracks pending policy realization, shows route ghosts and numbered stops, and ranks customer consequences.",
      "lesson": "An option must explain which customer benefits and which one waits, including effects that have not happened yet."
    },
    {
      "title": "Revisit the consequence",
      "action": "Change weather or demand, examine ETA/SLA, then replay the last explanation.",
      "response": "Rain changes rider speed and SLA forecasts. Replay shows the recorded effect without applying the decision a second time.",
      "lesson": "Explain the causal chain rather than inventing extra demand or silently repeating a choice."
    }
  ],
  "model": {
    "intro": "Three views of the same operational chain. The lines explain the modeled relationship between an input and a forecast; the live simulation supplies the actual moving city.",
    "states": [
      {
        "label": "Assign",
        "title": "An assignment changes an actual route.",
        "explanation": "The road graph, rider eligibility, preparation, and pickup waits constrain which rider can act. Feedback follows the affected route and its customer, not an arbitrary animation.",
        "nodes": [
          "Order & rider state",
          "Assignment policy",
          "Pickup & route",
          "Customer ETA"
        ]
      },
      {
        "label": "Batch",
        "title": "A second stop introduces a shared wait.",
        "explanation": "Compatible orders and capacity determine whether batching can happen. Grouped, numbered stops make the detour and customer consequence readable.",
        "nodes": [
          "Compatible orders",
          "Batch & capacity",
          "Ordered stops",
          "Who waits"
        ]
      },
      {
        "label": "Rain",
        "title": "A speed change propagates into a deadline forecast.",
        "explanation": "Weather affects movement speed and ETA/SLA. It does not create orders; demand controls remain a separate input to the model.",
        "nodes": [
          "Weather",
          "Rider speed",
          "Route forecast",
          "Deadline risk"
        ]
      }
    ]
  },
  "decisions": [
    {
      "title": "One feedback pipeline for every choice",
      "choice": "Route assignment, batching, disruption responses, objective changes, demand, weather, and new orders use the shared DecisionFeedback mechanism.",
      "tradeoff": "The implementation must distinguish an immediate effect from a pending policy and retain a snapshot for later explanation.",
      "next": "Review ambiguous choices with users to see whether they can identify the affected entities."
    },
    {
      "title": "Heatmap as a different reading of real simulation state",
      "choice": "Count active orders by unique district assignment and allow switching back to the city.",
      "tradeoff": "Aggregation improves pattern recognition while hiding individual movement; entity inspection stays available for the detail.",
      "next": "Test whether users can connect a district hotspot to a specific order’s wait."
    },
    {
      "title": "Replay the explanation, not the action",
      "choice": "Store the feedback needed to revisit a decision without reapplying the policy.",
      "tradeoff": "A replay can explain a historical snapshot while the simulation has since moved on; that distinction must remain explicit.",
      "next": "Make delayed realization easier to understand on smaller screens."
    }
  ],
  "craft": {
    "stack": "Portable HTML/CSS and browser JavaScript with locally vendored Three.js and GSAP. The deployed experience has no framework or backend requirement.",
    "architecture": "A pure simulation owns the road graph, movement, waits, batching, forecasts, and metrics. A separate Three.js city renders shared building instances; the interface owns the guided story and entity inspection.",
    "motion": "The city supports orbit and zoom; playback offers pause and 1× / 2× / 4× speed. The compact geometry and separate responsive document flow avoid treating the entire interface as a canvas.",
    "storage": "A local simulation runs in the browser. There is no login, map API, operational data service, or courier account."
  },
  "today": [
    "Guided assignment, batching, and disruption decisions plus strategic exploration controls.",
    "Functional district demand Heatmap and keyboard-accessible entity inspection.",
    "Shared decision feedback with snapshots, pending effects, customer consequences, and replay.",
    "Rider movements, route geometry, deadline forecasts, and calculated simulation metrics."
  ],
  "next": [
    "Validate visual causality and explanation reading in a WebGL-capable browser.",
    "Improve the legibility of delayed policy realization and crowded route states.",
    "Test whether the city and Heatmap help users tell demand from deadline risk."
  ],
  "limits": "Numbers are illustrative simulation outputs, not live operational data. The forecasts illustrate the model’s trade-offs; they are not validated real-world logistics predictions."
};
export default story;
