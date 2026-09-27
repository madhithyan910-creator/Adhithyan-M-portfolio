import {
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillCategory,
  CertificationItem,
  BlogPost,
  AssetRecord
} from '../types/portfolio';

// Local references to generated high-fidelity assets
export const PORTRAIT_IMAGE = '/src/assets/images/adhithyan_m_portrait_1790490458597.jpg';
export const PROJECT_ATSUYA_IMAGE = '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg';
export const PROJECT_FARMERS_IMAGE = '/src/assets/images/project_connect_farmers_1790490485044.jpg';
export const PROJECT_AFCAT_IMAGE = '/src/assets/images/project_afcat_master_1790490496422.jpg';
export const PROJECT_HOMESTAY_IMAGE = '/src/assets/images/project_vagayil_holydays_1790490507433.jpg';

export const PROFILE = {
  name: 'Adhithyan M.',
  title: 'BBA (Hons) | Marketing & Business | AI-Assisted Digital Projects',
  headline: 'Aspiring Marketing & Business Strategist bridging business research with digital prototyping and AI tools.',
  email: 'madhithyan910@gmail.com',
  phone: '+91 8606188827',
  location: 'Idukki, Kerala, India',
  github: 'https://github.com/madhithyan910-creator',
  githubUsername: 'madhithyan910-creator',
  linkedin: 'https://www.linkedin.com/in/',
  photoUrl: '/src/assets/images/adhithyan_m_portrait_1790490458597.jpg',
  summary:
    'BBA (Hons) student with hands-on experience in marketing and business research, complemented by practical exposure to digital tools, AI-assisted development, and content creation. Experienced in working on marketing initiatives, market research, and digital projects, with an interest in applying business knowledge and emerging technologies to solve real-world problems. Seeking entry-level opportunities in marketing, digital business, management, AI-enabled business solutions, and content-driven roles.',
  valueProposition:
    'Combining rigorous B2B market research and gap analysis with modern AI-assisted rapid prototyping to build data-grounded, high-utility business solutions.'
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'atsuya-tech',
    role: 'Marketing Research & Analysis Intern',
    company: 'Atsuya Technologies Pvt. Ltd.',
    location: 'Chennai, Tamil Nadu',
    period: 'May 2026 – June 2026',
    type: 'Internship',
    description: [
      'Conducted comprehensive B2B market research on India’s hospital facility-management sector, analyzing market trends, growth drivers, customer needs, and competitive dynamics.',
      'Mapped and prioritized 15 hospitals in Chennai across Tier A and Tier B segments, ensuring adherence to high standards and NABH accreditation criteria.',
      'Performed competitive and gap analysis across technology, service integration, compliance, workforce, accountability, and ESG dimensions to evaluate market opportunities for Bluesquad.',
      'Developed SWOT analysis, target-market insights, phased go-to-market recommendations, and preliminary business model and pricing strategies for the high-value market.',
      'Synthesized and cross-verified secondary research from multiple industry sources, prepared a structured market research report, and presented strategic findings directly to the management team.'
    ],
    skillsUsed: [
      'Market Research',
      'B2B Competitive Analysis',
      'SWOT & Gap Analysis',
      'NABH Hospital Mapping',
      'Go-to-Market Strategy',
      'ESG Assessment',
      'Executive Presentation'
    ],
    deliverables: [
      '15-Hospital Prioritization Matrix (Tier A/B NABH-accredited facilities in Chennai)',
      'Multi-dimensional Bluesquad Gap Analysis across 6 operational pillars',
      'Phased Go-to-Market & Pricing Strategy Deck for Executive Management'
    ],
    highlightMetric: '15 NABH Hospitals Mapped & 6-Pillar Gap Analysis'
  },
  {
    id: 'vagayil-holydays',
    role: 'Homestay Operations & Digital Support',
    company: 'Vagayil Holydays — Family-Owned Homestay',
    location: 'Idukki, Kerala',
    period: 'Ongoing / Part-time',
    type: 'Family Business',
    description: [
      'Gained practical exposure to day-to-day operations of a family-owned homestay in the tourism and hospitality sector in the Western Ghats region.',
      'Assisted with guest-related activities and developed an understanding of customer expectations, guest journeys, and personalized hospitality services.',
      'Observed and supported aspects of homestay promotion, customer communication, and service presentation across digital channels.',
      'Explored opportunities to strengthen the homestay’s digital presence by conceptualizing and creating a website prototype for future customer-facing booking.',
      'Developed a practical understanding of how customer experience, online presence, and service quality directly drive bookings and retention in a small tourism business.'
    ],
    skillsUsed: [
      'Customer Experience (CX)',
      'Hospitality Operations',
      'Digital Promotion',
      'Web Prototyping',
      'Customer Communication',
      'Tourism Marketing'
    ],
    deliverables: [
      'Interactive customer-facing booking prototype concept',
      'Guest feedback and communication review framework',
      'Local scenic itinerary guidance for inbound tourists'
    ],
    highlightMetric: 'Hands-on Hospitality & Digital Presence Prototype'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'ssihl-bba',
    institution: 'Sri Sathya Sai Institute of Higher Learning',
    degree: 'Bachelor of Business Administration (BBA Hons)',
    period: '2024 – 2027',
    location: 'India',
    highlights: [
      'Specializing in Marketing, Business Strategy, and Management Analytics',
      'Rigorous foundation in financial analysis, organizational dynamics, and consumer behavior',
      'Active participant in case studies, research presentations, and digital innovation projects'
    ]
  },
  {
    id: 'montfort-school',
    institution: 'Montfort School',
    degree: 'Higher Secondary (Class XII) & Secondary (Class X)',
    period: 'Completed',
    location: 'Anakkara, Kerala',
    highlights: [
      'Holistic academic background with strong communication, teamwork, and co-curricular leadership',
      'Disciplined foundation in analytical reasoning and collaborative community initiatives'
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'atsuya-hospital-fm',
    title: 'Hospital Facility Management B2B Market Study',
    tagline: 'Strategic Gap & Opportunity Analysis for Bluesquad in Chennai Tier A/B Healthcare',
    category: 'Market Research & Strategy',
    status: 'Completed',
    description:
      'A thorough B2B market research project analyzing India’s hospital facility-management sector. Focused on evaluating unmet needs, regulatory NABH compliance burdens, and competitive gaps across 15 premier hospitals in Chennai to formulate go-to-market strategies for Atsuya’s Bluesquad.',
    problemSolved:
      'Hospitals face fragmented facility management with lack of real-time accountability, workforce compliance risks, and rising ESG audit demands. Traditional vendors fail to integrate technology with physical operations.',
    keyFeatures: [
      'Prioritization matrix mapping 15 Chennai Tier A and Tier B hospitals with NABH accreditation',
      'Six-dimension gap analysis: Technology, Service Integration, Compliance, Workforce, Accountability, ESG',
      'Phased go-to-market roadmap with tiered subscription and performance-based pricing models',
      'Executive deck and structured research documentation presented to senior leadership'
    ],
    technologies: [
      'Market Research',
      'SWOT Analysis',
      'Gap Analysis',
      'MS Excel',
      'PowerPoint',
      'Secondary Data Triangulation'
    ],
    role: 'Market Research & Analysis Intern',
    imageUrl: '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg',
    isFeatured: true
  },
  {
    id: 'connect-with-farmers',
    title: 'Connect With Farmers',
    tagline: '“Fair Prices for Farmers, Fresh Supply for Institutions.”',
    category: 'Digital Marketplace',
    status: 'Prototype',
    description:
      'A conceptualized digital marketplace prototype designed to connect agricultural producers directly with bulk institutional buyers (hostels, hospitals, canteens) to eliminate intermediaries and secure transparent pricing.',
    problemSolved:
      'Agricultural producers suffer from low farm-gate realizations due to multi-layered middlemen, while institutions overpay for inconsistent quality and unpredictable delivery schedules.',
    keyFeatures: [
      'Direct farm-to-institution listing interface with transparent spot pricing',
      'Streamlined bulk procurement request workflow for institutional kitchens',
      'Produce grading criteria and freshness harvest schedule tracker',
      'Interactive prototype layout planned and structured using AI-assisted prototyping tools'
    ],
    technologies: [
      'Web Prototyping',
      'AI-Assisted Development',
      'User Flow Architecture',
      'Marketplace Economics',
      'Prompt Engineering'
    ],
    role: 'Product Concept & UI Prototype Lead',
    imageUrl: '/src/assets/images/project_connect_farmers_1790490485044.jpg',
    githubUrl: 'https://github.com/madhithyan910-creator',
    liveUrl: 'https://connect-with-farmers.vercel.app/',
    isFeatured: true
  },
  {
    id: 'afcat-master',
    title: 'AFCAT Master',
    tagline: 'Interactive web platform focused on Air Force Common Admission Test preparation.',
    category: 'EdTech & Learning',
    status: 'Prototype',
    description:
      'An interactive educational web platform built for aspirants preparing for the AFCAT (Air Force Common Admission Test). Combines structured syllabus modules, timed practice tests, and performance reviews, reflecting personal interest in defense, learning platforms, and digital product development.',
    problemSolved:
      'Aspirants often struggle with scattered study materials, non-intuitive test interfaces, and lack of streamlined revision tools tailored specifically to the AFCAT exam format.',
    keyFeatures: [
      'Interactive mock test interface replicating real computer-based exam conditions',
      'Subject-wise breakdown covering Numerical Ability, Verbal Ability, Reasoning, and General Awareness',
      'Progress tracking and personalized error review logs',
      'Clean user experience conceptualized and developed with AI-assisted workflows'
    ],
    technologies: [
      'Web Prototyping',
      'VS Code',
      'Interactive UI Design',
      'AI-Assisted Development',
      'Prompt Engineering'
    ],
    role: 'Creator & Product Designer',
    imageUrl: '/src/assets/images/project_afcat_master_1790490496422.jpg',
    githubUrl: 'https://github.com/madhithyan910-creator',
    liveUrl: 'https://afcat-master.vercel.app/',
    isFeatured: true
  },
  {
    id: 'vagayil-holydays-web',
    title: 'Vagayil Holydays Homestay Website Prototype',
    tagline: 'Modern customer-facing booking and experiential web presence for a family homestay.',
    category: 'Hospitality & Web',
    status: 'Prototype',
    description:
      'Designed a prototype website for the family-owned homestay in Idukki, Kerala, to establish a direct digital booking channel, showcase local plantation experiences, and elevate customer service presentation.',
    problemSolved:
      'Small homestays lose substantial margins to third-party OTA commissions and struggle to communicate authentic localized hospitality and scenic heritage directly to prospective travelers.',
    keyFeatures: [
      'Immersive room showcase with high-definition photography and amenity highlights',
      'Direct inquiry and reservation inquiry workflow reducing OTA commission dependency',
      'Curated Idukki travel guides highlighting nearby spice plantations and trekking trails',
      'Mobile-responsive layout optimized for fast loading on rural networks'
    ],
    technologies: [
      'Web Prototyping',
      'AI-Assisted Prototyping',
      'UI/UX Architecture',
      'Content Strategy',
      'Hospitality CX'
    ],
    role: 'Digital Strategist & Web Prototype Designer',
    imageUrl: '/src/assets/images/project_vagayil_holydays_1790490507433.jpg',
    githubUrl: 'https://github.com/madhithyan910-creator',
    liveUrl: 'https://vagayilholydays.vercel.app/',
    isFeatured: true
  },
  {
    id: 'independent-projects',
    title: 'Independent Projects: Private Social Platform & Personal AI',
    tagline: 'Community-focused private networking and hands-on AI model experimentation.',
    category: 'Independent / AI',
    status: 'Ongoing',
    description:
      'A dual ongoing initiative focused on: (1) Building a private, limited-access social networking platform optimized for trusted community interaction, and (2) Experimenting with personal AI models and prompt pipelines to automate analytical workflows.',
    problemSolved:
      'Mainstream social networks suffer from noise and privacy concerns for small close-knit cohorts; while standard business analytics workflows lack personalized AI assistance tailored to student and business research.',
    keyFeatures: [
      'Private authenticated access gate for trusted closed-group communities',
      'Custom prompt sequences for automated research synthesis and data normalization',
      'Continuous learning in code reading, modification, and modern AI tool integration',
      'Iterative testing of model behaviors across reasoning and content structuring'
    ],
    technologies: [
      'Generative AI Tools',
      'Prompt Engineering',
      'VS Code',
      'Code Reading & Modification',
      'Community UX'
    ],
    role: 'Independent Researcher & Builder',
    imageUrl: '/src/assets/images/adhithyan_m_portrait_1790490458597.jpg',
    githubUrl: 'https://github.com/madhithyan910-creator',
    isFeatured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Marketing & Business',
    description: 'Strategic market research, segmentation, and commercial analysis grounded in real B2B projects.',
    skills: [
      'Market Research & Competitive Analysis',
      'Digital Marketing',
      'Business Strategy',
      'Customer & Market Segmentation',
      'SWOT & Gap Analysis',
      'Business Presentation & Reporting'
    ]
  },
  {
    category: 'Digital & Analytical',
    description: 'Data crunching, reporting, database querying, and rapid functional interface prototyping.',
    skills: [
      'MS Excel',
      'PowerPoint',
      'Tableau',
      'MySQL',
      'Tally',
      'Basic Data Analysis',
      'Web Prototyping'
    ]
  },
  {
    category: 'AI-Assisted Development',
    description: 'Practical leveraging of generative AI tools to architect, build, and modify digital products.',
    skills: [
      'Creative Usage of AI Models',
      'VS Code',
      'Prompt Engineering',
      'Code Reading & Modification',
      'Generative AI Tools'
    ]
  },
  {
    category: 'Professional & Leadership',
    description: 'Collaborative, analytical, and communication skills cultivated through internships and academics.',
    skills: [
      'Communication',
      'Teamwork',
      'Problem Solving',
      'Leadership',
      'Research and Information Synthesis'
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: 'Social Media & Digital Marketing',
    focus: 'Multi-channel digital marketing campaigns, audience targeting, and brand building strategies.'
  },
  {
    name: 'Excel for Business',
    focus: 'Advanced spreadsheet formulas, business financial modeling, pivot tables, and data presentation.'
  },
  {
    name: 'Data Analytics Basics',
    focus: 'Core analytical principles, data cleaning, exploratory data analysis, and dashboard visualization.'
  },
  {
    name: 'Prompt Engineering',
    focus: 'Structured reasoning prompts, context framing, and generative AI tool integration for business solutions.'
  }
];

export const LANGUAGES = [
  { language: 'English', proficiency: 'Professional Working Proficiency' },
  { language: 'Malayalam', proficiency: 'Native Speaker' },
  { language: 'Tamil', proficiency: 'Conversational' },
  { language: 'Telugu', proficiency: 'Basic Comprehension' },
  { language: 'Hindi', proficiency: 'Reading & Writing (Non-speaking)' }
];

export const INTERESTS = [
  { name: 'Reading', description: 'Business biographies, strategic market reports, and technological shifts' },
  { name: 'Music', description: 'Acoustic and instrumental compositions that aid deep analytical focus' },
  { name: 'Football', description: 'Team sport fostering tactical thinking, discipline, and rapid decision-making' },
  { name: 'Calisthenics', description: 'Bodyweight training emphasizing physical consistency and mental resilience' },
  { name: 'Dance', description: 'Creative rhythm, expressive movement, and cultural appreciation' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'b2b-hospital-facility-management-research',
    title: 'Deconstructing B2B Healthcare Facility Management: A Gap Analysis in Chennai Tier A/B Hospitals',
    summary:
      'Key takeaways from conducting market research across 15 NABH-accredited Chennai hospitals, evaluating ESG pressures, workforce accountability, and technology integration for Bluesquad.',
    category: 'Market Research',
    publishedDate: 'June 2026',
    readTime: '6 min read',
    author: 'Adhithyan M.',
    tags: ['Market Research', 'Healthcare B2B', 'Gap Analysis', 'SWOT', 'NABH Accreditation'],
    imageUrl: '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg',
    relatedProjectIds: ['atsuya-hospital-fm'],
    content: `
During my internship at Atsuya Technologies Pvt. Ltd. in Chennai, I led secondary research and competitive gap analysis for Bluesquad in India's hospital facility-management sector. 

Facility management in modern healthcare is fundamentally different from commercial real estate. In a hospital, facility downtime or compliance lapses directly threaten patient outcomes and accreditation.

### The 15-Hospital Prioritization Matrix
We focused on 15 prioritized hospitals in Chennai across Tier A and Tier B segments. Each institution was assessed against National Accreditation Board for Hospitals & Healthcare Providers (NABH) standards.

Key findings included:
1. **The Technology-Operations Disconnect**: While hospitals invest heavily in medical diagnostic tech, their underlying facilities (HVAC, bio-medical waste compliance, sterilization tracking, energy monitoring) remain fragmented across disconnected vendors.
2. **Accountability & Workforce Vulnerability**: High turnover among facility staff causes non-compliance risks during surprise NABH audits. Hospitals expressed urgent willingness to adopt solutions with verifiable digital audit trails.
3. **The Emerging ESG Imperative**: Tier A private hospitals are facing corporate governance requirements regarding energy efficiency and water recycling.

### Recommended Phased Go-to-Market
Rather than proposing an all-or-nothing system replacement, our team recommended a phased roll-out:
- Phase 1: High-impact compliance and asset uptime monitoring.
- Phase 2: Predictive energy management and workforce roster validation.
- Phase 3: Comprehensive ESG audit-readiness dashboard.

This framework demonstrated how rigorous secondary research can directly inform executive product strategy and pricing structure.
    `
  },
  {
    id: 'post-2',
    slug: 'ai-assisted-prototyping-for-business-students',
    title: 'How Business Students Can Leverage AI-Assisted Prototyping to Validate Ideas in Days',
    summary:
      'Moving from static slide decks to interactive web prototypes. How tools like VS Code, prompt engineering, and modern AI frameworks enable rapid market testing.',
    category: 'AI & Prototyping',
    publishedDate: 'July 2026',
    readTime: '5 min read',
    author: 'Adhithyan M.',
    tags: ['AI-Assisted Development', 'Product Design', 'Rapid Prototyping', 'Prompt Engineering'],
    imageUrl: '/src/assets/images/project_connect_farmers_1790490485044.jpg',
    relatedProjectIds: ['connect-with-farmers', 'afcat-master'],
    content: `
In traditional business education, students are taught to document business models in Word documents and PowerPoint slides. While theoretical rigor is essential, slides cannot be clicked, tested by actual users, or verified under real load.

Through projects like **Connect With Farmers** and **AFCAT Master**, I adopted an AI-assisted development workflow that bridges business strategy and interactive code.

### The 3-Step Prototyping Loop
1. **Problem Definition & Information Architecture**: Before generating any code, sketch user flows and value loops. For Connect With Farmers, the core loop was: Farmer listings -> Bulk demand requests -> Price transparent matching.
2. **Structured Prompt Framing**: Rather than asking for generic code, feed specific interface states, responsive grid constraints, and domain-native terminology.
3. **Code Reading & Iterative Modification**: An understanding of HTML, CSS, and component structure in VS Code allows you to fine-tune typography, fix UX frictions, and remove bloated code.

By combining business insight with modern development tooling, aspiring marketers and product managers can deliver tangible proof of concept to stakeholders in days rather than months.
    `
  },
  {
    id: 'post-3',
    slug: 'small-tourism-digital-cx-homestay-lessons',
    title: 'Customer Experience Lessons from Family Homestay Operations in Idukki, Kerala',
    summary:
      'What running a boutique homestay in the Western Ghats taught me about guest expectations, word-of-mouth marketing, and the importance of a direct digital booking footprint.',
    category: 'Hospitality Operations',
    publishedDate: 'August 2026',
    readTime: '4 min read',
    author: 'Adhithyan M.',
    tags: ['Customer Experience', 'Hospitality', 'Tourism Marketing', 'Small Business Strategy'],
    imageUrl: '/src/assets/images/project_vagayil_holydays_1790490507433.jpg',
    relatedProjectIds: ['vagayil-holydays-web'],
    content: `
Growing up with hands-on exposure to our family-owned homestay, Vagayil Holydays, in the serene tea-plantation hills of Idukki, I observed the mechanics of customer satisfaction at ground level.

Hospitality is where marketing promises either convert into lifelong brand champions or dissolve into negative reviews.

### Three Crucial Observations:
- **The Expectation-Reality Ratio**: Guests don’t expect five-star luxury from an authentic homestay; they expect absolute cleanliness, heartfelt warmth, prompt communication, and genuine local food.
- **The OTA Dependency Trap**: Over-relying on aggregator platforms cuts profit margins by 15-20% and strips away the personal connection before arrival.
- **Micro-Touchpoints Matter**: A handwritten welcome note, a customized map to a secluded waterfall, or fresh cardamom tea upon check-in generate exponentially higher organic recommendations than paid ads.

Designing our homestay website prototype reinforced how digital storytelling must reflect the calm, grounded reality of the physical property.
    `
  },
  {
    id: 'post-4',
    slug: 'agritech-institutional-sourcing-economics',
    title: 'Disintermediating Agricultural Supply Chains: Pricing Transparency for Farmers and Hostels',
    summary:
      'An economic and operational breakdown behind the “Connect With Farmers” marketplace concept, balancing farmer remuneration with institutional bulk purchasing.',
    category: 'Digital Strategy',
    publishedDate: 'September 2026',
    readTime: '5 min read',
    author: 'Adhithyan M.',
    tags: ['AgriTech', 'Marketplace Strategy', 'Supply Chain', 'Fair Pricing'],
    imageUrl: '/src/assets/images/project_connect_farmers_1790490485044.jpg',
    relatedProjectIds: ['connect-with-farmers'],
    content: `
In many regional districts, smallholders sell produce at farm-gate prices that barely cover cultivation costs, while college hostels and hospital canteens pay inflated prices to wholesale distributors.

### The Double-Sided Incentive Structure
The tagline for Connect With Farmers is: *"Fair Prices for Farmers, Fresh Supply for Institutions."*

To make a two-sided digital marketplace viable, both sides must solve an immediate pain point:
- **For Farmers**: Guaranteed bulk uptake, scheduled harvest dispatch dates, and elimination of speculative commission agents.
- **For Institutions**: Consistent delivery standards, verified produce freshness, and predictable budget forecasting.

Building this prototype demonstrated how interface design must encode business safeguards—such as lot inspection confirmations and advance dispatch notices—to create trust between unfamiliar parties.
    `
  }
];

export const INITIAL_ASSETS: AssetRecord[] = [
  {
    id: 'asset-resume-pdf',
    name: 'Adhithyan_M_Official_Resume_2026.pdf',
    description: 'Latest verified 1-page resume of Adhithyan M. (BBA Hons, Atsuya Technologies Intern, Marketing & AI Projects)',
    fileType: 'pdf',
    mimeType: 'application/pdf',
    fileSize: 142800,
    uploadDate: '2026-09-26',
    category: 'Resumes',
    tags: ['Resume', 'CV', 'Official', 'Adhithyan M', 'BBA'],
    isPrivate: false,
    url: '#resume-preview'
  },
  {
    id: 'asset-portrait-headshot',
    name: 'Adhithyan_M_Studio_Headshot.jpg',
    description: 'High-resolution professional executive headshot in navy blazer for LinkedIn, portfolio hero, and press kits',
    fileType: 'image',
    mimeType: 'image/jpeg',
    fileSize: 485000,
    uploadDate: '2026-09-26',
    category: 'Profile Images',
    tags: ['Headshot', 'Portrait', 'Profile', 'Formal'],
    isPrivate: false,
    url: '/src/assets/images/adhithyan_m_portrait_1790490458597.jpg',
    dimensions: '1024x1024'
  },
  {
    id: 'asset-atsuya-report',
    name: 'Atsuya_Technologies_B2B_Healthcare_FM_Report_Summary.pdf',
    description: 'Structured market research report on 15 Chennai NABH hospitals and Bluesquad gap analysis',
    fileType: 'document',
    mimeType: 'application/pdf',
    fileSize: 1820000,
    uploadDate: '2026-06-30',
    category: 'Project Documents',
    tags: ['Atsuya', 'Market Research', 'Healthcare', 'Bluesquad', 'NABH'],
    isPrivate: false,
    associatedProjectId: 'atsuya-hospital-fm',
    url: '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg'
  },
  {
    id: 'asset-atsuya-slide-deck',
    name: 'Bluesquad_Go_To_Market_Strategy_Deck.pptx',
    description: 'Executive management presentation deck covering market sizing, SWOT, and phased pricing models',
    fileType: 'presentation',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    fileSize: 3450000,
    uploadDate: '2026-06-28',
    category: 'Presentations',
    tags: ['Presentation', 'Slides', 'GTM', 'Pricing Model'],
    isPrivate: true,
    associatedProjectId: 'atsuya-hospital-fm',
    url: '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg'
  },
  {
    id: 'asset-farmers-prototype-shot',
    name: 'Connect_With_Farmers_UI_Prototype.png',
    description: 'Full interface architecture and produce matching user flow for rural farmers and institutional buyers',
    fileType: 'image',
    mimeType: 'image/png',
    fileSize: 720000,
    uploadDate: '2026-08-15',
    category: 'Screenshots',
    tags: ['ConnectWithFarmers', 'Prototype', 'Marketplace', 'UI Flow'],
    isPrivate: false,
    associatedProjectId: 'connect-with-farmers',
    url: '/src/assets/images/project_connect_farmers_1790490485044.jpg',
    dimensions: '1920x1080'
  },
  {
    id: 'asset-afcat-platform-shot',
    name: 'AFCAT_Master_Exam_Interface.png',
    description: 'Screenshot of the computer-based mock exam simulator with timer and question navigation',
    fileType: 'image',
    mimeType: 'image/png',
    fileSize: 640000,
    uploadDate: '2026-07-20',
    category: 'Screenshots',
    tags: ['AFCAT Master', 'EdTech', 'Exam Mock', 'Defense'],
    isPrivate: false,
    associatedProjectId: 'afcat-master',
    url: '/src/assets/images/project_afcat_master_1790490496422.jpg',
    dimensions: '1920x1080'
  },
  {
    id: 'asset-vagayil-homestay-photo',
    name: 'Vagayil_Holydays_Homestay_Estate.jpg',
    description: 'Scenic landscape view of Vagayil Holydays homestay with Western Ghats tea plantations and mist',
    fileType: 'image',
    mimeType: 'image/jpeg',
    fileSize: 910000,
    uploadDate: '2026-05-10',
    category: 'Project Images',
    tags: ['Vagayil Holydays', 'Homestay', 'Idukki', 'Kerala', 'Tourism'],
    isPrivate: false,
    associatedProjectId: 'vagayil-holydays-web',
    url: '/src/assets/images/project_vagayil_holydays_1790490507433.jpg',
    dimensions: '1920x1080'
  },
  {
    id: 'asset-cert-digital-marketing',
    name: 'Certificate_Social_Media_Digital_Marketing.pdf',
    description: 'Professional credential in digital advertising, social media strategy, and audience segmentation',
    fileType: 'document',
    mimeType: 'application/pdf',
    fileSize: 320000,
    uploadDate: '2026-04-12',
    category: 'Certificates',
    tags: ['Certificate', 'Digital Marketing', 'Social Media'],
    isPrivate: false,
    url: '#certificate-view'
  },
  {
    id: 'asset-cert-prompt-engineering',
    name: 'Certificate_Prompt_Engineering_AI.pdf',
    description: 'Certification in advanced prompt structuring, reasoning models, and AI workflow integration',
    fileType: 'document',
    mimeType: 'application/pdf',
    fileSize: 290000,
    uploadDate: '2026-05-02',
    category: 'Certificates',
    tags: ['Certificate', 'Prompt Engineering', 'Generative AI'],
    isPrivate: false,
    url: '#certificate-view'
  },
  {
    id: 'asset-farmers-pitch-deck',
    name: 'Connect_With_Farmers_Investor_Pitch_Deck.pptx',
    description: 'Executive presentation pitch deck: market size, fair-pricing economics, institutional procurement user flows, and unit economics',
    fileType: 'presentation',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    fileSize: 4200000,
    uploadDate: '2026-08-20',
    category: 'Presentations',
    tags: ['ConnectWithFarmers', 'Pitch Deck', 'AgriTech', 'Presentation', 'PPT'],
    isPrivate: false,
    associatedProjectId: 'connect-with-farmers',
    url: 'https://connect-with-farmers.vercel.app/'
  },
  {
    id: 'asset-afcat-product-spec',
    name: 'AFCAT_Master_Product_Architecture_Spec.pdf',
    description: 'Comprehensive product requirement document, syllabus breakdown, mock test timer logic, and UX flow diagrams',
    fileType: 'document',
    mimeType: 'application/pdf',
    fileSize: 2150000,
    uploadDate: '2026-07-28',
    category: 'Project Documents',
    tags: ['AFCAT Master', 'PRD', 'Specification', 'EdTech', 'Exam'],
    isPrivate: false,
    associatedProjectId: 'afcat-master',
    url: 'https://afcat-master.vercel.app/'
  },
  {
    id: 'asset-vagayil-homestay-deck',
    name: 'Vagayil_Holydays_Tourism_Promotion_Deck.pptx',
    description: 'Visual slide deck showcasing Western Ghats tea estate heritage, customer experience touchpoints, and digital booking roadmap',
    fileType: 'presentation',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    fileSize: 5100000,
    uploadDate: '2026-05-18',
    category: 'Presentations',
    tags: ['Vagayil Holydays', 'Hospitality', 'Slides', 'Presentation', 'Tourism', 'PPT'],
    isPrivate: false,
    associatedProjectId: 'vagayil-holydays-web',
    url: 'https://vagayilholydays.vercel.app/'
  },
  {
    id: 'asset-atsuya-hospital-matrix',
    name: 'Atsuya_15_Chennai_Hospitals_NABH_Matrix.xlsx',
    description: 'Detailed competitive scoring spreadsheet across Tier A and Tier B Chennai hospitals, bed counts, facility gaps, and ESG readiness',
    fileType: 'spreadsheet',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileSize: 680000,
    uploadDate: '2026-06-25',
    category: 'Project Documents',
    tags: ['Atsuya', 'Excel', 'Matrix', 'NABH', 'Hospital FM', 'Data'],
    isPrivate: false,
    associatedProjectId: 'atsuya-hospital-fm',
    url: '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg'
  },
  {
    id: 'asset-cert-excel-business',
    name: 'Certificate_Excel_For_Business.pdf',
    description: 'Verified professional certification in financial modeling, advanced lookups, pivot tables, and dashboard creation',
    fileType: 'document',
    mimeType: 'application/pdf',
    fileSize: 310000,
    uploadDate: '2026-03-22',
    category: 'Certificates',
    tags: ['Certificate', 'Excel', 'Data', 'Spreadsheets'],
    isPrivate: false,
    url: '#certificate-view'
  },
  {
    id: 'asset-cert-data-analytics',
    name: 'Certificate_Data_Analytics_Basics.pdf',
    description: 'Verified certification covering exploratory data analysis, metric normalization, and data-driven decision frameworks',
    fileType: 'document',
    mimeType: 'application/pdf',
    fileSize: 295000,
    uploadDate: '2026-04-05',
    category: 'Certificates',
    tags: ['Certificate', 'Data Analytics', 'Tableau', 'Reporting'],
    isPrivate: false,
    url: '#certificate-view'
  }
];
