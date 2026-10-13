'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Card from './Card';
import Section from './Section';

const testimonials = [
  {
    name: 'Sarah J.',
    university: "King's College London",
    text: 'The nursing assignment was absolutely flawless. The references were accurate and it followed the NHS guidelines perfectly. I secured a distinction! The writer clearly understood the subject matter deeply.',
  },
  {
    name: 'David L.',
    university: 'University of Manchester',
    text: "I was struggling with my Finance dissertation. The expert matched with me was incredibly knowledgeable in corporate governance and financial modeling. They delivered 2 days early! Highly recommended for postgraduate work.",
  },
  {
    name: 'Emma W.',
    university: 'LSE',
    text: 'Expert Writers literally saved my final semester. The delivery was 2 days early, giving me plenty of time to review. The quality of writing is absolutely superior to anything else I found online. Worth every penny!',
  },
  {
    name: 'James M.',
    university: 'University of Oxford',
    text: 'My Law assignment on contract interpretation was handled brilliantly. The analysis was comprehensive, cases were properly cited, and the arguments were compelling. Got a First! The communication with my writer was excellent throughout.',
  },
  {
    name: 'Priya K.',
    university: 'UCL',
    text: 'As an international student, I was worried about academic standards in the UK. This service gave me confidence. The assignment quality was exceptional, and I learned so much from reading the work. Highly professional team!',
  },
];

export default function TestimonialSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true, containScroll: 'trimSnaps' });

  return (
    <Section id="testimonials">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">Student voices</p>
          <h2 className="font-display text-headline-lg text-[var(--color-text)]">Student Success Stories</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
            Join thousands of UK students who achieved academic excellence with our expert help.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Previous testimonials" onClick={() => emblaApi?.scrollPrev()} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition hover:border-gold hover:bg-gold hover:text-navy-darker">
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next testimonials" onClick={() => emblaApi?.scrollNext()} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition hover:border-gold hover:bg-gold hover:text-navy-darker">
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {testimonials.map(({ name, university, text }) => (
            <div key={name} className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <Card tilt={false} className="flex h-full min-h-[19rem] flex-col p-6 sm:p-7">
                <div aria-label="5 out of 5 stars" className="mb-5 flex gap-1 text-gold-deep">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" aria-hidden="true" />)}
                </div>
                <blockquote className="flex-1 text-sm leading-7 text-[var(--color-text)]">“{text}”</blockquote>
                <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                  <p className="font-display text-sm font-semibold text-[var(--color-text)]">{name}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{university}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
