'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const stats = [
  { value: 10, suffix: 'k+', label: 'papers supported' },
  { value: 100, suffix: '+', label: 'subjects covered' },
  { value: 4.9, suffix: '/5', label: 'student rating', decimals: 1 },
  { value: 2012, suffix: '', label: 'supporting students since' },
];

function AnimatedStat({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const progress = useMotionValue(0);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState('0');

  useMotionValueEvent(progress, 'change', (latest) => {
    setDisplayValue(decimals ? latest.toFixed(decimals) : Math.round(latest).toLocaleString('en-GB'));
  });

  useEffect(() => {
    if (!isInView) return undefined;
    if (reduceMotion) {
      progress.set(value);
      return undefined;
    }
    const controls = animate(progress, value, { duration: 1.2, ease: 'easeOut' });
    return () => controls.stop();
  }, [isInView, progress, reduceMotion, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section aria-label="Our experience" className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto grid max-w-[80rem] grid-cols-2 divide-x divide-[var(--color-border)] px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {stats.map(({ value, suffix, label, decimals }, index) => (
          <div key={label} className={`px-4 py-7 text-center sm:px-6 sm:py-9 ${index > 1 ? 'border-t border-[var(--color-border)] lg:border-t-0' : ''}`}>
            <p className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl"><AnimatedStat value={value} suffix={suffix} decimals={decimals} /></p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--color-muted)] sm:text-xs sm:tracking-[0.14em]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
