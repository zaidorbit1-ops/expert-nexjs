import { listAllPublishedPosts } from '../lib/blog';
import { publicPages, SITE_URL } from '../src/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = SITE_URL;
  const siteOrigin = new URL(baseUrl).origin;
  let posts = [];
  let blogIndexable = false;
  try {
    posts = await listAllPublishedPosts();
    blogIndexable = posts.length > 0;
  } catch (error) {
    console.error('Could not load blog posts for sitemap:', error);
  }

  return [
    ...publicPages.filter(({ path }) => path !== '/blog' || blogIndexable).map(({ path }) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: path === '/blog' ? 'daily' : 'monthly',
      priority: path === '/' ? 1 : path === '/blog' ? 0.8 : 0.6,
    })),
    ...posts
      .filter((post) => {
        if (!post.canonical_url) return true;
        try {
          const canonical = new URL(post.canonical_url, baseUrl);
          return canonical.origin === siteOrigin &&
            canonical.pathname.replace(/\/$/, '') === `/blog/${post.slug}`;
        } catch {
          console.error(`Ignoring invalid canonical URL for blog post ${post.slug}`);
          return false;
        }
      })
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.published_at,
        changeFrequency: 'monthly',
        priority: 0.7,
      })),
  ];
}
