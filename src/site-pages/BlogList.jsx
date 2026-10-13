'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, CalendarDays, Clock3, Search,
} from 'lucide-react';
import { PageContentSections } from './PageContentSections';
import { SitePageFAQs } from './SitePageFAQs';

function getReadingTime(content = '') {
  const words = content.replace(/[#>*_`~\-[\]()]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'EA';
}

function formatDate(value) {
  if (!value) return 'Recently published';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Recently published'
    : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function ArticleCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e4e7eb] bg-white shadow-[0_16px_50px_-32px_rgba(8,24,41,.3)] transition duration-300 hover:-translate-y-1 hover:border-[#cfa049]/60 hover:shadow-[0_26px_60px_-34px_rgba(8,24,41,.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfa049]"
    >
      <div className="relative flex aspect-[16/9] w-full shrink-0 items-center justify-center overflow-hidden bg-[#f5f3ee]">
        {post.feature_image ? (
          <img
            src={post.feature_image}
            alt={post.featured_image_alt || post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full min-h-48 w-full items-center justify-center bg-[radial-gradient(circle_at_85%_20%,rgba(207,160,73,.20),transparent_35%),linear-gradient(145deg,#f8f9fa,#e8edf1)]">
            <BookOpen size={48} strokeWidth={1.2} className="text-[#0d3055]/35" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0d3055] shadow-sm">
          {post.category || 'Uncategorised'}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#66717d]">
          <CalendarDays size={14} className="text-[#a77b2c]" />
          <span>{formatDate(post.published_at)}</span>
          <span aria-hidden="true" className="text-[#cfa049]">·</span>
          <Clock3 size={14} className="text-[#a77b2c]" />
          <span>{getReadingTime(post.content)} min read</span>
        </div>
        <h2 className="mt-4 font-display text-xl font-bold leading-tight text-[#0d3055] transition group-hover:text-[#a77b2c] sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#536373]">
          {post.excerpt || 'Read this article for practical guidance, clear explanations, and useful academic insights.'}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#edf0f3] pt-5">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0d3055] text-xs font-bold text-white">
              {getInitials(post.author)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-[#263748]">{post.author || 'Expert Assignment Writers'}</span>
              <span className="block text-xs text-[#87929e]">Author</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0d3055] transition group-hover:text-[#a77b2c]">
            Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogList({ initialPosts = [] }) {
  const posts = initialPosts;
  const [selectedCategory, setSelectedCategory] = useState('All articles');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryCounts = useMemo(() => {
    const counts = new Map();
    posts.forEach((post) => {
      const category = post.category || 'Uncategorised';
      counts.set(category, (counts.get(category) || 0) + 1);
    });
    return [...counts.entries()].sort(([left], [right]) => left.localeCompare(right));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All articles' || (post.category || 'Uncategorised') === selectedCategory;
      const matchesSearch = !query || [post.title, post.excerpt, post.author, post.category]
        .some((field) => (field || '').toLocaleLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative isolate overflow-hidden bg-[#f8f9fa]">
        <div aria-hidden="true" className="absolute -right-32 -top-36 -z-10 h-[460px] w-[460px] rounded-full bg-[#cfa049]/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 -left-24 -z-10 h-[360px] w-[360px] rounded-full bg-[#0d3055]/[0.06] blur-3xl" />
        <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfa049]/35 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8a621b] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#cfa049]" />
              The knowledge hub
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#0d3055]">
              Ideas to help you <span className="text-[#b88836]">study with confidence.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#536373] sm:text-lg sm:leading-8">
              Practical assignment advice, study strategies and clear academic guidance from the Expert Assignment Writers team.
            </p>
            <label className="relative mt-8 block max-w-xl">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87929e]" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search articles, topics or authors"
                aria-label="Search blog articles"
                className="w-full rounded-2xl border border-[#dfe4e9] bg-white py-4 pl-12 pr-4 text-sm text-[#081829] shadow-[0_12px_36px_-28px_rgba(8,24,41,.45)] outline-none transition placeholder:text-[#9aa3ad] focus:border-[#0d3055] focus:ring-4 focus:ring-[#0d3055]/10"
              />
            </label>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:pt-1">
          <div className="lg:sticky lg:top-28">
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-[#0d3055]">Browse topics</h2>
              <span className="text-xs text-[#87929e]">{posts.length} articles</span>
            </div>
            <nav aria-label="Filter articles by category" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {[
                ['All articles', posts.length],
                ...categoryCounts,
              ].map(([category, count], index) => {
                const selected = selectedCategory === category;
                return (
                  <button
                    key={`${index === 0 ? 'all' : 'category'}-${category}`}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selected}
                    className={`flex shrink-0 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition lg:w-full ${
                      selected
                        ? 'border-[#0d3055] bg-[#0d3055] text-white shadow-sm'
                        : 'border-[#e4e7eb] bg-white text-[#536373] hover:border-[#cfa049]/60 hover:bg-[#fcfbf8] hover:text-[#0d3055]'
                    }`}
                  >
                    <span>{category}</span>
                    <span className={`min-w-7 rounded-full px-2 py-0.5 text-center text-xs ${selected ? 'bg-white/15 text-white' : 'bg-[#f1f3f5] text-[#66717d]'}`}>{count}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section aria-labelledby="articles-heading" className="min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#e4e7eb] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a77b2c]">
                {selectedCategory === 'All articles' ? 'Fresh perspectives' : 'Browsing topic'}
              </p>
              <h2 id="articles-heading" className="mt-1 font-display text-2xl font-bold text-[#0d3055] sm:text-3xl">
                {selectedCategory}
              </h2>
            </div>
            <p className="text-sm text-[#66717d]">{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}</p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#d1d6dc] bg-[#f8f9fa] px-6 py-20 text-center">
              <BookOpen size={36} strokeWidth={1.4} className="mx-auto text-[#a77b2c]" />
              <h3 className="mt-4 font-display text-xl font-bold text-[#0d3055]">No articles found</h3>
              <p className="mt-2 text-sm text-[#66717d]">Try a different search term or choose another topic.</p>
              {(searchTerm || selectedCategory !== 'All articles') && (
                <button type="button" onClick={() => { setSearchTerm(''); setSelectedCategory('All articles'); }} className="mt-5 text-sm font-bold text-[#0d3055] underline underline-offset-4">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid items-stretch gap-6 sm:grid-cols-2">
              {filteredPosts.map((post) => <ArticleCard key={post.id} post={post} />)}
            </div>
          )}
        </section>
      </div>

      <section className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0d3055] px-6 py-10 text-white sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div aria-hidden="true" className="absolute -right-12 -top-32 h-72 w-72 rounded-full border-[40px] border-white/[0.06]" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e7c77f]">Need a hand with your studies?</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">Get the guidance you need to move forward.</h2>
            <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base">Tell us what you are working on and our team will help you find the right support.</p>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('openPopup'))}
            className="relative mt-6 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#cfa049] px-5 py-3.5 text-sm font-extrabold text-[#082438] transition hover:bg-[#dfb965] lg:mt-0"
          >
            Start your brief <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <PageContentSections page="blog" />
      <SitePageFAQs page="blog" />
    </main>
  );
}
