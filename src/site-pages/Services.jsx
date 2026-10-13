'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Check,
  ClipboardList,
  Code2,
  DollarSign,
  FileText,
  Gavel,
  Headphones,
  Layers3,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import Breadcrumb from '../design-system/Breadcrumb';
import Button from '../design-system/Button';
import Card from '../design-system/Card';
import CTABanner from '../design-system/CTABanner';
import FAQAccordion from '../design-system/FAQAccordion';
import Section from '../design-system/Section';

const services = [
  {
    icon: Briefcase,
    title: 'Business Management',
    description: 'Strategic analysis, leadership studies and market research for business coursework.',
    href: '/business-management',
    category: 'Business & management',
  },
  {
    icon: TrendingUp,
    title: 'Accounting',
    description: 'Financial reporting, audit assignments and tax research for accounting modules.',
    href: '/accounting-assignments',
    category: 'Business & management',
  },
  {
    icon: DollarSign,
    title: 'Finance',
    description: 'Portfolio analysis, investment strategy and corporate finance coursework.',
    href: '/finance-assignments',
    category: 'Business & management',
  },
  {
    icon: Gavel,
    title: 'Law',
    description: 'Legal essays, case studies and research with citation requirements in focus.',
    href: '/law-assignments',
    category: 'Social sciences',
  },
  {
    icon: Stethoscope,
    title: 'Nursing',
    description: 'Clinical care planning, reflective practice and evidence based nursing assignments.',
    href: '/nursing-assignments',
    category: 'Health & care',
  },
  {
    icon: BookOpen,
    title: 'Psychology',
    description: 'Behavioural research, cognitive theory essays and experimental analysis coursework.',
    href: '/psychology-assignments',
    category: 'Social sciences',
  },
  {
    icon: Code2,
    title: 'Computer Science',
    description: 'Algorithm design, programming reports and system architecture coursework.',
    href: '/computer-science-assignments',
    category: 'Technology & engineering',
  },
  {
    icon: ClipboardList,
    title: 'Engineering',
    description: 'Technical reports, feasibility studies and design calculations for multiple disciplines.',
    href: '/engineering-assignments',
    category: 'Technology & engineering',
  },
  {
    icon: ShieldCheck,
    title: 'Economics',
    description: 'Economic modelling, policy evaluation and macroeconomic or microeconomic analysis.',
    href: '/economics-assignments',
    category: 'Social sciences',
  },
];

const guidanceSections = [
  {
    title: 'Choose the subject area that fits your brief',
    body: 'The subject directory brings related areas together so you can find support relevant to your course. Each subject page describes the topics and assignment formats covered.',
    points: ['Business, management and accounting', 'Law, nursing, psychology and economics', 'Finance, engineering and computer science'],
  },
  {
    title: 'Different assignment formats need different approaches',
    body: 'An essay develops an argument, while a report may need findings and recommendations. A case study applies concepts to a defined situation, and research work explains its method and evidence.',
    points: ['Essays, coursework and written reports', 'Case studies and reflective assignments', 'Research, data analysis and dissertation work'],
  },
  {
    title: 'What to have ready before starting',
    body: 'A useful brief explains both the task and its academic context. Check your module guidance and provide the details that will shape the work.',
    points: ['Question, learning outcomes and marking criteria', 'Word count, deadline and required structure', 'Referencing rules, source material and any data'],
  },
];

const servicePrinciples = [
  {
    icon: Users,
    title: 'Subject Coverage',
    description: 'Explore subject support across business, health, social sciences, technology and more.',
  },
  {
    icon: ShieldCheck,
    title: 'Course Requirements',
    description: 'Check your module instructions for the required format, citation style and assessment criteria.',
  },
  {
    icon: Headphones,
    title: 'Enquiry Options',
    description: 'Use the contact form or the details on the contact page to send a question about the service.',
  },
];

const serviceFaqs = [
  {
    question: 'Which subjects are covered?',
    answer: 'The directory includes business management, accounting, finance, law, nursing, psychology, computer science, engineering and economics. Each subject page explains its focus.',
  },
  {
    question: 'What kinds of assignments are covered?',
    answer: 'The service pages describe formats such as essays, reports, case studies, coursework and research projects. The assignment brief determines the format and scope of an individual request.',
  },
  {
    question: 'What information should I include in an enquiry?',
    answer: 'Include the task question, course level, word count, deadline and assessment criteria. Add any required structure, subject guidance, sources or data relevant to the work.',
  },
];

function ServicesIllustration() {
  const reduceMotion = useReducedMotion();
  const subjectNodes = [
    { label: 'Business', icon: Briefcase, position: 'left-[3%] top-[5%]' },
    { label: 'Health & care', icon: Stethoscope, position: 'right-[3%] top-[5%]' },
    { label: 'Social sciences', icon: Users, position: 'left-[3%] bottom-[5%]' },
    { label: 'Technology', icon: Code2, position: 'right-[3%] bottom-[5%]' },
  ];

  return (
    <div role="img" aria-label="Diagram connecting subject areas to assignment support" className="relative mx-auto aspect-[1.12] w-full max-w-[34rem]">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-2xl" />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 48, repeat: Infinity, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/45"
      />
      <svg aria-hidden="true" viewBox="0 0 544 486" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="service-network-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#CFA049" stopOpacity=".75" />
            <stop offset="100%" stopColor="#0D3055" stopOpacity=".55" />
          </linearGradient>
        </defs>
        <path d="M272 243 C205 238 157 132 120 58" fill="none" stroke="url(#service-network-line)" strokeWidth="2" strokeDasharray="5 7" />
        <path d="M272 243 C339 238 387 132 424 58" fill="none" stroke="url(#service-network-line)" strokeWidth="2" strokeDasharray="5 7" />
        <path d="M272 243 C205 248 157 354 120 428" fill="none" stroke="url(#service-network-line)" strokeWidth="2" strokeDasharray="5 7" />
        <path d="M272 243 C339 248 387 354 424 428" fill="none" stroke="url(#service-network-line)" strokeWidth="2" strokeDasharray="5 7" />
        <circle cx="272" cy="243" r="5" fill="#CFA049" />
      </svg>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-navy text-white shadow-card">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-3 px-3.5 py-4 sm:gap-4 sm:px-5 sm:py-5"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy sm:h-11 sm:w-11">
            <FileText size={19} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[11px]">Start here</span>
            <span className="mt-1 block text-xs font-semibold text-white sm:text-sm">Your assignment brief</span>
          </span>
        </motion.div>
      </div>
      {subjectNodes.map(({ label, icon: Icon, position }, index) => (
        <motion.div
          key={label}
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: index % 2 === 0 ? [0, -4, 0] : [0, 4, 0] }}
          transition={reduceMotion ? undefined : { duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute z-20 flex w-[39%] flex-col items-center gap-1.5 text-center ${position}`}
        >
          <span className={`grid h-11 w-11 place-items-center rounded-full border-2 bg-white shadow-soft sm:h-14 sm:w-14 ${index % 2 === 0 ? 'border-gold/70 text-navy' : 'border-navy/20 text-gold-deep'}`}>
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-[9px] font-semibold text-navy sm:text-[11px]">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <main id="main-content" className="overflow-hidden">
      <div className="relative bg-[var(--color-surface)]">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <Breadcrumb items={[{ label: 'Services' }]} />
        <section className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft">
              <Layers3 size={15} className="text-gold-deep" aria-hidden="true" />
              Subject Areas
            </p>
            <h1 className="max-w-[45rem] font-display text-display-lg-mobile leading-[1.06] tracking-tight text-navy sm:text-display-lg">
              Assignment Writing Services Across Key Subjects
            </h1>
            <p className="mt-6 max-w-[39rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Explore assignment support across the subjects listed below. Each page outlines common topics and assignment formats.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}>Start your brief</Button>
              <Button href="#subject-directory" variant="secondary" size="lg">Browse subjects</Button>
            </div>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? undefined : { duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServicesIllustration />
          </motion.div>
        </section>
      </div>

      <Section id="subject-directory">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Explore the directory</p>
            <h2 className="font-display text-headline-lg text-navy">Find Support by Subject</h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold text-navy">
            <BookOpen size={14} className="text-gold-deep" aria-hidden="true" /> Browse subject support
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, href, category }, index) => (
            <motion.div
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Card className="group flex h-full min-h-[17rem] flex-col p-6 sm:p-7" tilt>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)] transition-colors group-hover:bg-gold group-hover:text-navy">
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.11em] text-[var(--color-muted)]">{category}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-navy">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
                <Link href={href} className="nav-underline mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy">
                  Learn More <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">A practical starting point</p>
          <h2 className="font-display text-headline-lg text-navy">Build a Clear Assignment Brief</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            Use these three steps to find the right subject guidance and share the details that shape your assignment.
          </p>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute left-[16.5%] right-[16.5%] top-8 hidden h-px bg-gold/45 lg:block" />
          <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {guidanceSections.map(({ title, body, points }, index) => {
              const Icon = [Layers3, FileText, ClipboardList][index];
              const stage = ['Select a study area', 'Identify the assignment type', 'Set out the requirements'][index];

              return (
                <motion.li
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.14 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <Card className="flex h-full flex-col overflow-visible border-[var(--color-border)] bg-white p-6 shadow-[0_18px_48px_-38px_rgba(8,24,41,.4)] sm:p-7" tilt={false}>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-navy">
                        Step 0{index + 1}
                      </span>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border-[5px] border-[var(--color-surface)] bg-navy text-gold shadow-sm">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                    </div>

                    <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">{stage}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-navy">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{body}</p>

                    <ul className="mt-6 space-y-3 border-t border-[var(--color-border)] pt-5">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm leading-5 text-navy">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15">
                            <Check size={12} className="text-navy" aria-hidden="true" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Section>

      <Section className="bg-navy">
        <div className="grid gap-5 md:grid-cols-3">
          {servicePrinciples.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="h-full border-white/15 bg-white/[0.06] p-6 text-white sm:p-7" tilt={false}>
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gold text-navy">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <FAQAccordion items={serviceFaqs} />
      <CTABanner />
    </main>
  );
}

export default Services;
