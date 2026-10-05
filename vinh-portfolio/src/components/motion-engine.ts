// Imported only inside a browser effect. Never import this module as a value
// from server-rendered components; use a type-only import for MotionEngine.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const engine = { gsap, ScrollTrigger };
export type MotionEngine = typeof engine;
