'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, Clock3,
  Eye, Link2,
} from 'lucide-react';
import MarkdownContent from '../components/MarkdownContent';

function countWords(value = '') {
  return value.replace(/[#>*_`~\-[\]()]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

function getReadingTime(content) {
  return Math.max(1, Math.ceil(countWords(content) / 200));
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function prepareArticleContent(content = '', title = '') {
  let text = content.trim();
  if (!text) return '';

  const lines = text.split(/\r?\n/);
  while (lines.length) {
    const firstLine = lines[0].trim();
    if (!firstLine) {
      lines.shift();
      continue;
    }

    const heading = firstLine.replace(/^#{1,6}\s*/, '').replace(/^(?:\*\*|__|\*|_)(.*?)(?:\*\*|__|\*|_)$/, '$1').trim();
    const isDuplicateTitle = title.trim() && heading.toLocaleLowerCase() === title.trim().toLocaleLowerCase();
    const isByline = /^By\s+[A-Z][\p{L}'’.-]*(?:\s+[A-Z][\p{L}'’.-]*){1,4}(?:\s*,.*)?$/u.test(heading);
    if (!isDuplicateTitle && !isByline) break;
    lines.shift();
  }
  text = lines.join('\n').trim();

  if (!/^#{1,6}\s/m.test(text)) {
    text = text.split('\n').map((line) => {
      const trimmed = line.trim();
      const titleCaseHeading = trimmed.length > 0
        && trimmed.length < 85
        && trimmed.split(/\s+/).length >= 2
        && /^[A-Z][\p{L}\p{N}'’:-]*(?:\s+[A-Z][\p{L}\p{N}'’:-]*)+$/u.test(trimmed);
      return titleCaseHeading ? `## ${trimmed}` : line;
    }).join('\n');
  }
  return text;
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'EA';
}

function ArticleCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4e7eb] bg-white shadow-[0_16px_50px_-32px_rgba(8,24,41,.32)] transition hover:-translate-y-1 hover:border-[#cfa049]/60 hover:shadow-[0_24px_58px_-34px_rgba(8,24,41,.4)]">
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[#f5f3ee]">
        {post.feature_image ? (
          <img src={post.feature_image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.025]" />
        ) : (
          <BookOpen size={38} strokeWidth={1.3} className="text-[#0d3055]/35" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#a77b2c]">{post.category}</span>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#0d3055] group-hover:text-[#a77b2c]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#66717d]">{post.excerpt}</p>
        <span className="mt-5 flex items-center justify-between gap-3 border-t border-[#edf0f3] pt-4 text-xs text-[#66717d]">
          <span className="truncate font-semibold text-[#263748]">{post.author}</span>
          <span className="shrink-0">{getReadingTime(post.content)} min read</span>
        </span>
      </div>
    </Link>
  );
}

export default function BlogPost({ initialPost, initialRelatedPosts = [] }) {
  const post = initialPost;
  const relatedPosts = initialRelatedPosts;
  const [siteUrl, setSiteUrl] = useState(process.env.NEXT_PUBLIC_SITE_URL || '');
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);

  const content = useMemo(
    () => prepareArticleContent(post?.content || '', post?.title || ''),
    [post?.content, post?.title],
  );

  useEffect(() => {
    if (!siteUrl) setSiteUrl(window.location.origin);
    const container = document.querySelector('.blog-article-content');
    if (!container) return undefined;
    const headings = Array.from(container.querySelectorAll('h2[id], h3[id]'));
    setTableOfContents(headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: Number(heading.tagName.slice(1)),
    })));

    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -70% 0px' });
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [content, siteUrl]);

  const articleUrl = `${siteUrl}/blog/${post?.slug || ''}`;
  const publishedDate = formatDate(post?.published_at);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error('Could not copy article link:', error);
    }
  };

  if (!post) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
        <BookOpen size={44} className="text-[#cfa049]" />
        <h1 className="mt-5 font-display text-3xl font-bold text-[#0d3055]">Article not found</h1>
        <p className="mt-3 text-[#66717d]">This article may have moved or is no longer available.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0d3055] px-5 py-3 text-sm font-bold text-white"><ArrowLeft size={16} /> Back to articles</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-16">
      <div className="border-b border-[#edf0f3] bg-[#f8f9fa]">
        <div className="mx-auto max-w-[1120px] px-5 py-5 sm:px-8 sm:py-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-4 gap-y-3 text-xs font-semibold text-[#66717d]">
            <Link href="/blog" className="inline-flex items-center gap-1.5 transition hover:text-[#0d3055]"><ArrowLeft size={14} /> Blog</Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <figure className="relative mt-8 flex aspect-[1200/630] max-h-[620px] items-center justify-center overflow-hidden rounded-2xl border border-[#e4e7eb] bg-[#f5f3ee] sm:mt-10 sm:rounded-3xl">
          {post.feature_image ? (
            <img
              src={post.feature_image}
              alt={post.featured_image_alt || post.title}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <div className="flex aspect-[1200/500] w-full items-center justify-center bg-[radial-gradient(circle_at_80%_20%,rgba(207,160,73,.22),transparent_32%),linear-gradient(135deg,#f8f9fa,#edf1f4)]">
              <BookOpen size={68} strokeWidth={1.1} className="text-[#0d3055]/30" />
            </div>
          )}
        </figure>
      </div>

      <div className="mx-auto grid max-w-[1120px] items-start gap-8 px-5 pt-9 sm:px-8 sm:pt-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        {tableOfContents.length > 0 && (
          <aside className="order-2 lg:order-1">
            <div className="rounded-2xl border border-[#e4e7eb] bg-[#f8f9fa] p-5 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#a77b2c]">In this article</p>
              <nav aria-label="Table of contents" className="mt-3 space-y-1.5">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`block rounded-lg px-3 py-2 text-sm leading-5 transition ${
                      activeSection === item.id ? 'bg-white font-bold text-[#0d3055] shadow-sm' : 'text-[#536373] hover:bg-white hover:text-[#0d3055]'
                    }`}
                    style={{ marginLeft: item.level === 3 ? '0.65rem' : undefined }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        <article className={`blog-article-content order-1 w-full min-w-0 lg:order-2 lg:max-w-[760px] ${tableOfContents.length ? '' : 'lg:col-start-2'}`}>
          <header className="mb-9 border-b border-[#e4e7eb] pb-7">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfa049]/40 bg-white px-3.5 py-1.5 text-xs font-bold text-[#8a621b]">
              <span className="h-2 w-2 rounded-full bg-[#cfa049]" />
              {post.category || 'Academic guidance'}
            </span>
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#0d3055]">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-4 text-base leading-7 text-[#536373] sm:text-lg sm:leading-8">{post.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0d3055] font-display text-sm font-bold text-white">
                  {getInitials(post.author)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#0d3055]">{post.author || 'Expert Assignment Writers'}</span>
                  <span className="mt-0.5 block text-xs text-[#66717d]">Written by the author</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#66717d]">
                {publishedDate && <span className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-[#a77b2c]" />{publishedDate}</span>}
                <span className="inline-flex items-center gap-2"><Clock3 size={15} className="text-[#a77b2c]" />{getReadingTime(content)} min read</span>
                <span className="inline-flex items-center gap-2"><Eye size={15} className="text-[#a77b2c]" />{Number(post.views || 0).toLocaleString('en-GB')} views</span>
              </div>
            </div>
          </header>
          {content ? (
            <MarkdownContent>{content}</MarkdownContent>
          ) : (
            <p className="text-[#66717d]">The article content is being prepared.</p>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#e4e7eb] pt-6">
            <div>
              <p className="text-sm font-bold text-[#0d3055]">Found this useful?</p>
              <p className="mt-1 text-xs text-[#66717d]">Share this article with someone who may need it.</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e7eb] text-sm font-bold text-[#536373] transition hover:border-[#0d3055] hover:text-[#0d3055]"
              >
                f
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e7eb] text-sm font-bold text-[#536373] transition hover:border-[#0d3055] hover:text-[#0d3055]"
              >
                𝕏
              </a>
              <button type="button" onClick={copyLink} aria-label="Copy article link" className="flex h-10 items-center gap-2 rounded-xl border border-[#e4e7eb] px-3 text-xs font-bold text-[#536373] transition hover:border-[#0d3055] hover:text-[#0d3055]">
                {copied ? <Check size={15} /> : <Link2 size={15} />}
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>
        </article>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-[#edf0f3] bg-[#f8f9fa] py-12 sm:mt-20 sm:py-16">
          <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a77b2c]">Keep exploring</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0d3055] sm:text-3xl">Related articles</h2>
              </div>
              <Link href="/blog" className="hidden items-center gap-2 text-sm font-bold text-[#0d3055] hover:text-[#a77b2c] sm:inline-flex">All articles <ArrowRight size={16} /></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {relatedPosts.slice(0, 2).map((relatedPost) => <ArticleCard key={relatedPost.id} post={relatedPost} />)}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 max-w-[1120px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#0d3055] p-6 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e7c77f]">Your next step</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Need more support with your assignment?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Tell us about your brief and get matched with the right academic support.</p>
          </div>
          <button type="button" onClick={() => window.dispatchEvent(new Event('openPopup'))} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#cfa049] px-5 py-3.5 text-sm font-extrabold text-[#082438] transition hover:bg-[#dfb965]">
            Start your brief <ArrowRight size={16} />
          </button>
        </div>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#536373] hover:text-[#0d3055]"><ArrowLeft size={16} /> Back to all articles</Link>
      </section>
    </main>
  );
}
