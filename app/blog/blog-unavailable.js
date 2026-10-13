export default function BlogUnavailable() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-4 py-20">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold text-primary-900">
          The blog is temporarily unavailable
        </h1>
        <p className="mt-4 text-primary-700">
          We couldn’t load the blog right now. Please try again shortly.
        </p>
        <a href="/blog" className="page-cta-button mt-6">Try again</a>
      </div>
    </main>
  );
}
