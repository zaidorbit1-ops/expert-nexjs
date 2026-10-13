'use client';

import { useEffect } from 'react';

export default function BlogError({ error, reset }) {
  useEffect(() => {
    console.error('Blog page failed to render:', error);
  }, [error]);

  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-4 py-20">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold text-primary-900">
          The blog is temporarily unavailable
        </h1>
        <p className="mt-4 text-primary-700">
          We couldn’t load the blog right now. Please try again shortly.
        </p>
        <button type="button" onClick={reset} className="page-cta-button mt-6">
          Try again
        </button>
      </div>
    </main>
  );
}
