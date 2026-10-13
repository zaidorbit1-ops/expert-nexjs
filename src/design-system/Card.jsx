'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Card({ className = '', children, tilt = true }) {
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event) => {
    if (reduceMotion || !tilt) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--card-rotate-x', `${-y * 12}deg`);
    event.currentTarget.style.setProperty('--card-rotate-y', `${x * 12}deg`);
    event.currentTarget.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`);
  };

  const resetPointer = (event) => {
    event.currentTarget.style.setProperty('--card-rotate-x', '0deg');
    event.currentTarget.style.setProperty('--card-rotate-y', '0deg');
  };

  return (
    <motion.article
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      className={`relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_var(--pointer-x,50%)_var(--pointer-y,50%),rgba(207,160,73,.12),transparent_42%)] after:opacity-0 after:transition-opacity hover:after:opacity-100 hover:shadow-[var(--shadow-deep)] ${tilt ? '[transform:perspective(1000px)_rotateX(var(--card-rotate-x,0deg))_rotateY(var(--card-rotate-y,0deg))]' : ''} ${className}`}
    >
      {children}
    </motion.article>
  );
}
