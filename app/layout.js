import '../src/index.css';
import Script from 'next/script';
import { Manrope, Outfit } from 'next/font/google';
import SiteChrome from './site-chrome';
import { SITE_URL } from '../src/seo';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#0d3055',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${manrope.variable}`}>
        <Script id="tawk-init" strategy="beforeInteractive">
          {`window.Tawk_API = window.Tawk_API || {}; window.Tawk_LoadStart = new Date();`}
        </Script>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
