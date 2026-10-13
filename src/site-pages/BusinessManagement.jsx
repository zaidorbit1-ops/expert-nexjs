'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  ClipboardList,
  FileText,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import Breadcrumb from '../design-system/Breadcrumb';
import Button from '../design-system/Button';
import Card from '../design-system/Card';
import CTABanner from '../design-system/CTABanner';
import FAQAccordion from '../design-system/FAQAccordion';
import Section from '../design-system/Section';
import { PageContentSections } from './PageContentSections';

const strengths = [
  {
    title: 'PhD Experts',
    description: 'UK-qualified writers with real business research and academic experience.',
    icon: Award,
  },
  {
    title: 'Plagiarism-Free',
    description: 'Original, citation-ready work produced to match your module requirements.',
    icon: ShieldCheck,
  },
];

const reasons = [
  {
    icon: BookOpen,
    title: 'Why Business Scholars Choose Us',
    description: 'Our writing team delivers accurate business research, strong argument structure and original analysis for every assignment.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Academic Standards',
    description: 'We write to UK business school conventions, with full referencing and evidence-based insight.',
  },
  {
    icon: Users,
    title: 'Support Through Every Stage',
    description: 'Dedicated support keeps your project on schedule, from brief to final submission.',
  },
];

const focusAreas = [
  {
    icon: Briefcase,
    title: 'Strategic Management',
    description: 'PESTLE analysis, SWOT, Porter’s Five Forces and strategy frameworks for dissertation and coursework projects.',
  },
  {
    icon: TrendingUp,
    title: 'Business Finance',
    description: 'Financial statement analysis, corporate finance, valuation and investment reports for UK modules.',
  },
  {
    icon: ClipboardList,
    title: 'Operations',
    description: 'Process improvement, supply chain management and operations strategy papers with practical insight.',
  },
];

const managementTopics = [
  {
    eyebrow: 'Strategic Management',
    title: 'Corporate strategy, competitive advantage and leadership analysis.',
  },
  {
    eyebrow: 'HRM',
    title: 'Organisational behaviour, recruitment strategy and employee relations.',
  },
  {
    eyebrow: 'Operations',
    title: 'Logistics, process planning and efficiency improvement assignments.',
  },
  {
    eyebrow: 'Marketing',
    title: 'Market research, consumer analysis and brand strategy projects.',
  },
  {
    eyebrow: 'Business Finance',
    title: 'Investment appraisal, budgeting and corporate reporting papers.',
  },
];

const workflow = [
  {
    title: 'Requirements',
    description: 'Submit your brief, rubric and study material so we can scope the assignment precisely.',
  },
  {
    title: 'Matching Expert',
    description: 'We assign a UK business specialist with the right academic background for your brief.',
  },
  {
    title: 'Drafting',
    description: 'Your writer builds the essay, report or case study with rigorous analysis and referencing.',
  },
  {
    title: 'Quality Check',
    description: 'Editing and academic review ensure structure, citations and language are submission-ready.',
  },
];

const expertise = [
  ['Strategic Case Studies', 'In-depth analysis of global business scenarios.'],
  ['Literature Reviews', 'Critical synthesis of academic and industry sources.'],
  ['Business Dissertations', 'Full dissertations crafted with methodology and analysis.'],
  ['Reflective Essays', 'Professional reflective writing aligned to UK marking criteria.'],
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    subtitle: 'MBA Student, Manchester',
    quote: '"The strategic management paper was structured perfectly and the analysis of SWOT and Porter was spot on. I secured a first-class grade thanks to their expertise."',
  },
  {
    name: 'Marcus Khan',
    subtitle: 'Finance Student, London',
    quote: '"The finance assignment was delivered ahead of time and the modelling was excellent. The writer understood the UK grading rubric completely."',
  },
  {
    name: 'Lucia Thompson',
    subtitle: 'Business Analytics, Essex',
    quote: '"Excellent service. My report was highly academic with clear recommendations. I was impressed by the professional quality and the UK-level insight."',
  },
];

const faqs = [
  {
    question: 'What types of business management assignments can I get help with?',
    answer: 'Common formats include business essays, case studies, reports and analysis of strategy, marketing, leadership or operations. The assignment question determines which area and format are relevant.',
  },
  {
    question: 'What information should I provide for a business assignment?',
    answer: 'Include the task, course level, word count, deadline and marking criteria. If the assignment is based on an organisation or case, provide its details and any required frameworks or data.',
  },
  {
    question: 'How should I reference business sources?',
    answer: 'Use the style specified by your university and cite sources for data, models and ideas. Include sources that are relevant to the organisation or market being analysed, and follow your course rules for business reports.',
  },
];

function BusinessStrategyIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="Business strategy dashboard showing market insight, operations and growth"
      className="relative mx-auto aspect-[1.08] w-full max-w-[34rem]"
    >
      <div aria-hidden="true" className="absolute inset-[7%] rounded-[50%] bg-gold/10 blur-2xl" />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [8, 5, 8], y: [0, -4, 0] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[15%_9%_9%_17%] rounded-[2rem] bg-gold shadow-card"
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [-5, -3, -5], y: [0, 4, 0] }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[10%_16%_14%_9%] rounded-[2rem] bg-navy-deep shadow-card"
      />
      <div className="absolute inset-[7%_12%_12%_12%] overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-card sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4">
          <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-500 sm:text-[11px]">
            <Briefcase size={14} className="text-gold-deep" aria-hidden="true" />
            Business strategy
          </span>
          <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-navy sm:px-3 sm:text-[9px]">
            Case analysis
          </span>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] items-start gap-3 sm:mt-5">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-500 sm:text-[9px]">Strategic overview</p>
            <p className="mt-1 font-display text-sm font-semibold text-navy sm:text-lg">From insight to action</p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-navy text-gold sm:h-10 sm:w-10">
            <TrendingUp size={18} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
          {[
            ['Market', 'Context'],
            ['Evidence', 'Analysis'],
            ['Strategy', 'Options'],
            ['Outcome', 'Evaluation'],
          ].map(([label, value], index) => (
            <div key={label} className={`rounded-xl border p-2.5 sm:p-3 ${index === 2 ? 'border-gold/60 bg-gold/10' : 'border-slate-200 bg-white'}`}>
              <span className="block text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[9px]">{label}</span>
              <span className="mt-1 block text-[9px] font-semibold text-navy sm:text-[11px]">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-slate-50 p-2.5 sm:mt-4 sm:p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[9px]">Business performance</span>
            <span className="text-[8px] font-semibold text-gold-deep sm:text-[9px]">Evidence-led</span>
          </div>
          <div className="relative h-12 overflow-hidden sm:h-16">
            <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-200" />
            <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-slate-200" />
            <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-200" />
            <svg viewBox="0 0 320 64" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <motion.path
                d="M4 54 C40 48 46 34 78 40 S126 44 152 28 S204 36 228 18 S276 22 316 5"
                fill="none"
                stroke="#C89545"
                strokeWidth="3"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              />
              <circle cx="316" cy="5" r="4" fill="#0D3055" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessManagement() {
  const reduceMotion = useReducedMotion();

  return (
    <main id="main-content" className="overflow-hidden">
      <div className="relative bg-[var(--color-surface)]">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Business Management' }]} />
        <section className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft">
              <Briefcase size={15} className="text-gold-deep" aria-hidden="true" />
              Global Business Academic Support
            </p>
            <h1 className="max-w-[44rem] font-display text-display-lg-mobile leading-[1.06] tracking-tight text-navy sm:text-display-lg">
              Business Management Assignment Help for UK Students
            </h1>
            <p className="mt-6 max-w-[39rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Empowering students with meticulously researched, case-study-driven papers authored by PhD practitioners. Elevate your GPA with scholarly rigor and bespoke UK academic guidance.
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
              {strengths.map(({ title, description, icon: Icon }) => (
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
            <BusinessStrategyIllustration />
          </motion.div>
        </section>
      </div>

      <Section className="bg-navy py-14 sm:py-16 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-white/10 bg-white/[0.06] p-6 text-white sm:p-7" tilt={false}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="business-focus">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Business management subjects</p>
          <h2 className="font-display text-headline-lg text-navy">Explore key areas of business study</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-6 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]">
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Business management coverage</p>
          <h2 className="font-display text-headline-lg text-navy">Comprehensive Management Coverage</h2>
        </div>
        <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-7 text-[var(--color-muted)]">
          From marketing and HRM to operations and business finance, our writers cover every business management assignment brief with precision.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {managementTopics.map(({ eyebrow, title }) => (
            <Card key={eyebrow} className="min-h-40 p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-deep">{eyebrow}</p>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy">{title}</h3>
            </Card>
          ))}
          <Card className="min-h-40 border-gold/40 bg-gold/10 p-6 sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">Custom Case Study Help</p>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy">Custom case study support with tailored analysis and executive summary.</h3>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Learn More <ArrowRight size={15} aria-hidden="true" />
            </button>
          </Card>
        </div>
      </Section>

      <PageContentSections page="business" variant="editorial" />

      <Section>
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Your Path to an A+ Grade</p>
          <h2 className="font-display text-headline-lg text-navy">A precision-engineered workflow designed for academic excellence.</h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map(({ title, description }, index) => (
            <motion.li
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Card className="h-full p-5 sm:p-6" tilt={false}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 font-display text-sm font-semibold text-navy">{`0${index + 1}`}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
              </Card>
            </motion.li>
          ))}
        </ol>
      </Section>

      <Section className="bg-navy">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">Diverse Academic Expertise</p>
          <h2 className="font-display text-headline-lg text-white">Our business writing services span every management vertical.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map(([title, description]) => (
            <Card key={title} className="border-white/10 bg-white/[0.06] p-5 text-white sm:p-6" tilt={false}>
              <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold">
                <FileText size={19} aria-hidden="true" />
              </span>
              <h3 className="font-display text-base font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Voices of Success</p>
          <h2 className="font-display text-headline-lg text-navy">What our business students say</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map(({ name, subtitle, quote }) => (
            <Card key={name} className="p-6 sm:p-7" tilt={false}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-navy">
                <CheckCircle size={19} aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{quote}</p>
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="font-semibold text-navy">{name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <FAQAccordion items={faqs} />
      <CTABanner
        heading="Need Expert Assignment Help Today?"
        text="Don't let deadline stress affect your mental health. Let our professionals handle the heavy lifting while you focus on what matters."
        buttonLabel="Order Now"
      />
    </main>
  );
}
