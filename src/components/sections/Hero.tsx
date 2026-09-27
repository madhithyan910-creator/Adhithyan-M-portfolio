import { FileText, ArrowRight, Mail, Github, Linkedin, MapPin, Building2, Sparkles, GraduationCap } from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { PROFILE as defaultProfile } from '../../data/initialData';

interface HeroProps {
  profile?: ProfileData;
}

export function Hero({ profile = defaultProfile }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed availability line (No pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Internships & Entry-Level Roles</span>
              <span aria-hidden="true">·</span>
              <span>Class of 2027</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.location}</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {profile.name}
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-blue-600 dark:text-blue-400">
                {profile.title}
              </p>
            </div>

            {/* Recruiter Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {profile.summary}
            </p>

            {/* Quick Proof Metrics / Highlights (Strictly from resume) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Market Research</span>
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Atsuya Technologies
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  15 NABH Hospitals Mapped
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Prototyping</span>
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  AI-Assisted Products
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  AgriTech, EdTech, Tourism
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                  <span>Education</span>
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  SSSIHL (BBA)
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  2024 – 2027 Cohort
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#resume"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <span>Selected Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 rounded-lg transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Contact links */}
            <div className="pt-2 flex items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/{profile.githubUsername}</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Portrait & Structural Framing (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer structural frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xl aspect-square">
                <img
                  src={profile.photoUrl}
                  alt={`Portrait of ${profile.name}, BBA student and marketing researcher`}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to styled SVG container if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 text-center">
                          <span class="text-4xl font-bold font-display mb-2">AM</span>
                          <span class="text-lg font-semibold">${profile.name}</span>
                          <span class="text-xs text-blue-300 mt-1">${profile.title}</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Quiet Floating Credential Card at corner */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 dark:bg-[#12161E]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-lg max-w-xs space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Primary Source of Truth
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  Resume-Grounded Experience
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Atsuya Technologies · Vagayil Holydays · SSSIHL
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
