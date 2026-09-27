import { Award, CheckCircle2, LineChart, Cpu, Briefcase, Users2 } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../../data/initialData';

export function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marketing & Business':
        return <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Digital & Analytical':
        return <LineChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'AI-Assisted Development':
        return <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Professional & Leadership':
        return <Users2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-16 bg-[#F8F9FA] dark:bg-[#0A0D12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Competencies & Industry Certifications
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Skills & Qualifications
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Every competency is verified through academic training at SSSIHL, practical corporate research at Atsuya Technologies, or verified certifications.
          </p>
        </div>

        {/* 4-Category Matrix (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SKILL_CATEGORIES.map((catGroup) => (
            <div
              key={catGroup.category}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1218] p-6 sm:p-7 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-5"
            >
              {/* Header */}
              <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(catGroup.category)}
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {catGroup.category}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {catGroup.description}
                </p>
              </div>

              {/* Skills List - Clean unboxed text layout with check indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catGroup.skills.map((skill) => (
                  <div
                    key={skill}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#141A23] border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2 text-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Spotlight */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1218] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1">
                <Award className="w-4 h-4" />
                <span>Verified Credentials</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Professional Certifications
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              4 Completed Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-4 rounded-xl bg-slate-50 dark:bg-[#141A23] border border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-between space-y-2"
              >
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {cert.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {cert.focus}
                  </p>
                </div>
                <div className="pt-2 text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Verified Credential
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
