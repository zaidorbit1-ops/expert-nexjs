import { cache } from 'react';
import { notFound } from 'next/navigation';
import BlogPost from '../../../src/site-pages/BlogPost';
import { getPublishedPost, incrementPostViews, listPublishedPosts } from '../../../lib/blog';
import { createSeoMetadata } from '../../../src/seo';

export const dynamic = 'force-dynamic';

const getPost = cache((slug) => getPublishedPost(slug));
const getRelatedPosts = cache(() => listPublishedPosts(100));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post;
  try {
    post = await getPost(slug);
  } catch (error) {
    console.error('Unable to load blog metadata:', error);
    return {
      title: 'The blog is temporarily unavailable | Expert Assignment Writers UK',
      robots: { index: false },
    };
  }
  if (!post) {
    return { title: 'Article Not Found | Expert Assignment Writers UK', robots: { index: false } };
  }
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || `Read ${post.title} on the Expert Assignment Writers blog.`;
  const keywords = typeof post.meta_keywords === 'string'
    ? post.meta_keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
    : post.meta_keywords || [];

  const seoMetadata = createSeoMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    canonicalUrl: post.canonical_url || undefined,
    keywords,
    type: 'article',
    image: post.feature_image || undefined,
  });

  return {
    ...seoMetadata,
    openGraph: {
      ...seoMetadata.openGraph,
      ...(post.published_at ? { publishedTime: new Date(post.published_at).toISOString() } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  let relatedPosts = [];
  try {
    await incrementPostViews(post.id);
    const posts = await getRelatedPosts();
    relatedPosts = posts.filter(
      (candidate) => candidate.category === post.category && candidate.slug !== post.slug,
    ).slice(0, 3);
  } catch (error) {
    console.error('Unable to update blog views or load related posts:', error);
  }

  return <BlogPost slug={slug} initialPost={post} initialRelatedPosts={relatedPosts} />;
}
