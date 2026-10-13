'use client';

import { Check } from 'lucide-react';
import Section from '../design-system/Section';

const pageContent = {
  home: [
    {
      title: 'Find support for the assignment in front of you',
      body: 'University assignments take different forms. The first step is to identify what the question asks you to demonstrate, then choose a structure and evidence that fit.',
      points: ['Essays and critical discussions', 'Reports, case studies and reflective writing', 'Research projects and dissertation chapters'],
    },
    {
      title: 'Make sense of UK university requirements',
      body: 'Assessment briefs, learning outcomes and marking criteria explain how your work will be judged. Use them as a practical checklist while planning and reviewing your work.',
      points: ['Identify the command words in the question', 'Check the required referencing style and word count', 'Use evidence to support analysis, not just description'],
    },
    {
      title: 'Prepare a clear assignment brief',
      body: 'Sharing the relevant instructions at the start helps define the subject, level and expected format. Include the information that is specific to your module.',
      points: ['The assignment question and module level', 'Deadline, word count and marking guidance', 'Required sources, data, software or citation style'],
    },
  ],
  services: [
    {
      title: 'Choose the subject area that fits your brief',
      body: 'The subject directory brings related areas together so you can find support relevant to your course. Each subject page describes the topics and assignment formats covered.',
      points: ['Business, management and accounting', 'Law, nursing, psychology and economics', 'Finance, engineering and computer science'],
    },
    {
      title: 'Different assignment formats need different approaches',
      body: 'An essay develops an argument, while a report may need findings and recommendations. A case study applies concepts to a defined situation, and research work explains its method and evidence.',
      points: ['Essays, coursework and written reports', 'Case studies and reflective assignments', 'Research, data analysis and dissertation work'],
    },
    {
      title: 'What to have ready before starting',
      body: 'A useful brief explains both the task and its academic context. Check your module guidance and provide the details that will shape the work.',
      points: ['Question, learning outcomes and marking criteria', 'Word count, deadline and required structure', 'Referencing rules, source material and any data'],
    },
  ],
  business: [
    {
      title: 'Business assignments connect theory with decisions',
      body: 'Strong business analysis explains how a concept applies to a particular organisation, market or management problem. Define the context before selecting a framework.',
      points: ['Use SWOT or PESTLE only when relevant to the question', 'Explain what the evidence means for the organisation', 'Support recommendations with findings and realistic constraints'],
    },
    {
      title: 'Common management coursework formats',
      body: 'Business modules assess a range of skills, from evaluating strategy to interpreting organisational evidence. The required format determines how to present your reasoning.',
      points: ['Strategic and operations case studies', 'Marketing, leadership and human resource analysis', 'Business reports with evidence led recommendations'],
    },
    {
      title: 'Shape a focused business brief',
      body: 'A focused brief names the organisation or case, the management issue and the framework or evidence required. This helps keep the analysis relevant rather than broad.',
      points: ['Specify the sector, organisation or case context', 'Include required models, data and course criteria', 'State whether recommendations or evaluation are expected'],
    },
  ],
  accounting: [
    {
      title: 'Accounting work needs traceable reasoning',
      body: 'Readers should be able to follow how figures were prepared and what they indicate. Show assumptions clearly and connect calculations to the question being answered.',
      points: ['Set out formulas, units and relevant periods', 'Explain the meaning of ratios and variances', 'Reconcile calculations with the source information'],
    },
    {
      title: 'Financial and management accounting topics',
      body: 'Accounting modules cover both reporting information and its use in decisions. The right approach depends on the task and the reporting framework named in the brief.',
      points: ['Financial statements and reporting frameworks', 'Budgeting, costing and variance analysis', 'Audit, taxation and internal control topics'],
    },
    {
      title: 'Details that help scope accounting coursework',
      body: 'Provide the complete question and any schedules or data supplied by your course. State which rules, period and output the assessment expects.',
      points: ['Reporting period and applicable framework', 'Source data, assumptions and required calculations', 'Instructions for tables, workings and references'],
    },
  ],
  finance: [
    {
      title: 'Explain the assumptions behind financial models',
      body: 'A model is useful only when its inputs and limitations are clear. Explain the period, data and assumptions so a reader can understand how the result was reached.',
      points: ['Identify inputs, units and time horizon', 'Show how the method relates to the question', 'Discuss sensitivity and limitations of the result'],
    },
    {
      title: 'Finance topics from valuation to risk',
      body: 'Finance coursework may combine numerical methods with written interpretation. Present the calculation and the reasoning together so results are not left unexplained.',
      points: ['Corporate finance and business valuation', 'Investment analysis and portfolio decisions', 'Risk, derivatives and financial markets'],
    },
    {
      title: 'Set out the data and method you need',
      body: 'A clear brief identifies the model or financial question, the relevant data and how results should be presented. Include spreadsheet requirements when they form part of the assessment.',
      points: ['Dataset, period and source of figures', 'Required model, method or comparison', 'Expected tables, charts and written interpretation'],
    },
  ],
  law: [
    {
      title: 'Build a clear legal argument',
      body: 'Legal writing needs a precise issue, relevant authority and careful application to the facts. Keep the conclusion tied to the reasoning rather than making a claim without support.',
      points: ['Identify the legal issue raised by the question', 'Use current legislation and relevant case law', 'Apply authority to the facts and address counterarguments'],
    },
    {
      title: 'Law coursework depends on jurisdiction',
      body: 'The applicable law can differ across the UK. Confirm which jurisdiction the question concerns before selecting legislation, cases or legal commentary.',
      points: ['England and Wales, Scotland or Northern Ireland', 'Public, criminal, contract, tort or land law', 'Legal essays, case notes and problem questions'],
    },
    {
      title: 'Check citation and assessment instructions',
      body: 'Follow the citation and formatting requirements set by your law school. OSCOLA is common in UK legal study, but the assignment brief remains the guide for your work.',
      points: ['Required citation style and edition guidance', 'Pinpoint references for cases and legislation', 'Word limit, question wording and marking criteria'],
    },
  ],
  nursing: [
    {
      title: 'Link nursing theory to the clinical scenario',
      body: 'A nursing assignment should make the connection between evidence, the person’s needs and the chosen intervention explicit. Use the scenario and assessment criteria to keep the discussion focused.',
      points: ['Prioritise needs using the information provided', 'Explain the rationale for proposed interventions', 'Describe how outcomes could be evaluated'],
    },
    {
      title: 'Common nursing coursework formats',
      body: 'Nursing courses assess clinical reasoning in several ways. Each format has a different emphasis, from reflective learning to evidence based discussion of care.',
      points: ['Care planning and clinical case studies', 'Reflective practice and professional development', 'Evidence reviews and public health topics'],
    },
    {
      title: 'Protect confidentiality in academic case work',
      body: 'Patient information must be handled according to placement and university rules. Exclude identifying details and check local guidance before using real case material.',
      points: ['Remove details that could identify an individual', 'Use the scenario information permitted by your course', 'Refer to current professional and institutional guidance'],
    },
  ],
  psychology: [
    {
      title: 'Connect psychological theory to evidence',
      body: 'Psychology writing is strongest when concepts are explained and then evaluated against research. Compare evidence and methods rather than treating a theory as settled fact.',
      points: ['Define the concept relevant to the question', 'Compare findings across suitable studies', 'Discuss method limits and alternative explanations'],
    },
    {
      title: 'Research methods and analysis',
      body: 'The design, measures and analysis should fit the research question. Explain why a method is appropriate and report findings with enough context to interpret them.',
      points: ['Quantitative, qualitative and mixed methods', 'Sampling, measures and study design', 'Statistical results and cautious interpretation'],
    },
    {
      title: 'Ethics belongs in the research plan',
      body: 'Consider consent, privacy, potential harm and data handling in light of the proposed design. Follow your institution’s ethics process before collecting or using research data.',
      points: ['Explain how participants are informed', 'Consider confidentiality and withdrawal', 'Check course and ethics committee requirements'],
    },
  ],
  computerScience: [
    {
      title: 'Make software requirements testable',
      body: 'A clear programming task describes expected behaviour and constraints. Translate the brief into examples or tests so implementation choices can be evaluated.',
      points: ['Specify inputs, outputs and edge cases', 'List language, runtime and dependencies', 'Separate functional requirements from design choices'],
    },
    {
      title: 'Document how to run and assess a project',
      body: 'Good technical documentation helps another person understand the environment and reproduce the result. Keep setup steps and test instructions aligned with the submitted code.',
      points: ['Record dependency and version requirements', 'Explain configuration and data inputs', 'Include tests and expected outcomes'],
    },
    {
      title: 'Topics across computing coursework',
      body: 'Computer science assignments can require implementation, analysis or both. Identify whether the assessment prioritises a working system, a design rationale or evaluation.',
      points: ['Software engineering and database design', 'Artificial intelligence and data science', 'Cyber security and web development'],
    },
  ],
  engineering: [
    {
      title: 'Show assumptions and units in engineering work',
      body: 'Engineering calculations need enough detail to be checked. State the conditions, units and material properties used, then show how the method leads to the result.',
      points: ['Define loads, boundary conditions and geometry', 'Use consistent units and documented assumptions', 'Compare results with an appropriate check'],
    },
    {
      title: 'Report simulation methods clearly',
      body: 'A simulation result depends on the model setup. Describe the mesh, solver settings and boundary conditions, and explain how these decisions affect interpretation.',
      points: ['Identify software and relevant version', 'Describe mesh and model inputs', 'Discuss verification, validation and limitations'],
    },
    {
      title: 'Engineering disciplines and report types',
      body: 'Engineering coursework may focus on design, calculations, testing or evaluation. Match the report structure to the discipline and the specific task.',
      points: ['Mechanical, civil and structural engineering', 'Electrical, aerospace and chemical engineering', 'Design reports, feasibility studies and analysis'],
    },
  ],
  economics: [
    {
      title: 'Choose an economic method that fits the question',
      body: 'Start from the outcome and data structure before choosing a model. Explain assumptions and limitations so readers can judge what the evidence supports.',
      points: ['Distinguish association from causal evidence', 'Describe variables and the source of data', 'Explain uncertainty and model limitations'],
    },
    {
      title: 'Interpret results in context',
      body: 'Economic results need interpretation in terms of the question, units and relevant context. A coefficient or test statistic on its own does not explain the practical meaning.',
      points: ['Explain direction and size of estimated effects', 'Report uncertainty and relevant comparisons', 'Avoid claims that go beyond the research design'],
    },
    {
      title: 'Economics topics and evidence',
      body: 'Economics coursework spans theory, data analysis and policy. State whether your brief calls for a theoretical argument, empirical assessment or evaluation of policy choices.',
      points: ['Microeconomics, macroeconomics and trade', 'Econometrics and development economics', 'Policy analysis supported by relevant evidence'],
    },
  ],
  about: [
    {
      title: 'Academic support shaped around the brief',
      body: 'Every module sets its own expectations. Our process starts with understanding the task, course level and assessment requirements before work is scoped.',
      points: ['Read the question and marking guidance', 'Identify the subject and assignment format', 'Use the supplied materials to define the scope'],
    },
    {
      title: 'Subject knowledge across the directory',
      body: 'The site brings together support for several university subject areas. The subject pages outline their topic coverage and common assessment types.',
      points: ['Business, accounting and finance', 'Law, nursing, psychology and economics', 'Engineering and computer science'],
    },
    {
      title: 'Clear communication and academic care',
      body: 'Useful academic support should be clear about the task, the information needed and the intended output. We aim to make those expectations understandable from the start.',
      points: ['A defined brief and agreed requirements', 'Careful use of sources and referencing', 'Readable work organised around the task'],
    },
  ],
  contact: [
    {
      title: 'What to include in your enquiry',
      body: 'A few assignment details help us understand the question and route your enquiry appropriately. Avoid including personal or confidential information that is not needed.',
      points: ['Subject and course level', 'Assignment question and deadline', 'A way to reply and a short description of your query'],
    },
    {
      title: 'Questions about a current assignment',
      body: 'If your question is about an existing brief, include the relevant instructions and explain what information you need. This makes it easier to understand the context of your enquiry.',
      points: ['Attach or summarise the task instructions', 'Mention the required referencing style', 'Describe any specific point that needs clarification'],
    },
    {
      title: 'Choose the right contact option',
      body: 'Use the form on this page for a written enquiry, or use the listed phone and email details if those suit your question better. Please allow time for a response.',
      points: ['Use the form for assignment and service queries', 'Include accurate contact details', 'Do not send payment card details or passwords'],
    },
  ],
  blog: [
    {
      title: 'Use study advice that fits your course',
      body: 'Academic expectations vary by subject and institution. Treat general advice as a starting point, then check it against your module handbook and tutor instructions.',
      points: ['Start with the task wording and learning outcomes', 'Check local rules for format and referencing', 'Use your library for course relevant sources'],
    },
    {
      title: 'Build a stronger academic argument',
      body: 'A clear argument answers the question and uses evidence to justify its reasoning. Organise paragraphs so each point contributes to the overall response.',
      points: ['Make a focused claim in each section', 'Compare evidence rather than listing sources', 'Use the conclusion to answer the question directly'],
    },
    {
      title: 'Browse topics for your next study task',
      body: 'Explore articles by category or search for a subject. The resources are intended to support planning and understanding, alongside your course guidance.',
      points: ['Essay planning and academic writing', 'Study strategies and referencing', 'Assignment guidance by subject area'],
    },
  ],
};

export function PageContentSections({ page, variant = 'default' }) {
  const sections = pageContent[page];
  if (!sections) return null;

  if (variant === 'editorial') {
    const isBusiness = page === 'business';
    const editorialLabels = {
      finance: ['Finance assignment guide', ['Model', 'Analyse', 'Explain'], 'Work through a finance assignment'],
      law: ['Law assignment guide', ['Identify', 'Apply', 'Conclude'], 'Build a clear legal assignment'],
      nursing: ['Nursing assignment guide', ['Assess', 'Plan care', 'Evaluate'], 'Connect evidence with nursing practice'],
      psychology: ['Psychology assignment guide', ['Research', 'Analyse', 'Interpret'], 'Develop a psychology assignment'],
      economics: ['Economics assignment guide', ['Frame', 'Analyse', 'Interpret'], 'Build an evidence-led economics assignment'],
      engineering: ['Engineering assignment guide', ['Design', 'Calculate', 'Verify'], 'Work through an engineering assignment'],
      computerScience: ['Computer science assignment guide', ['Plan', 'Implement', 'Test'], 'Develop a clear computing assignment'],
      contact: ['Contact guide', ['Share', 'Connect', 'Continue'], 'Make it easier for us to help'],
    };
    const selected = editorialLabels[page];
    const sectionLabel = isBusiness ? 'Business management guide' : selected?.[0] || 'Accounting assignment guide';
    const stageLabels = isBusiness
      ? ['Frameworks', 'Assignment formats', 'The brief']
      : selected?.[1] || ['Trace the figures', 'Understand the topic', 'Define the scope'];
    const sectionTitle = isBusiness
      ? 'Build a focused business assignment'
      : selected?.[2] || 'Work through an accounting assignment';

    return (
      <Section className="bg-[var(--color-surface)]">
        <div className="mx-auto mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">{sectionLabel}</p>
          <h2 className="font-display text-headline-lg text-navy">
            {sectionTitle}
          </h2>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute left-[16.5%] right-[16.5%] top-6 hidden h-px bg-gold/55 lg:block" />
          <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
            {sections.map((section, index) => (
              <li key={section.title} className="relative">
                <article className="h-full rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-soft transition-shadow hover:shadow-card sm:p-6">
                  <div className="relative z-10 mb-5 flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-[var(--color-surface)] bg-navy font-display text-sm font-semibold text-white shadow-soft">
                      {`0${index + 1}`}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-deep">{stageLabels[index]}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-navy">{section.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{section.body}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-[var(--color-border)] pt-4">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs leading-5 text-navy sm:text-sm">
                        <Check size={15} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    );
  }

  return sections.map((section, index) => (
    <section
      key={section.title}
      className={index % 2 === 0 ? 'bg-white py-16 md:py-20' : 'bg-primary-50 py-16 md:py-20'}
    >
      <div className="mx-auto max-w-7xl px-margin-mobile md:px-margin-desktop">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <h2 className="font-display text-headline-lg text-primary-900">{section.title}</h2>
          <div>
            <p className="text-body-lg leading-relaxed text-primary-700">{section.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {section.points.map((point) => (
                <li key={point} className="rounded-2xl border border-primary-100 bg-white p-4 text-body-sm leading-relaxed text-primary-800">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  ));
}
