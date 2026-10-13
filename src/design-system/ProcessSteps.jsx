'use client';

import {
  ArrowDownToLine,
  ArrowRight,
  BookOpenCheck,
  Check,
  ClipboardCheck,
  FileText,
  SearchCheck,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Card from './Card';
import Section from './Section';

const steps = [
  {
    number: '01',
    stage: 'You share the brief',
    icon: FileText,
    title: 'Submit Order',
    description: 'Fill our simple form with your assignment requirements, deadline, and specific guidelines.',
  },
  {
    number: '02',
    stage: 'We find the right fit',
    icon: UsersRound,
    title: 'Expert Matched',
    description: 'A subject-matter expert is carefully matched to your assignment based on their specialization.',
  },
  {
    number: '03',
    stage: 'We review the work',
    icon: SearchCheck,
    title: 'Quality Check',
    description: 'Your work undergoes rigorous plagiarism and grammar audits to ensure excellence.',
  },
  {
    number: '04',
    stage: 'Ready for you',
    icon: ArrowDownToLine,
    title: 'Final Delivery',
    description: 'Download your polished, academic-ready paper with full Turnitin report included.',
  },
];

function StepIllustration({ number }) {
  if (number === '01') {
    return (
      <div className="mx-auto w-full max-w-[14rem] rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_14px_35px_-28px_rgba(8,24,41,.4)]">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold/15 text-navy"><FileText size={14} aria-hidden="true" /></span>
          <span className="space-y-1">
            <span className="block h-1.5 w-16 rounded bg-navy/70" />
            <span className="block h-1 w-11 rounded bg-slate-200" />
          </span>
          <Check size={14} className="ml-auto text-gold-deep" aria-hidden="true" />
        </div>
        <div className="mt-3 space-y-2">
          <span className="block h-1 w-full rounded bg-slate-200" />
          <span className="block h-1 w-10/12 rounded bg-slate-200" />
          <span className="block h-1 w-8/12 rounded bg-slate-200" />
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-navy">Subject</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-navy">Deadline</span>
        </div>
      </div>
    );
  }

  if (number === '02') {
    return (
      <div className="relative mx-auto flex w-full max-w-[14rem] items-center justify-center gap-3">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-slate-200 bg-white text-navy shadow-[0_14px_35px_-28px_rgba(8,24,41,.4)]">
          <BookOpenCheck size={25} strokeWidth={1.6} aria-hidden="true" />
        </div>
        <div className="flex flex-col items-center gap-1.5 text-gold-deep">
          <span className="h-px w-6 bg-gold/70" />
          <ArrowRight size={15} aria-hidden="true" />
          <span className="h-px w-6 bg-gold/70" />
        </div>
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-gold shadow-[0_14px_35px_-28px_rgba(8,24,41,.4)]">
          <UserRoundCheck size={25} strokeWidth={1.6} aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (number === '03') {
    return (
      <div className="mx-auto w-full max-w-[14rem] rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_14px_35px_-28px_rgba(8,24,41,.4)]">
        <div className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          <ClipboardCheck size={14} className="text-navy" aria-hidden="true" />
          Final review
        </div>
        <div className="space-y-2.5">
          {['Structure & clarity', 'Grammar & spelling', 'Originality check'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-gold/20 text-navy"><Check size={10} aria-hidden="true" /></span>
              <span className="text-[9px] font-medium text-navy">{item}</span>
              <span className="ml-auto h-1 w-6 rounded bg-gold/70" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[14rem] items-center justify-center">
      <div className="relative w-28 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_14px_35px_-28px_rgba(8,24,41,.4)]">
        <span className="mb-3 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-500">
          <FileText size={12} className="text-navy" aria-hidden="true" /> Your paper
        </span>
        <span className="mb-2 block h-1.5 w-4/5 rounded bg-navy/70" />
        <span className="mb-1.5 block h-1 w-full rounded bg-slate-200" />
        <span className="mb-1.5 block h-1 w-5/6 rounded bg-slate-200" />
        <span className="block h-1 w-3/5 rounded bg-slate-200" />
        <span className="absolute -bottom-2 -right-3 grid h-9 w-9 place-items-center rounded-xl border-2 border-white bg-gold text-navy">
          <ArrowDownToLine size={17} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default function ProcessSteps() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="process" className="overflow-hidden bg-[var(--color-surface)]">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">How it works</p>
        <h2 className="font-display text-headline-lg text-[var(--color-text)]">Simple 4-Step Process</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--color-muted)] sm:text-base">
          From sharing your assignment brief to receiving the completed work, here is what happens at every step.
        </p>
      </div>

      <div className="relative">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-[12.5%] top-[2.45rem] hidden h-10 w-[75%] overflow-visible lg:block"
          viewBox="0 0 900 40"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 20 H900"
            stroke="#CFA049"
            strokeWidth="2"
            strokeDasharray="7 9"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.4 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps.map(({ number, stage, icon: Icon, title, description }, index) => (
            <motion.li
              key={number}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Card className="h-full border-[var(--color-border)] bg-white p-5 shadow-[0_16px_44px_-34px_rgba(8,24,41,.35)] sm:p-6" tilt={false}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-navy">
                    <Icon size={13} aria-hidden="true" />
                    Step {number}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-tight text-navy/15">{number}</span>
                </div>

                <div className="my-5 flex min-h-[8.75rem] items-center justify-center rounded-2xl bg-[var(--color-surface)] px-3 py-4 sm:min-h-[9.5rem]">
                  <StepIllustration number={number} />
                </div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--color-muted)]">{stage}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[var(--color-text)]">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[var(--color-muted)] sm:text-sm sm:leading-6">{description}</p>
              </Card>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
