import { Expert, Category, Project, Testimonial } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'ai-data',
    name: 'AI & Data Science',
    iconName: 'Cpu',
    count: 142,
    description: 'Machine learning engineers, LLM specialists, data architects, and AI researchers.'
  },
  {
    id: 'engineering',
    name: 'Software Engineering',
    iconName: 'Code',
    count: 310,
    description: 'Full-stack developers, cloud architects, mobile devs, and DevOps experts.'
  },
  {
    id: 'product-design',
    name: 'Product & UX Design',
    iconName: 'Palette',
    count: 124,
    description: 'Product designers, UX researchers, brand strategists, and design systems leads.'
  },
  {
    id: 'growth-marketing',
    name: 'Growth & Marketing',
    iconName: 'TrendingUp',
    count: 165,
    description: 'Performance marketers, SEO directors, growth hackers, and content leads.'
  }
];

export const EXPERTS: Expert[] = [
  {
    id: 'exp-1',
    name: 'Dr. Alex Vance',
    title: 'Principal AI & Machine Learning Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 4.98,
    reviewsCount: 48,
    hourlyRate: 2950,
    category: 'AI & Data Science',
    skills: ['PyTorch', 'LLMs', 'RAG Systems', 'TensorFlow', 'Python', 'MLOps'],
    bio: 'Former Lead AI Researcher at DeepTech Labs with 10+ years scaling enterprise generative AI models and custom retrieval pipelines. Helped 25+ YC startups build production-grade LLM agents.',
    experience: '12 Years Experience • Ex-Google AI, Stanford PhD',
    location: 'San Francisco, CA (Remote)',
    availability: 'Available Now',
    featured: true,
    verified: true,
    completedProjects: 34,
    education: 'Ph.D. in Computer Science, Stanford University',
    portfolio: [
      {
        title: 'Enterprise RAG Agent for FinTech',
        description: 'Built a secure, zero-hallucination document search engine processing 10M+ financial filings.',
        metrics: '99.4% precision, 4x faster response time'
      },
      {
        title: 'Autonomous Multimodal Support Bot',
        description: 'Deployed custom fine-tuned Llama-3 model reducing tier-1 human support load by 68%.',
        metrics: 'R7M annual operational savings'
      }
    ]
  },
  {
    id: 'exp-2',
    name: 'Sarah Jenkins',
    title: 'Fractional CPO & Product Strategy Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 4.95,
    reviewsCount: 62,
    hourlyRate: 2500,
    category: 'Fractional Leadership',
    skills: ['Product Strategy', 'Roadmapping', 'User Research', 'PLG', 'Team Mentorship'],
    bio: 'Experienced Chief Product Officer who has guided 3 companies from seed stage to Series B acquisition. Passionate about product-led growth and high-performing cross-functional teams.',
    experience: '14 Years Experience • 3x Startup Founder & CPO',
    location: 'London, UK (Remote)',
    availability: 'Part-time',
    featured: true,
    verified: true,
    completedProjects: 45,
    education: 'MBA, London Business School',
    portfolio: [
      {
        title: 'SaaS PLG Transformation',
        description: 'Redesigned onboarding and freemium funnel for B2B SaaS platform.',
        metrics: '180% increase in activation rate within 90 days'
      },
      {
        title: 'Series A Product Roadmap',
        description: 'Structured enterprise tier features driving R33M ARR expansion.',
        metrics: 'Closed 12 Fortune 500 pilots'
      }
    ]
  },
  {
    id: 'exp-3',
    name: 'Marcus Chen',
    title: 'Principal Cloud Architect & DevOps Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 4.92,
    reviewsCount: 39,
    hourlyRate: 2300,
    category: 'Software Engineering',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'System Architecture', 'Microservices'],
    bio: 'Cloud infrastructure expert specializing in high-availability distributed systems, automated CI/CD pipelines, and cloud cost optimization for high-growth tech companies.',
    experience: '11 Years Experience • AWS Certified Solutions Architect',
    location: 'Vancouver, Canada (Remote)',
    availability: 'Available Now',
    featured: true,
    verified: true,
    completedProjects: 51,
    education: 'B.Sc. in Software Engineering, UBC',
    portfolio: [
      {
        title: 'Multi-Region Kubernetes Migration',
        description: 'Migrated monolithic fintech backend to zero-downtime multi-region EKS clusters.',
        metrics: 'Achieved 99.999% uptime and 45% cloud cost reduction'
      }
    ]
  },
  {
    id: 'exp-4',
    name: 'Elena Rostova',
    title: 'Head of Brand & Product Design',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    rating: 4.97,
    reviewsCount: 54,
    hourlyRate: 2150,
    category: 'Product & UX Design',
    skills: ['Figma', 'Design Systems', 'UX Research', 'Brand Identity', 'Mobile UX'],
    bio: 'Award-winning designer with a track record of crafting intuitive digital experiences for fintech, healthtech, and enterprise software. Focus on accessibility and conversion-optimized interfaces.',
    experience: '10 Years Experience • Ex-Figma Community Lead',
    location: 'Berlin, Germany (Remote)',
    availability: 'Available Now',
    featured: false,
    verified: true,
    completedProjects: 40,
    education: 'M.Des in Interaction Design, Berlin University of Arts',
    portfolio: [
      {
        title: 'Neo-Bank Mobile App Redesign',
        description: 'Redesigned core banking experience for 2M+ active monthly users.',
        metrics: 'App Store rating increased from 3.2 to 4.8 stars'
      }
    ]
  },
  {
    id: 'exp-5',
    name: 'David Kalu',
    title: 'Senior Full Stack & Blockchain Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    rating: 4.89,
    reviewsCount: 28,
    hourlyRate: 2050,
    category: 'Software Engineering',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'Solidity'],
    bio: 'Polyglot developer building robust web applications and secure smart contracts. Passionate about clean code, robust test coverage, and blazing-fast user interfaces.',
    experience: '9 Years Experience • Open Source Contributor',
    location: 'Lagos, Nigeria (Remote)',
    availability: 'Part-time',
    featured: false,
    verified: true,
    completedProjects: 29,
    education: 'B.Sc. Computer Science, Covenant University',
    portfolio: [
      {
        title: 'Decentralized Escrow Marketplace',
        description: 'Architected full-stack escrow platform handling R80M+ in secure transactions.',
        metrics: 'Zero security vulnerabilities in audit'
      }
    ]
  },
  {
    id: 'exp-6',
    name: 'Amina Patel',
    title: 'Growth Marketing & Performance Director',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    rating: 4.94,
    reviewsCount: 41,
    hourlyRate: 2200,
    category: 'Growth & Marketing',
    skills: ['Paid Acquisition', 'SEO', 'Conversion Rate Optimization', 'Analytics', 'B2B Growth'],
    bio: 'Data-driven growth leader helping B2B and consumer tech brands scale paid acquisition channels and build compounding organic loops.',
    experience: '11 Years Experience • Ex-Growth Lead at Stripe Partner Agency',
    location: 'Toronto, Canada (Remote)',
    availability: 'Available Now',
    featured: false,
    verified: true,
    completedProjects: 38,
    education: 'B.A. Economics, University of Toronto',
    portfolio: [
      {
        title: 'B2B SaaS Pipeline Scaling',
        description: 'Scaled paid ad acquisition and outbound motion for Series A HR tech platform.',
        metrics: '3.4x ROAS and 220% pipeline growth in 6 months'
      }
    ]
  },
  {
    id: 'exp-7',
    name: 'Julian Thorne',
    title: 'Fractional CFO & Financial Strategist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    rating: 4.99,
    reviewsCount: 70,
    hourlyRate: 3300,
    category: 'Finance & Strategy',
    skills: ['Financial Modeling', 'Fundraising', 'M&A', 'Unit Economics', 'Cash Flow Management'],
    bio: 'Former investment banker turned fractional CFO. Specializes in preparing startups for Series A/B funding rounds, optimizing burn rate, and financial modeling.',
    experience: '16 Years Experience • Ex-Goldman Sachs, Wharton MBA',
    location: 'New York, NY (Remote)',
    availability: 'Busy',
    featured: true,
    verified: true,
    completedProjects: 65,
    education: 'MBA, The Wharton School',
    portfolio: [
      {
        title: 'Series B Fundraising Support',
        description: 'Built financial model and data room for R360M Series B round.',
        metrics: 'Secured term sheet within 3 weeks of outreach'
      }
    ]
  },
  {
    id: 'exp-8',
    name: 'Maya Lin',
    title: 'Senior LLM Engineer & NLP Specialist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    rating: 4.91,
    reviewsCount: 33,
    hourlyRate: 2650,
    category: 'AI & Data Science',
    skills: ['LangChain', 'Fine-tuning', 'Vector Databases', 'Python', 'FastAPI'],
    bio: 'Specialized in taking cutting-edge AI research and turning it into reliable production systems. Expert in embedding models, vector search, and custom agent workflows.',
    experience: '8 Years Experience • Ex-OpenAI Grant Recipient',
    location: 'Seattle, WA (Remote)',
    availability: 'Available Now',
    featured: false,
    verified: true,
    completedProjects: 26,
    education: 'M.S. in Artificial Intelligence, University of Washington',
    portfolio: [
      {
        title: 'Legal Document Analyzer AI',
        description: 'Automated contract review for top-tier law firm using custom LLM pipelines.',
        metrics: 'Reduced contract review time by 85%'
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Generative AI Document Summarizer & Q&A Assistant',
    client: 'Apex HealthTech',
    budget: 'R200,000 - R300,000',
    timeline: '6 weeks',
    category: 'AI & Data Science',
    description: 'We need an expert AI engineer to build a HIPAA-compliant RAG pipeline that can ingest medical research papers and provide accurate summarized insights to clinicians.',
    requiredSkills: ['PyTorch', 'RAG Systems', 'Python', 'LLMs'],
    status: 'Open',
    postedDate: '2 hours ago'
  },
  {
    id: 'proj-2',
    title: 'Fractional CPO for B2B SaaS Scale-up',
    client: 'CloudFlow Metrics',
    budget: 'R130,000 / month',
    timeline: '6 months',
    category: 'Fractional Leadership',
    description: 'Looking for an experienced fractional CPO to lead our 8-person product team, define the Q3-Q4 roadmap, and implement product-led growth metrics.',
    requiredSkills: ['Product Strategy', 'Roadmapping', 'PLG', 'Team Mentorship'],
    status: 'Open',
    postedDate: '1 day ago'
  },
  {
    id: 'proj-3',
    title: 'Kubernetes Infrastructure Overhaul & Cost Audit',
    client: 'FinPulse Global',
    budget: 'R250,000',
    timeline: '4 weeks',
    category: 'Software Engineering',
    description: 'Seeking a principal cloud architect to review our AWS EKS setup, implement autoscaling policies, and reduce our monthly infrastructure burn.',
    requiredSkills: ['AWS', 'Kubernetes', 'Terraform', 'System Architecture'],
    status: 'Open',
    postedDate: '2 days ago'
  },
  {
    id: 'proj-4',
    title: 'Design System & Mobile App UX Overhaul',
    client: 'Vanguard Pay',
    budget: 'R330,000',
    timeline: '8 weeks',
    category: 'Product & UX Design',
    description: 'Looking for a senior product designer to create a comprehensive Figma design system and overhaul our iOS/Android payment flows.',
    requiredSkills: ['Figma', 'Design Systems', 'Mobile UX', 'UX Research'],
    status: 'In Progress',
    postedDate: '3 days ago'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Expertism Talent Hub connected us with a world-class AI architect within 48 hours. The quality of vetted talent is unlike anything we’ve experienced on traditional freelance platforms.',
    author: 'Jonathan Reynolds',
    role: 'CEO & Co-Founder',
    company: 'NexusAI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 'test-2',
    quote: 'Finding a fractional CPO who instantly understood our B2B SaaS challenges saved us months of trial and error. Expertism made the vetting and hiring process completely frictionless.',
    author: 'Clara Sterling',
    role: 'Managing Director',
    company: 'VentureScale Partners',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 'test-3',
    quote: 'As an elite consultant, Expertism Talent Hub has connected me with high-caliber enterprise clients who value deep domain expertise. The platform is brilliantly structured.',
    author: 'Dr. Alex Vance',
    role: 'Principal AI Architect',
    company: 'Expertism Network Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];
