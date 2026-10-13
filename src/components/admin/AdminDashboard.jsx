'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ArrowUpRight, Check, ChevronDown, Clock3, Eye, FileText,
  FolderOpen, ImagePlus, Plus, Search, Settings2, Trash2,
  Users, X,
} from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';
import BlogRichTextEditor from './BlogRichTextEditor';
import MarkdownContent from '../MarkdownContent';

const emptyPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category_id: '',
  author_id: '',
  author_name: '',
  status: 'draft',
  feature_image: '',
  tags: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  canonical_url: '',
};

const makeSlug = (value) => value
  .normalize('NFKD')
  .toLowerCase()
  .trim()
  .replace(/[^\p{L}\p{N}]+/gu, '-')
  .replace(/^-+|-+$/g, '');

const inputClass = 'mt-2 w-full rounded-xl border border-[#dfe4e9] bg-white px-4 py-3 text-sm text-[#081829] outline-none transition placeholder:text-[#9aa3ad] focus:border-[#0d3055] focus:ring-4 focus:ring-[#0d3055]/10';
const panelClass = 'rounded-2xl border border-[#e4e7eb] bg-white p-5 shadow-[0_8px_28px_-22px_rgba(8,24,41,.28)] sm:p-6';

function Notice({ notice, onDismiss }) {
  if (!notice) return null;
  return (
    <div role={notice.type === 'error' ? 'alert' : 'status'} className={`mb-6 flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${notice.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-900'}`}>
      <span>{notice.text}</span>
      <button onClick={onDismiss} aria-label="Dismiss notification" className="rounded-md p-1 hover:bg-black/5"><X size={16} /></button>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a77b2c]">{eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0d3055] sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66717d] sm:text-base">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d3055] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#082438] disabled:cursor-wait disabled:opacity-60 ${className}`}>
      {children}
    </button>
  );
}

export default function AdminDashboard({ currentUser, view = 'posts', postId = null }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const isAdmin = currentUser.role === 'admin';
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notice, setNotice] = useState(null);
  const [post, setPost] = useState({
    ...emptyPost,
  });
  const [preview, setPreview] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [categoryCount, setCategoryCount] = useState(0);

  const loadPosts = useCallback(async () => {
    let query = supabase
      .from('posts')
      .select('id, title, slug, excerpt, status, published_at, updated_at, views, category_id, author_id, author_name, feature_image, tags, content, meta_title, meta_description, meta_keywords, canonical_url')
      .order('updated_at', { ascending: false });
    if (!isAdmin) query = query.eq('author_id', currentUser.id);
    const { data, error } = await query;
    if (error) throw error;
    const records = data || [];
    setPosts(records);
    if (view === 'editor' && postId) {
      const record = records.find((item) => item.id === postId);
      if (record) {
        setPost({
          ...emptyPost,
          ...record,
          category_id: record.category_id || '',
          tags: (record.tags || []).join(', '),
        });
      } else {
        setNotice({ type: 'error', text: 'Article not found or you do not have permission to edit it.' });
      }
    }
  }, [currentUser.id, isAdmin, postId, supabase, view]);

  const loadCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, description')
      .order('name');
    if (error) throw error;
    const records = data || [];
    setCategories(records);
    setCategoryCount(records.length);
  }, [supabase]);

  const loadAuthors = useCallback(async () => {
    if (!isAdmin) return;
    const { data, error } = await supabase
      .from('authors')
      .select('id, name, created_at')
      .order('name');
    if (error) throw error;
    setAuthors(data || []);
  }, [isAdmin, supabase]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setNotice(null);
    try {
      const tasks = [loadPosts(), loadCategories()];
      if (isAdmin) tasks.push(loadAuthors());
      await Promise.all(tasks);
    } catch (error) {
      console.error('Could not load editorial workspace:', error);
      setNotice({ type: 'error', text: error.message || 'Could not load dashboard data.' });
    } finally {
      setLoading(false);
    }
  }, [isAdmin, loadAuthors, loadCategories, loadPosts]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredPosts = posts.filter((item) => {
    const matchesSearch = `${item.title} ${item.slug} ${item.status}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (statusFilter === 'all' || item.status === statusFilter);
  });
  const publishedCount = posts.filter((item) => item.status === 'published').length;
  const draftCount = posts.filter((item) => item.status === 'draft').length;
  const editing = Boolean(postId);

  const updatePostField = (field, value) => {
    setPost((current) => ({
      ...current,
      [field]: value,
      ...(field === 'title' && !editing ? { slug: makeSlug(value) } : {}),
    }));
  };

  const uploadImage = async (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setNotice({ type: 'error', text: 'Choose a JPG, PNG, or WEBP image up to 5 MB.' });
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const filePath = `${currentUser.id}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from('blog-images').upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setPost((current) => ({ ...current, feature_image: data.publicUrl }));
      setNotice({ type: 'success', text: 'Featured image uploaded.' });
    } catch (error) {
      setNotice({ type: 'error', text: error.message || 'Image upload failed.' });
    } finally {
      setSaving(false);
    }
  };

  const savePost = async (event) => {
    event.preventDefault();
    if (!post.title.trim() || !post.excerpt.trim() || !post.content.trim()) {
      setNotice({ type: 'error', text: 'Title, excerpt, and article content are required.' });
      return;
    }
    const slug = makeSlug(post.slug || post.title);
    if (!slug) {
      setNotice({ type: 'error', text: 'Enter a title that can be used to create a URL slug.' });
      return;
    }
    const selectedAuthor = authors.find((author) => author.id === post.author_id);
    if (!selectedAuthor) {
      setNotice({ type: 'error', text: 'Add and select an author name before saving this article.' });
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      const record = {
        title: post.title.trim(),
        slug,
        excerpt: post.excerpt.trim(),
        content: post.content.trim(),
        feature_image: post.feature_image || null,
        category_id: post.category_id || null,
        author_id: selectedAuthor.id,
        author_name: selectedAuthor.name,
        status: post.status,
        published_at: post.status === 'published'
          ? (post.published_at || new Date().toISOString())
          : null,
        tags: post.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        meta_title: post.meta_title.trim() || post.title.trim(),
        meta_description: post.meta_description.trim() || post.excerpt.trim(),
        meta_keywords: post.meta_keywords.trim(),
        canonical_url: post.canonical_url.trim(),
        updated_at: new Date().toISOString(),
      };
      const result = editing
        ? await supabase.from('posts').update(record).eq('id', postId)
        : await supabase.from('posts').insert(record);
      if (result.error) throw result.error;
      router.push('/admin');
      router.refresh();
    } catch (error) {
      setNotice({ type: 'error', text: error.message || 'Could not save the blog post.' });
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (item) => {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    setNotice(null);
    const { error } = await supabase.from('posts').delete().eq('id', item.id);
    if (error) {
      setNotice({ type: 'error', text: error.message });
      return;
    }
    setPosts((current) => current.filter((postItem) => postItem.id !== item.id));
    setNotice({ type: 'success', text: 'Article deleted.' });
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    const name = categoryName.trim();
    const slug = makeSlug(name);
    if (!name || !slug) {
      setNotice({ type: 'error', text: 'Enter a category name that can be used to create a URL slug.' });
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      const result = editingCategory
        ? await supabase.from('categories').update({ name, slug, description: categoryDescription.trim() }).eq('id', editingCategory.id)
        : await supabase.from('categories').insert({ name, slug, description: categoryDescription.trim() });
      if (result.error) throw result.error;
      setCategoryName('');
      setCategoryDescription('');
      setEditingCategory(null);
      await loadCategories();
      setNotice({ type: 'success', text: editingCategory ? 'Category updated.' : 'Category added.' });
    } catch (error) {
      setNotice({ type: 'error', text: error.message || 'Could not save the category.' });
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (category) => {
    if (!window.confirm(`Delete the “${category.name}” category? Existing articles will become uncategorised.`)) return;
    const { error } = await supabase.from('categories').delete().eq('id', category.id);
    if (error) setNotice({ type: 'error', text: error.message });
    else {
      await loadCategories();
      setNotice({ type: 'success', text: 'Category deleted.' });
    }
  };

  const saveAuthor = async (event) => {
    event.preventDefault();
    const name = authorName.trim();
    if (!name || name.length > 120) {
      setNotice({ type: 'error', text: 'Enter an author name up to 120 characters.' });
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      const result = editingAuthor
        ? await supabase.from('authors').update({ name }).eq('id', editingAuthor.id)
        : await supabase.from('authors').insert({ name });
      if (result.error) throw result.error;
      setAuthorName('');
      setEditingAuthor(null);
      await loadAuthors();
      setNotice({ type: 'success', text: editingAuthor ? 'Author name updated.' : 'Author added.' });
    } catch (error) {
      setNotice({ type: 'error', text: error.message || 'Could not save author name.' });
    } finally {
      setSaving(false);
    }
  };

  const deleteAuthor = async (author) => {
    if (!window.confirm(`Delete author “${author.name}”? Existing articles use this author, so the database may prevent deleting it.`)) return;
    const { error } = await supabase.from('authors').delete().eq('id', author.id);
    if (error) setNotice({ type: 'error', text: error.message });
    else {
      await loadAuthors();
      setNotice({ type: 'success', text: 'Author deleted.' });
    }
  };

  const startCategoryEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
  };

  const newPostAction = (
    <Link href="/admin/posts/new" className="inline-flex items-center gap-2 rounded-xl bg-[#cfa049] px-5 py-3 text-sm font-extrabold text-[#082438] shadow-sm transition hover:bg-[#bd8d38]">
      <Plus size={18} /> Write an article
    </Link>
  );

  return (
    <main>
      <Notice notice={notice} onDismiss={() => setNotice(null)} />

      {view === 'editor' ? (
        <>
          <div className="mb-6">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#66717d] hover:text-[#0d3055]">
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
          <PageHeading
            eyebrow={editing ? 'Article editor' : 'Create new'}
            title={editing ? 'Edit article' : 'Write an article'}
            description="Shape your article, choose how it is published, and set its search preview."
          />
          {loading ? (
            <div className={`${panelClass} py-20 text-center text-[#66717d]`}>Loading editor…</div>
          ) : (
            <form onSubmit={savePost} className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-6">
                <section className={panelClass}>
                  <label className="block text-sm font-bold text-[#263748]">Article title
                    <input className={inputClass} value={post.title} maxLength={255} required onChange={(event) => updatePostField('title', event.target.value)} placeholder="A useful, reader-first title" />
                  </label>
                  <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
                    <label className="block text-sm font-bold text-[#263748]">URL slug
                      <input className={inputClass} value={post.slug} maxLength={255} required onChange={(event) => updatePostField('slug', makeSlug(event.target.value))} placeholder="your-article-url" />
                      <span className="mt-1 block break-all text-xs font-normal text-[#66717d]">/blog/{post.slug || 'your-article-url'}</span>
                    </label>
                    <label className="block text-sm font-bold text-[#263748]">Category
                      <select className={inputClass} value={post.category_id} onChange={(event) => updatePostField('category_id', event.target.value)}>
                        <option value="">Uncategorised</option>
                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="mt-5 block text-sm font-bold text-[#263748]">Short summary
                    <textarea className={inputClass} value={post.excerpt} maxLength={500} rows={3} required onChange={(event) => updatePostField('excerpt', event.target.value)} placeholder="A short summary for the blog listing and search results." />
                    <span className="mt-1 block text-right text-xs font-normal text-[#66717d]">{post.excerpt.length}/500</span>
                  </label>
                </section>

                <section className="overflow-hidden rounded-2xl border border-[#e4e7eb] bg-white shadow-[0_8px_28px_-22px_rgba(8,24,41,.28)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e7eb] px-5 py-4 sm:px-6">
                    <div>
                      <h2 className="font-display text-lg font-extrabold text-[#0d3055]">Article body</h2>
                      <p className="mt-1 text-xs text-[#66717d]">Paste content with formatting or write directly below.</p>
                    </div>
                    <button type="button" onClick={() => setPreview((current) => !current)} className="inline-flex items-center gap-2 rounded-lg border border-[#dfe4e9] px-3 py-2 text-sm font-bold text-[#0d3055] hover:bg-[#f8f9fa]">
                      <Eye size={16} /> {preview ? 'Edit content' : 'Preview'}
                    </button>
                  </div>
                  {preview ? (
                    <div className="prose prose-lg min-h-[440px] max-w-none px-6 py-5 text-[#263748]">
                      {post.content ? <MarkdownContent>{post.content}</MarkdownContent> : <p className="text-[#9aa3ad]">Your article preview will appear here.</p>}
                    </div>
                  ) : (
                    <BlogRichTextEditor value={post.content} onChange={(value) => updatePostField('content', value)} />
                  )}
                </section>
              </div>

              <aside className="space-y-6 xl:sticky xl:top-24">
                <section className={panelClass}>
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-extrabold text-[#0d3055]">Publish</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${post.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-[#fff7e8] text-[#8a621b]'}`}>{post.status}</span>
                  </div>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Status
                    <select className={inputClass} value={post.status} onChange={(event) => updatePostField('status', event.target.value)}>
                      <option value="draft">Save as draft</option>
                      <option value="published">Publish now</option>
                    </select>
                  </label>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Author name
                    <select className={inputClass} required value={post.author_id} onChange={(event) => updatePostField('author_id', event.target.value)}>
                      <option value="" disabled>Select an author</option>
                      {authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
                    </select>
                    {!authors.length && <Link href="/admin/authors" className="mt-2 inline-block text-xs font-bold text-[#0d3055] underline">Add an author name first</Link>}
                  </label>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Tags
                    <input className={inputClass} value={post.tags} onChange={(event) => updatePostField('tags', event.target.value)} placeholder="Study skills, essay writing" />
                    <span className="mt-1 block text-xs font-normal text-[#66717d]">Separate tags with commas.</span>
                  </label>
                  <button disabled={saving || loading} type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d3055] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#082438] disabled:opacity-60">
                    <Check size={17} />{saving ? 'Saving…' : post.status === 'published' ? 'Save and publish' : 'Save draft'}
                  </button>
                </section>

                <section className={panelClass}>
                  <h2 className="font-display text-lg font-extrabold text-[#0d3055]">Featured image</h2>
                  {post.feature_image ? (
                    <div className="relative mt-4">
                      <img src={post.feature_image} alt="Article featured image preview" className="aspect-[1200/630] w-full rounded-xl bg-[#f1f3f5] object-cover" />
                      <button type="button" onClick={() => updatePostField('feature_image', '')} aria-label="Remove featured image" className="absolute right-2 top-2 rounded-lg bg-white/95 p-2 text-[#39434d] shadow hover:text-red-700"><X size={16} /></button>
                    </div>
                  ) : (
                    <label className="mt-4 flex aspect-[1200/630] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#cbd3da] bg-[#f8f9fa] text-center text-sm font-semibold text-[#536373] transition hover:border-[#0d3055] hover:bg-[#f3f6f9]">
                      <ImagePlus size={22} className="text-[#a77b2c]" />
                      Upload a JPG, PNG or WEBP
                      <span className="text-xs font-normal">Recommended ratio 1200 × 630 · max 5 MB</span>
                      <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => uploadImage(event.target.files?.[0])} />
                    </label>
                  )}
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Or paste an image URL
                    <input className={inputClass} type="url" value={post.feature_image} onChange={(event) => updatePostField('feature_image', event.target.value)} placeholder="https://…" />
                  </label>
                </section>

                <details className={`${panelClass} group`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-extrabold text-[#0d3055]">
                    <span className="flex items-center gap-2"><Settings2 size={18} /> Search settings</span>
                    <ChevronDown size={17} className="transition group-open:rotate-180" />
                  </summary>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Meta title
                    <input className={inputClass} value={post.meta_title} maxLength={255} onChange={(event) => updatePostField('meta_title', event.target.value)} placeholder={post.title || 'Search result title'} />
                    <span className="mt-1 block text-right text-xs font-normal text-[#66717d]">{post.meta_title.length}/60 recommended</span>
                  </label>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Meta description
                    <textarea className={inputClass} value={post.meta_description} maxLength={320} rows={3} onChange={(event) => updatePostField('meta_description', event.target.value)} placeholder={post.excerpt || 'Summarise this article for search.'} />
                    <span className="mt-1 block text-right text-xs font-normal text-[#66717d]">{post.meta_description.length}/160 recommended</span>
                  </label>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">SEO keywords
                    <input className={inputClass} value={post.meta_keywords} onChange={(event) => updatePostField('meta_keywords', event.target.value)} placeholder="essay structure, study skills" />
                  </label>
                  <label className="mt-4 block text-sm font-bold text-[#263748]">Canonical URL
                    <input className={inputClass} type="url" value={post.canonical_url} onChange={(event) => updatePostField('canonical_url', event.target.value)} placeholder="https://example.com/blog/article" />
                  </label>
                </details>
              </aside>
            </form>
          )}
        </>
      ) : view === 'categories' ? (
        <>
          <PageHeading eyebrow="Organisation" title="Categories" description="Keep articles easy to browse by grouping them into clear topics." />
          {!isAdmin ? (
            <div className={panelClass}>Only administrators can manage categories.</div>
          ) : (
            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
              <section className={panelClass}>
                <div className="mb-4 flex items-center justify-between">
                  <div><h2 className="font-display text-xl font-extrabold text-[#0d3055]">All categories</h2><p className="mt-1 text-sm text-[#66717d]">{categoryCount} total</p></div>
                  <FolderOpen size={21} className="text-[#cfa049]" />
                </div>
                {loading ? <p className="py-12 text-center text-sm text-[#66717d]">Loading categories…</p> : (
                  <div className="divide-y divide-[#edf0f3]">
                    {categories.map((category) => (
                      <div key={category.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <div className="min-w-0">
                          <p className="font-bold text-[#263748]">{category.name}</p>
                          <p className="mt-1 truncate text-xs text-[#66717d]">/{category.slug}{category.description ? ` · ${category.description}` : ''}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => startCategoryEdit(category)} className="rounded-lg border border-[#dfe4e9] px-3 py-2 text-xs font-bold text-[#0d3055] hover:bg-[#f8f9fa]">Edit</button>
                          <button onClick={() => deleteCategory(category)} aria-label={`Delete ${category.name}`} className="rounded-lg border border-[#f0d7d7] p-2 text-[#a33a3a] hover:bg-red-50"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    ))}
                    {!categories.length && <p className="py-12 text-center text-sm text-[#66717d]">No categories yet. Add your first one here.</p>}
                  </div>
                )}
              </section>
              <form onSubmit={saveCategory} className={panelClass}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a77b2c]">{editingCategory ? 'Update category' : 'New category'}</p>
                <h2 className="mt-2 font-display text-xl font-extrabold text-[#0d3055]">{editingCategory ? 'Edit details' : 'Add a category'}</h2>
                <label className="mt-5 block text-sm font-bold text-[#263748]">Name
                  <input className={inputClass} required maxLength={120} value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="e.g. Study strategies" />
                </label>
                <label className="mt-4 block text-sm font-bold text-[#263748]">Description
                  <textarea className={inputClass} rows={4} value={categoryDescription} onChange={(event) => setCategoryDescription(event.target.value)} placeholder="A short description for this topic" />
                </label>
                <div className="mt-5 flex gap-3">
                  <PrimaryButton type="submit" disabled={saving}>{saving ? 'Saving…' : editingCategory ? 'Save changes' : <><Plus size={17} /> Add category</>}</PrimaryButton>
                  {editingCategory && <button type="button" onClick={() => { setEditingCategory(null); setCategoryName(''); setCategoryDescription(''); }} className="rounded-xl border border-[#dfe4e9] px-4 py-3 text-sm font-bold text-[#536373] hover:bg-[#f8f9fa]">Cancel</button>}
                </div>
              </form>
            </div>
          )}
        </>
      ) : view === 'authors' ? (
        <>
          <PageHeading eyebrow="Bylines" title="Author names" description="Manage the names available in the article editor. These are display names only—no email or login is needed." />
          {!isAdmin ? (
            <div className={panelClass}>Only administrators can manage author names.</div>
          ) : (
            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
              <section className={panelClass}>
                <div className="mb-5 flex items-center justify-between">
                  <div><h2 className="font-display text-xl font-extrabold text-[#0d3055]">Available authors</h2><p className="mt-1 text-sm text-[#66717d]">{authors.length} author name{authors.length === 1 ? '' : 's'}</p></div>
                  <Users size={21} className="text-[#cfa049]" />
                </div>
                {loading ? <p className="py-12 text-center text-sm text-[#66717d]">Loading author names…</p> : (
                  <div className="divide-y divide-[#edf0f3]">
                    {authors.map((author) => (
                      <div key={author.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef2f6] font-bold text-[#0d3055]">{author.name.slice(0, 1).toUpperCase()}</span>
                          <span className="min-w-0"><span className="block truncate font-bold text-[#263748]">{author.name}</span><span className="block text-sm text-[#66717d]">Article byline</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => { setEditingAuthor(author); setAuthorName(author.name); }} className="rounded-lg border border-[#dfe4e9] px-3 py-2 text-xs font-bold text-[#0d3055] hover:bg-[#f8f9fa]">Edit</button>
                          <button onClick={() => deleteAuthor(author)} aria-label={`Delete author ${author.name}`} className="rounded-lg border border-[#f0d7d7] p-2 text-[#a33a3a] hover:bg-red-50"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    ))}
                    {!authors.length && <p className="py-12 text-center text-sm text-[#66717d]">No author names yet. Add a name to make it available in the article editor.</p>}
                  </div>
                )}
              </section>
              <form onSubmit={saveAuthor} className={panelClass}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a77b2c]">{editingAuthor ? 'Update byline' : 'New byline'}</p>
                <h2 className="mt-2 font-display text-xl font-extrabold text-[#0d3055]">{editingAuthor ? 'Edit author name' : 'Add an author name'}</h2>
                <p className="mt-2 text-sm leading-6 text-[#66717d]">Just the public name shown on articles. No account, email or access is created.</p>
                <label className="mt-5 block text-sm font-bold text-[#263748]">Name
                  <input className={inputClass} required maxLength={120} value={authorName} onChange={(event) => setAuthorName(event.target.value)} placeholder="e.g. Sarah Mitchell" />
                </label>
                <div className="mt-5 flex gap-3">
                  <PrimaryButton disabled={saving}>{saving ? 'Saving…' : editingAuthor ? 'Save name' : <><Plus size={16} /> Add name</>}</PrimaryButton>
                  {editingAuthor && <button type="button" onClick={() => { setEditingAuthor(null); setAuthorName(''); }} className="rounded-xl border border-[#dfe4e9] px-4 py-3 text-sm font-bold text-[#536373] hover:bg-[#f8f9fa]">Cancel</button>}
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <>
          <PageHeading
            eyebrow="Editorial workspace"
            title="Your articles"
            description="Create, review and manage your blog content from one place."
            action={newPostAction}
          />
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'All articles', value: posts.length, icon: FileText },
              { label: 'Published', value: publishedCount, icon: ArrowUpRight },
              { label: 'Drafts', value: draftCount, icon: Clock3 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#e4e7eb] bg-white p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f1e6] text-[#a77b2c]"><Icon size={20} /></span>
                <span><span className="block text-2xl font-extrabold text-[#0d3055]">{loading ? '—' : value}</span><span className="mt-0.5 block text-xs font-semibold text-[#66717d]">{label}</span></span>
              </div>
            ))}
          </div>
          <section className={panelClass}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div><h2 className="font-display text-xl font-extrabold text-[#0d3055]">Article library</h2><p className="mt-1 text-sm text-[#66717d]">Find an article or update its publishing status.</p></div>
              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                <label className="relative min-w-[220px] flex-1 sm:flex-none"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3ad]" /><input className="w-full rounded-xl border border-[#dfe4e9] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0d3055]" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search articles" /></label>
                <select aria-label="Filter by status" className="rounded-xl border border-[#dfe4e9] bg-white px-3 py-2.5 text-sm font-semibold text-[#39434d] outline-none focus:border-[#0d3055]" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead><tr className="border-y border-[#edf0f3] bg-[#f8f9fa] text-[11px] uppercase tracking-[0.1em] text-[#66717d]"><th className="px-4 py-3 font-bold">Article</th><th className="px-4 py-3 font-bold">Status</th><th className="px-4 py-3 font-bold">Last updated</th><th className="px-4 py-3 font-bold">Views</th><th className="px-4 py-3 text-right font-bold">Actions</th></tr></thead>
                <tbody className="divide-y divide-[#edf0f3]">
                  {loading ? (
                    <tr><td colSpan={5} className="px-4 py-16 text-center text-[#66717d]">Loading your articles…</td></tr>
                  ) : filteredPosts.map((item) => (
                    <tr key={item.id} className="transition hover:bg-[#fbfcfd]">
                      <td className="px-4 py-4">
                        <p className="font-bold text-[#263748]">{item.title}</p>
                        <p className="mt-1 max-w-[390px] truncate text-xs text-[#87929e]">/blog/{item.slug}</p>
                      </td>
                      <td className="px-4 py-4"><span className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${item.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-[#fff7e8] text-[#8a621b]'}`}>{item.status}</span></td>
                      <td className="px-4 py-4 text-[#536373]">{item.updated_at ? new Date(item.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                      <td className="px-4 py-4 text-[#536373]">{item.views || 0}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          {item.status === 'published' && <Link href={`/blog/${item.slug}`} target="_blank" aria-label={`View ${item.title}`} className="rounded-lg border border-[#dfe4e9] p-2 text-[#536373] hover:border-[#0d3055] hover:text-[#0d3055]"><Eye size={16} /></Link>}
                          <Link href={`/admin/posts/${item.id}/edit`} className="rounded-lg border border-[#dfe4e9] px-3 py-2 text-xs font-bold text-[#0d3055] hover:bg-[#f1f3f5]">Edit</Link>
                          <button onClick={() => deletePost(item)} aria-label={`Delete ${item.title}`} className="rounded-lg border border-[#f0d7d7] p-2 text-[#a33a3a] hover:bg-red-50"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loading && !filteredPosts.length && (
                    <tr><td colSpan={5} className="px-4 py-16 text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f1e6] text-[#a77b2c]"><FileText size={21} /></span>
                      <p className="mt-3 font-bold text-[#263748]">{posts.length ? 'No matching articles' : 'Your first article starts here'}</p>
                      <p className="mt-1 text-sm text-[#66717d]">{posts.length ? 'Try another search or status filter.' : 'Create a draft or publish your first blog article.'}</p>
                      {!posts.length && <Link href="/admin/posts/new" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0d3055] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#082438]"><Plus size={16} /> Write an article</Link>}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {isAdmin && <Link href="/admin/categories" className="inline-flex items-center gap-2 rounded-xl border border-[#dfe4e9] bg-white px-4 py-3 font-semibold text-[#536373] hover:border-[#0d3055] hover:text-[#0d3055]"><FolderOpen size={16} /> Manage categories <ArrowUpRight size={15} /></Link>}
            {isAdmin && <Link href="/admin/authors" className="inline-flex items-center gap-2 rounded-xl border border-[#dfe4e9] bg-white px-4 py-3 font-semibold text-[#536373] hover:border-[#0d3055] hover:text-[#0d3055]"><Users size={16} /> Manage author names <ArrowUpRight size={15} /></Link>}
          </div>
        </>
      )}
    </main>
  );
}
