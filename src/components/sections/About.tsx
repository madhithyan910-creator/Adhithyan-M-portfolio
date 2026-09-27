import { GraduationCap, BookOpen, Compass, Globe2, Heart, Award } from 'lucide-react';
import { EDUCATION, LANGUAGES, INTERESTS } from '../../data/initialData';

export function About() {
  return (
    <section id="about" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-16 bg-white dark:bg-[#07090D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Professional Profile & Academic Foundation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            About Adhithyan
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A BBA (Hons) student grounded in business fundamentals, market research, and emerging technology tools. Combining disciplined secondary research and competitive gap analysis with hands-on AI-assisted digital prototyping.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Education & Career Direction (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Education Timeline */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Education Background</span>
              </h3>

              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] transition-colors space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                        {edu.institution}
                      </h4>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono">
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {edu.degree}
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {edu.location}
                    </div>

                    {edu.highlights && (
                      <ul className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {edu.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold shrink-0">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Interests & Target Opportunities */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Target Roles & Opportunity Focus</span>
              </h3>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Actively seeking internship and entry-level positions where analytical rigor, strategic marketing, and hands-on digital capability create immediate value:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white dark:bg-[#141A23] rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                      Marketing & Digital Strategy
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Market research, competitive benchmarking, customer segmentation, and campaign planning.
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#141A23] rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                      Business & Management
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Gap analysis, SWOT evaluation, operations support, and structured management presentations.
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#141A23] rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                      AI-Assisted Solutions
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Leveraging prompt engineering and generative AI tools to rapidly prototype and test business concepts.
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#141A23] rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                      Analytics & Reporting
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Spreadsheet modeling (Excel), Tableau visual dashboards, and database querying (MySQL).
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Languages & Personal Interests (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Languages Card */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Languages</span>
              </h3>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] divide-y divide-slate-200 dark:divide-slate-800">
                {LANGUAGES.map((lang) => (
                  <div key={lang.language} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {lang.language}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Interests Card (from resume) */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Personal Interests</span>
              </h3>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Disciplines that cultivate analytical concentration, strategic agility, and physical resilience:
                </p>

                <div className="space-y-2">
                  {INTERESTS.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 bg-white dark:bg-[#141A23] rounded-lg border border-slate-200/80 dark:border-slate-800/80 space-y-0.5"
                    >
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional Summary Quote Card */}
            <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Core Operating Philosophy</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                “Applying business knowledge and emerging technologies to solve real-world problems — transforming static research into testable digital prototypes.”
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
