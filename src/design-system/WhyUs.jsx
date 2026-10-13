import { Award, BookOpenCheck, Clock3, Scale } from 'lucide-react';
import Card from './Card';
import Section from './Section';

const points = [
  {
    icon: Award,
    title: 'A Clear Brief Comes First',
    description: 'Share the assignment question, course level, marking criteria and required format to explain what the task involves.',
    className: 'md:col-span-2',
    featured: true,
  },
  {
    icon: Clock3,
    title: 'Subject Coverage',
    description: 'Explore support across business, accounting, finance, law, nursing, psychology, computing, engineering and economics.',
  },
  {
    icon: BookOpenCheck,
    title: 'Assignment Formats',
    description: 'The subject pages describe common formats such as essays, reports, case studies, coursework and research projects.',
  },
  {
    icon: Scale,
    title: 'Keep Course Requirements in View',
    description: 'Use your university guidance to check the rules on permitted assistance, referencing and the work you submit.',
    className: 'md:col-span-2',
    featured: true,
  },
];

export default function WhyUs() {
  return (
    <Section className="bg-[var(--color-surface)]">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">A considered approach</p>
        <h2 className="font-display text-headline-lg text-[var(--color-text)]">Academic Support Shaped Around Your Assignment</h2>
        <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">Explore subject coverage and share the requirements that matter to your course.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {points.map(({ icon: Icon, title, description, className = '', featured = false }) => (
          <Card key={title} tilt={false} className={`${className} min-h-60 p-7 sm:p-9 ${featured ? 'bg-navy text-white' : ''}`}>
            <span className={`mb-6 grid h-12 w-12 place-items-center rounded-xl ${featured ? 'bg-gold/15 text-gold' : 'bg-gold/15 text-navy'}`}>
              <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className={`font-display text-xl font-semibold ${featured ? 'text-white' : 'text-[var(--color-text)]'}`}>{title}</h3>
            <p className={`mt-3 max-w-xl text-sm leading-6 ${featured ? 'text-white/80' : 'text-[var(--color-muted)]'}`}>{description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
