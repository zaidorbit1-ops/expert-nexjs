import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, CheckCircle, Undo2 } from 'lucide-react';
import Reveal from './Reveal';

const WhyUs = () => {
  return (
    <section id="why-us" className="py-section-padding bg-primary-50">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <Reveal className="text-center mb-16 space-y-4">
          <h2 className="font-display text-headline-lg text-primary-900 mb-4">
            Academic Support Shaped Around Your Assignment
          </h2>
          <p className="text-body-lg font-body text-primary-700">
            Explore subject coverage and share the requirements that matter to your course.
          </p>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Large Card */}
          <motion.div whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className="md:col-span-2 bg-primary-900 text-white p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-secondary-700/20 flex items-center justify-center mb-6 group-hover:bg-secondary-700/40 transition-all">
                <Award size={32} className="text-secondary-700" />
              </div>
              <h3 className="font-display text-headline-md text-white mb-4">
                A Clear Brief Comes First
              </h3>
              <p className="text-body-lg text-primary-100 max-w-md leading-relaxed">
                Share the assignment question, course level, marking criteria and required format to explain what the task involves.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
              <Award size={240} />
            </div>
          </motion.div>

          {/* Small Card */}
          <motion.div whileHover={{ y: -7, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className="bg-white p-10 rounded-3xl border border-primary-200 flex flex-col justify-between hover:shadow-lg transition-all group animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div>
              <div className="w-16 h-16 rounded-full bg-secondary-700/10 flex items-center justify-center mb-6 group-hover:bg-secondary-700 group-hover:text-white transition-all">
                <Clock size={32} className="text-secondary-700 group-hover:text-white" />
              </div>
              <h3 className="font-display text-headline-sm text-primary-900 mb-4">
                Subject Coverage
              </h3>
              <p className="text-body-md font-body text-primary-700 leading-relaxed">
                Explore support across business, accounting, finance, law, nursing, psychology, computing, engineering and economics.
              </p>
            </div>
          </motion.div>

          {/* Small Card */}
          <motion.div whileHover={{ y: -7, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className="bg-white p-10 rounded-3xl border border-primary-200 flex flex-col justify-between hover:shadow-lg transition-all group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <div className="w-16 h-16 rounded-full bg-primary-900/10 flex items-center justify-center mb-6 group-hover:bg-primary-900 group-hover:text-white transition-all">
                <CheckCircle size={32} className="text-primary-900 group-hover:text-white" />
              </div>
              <h3 className="font-display text-headline-sm text-primary-900 mb-4">
                Assignment Formats
              </h3>
              <p className="text-body-md font-body text-primary-700 leading-relaxed">
                The subject pages describe common formats such as essays, reports, case studies, coursework and research projects.
              </p>
            </div>
          </motion.div>

          {/* Large Card */}
          <motion.div whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className="md:col-span-2 bg-secondary-700 text-white p-10 rounded-3xl flex items-center justify-between overflow-hidden relative group hover:shadow-xl transition-all">
            <div className="max-w-md relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
                <Undo2 size={32} />
              </div>
              <h3 className="font-display text-headline-md text-white mb-4">
                Keep Course Requirements in View
              </h3>
              <p className="text-body-lg text-white/90 leading-relaxed">
                Use your university guidance to check the rules on permitted assistance, referencing and the work you submit.
              </p>
            </div>
            <div className="opacity-10 absolute -right-8 -bottom-8">
              <Undo2 size={240} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
