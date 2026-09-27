import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, FileText } from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { PROFILE as defaultProfile } from '../../data/initialData';

interface FooterProps {
  onOpenAdmin: () => void;
  profile?: ProfileData;
}

export function Footer({ onOpenAdmin, profile = defaultProfile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#07090D] transition-colors py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {profile.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {profile.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 max-w-md pt-1">
              Currently pursuing Bachelor of Business Administration (BBA Hons) at Sri Sathya Sai Institute of Higher Learning (2024–2027). Seeking entry-level roles and internships in Marketing, Strategy, and Digital Business.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About & Education
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Atsuya Technologies & Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Projects & Prototypes
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Skills & Certifications
                </a>
              </li>
              <li>
                <a href="#resume" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Official Resume / CV
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Research & Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{profile.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 rounded-lg transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 rounded-lg transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#resume"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 rounded-lg transition-colors"
                aria-label="View Resume"
                title="View Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} {profile.name}. Built strictly from verified academic and professional credentials.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              type="button"
              className="hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-2 transition-colors cursor-pointer"
            >
              CMS & Asset Library
            </button>
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
