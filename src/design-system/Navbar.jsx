'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Gavel,
  GraduationCap,
  Landmark,
  Menu,
  MessageCircle,
  PiggyBank,
  Stethoscope,
  X,
} from 'lucide-react';
import Button from './Button';

const subjectLinks = [
  { title: 'Business Management', route: '/business-management', icon: BriefcaseBusiness },
  { title: 'Accounting', route: '/accounting-assignments', icon: Landmark },
  { title: 'Finance', route: '/finance-assignments', icon: PiggyBank },
  { title: 'Law', route: '/law-assignments', icon: Gavel },
  { title: 'Nursing', route: '/nursing-assignments', icon: Stethoscope },
  { title: 'Psychology', route: '/psychology-assignments', icon: BookOpen },
  { title: 'Computer Science', route: '/computer-science-assignments', icon: Code2 },
  { title: 'Engineering', route: '/engineering-assignments', icon: GraduationCap },
  { title: 'Economics', route: '/economics-assignments', icon: PiggyBank },
];

const primaryLinks = [
  ['Home', '/'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const subjectsRef = useRef(null);
  const subjectTriggerRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSubjectsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!subjectsOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSubjectsOpen(false);
        subjectTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [subjectsOpen]);

  const openEnquiry = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('openPopup'));
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.96)] shadow-[var(--shadow-soft)] backdrop-blur-2xl'
            : 'bg-[rgba(255,255,255,0.92)] backdrop-blur-xl'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[4.75rem] max-w-[80rem] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12"
        >
          <Link href="/" aria-label="Expert Assignment Writers home" className="inline-flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Expert Assignment Writers"
              width={170}
              height={52}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 639px) 132px, 168px"
              className="h-auto w-[8.25rem] sm:w-[10.5rem]"
            />
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {primaryLinks.slice(0, 4).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="nav-underline text-sm font-semibold text-[var(--color-text)]"
              >
                {label}
              </Link>
            ))}
            <div
              ref={subjectsRef}
              className="relative"
              onMouseEnter={() => setSubjectsOpen(true)}
              onMouseLeave={() => setSubjectsOpen(false)}
              onBlur={(event) => {
                if (!subjectsRef.current?.contains(event.relatedTarget)) setSubjectsOpen(false);
              }}
            >
              <button
                ref={subjectTriggerRef}
                type="button"
                aria-expanded={subjectsOpen}
                aria-controls="subjects-mega-menu"
                onClick={() => setSubjectsOpen((current) => !current)}
                onFocus={() => setSubjectsOpen(true)}
                className="nav-underline flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text)]"
              >
                Subjects
                <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${subjectsOpen ? 'rotate-180' : ''}`} />
              </button>
              {subjectsOpen && (
                <div
                  id="subjects-mega-menu"
                  className="absolute left-1/2 top-full z-50 w-[min(58rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                >
                  <div className="grid overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white shadow-[0_28px_80px_-32px_rgba(8,24,41,.38)] md:grid-cols-[0.8fr_1.5fr]">
                    <div className="flex flex-col justify-between bg-navy p-7 text-white sm:p-9">
                      <div>
                        <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gold text-navy">
                          <BookOpen size={21} aria-hidden="true" />
                        </span>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">Find your subject</p>
                        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">Expert support, tailored to your studies.</h2>
                        <p className="mt-3 text-sm leading-6 text-white/75">Browse assignment support by subject and find the area that fits your course.</p>
                      </div>
                      <Link href="/services" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-gold">
                        Explore all services <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                    <div className="grid gap-1 p-4 sm:grid-cols-2 sm:p-6">
                      {subjectLinks.map(({ title, route, icon: Icon }) => (
                        <Link
                          key={route}
                          href={route}
                          onClick={() => setSubjectsOpen(false)}
                          className="group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy transition hover:bg-[var(--color-surface)] focus-visible:bg-[var(--color-surface)]"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--color-surface)] text-navy transition group-hover:bg-gold group-hover:text-navy">
                            <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                          </span>
                          <span className="flex-1">{title}</span>
                          <ArrowRight size={15} aria-hidden="true" className="text-navy/40 transition group-hover:translate-x-0.5 group-hover:text-navy" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/contact"
              aria-current={pathname === '/contact' ? 'page' : undefined}
              className="nav-underline text-sm font-semibold text-[var(--color-text)]"
            >
              Contact
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/447476950970"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-10 items-center gap-2 rounded-full border border-navy/20 px-3 text-sm font-semibold text-navy transition hover:border-navy hover:bg-[var(--color-surface)] md:inline-flex lg:px-4"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Button onClick={openEnquiry} size="sm">
              <span className="hidden sm:inline">Start your brief</span>
              <span className="sm:hidden">Start</span>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-navy xl:hidden"
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-navigation"
          hidden={!menuOpen}
          className="max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-[var(--color-border)] bg-white px-5 pb-7 pt-4 xl:hidden"
        >
          <div className="grid gap-1">
            {primaryLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="rounded-lg px-3 py-3 font-semibold text-navy hover:bg-[var(--color-surface)]"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="mb-2 mt-5 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">Subject help</p>
          <div className="grid grid-cols-2 gap-1">
            {subjectLinks.map(({ title, route }) => (
              <Link key={route} href={route} className="rounded-lg px-3 py-2.5 text-sm text-navy hover:bg-[var(--color-surface)]">
                {title}
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/447476950970"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-navy/20 font-semibold text-navy"
          >
            <MessageCircle size={17} aria-hidden="true" /> Chat on WhatsApp
          </a>
          <Button onClick={openEnquiry} className="mt-3 w-full">Start your brief</Button>
        </div>
      </header>
    </>
  );
}
