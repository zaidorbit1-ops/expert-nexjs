'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Section({
  as: Element = 'section',
  id,
  className = '',
  innerClassName = '',
  children,
}) {
  const reduceMotion = useReducedMotion();
  const SectionElement = motion[Element] || motion.section;

  return (
    <SectionElement
      id={id}
      className={`relative py-16 sm:py-20 lg:py-24 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12 ${innerClassName}`}>
        {children}
      </div>
    </SectionElement>
  );
}
