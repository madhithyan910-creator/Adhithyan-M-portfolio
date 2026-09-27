import { useState } from 'react';
import { Download, Printer, Copy, Check, FileText, ExternalLink, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { PROFILE as defaultProfile, EXPERIENCES, EDUCATION, SKILL_CATEGORIES, CERTIFICATIONS, LANGUAGES, INTERESTS, PROJECTS } from '../../data/initialData';

interface ResumeSectionProps {
  profile?: ProfileData;
}

export function ResumeSection({ profile = defaultProfile }: ResumeSectionProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTextCV = () => {
    const textCV = `
ADHITHYAN M
${profile.title}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}
GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}

PROFESSIONAL SUMMARY
${profile.summary}

EXPERIENCE
1. ${EXPERIENCES[0].role} — ${EXPERIENCES[0].company} (${EXPERIENCES[0].period})
${EXPERIENCES[0].description.map(d => `• ${d}`).join('\n')}

2. ${EXPERIENCES[1].role} — ${EXPERIENCES[1].company} (${EXPERIENCES[1].period})
${EXPERIENCES[1].description.map(d => `• ${d}`).join('\n')}

SELECTED PROJECTS
${PROJECTS.map(p => `• ${p.title} (${p.category}): ${p.description}`).join('\n')}

EDUCATION
• ${EDUCATION[0].institution} — ${EDUCATION[0].degree} (${EDUCATION[0].period})
• ${EDUCATION[1].institution} — ${EDUCATION[1].degree} (${EDUCATION[1].period})

SKILLS
${SKILL_CATEGORIES.map(c => `${c.category}: ${c.skills.join(', ')}`).join('\n')}

CERTIFICATIONS
${CERTIFICATIONS.map(c => `• ${c.name} — ${c.focus}`).join('\n')}

LANGUAGES
${LANGUAGES.map(l => `• ${l.language} (${l.proficiency})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="resume" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-16 bg-white dark:bg-[#07090D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Recruiter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 no-print">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Verified Curriculum Vitae
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Official Resume Preview
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Standardized 1-page executive format formatted for ATS parsing and senior recruiter review.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              title="Print directly or save as PDF via system dialog"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF / Print</span>
            </button>

            <button
              onClick={handleCopyTextCV}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Copy plain-text CV to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Plain Text'}</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-slate-400 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Request Referral / Interview</span>
            </a>
          </div>
        </div>

        {/* The 1-Page Resume Paper Container */}
        <div
          id="resume-section"
          className="mx-auto max-w-4xl bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 transition-all print:p-0 print:border-none print:shadow-none"
        >
          {/* Resume Header */}
          <div className="border-b-2 border-slate-800 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                  {profile.name}
                </h1>
                <p className="text-sm font-semibold text-slate-700">
                  {profile.title}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1 font-mono">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-700" />
                    <span>{profile.email}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-700" />
                    <span>{profile.phone}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-700" />
                    <span>{profile.location}</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-700 pt-0.5">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                    <Github className="w-3.5 h-3.5" />
                    <span>github.com/{profile.githubUsername}</span>
                  </a>
                  <span>·</span>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>linkedin.com/in/</span>
                  </a>
                </div>
              </div>

              {/* Headshot thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-100">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* 2-Column Resume Body Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Main Column: Summary, Experience, Selected Projects (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Professional Summary */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {profile.summary}
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Experience
                </h2>

                {/* Atsuya Tech */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>Marketing Research & Analysis Intern</span>
                    <span className="font-mono text-[11px] text-slate-600 font-normal">May 2026 – June 2026</span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic">
                    Atsuya Technologies Pvt. Ltd. — Chennai, Tamil Nadu
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700 pt-1 leading-normal">
                    <li>Conducted comprehensive B2B market research on India’s hospital facility-management sector, analyzing market trends, growth drivers, customer needs, and competitive dynamics.</li>
                    <li>Mapped prioritized 15 hospitals in Chennai across Tier A and Tier B segments, ensuring high standards and NABH accreditation.</li>
                    <li>Performed competitive and gap analysis across technology, service integration, compliance, workforce, accountability, and ESG dimensions to evaluate market opportunities for Bluesquad.</li>
                    <li>Developed SWOT analysis, target-market insights, phased go-to-market recommendations, and preliminary business model and pricing strategies for the high-value market.</li>
                    <li>Synthesized and cross-verified secondary research from multiple industry sources, prepared a structured market research report, and presented findings to the management team.</li>
                  </ul>
                </div>

                {/* Vagayil Holydays */}
                <div className="space-y-1 text-xs pt-1">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>Homestay Operations & Digital Support</span>
                    <span className="font-mono text-[11px] text-slate-600 font-normal">Family Business / Part-time</span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic">
                    Vagayil Holydays — Family-Owned Homestay, Idukki, Kerala
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700 pt-1 leading-normal">
                    <li>Gained practical exposure to day-to-day operations of a family-owned homestay in the tourism and hospitality sector.</li>
                    <li>Assisted with guest-related activities and developed an understanding of customer expectations and hospitality services.</li>
                    <li>Observed and supported aspects of homestay promotion, customer communication, and service presentation.</li>
                    <li>Explored opportunities to strengthen the homestay’s digital presence by conceptualising and creating a website prototype for future use.</li>
                    <li>Developed practical understanding of how customer experience, online presence, and service quality contribute to a small tourism business.</li>
                  </ul>
                </div>
              </div>

              {/* Selected Projects */}
              <div className="space-y-3">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Selected Projects
                </h2>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">
                      AFCAT Master <span className="font-normal italic text-slate-600 text-[11px]">| Personal Project</span>
                    </div>
                    <p className="text-[11px] text-slate-700">
                      Interactive web platform focused on AFCAT preparation, reflecting interest in defence, learning platforms and digital product development. Planned content, user experience and features using AI-Assisted tools.
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Connect With Farmers <span className="font-normal italic text-slate-600 text-[11px]">| Digital Marketplace Prototype</span>
                    </div>
                    <p className="text-[11px] text-slate-700">
                      Conceptualised and created a prototype connecting farmers directly with institutions to support transparent pricing and streamlined sourcing. Built product concept, user flow and interface structure using AI-Assisted development. TAGLINE: “Fair Prices for Farmers, Fresh Supply for Institutions.”
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Vagayil Holydays <span className="font-normal italic text-slate-600 text-[11px]">| Homestay Website Prototype</span>
                    </div>
                    <p className="text-[11px] text-slate-700">
                      Designed a prototype website for a family-owned homestay to explore a future digital presence and customer-facing booking experience. Planned web structure and user experience using AI-Assisted development.
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Independent Projects <span className="font-normal italic text-slate-600 text-[11px]">| Ongoing</span>
                    </div>
                    <p className="text-[11px] text-slate-700">
                      Private social networking platform (limited access, community-focused) and personal AI model experimentation for analytical automation.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side Column: Education, Skills, Certifications, Languages, Interests (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Education */}
              <div className="space-y-2">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Education
                </h2>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">
                      Sri Sathya Sai Institute of Higher Learning
                    </div>
                    <div className="text-[11px] text-slate-700">
                      Bachelor of Business Administration (BBA)
                    </div>
                    <div className="text-[10px] font-mono text-slate-600">
                      2024 – 2027
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Montfort School, Anakkara, Kerala
                    </div>
                    <div className="text-[11px] text-slate-700">
                      Higher Secondary (Class XII) & Secondary (Class X)
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Skills
                </h2>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">
                      Marketing & Business
                    </div>
                    <p className="text-[10.5px] text-slate-700 leading-tight">
                      Market Research & Competitive Analysis, Digital Marketing, Business Strategy, Customer & Market Segmentation, SWOT & Gap Analysis, Business Presentation & Reporting
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">
                      Digital & Analytical
                    </div>
                    <p className="text-[10.5px] text-slate-700 leading-tight">
                      MS Excel, PowerPoint, Tableau, MySQL, Tally, Basic Data Analysis, Web Prototyping
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">
                      AI-Assisted Development
                    </div>
                    <p className="text-[10.5px] text-slate-700 leading-tight">
                      Creative Usage of AI Models, VS Code, Prompt Engineering, Code Reading & Modification, Generative AI Tools
                    </p>
                  </div>

                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">
                      Professional
                    </div>
                    <p className="text-[10.5px] text-slate-700 leading-tight">
                      Communication, Teamwork, Problem Solving, Leadership, Research and Information Synthesis
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Certifications
                </h2>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] text-slate-700">
                  <li>Social Media & Digital Marketing</li>
                  <li>Excel for Business</li>
                  <li>Data Analytics Basics</li>
                  <li>Prompt Engineering</li>
                </ul>
              </div>

              {/* Languages */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Languages
                </h2>
                <ul className="space-y-0.5 text-[11px] text-slate-700">
                  <li><strong>English</strong>: Professional</li>
                  <li><strong>Malayalam</strong>: Native</li>
                  <li><strong>Tamil</strong>: Conversational</li>
                  <li><strong>Telugu</strong>: Basic comprehension</li>
                  <li><strong>Hindi</strong>: Reading & writing (non-speaking)</li>
                </ul>
              </div>

              {/* Interests */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1">
                  Interests
                </h2>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-700 font-medium">
                  <span>Reading</span>
                  <span>·</span>
                  <span>Music</span>
                  <span>·</span>
                  <span>Football</span>
                  <span>·</span>
                  <span>Calisthenics</span>
                  <span>·</span>
                  <span>Dance</span>
                </div>
              </div>

            </div>

          </div>

          {/* Footer of the Paper CV */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between items-center">
            <span>Primary source of truth: Official resume of Adhithyan M.</span>
            <span>Generated for recruiter verification · {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
