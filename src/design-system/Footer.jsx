import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const subjects = [
  ['Accounting', '/accounting-assignments'],
  ['Business Management', '/business-management'],
  ['Finance', '/finance-assignments'],
  ['Law', '/law-assignments'],
  ['Nursing', '/nursing-assignments'],
  ['Psychology', '/psychology-assignments'],
  ['Computer Science', '/computer-science-assignments'],
  ['Engineering', '/engineering-assignments'],
  ['Economics', '/economics-assignments'],
];

const companyLinks = [
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="mx-auto grid max-w-[80rem] gap-9 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-10 2xl:grid-cols-[1.1fr_1.55fr_.7fr_1.2fr] 2xl:gap-8 lg:px-12 lg:py-16">
        <div>
          <Link href="/" className="inline-flex">
            <Image src="/logo.png" alt="Expert Assignment Writers" width={180} height={60} className="h-auto w-40" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
            Professional assignment writing services for UK students. Trusted by thousands since 2012.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Subject Help</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[var(--color-muted)] sm:grid-cols-3 2xl:grid-cols-2">
            {subjects.map(([label, href]) => <li key={href}><Link className="nav-underline hover:text-[var(--color-text)]" href={href}>{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Company</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            {companyLinks.map(([label, href]) => <li key={href}><Link className="nav-underline hover:text-[var(--color-text)]" href={href}>{label}</Link></li>)}
            <li><Link className="nav-underline hover:text-[var(--color-text)]" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="nav-underline hover:text-[var(--color-text)]" href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Contact</h2>
          <ul className="mt-4 space-y-4 text-sm text-[var(--color-muted)]">
            <li className="flex items-start gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-gold-deep" /><a className="break-all hover:text-[var(--color-text)]" href="mailto:info@expertassignmentwriters.co.uk">info@expertassignmentwriters.co.uk</a></li>
            <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-gold-deep" /><span>89 Guild Street, London, EC1P 1RP</span></li>
            <li className="flex items-start gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-gold-deep" /><a className="hover:text-[var(--color-text)]" href="https://wa.me/447476950970" target="_blank" rel="noopener noreferrer">+44 7476 950 970</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[80rem] flex-col gap-3 px-5 py-5 text-xs text-[var(--color-muted)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© 2026 Expert Assignment Writers. All rights reserved.</p>
          <Image src="/allicons.webp" alt="Payment Methods: PayPal, Visa, Mastercard, Discover, JCB" width={270} height={32} className="h-7 w-auto object-contain" />
        </div>
      </div>
    </footer>
  );
}
