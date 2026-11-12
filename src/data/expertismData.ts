export interface ExecutiveMandate {
  id: string;
  role: string;
  clientIndustry: string;
  location: string;
  salaryZAR: string;
  status: 'Market Mapping' | 'Longlist Review' | 'Client Interviews' | 'Offer Stage' | 'Completed';
  progressPercent: number;
  mappedCandidates: number;
  shortlistedCount: number;
  leadPartner: string;
  confidential: boolean;
  priority: 'Critical' | 'High' | 'Strategic';
  keyRequirements: string[];
  description: string;
}

export interface PracticeMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'neutral';
  subtext: string;
}

export const PRACTICE_METRICS: PracticeMetric[] = [
  {
    label: 'Active Retained Mandates',
    value: '14',
    change: '+3 this month',
    trend: 'up',
    subtext: 'Executive technology leadership searches'
  },
  {
    label: 'Avg. Time to Shortlist',
    value: '9.4 Days',
    change: '-2.1 days vs industry',
    trend: 'up',
    subtext: 'Proprietary market intelligence mapping'
  },
  {
    label: '24-Month Retention Rate',
    value: '98.6%',
    change: 'Top quartile',
    trend: 'up',
    subtext: 'Strict competency & culture vetting'
  },
  {
    label: 'Mapped Executive Network',
    value: '4,850+',
    change: 'SA & EMEA',
    trend: 'up',
    subtext: 'Principal, Director & C-level tech leaders'
  }
];

export const EXECUTIVE_MANDATES: ExecutiveMandate[] = [
  {
    id: 'MAN-2026-01',
    role: 'Group Chief Technology Officer (CTO)',
    clientIndustry: 'Pan-African FinTech Unicorn',
    location: 'Sandton, Johannesburg (Hybrid)',
    salaryZAR: 'R3,400,000 - R4,200,000 + LTI',
    status: 'Client Interviews',
    progressPercent: 75,
    mappedCandidates: 48,
    shortlistedCount: 4,
    leadPartner: 'Clinton P.',
    confidential: true,
    priority: 'Critical',
    keyRequirements: ['Multi-country banking rails', 'Scalable distributed systems', '200+ team leadership', 'PCI-DSS Tier 1'],
    description: 'Leading technology modernization across 8 African jurisdictions for high-growth payments infrastructure.'
  },
  {
    id: 'MAN-2026-02',
    role: 'Head of Cloud & Core Banking Architecture',
    clientIndustry: 'Tier 1 South African Retail Bank',
    location: 'Johannesburg, Gauteng',
    salaryZAR: 'R2,500,000 - R2,950,000',
    status: 'Longlist Review',
    progressPercent: 45,
    mappedCandidates: 62,
    shortlistedCount: 6,
    leadPartner: 'Clinton P.',
    confidential: false,
    priority: 'High',
    keyRequirements: ['AWS / Azure hybrid cloud', 'Microservices migration', 'Legacy core de-coupling', 'FinTech integration'],
    description: 'Driving enterprise cloud transformation moving 60% of critical core banking workloads to sovereign cloud.'
  },
  {
    id: 'MAN-2026-03',
    role: 'VP of Engineering (Payments & Fraud AI)',
    clientIndustry: 'High-growth Cape Town Tech Scale-up',
    location: 'Cape Town (Waterfront)',
    salaryZAR: 'R2,100,000 - R2,600,000 + Equity',
    status: 'Offer Stage',
    progressPercent: 90,
    mappedCandidates: 34,
    shortlistedCount: 3,
    leadPartner: 'Clinton P.',
    confidential: false,
    priority: 'Strategic',
    keyRequirements: ['Real-time streaming (Kafka)', 'ML anomaly detection', 'Go / Rust microservices', 'Cross-border settlements'],
    description: 'Spearheading the engineering squad responsible for sub-100ms transactional fraud prevention models.'
  },
  {
    id: 'MAN-2026-04',
    role: 'Director of Artificial Intelligence & Data Platforms',
    clientIndustry: 'HealthTech & Insurance Enterprise',
    location: 'Rosebank, Johannesburg',
    salaryZAR: 'R2,000,000 - R2,450,000',
    status: 'Market Mapping',
    progressPercent: 30,
    mappedCandidates: 56,
    shortlistedCount: 0,
    leadPartner: 'Clinton P.',
    confidential: true,
    priority: 'High',
    keyRequirements: ['LLM enterprise adoption', 'HIPAA/POPIA compliance', 'Snowflake / Databricks', 'Predictive underwriting'],
    description: 'Building the foundational AI division to operationalize generative and predictive models for medical risk.'
  },
  {
    id: 'MAN-2026-05',
    role: 'Principal Cyber Security & DevSecOps Lead',
    clientIndustry: 'Telecommunications & Digital Services',
    location: 'Midrand, Gauteng',
    salaryZAR: 'R1,850,000 - R2,250,000',
    status: 'Client Interviews',
    progressPercent: 65,
    mappedCandidates: 41,
    shortlistedCount: 5,
    leadPartner: 'Clinton P.',
    confidential: false,
    priority: 'Strategic',
    keyRequirements: ['Zero-trust network architecture', 'SOC2 / ISO 27001', 'Cloud security posture', 'Kubernetes hardening'],
    description: 'Directing zero-trust cyber defense and automated security guardrails for 45M subscriber infrastructure.'
  }
];

export const CLIENT_PARTNERS = [
  { name: 'Standard Bank Group', tag: 'Banking & Financial Markets', logoText: 'Standard Bank' },
  { name: 'Discovery Limited', tag: 'HealthTech & Shared Value Insurance', logoText: 'Discovery' },
  { name: 'Takealot Group', tag: 'E-commerce & Logistics', logoText: 'takealot.com' },
  { name: 'Vodacom Group', tag: 'Telecommunications & FinTech', logoText: 'Vodacom' },
  { name: 'Naspers / Prosus', tag: 'Global Tech Investment', logoText: 'Naspers' },
  { name: 'MultiChoice Group', tag: 'Digital Media & Streaming', logoText: 'MultiChoice' },
  { name: 'Luno', tag: 'Crypto & Digital Assets', logoText: 'Luno' },
  { name: 'Peach Payments', tag: 'Payment Gateway Infrastructure', logoText: 'Peach Payments' }
];

export const PRACTICE_SERVICES = [
  {
    id: 'exec-search',
    title: 'Retained Executive Search',
    tagline: 'C-Suite, VP & Director Level Technology Leadership',
    description: 'Full-cycle confidential search leveraging proprietary competitor mapping, executive headhunting, and thorough behavioral & architecture assessments.',
    deliverables: ['Custom competitor market map', 'Blind benchmark longlist in 7 days', 'Structured competency dossier', '24-month replacement guarantee']
  },
  {
    id: 'interim-leadership',
    title: 'Interim Tech Leadership',
    tagline: 'Fractional & Transition Technology Officers',
    description: 'Experienced interim CTOs, CISOs, and Heads of Architecture deployed within 48 hours for turnaround, M&A due diligence, or gap management.',
    deliverables: ['Day-1 strategic stabilization', 'Technical debt audits', 'Hiring permanent successors', 'Board-level transparency']
  },
  {
    id: 'talent-intelligence',
    title: 'Talent & Salary Benchmarking',
    tagline: 'ZAR Compensation Insights & Market Scarcity Intelligence',
    description: 'Empirical compensation telemetry and flight-risk assessments across South African and EMEA technology organizations.',
    deliverables: ['Real-time ZAR remuneration bands', 'Competitor organizational charts', 'Retention counter-offer advisory', 'Equity & LTI structuring']
  }
];
