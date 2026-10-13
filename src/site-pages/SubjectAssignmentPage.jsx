'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Check,
  CheckCircle,
  ClipboardList,
  Code2,
  Database,
  DollarSign,
  FileText,
  Gavel,
  GitBranch,
  Globe2,
  HeartPulse,
  MessageCircle,
  Scale,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import Breadcrumb from '../design-system/Breadcrumb';
import Button from '../design-system/Button';
import Card from '../design-system/Card';
import CTABanner from '../design-system/CTABanner';
import FAQAccordion from '../design-system/FAQAccordion';
import Section from '../design-system/Section';
import { PageContentSections } from './PageContentSections';

const subjectPages = {
  finance: {
    title: 'Finance Assignment Help for UK Students',
    eyebrow: 'Finance Precision for UK Students',
    description: 'From portfolio optimisation to corporate finance analysis, our finance specialists turn technical research into polished assignments that meet UK grading criteria.',
    icon: DollarSign,
    visual: 'finance',
    visualTag: 'Finance workflow',
    visualKicker: 'Portfolio analysis',
    visualTitle: 'Read the return behind the numbers',
    visualLabels: ['Capital', 'Risk', 'Return'],
    visualMarkers: ['01', '02', '03'],
    visualSummary: 'Investment snapshot',
    visualMetrics: [['Portfolio', 'Balanced'], ['Risk level', 'Measured'], ['Outcome', 'Explained']],
    facts: [
      ['15,000+ Students Supported', 'Students supported'],
      ['Trusted by UK Universities', 'University focused'],
    ],
    topicsTitle: 'Finance Topics and Specialisms',
    topics: [
      ['Corporate Finance', 'Capital budgeting, valuation modelling and financial strategy papers built for UK business modules.', BriefcaseBusiness],
      ['Investment Analysis', 'Asset valuation, portfolio analysis and risk assessment reports with clear recommendations.', BarChart3],
      ['Portfolio Management', 'Optimisation, asset allocation and performance review papers for investment-focused coursework.', TrendingUp],
      ['International Finance', 'Forex, international markets and cross-border capital flow assignments with global insight.', Globe2],
      ['Derivatives', 'Pricing models, Black-Scholes analysis and hedging strategy reports for derivatives modules.', Activity],
      ['Risk Management', 'VaR, stress testing and financial risk frameworks tailored to UK regulation and grading rubrics.', ShieldCheck],
    ],
    featureEyebrow: 'The Quantitative Edge',
    featureTitle: 'We build finance assignments that score in both analysis and structure.',
    featureText: 'Our writers deliver models, charts and explanations together so your submission reads professionally and demonstrates deep financial insight.',
    featurePoints: ['Bloomberg Terminal', 'Python & R', 'Advanced Excel/VBA', 'DATA & EViews'],
    proof: [
      ['PhD Finance Experts', 'Specialist writers from LSE, Oxford and Warwick with deep finance research backgrounds.'],
      ['100% Plagiarism Free', 'We provide Turnitin reports with every finance assignment to ensure originality and academic safety.'],
      ['24/7 Academic Support', 'Our finance writing team is available around the clock for urgent assignments and exam season deadlines.'],
    ],
    testimonialsTitle: 'High-achieving finance students trust our finance expertise.',
    testimonials: [
      ['The derivatives assignment was handled with precision and my professor praised the clarity of the calculations.', 'Emily Carter', 'MSc Finance, Imperial College London'],
      ['I got a first for my portfolio management report thanks to the strong Excel models and investment logic they delivered.', 'Oliver Reid', 'BSc Economics, University of Manchester'],
      ['Professional service and fast delivery. The valuation report was perfect for my module requirements.', 'Mia Patel', 'MSc Accounting & Finance, LSE'],
    ],
    faqs: [
      ['What types of finance assignments can I get help with?', 'Finance coursework can cover corporate finance, investment analysis, portfolio management, financial markets and risk. The exact topic and output depend on your module brief.'],
      ['What should I include in a finance assignment brief?', 'Include the task, course level, word count, deadline and assessment criteria. Add any data, required model, software instructions or expected charts and tables provided by your course.'],
      ['Which referencing style should I use for finance coursework?', 'Follow the citation style specified by your university or module. Cite the sources of data and ideas, and include the date or reporting period when it matters to the analysis.'],
    ],
  },
  law: {
    title: 'Law Assignment Help for UK Students',
    eyebrow: 'OSCOLA Precision for UK Law',
    description: 'Our law team produces OSCOLA-aligned essays, case notes and dissertation chapters that meet the highest academic standards.',
    icon: Scale,
    visual: 'law',
    visualTag: 'Legal case note',
    visualKicker: 'IRAC case analysis',
    visualTitle: 'Move from issue to authority',
    visualLabels: ['Issue', 'Rule', 'Apply'],
    visualMarkers: ['I', 'II', 'III'],
    visualSummary: 'Legal reasoning',
    visualMetrics: [['Question', 'Defined'], ['Authority', 'Relevant'], ['Conclusion', 'Supported']],
    facts: [['Expert UK-qualified Writers', 'UK-qualified writers'], ['OSCOLA & UK Citation Standards', 'Citation standards']],
    topicsTitle: 'UK Law Topics and Specialisms',
    topics: [
      ['Contract Law', 'Drafting, case analysis and dispute resolution assignments focused on UK contract principles.', Gavel],
      ['Criminal Law', 'Case notes, offence analysis and sentencing reports with clear legal argumentation.', Scale],
      ['Tort Law', 'Negligence, duty of care and liability assignments with structured legal reasoning.', BookOpen],
      ['Equity & Trusts', 'Trust instruments, equitable remedies and fiduciary duties explained and applied.', BookOpen],
      ['Land Law', 'Property interests, conveyancing and statutory interpretation for land assignments.', FileText],
      ['Public Law', 'Judicial review, administrative law and constitutional analysis tailored to UK frameworks.', ShieldCheck],
    ],
    featureEyebrow: 'IRAC Method Mastery',
    featureTitle: 'IRAC-led legal analysis, executed with precision.',
    featureText: 'Our legal writers use the IRAC method to ensure every essay and case note offers a clear issue, rule, application and conclusion — perfect for UK law grading criteria.',
    featurePoints: ['OSCOLA-Ready Referencing', 'Footnotes, cases and statutes formatted to UK law school standards.', 'Judgement-Level Analysis', 'Critical reasoning and policy context woven into every submission.'],
    testimonialsTitle: 'What law students say',
    testimonials: [
      ['Excellent IRAC structure and precise citations. I achieved a first.', 'James L.', 'LLB, King’s College London'],
      ['The tort essay was thorough and the case law was applied well.', 'Amira H.', 'LLB, University of Bristol'],
      ['Professional and timely. Highly recommend for law seminars.', 'Robert M.', 'LLM, University of Edinburgh'],
    ],
    faqs: [
      ['What types of law assignments can I get help with?', 'Law coursework may include essays, case notes, problem questions and research projects in areas such as contract, criminal, tort, land and public law.'],
      ['What should I include in a law assignment brief?', 'Share the question, course level, deadline, word count and marking criteria. State the jurisdiction and include any required legislation, cases, reading or citation guidance.'],
      ['Which referencing style should I use for law coursework?', 'Use the citation style required by your law school or assignment. OSCOLA is common in UK legal study, but check your course guidance for the required format and pinpoint references.'],
    ],
  },
  nursing: {
    title: 'Nursing Assignment Help for UK Students',
    eyebrow: 'NMC & RCN Compliant Support',
    description: 'Our specialist nursing writers create evidence-based assignments aligned with the latest NMC standards and clinical practice.',
    icon: Stethoscope,
    visual: 'nursing',
    visualTag: 'Clinical pathway',
    visualKicker: 'Patient-centred care',
    visualTitle: 'Connect assessment to care',
    visualLabels: ['Assess', 'Plan', 'Review'],
    visualMarkers: ['A', 'P', 'R'],
    visualSummary: 'Care plan focus',
    visualMetrics: [['Patient needs', 'Prioritised'], ['Evidence', 'Applied'], ['Outcomes', 'Reviewed']],
    facts: [['4.9/5 Nursing Students', 'Trusted by UK students'], ['NMC-Linked Methodology', 'Evidence-based practice']],
    topicsTitle: 'Nursing Topics and Specialisms',
    topics: [
      ['Adult Nursing', 'Acute care, chronic disease management and patient-centred care plans.', Stethoscope],
      ['Mental Health Nursing', 'Therapeutic interventions, care planning and reflective practice essays.', Brain],
      ['Paediatric Nursing', 'Developmental assessments, family-centred care and clinical case studies.', ClipboardList],
      ['Midwifery', 'Maternity care modules, antenatal care and labour-management reports.', HeartPulse],
      ['Pharmacology', 'Drug dosage calculations, administration protocols and pharmacotherapy essays.', CheckCircle],
      ['Community Health', 'Population health, public health initiatives and community-based nursing projects.', Users],
    ],
    featureEyebrow: 'Clinical reasoning',
    featureTitle: 'Evidence-based nursing work, grounded in the care context.',
    featureText: 'Clinical reasoning and evidence-based practice built in.',
    featurePoints: ['Use the scenario and assessment criteria', 'Explain the rationale for interventions', 'Connect evidence with patient-centred care'],
    testimonialsTitle: 'What nursing students say',
    testimonials: [
      ['The reflective essay was spot on and my clinical placements feedback improved.', 'Sarah J.', 'King’s College London | 1st Year'],
      ['Excellent clinical calculation sections and care plan structure.', 'Mark T.', 'University of Manchester | 3rd Year'],
      ['Professional and evidence-focused. Helped with my dissertation.', 'Nina P.', 'University of Leeds | MSc Nursing'],
    ],
    faqs: [
      ['What types of nursing assignments can I get help with?', 'Nursing coursework can include clinical case studies, care planning, reflective writing, evidence reviews and public health topics. The exact format depends on your module and assessment brief.'],
      ['What should I include in a nursing assignment brief?', 'Provide the question, course level, deadline, word count and marking guidance. Include the relevant scenario and required professional or university guidance, but leave out information that could identify a patient.'],
      ['How should I use professional guidance in nursing coursework?', 'Follow the requirements of your module and use current guidance relevant to the topic. Explain how it applies to the case or question, and cite the guidance using your course’s referencing style.'],
    ],
  },
  psychology: {
    title: 'Psychology Assignment Help for UK Students',
    eyebrow: 'APA & BPS Aligned',
    description: 'Specialist psychology writers delivering coursework, essays and dissertations aligned to APA and BPS standards.',
    icon: Brain,
    visual: 'psychology',
    visualTag: 'Research map',
    visualKicker: 'Psychology study',
    visualTitle: 'Follow the evidence through a study',
    visualLabels: ['Question', 'Method', 'Insight'],
    visualMarkers: ['Q', 'M', 'I'],
    visualSummary: 'Research design',
    visualMetrics: [['Question', 'Focused'], ['Method', 'Justified'], ['Findings', 'Interpreted']],
    facts: [['Advanced Research Support', 'Including statistical analysis and qualitative coding'], ['Publication-Quality Writing', 'Clear methodology sections, APA 7 formatting and rigorous referencing']],
    topicsTitle: 'Psychology Topics and Specialisms',
    topics: [
      ['Clinical Psychology', 'Expert analysis of mental health assessments, diagnostic reports and treatment plans.', Users],
      ['Cognitive Psychology', 'Memory, attention and perception research summaries and essays.', Brain],
      ['Social Psychology', 'Group dynamics, prejudice, persuasion and interpersonal studies.', Users],
      ['Developmental Psychology', 'Lifespan development essays, observational study write-ups and case reports.', BookOpen],
      ['Forensic Psychology', 'Risk assessments, offender profiling and court-report style assignments.', ClipboardList],
      ['Biopsychology', 'Neural mechanisms, psychopharmacology and experimental write-ups.', BarChart3],
    ],
    featureEyebrow: 'Research and methodology',
    featureTitle: 'Psychology work that makes its methods and evidence clear.',
    featureText: 'Clear methodology sections, APA 7 formatting and rigorous referencing.',
    featurePoints: ['Statistical analysis', 'Qualitative coding', 'Research design', 'Evidence-led interpretation'],
    testimonialsTitle: 'What psychology students say',
    testimonials: [
      ['The statistical section was thorough and helped me pass my research methods module.', 'Emma W.', 'UCL | MSc Psychology'],
      ['Excellent literature review and APA formatting — top marks!', 'Luke M.', 'University of York | 2nd Year'],
      ['The experimental write-up was clear and publication ready.', 'Priya S.', 'University of Edinburgh | 3rd Year'],
    ],
    faqs: [
      ['What types of psychology assignments can I get help with?', 'Psychology coursework can include essays, literature reviews, research reports, case studies and quantitative or qualitative analysis. Your brief sets the subject area and expected format.'],
      ['What should I include in a psychology assignment brief?', 'Share the question, course level, deadline, marking criteria and word count. For research tasks, include the study design, data or materials and any ethics instructions supplied by your course.'],
      ['Which referencing style should I use for psychology work?', 'Follow the style named by your university or module. APA is common in psychology, but course requirements can vary, so check the assessment guidance before formatting citations.'],
    ],
  },
  economics: {
    title: 'Economics Assignment Help for UK Students',
    eyebrow: 'Domain-Specific Mastery',
    description: 'Navigate complex econometric models and policy analysis with PhD economists from top UK universities.',
    icon: TrendingUp,
    visual: 'economics',
    visualTag: 'Economic model',
    visualKicker: 'Market analysis',
    visualTitle: 'Show how the model explains change',
    visualLabels: ['Measure', 'Model', 'Explain'],
    visualMarkers: ['X', 'M', 'Y'],
    visualSummary: 'Model variables',
    visualMetrics: [['Inputs', 'Observed'], ['Relationship', 'Tested'], ['Impact', 'Explained']],
    facts: [['Data-Driven Analysis', 'Robust empirical work with reproducible code and clear tables'], ['Theory & Policy', 'Concise literature reviews, models and policy recommendations']],
    topicsTitle: 'Economics Topics and Specialisms',
    topics: [
      ['Macroeconomics', 'Policy analysis, growth models, GDP and fiscal-monetary interactions.', TrendingUp],
      ['Microeconomics', 'Consumer theory, game theory and market structure modelling.', BarChart3],
      ['Econometrics', 'Time-series, panel data and regression modelling with STATA/R support.', Activity],
      ['Behavioral Economics', 'Experimental design, behavioural modelling and survey analysis.', Users],
      ['International Trade', 'Trade policy, comparative advantage and applied trade models.', Globe2],
      ['Development Economics', 'Poverty measurement, program evaluation and policy impact studies.', BriefcaseBusiness],
    ],
    featureEyebrow: 'Theory and evidence',
    featureTitle: 'Precision & Policy: clear analysis for economics coursework.',
    featureText: 'Robust empirical work with reproducible code and clear tables.',
    featurePoints: ['Data interpretation', 'Econometric methods', 'Policy recommendations', 'Theory and models'],
    testimonialsTitle: 'Economics student experiences',
    testimonials: [
      ['The econometric tables and interpretation were excellent.', 'MSc Economics Student', 'London School of Economics'],
      ['Policy recommendations were grounded in recent literature and clear.', 'PhD Candidate', 'University of Oxford'],
      ['Provided replication scripts and clear Stata do-files.', 'Research Assistant', 'University of Manchester'],
    ],
    faqs: [
      ['What types of economics assignments can I get help with?', 'Economics coursework can include essays, policy analysis, econometrics, data interpretation and research projects in microeconomics, macroeconomics or related areas.'],
      ['What should I include in an economics assignment brief?', 'Provide the question, course level, deadline and marking criteria. For data based work, include the dataset, required method, software and any instructions about tables or interpretation.'],
      ['How should I reference data and sources in economics work?', 'Follow your module’s referencing guidance. Identify the source and date of datasets, and cite research and policy material where you use it to support an argument.'],
    ],
  },
  engineering: {
    title: 'Engineering Assignment Help for UK Students',
    eyebrow: 'UK Engineering Standards',
    description: 'From stress-strain analysis to complex thermodynamic simulations, our PhD-qualified engineers bridge the gap between theory and technical distinction.',
    icon: Wrench,
    visual: 'engineering',
    visualTag: 'Design review',
    visualKicker: 'Engineering method',
    visualTitle: 'Verify each step of the design',
    visualLabels: ['Specify', 'Calculate', 'Verify'],
    visualMarkers: ['D', 'C', 'V'],
    visualSummary: 'Design checks',
    visualMetrics: [['Constraints', 'Defined'], ['Model', 'Checked'], ['Result', 'Validated']],
    facts: [['FEA/CFD Specialists', 'Simulation-ready reports and validated models for submission'], ['Calculation Verification', 'Step-by-step checks and spreadsheets included']],
    topicsTitle: 'Engineering Topics and Specialisms',
    topics: [
      ['Mechanical Engineering', 'Thermodynamics, solid mechanics, and manufacturing process reports.', Wrench],
      ['Civil & Structural', 'Structural analysis, material specifications and design calculations.', BriefcaseBusiness],
      ['Electrical & Electronics', 'Circuits, control systems and power systems modelling and reports.', Activity],
      ['Aerospace Engineering', 'Aerodynamics, propulsion and flight dynamics assignments.', Globe2],
      ['Chemical Engineering', 'Process design, reaction engineering and safety case write-ups.', Activity],
      ['Sustainable Engineering', 'Lifecycle assessment, environmental impact and energy modelling.', GitBranch],
    ],
    featureEyebrow: 'Engineering analysis',
    featureTitle: 'A clear path from design assumptions to verified results.',
    featureText: 'Simulation-ready reports and validated models for submission.',
    featurePoints: ['Define assumptions and units', 'Show calculation steps', 'Check models against supplied criteria'],
    testimonialsTitle: 'What engineering students say',
    testimonials: [
      ['Our simulation results matched experimental data and helped secure my viva.', 'A. Student', 'Imperial College London'],
      ['Detailed FEA and well-documented procedures — exactly what I needed.', 'R. Kumar', 'University of Cambridge'],
      ['Provided validated spreadsheets and a clear step-by-step calculation guide.', 'E. Green', 'University of Leeds'],
    ],
    faqs: [
      ['What types of engineering assignments can I get help with?', 'The engineering subject area covers design work, calculations, feasibility studies, simulation reports and technical analysis across several disciplines. Check the page topics and provide the exact assignment question.'],
      ['What should I include in an engineering assignment brief?', 'Include the question, course level, deadline, marking criteria and required format. Add drawings, data, material properties, standards or software instructions that are part of the task.'],
      ['Which engineering standards and references should I use?', 'Follow the standard and citation requirements specified in your brief. If a standard is relevant, identify its jurisdiction and edition and check that it applies to the particular design or analysis.'],
    ],
  },
  computerScience: {
    title: 'Computer Science Assignment Help for UK Students',
    eyebrow: 'Academic Excellence in Tech',
    description: 'Bridge the gap between theory and execution. Get custom-coded solutions, rigorous documentation and architecture designs.',
    icon: Code2,
    visual: 'computer',
    visualTag: 'Code workspace',
    visualKicker: 'Software workflow',
    visualTitle: 'From a clear brief to tested code',
    visualLabels: ['Plan', 'Build', 'Test'],
    visualMarkers: ['>', '{}', '✓'],
    visualSummary: 'Implementation',
    visualMetrics: [['Structure', 'Modular'], ['Tests', 'Included'], ['Notes', 'Documented']],
    facts: [['Clean Code Standards', 'Well-documented, modular code with tests and README'], ['Plagiarism-Free Algorithms', 'Original implementations with academic referencing for theory sections']],
    topicsTitle: 'Computer Science Topics and Specialisms',
    topics: [
      ['Software Engineering', 'Object-oriented programming, design patterns, full-stack system architecture and code-based assignments.', Code2],
      ['Data Science', 'Statistical modelling, data analysis and visualization reports using Python and R.', BarChart3],
      ['Cyber Security', 'Penetration testing reports, security assessments and cryptography assignments.', ShieldCheck],
      ['Artificial Intelligence', 'Neural networks, ML models and experiment write-ups including TensorFlow/PyTorch code.', Brain],
      ['Database Management', 'SQL/NoSQL design, normalization and performance tuning reports.', Database],
      ['Web Development', 'RESTful APIs, frontend frameworks and deployment reports with production-ready code.', Code2],
    ],
    featureEyebrow: 'Build and explain',
    featureTitle: 'Technical work paired with clear academic documentation.',
    featureText: 'Well-documented, modular code with tests and README.',
    featurePoints: ['Modular implementation', 'Testing and documentation', 'Version and runtime details', 'Academic references for theory'],
    testimonialsTitle: 'What computing students say',
    testimonials: [
      ['The compiled project ran clean for my final year dissertation. Highly recommended.', 'A. Lewis', 'University of Manchester'],
      ['Struggled with my ML model until the team helped optimise my CNN and improved accuracy by 15%.', 'S. Merchant', 'University of Oxford'],
      ['Delivered an industrial-grade deployment and clear documentation.', 'M. Patel', 'Imperial College London'],
    ],
    faqs: [
      ['What types of computer science assignments can I get help with?', 'The subject area includes programming, software engineering, databases, web development, data science and computing research. Your assignment brief sets the specific topic and format.'],
      ['What should I include in a computer science assignment brief?', 'Share the task, course level, deadline and marking criteria. For practical work, include the required language, runtime, data, software constraints and expected output.'],
      ['How should I reference sources in computing coursework?', 'Use the style required by your course and cite sources for ideas, data, code or documentation that you use. Include version details for software or datasets when they are relevant to reproducing the work.'],
    ],
  },
};

function SubjectIllustration({ data, icon: Icon }) {
  const reduceMotion = useReducedMotion();
  const { visual, visualLabels, visualMarkers } = data;
  const panelStyles = {
    finance: 'bg-[#F4F7FB]',
    law: 'bg-[#FBF7EF]',
    nursing: 'bg-[#F1F8F7]',
    psychology: 'bg-[#F5F3FA]',
    economics: 'bg-[#F1F6F8]',
    engineering: 'bg-[#F2F6F9]',
    computer: 'bg-[#F2F5F7]',
  }[visual];
  const silhouetteStyles = {
    finance: ['rounded-[1.8rem]', 'rounded-[1.8rem]'],
    law: ['rounded-[0.5rem]', 'rounded-[0.5rem]'],
    nursing: ['rounded-[2.5rem_1rem_2.5rem_1rem]', 'rounded-[1rem_2.5rem_1rem_2.5rem]'],
    psychology: ['rounded-[50%_50%_1.7rem_1.7rem]', 'rounded-[1.7rem_1.7rem_50%_50%]'],
    economics: ['rounded-[50%]', 'rounded-[50%]'],
    engineering: ['rounded-[0.35rem]', 'rounded-[0.35rem]'],
    computer: ['rounded-[0.85rem]', 'rounded-[0.85rem]'],
  }[visual];

  return (
    <div role="img" aria-label={`${data.title} concept illustration`} className="relative mx-auto aspect-[0.78] w-full max-w-[34rem] sm:aspect-[0.9] lg:aspect-[1.08]">
      <div aria-hidden="true" className="absolute inset-[7%] rounded-[2rem] bg-gold/10" />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [-4, -2, -4], y: [0, 4, 0] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-[14%_8%_9%_17%] ${silhouetteStyles[0]} bg-gold shadow-card`}
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [3, 1, 3], y: [0, -4, 0] }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-[9%_15%_14%_9%] ${silhouetteStyles[1]} bg-navy-deep shadow-card`}
      />
      <div className="absolute inset-[4%_12%_7%_12%] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-card sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 sm:pb-3">
          <span className="inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:gap-2 sm:text-[10px]">
            <Icon size={15} className="text-gold-deep" aria-hidden="true" />
            {data.visualTag}
          </span>
          <span className="max-w-[42%] truncate rounded-full bg-gold/15 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.08em] text-navy sm:px-3 sm:text-[9px]">{data.eyebrow.split(' ').slice(0, 2).join(' ')}</span>
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-slate-500 sm:text-[9px]">{data.visualKicker}</p>
          <h2 className="mt-1 max-w-sm font-display text-sm font-semibold leading-snug text-navy sm:text-lg">{data.visualTitle}</h2>
        </div>
        <div className={`mt-3 flex h-12 items-center justify-center overflow-hidden rounded-xl px-4 sm:mt-4 sm:h-16 ${visual === 'law' ? 'bg-[#F3EBD9]' : 'bg-navy'}`}>
          {visual === 'finance' && (
            <div className="flex h-9 items-end gap-2" aria-hidden="true">
              {[35, 56, 43, 80, 64, 96].map((height, index) => (
                <motion.span key={index} animate={reduceMotion ? undefined : { scaleY: [0.92, 1, 0.92] }} transition={reduceMotion ? undefined : { duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }} style={{ height: `${height}%` }} className={`w-3 origin-bottom rounded-t ${index === 4 ? 'bg-gold' : 'bg-white/65'}`} />
              ))}
            </div>
          )}
          {visual === 'law' && (
            <svg viewBox="0 0 240 68" className="h-10 w-full max-w-[16rem]" fill="none" aria-hidden="true">
              <path d="M120 10v45M87 56h66M89 17h62M120 11l-38 8m38-8 38 8M82 20l-12 22h24L82 20Zm76 0-12 22h24l-12-22Z" stroke="#CFA049" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M64 43h36M140 43h36" stroke="white" strokeOpacity=".35" strokeWidth="2" />
            </svg>
          )}
          {visual === 'nursing' && (
            <svg viewBox="0 0 260 68" className="h-10 w-full max-w-[17rem]" fill="none" aria-hidden="true">
              <path d="M4 36h49l13-1 10-21 18 42 16-33 11 13h26l11-1 13-19 18 37 16-30 11 13h40" stroke="#CFA049" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 57h252" stroke="white" strokeOpacity=".18" strokeWidth="1" />
            </svg>
          )}
          {visual === 'psychology' && (
            <svg viewBox="0 0 240 68" className="h-10 w-full max-w-[16rem]" fill="none" aria-hidden="true">
              <path d="m48 42 46-22 48 30 49-29" stroke="white" strokeOpacity=".55" strokeWidth="2" />
              <circle cx="48" cy="42" r="8" fill="#CFA049" /><circle cx="94" cy="20" r="8" fill="white" />
              <circle cx="142" cy="50" r="8" fill="#CFA049" /><circle cx="191" cy="21" r="8" fill="white" />
            </svg>
          )}
          {visual === 'economics' && (
            <svg viewBox="0 0 240 68" className="h-10 w-full max-w-[16rem]" fill="none" aria-hidden="true">
              <path d="M30 7v50h178M45 49 178 14M47 13l130 36" stroke="white" strokeOpacity=".75" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="111" cy="32" r="5" fill="#CFA049" /><path d="M111 32v25" stroke="#CFA049" strokeDasharray="3 4" strokeWidth="2" />
            </svg>
          )}
          {visual === 'engineering' && (
            <svg viewBox="0 0 240 68" className="h-10 w-full max-w-[16rem]" fill="none" aria-hidden="true">
              <path d="M26 54h188M46 54V36l29-19 29 19v18m20 0V27l27-14 27 14v27" stroke="#CFA049" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38 60h164M75 13v47m49-29v31m47-45v45" stroke="white" strokeOpacity=".3" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          )}
          {visual === 'computer' && (
            <div className="w-full max-w-[17rem] font-mono text-[9px] leading-4 sm:text-xs" aria-hidden="true">
              <p className="text-gold"><span className="text-white/55">01</span> const brief = defineTask();</p>
              <p className="text-white/85"><span className="text-white/55">02</span> await analyse(brief);</p>
              <p className="text-gold"><span className="text-white/55">03</span> return clearSolution;</p>
            </div>
          )}
        </div>
        <div className="relative mt-4 px-1 sm:mt-5">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-4 h-px bg-gold/55 sm:top-5" />
          <div className="relative grid grid-cols-3 gap-2">
            {visualLabels.map((label, index) => (
              <div key={label} className="flex flex-col items-center text-center">
                <motion.span
                  animate={reduceMotion ? undefined : { y: index === 1 ? [0, -3, 0] : [0, 2, 0] }}
                  transition={reduceMotion ? undefined : { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border-[3px] border-white shadow-soft sm:h-11 sm:w-11 sm:border-4 ${index === 1 ? 'bg-gold text-navy' : 'bg-navy text-white'}`}
                >
                  <span className={`font-semibold ${visual === 'computer' ? 'font-mono text-sm' : 'text-xs'}`}>{visualMarkers[index]}</span>
                </motion.span>
                <span className="mt-1.5 text-[7px] font-semibold text-navy sm:mt-2 sm:text-[9px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`mt-4 rounded-xl p-2.5 sm:mt-5 sm:p-3 ${panelStyles}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[9px]">{data.visualSummary}</span>
            <span className="inline-flex items-center gap-1.5 text-[8px] font-semibold text-navy sm:text-[9px]">
              <CheckCircle size={13} className="text-gold-deep" aria-hidden="true" /> Subject-specific focus
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {data.visualMetrics.map(([label, value]) => (
              <div key={label} className="min-w-0 border-l-2 border-gold/70 pl-2">
                <p className="truncate text-[6px] font-medium text-slate-500 sm:text-[8px]">{label}</p>
                <p className="mt-0.5 truncate text-[7px] font-semibold text-navy sm:text-[9px]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubjectAssignmentPage({ page }) {
  const data = subjectPages[page];
  const reduceMotion = useReducedMotion();
  const HeroIcon = data.icon;

  return (
    <main id="main-content" className="overflow-hidden">
      <div className="relative bg-[var(--color-surface)]">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: data.title.split(' Assignment')[0] }]} />
        <section className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft">
              <HeroIcon size={15} className="text-gold-deep" aria-hidden="true" /> {data.eyebrow}
            </p>
            <h1 className="max-w-[44rem] font-display text-display-lg-mobile leading-[1.06] tracking-tight text-navy sm:text-display-lg">{data.title}</h1>
            <p className="mt-6 max-w-[39rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">{data.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openPopup'))}>Start your brief</Button>
              <a href="https://wa.me/447476950970" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 text-sm font-semibold text-navy shadow-soft transition hover:-translate-y-0.5 hover:border-gold hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <MessageCircle size={17} aria-hidden="true" /> Chat on WhatsApp <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {data.facts.map(([title, description]) => (
                <Card key={title} className="p-4 sm:p-5" tilt={false}>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]"><CheckCircle size={18} aria-hidden="true" /></span>
                  <h2 className="mt-3 font-display text-sm font-semibold text-navy">{title}</h2>
                  {title !== description && <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{description}</p>}
                </Card>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? undefined : { duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <SubjectIllustration data={data} icon={HeroIcon} />
          </motion.div>
        </section>
      </div>

      <Section className="bg-[var(--color-surface)]">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">{data.topicsTitle}</p>
          <h2 className="font-display text-headline-lg text-navy">Explore subject specialisms</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.topics.map(([title, description, Icon]) => (
            <Card key={title} className="h-full p-6 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-[var(--color-icon-accent)]"><Icon size={21} aria-hidden="true" /></span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="overflow-hidden rounded-[1.75rem] bg-navy text-white shadow-card">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-12 lg:p-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">{data.featureEyebrow}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">{data.featureTitle}</h2>
              <p className="mt-4 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">{data.featureText}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {data.featurePoints.map((point) => (
                <span key={point} className="flex min-h-14 items-start gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-xs leading-5 text-white/85 sm:text-sm">
                  <Check size={14} className="shrink-0 text-gold" aria-hidden="true" /> {point}
                </span>
              ))}
            </div>
          </div>
          {data.proof?.length > 0 && (
            <div className="grid gap-px border-t border-white/15 bg-white/15 sm:grid-cols-3">
              {data.proof.map(([title, description]) => (
                <div key={title} className="bg-navy px-6 py-5 sm:px-7">
                  <h3 className="font-display text-sm font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <PageContentSections page={page} variant="editorial" />

      <Section className="bg-[var(--color-surface)]">
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">Student experiences</p>
          <h2 className="font-display text-headline-lg text-navy">{data.testimonialsTitle}</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {data.testimonials.map(([quote, name, subtitle]) => (
            <Card key={name} className="p-6 sm:p-7" tilt={false}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-navy"><CheckCircle size={19} aria-hidden="true" /></span>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">“{quote}”</p>
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="font-semibold text-navy">{name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <FAQAccordion items={data.faqs.map(([question, answer]) => ({ question, answer }))} />
      <CTABanner />
    </main>
  );
}
