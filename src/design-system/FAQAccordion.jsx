'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Section from './Section';

const homeFaqs = [
  {
    question: 'What types of assignments can I get help with?',
    answer: 'Support is available across the subjects listed on the site and can cover essays, reports, case studies, coursework and research projects. Check the relevant subject page and include your specific task when you submit an enquiry.',
  },
  {
    question: 'What information should I include when I request help?',
    answer: 'Share the assignment question, course level, word count, deadline and marking criteria. Include any required structure, referencing style, sources or data so the task can be understood clearly.',
  },
  {
    question: 'Can I request support for a particular subject?',
    answer: 'Yes. The site has separate pages for business management, accounting, finance, law, nursing, psychology, computer science, engineering and economics. Choose the closest subject and describe your assignment in the enquiry.',
  },
  {
    question: 'Which referencing style should I use?',
    answer: 'Follow your university or module instructions. Harvard, APA and OSCOLA are used on many UK courses, but requirements vary by subject and institution.',
  },
];

export default function FAQAccordion({ items = homeFaqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <Section className="bg-[var(--color-surface)]" innerClassName="max-w-4xl">
      <div className="mb-10 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">Helpful answers</p>
        <h2 className="font-display text-headline-lg text-[var(--color-text)]">Frequently Asked Questions</h2>
      </div>
      <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {items.map(({ question, answer }, index) => {
          const isOpen = openIndex === index;
          const panelId = `home-faq-answer-${index}`;
          return (
            <div key={question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-base font-semibold text-[var(--color-text)] sm:py-6 sm:text-lg"
                >
                  {question}
                  <ChevronDown size={19} aria-hidden="true" className={`shrink-0 text-gold-deep transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    key="content"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
