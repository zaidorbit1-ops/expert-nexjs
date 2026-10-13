'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  CheckCircle,
  ClipboardList,
  Clock,
  DollarSign,
  FileText,
  MessageCircle,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import Breadcrumb from '../design-system/Breadcrumb';
import Button from '../design-system/Button';
import Card from '../design-system/Card';
import CTABanner from '../design-system/CTABanner';
import FAQAccordion from '../design-system/FAQAccordion';
import Section from '../design-system/Section';
import { PageContentSections } from './PageContentSections';

const specialties = [
  {
    title: 'Financial Accounting',
    description: 'Double-entry bookkeeping, cash flow statements and management accounts with UK standards.',
    icon: ClipboardList,
  },
  {
    title: 'Forensic Accounting',
    description: 'Fraud detection, investigative reports and litigation support for dispute-ready submissions.',
    icon: ShieldAlert,
  },
  {
    title: 'Management Accounting',
    description: 'Budgeting, forecasting and performance analysis for business reports and case studies.',
    icon: Activity,
  },
  {
    title: 'Taxation',
    description: 'UK tax planning, VAT compliance and corporate tax reports written to current legislation.',
    icon: DollarSign,
  },
  {
    title: 'Auditing',
    description: 'Internal control reviews, audit planning and assurance reports with practical clarity.',
    icon: ShieldCheck,
  },
  {
    title: 'Corporate Finance',
    description: 'Valuation, capital structure and investment appraisal papers for finance-focused modules.',
    icon: BookOpen,
  },
];

const strengths = [
  {
    icon: Clock,
    title: '3-Hour Rapid Delivery',
    description: 'Fast turnarounds for urgent finance and audit briefs.',
  },
  {
    icon: CheckCircle,
    title: '100% Free Turnitin Reports',
    description: 'Plagiarism-free accounting solutions that pass checks.',
  },
];

const accuracyPoints = [
  {
    title: 'Certified Practitioners Only',
    description: 'Assignments handled by writers with ACCA, CIMA and UK accounting qualifications.',
  },
  {
    title: 'Zero-Error Calculation Policy',
    description: 'Every numerical table and ratio is checked twice to ensure balance and accuracy.',
  },
];

const testimonials = [
  {
    quote: 'The forensic accounting assignment was so detailed and clear that I submitted with confidence. Every ratio and journal entry was perfect.',
    name: 'Sarah Jenkins',
    subtitle: 'LLM Accounting & Finance',
  },
  {
    quote: 'My audit report hit every requirement and the feedback was excellent. The team understood UK accounting standards well.',
    name: 'David Thompson',
    subtitle: 'University of Manchester',
  },
  {
    quote: 'The taxation module paper was flawless. They explained VAT and corporation tax clearly and I got a first.',
    name: 'James Wu',
    subtitle: 'Warwick Business School',
  },
];

const faqs = [
  {
    question: 'What types of accounting assignments can I get help with?',
    answer: 'The accounting service covers financial and management accounting, taxation, auditing, financial statements and related coursework. The subject page outlines common areas, while your brief defines the exact task.',
  },
  {
    question: 'What should I include in an accounting assignment brief?',
    answer: 'Share the full question, course level, word count, deadline and marking guidance. Include any figures, schedules, reporting period or accounting framework supplied by your module.',
  },
  {
    question: 'Which accounting rules and referencing style should I follow?',
    answer: 'Use the framework and citation style named by your module. If the brief does not specify a framework, check your course guidance before deciding which rules apply to the reporting context.',
  },
];

function AccountingLedgerIllustration() {
  const reduceMotion = useReducedMotion();
  const entries = [
    ['Cash at bank', '£4,800', 'DR'],
    ['Trade receivables', '£2,350', 'DR'],
    ['Sales revenue', '£4,800', 'CR'],
    ['Operating costs', '£2,350', 'CR'],
  ];

  return (
    <div
      role="img"
      aria-label="Illustration of balanced accounting entries and a financial statement"
      className="relative mx-auto aspect-[1.2] w-full max-w-[34rem]"
    >
      <div aria-hidden="true" className="absolute inset-[7%] rounded-[2rem] bg-gold/10" />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [-5, -3, -5], y: [0, 4, 0] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[14%_8%_9%_17%] rounded-[1.8rem] bg-gold shadow-card"
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [4, 2, 4], y: [0, -4, 0] }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[9%_15%_14%_9%] rounded-[1.8rem] bg-navy-deep shadow-card"
      />
      <div className="absolute inset-[5%_12%_5%_12%] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3.5 shadow-card sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 sm:pb-3">
          <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">
            <Receipt size={15} className="text-gold-deep" aria-hidden="true" />
            General ledger
          </span>
          <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-navy sm:px-3 sm:text-[9px]">
            Double entry
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 sm:mt-3.5">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[9px]">Trial balance</p>
            <h2 className="mt-1 font-display text-base font-semibold text-navy sm:text-xl">Accounts in balance</h2>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-gold sm:h-11 sm:w-11">
            <Calculator size={19} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 sm:mt-3.5">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 bg-slate-50 px-3 py-2 text-[7px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:px-4 sm:text-[8px]">
            <span>Account</span><span>Amount</span><span>Type</span>
          </div>
          {entries.map(([account, amount, type], index) => (
            <div key={account} className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-1.5 text-[8px] sm:px-4 sm:py-2 sm:text-[10px] ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
              <span className="font-medium text-navy">{account}</span>
              <span className="tabular-nums text-slate-600">{amount}</span>
              <span className={`w-6 text-center font-semibold ${type === 'DR' ? 'text-navy' : 'text-gold-deep'}`}>{type}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[9px]">Debits = Credits</span>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-navy sm:text-[10px]">
              <Check size={13} className="text-gold-deep" aria-hidden="true" /> £7,150
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-xl bg-gold/10 px-3 py-1.5 sm:mt-2.5 sm:px-4 sm:py-2">
          <CheckCircle size={15} className="shrink-0 text-gold-deep" aria-hidden="true" />
          <span className="text-[8px] font-medium leading-4 text-navy sm:text-[10px]">Traceable workings. Clear interpretation.</span>
        </div>
      </div>
    </div>
  );
}

export default function AccountingAssignment() {
  const reduceMotion = useReducedMotion();

  return (
    <main id="main-content" className="overflow-hidden">
      <div className="relative bg-[var(--color-surface)]">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Accounting' }]} />
        <section className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft">
              <Sparkles size={14} className="text-gold-deep" aria-hidden="true" />
              98.2% Distinction Rate for 2024
            </p>
            <h1 className="max-w-[44rem] font-display text-display-lg-mobile leading-[1.06] tracking-tight text-navy sm:text-display-lg">
              Accounting Assignment Help for UK Students
            </h1>
            <p className="mt-6 max-w-[39rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Struggling with balance sheets, tax reports or management accounting? Our UK accounting experts deliver polished assignments that follow professional frameworks and secure top grades.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}>Start your brief</Button>
              <a
                href="https://wa.me/447476950970"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 text-sm font-semibold text-navy shadow-soft transition hover:-translate-y-0.5 hover:border-gold hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Chat on WhatsApp
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {strengths.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="p-4 sm:p-5" tilt={false}>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h2 className="mt-3 font-display text-sm font-semibold text-navy">{title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? undefined : { duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <AccountingLedgerIllustration />
          </motion.div>
        </section>
      </div>

      <Section className="bg-[var(--color-surface)]">
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Accounting Topics and Specialisms</p>
          <h2 className="font-display text-headline-lg text-navy">Explore accounting subject areas</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="p-6 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]">
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <PageContentSections page="accounting" variant="editorial" />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[30rem]">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-[2rem] bg-gold/10" />
            <div className="relative rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">The Gold Standard of Accuracy</p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-navy sm:text-xl">Precision in every figure</h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold">
                  <Calculator size={21} aria-hidden="true" />
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {[['Source figures', 'Recorded'], ['Calculations', 'Cross-checked'], ['Final balance', 'Reconciled']].map(([label, status], index) => (
                  <div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-3 text-xs font-medium text-navy sm:text-sm">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-gold-deep shadow-sm">{`0${index + 1}`}</span>
                      {label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-navy">
                      <Check size={13} className="text-gold-deep" aria-hidden="true" />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">The Gold Standard of Accuracy</p>
            <h2 className="font-display text-headline-lg text-navy">Precision-led accounting help that delivers a distinction.</h2>
            <p className="mt-5 text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              In accounting, one decimal point can change a grade. We combine expert financial analysis with strict UK academic formatting so your assignments are accurate, compliant and ready for submission.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {accuracyPoints.map(({ title, description }) => (
                <Card key={title} className="p-5" tilt={false}>
                  <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Success Stories</p>
          <h2 className="font-display text-headline-lg text-navy">Trusted by accounting students across the UK</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map(({ quote, name, subtitle }) => (
            <Card key={name} className="p-6 sm:p-7" tilt={false}>
              <p className="text-sm leading-7 text-[var(--color-muted)]">“{quote}”</p>
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="font-semibold text-navy">{name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <FAQAccordion items={faqs} />
      <CTABanner />
    </main>
  );
}
