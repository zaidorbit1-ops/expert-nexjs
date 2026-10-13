'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const variants = {
  primary: 'bg-navy text-white hover:bg-navy-deep shadow-[0_12px_32px_-18px_rgba(8,24,41,.65)]',
  secondary: 'border border-navy/20 bg-[var(--color-background)] text-[var(--color-text)] hover:border-gold hover:bg-neutral-50',
  ghost: 'text-[var(--color-text)] hover:bg-neutral-100',
  gold: 'bg-gold text-navy-darker hover:bg-gold-deep shadow-glow',
};

const sizes = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-sm',
  lg: 'min-h-14 px-7 text-base',
};

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
