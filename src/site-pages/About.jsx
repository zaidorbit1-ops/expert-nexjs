'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  CheckCircle,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LibraryBig,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Breadcrumb from '../design-system/Breadcrumb';
import Button from '../design-system/Button';
import Card from '../design-system/Card';
import CTABanner from '../design-system/CTABanner';
import FAQAccordion from '../design-system/FAQAccordion';
import Section from '../design-system/Section';

const aboutFaqs = [
  {
    question: 'What does Expert Assignment Writers provide?',
    answer: 'The website provides academic assignment support across the subjects shown in its service directory. The subject pages describe the main topics and assignment formats.',
  },
  {
    question: 'How can I make sure support fits my course?',
    answer: 'Use the assignment brief and module guidance to explain the task, course level, expected format and marking criteria. Check your university rules on permitted assistance.',
  },
  {
    question: 'Which details help explain an assignment?',
    answer: 'The question, subject, course level, deadline, word count and any required referencing style help make the assignment scope clear. Add relevant sources or data if your course provided them.',
  },
];

const overviewCards = [
  { value: '9', description: 'Subject areas listed in the directory' },
  { value: 'Essays', description: 'Alongside reports and research work' },
  { value: 'UK', description: 'Focused subject and study guidance' },
  { value: 'Brief', description: 'Course instructions help define each task' },
];

const missionValues = [
  {
    icon: BookOpen,
    title: 'Academic Integrity',
    description: 'Research-driven writing with original references and custom structure.',
  },
  {
    icon: ShieldCheck,
    title: 'Course Requirements',
    description: 'Check your university guidance on permitted assistance, citations and assessment rules.',
  },
];

const approachCards = [
  {
    icon: Users,
    title: 'Subject Coverage',
    description: 'The directory includes business, accounting, finance, law, nursing, psychology, computer science, engineering and economics.',
  },
  {
    icon: CheckCircle,
    title: 'Assessment Guidance',
    description: 'Use the question, marking criteria and module instructions to understand what your assessment expects.',
  },
  {
    icon: ShieldCheck,
    title: 'Useful Assignment Details',
    description: 'Include the task, course level, deadline, word count and required format when you explain an assignment.',
  },
];

function BriefIllustration() {
  return (
    <div aria-label="Illustration of an organised assignment brief" role="img" className="relative mx-auto aspect-[1.12] w-full max-w-[33rem]">
      <div aria-hidden="true" className="absolute inset-[4%] rounded-[2rem] bg-gold/10" />
      <div aria-hidden="true" className="absolute inset-[11%_8%_7%_16%] rotate-[-5deg] rounded-[1.75rem] bg-gold shadow-card" />
      <div aria-hidden="true" className="absolute inset-[8%_15%_10%_9%] rotate-[3deg] rounded-[1.75rem] bg-navy-deep shadow-card" />
      <div className="absolute inset-[5%_12%_13%_12%] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-card sm:p-7">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
            <FileText size={15} className="text-gold-deep" aria-hidden="true" /> Assignment plan
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-navy">On track</span>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-navy"><BookOpenCheck size={21} aria-hidden="true" /></span>
          <div className="flex-1">
            <span className="block text-xs font-semibold text-navy sm:text-sm">Your assignment brief</span>
            <span className="mt-1 block text-[10px] text-slate-500 sm:text-xs">A clear starting point</span>
          </div>
          <CheckCircle size={18} className="text-gold-deep" aria-hidden="true" />
        </div>
        <div className="mt-5 rounded-xl bg-slate-50 p-3.5 sm:p-4">
          <span className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            <ClipboardCheck size={13} className="text-navy" aria-hidden="true" /> Key requirements
          </span>
          <div className="space-y-3">
            {['Subject and course level', 'Question and marking guidance', 'Deadline and required format'].map((item, index) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[8px] font-semibold text-navy shadow-sm">{`0${index + 1}`}</span>
                <span className="flex-1 text-[9px] font-medium text-navy sm:text-[10px]">{item}</span>
                <CheckCircle size={13} className="text-gold-deep" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 p-3">
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500">Research</span>
            <span className="mt-1 block text-[10px] font-semibold text-navy">Evidence-led</span>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500">Structure</span>
            <span className="mt-1 block text-[10px] font-semibold text-navy">Brief aligned</span>
          </div>
        </div>
      </div>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-1 top-[24%] rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-soft sm:left-0"
      >
        <span className="block text-[10px] font-semibold text-navy sm:text-xs">Subject coverage</span>
        <span className="mt-1 block text-[9px] text-slate-500 sm:text-[11px]">Across 9 study areas</span>
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-1 bottom-[9%] rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-soft sm:right-0"
      >
        <span className="block text-[10px] font-semibold text-navy sm:text-xs">Course guidance</span>
        <span className="mt-1 block text-[9px] text-slate-500 sm:text-[11px]">Your requirements matter</span>
      </motion.div>
    </div>
  );
}

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main id="main-content" className="overflow-hidden">
      <div className="relative bg-[var(--color-surface)]">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <Breadcrumb items={[{ label: 'About' }]} />
        <section className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft">
              <GraduationCap size={15} className="text-gold-deep" aria-hidden="true" />
              Academic Support for UK Students
            </p>
            <h1 className="max-w-[44rem] font-display text-display-lg-mobile leading-[1.06] tracking-tight text-navy sm:text-display-lg">
              About Expert Assignment Writers
            </h1>
            <p className="mt-6 max-w-[39rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Expert Assignment Writers provides assignment support across the subject areas listed on this site. Each subject page outlines common topics and formats, while your course brief explains the requirements for your own work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/447476950970" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-card">
                Chat on Whatsapp <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Button variant="secondary" size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}>
                Order Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? undefined : { duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <BriefIllustration />
          </motion.div>
        </section>
      </div>

      <Section className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewCards.map(({ value, description }, index) => (
            <Card key={description} className="flex min-h-36 items-start gap-4 p-5 sm:p-6" tilt>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]">
                {index === 0 ? <LibraryBig size={19} aria-hidden="true" /> : index === 1 ? <FileText size={19} aria-hidden="true" /> : index === 2 ? <GraduationCap size={19} aria-hidden="true" /> : <ClipboardCheck size={19} aria-hidden="true" />}
              </span>
              <span>
                <span className="block font-display text-2xl font-semibold text-navy">{value}</span>
                <span className="mt-2 block text-sm leading-5 text-[var(--color-muted)]">{description}</span>
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="methods" className="bg-[var(--color-surface)]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">What guides us</p>
            <h2 className="font-display text-headline-lg text-navy">Our Mission</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Our aim is to make assignment support easier to understand by setting out subject coverage, common formats and the information that helps explain a task. Use your course instructions to guide the requirements for your work.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {missionValues.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="p-5 sm:p-6" tilt>
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute inset-4 rounded-[2rem] bg-gold/10" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-5 shadow-card sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
                  <LibraryBig size={16} className="text-gold-deep" aria-hidden="true" /> Our focus
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-gold"><BookOpen size={18} aria-hidden="true" /></span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-navy sm:text-2xl">Our Focus</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                To present clear information about subject support and help students understand which assignment details are relevant when making an enquiry.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[BookOpenCheck, ClipboardCheck, ArrowDownToLine].map((Icon, index) => (
                  <div key={index} className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-xl bg-[var(--color-surface)] p-3 text-center">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-sm"><Icon size={17} aria-hidden="true" /></span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">{['Brief', 'Guidance', 'Next steps'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="case-studies">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">How we organise support</p>
            <h2 className="font-display text-headline-lg text-navy">A Clear Approach to Assignment Support</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Assignment requirements vary between courses and subjects. The site organises its information by subject and common coursework formats so students can identify the guidance most relevant to their brief.
            </p>
          </div>
          <Button href="/services" variant="secondary" className="shrink-0">Browse Full Directory</Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {approachCards.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="h-full p-6 sm:p-7" tilt>
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]">
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <FAQAccordion items={aboutFaqs} />
      <CTABanner />
    </main>
  );
}

export default About;
