import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Card from './Card';
import Section from './Section';

const guidance = [
  {
    title: 'Find support for the assignment in front of you',
    body: 'University assignments take different forms. The first step is to identify what the question asks you to demonstrate, then choose a structure and evidence that fit.',
    points: ['Essays and critical discussions', 'Reports, case studies and reflective writing', 'Research projects and dissertation chapters'],
  },
  {
    title: 'Make sense of UK university requirements',
    body: 'Assessment briefs, learning outcomes and marking criteria explain how your work will be judged. Use them as a practical checklist while planning and reviewing your work.',
    points: ['Identify the command words in the question', 'Check the required referencing style and word count', 'Use evidence to support analysis, not just description'],
  },
  {
    title: 'Prepare a clear assignment brief',
    body: 'Sharing the relevant instructions at the start helps define the subject, level and expected format. Include the information that is specific to your module.',
    points: ['The assignment question and module level', 'Deadline, word count and marking guidance', 'Required sources, data, software or citation style'],
  },
];

export default function HomeGuidance() {
  return (
    <Section className="bg-[var(--color-surface)]">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">Academic guidance</p>
        <h2 className="font-display text-headline-lg text-[var(--color-text)]">Practical support for your next assignment</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {guidance.map(({ title, body, points }) => (
          <Card key={title} className="flex h-full flex-col p-6 sm:p-7" tilt>
            <h3 className="font-display text-xl font-semibold leading-snug text-[var(--color-text)]">{title}</h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{body}</p>
            <ul className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-5 text-sm text-[var(--color-text)]">
              {points.map((point) => <li key={point} className="flex gap-3"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{point}</li>)}
            </ul>
            <Link href="/services" className="nav-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] hover:text-navy">
              Explore services <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
