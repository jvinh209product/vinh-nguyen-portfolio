export const projectImages: Record<string, { home: string; detail: string }> = {
  'debt-ledger': { home: '01-home-debtledger.png', detail: '01-detail-debtledger.png' },
  mseller: { home: '02-home-mseller.png', detail: '02-detail-mseller.png' },
  beerich: { home: '03-home-beerich.png', detail: '03-detail-beerich.png' },
  moodify: { home: '04-home-moodify.png', detail: '04-detail-moodify.png' },
};

// All four source images share the same 4:3 frame. Keep them complete at rest;
// this focal-point configuration also supports future artwork variations.
export const mediaFraming: Record<string, { position: string; scale: number }> = {
  'debt-ledger': { position: '50% 50%', scale: 1 },
  mseller: { position: '50% 50%', scale: 1 },
  beerich: { position: '50% 50%', scale: 1 },
  moodify: { position: '50% 50%', scale: 1 },
};

export function projectCaption(slug: string) {
  return slug === 'debt-ledger' ? 'BALANCE · HISTORY · STATUS'
    : slug === 'mseller' ? 'THE WORKSPACE & THE NEXT STEP'
    : slug === 'beerich' ? 'PRESENT · INVESTMENT · FUTURE'
    : 'A CALMER WAY TO BEGIN';
}
