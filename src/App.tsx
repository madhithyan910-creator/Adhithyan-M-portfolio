import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { ResumeSection } from './components/sections/ResumeSection';
import { BlogSection } from './components/sections/BlogSection';
import { Contact } from './components/sections/Contact';
import { AdminModal } from './components/admin/AdminModal';
import { StorageService } from './services/storage';
import { ProjectItem, BlogPost, ProfileData } from './types/portfolio';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => StorageService.getProfile());
  const [projects, setProjects] = useState<ProjectItem[]>(() => StorageService.getProjects());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => StorageService.getBlogPosts());
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize theme on mount (System theme is dark by default)
  useEffect(() => {
    const savedTheme = localStorage.getItem('adhithyan_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // 'dark', 'system', or no saved preference defaults to dark
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#0A0D12] text-slate-900 dark:text-[#E6EDF3] transition-colors duration-200">
      {/* Strict 3-zone top bar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        <Hero profile={profile} />
        <About />
        <Experience />
        <Projects projects={projects} />
        <Skills />
        <ResumeSection profile={profile} />
        <BlogSection posts={blogPosts} />
        <Contact profile={profile} />
      </main>

      {/* Quiet editorial footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} profile={profile} />

      {/* Full Asset Library & CMS Administration Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        blogPosts={blogPosts}
        profile={profile}
        onUpdateProjects={setProjects}
        onUpdateBlogPosts={setBlogPosts}
        onUpdateProfile={setProfile}
      />
    </div>
  );
}
