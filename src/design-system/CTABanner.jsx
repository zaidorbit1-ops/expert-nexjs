'use client';

import Button from './Button';

export default function CTABanner({
  heading = 'Need Expert Assignment Help Today?',
  text = "Don't let deadline stress affect your mental health. Let our professionals handle the heavy lifting while you focus on what matters.",
  buttonLabel = 'Order Now',
}) {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="relative mx-auto max-w-[72rem] overflow-hidden rounded-[var(--radius-panel)] bg-navy px-6 py-10 text-white shadow-card sm:px-10 sm:py-14 lg:px-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-gold/25" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-[22rem] w-[22rem] rounded-full border border-gold/20" />
        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">Here when you need us</p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{heading}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="gold" size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}>
              {buttonLabel}
            </Button>
            <a href="https://wa.me/447476950970" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:border-gold hover:text-gold">
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
