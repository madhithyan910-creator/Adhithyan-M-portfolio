import { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Check, Sparkles, FolderPlus, FileText, Image as ImageIcon, Upload, X } from 'lucide-react';
import { ProjectItem, BlogPost, AssetRecord } from '../../types/portfolio';
import { StorageService } from '../../services/storage';
import { AssetLibrary } from './AssetLibrary';

interface CMSManagerProps {
  projects: ProjectItem[];
  blogPosts: BlogPost[];
  onUpdateProjects: (projects: ProjectItem[]) => void;
  onUpdateBlogPosts: (posts: BlogPost[]) => void;
}

export function CMSManager({
  projects,
  blogPosts,
  onUpdateProjects,
  onUpdateBlogPosts
}: CMSManagerProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [assetPickerTarget, setAssetPickerTarget] = useState<'project-image' | 'blog-image' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'project' | 'blog'; id: string; title: string } | null>(null);

  const projectFileInputRef = useRef<HTMLInputElement>(null);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // File upload handlers for instant local image replacement
  const handleProjectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingProject) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setEditingProject({ ...editingProject, imageUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingBlogPost) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setEditingBlogPost({ ...editingBlogPost, imageUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'project') {
      const updated = StorageService.deleteProject(deleteTarget.id);
      onUpdateProjects(updated);
    } else {
      const updated = StorageService.deleteBlogPost(deleteTarget.id);
      onUpdateBlogPosts(updated);
    }
    setDeleteTarget(null);
  };

  // Project Handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = StorageService.saveProject(editingProject);
    onUpdateProjects(updated);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string, title: string) => {
    setDeleteTarget({ type: 'project', id, title });
  };

  const handleNewProject = () => {
    setEditingProject({
      id: 'proj-' + Date.now(),
      title: '',
      tagline: '',
      category: 'Market Research & Strategy',
      status: 'Prototype',
      description: '',
      problemSolved: '',
      keyFeatures: ['Feature 1', 'Feature 2'],
      technologies: ['Market Research', 'VS Code'],
      role: 'Lead',
      imageUrl: '/src/assets/images/project_atsuya_healthcare_1790490471476.jpg'
    });
  };

  // Blog Handlers
  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogPost) return;
    const updated = StorageService.saveBlogPost(editingBlogPost);
    onUpdateBlogPosts(updated);
    setEditingBlogPost(null);
  };

  const handleDeleteBlogPost = (id: string, title: string) => {
    setDeleteTarget({ type: 'blog', id, title });
  };

  const handleNewBlogPost = () => {
    setEditingBlogPost({
      id: 'post-' + Date.now(),
      slug: 'new-insight-' + Date.now(),
      title: '',
      summary: '',
      content: '',
      category: 'Market Research',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: '4 min read',
      author: 'Adhithyan M.',
      tags: ['Strategy', 'Research'],
      imageUrl: '/src/assets/images/project_connect_farmers_1790490485044.jpg'
    });
  };

  const handleAssetPicked = (asset: AssetRecord) => {
    if (assetPickerTarget === 'project-image' && editingProject) {
      setEditingProject({ ...editingProject, imageUrl: asset.url });
    } else if (assetPickerTarget === 'blog-image' && editingBlogPost) {
      setEditingBlogPost({ ...editingBlogPost, imageUrl: asset.url });
    }
    setAssetPickerTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs: Projects vs Blog Posts */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Manage Projects ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Manage Articles & Insights ({blogPosts.length})
          </button>
        </div>

        {activeTab === 'projects' ? (
          <button
            type="button"
            onClick={handleNewProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Project</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNewBlogPost}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write New Article</span>
          </button>
        )}
      </div>

      {/* Projects List */}
      {activeTab === 'projects' && (
        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E] flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    {proj.title}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="text-blue-500">{proj.category}</span>
                    <span>·</span>
                    <span>{proj.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingProject(proj)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(proj.id, proj.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-500"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Posts List */}
      {activeTab === 'blog' && (
        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E] flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    {post.title}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="text-blue-500">{post.category}</span>
                    <span>·</span>
                    <span>{post.publishedDate}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingBlogPost(post)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  title="Edit Article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBlogPost(post.id, post.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-500"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveProject}
            className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-[#12161E] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {editingProject.id.startsWith('proj-') ? 'Create Project' : 'Edit Project'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value as any })
                    }
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    <option value="Market Research & Strategy">Market Research & Strategy</option>
                    <option value="Digital Marketplace">Digital Marketplace</option>
                    <option value="EdTech & Learning">EdTech & Learning</option>
                    <option value="Hospitality & Web">Hospitality & Web</option>
                    <option value="Independent / AI">Independent / AI</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value as any })
                    }
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={editingProject.tagline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Problem Solved
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.problemSolved}
                  onChange={(e) => setEditingProject({ ...editingProject, problemSolved: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white resize-none"
                />
              </div>

              {/* Image Picker Integration from Asset Library or Device Upload */}
              <div className="space-y-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#181E29]">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                    <span>Project Image</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={projectFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProjectFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => projectFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload from Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetPickerTarget('project-image')}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                    >
                      <span>From Asset Library</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shrink-0">
                    <img src={editingProject.imageUrl} alt="Project Preview" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="text"
                    required
                    value={editingProject.imageUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                    placeholder="https://... or data:image/..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#12161E] text-slate-900 dark:text-white font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Blog Post Modal */}
      {editingBlogPost && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveBlogPost}
            className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-[#12161E] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {editingBlogPost.id.startsWith('post-') ? 'Write Article' : 'Edit Article'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingBlogPost(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={editingBlogPost.title}
                  onChange={(e) => setEditingBlogPost({ ...editingBlogPost, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={editingBlogPost.category}
                    onChange={(e) =>
                      setEditingBlogPost({ ...editingBlogPost, category: e.target.value as any })
                    }
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    <option value="Market Research">Market Research</option>
                    <option value="Digital Strategy">Digital Strategy</option>
                    <option value="AI & Prototyping">AI & Prototyping</option>
                    <option value="Hospitality Operations">Hospitality Operations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingBlogPost.readTime}
                    onChange={(e) =>
                      setEditingBlogPost({ ...editingBlogPost, readTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingBlogPost.summary}
                  onChange={(e) => setEditingBlogPost({ ...editingBlogPost, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Article Body / Markdown Content
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingBlogPost.content}
                  onChange={(e) => setEditingBlogPost({ ...editingBlogPost, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white resize-none font-mono text-[11px]"
                />
              </div>

              {/* Featured Image Picker Integration with Device Upload */}
              <div className="space-y-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#181E29]">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                    <span>Featured Article Image</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={blogFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBlogFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => blogFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload from Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssetPickerTarget('blog-image')}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                    >
                      <span>From Asset Library</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shrink-0">
                    <img src={editingBlogPost.imageUrl} alt="Article Preview" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="text"
                    required
                    value={editingBlogPost.imageUrl}
                    onChange={(e) => setEditingBlogPost({ ...editingBlogPost, imageUrl: e.target.value })}
                    placeholder="https://... or data:image/..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#12161E] text-slate-900 dark:text-white font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingBlogPost(null)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      )}

      {/* In-App Safe Delete Confirmation Dialog */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white dark:bg-[#12161E] rounded-2xl max-w-sm w-full p-6 border border-slate-700 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-2.5 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Delete {deleteTarget.type === 'project' ? 'Project' : 'Article'}
                </h4>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">
                "{deleteTarget.title}"
              </strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Asset Picker Modal (CMS Integration with Asset Library) */}
      {assetPickerTarget && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0E1218] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                Select Asset from Personal Media Library
              </h3>
              <button
                type="button"
                onClick={() => setAssetPickerTarget(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <AssetLibrary selectionMode={true} onSelectAsset={handleAssetPicked} />
          </div>
        </div>
      )}
    </div>
  );
}
