'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, House } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  const reduceMotion = useReducedMotion();

  return (
    <nav aria-label="Breadcrumb" className="relative z-10 mx-auto w-full max-w-[80rem] px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12">
      <motion.ol
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-2 text-xs"
      >
        <li>
          <Link href="/" className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/90 px-3.5 py-2 font-semibold text-navy transition hover:border-gold hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            <House size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map(({ label, href }, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={`${label}-${index}`} className="flex items-center gap-2">
              <span aria-hidden="true" className="relative grid h-5 w-5 place-items-center">
                <span className="h-px w-full bg-gold/80" />
                <ArrowRight size={12} className="absolute text-gold-deep" />
              </span>
              {isCurrent || !href ? (
                <span aria-current={isCurrent ? 'page' : undefined} className="inline-flex items-center rounded-full bg-navy px-3.5 py-2 font-semibold text-white shadow-soft">
                  {label}
                </span>
              ) : (
                <Link href={href} className="rounded-full border border-[var(--color-border)] bg-white/90 px-3.5 py-2 font-semibold text-navy transition hover:border-gold hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
