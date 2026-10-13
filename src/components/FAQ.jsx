import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What types of assignments can I get help with?',
      answer:
        'Support is available across the subjects listed on the site and can cover essays, reports, case studies, coursework and research projects. Check the relevant subject page and include your specific task when you submit an enquiry.',
    },
    {
      question: 'What information should I include when I request help?',
      answer:
        'Share the assignment question, course level, word count, deadline and marking criteria. Include any required structure, referencing style, sources or data so the task can be understood clearly.',
    },
    {
      question: 'Can I request support for a particular subject?',
      answer:
        'Yes. The site has separate pages for business management, accounting, finance, law, nursing, psychology, computer science, engineering and economics. Choose the closest subject and describe your assignment in the enquiry.',
    },
    {
      question: 'Which referencing style should I use?',
      answer:
        'Follow your university or module instructions. Harvard, APA and OSCOLA are used on many UK courses, but requirements vary by subject and institution.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-section-padding bg-white">
      <div className="max-w-3xl mx-auto px-margin-mobile">
        <Reveal><h2 className="font-display text-headline-lg text-primary-900 text-center mb-12">
          Frequently Asked Questions
        </h2></Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="border border-primary-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-primary-50 transition-all group"
              >
                <span className="font-display text-headline-sm text-primary-900">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-primary-900 transition-transform duration-300 group-hover:text-secondary-700 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-body-md font-body text-primary-700 border-t border-primary-200/50 bg-primary-50/50 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
