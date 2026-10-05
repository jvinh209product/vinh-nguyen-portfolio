'use client';

import { useEffect } from 'react';

export function Recovery({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => { console.error('Portfolio page failed to initialize:', error); }, [error]);
  return <main className="recovery" style={{ minHeight: '100dvh', padding: 'clamp(28px,8vw,110px)', background: '#f6f3ed', color: '#172b3a', fontFamily: 'Arial,sans-serif' }}><p>Vinh Nguyen</p><h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', margin: '80px 0 28px', maxWidth: 800 }}>Let’s try that page again.</h1><p>The page couldn’t finish loading. You can retry it or return to the portfolio.</p><div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 32 }}><button onClick={retry} style={{ padding: '14px 22px', background: '#172b3a', color: '#f6f3ed', border: 0, cursor: 'pointer' }}>Retry page</button><a href="/" style={{ padding: 14 }}>Home</a><button onClick={() => history.length > 1 ? history.back() : location.assign('/')} style={{ padding: 14, cursor: 'pointer' }}>Go back</button></div>{process.env.NODE_ENV === 'development' && <details style={{ marginTop: 36 }}><summary>Diagnostic details</summary><pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{error.stack || error.message}</pre></details>}</main>;
}
