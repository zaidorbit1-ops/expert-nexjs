'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import Navbar from '../src/design-system/Navbar';
import Footer from '../src/design-system/Footer';
import EnquiryDialog from '../src/design-system/EnquiryDialog';

export default function SiteChrome({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return undefined;
    const handleFormSubmit = async (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) ||
        !['contact-form', 'subject-form', 'order-form'].includes(form.id)) return;
      if (form.dataset.submitting === 'true') return;
      form.dataset.submitting = 'true';

      const values = new FormData(form);
      const readValue = (names) => names
        .map((field) => values.get(field))
        .find((value) => typeof value === 'string' && value.trim())?.trim() || '';
      const firstName = readValue(['first_name']);
      const lastName = readValue(['last_name']);
      const name = readValue(['full_name', 'fullName', 'name']) ||
        [firstName, lastName].filter(Boolean).join(' ');
      const aliases = {
        subject: ['subject', 'subject_area', 'topic'],
        level: ['level', 'academic_level', 'study_level'],
        deadline: ['deadline', 'due_date', 'submission_date'],
        requirements: ['requirements', 'message', 'notes', 'brief', 'details'],
      };
      const customFields = Object.fromEntries(
        Object.entries(aliases)
          .map(([key, names]) => [key, names.map((field) => values.get(field)).find(Boolean)])
          .filter(([, value]) => value),
      );
      const payload = {
        name,
        email: readValue(['email']),
        phone: readValue(['phone', 'mobile', 'phone_number']),
        message: readValue(['message', 'notes', 'inquiry', 'details', 'requirements']),
        source_url: window.location.href,
        form_name: form.id,
        ...(Object.keys(customFields).length ? { custom_fields: customFields } : {}),
      };

      let result;
      try {
        const response = await fetch('/api/forms/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Form submission failed.');
      } catch (error) {
        result = { success: false, message: error.message || 'Network error. Please try again.' };
      } finally {
        delete form.dataset.submitting;
      }

      const message = result.message || (result.success
        ? `Hey ${name || 'there'}, we have received your ${form.id === 'contact-form' ? 'query' : 'order'}. Our team will contact you shortly.`
        : 'Something went wrong while submitting your request. Please try again.');
      window.dispatchEvent(new CustomEvent('crm-form-result', {
        detail: { formId: form.id, success: Boolean(result.success), name, message },
      }));
    };

    document.addEventListener('submit', handleFormSubmit);
    return () => document.removeEventListener('submit', handleFormSubmit);
  }, [pathname]);

  if (pathname.startsWith('/admin')) return children;

  return (
    <>
      <Script
        src="https://embed.tawk.to/6a3015a91c6c4a1d447f554a/1jr5t97u1"
        strategy="afterInteractive"
      />
      <Navbar />
      {children}
      <Footer />
      <EnquiryDialog />
    </>
  );
}
