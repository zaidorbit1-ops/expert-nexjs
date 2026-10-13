'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FileText, FolderOpen, LayoutDashboard, LogOut, PenLine, Users,
} from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';

const navigation = [
  { href: '/admin', label: 'All articles', icon: FileText, exact: true },
  { href: '/admin/categories', label: 'Categories', icon: FolderOpen, adminOnly: true },
  { href: '/admin/authors', label: 'Authors', icon: Users, adminOnly: true },
];

export default function DashboardShell({ children, currentUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const links = navigation.filter(({ adminOnly }) => !adminOnly || currentUser.role === 'admin');

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Could not sign out of the editorial workspace:', error);
      return;
    }
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#081829] lg:flex">
      <aside className="flex shrink-0 flex-col bg-[#0d3055] text-white lg:sticky lg:top-0 lg:h-screen lg:w-[258px]">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#cfa049] text-[#082438]">
              <PenLine size={20} />
            </span>
            <span>
              <span className="block font-display text-lg font-extrabold">Editorial</span>
              <span className="mt-0.5 block text-xs text-white/60">Expert Assignment Writers</span>
            </span>
          </Link>
        </div>

        <div className="px-4 pt-6">
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Workspace</p>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible" aria-label="Admin navigation">
            {links.map(({ href, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active ? 'bg-white text-[#0d3055] shadow-sm' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto hidden border-t border-white/10 p-4 lg:block">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cfa049] font-bold text-[#082438]">
              {(currentUser.display_name || currentUser.email || 'E').slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{currentUser.display_name || currentUser.email}</span>
              <span className="mt-0.5 block text-xs capitalize text-white/55">{currentUser.role}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-[#e4e7eb] bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
            <p className="text-xs font-semibold text-[#66717d]">BLOG MANAGEMENT <span className="mx-1 text-[#cfa049]">/</span> ADMIN</p>
            <div className="flex items-center gap-3">
              <span className="hidden text-right sm:block">
                <span className="block max-w-56 truncate text-sm font-bold text-[#0d3055]">{currentUser.display_name || currentUser.email}</span>
                <span className="block text-xs capitalize text-[#66717d]">{currentUser.role}</span>
              </span>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e7eb] text-[#39434d] transition hover:border-[#0d3055] hover:text-[#0d3055] lg:hidden"
              >
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}
