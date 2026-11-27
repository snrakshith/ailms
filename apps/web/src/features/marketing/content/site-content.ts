/**
 * AI Quest public marketing source of truth.
 * Edit this file to update the public homepage, pricing, FAQ and blog pages.
 * No API or CMS is used to render the public marketing experience.
 * Billing remains authoritative in the API; keep the advertised reference price
 * aligned with GENAI_PASS_PRICE_PAISE (or omit it if campaigns vary).
 */
export type BlogArticle = {
  slug: string;
  category: string;
  title: string;
  description: string;
  published: string;
  minutes: number;
  author: string;
  sections: { heading: string; paragraphs: string[] }[];
  sources?: { label: string; url: string }[];
};
export const siteContent = {
  alert: {
    enabled: true,
    id: 'beta-2026-11',
    tone: 'info',
    label: 'Beta update',
    message: 'AI Quest is in beta. New lessons and learning tools are added regularly.',
    href: '/blog',
  },
  status: {
    title: 'Service status',
    description: 'See current availability checks and access independent incident reports.',
  },
  brand: {
    name: 'aiquest',
    tagline: 'From developer to AI builder.',
    mark: 'aq',
    beta: 'PUBLIC BETA',
    copyright: 'AI Quest · Made for curious developers.',
  },
  nav: [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Learning paths', href: '/#paths' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Journal', href: '/blog' },
    { label: 'FAQs', href: '/faq' },
  ],
  hero: {
    eyebrow: 'THE PRACTICAL WAY INTO AI',
    title: 'You know how to build software.',
    accent: 'Now learn to build with AI.',
    description:
      'The interactive learning space for developers moving into machine learning and generative AI. Short lessons, code experiments, feedback, and projects that mean something.',
    primary: 'Start learning for free',
    secondary: 'Explore the curriculum',
    note: 'Explore AI Foundations and Machine Learning for free. No card required.',
  },
  trust: {
    eyebrow: 'DESIGNED FOR THE DEVELOPER MINDSET',
    items: [
      'Think in systems, not buzzwords',
      'Practice concepts as you learn',
      'Build verifiable AI skills',
      'Keep your existing stack',
    ],
  },
  steps: {
    eyebrow: 'A BETTER WAY TO LEARN',
    title: 'Less watching. More doing.',
    description: 'A thoughtful path from the skills you already have to the skills you want next.',
    items: [
      {
        number: '01',
        title: 'Start where you are',
        description:
          'Tell us about your developer experience. We suggest a starting point without forcing you through material you already understand.',
      },
      {
        number: '02',
        title: 'Learn in small steps',
        description:
          'Work through focused lessons, visual explanations, and real engineering examples instead of endless videos.',
      },
      {
        number: '03',
        title: 'Practice and prove it',
        description:
          'Experiment, answer scenario-based questions, collect mastery milestones, and apply your learning to projects.',
      },
    ],
  },
  paths: {
    eyebrow: 'YOUR LEARNING MAP',
    title: 'A complete AI engineering curriculum.',
    description:
      'Six ordered tracks take you from developer tooling through production AI engineering.',
    items: [
      {
        number: '01',
        title: 'Foundations',
        type: 'Track 1',
        duration: '3 weeks',
        description: 'Build Python, mathematics and developer-tooling fundamentals for AI work.',
        topics: ['Python tooling', 'Mathematics for AI', 'Reproducible practice'],
        icon: 'foundation',
      },
      {
        number: '02',
        title: 'Machine Learning',
        type: 'Track 2',
        duration: '7 weeks',
        description: 'Learn the data, modeling, evaluation and feature-engineering lifecycle.',
        topics: ['Data preparation', 'Supervised learning', 'Model evaluation'],
        icon: 'ml',
      },
      {
        number: '03',
        title: 'Deep Learning',
        type: 'Track 3',
        duration: '6 weeks',
        description: 'Develop neural-network foundations and dependable training workflows.',
        topics: ['Neural networks', 'Training systems', 'Deep learning practice'],
        icon: 'deep-learning',
      },
      {
        number: '04',
        title: 'Computer Vision',
        type: 'Track 4',
        duration: '5 weeks',
        description: 'Work with images, video and multimodal perception systems.',
        topics: ['Image models', 'Visual data', 'Vision evaluation'],
        icon: 'vision',
      },
      {
        number: '05',
        title: 'Generative AI & Agent Engineering',
        type: 'Track 5',
        duration: '12 weeks',
        description: 'Build LLM, retrieval, agent and evaluation capabilities.',
        topics: ['LLMs', 'RAG', 'Agents and evaluation'],
        icon: 'genai',
      },
      {
        number: '06',
        title: 'Production AI Engineering',
        type: 'Track 6',
        duration: '3 weeks',
        description: 'Ship AI systems with reliability, governance and operations in mind.',
        topics: ['MLOps', 'Reliability', 'Responsible delivery'],
        icon: 'production',
      },
    ],
  },
  benefits: {
    eyebrow: 'BUILT AROUND UNDERSTANDING',
    title: 'Not just another course catalog.',
    items: [
      {
        title: 'Short, purposeful lessons',
        description:
          'Make progress in ten focused minutes, with clear objectives and useful feedback.',
      },
      {
        title: 'Interactive experiments',
        description:
          'See ideas move. Explore learning rates, vectors and model behavior through guided labs.',
      },
      {
        title: 'Real learning progress',
        description:
          'Track completed lessons, review the concepts you forget, and earn XP for mastery.',
      },
      {
        title: 'A path toward real projects',
        description: 'Move from concepts to AI engineering exercises and capstone submissions.',
      },
    ],
  },
  preview: {
    eyebrow: 'START THE CURRICULUM',
    title: 'Python environments and notebooks',
    description:
      'Create a reproducible Python workflow with isolated environments, notebooks and a terminal-first development practice.',
    duration: '75-minute lesson',
    topics: ['Developer tooling', 'Reproducible environments', 'Practice exercise'],
    cta: 'Start Foundations',
  },
  pricing: {
    eyebrow: 'SIMPLE, TRANSPARENT PRICING',
    title: 'Start free. Go deeper when you’re ready.',
    description:
      'Explore the essentials without paying. Unlock the advanced Generative AI track only when it fits your goals.',
    footnote:
      'The learning pass is a one-time purchase, not a subscription. Listed price is an illustrative launch offer and is confirmed by the server before checkout.',
    plans: [
      {
        id: 'free',
        name: 'Explorer',
        price: '₹0',
        period: 'Forever free',
        description: 'Get comfortable with the language and methods of AI.',
        features: [
          'AI Foundations learning path',
          'Machine Learning learning path',
          'Lessons and knowledge checks',
          'Learning progress and XP',
          'Core learning experiments',
        ],
        cta: 'Create a free account',
        to: '/register',
        featured: false,
      },
      {
        id: 'genai',
        name: 'GenAI Learning Pass',
        price: '₹499',
        period: 'One-time · INR',
        description: 'Build on the fundamentals with modern LLM application skills.',
        features: [
          'Everything in Explorer',
          'Generative AI engineering path',
          'Hands-on guided learning',
          'Advanced assessment practice',
          'Progress and milestones',
        ],
        cta: 'Explore the learning pass',
        to: '/billing',
        featured: true,
      },
    ],
  },
  faqs: [
    {
      question: 'Do I need to know Python before I start?',
      answer:
        'No. AI Foundations starts from a developer-friendly mental model. Basic programming familiarity will help, and you can progress into Python practice as you learn.',
    },
    {
      question: 'Is there really a free path?',
      answer:
        'Yes. AI Foundations and Machine Learning are free in the current product. Create an account to save your progress and access the lessons.',
    },
    {
      question: 'How is AI Quest different from a video course?',
      answer:
        'The focus is on short explanations, interactive experiments, practice questions, spaced revision and practical projects instead of passive watching.',
    },
    {
      question: 'Does the Generative AI pass renew automatically?',
      answer:
        'No. The current pass is a one-time purchase, not a recurring subscription. The exact price and enabled checkout status are shown on your account billing page.',
    },
    {
      question: 'Can I use AI Quest on my phone?',
      answer:
        'The React web app is responsive. The business logic and API contracts are written as reusable TypeScript packages for a future React Native app; a native mobile app has not been released.',
    },
    {
      question: 'Do you offer job placement or guaranteed outcomes?',
      answer:
        'No. AI Quest is a skills learning product. We do not guarantee employment, salary changes, certifications, or a specific career result.',
    },
    {
      question: 'How do I get help with my account or billing?',
      answer:
        'Account and learning preferences are available after login. For payment or account support, contact the support channel published by the project operator before launch.',
    },
  ],
  journal: {
    eyebrow: 'FIELD NOTES',
    title: 'Thinking clearly about AI.',
    description:
      'Practical perspectives on learning, software engineering and a fast-changing AI landscape.',
    newsletterNote:
      'Articles are published as static content in this React app. There is no newsletter signup or backend CMS in this release.',
  },
  footer: {
    description:
      'A calmer, more practical way for software developers to learn AI, ML and generative AI.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Learning paths', href: '/#paths' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Learn',
        links: [
          { label: 'Journal', href: '/blog' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Start free', href: '/register' },
        ],
      },
      {
        title: 'Account',
        links: [
          { label: 'Sign in', href: '/login' },
          { label: 'Dashboard', href: '/app' },
          { label: 'Learning pass', href: '/billing' },
          { label: 'Status', href: '/status' },
          { label: 'Referrals', href: '/referrals' },
        ],
      },
    ],
    disclaimer: 'Beta product · Curriculum and features continue to evolve.',
  },
  articles: [
    {
      slug: 'why-developers-should-learn-ai',
      category: 'Career & learning',
      title: 'Why software developers should learn AI—without starting over',
      description:
        'Your software engineering background is an advantage. Here is how to make the transition practical.',
      published: '2026-11-23',
      minutes: 6,
      author: 'AI Quest Editorial',
      sections: [
        {
          heading: 'You already have the difficult habits',
          paragraphs: [
            'Software development teaches you how to turn ambiguous problems into reliable systems. That habit matters in AI: models still need inputs, outputs, tests, deployment, monitoring and ownership.',
            'Transitioning into AI is not the same as discarding your engineering experience. It is about adding a new way to build behavior—learning from examples—to the software tools you already understand.',
          ],
        },
        {
          heading: 'Start with the model lifecycle',
          paragraphs: [
            'Before jumping into frameworks, understand how data becomes training examples, why we separate train and test sets, and what a model produces at inference time. Then learn the difference between evaluating a model offline and operating it in a real product.',
            'This vocabulary makes tutorials more useful. It also helps you ask better questions whenever an AI-powered feature behaves unexpectedly.',
          ],
        },
        {
          heading: 'Practice beats memorization',
          paragraphs: [
            'Reading about gradient descent or embeddings is useful. Changing a learning rate and seeing loss move, or comparing text embeddings side by side, creates intuition. That intuition matters when your first model behaves differently from what you expected.',
            'Build one small project at a time: a classification pipeline, a document-search prototype, or a carefully evaluated chatbot. Keep notes about your decisions and failure cases.',
          ],
        },
        {
          heading: 'A practical next step',
          paragraphs: [
            'Begin with the AI Foundations track. Complete an exercise, make a prediction before running it, and compare the result with your expectation. That short loop is the beginning of sound AI engineering.',
          ],
        },
      ],
    },
    {
      slug: 'ai-job-market-2026',
      category: 'Industry outlook',
      title: 'The AI job market in 2026: what developers should pay attention to',
      description:
        'AI skills are attracting attention, but reliable engineering and critical thinking remain essential.',
      published: '2026-11-23',
      minutes: 7,
      author: 'AI Quest Editorial',
      sections: [
        {
          heading: 'Adoption is growing, but skill is more than tool familiarity',
          paragraphs: [
            'Stanford’s 2026 AI Index documents rapid organizational AI adoption and expanding investment. The World Economic Forum’s Future of Jobs analysis also identifies AI and big data among skills expected to increase in importance. These are broad indicators, not a promise of employment for any individual.',
            'There is a meaningful distinction between being able to prompt a model and being able to ship a useful, monitored AI application. Software developers can bring reliability, evaluation and product thinking to this gap.',
          ],
        },
        {
          heading: 'What good AI engineers actually do',
          paragraphs: [
            'They design data flows, select and evaluate approaches, write tests, protect private information, manage model costs, and observe behavior after deployment. In many cases, traditional system design is as important as understanding the model.',
            'A portfolio with a small, reproducible project and a clear evaluation strategy often demonstrates more practical understanding than a collection of certificates alone.',
          ],
        },
        {
          heading: 'Avoid chasing every new tool',
          paragraphs: [
            'AI tools change quickly. Focus first on durable mental models: supervised learning, validation, embeddings, probabilistic output, error analysis and system reliability. Then learn the libraries that implement those ideas.',
            'Treat claims about salaries, headcount and hiring trends with care. Conditions differ by geography, company, specialization and experience, and change rapidly.',
          ],
        },
        {
          heading: 'Where to begin',
          paragraphs: [
            'Pick one application type you care about. Trace the problem from input data through a measurable outcome, then build a small version and write down where it fails. Repeat.',
          ],
        },
      ],
      sources: [
        {
          label: 'Stanford HAI — AI Index 2026',
          url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
        },
        {
          label: 'World Economic Forum — Future of Jobs 2025: Skills Outlook',
          url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/3-skills-outlook',
        },
      ],
    },
    {
      slug: 'from-react-to-rag',
      category: 'Developer guide',
      title: 'From React developer to RAG builder: a realistic learning route',
      description:
        'A familiar web stack can help you learn embeddings, retrieval and grounded generation step by step.',
      published: '2026-11-23',
      minutes: 5,
      author: 'AI Quest Editorial',
      sections: [
        {
          heading: 'Keep the frontend skills you already have',
          paragraphs: [
            'A useful AI app still needs clear forms, loading states, error boundaries, accessibility and thoughtful user feedback. React is a good place to practice those skills while you learn the AI side of the stack.',
          ],
        },
        {
          heading: 'Learn retrieval before building agents',
          paragraphs: [
            'Start with a handful of documents. Split them into useful passages, create embeddings and retrieve the relevant passages for a query. Measure whether retrieval returns the material needed to answer correctly.',
            'Next, add a language model and require the answer to use retrieved context. Record cases where retrieval misses relevant passages or the model invents unsupported claims.',
          ],
        },
        {
          heading: 'Production concerns arrive quickly',
          paragraphs: [
            'Think about latency, prompt injection, data permissions, cost limits and evaluation. An impressive demo is not the same as a dependable product. Each of those concerns is a familiar engineering problem with an AI-specific twist.',
          ],
        },
        {
          heading: 'Build deliberately',
          paragraphs: [
            'Implement one working interaction at a time. Prefer a narrow, well-evaluated use case over a complicated multi-agent architecture before you understand the basics.',
          ],
        },
      ],
    },
  ] as BlogArticle[],
};
export const articleBySlug = (slug: string) =>
  siteContent.articles.find((article) => article.slug === slug);
