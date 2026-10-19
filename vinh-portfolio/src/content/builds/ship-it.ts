import type { BuildStory } from './types';

const story: BuildStory = {
  "slug": "ship-it",
  "question": "Can product judgment be learned in a world that keeps moving while you decide?",
  "concept": "SHIP IT! is a browser-local 3D product-manager simulator. The journey moves through Discover, Define, Build, Launch, and Learn while stakeholder needs, limited hours, scope, product health, and office activities share one state.",
  "audience": "Product learners and curious practitioners who want to experience competing priorities rather than read a list of ideal process steps. The office is a learning frame, not a certification system.",
  "bet": "A choice is more memorable when it costs time, affects a relationship, and returns later as a product consequence.",
  "principle": "Keep the office alive without making its spectacle a prerequisite for doing the work. Optional activity must not trap the player away from required progress.",
  "scope": "No real stakeholders, endless AI characters, multiplayer workplace, or validated assessment. Product indicators and events are explicitly simulated.",
  "contribution": "Independent learning concept, chapter and scenario structure, interface direction, constraint modeling, living-office interactions, and prototype iteration.",
  "walkthrough": [
    {
      "title": "Move through a living office",
      "action": "Use WASD, arrow keys, or click/tap to move, then interact with a nearby coworker or activity.",
      "response": "Collision-aware navigation moves the avatar around furniture. Coworkers follow authored desk, coffee, conversation, and meeting routines.",
      "lesson": "Context can make a decision feel situated without pretending the characters are autonomous AI colleagues."
    },
    {
      "title": "Spend a limited day",
      "action": "Choose a chapter decision, a meeting response, or an optional activity such as coffee or a check-in.",
      "response": "A day has eight simulated hours. Choices affect shared health, relationships, and delayed consequences; required work retains a time reserve.",
      "lesson": "An attractive extra is a trade-off when the required work still needs time."
    },
    {
      "title": "Build, launch, and learn",
      "action": "Shape an MVP, prepare a release, select a rollout, respond to incidents, and read the final debrief.",
      "response": "The same state carries scope and stakeholder choices through later chapters and preserves progress locally when storage is available.",
      "lesson": "Shipping is one event in a longer decision loop. Learning has to read what the earlier choices made possible."
    }
  ],
  "model": {
    "intro": "The office is an interaction model, not a real organization. Select a constraint to examine how it follows a choice across the five chapters.",
    "states": [
      {
        "label": "Time",
        "title": "Optional work must preserve required progress.",
        "explanation": "Eight-hour days and a reserve for mandatory tasks make the cost of a meeting or office activity visible without locking the player out of the chapter.",
        "nodes": [
          "Discover",
          "Define",
          "Build",
          "Launch",
          "Learn"
        ]
      },
      {
        "label": "Scope",
        "title": "An MVP choice becomes a later release constraint.",
        "explanation": "Feature attributes and the interactive MVP board connect build choices to preparation, rollout, incidents, and the final product-style debrief.",
        "nodes": [
          "Discover",
          "Define",
          "Build",
          "Launch",
          "Learn"
        ]
      },
      {
        "label": "People",
        "title": "A relationship is part of the shared state.",
        "explanation": "Meetings, moderation, check-ins, and optional interactions affect stakeholder relationships. Delayed consequences keep a choice from ending at the dialog.",
        "nodes": [
          "Discover",
          "Define",
          "Build",
          "Launch",
          "Learn"
        ]
      }
    ]
  },
  "decisions": [
    {
      "title": "A living office with a dependable guided path",
      "choice": "Movement and nearby actions coexist with the guided task interface, fast actions, and animation skipping.",
      "tradeoff": "Free exploration adds context but must not hide required work behind spatial skill or long animations.",
      "next": "Test navigation and nearby-action discovery on touch and keyboard."
    },
    {
      "title": "Time reserves instead of soft locks",
      "choice": "The engine preserves time for required work when optional events compete for the remaining day.",
      "tradeoff": "This makes the authored journey finishable, but it intentionally constrains the apparent freedom of the simulation.",
      "next": "Observe whether the reserve reads as fair guidance rather than an unexplained restriction."
    },
    {
      "title": "Readable decisions over maximum density",
      "choice": "Larger detail type, stronger contrast, and stacked mobile choices keep reasoning accessible beside the office.",
      "tradeoff": "Readable panels take more space; the office cannot be the only way to inspect an action or consequence.",
      "next": "Review a full mobile playthrough and the non-WebGL text-office fallback."
    }
  ],
  "craft": {
    "stack": "Portable HTML/CSS and native JavaScript modules with locally vendored Three.js 0.183.2 and GSAP. The actual deployment is a complete static dist directory.",
    "architecture": "Authored scenarios and feature attributes are separate from a pure simulation engine. Navigation, office routines, informal activities, and the accessible interface connect through that shared state.",
    "motion": "Frame-independent movement and collision-aware routes drive the office. Fast actions and animation skipping stay available, and an interactive text office is provided when WebGL is unavailable.",
    "storage": "Progress uses localStorage when available; gameplay remains available when storage is blocked. Journal export is local. There is no account service or backend."
  },
  "today": [
    "Five chapters and 37 authored decisions connected to one simulation state.",
    "An interactive MVP board, meetings, release preparation, rollout decisions, incidents, and a final debrief.",
    "Movable PM avatar, coworker routines, nearby actions, desk activities, and informal signals.",
    "Local progress, reduced-motion support, readable mobile choices, and a text-office fallback."
  ],
  "next": [
    "Show more of the end-to-end office journey without distracting from the learning choices.",
    "Review a complete keyboard and touch playthrough, including movement and nearby actions.",
    "Test whether delayed effects help learners explain their choices rather than optimize a score."
  ],
  "limits": "This is an independent product-learning simulation. Its time, relationships, and health indicators are simulated. The experience explores judgment under constraints; it does not claim validated educational outcomes or a certification framework."
};
export default story;
