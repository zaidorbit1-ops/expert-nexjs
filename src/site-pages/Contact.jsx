'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Users } from 'lucide-react';
import StyledSelect from '../components/StyledSelect';
import { PageContentSections } from './PageContentSections';
import { SitePageFAQs } from './SitePageFAQs';
import Breadcrumb from '../design-system/Breadcrumb';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

const contactTopics = [
  { value: 'assignment-help', label: 'Assignment Help' },
  { value: 'dissertation-support', label: 'Dissertation Support' },
  { value: 'pricing-query', label: 'Pricing Query' },
  { value: 'other', label: 'Other' },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const handleCrmResult = (event) => {
      const detail = event.detail || {};
      if (detail.formId && detail.formId !== 'contact-form') return;

      if (detail.success) {
        const name = detail.name || form.name || 'there';
        setStatus({
          ok: true,
          message: detail.message || `Hey ${name}, we have received your query. Our team will contact you shortly.`,
        });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({
          ok: false,
          message: detail.message || 'Something went wrong. Please try again.',
        });
      }

      setLoading(false);
    };

    window.addEventListener('crm-form-result', handleCrmResult);
    return () => window.removeEventListener('crm-form-result', handleCrmResult);
  }, [form.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
  };

  const renderContactState = () => {
    if (loading) {
      return (
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-slate-50 p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-navy" aria-label="Loading" />
          <p className="text-lg font-bold text-navy">Sending your request...</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Please wait while our team prepares your message.</p>
        </div>
      );
    }

    if (status?.ok) {
      return (
        <div className="rounded-[1.5rem] border border-green-200 bg-green-50 p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-2xl text-green-700">✓</div>
          <h3 className="font-display text-2xl text-navy">Thank you</h3>
          <p className="mt-3 text-base text-[var(--color-muted)]">{status.message}</p>
        </div>
      );
    }

    if (status && !status.ok) {
      return (
        <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-8 text-center shadow-soft">
          <h3 className="font-display text-2xl text-navy">Something went wrong</h3>
          <p className="mt-3 text-base text-red-700">{status.message}</p>
          <button type="button" onClick={() => setStatus(null)} className="mt-5 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">Try again</button>
        </div>
      );
    }

    return (
      <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-medium text-navy">
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-navy">
            Email Address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@university.ac.uk"
              className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-medium text-navy">
          Phone Number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+44 7700 900000"
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-navy">
          Subject
          <StyledSelect name="subject" value={form.subject} onChange={handleChange} options={contactTopics} placeholder="Select a topic" />
        </label>

        <label className="block space-y-2 text-sm font-medium text-navy">
          Your Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="How can our academic experts help you today?"
            rows={6}
            className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>

        <button disabled={loading} type="submit" className={`inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${loading ? 'cursor-wait opacity-60' : ''}`}>
          {loading ? 'Sending…' : 'Send Message'} <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </form>
    );
  };

  return (
    <main id="main-content" className="overflow-hidden bg-[var(--color-surface)] text-navy">
      <div className="relative">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <Breadcrumb items={[{ label: 'Contact' }]} />
        <section className="relative mx-auto grid max-w-[80rem] items-center gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pb-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:px-12 lg:pb-20">
          <div className="relative z-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft">
              <MessageCircle size={15} className="text-gold-deep" aria-hidden="true" /> Contact Our Team
            </p>
            <h1 className="max-w-[42rem] font-display text-display-lg-mobile leading-[1.06] tracking-tight text-navy sm:text-display-lg">
              Contact Expert Assignment Writers
            </h1>
            <p className="mt-6 max-w-[38rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Whether you have a complex dissertation query or need urgent assignment support, our academic experts are standing by to ensure your success.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://wa.me/447476950970" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <MessageCircle size={17} aria-hidden="true" /> Chat on WhatsApp
              </a>
              <a href="tel:+447476950970" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 text-sm font-semibold text-navy transition hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                Call +44 7476 950 970
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto w-full max-w-[28rem]">
            <div className="absolute inset-[7%_4%_4%_8%] rotate-[-5deg] rounded-[1.8rem] bg-gold shadow-card" />
            <div className="relative rounded-[1.8rem] bg-navy p-6 text-white shadow-card sm:p-8">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Your enquiry</span>
                <span className="h-2 w-2 rounded-full bg-gold" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="h-2 w-3/4 rounded-full bg-white/25" />
                <div className="h-2 w-full rounded-full bg-white/15" />
                <div className="h-2 w-5/6 rounded-full bg-white/15" />
              </div>
              <div className="mt-8 flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.06] p-4">
                <span className="text-xs font-medium text-white/80">A real person, ready to help</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-navy"><ArrowUpRight size={17} /></span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-[80rem] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
        <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_.7fr] lg:gap-8">
          <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-white p-5 shadow-soft sm:p-8 lg:p-10">
            <div className="mb-7 border-b border-[var(--color-border)] pb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-deep">Send us a message</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-navy sm:text-3xl">Tell us what you need</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Share the essentials and our team will get back to you.</p>
            </div>
            {renderContactState()}
          </div>
          <aside className="space-y-4">
            <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-white p-6 shadow-soft sm:p-7">
              <h2 className="mb-5 font-display text-lg font-semibold text-navy">Contact details</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep"><MapPin size={19} aria-hidden="true" /></span>
                  <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">London Office</p><p className="mt-1 text-sm leading-6 text-navy">89 Guild Street, London, EC1P 1RP, United Kingdom</p></div>
                </div>
                <a href="tel:+447476950970" className="flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep"><Phone size={19} aria-hidden="true" /></span>
                  <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Phone Support</p><p className="mt-1 text-sm font-semibold text-navy">+44 7476 950 970</p></div>
                </a>
                <a href="mailto:info@expertassignmentwriters.co.uk" className="flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep"><Mail size={19} aria-hidden="true" /></span>
                  <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Email Support</p><p className="mt-1 break-all text-sm font-semibold text-navy">info@expertassignmentwriters.co.uk</p></div>
                </a>
              </div>
            </div>
            <div className="rounded-[1.6rem] bg-navy p-6 text-white shadow-card sm:p-7">
              <h2 className="font-display text-lg font-semibold">Here when you need us</h2>
              <div className="mt-5 grid gap-4">
                <div className="flex items-center gap-3"><Clock size={18} className="text-gold" aria-hidden="true" /><span className="text-sm"><strong>Support</strong><span className="ml-2 text-white/70">24/7 Availability</span></span></div>
                <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-gold" aria-hidden="true" /><span className="text-sm"><strong>Guarantee</strong><span className="ml-2 text-white/70">100% Confidential</span></span></div>
                <div className="flex items-center gap-3"><Users size={18} className="text-gold" aria-hidden="true" /><span className="text-sm"><strong>Assistance</strong><span className="ml-2 text-white/70">Dedicated Departments</span></span></div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <PageContentSections page="contact" variant="editorial" />
      <SitePageFAQs page="contact" />
    </main>
  );
};

export default Contact;
