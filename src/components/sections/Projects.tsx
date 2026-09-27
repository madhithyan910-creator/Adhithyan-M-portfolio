import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';

interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Market Research & Strategy',
    'Digital Marketplace',
    'EdTech & Learning',
    'Hospitality & Web',
    'Independent / AI'
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-16 bg-white dark:bg-[#07090D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Proof of Practical Capability
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Selected Projects & Case Studies
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Real initiatives spanning corporate B2B market research, agritech disintermediation, exam preparation, and family hospitality digitization.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Segmented control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-[#141A23] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
            >
              {/* Image Frame */}
              <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 text-xs text-slate-500">
                          ${project.title}
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.status}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic line-clamp-1">
                      {project.tagline}
                    </p>
                  )}

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Problem snippet box */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-1">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    <span>Problem Solved</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {project.problemSolved}
                  </p>
                </div>

                {/* Technologies (zero-pill separator style) */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={tech} className="flex items-center gap-1.5">
                        <span>{tech}</span>
                        {idx < Math.min(project.technologies.length, 4) - 1 && (
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                        )}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] text-slate-400">+{project.technologies.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                        title={`Open live project: ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                        title="GitHub Code"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
