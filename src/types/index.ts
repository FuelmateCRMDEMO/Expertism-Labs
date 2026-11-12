export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  category: string;
  skills: string[];
  bio: string;
  experience: string;
  location: string;
  availability: 'Available Now' | 'Part-time' | 'Busy';
  featured?: boolean;
  verified: boolean;
  completedProjects: number;
  education: string;
  portfolio: {
    title: string;
    description: string;
    metrics: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  budget: string;
  timeline: string;
  category: string;
  description: string;
  requiredSkills: string[];
  status: 'Open' | 'In Progress' | 'Completed';
  postedDate: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}
