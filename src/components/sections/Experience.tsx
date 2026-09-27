import { useState } from 'react';
import { Building2, MapPin, Calendar, CheckCircle2, ChevronDown, ChevronUp, Layers, TrendingUp } from 'lucide-react';
import { EXPERIENCES } from '../../data/initialData';

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>('atsuya-tech');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-16 bg-[#F8F9FA] dark:bg-[#0A0D12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Professional Experience & Practical Exposure
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Hands-on corporate internship and family business operations experience applying B2B market research, competitive analysis, and customer journey optimization.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8 max-w-4xl">
          {EXPERIENCES.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1218] p-6 sm:p-8 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{exp.type}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>

                    <div className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.period}</span>
                    </div>

                    {exp.highlightMetric && (
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {exp.highlightMetric}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Responsibilities (Always Visible) */}
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Key Responsibilities & Methodology
                  </div>

                  <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Collapsible Deep-Dive Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-6">
                    {/* Deliverables */}
                    {exp.deliverables && (
                      <div className="space-y-2.5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-blue-500" />
                          <span>Structured Deliverables</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {exp.deliverables.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-lg bg-slate-50 dark:bg-[#141A23] border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                                Deliverable 0{idx + 1}
                              </span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Competencies Applied (Rendered with unboxed zero-pill text and separators) */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Methodologies & Competencies Applied
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {exp.skillsUsed.map((skill, idx) => (
                          <span key={skill} className="flex items-center gap-2">
                            <span>{skill}</span>
                            {idx < exp.skillsUsed.length - 1 && (
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 font-bold">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand / Collapse Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Deliverable Breakdown' : 'View Deliverables & Methodology'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    Experience Ref #{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
