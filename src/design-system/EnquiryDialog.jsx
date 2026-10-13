'use client';

import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { BookOpenCheck, Check, LockKeyhole, Sparkles, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ContactForm from './ContactForm';

export default function EnquiryDialog() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);
  const openRef = useRef(false);

  useEffect(() => {
    const showDialog = () => {
      openerRef.current = document.activeElement;
      openRef.current = true;
      setOpen(true);
    };
    window.addEventListener('openPopup', showDialog);
    return () => window.removeEventListener('openPopup', showDialog);
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/admin')) return undefined;

    const timer = window.setTimeout(() => {
      if (openRef.current) return;
      openerRef.current = null;
      openRef.current = true;
      setOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        openRef.current = nextOpen;
        setOpen(nextOpen);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-navy-darker/75 backdrop-blur-md data-[state=open]:animate-[fade-in_180ms_ease-out]" />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            if (openerRef.current instanceof HTMLElement) {
              event.preventDefault();
              openerRef.current.focus();
            }
          }}
          className="fixed left-1/2 top-1/2 z-[71] max-h-[min(92vh,54rem)] w-[calc(100%-1.25rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.75rem] border border-white/50 bg-white shadow-[0_40px_120px_-32px_rgba(8,24,41,.6)] sm:w-[calc(100%-2rem)] sm:rounded-[2rem]"
        >
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="relative hidden overflow-hidden bg-navy p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
              <div aria-hidden="true" className="absolute -right-28 -top-24 h-80 w-80 rounded-full border border-gold/30" />
              <div aria-hidden="true" className="absolute -right-12 -top-8 h-48 w-48 rounded-full border border-gold/20" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-navy-darker">
                  <BookOpenCheck size={22} aria-hidden="true" />
                </span>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.17em] text-gold">A better brief starts here</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">Tell us about your assignment.</h2>
                <p className="mt-4 text-sm leading-6 text-white/75">Share a few details and our academic team will prepare a tailored quote.</p>
              </div>
              <ul className="relative mt-10 space-y-4 text-sm text-white/85">
                <li className="flex items-center gap-3"><Check size={16} className="text-gold" aria-hidden="true" /> UK academic experts</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-gold" aria-hidden="true" /> Confidential consultation</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-gold" aria-hidden="true" /> Fast, clear response</li>
              </ul>
              <p className="relative mt-8 flex items-center gap-2 text-xs text-white/65"><LockKeyhole size={14} className="text-gold" aria-hidden="true" /> Your details are kept private.</p>
            </aside>
            <div className="p-5 sm:p-8 lg:p-9 xl:p-11">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy">
                    <Sparkles size={14} className="text-gold-deep" aria-hidden="true" /> Expert Assignment Writers
                  </p>
                  <Dialog.Title className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                    Tell us what you need
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 max-w-lg text-sm leading-6 text-[var(--color-muted)]">
                    Add your details and assignment requirements to get started.
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <button type="button" aria-label="Close enquiry form" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-navy transition hover:border-gold hover:bg-[var(--color-surface)]">
                    <X size={18} aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>
              <ContactForm />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
