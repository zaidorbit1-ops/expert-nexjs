'use client';

import { ArrowUpRight, BriefcaseBusiness, Gavel, PiggyBank, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import Card from './Card';
import Section from './Section';

const services = [
  {
    icon: BriefcaseBusiness,
    title: 'Business Management',
    description: 'Strategic planning, marketing models, HRM papers, and business case studies written to distinction level. Our experts have real-world industry experience.',
    href: '/business-management',
  },
  {
    icon: Stethoscope,
    title: 'Nursing & Healthcare',
    description: 'Evidence-based practice papers and clinical case studies following NHS guidelines. All assignments meet regulatory compliance standards.',
    href: '/nursing-assignments',
  },
  {
    icon: Gavel,
    title: 'Law',
    description: 'Comprehensive legal research and case analysis for UK and International law. We cover contract law, criminal law, and corporate law.',
    href: '/law-assignments',
  },
  {
    icon: PiggyBank,
    title: 'Finance & Accounting',
    description: 'Complex financial modelling, auditing assignments, and corporate accounting. Perfect for ACCA, CPA, and MBA level work.',
    href: '/finance-assignments',
  },
];

export default function ServicesGrid() {
  return (
    <Section id="services">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">Subject expertise</p>
        <h2 className="font-display text-headline-lg text-[var(--color-text)]">Expertise Across All Disciplines</h2>
        <p className="mt-5 text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
          From complex medical papers to strategic business analyses, our PhD-qualified writers cover 100+ subjects with proven track records of academic excellence.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, description, href }, index) => (
          <Card key={title} className="group flex min-h-[20rem] flex-col p-6 sm:p-7" tilt>
            <span className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-navy transition-colors group-hover:bg-gold group-hover:text-navy-darker">
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-semibold leading-snug text-[var(--color-text)]">{title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
            <Link href={href} className="nav-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] group-hover:text-navy">
              Learn More <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
