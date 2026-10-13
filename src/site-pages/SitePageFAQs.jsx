const faqContent = {
  services: [
    {
      question: 'Which subjects are covered?',
      answer: 'The directory includes business management, accounting, finance, law, nursing, psychology, computer science, engineering and economics. Each subject page explains its focus.',
    },
    {
      question: 'What kinds of assignments are covered?',
      answer: 'The service pages describe formats such as essays, reports, case studies, coursework and research projects. The assignment brief determines the format and scope of an individual request.',
    },
    {
      question: 'What information should I include in an enquiry?',
      answer: 'Include the task question, course level, word count, deadline and assessment criteria. Add any required structure, subject guidance, sources or data relevant to the work.',
    },
  ],
  about: [
    {
      question: 'What does Expert Assignment Writers provide?',
      answer: 'The website provides academic assignment support across the subjects shown in its service directory. The subject pages describe the main topics and assignment formats.',
    },
    {
      question: 'How can I make sure support fits my course?',
      answer: 'Use the assignment brief and module guidance to explain the task, course level, expected format and marking criteria. Check your university rules on permitted assistance.',
    },
    {
      question: 'Which details help explain an assignment?',
      answer: 'The question, subject, course level, deadline, word count and any required referencing style help make the assignment scope clear. Add relevant sources or data if your course provided them.',
    },
  ],
  contact: [
    {
      question: 'What should I write in the contact form?',
      answer: 'Choose the closest topic and include a short description of your query. For an assignment question, add the subject, course level, deadline and any relevant instructions.',
    },
    {
      question: 'Can I contact the team by email or phone?',
      answer: 'Yes. The contact page lists the available email address and phone number as well as the enquiry form. Use whichever option suits your question.',
    },
    {
      question: 'What happens after I send an enquiry?',
      answer: 'The form displays a confirmation when your request has been received successfully. If it shows an error, check the details and try sending it again.',
    },
  ],
  blog: [
    {
      question: 'Who are the study articles for?',
      answer: 'The articles are for students looking for general guidance on assignments, academic writing and study strategies. Always compare general advice with your course instructions.',
    },
    {
      question: 'How can I find articles about my subject?',
      answer: 'Use the search field to look for a topic or select a category to narrow the article list. Open an article to read its full guidance.',
    },
    {
      question: 'Can I use general referencing advice for every course?',
      answer: 'Referencing rules vary by subject and institution. Use the advice as a starting point, then follow the style guide and instructions provided by your university.',
    },
  ],
};

export function SitePageFAQs({ page }) {
  const faqs = faqContent[page];
  if (!faqs) return null;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-margin-mobile md:px-margin-desktop">
        <h2 className="mb-10 text-center font-display text-headline-lg text-primary-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <summary className="cursor-pointer text-body-md font-semibold text-primary-900">{question}</summary>
              <p className="mt-4 text-body-sm leading-relaxed text-primary-700">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
