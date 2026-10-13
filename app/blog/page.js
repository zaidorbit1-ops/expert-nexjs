import { cache } from 'react';
import BlogList from '../../src/site-pages/BlogList';
import { listPublishedPosts } from '../../lib/blog';
import { metadataForPage } from '../../src/seo';

export const dynamic = 'force-dynamic';

const getPosts = cache(() => listPublishedPosts(50));

export async function generateMetadata() {
  try {
    const posts = await getPosts();
    return {
      ...metadataForPage('/blog'),
      ...(posts.length ? {} : { robots: { index: false, follow: false } }),
    };
  } catch (error) {
    console.error('Unable to load published blog posts for metadata:', error);
    return {
      ...metadataForPage('/blog'),
      robots: { index: false, follow: false },
    };
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogList initialPosts={posts} />;
}
