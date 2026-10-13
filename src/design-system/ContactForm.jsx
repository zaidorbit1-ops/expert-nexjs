'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from './Button';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(7, 'Please enter a phone number.'),
  subject: z.string().trim().min(2, 'Please enter a subject area.'),
  message: z.string().trim().min(10, 'Please add a few details about your assignment.'),
});

const fieldClassName = 'mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(enquirySchema) });

  const submitEnquiry = async (values) => {
    setStatus('');
    clearErrors('root.server');

    try {
      const response = await fetch('/api/forms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          form_name: 'order-form',
          message: values.message,
          source_url: window.location.href,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Your enquiry could not be sent. Please try again.');
      }

      reset();
      setStatus(result.message || 'Your enquiry has been sent successfully.');
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Your enquiry could not be sent. Please try again.',
      });
    }
  };

  const fieldError = (name) => errors[name] && (
    <span className="mt-1 block text-sm text-[var(--color-error)]" id={`${name}-error`}>
      {errors[name].message}
    </span>
  );

  return (
    <form id="rebuilt-order-form" onSubmit={handleSubmit(submitEnquiry)} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-[var(--color-text)]">
          Full name
          <input autoComplete="name" className={fieldClassName} {...register('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {fieldError('name')}
        </label>
        <label className="block text-sm font-semibold text-[var(--color-text)]">
          Email address
          <input type="email" autoComplete="email" className={fieldClassName} {...register('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          {fieldError('email')}
        </label>
        <label className="block text-sm font-semibold text-[var(--color-text)]">
          Phone number
          <input type="tel" autoComplete="tel" className={fieldClassName} {...register('phone')} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
          {fieldError('phone')}
        </label>
        <label className="block text-sm font-semibold text-[var(--color-text)]">
          Subject area
          <input className={fieldClassName} {...register('subject')} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />
          {fieldError('subject')}
        </label>
      </div>
      <label className="block text-sm font-semibold text-[var(--color-text)]">
        Assignment requirements
        <textarea rows={4} className={`${fieldClassName} resize-y`} {...register('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
        {fieldError('message')}
      </label>
      {errors.root?.server && <p role="alert" className="text-sm text-[var(--color-error)]">{errors.root.server.message}</p>}
      {status && <p role="status" className="rounded-xl border border-gold/60 bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold text-[var(--color-text)]">{status}</p>}
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
        {isSubmitting ? 'Sending your enquiry…' : 'Get my free quote'}
      </Button>
    </form>
  );
}
