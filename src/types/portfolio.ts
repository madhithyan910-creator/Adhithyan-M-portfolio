export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Internship' | 'Family Business' | 'Full-time' | 'Contract';
  description: string[];
  skillsUsed: string[];
  deliverables?: string[];
  highlightMetric?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  highlights?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline?: string;
  category: 'Market Research & Strategy' | 'Digital Marketplace' | 'Hospitality & Web' | 'EdTech & Learning' | 'Independent / AI';
  status: 'Completed' | 'Prototype' | 'Ongoing';
  description: string;
  problemSolved: string;
  keyFeatures: string[];
  technologies: string[];
  role: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer?: string;
  focus: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'Market Research' | 'Digital Strategy' | 'AI & Prototyping' | 'Hospitality Operations';
  publishedDate: string;
  readTime: string;
  author: string;
  tags: string[];
  imageUrl: string;
  relatedProjectIds?: string[];
}

export type AssetCategory =
  | 'Resumes'
  | 'Certificates'
  | 'Project Images'
  | 'Project Documents'
  | 'Presentations'
  | 'Screenshots'
  | 'Profile Images'
  | 'Blog Media'
  | 'Other';

export interface AssetRecord {
  id: string;
  name: string;
  description: string;
  fileType: 'image' | 'pdf' | 'document' | 'presentation' | 'spreadsheet' | 'url';
  mimeType: string;
  fileSize: number; // in bytes
  uploadDate: string;
  category: AssetCategory;
  tags: string[];
  isPrivate: boolean;
  associatedProjectId?: string;
  associatedBlogId?: string;
  url: string; // data URL or relative path
  dimensions?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  photoUrl: string;
  summary: string;
  valueProposition: string;
}
