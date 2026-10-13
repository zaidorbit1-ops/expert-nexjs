export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://expertassignmentwriters.co.uk').replace(/\/+$/, '');

export function createSeoMetadata({ title, description, path, keywords = [], canonicalUrl, type = 'website', image }) {
  const canonical = canonicalUrl || path;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Expert Assignment Writers',
      locale: 'en_GB',
      type,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export const publicPages = [
  {
    path: '/',
    title: 'Assignment Writing Services UK | Expert Assignment Writers',
    description: 'Explore assignment writing and academic support for UK students across business, law, nursing, finance, engineering and more.',
    keywords: ['assignment writing services UK', 'assignment help UK', 'university assignment support'],
  },
  {
    path: '/services',
    title: 'Assignment Writing Services by Subject | Expert Assignment Writers',
    description: 'Explore assignment support across business, accounting, finance, law, nursing, psychology, computing, engineering and economics.',
    keywords: ['assignment writing services', 'subject-specific assignment help', 'academic writing support UK'],
  },
  {
    path: '/about',
    title: 'About Expert Assignment Writers | UK Academic Support',
    description: 'Learn about Expert Assignment Writers and the academic support services offered to students in the United Kingdom.',
    keywords: ['about Expert Assignment Writers', 'UK academic support'],
  },
  {
    path: '/business-management',
    title: 'Business Management Assignment Help UK | Expert Assignment Writers',
    description: 'Explore business management assignment support covering strategy, leadership, marketing, operations and case studies.',
    keywords: ['business management assignment help UK', 'business assignment support', 'management coursework help'],
  },
  {
    path: '/accounting-assignments',
    title: 'Accounting Assignment Help UK | Expert Assignment Writers',
    description: 'Explore accounting assignment support covering financial and management accounting, taxation, auditing and reporting.',
    keywords: ['accounting assignment help UK', 'accounting coursework help', 'financial accounting assignment support'],
  },
  {
    path: '/finance-assignments',
    title: 'Finance Assignment Help UK | Expert Assignment Writers',
    description: 'Explore finance assignment support covering corporate finance, investment analysis, portfolios and risk management.',
    keywords: ['finance assignment help UK', 'finance coursework help', 'corporate finance assignment support'],
  },
  {
    path: '/law-assignments',
    title: 'Law Assignment Help UK | Expert Assignment Writers',
    description: 'Explore UK law assignment support covering case analysis, contract law, criminal law, tort, public law and OSCOLA referencing.',
    keywords: ['law assignment help UK', 'law coursework support', 'OSCOLA assignment help'],
  },
  {
    path: '/nursing-assignments',
    title: 'Nursing Assignment Help UK | Expert Assignment Writers',
    description: 'Explore nursing assignment support covering care plans, clinical topics, reflective practice and evidence-based writing.',
    keywords: ['nursing assignment help UK', 'nursing coursework support', 'nursing care plan assignment help'],
  },
  {
    path: '/psychology-assignments',
    title: 'Psychology Assignment Help UK | Expert Assignment Writers',
    description: 'Explore psychology assignment support covering research methods, cognitive, clinical, social and developmental psychology.',
    keywords: ['psychology assignment help UK', 'psychology coursework support', 'psychology research methods assignment'],
  },
  {
    path: '/computer-science-assignments',
    title: 'Computer Science Assignment Help UK | Expert Assignment Writers',
    description: 'Explore computer science assignment support covering software engineering, data science, AI, databases and web development.',
    keywords: ['computer science assignment help UK', 'computing coursework support', 'programming assignment support'],
  },
  {
    path: '/engineering-assignments',
    title: 'Engineering Assignment Help UK | Expert Assignment Writers',
    description: 'Explore engineering assignment support across mechanical, civil, electrical, aerospace, chemical and sustainable engineering.',
    keywords: ['engineering assignment help UK', 'engineering coursework support', 'engineering report help'],
  },
  {
    path: '/economics-assignments',
    title: 'Economics Assignment Help UK | Expert Assignment Writers',
    description: 'Explore economics assignment support covering microeconomics, macroeconomics, econometrics, trade and policy analysis.',
    keywords: ['economics assignment help UK', 'economics coursework support', 'econometrics assignment help'],
  },
  {
    path: '/contact',
    title: 'Contact Expert Assignment Writers | UK Student Support',
    description: 'Contact Expert Assignment Writers with a question about academic support, your subject or an existing enquiry.',
    keywords: ['contact assignment support', 'Expert Assignment Writers contact'],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Expert Assignment Writers UK',
    description: 'Read how Expert Assignment Writers handles personal information and enquiries submitted through this website.',
    keywords: ['Expert Assignment Writers privacy policy'],
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Expert Assignment Writers UK',
    description: 'Read the terms and conditions that apply when using the Expert Assignment Writers website and services.',
    keywords: ['Expert Assignment Writers terms and conditions'],
  },
  {
    path: '/blog',
    title: 'Study Advice and Academic Resources | Expert Assignment Writers',
    description: 'Browse articles on study strategies, academic writing, referencing and university coursework.',
    keywords: ['UK study advice', 'academic writing resources', 'university study strategies'],
  },
];

export function metadataForPage(path) {
  const page = publicPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`SEO metadata is not configured for ${path}`);
  return createSeoMetadata(page);
}
