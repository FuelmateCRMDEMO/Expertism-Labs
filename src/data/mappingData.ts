export interface MappedCandidate {
  id: string;
  codeName: string;
  currentCompany: string;
  companyTier: 'Tier 1' | 'High-Growth' | 'Global Multination';
  title: string;
  discipline: 'Cloud & DevOps' | 'AI & Data Science' | 'Core Engineering' | 'Cyber Security' | 'Solution Architecture' | 'Product Leadership';
  seniority: 'Lead' | 'Staff' | 'Principal' | 'Head of' | 'Director' | 'VP / C-Level';
  yearsExperience: number;
  location: 'Johannesburg' | 'Cape Town' | 'Durban' | 'Remote (SA)';
  currentSalaryZAR: number; // Annual
  targetSalaryZAR: number;  // Annual
  mobilityStatus: 'Receptive' | 'Passive' | 'In Discussions' | 'Locked (Non-Compete)';
  poachabilityScore: number; // 1-100
  flightRisk: 'High' | 'Medium' | 'Low';
  noticePeriod: '30 Days' | '60 Days' | '90 Days' | 'Immediate';
  verifiedSkills: string[];
  lastUpdated: string;
}

export interface CompetitorMatrixRow {
  company: string;
  category: 'Banking / FinTech' | 'E-Commerce / Retail' | 'Telecommunications' | 'Big Tech / Global' | 'Health / InsurTech';
  location: string;
  totalMappedTech: number;
  attritionRisk: 'High' | 'Medium' | 'Low';
  disciplines: {
    'Cloud & DevOps': { count: number; avgCompZAR: string; scarcity: 'Critical' | 'High' | 'Normal' };
    'AI & Data Science': { count: number; avgCompZAR: string; scarcity: 'Critical' | 'High' | 'Normal' };
    'Core Engineering': { count: number; avgCompZAR: string; scarcity: 'Critical' | 'High' | 'Normal' };
    'Cyber Security': { count: number; avgCompZAR: string; scarcity: 'Critical' | 'High' | 'Normal' };
    'Solution Architecture': { count: number; avgCompZAR: string; scarcity: 'Critical' | 'High' | 'Normal' };
    'Product Leadership': { count: number; avgCompZAR: string; scarcity: 'Critical' | 'High' | 'Normal' };
  };
}

export interface TalentMigrationFlow {
  source: string;
  destination: string;
  volume: string;
  primaryDrivers: string;
  avgSalaryUplift: string;
}

export const COMPETITOR_MATRIX: CompetitorMatrixRow[] = [
  {
    company: 'Standard Bank Group',
    category: 'Banking / FinTech',
    location: 'Johannesburg (Rosebank)',
    totalMappedTech: 840,
    attritionRisk: 'Medium',
    disciplines: {
      'Cloud & DevOps': { count: 145, avgCompZAR: 'R1,650,000', scarcity: 'High' },
      'AI & Data Science': { count: 98, avgCompZAR: 'R1,800,000', scarcity: 'Critical' },
      'Core Engineering': { count: 320, avgCompZAR: 'R1,450,000', scarcity: 'Normal' },
      'Cyber Security': { count: 85, avgCompZAR: 'R1,900,000', scarcity: 'Critical' },
      'Solution Architecture': { count: 110, avgCompZAR: 'R2,100,000', scarcity: 'High' },
      'Product Leadership': { count: 82, avgCompZAR: 'R1,750,000', scarcity: 'Normal' }
    }
  },
  {
    company: 'Discovery Limited',
    category: 'Health / InsurTech',
    location: 'Sandton, Johannesburg',
    totalMappedTech: 620,
    attritionRisk: 'Medium',
    disciplines: {
      'Cloud & DevOps': { count: 95, avgCompZAR: 'R1,600,000', scarcity: 'High' },
      'AI & Data Science': { count: 130, avgCompZAR: 'R1,950,000', scarcity: 'Critical' },
      'Core Engineering': { count: 215, avgCompZAR: 'R1,480,000', scarcity: 'Normal' },
      'Cyber Security': { count: 52, avgCompZAR: 'R1,850,000', scarcity: 'Critical' },
      'Solution Architecture': { count: 78, avgCompZAR: 'R2,050,000', scarcity: 'High' },
      'Product Leadership': { count: 50, avgCompZAR: 'R1,820,000', scarcity: 'Normal' }
    }
  },
  {
    company: 'Takealot Group',
    category: 'E-Commerce / Retail',
    location: 'Cape Town (Foreshore)',
    totalMappedTech: 410,
    attritionRisk: 'High',
    disciplines: {
      'Cloud & DevOps': { count: 68, avgCompZAR: 'R1,720,000', scarcity: 'High' },
      'AI & Data Science': { count: 54, avgCompZAR: 'R1,880,000', scarcity: 'High' },
      'Core Engineering': { count: 175, avgCompZAR: 'R1,520,000', scarcity: 'Normal' },
      'Cyber Security': { count: 28, avgCompZAR: 'R1,780,000', scarcity: 'Normal' },
      'Solution Architecture': { count: 45, avgCompZAR: 'R2,000,000', scarcity: 'High' },
      'Product Leadership': { count: 40, avgCompZAR: 'R1,900,000', scarcity: 'Critical' }
    }
  },
  {
    company: 'Vodacom Group',
    category: 'Telecommunications',
    location: 'Midrand, Gauteng',
    totalMappedTech: 530,
    attritionRisk: 'Low',
    disciplines: {
      'Cloud & DevOps': { count: 88, avgCompZAR: 'R1,620,000', scarcity: 'High' },
      'AI & Data Science': { count: 65, avgCompZAR: 'R1,750,000', scarcity: 'High' },
      'Core Engineering': { count: 210, avgCompZAR: 'R1,420,000', scarcity: 'Normal' },
      'Cyber Security': { count: 72, avgCompZAR: 'R1,920,000', scarcity: 'Critical' },
      'Solution Architecture': { count: 60, avgCompZAR: 'R1,980,000', scarcity: 'Normal' },
      'Product Leadership': { count: 35, avgCompZAR: 'R1,700,000', scarcity: 'Normal' }
    }
  },
  {
    company: 'Amazon AWS Cape Town Development Centre',
    category: 'Big Tech / Global',
    location: 'Cape Town (Observatory)',
    totalMappedTech: 720,
    attritionRisk: 'Low',
    disciplines: {
      'Cloud & DevOps': { count: 260, avgCompZAR: 'R2,450,000', scarcity: 'Critical' },
      'AI & Data Science': { count: 90, avgCompZAR: 'R2,600,000', scarcity: 'Critical' },
      'Core Engineering': { count: 290, avgCompZAR: 'R2,100,000', scarcity: 'Critical' },
      'Cyber Security': { count: 30, avgCompZAR: 'R2,350,000', scarcity: 'Critical' },
      'Solution Architecture': { count: 35, avgCompZAR: 'R2,750,000', scarcity: 'Critical' },
      'Product Leadership': { count: 15, avgCompZAR: 'R2,500,000', scarcity: 'High' }
    }
  },
  {
    company: 'Peach Payments & Yoco',
    category: 'Banking / FinTech',
    location: 'Cape Town & Remote',
    totalMappedTech: 310,
    attritionRisk: 'High',
    disciplines: {
      'Cloud & DevOps': { count: 42, avgCompZAR: 'R1,750,000', scarcity: 'High' },
      'AI & Data Science': { count: 38, avgCompZAR: 'R1,890,000', scarcity: 'High' },
      'Core Engineering': { count: 145, avgCompZAR: 'R1,580,000', scarcity: 'High' },
      'Cyber Security': { count: 22, avgCompZAR: 'R1,950,000', scarcity: 'Critical' },
      'Solution Architecture': { count: 35, avgCompZAR: 'R2,150,000', scarcity: 'High' },
      'Product Leadership': { count: 28, avgCompZAR: 'R1,850,000', scarcity: 'Normal' }
    }
  },
  {
    company: 'Luno',
    category: 'Banking / FinTech',
    location: 'Cape Town (Waterfront)',
    totalMappedTech: 195,
    attritionRisk: 'Medium',
    disciplines: {
      'Cloud & DevOps': { count: 32, avgCompZAR: 'R1,850,000', scarcity: 'High' },
      'AI & Data Science': { count: 25, avgCompZAR: 'R2,050,000', scarcity: 'Critical' },
      'Core Engineering': { count: 85, avgCompZAR: 'R1,680,000', scarcity: 'High' },
      'Cyber Security': { count: 24, avgCompZAR: 'R2,100,000', scarcity: 'Critical' },
      'Solution Architecture': { count: 18, avgCompZAR: 'R2,200,000', scarcity: 'Critical' },
      'Product Leadership': { count: 11, avgCompZAR: 'R1,950,000', scarcity: 'Normal' }
    }
  }
];

export const MAPPED_CANDIDATES: MappedCandidate[] = [
  {
    id: 'TM-701',
    codeName: 'T. Sithole [Principal]',
    currentCompany: 'Standard Bank Group',
    companyTier: 'Tier 1',
    title: 'Lead Cloud Infrastructure Architect',
    discipline: 'Cloud & DevOps',
    seniority: 'Principal',
    yearsExperience: 14,
    location: 'Johannesburg',
    currentSalaryZAR: 1950000,
    targetSalaryZAR: 2350000,
    mobilityStatus: 'Receptive',
    poachabilityScore: 84,
    flightRisk: 'High',
    noticePeriod: '60 Days',
    verifiedSkills: ['AWS EKS', 'Terraform Enterprise', 'Zero Trust', 'FinOps'],
    lastUpdated: 'Yesterday'
  },
  {
    id: 'TM-702',
    codeName: 'K. Van Der Merwe [Staff]',
    currentCompany: 'Amazon AWS Cape Town',
    companyTier: 'Global Multination',
    title: 'Staff Distributed Systems Engineer',
    discipline: 'Core Engineering',
    seniority: 'Staff',
    yearsExperience: 11,
    location: 'Cape Town',
    currentSalaryZAR: 2400000,
    targetSalaryZAR: 2800000,
    mobilityStatus: 'Passive',
    poachabilityScore: 58,
    flightRisk: 'Low',
    noticePeriod: '90 Days',
    verifiedSkills: ['Rust', 'Distributed Consensus', 'C++', 'High-Throughput IO'],
    lastUpdated: '3 days ago'
  },
  {
    id: 'TM-703',
    codeName: 'N. Dlamini [Director]',
    currentCompany: 'Discovery Limited',
    companyTier: 'Tier 1',
    title: 'Head of Data Science & Predictive ML',
    discipline: 'AI & Data Science',
    seniority: 'Director',
    yearsExperience: 16,
    location: 'Johannesburg',
    currentSalaryZAR: 2200000,
    targetSalaryZAR: 2650000,
    mobilityStatus: 'Receptive',
    poachabilityScore: 91,
    flightRisk: 'High',
    noticePeriod: '60 Days',
    verifiedSkills: ['PyTorch', 'Generative AI', 'Databricks', 'Team Leadership 40+'],
    lastUpdated: 'Today'
  },
  {
    id: 'TM-704',
    codeName: 'D. Pillay [Principal]',
    currentCompany: 'Peach Payments & Yoco',
    companyTier: 'High-Growth',
    title: 'Principal Security & DevSecOps Lead',
    discipline: 'Cyber Security',
    seniority: 'Principal',
    yearsExperience: 13,
    location: 'Cape Town',
    currentSalaryZAR: 1850000,
    targetSalaryZAR: 2200000,
    mobilityStatus: 'In Discussions',
    poachabilityScore: 78,
    flightRisk: 'Medium',
    noticePeriod: '30 Days',
    verifiedSkills: ['PCI-DSS 4.0', 'Kubernetes Security', 'Threat Modeling', 'AppSec'],
    lastUpdated: '2 days ago'
  },
  {
    id: 'TM-705',
    codeName: 'C. Meyer [VP]',
    currentCompany: 'Takealot Group',
    companyTier: 'Tier 1',
    title: 'VP of Platform Engineering',
    discipline: 'Solution Architecture',
    seniority: 'VP / C-Level',
    yearsExperience: 19,
    location: 'Cape Town',
    currentSalaryZAR: 2800000,
    targetSalaryZAR: 3400000,
    mobilityStatus: 'Receptive',
    poachabilityScore: 89,
    flightRisk: 'High',
    noticePeriod: '90 Days',
    verifiedSkills: ['Event-Driven Arch', 'Kafka Scale', 'GCP / AWS Hybrid', 'P&L Ownership'],
    lastUpdated: 'Today'
  },
  {
    id: 'TM-706',
    codeName: 'L. Mthembu [Lead]',
    currentCompany: 'Vodacom Group',
    companyTier: 'Tier 1',
    title: 'Lead Full-Stack & API Architect',
    discipline: 'Core Engineering',
    seniority: 'Lead',
    yearsExperience: 9,
    location: 'Johannesburg',
    currentSalaryZAR: 1450000,
    targetSalaryZAR: 1750000,
    mobilityStatus: 'Receptive',
    poachabilityScore: 82,
    flightRisk: 'High',
    noticePeriod: '30 Days',
    verifiedSkills: ['Node.js', 'Go', 'GraphQL', 'Next.js', 'EventBridge'],
    lastUpdated: '4 days ago'
  },
  {
    id: 'TM-707',
    codeName: 'B. Botha [Head]',
    currentCompany: 'Luno',
    companyTier: 'High-Growth',
    title: 'Head of Product - Institutional Rails',
    discipline: 'Product Leadership',
    seniority: 'Head of',
    yearsExperience: 12,
    location: 'Cape Town',
    currentSalaryZAR: 2100000,
    targetSalaryZAR: 2500000,
    mobilityStatus: 'Passive',
    poachabilityScore: 62,
    flightRisk: 'Medium',
    noticePeriod: '60 Days',
    verifiedSkills: ['Crypto Custody', 'Regulatory Sandbox', 'PLG', 'Enterprise B2B'],
    lastUpdated: '1 week ago'
  },
  {
    id: 'TM-708',
    codeName: 'Z. Khumalo [Staff]',
    currentCompany: 'MultiChoice Group',
    companyTier: 'Tier 1',
    title: 'Staff Video Streaming & Edge Infrastructure Engineer',
    discipline: 'Cloud & DevOps',
    seniority: 'Staff',
    yearsExperience: 10,
    location: 'Johannesburg',
    currentSalaryZAR: 1650000,
    targetSalaryZAR: 1980000,
    mobilityStatus: 'Receptive',
    poachabilityScore: 86,
    flightRisk: 'High',
    noticePeriod: '30 Days',
    verifiedSkills: ['CDN Architecture', 'WebRTC', 'Kubernetes', 'BGP Routing'],
    lastUpdated: 'Yesterday'
  },
  {
    id: 'TM-709',
    codeName: 'S. Naidoo [Principal]',
    currentCompany: 'Capitec Bank',
    companyTier: 'Tier 1',
    title: 'Principal Enterprise Core Banking Architect',
    discipline: 'Solution Architecture',
    seniority: 'Principal',
    yearsExperience: 17,
    location: 'Cape Town',
    currentSalaryZAR: 2300000,
    targetSalaryZAR: 2750000,
    mobilityStatus: 'Locked (Non-Compete)',
    poachabilityScore: 35,
    flightRisk: 'Low',
    noticePeriod: '90 Days',
    verifiedSkills: ['Microservices', 'Core Ledger Modernization', 'API Banking', 'Kafka'],
    lastUpdated: '5 days ago'
  },
  {
    id: 'TM-710',
    codeName: 'M. Coetzee [Staff]',
    currentCompany: 'Takealot Group',
    companyTier: 'Tier 1',
    title: 'Staff Machine Learning Engineer (Search & Recommendations)',
    discipline: 'AI & Data Science',
    seniority: 'Staff',
    yearsExperience: 8,
    location: 'Cape Town',
    currentSalaryZAR: 1750000,
    targetSalaryZAR: 2150000,
    mobilityStatus: 'Receptive',
    poachabilityScore: 88,
    flightRisk: 'High',
    noticePeriod: '30 Days',
    verifiedSkills: ['Vector Search', 'RecSys', 'Transformers', 'PyTorch', 'AWS SageMaker'],
    lastUpdated: 'Today'
  }
];

export const TALENT_MIGRATION_FLOWS: TalentMigrationFlow[] = [
  {
    source: 'Tier 1 Traditional Banks (Standard Bank, Absa, Nedbank)',
    destination: 'High-Growth FinTechs (Yoco, Peach Payments, TymeBank)',
    volume: '34% Net Outflow',
    primaryDrivers: 'Equity upside, modern cloud stacks, reduced corporate bureaucracy',
    avgSalaryUplift: '+22.5% in ZAR'
  },
  {
    source: 'Enterprise Telcos & Media (Vodacom, MultiChoice)',
    destination: 'Global R&D Hubs & AWS Cape Town',
    volume: '21% Net Outflow',
    primaryDrivers: 'Dollar/Global pegged stock, world-scale distributed systems challenges',
    avgSalaryUplift: '+38.0% in ZAR'
  },
  {
    source: 'Big 4 Consultancies (Deloitte, Accenture Digital)',
    destination: 'In-House Platform Engineering Teams',
    volume: '29% Net Outflow',
    primaryDrivers: 'Elimination of billable hour strain, product ownership, permanent remote flexibility',
    avgSalaryUplift: '+18.2% in ZAR'
  }
];

export const COMPENSATION_BENCHMARKS = [
  {
    role: 'Principal Cloud / DevOps Architect',
    p25: 'R1,550,000',
    median: 'R1,850,000',
    p75: 'R2,250,000',
    p90: 'R2,650,000',
    yoyGrowth: '+14.2%'
  },
  {
    role: 'Lead AI / Machine Learning Engineer',
    p25: 'R1,650,000',
    median: 'R2,050,000',
    p75: 'R2,450,000',
    p90: 'R2,900,000',
    yoyGrowth: '+26.8%'
  },
  {
    role: 'Principal Cyber Security & SecOps Lead',
    p25: 'R1,600,000',
    median: 'R1,900,000',
    p75: 'R2,300,000',
    p90: 'R2,700,000',
    yoyGrowth: '+19.5%'
  },
  {
    role: 'Head of Software Engineering',
    p25: 'R1,900,000',
    median: 'R2,350,000',
    p75: 'R2,800,000',
    p90: 'R3,350,000',
    yoyGrowth: '+12.4%'
  },
  {
    role: 'Group CTO / VP Technology',
    p25: 'R2,600,000',
    median: 'R3,250,000',
    p75: 'R3,950,000',
    p90: 'R4,800,000+',
    yoyGrowth: '+15.7%'
  }
];

export interface MarketMapProject {
  id: string;
  name: string;
  targetSector: string;
  targetRole: string;
  targetPackageZAR: string;
  location: string;
  mappedCount: number;
  contactedCount: number;
  shortlistedCount: number;
  status: 'Active Mapping' | 'Outreach Phase' | 'Shortlist Ready' | 'Archived';
  keyTargetCompanies: string[];
  createdAt: string;
}

export interface OrgHierarchyNode {
  id: string;
  name: string;
  title: string;
  department: string;
  seniority: string;
  reportsToId?: string;
  poachabilityScore: number;
  mobilityStatus: 'Receptive' | 'Passive' | 'In Discussions' | 'Locked (Non-Compete)';
  packageZAR: string;
  tenure: string;
  skills: string[];
}

export const MARKET_MAP_PROJECTS: MarketMapProject[] = [
  {
    id: 'MMP-01',
    name: 'Gauteng Core Banking Cloud & Microservices Architects',
    targetSector: 'Tier 1 Banking & FinTech',
    targetRole: 'Principal Cloud & Solution Architect',
    targetPackageZAR: 'R2,200,000 - R2,800,000',
    location: 'Johannesburg / Remote SA',
    mappedCount: 42,
    contactedCount: 16,
    shortlistedCount: 5,
    status: 'Active Mapping',
    keyTargetCompanies: ['Standard Bank Group', 'Discovery Limited', 'Vodacom Group', 'Capitec Bank'],
    createdAt: 'Nov 2026'
  },
  {
    id: 'MMP-02',
    name: 'Cape Town Staff Distributed Systems & Rust Leads',
    targetSector: 'Big Tech & Global Scale-ups',
    targetRole: 'Staff / Principal Systems Engineer',
    targetPackageZAR: 'R2,400,000 - R3,100,000',
    location: 'Cape Town (Waterfront & Observatory)',
    mappedCount: 28,
    contactedCount: 11,
    shortlistedCount: 4,
    status: 'Outreach Phase',
    keyTargetCompanies: ['Amazon AWS Cape Town', 'Luno', 'Peach Payments & Yoco', 'Takealot Group'],
    createdAt: 'Nov 2026'
  },
  {
    id: 'MMP-03',
    name: 'Pan-African Generative AI & ML Engineering Leads',
    targetSector: 'HealthTech & FinTech R&D',
    targetRole: 'Director / Lead AI Engineer',
    targetPackageZAR: 'R2,000,000 - R2,600,000',
    location: 'Johannesburg & Cape Town',
    mappedCount: 35,
    contactedCount: 9,
    shortlistedCount: 3,
    status: 'Shortlist Ready',
    keyTargetCompanies: ['Discovery Limited', 'Takealot Group', 'Standard Bank Group'],
    createdAt: 'Oct 2026'
  }
];

export const ORG_CHART_SAMPLE: Record<string, OrgHierarchyNode[]> = {
  'Takealot Group': [
    {
      id: 'node-1',
      name: 'Dr. C. Meyer',
      title: 'VP of Platform Engineering',
      department: 'Platform Architecture',
      seniority: 'VP / C-Level',
      poachabilityScore: 89,
      mobilityStatus: 'Receptive',
      packageZAR: 'R3,200,000',
      tenure: '4.2 Years',
      skills: ['Distributed Systems', 'Kafka', 'GCP Hybrid', 'P&L']
    },
    {
      id: 'node-2',
      name: 'M. Coetzee',
      title: 'Staff ML Engineer (Search & Recs)',
      department: 'AI & Data Science',
      seniority: 'Staff',
      reportsToId: 'node-1',
      poachabilityScore: 88,
      mobilityStatus: 'Receptive',
      packageZAR: 'R2,150,000',
      tenure: '2.8 Years',
      skills: ['Vector Search', 'RecSys', 'Transformers', 'SageMaker']
    },
    {
      id: 'node-3',
      name: 'R. Ndlovu',
      title: 'Lead Logistics & Routing Architect',
      department: 'Supply Chain Tech',
      seniority: 'Lead',
      reportsToId: 'node-1',
      poachabilityScore: 65,
      mobilityStatus: 'Passive',
      packageZAR: 'R1,850,000',
      tenure: '3.5 Years',
      skills: ['Go', 'Graph Optimization', 'PostgreSQL', 'Kubernetes']
    },
    {
      id: 'node-4',
      name: 'S. Patel',
      title: 'Principal Cloud Security Engineer',
      department: 'InfoSec',
      seniority: 'Principal',
      reportsToId: 'node-1',
      poachabilityScore: 74,
      mobilityStatus: 'In Discussions',
      packageZAR: 'R2,050,000',
      tenure: '1.9 Years',
      skills: ['Zero Trust', 'GCP IAM', 'PCI-DSS', 'Falco']
    }
  ],
  'Standard Bank Group': [
    {
      id: 'sb-1',
      name: 'E. Khanyile',
      title: 'Head of Core Banking Modernization',
      department: 'Group Technology',
      seniority: 'Director / Head of',
      poachabilityScore: 78,
      mobilityStatus: 'Receptive',
      packageZAR: 'R2,850,000',
      tenure: '5.1 Years',
      skills: ['Mainframe De-coupling', 'Kafka', 'Event Streaming', 'RegTech']
    },
    {
      id: 'sb-2',
      name: 'T. Sithole',
      title: 'Lead Cloud Infrastructure Architect',
      department: 'Cloud Platform Engineering',
      seniority: 'Principal',
      reportsToId: 'sb-1',
      poachabilityScore: 84,
      mobilityStatus: 'Receptive',
      packageZAR: 'R2,350,000',
      tenure: '3.4 Years',
      skills: ['AWS EKS', 'Terraform Enterprise', 'FinOps', 'Zero Trust']
    },
    {
      id: 'sb-3',
      name: 'W. Basson',
      title: 'Principal Open Banking API Architect',
      department: 'Integration Architecture',
      seniority: 'Principal',
      reportsToId: 'sb-1',
      poachabilityScore: 52,
      mobilityStatus: 'Passive',
      packageZAR: 'R2,100,000',
      tenure: '6.0 Years',
      skills: ['GraphQL', 'Mutual TLS', 'ISO 20022', 'OAuth2']
    }
  ]
};

