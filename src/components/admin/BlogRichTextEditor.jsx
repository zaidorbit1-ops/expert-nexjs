'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Markdown } from '@tiptap/markdown';
import {
  Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Quote,
  Redo2, Strikethrough, Undo2,
} from 'lucide-react';

const extensions = [
  StarterKit,
  Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
  Markdown,
];

function ToolButton({ label, active, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
        active ? 'bg-[#0d3055] text-white' : 'text-[#39434d] hover:bg-[#f1f3f5] hover:text-[#0d3055]'
      }`}
    >
      {children}
    </button>
  );
}

export default function BlogRichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions,
    content: value || '',
    contentType: 'markdown',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'blog-rich-editor min-h-[440px] px-6 py-5 text-[16px] leading-8 text-[#263748] outline-none',
        'aria-label': 'Blog article content editor',
      },
    },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getMarkdown()),
  });

  useEffect(() => {
    if (!editor) return;
    const currentValue = editor.getMarkdown();
    if ((value || '') !== currentValue) {
      editor.commands.setContent(value || '', { contentType: 'markdown' });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="min-h-[440px] animate-pulse rounded-b-2xl bg-[#f8f9fa]" aria-label="Loading editor" />;
  }

  const askForLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the link URL', previousUrl || 'https://');
    if (url === null) return;
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  return (
    <div className="overflow-hidden rounded-b-2xl">
      <div className="flex flex-wrap items-center gap-1 border-b border-[#e4e7eb] bg-[#f8f9fa] px-3 py-2" role="toolbar" aria-label="Article formatting">
        <ToolButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={17} /></ToolButton>
        <ToolButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={17} /></ToolButton>
        <ToolButton label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={17} /></ToolButton>
        <span className="mx-1 h-6 border-l border-[#d1d6dc]" />
        <ToolButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={18} /></ToolButton>
        <ToolButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={18} /></ToolButton>
        <ToolButton label="Bulleted list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={18} /></ToolButton>
        <ToolButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></ToolButton>
        <ToolButton label="Block quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={17} /></ToolButton>
        <ToolButton label="Add or edit link" active={editor.isActive('link')} onClick={askForLink}><Link2 size={17} /></ToolButton>
        <span className="mx-1 h-6 border-l border-[#d1d6dc]" />
        <ToolButton label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 size={17} /></ToolButton>
        <ToolButton label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 size={17} /></ToolButton>
      </div>
      <EditorContent editor={editor} />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e4e7eb] bg-white px-5 py-3 text-xs text-[#66717d]">
        <span>Paste from Word or Google Docs — headings, bold, lists and links are kept.</span>
        <span>Saved as Markdown for the public article</span>
      </div>
    </div>
  );
}
