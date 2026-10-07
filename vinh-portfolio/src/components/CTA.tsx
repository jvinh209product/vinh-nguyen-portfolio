import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Props = (AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' })
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' });

/** The clipped second label keeps dark and light CTAs legible during the wipe. */
export function CTA({ as = 'a', className = '', children, ...props }: Props) {
  const label = <>
    <span className="cta-fill" aria-hidden="true"/>
    <span className="cta-label">{children}</span>
    <span className="cta-label cta-label--filled" aria-hidden="true">{children as ReactNode}</span>
  </>;
  if (as === 'button') return <button type="button" {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={`cta ${className}`}>{label}</button>;
  return <a {...props as AnchorHTMLAttributes<HTMLAnchorElement>} className={`cta ${className}`}>{label}</a>;
}
