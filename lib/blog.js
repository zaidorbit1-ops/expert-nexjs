import { createClient } from './supabase/server';

const publicPostFields = `
  id, title, slug, excerpt, content, feature_image, author_name, published_at,
  views, tags, meta_title, meta_description, meta_keywords, canonical_url,
  category:categories(name)
`;

const fallbackPosts = [
  {
    id: 'fallback-essay-tips',
    title: 'How to structure a strong assignment introduction',
    slug: 'how-to-structure-a-strong-assignment-introduction',
    excerpt: 'Learn how to open an assignment with clarity, context, and a clear line of argument that keeps the reader engaged from the first paragraph.',
    content: `## Why the introduction matters

The introduction is your reader's first impression of the assignment. It sets the tone, frames the question, and signals the approach you will take.

## A simple formula

1. Start with the wider context.
2. Narrow the focus to the task.
3. State the key argument or aim.
4. Preview the main points.

> A strong introduction should make the assignment feel focused and purposeful without giving away every point in the essay.

## Common mistakes to avoid

- Writing a generic opening that could apply to any subject.
- Overloading the introduction with references and background details.
- Failing to clearly show the argument or thesis.

## Final check

Before you move on, ask yourself: does the introduction explain the purpose of the assignment and the route you will take to answer it?`,
    feature_image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Aisha Khan',
    published_at: '2026-08-16T09:30:00.000Z',
    views: 1248,
    tags: ['essay writing', 'assignments'],
    meta_title: 'How to structure a strong assignment introduction',
    meta_description: 'Learn how to write a clear and persuasive assignment introduction that sets out your argument and keeps readers engaged.',
    meta_keywords: 'assignment introduction, essay structure, academic writing',
    canonical_url: 'https://www.expertassignmentwriters.co.uk/blog/how-to-structure-a-strong-assignment-introduction',
    category: 'Essay Tips',
    author: 'Aisha Khan',
  },
  {
    id: 'fallback-study-strategies',
    title: 'Five study methods that improve retention before deadlines',
    slug: 'five-study-methods-that-improve-retention-before-deadlines',
    excerpt: 'Build a study routine that helps you remember core concepts and stay calm when your deadlines get close.',
    content: `## Study smarter, not just longer

When deadlines pile up, many students try to extend revision hours without changing the quality of their sessions. Better retention usually comes from structure and repetition.

## 1. Active recall

Test yourself without notes. This forces your brain to retrieve information rather than passively re-read it.

## 2. Spaced repetition

Review material at intervals instead of cramming everything in one evening.

## 3. Interleaving

Mix related topics and switch between them to strengthen your understanding.

## 4. Practice questions

Use past papers and short problem sets to spot gaps in your knowledge.

## 5. Summaries with examples

Condense each concept into a short outline and attach an example to make it memorable.

## Final tip

Short, focused study blocks are often more effective than long, exhausted sessions.`,
    feature_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Taylor Morgan',
    published_at: '2026-09-02T12:00:00.000Z',
    views: 982,
    tags: ['study strategies', 'revision'],
    meta_title: 'Five study methods that improve retention before deadlines',
    meta_description: 'Improve retention with practical study strategies that work when deadlines are close and your workload feels heavy.',
    meta_keywords: 'study strategies, retention, revision techniques',
    canonical_url: 'https://www.expertassignmentwriters.co.uk/blog/five-study-methods-that-improve-retention-before-deadlines',
    category: 'Study Strategies',
    author: 'Taylor Morgan',
  },
  {
    id: 'fallback-academic-news',
    title: 'What universities look for in a well-referenced paper',
    slug: 'what-universities-look-for-in-a-well-referenced-paper',
    excerpt: 'Good referencing is not just a technical requirement. It shows credibility, transparency, and strong academic habits.',
    content: `## Referencing signals quality

Universities often assess referencing as evidence that a student has engaged with credible sources and used them responsibly.

## What strong referencing includes

- Correct citation format
- Consistent in-text references
- A complete and accurate reference list
- Clear alignment between claims and evidence

## Why it matters

A well-referenced paper helps your tutor see that you have read widely, questioned sources, and built your argument carefully.

## Quick checks before submission

Review each paragraph for a source, verify your citation style, and ensure the bibliography is complete.`,
    feature_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Lucas Bennett',
    published_at: '2026-09-18T15:45:00.000Z',
    views: 1461,
    tags: ['referencing', 'academic standards'],
    meta_title: 'What universities look for in a well-referenced paper',
    meta_description: 'Understand how strong referencing supports academic credibility and helps your work meet university expectations.',
    meta_keywords: 'referencing, academic writing, university standards',
    canonical_url: 'https://www.expertassignmentwriters.co.uk/blog/what-universities-look-for-in-a-well-referenced-paper',
    category: 'Academic News',
    author: 'Lucas Bennett',
  },
];

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function normalisePost(post) {
  return {
    ...post,
    category: post.category?.name || post.category || 'Uncategorized',
    author: post.author_name || post.author || 'Expert Assignment Writers',
  };
}

function getFallbackPosts(limit = 20) {
  return fallbackPosts.slice(0, Math.max(1, Number(limit) || fallbackPosts.length));
}

async function fetchPublishedPostPage(supabase, offset, pageSize) {
  const { data, error } = await supabase
    .from('posts')
    .select(publicPostFields)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .order('id', { ascending: true })
    .range(offset, offset + pageSize - 1);
  if (error) throw new Error(`Could not load blog posts: ${error.message}`);
  return data;
}

export async function listPublishedPosts(limit = 20) {
  if (!hasSupabaseConfig()) {
    return getFallbackPosts(limit).map(normalisePost);
  }

  const supabase = await createClient();
  const parsedLimit = Number(limit);
  const targetLimit = Number.isFinite(parsedLimit)
    ? Math.max(Math.floor(parsedLimit) || 20, 1)
    : 20;
  const data = [];

  while (data.length < targetLimit) {
    const pageSize = Math.min(100, targetLimit - data.length);
    const page = await fetchPublishedPostPage(supabase, data.length, pageSize);
    data.push(...page);
    if (page.length < pageSize) break;
  }

  return data.map(normalisePost);
}

export async function listAllPublishedPosts() {
  if (!hasSupabaseConfig()) {
    return getFallbackPosts(100).map(normalisePost);
  }

  const supabase = await createClient();
  const data = [];

  while (true) {
    const page = await fetchPublishedPostPage(supabase, data.length, 100);
    data.push(...page);
    if (page.length < 100) break;
  }

  return data.map(normalisePost);
}

export async function getPublishedPost(slug) {
  if (!hasSupabaseConfig()) {
    return getFallbackPosts(100).find((post) => post.slug === slug) || null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(publicPostFields)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .maybeSingle();
  if (error) throw new Error(`Could not load blog article: ${error.message}`);
  return data ? normalisePost(data) : null;
}

export async function incrementPostViews(id) {
  if (!hasSupabaseConfig()) {
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_post_views', { post_id: id });
  if (error) throw new Error(`Could not update article views: ${error.message}`);
}
