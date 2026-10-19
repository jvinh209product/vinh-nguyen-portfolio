import type { BuildStory } from './types';

const story: BuildStory = {
  "slug": "gieo",
  "question": "How can an abstract idea become a quiet interaction rather than another thing to optimize?",
  "concept": "GIEO is a bilingual EN/VI reflective website that connects philosophical chapters, life stories, Sanctuary practice, and My Garden reflections. Its immersive seed journey is an invitation to explore, not a claim about spiritual truth.",
  "audience": "Curious readers who want to consider an idea, try a brief practice, or privately record a thought. The experience leaves room for someone who does not share a belief system.",
  "bet": "Understanding, experience, and practice can reinforce one another when each offers a gentle next step and the reader remains free to choose it.",
  "principle": "Make space; do not gamify spiritual worth. A timer is a practical aid and a reflection is a personal record, not a score or evidence of a clinical benefit.",
  "scope": "No clinical treatment, scientifically established metaphysical claims, synchronized accounts, social ranking, or promised audio narration.",
  "contribution": "Independent concept, bilingual content structure, editorial and interaction direction, reflective flows, and prototype iteration.",
  "walkthrough": [
    {
      "title": "Begin with a thought",
      "action": "Enter the seed journey or open a philosophy chapter in English or Vietnamese.",
      "response": "The narrative changes its imagery and prompts as the reader moves between ideas. Detail pages preserve a readable long-form measure and optional reading mode.",
      "lesson": "A concept needs an understandable question and a path into deeper reading, not just an atmospheric opening."
    },
    {
      "title": "Return to a breath",
      "action": "Choose a Sanctuary session, begin the timer, pause when needed, and follow the guidance.",
      "response": "SessionClock maintains elapsed time and progress. The breathing visual is optional, and motion preference can reduce the surrounding presentation.",
      "lesson": "Practice should remain usable without motion or a particular pace imposed by the page."
    },
    {
      "title": "Keep a private reflection",
      "action": "Write or revisit a My Garden reflection and export a local journal backup.",
      "response": "Entries are validated and saved locally when browser storage is available. Import/export and visible storage errors keep the persistence boundary clear.",
      "lesson": "A garden can feel personal without implying a cloud account or silently promising synchronized memory."
    }
  ],
  "model": {
    "intro": "Three complementary ways into the experience. Select a lens to see how the next step supports a reader; the diagram is an editorial explanation, not a spiritual progress score.",
    "states": [
      {
        "label": "Understand",
        "title": "Start with a question you can examine.",
        "explanation": "Explore chapters, stories, and library material frame an idea before inviting reflection. EN/VI language selection remains available throughout the reading journey.",
        "nodes": [
          "Question",
          "Read & reflect",
          "Choose a practice"
        ]
      },
      {
        "label": "Experience",
        "title": "Let an interaction make the idea tangible.",
        "explanation": "Seed choices, connections, and changing scenes give the reader something to inspect. These are interpretive experiences, not evidence for a metaphysical claim.",
        "nodes": [
          "Notice",
          "Explore a relation",
          "Reflect"
        ]
      },
      {
        "label": "Practice",
        "title": "Return to something small and usable.",
        "explanation": "A Sanctuary timer or a Garden note offers a practical next step. Pause, motion controls, and local export preserve agency without ranking a person’s spiritual worth.",
        "nodes": [
          "Breathe",
          "Write locally",
          "Return when ready"
        ]
      }
    ]
  },
  "decisions": [
    {
      "title": "Atmosphere around a readable core",
      "choice": "Poetic scenes lead into long-form detail pages with a deliberate reading measure, larger body type, and reading mode.",
      "tradeoff": "Immersion is valuable only if it does not make the explanation harder to understand or reach.",
      "next": "Review reading comfort across both languages, narrow screens, and reduced-motion mode."
    },
    {
      "title": "A timer with user control",
      "choice": "Session timing uses an explicit clock; pause and optional breathing visuals keep practice independent from decorative animation.",
      "tradeoff": "A calm presentation still has to show clear state and controls. It cannot imply a medical or spiritual outcome.",
      "next": "Test the guidance and state changes with readers who are new to meditation."
    },
    {
      "title": "A local garden with an honest boundary",
      "choice": "Validate journal entries, expose persistence errors, and provide import/export instead of implying online synchronization.",
      "tradeoff": "Local privacy and portability mean users must keep backups; clearing browser data can remove reflections.",
      "next": "Make the backup boundary understandable before considering any account feature."
    }
  ],
  "craft": {
    "stack": "Portable HTML/CSS, native JavaScript modules, and procedural SVG/CSS artwork. Bilingual content, views, core state, and art are authored in separate modules.",
    "architecture": "A shared state coordinates language, reading mode, chapter interactions, Sanctuary sessions, and Garden drafts. SessionClock and journal validation remain independent of the presentation.",
    "motion": "Scroll-driven SVG/CSS scene changes and native scrolling support the narrative. Motion controls and reading mode retain the content without requiring animation.",
    "storage": "Language preferences and validated journal entries use localStorage. JSON import/export provides a local backup. There is no synchronized account or required backend."
  },
  "today": [
    "EN/VI navigation, philosophical chapters, life stories, and a searchable library.",
    "Immersive seed-to-reflection interactions and readable detail views.",
    "Sanctuary session timing, pause/resume, guidance, and optional breathing visuals.",
    "Local Garden reflections with editing, validation, visible storage errors, and backups."
  ],
  "next": [
    "Review bilingual reading comfort and the transition from a chapter to a practice.",
    "Test timer and reflection behavior on touch, keyboard, and reduced-motion devices.",
    "Improve backup guidance without adding accounts or spiritual scoring."
  ],
  "limits": "GIEO is an independent reflective experience. Its philosophical material invites inquiry; it does not establish clinical effects or scientific proof of spiritual beliefs. Private reflections remain local to the browser unless the reader exports a backup."
};
export default story;
