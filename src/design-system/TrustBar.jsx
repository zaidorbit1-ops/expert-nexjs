import Section from './Section';

const universities = ['OXFORD', 'LSE', 'UCL', 'CAMBRIDGE', 'MANCHESTER'];

export default function TrustBar() {
  return (
    <Section className="border-b border-[var(--color-border)] py-10 sm:py-12" innerClassName="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
        Trusted by Students from Top UK Universities
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-14">
        {universities.map((university) => (
          <span key={university} className="font-display text-sm font-semibold tracking-[0.08em] text-[var(--color-text)]/65 sm:text-base">
            {university}
          </span>
        ))}
      </div>
    </Section>
  );
}
