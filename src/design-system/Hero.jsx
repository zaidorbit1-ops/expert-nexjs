'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  BookOpen,
  Check,
  ClipboardCheck,
  FileText,
  Highlighter,
  ListChecks,
  PenLine,
  Quote,
  Sparkles,
} from 'lucide-react';
import Button from './Button';

const proofPoints = ['Original work', 'UK experts', 'On-time delivery'];

const outlineSections = [
  { number: '01', title: 'Introduction', width: 'w-4/5' },
  { number: '02', title: 'Evidence & analysis', width: 'w-full' },
  { number: '03', title: 'Conclusion', width: 'w-3/4' },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const backgroundY = useSpring(useTransform(scrollY, [0, 700], [0, 55]), {
    stiffness: 50,
    damping: 20,
  });
  const foregroundY = useTransform(scrollY, [0, 700], [0, -35]);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const moveHeroVisual = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 3);
    tiltX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 3);
  };

  const resetHeroVisual = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section className="relative isolate flex min-h-[42rem] items-center overflow-hidden bg-[var(--color-surface)] pb-14 pt-28 sm:min-h-[48rem] sm:pb-20 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: reduceMotion ? 0 : backgroundY }}
          className="absolute -right-24 top-20 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-[100px]"
        />
        <motion.div
          style={{ y: reduceMotion ? 0 : foregroundY }}
          className="absolute -left-40 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-navy/10 blur-[100px]"
        />
        <div className="hero-grid absolute inset-0 opacity-40" />
      </div>

      <div className="mx-auto grid w-full max-w-[80rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text)] shadow-soft">
            <Sparkles size={14} className="text-gold-deep" aria-hidden="true" />
            UK's trusted academic support
          </p>
          <h1 className="max-w-[46rem] font-display text-display-lg-mobile text-[var(--color-text)] sm:text-display-lg">
            Assignment Writing Services for{' '}
            <span className="relative text-[var(--color-text)] after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-3/5 after:bg-gold">
              UK Students.
            </span>
          </h1>
          <p className="mt-6 max-w-[38rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
            Research-led assignment support from experienced academic writers, built around your subject, level and deadline.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}>
              Start your brief
            </Button>
            <a
              href="#services"
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[var(--color-text)] transition hover:text-navy"
            >
              Explore our expertise <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[var(--color-text)]">
            <span aria-hidden="true" className="flex -space-x-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--color-background)] bg-gold text-xs text-navy-darker">A</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--color-background)] bg-navy-deep text-xs text-white">W</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--color-background)] bg-navy text-xs text-white">E</span>
            </span>
            10k+ papers supported
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[var(--color-muted)] sm:text-sm">
            {proofPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-2">
                <Check size={15} className="text-gold-deep" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, rotateY: -3 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={moveHeroVisual}
          onPointerLeave={resetHeroVisual}
          style={{ rotateX: reduceMotion ? 0 : tiltX, rotateY: reduceMotion ? 0 : tiltY }}
          className="relative mx-auto min-h-[25rem] w-full max-w-[34rem] [transform-style:preserve-3d] [perspective:1200px] sm:min-h-[32rem]"
        >
          <div aria-hidden="true" className="absolute inset-3 rounded-[2rem] bg-gold/10 sm:inset-0" />
          <motion.div
            aria-hidden="true"
            style={{ y: reduceMotion ? 0 : backgroundY }}
            className="absolute bottom-[7%] left-[8%] h-[27%] w-[76%] rounded-2xl border border-navy/10 bg-white shadow-[0_18px_40px_-28px_rgba(8,24,41,.45)] sm:bottom-[6%] sm:left-[11%]"
          >
            <div className="flex h-full items-center justify-center gap-3 px-5">
              <div className="h-12 w-px bg-gold/70" />
              <BookOpen size={25} strokeWidth={1.5} className="text-navy/65" />
              <div className="w-2/3 space-y-2">
                <div className="h-1.5 w-3/4 rounded-full bg-navy/25" />
                <div className="h-1 w-full rounded-full bg-slate-200" />
                <div className="h-1 w-4/5 rounded-full bg-slate-200" />
              </div>
            </div>
          </motion.div>

          <article className="absolute inset-x-[9%] top-[5%] bottom-[13%] overflow-hidden rounded-[1.6rem] border border-navy/10 bg-white shadow-[0_34px_70px_-34px_rgba(8,24,41,.35)] sm:inset-x-[12%] sm:top-[4%] sm:bottom-[12%]">
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7 sm:py-5">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
                <FileText size={15} className="text-gold-deep" aria-hidden="true" />
                Assignment brief
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-navy sm:text-[10px]">
                Your plan
              </span>
            </header>

            <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gold-deep sm:text-[10px]">
                    Assignment outline
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-navy sm:text-xl">
                    From brief to final draft
                  </h2>
                </div>
                <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-navy sm:grid">
                  <ClipboardCheck size={18} aria-hidden="true" />
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-3.5 sm:mt-6 sm:rounded-2xl sm:p-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  <ListChecks size={14} className="text-navy" aria-hidden="true" />
                  Structure your argument
                </div>
                <div className="mt-3 space-y-3">
                  {outlineSections.map((section) => (
                    <div key={section.number} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[9px] font-semibold text-navy shadow-sm">
                        {section.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold text-navy sm:text-xs">{section.title}</span>
                        <span className={`mt-1 block h-1 rounded-full bg-slate-200 ${section.width}`} />
                      </span>
                      <Check size={14} className="shrink-0 text-gold-deep" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5">
                <div className="rounded-xl border border-slate-200 p-3 sm:p-3.5">
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[10px]">
                    <Highlighter size={13} className="text-gold-deep" aria-hidden="true" />
                    Evidence
                  </div>
                  <p className="mt-2 text-[10px] font-semibold leading-4 text-navy sm:text-xs">Research &amp; sources</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3 sm:p-3.5">
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[10px]">
                    <Quote size={13} className="text-gold-deep" aria-hidden="true" />
                    Referencing
                  </div>
                  <p className="mt-2 text-[10px] font-semibold leading-4 text-navy sm:text-xs">Course requirements</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-500 sm:mt-5 sm:pt-4 sm:text-xs">
                <PenLine size={14} className="text-navy" aria-hidden="true" />
                A clear brief keeps every section on track.
              </div>
            </div>
          </article>

          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-1 top-[22%] rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_14px_35px_-24px_rgba(8,24,41,.35)] sm:right-0 sm:px-4"
          >
            <span className="block text-[10px] font-semibold text-navy sm:text-xs">Subject matched</span>
            <span className="mt-1 block text-[9px] text-slate-500 sm:text-[11px]">Expert support, your way</span>
          </motion.div>
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-1 bottom-[6%] rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_14px_35px_-24px_rgba(8,24,41,.35)] sm:left-0 sm:px-4"
          >
            <span className="block text-[10px] font-semibold text-navy sm:text-xs">Your assignment</span>
            <span className="mt-1 block text-[9px] text-slate-500 sm:text-[11px]">Planned with care</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
