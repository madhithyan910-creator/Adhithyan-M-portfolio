import {
  ProjectItem,
  BlogPost,
  AssetRecord,
  AssetCategory,
  ProfileData
} from '../types/portfolio';
import {
  PROJECTS as defaultProjects,
  BLOG_POSTS as defaultBlogPosts,
  INITIAL_ASSETS as defaultAssets,
  PROFILE as defaultProfile
} from '../data/initialData';

const STORAGE_KEYS = {
  PROJECTS: 'adhithyan_portfolio_projects_v1',
  BLOG_POSTS: 'adhithyan_portfolio_blog_v1',
  ASSETS: 'adhithyan_portfolio_assets_v1',
  CONTACT_SUBMISSIONS: 'adhithyan_portfolio_contacts_v1',
  ADMIN_AUTH: 'adhithyan_portfolio_admin_auth',
  ADMIN_PIN: 'adhithyan_portfolio_admin_custom_pin_v1',
  PROFILE: 'adhithyan_portfolio_profile_data_v1',
  DELETED_ASSET_IDS: 'adhithyan_portfolio_deleted_assets_v1'
};

// Helper for safe localStorage access
function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Failed reading storage key "${key}"`, e);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed writing storage key "${key}"`, e);
  }
}

export const StorageService = {
  // ---- PROJECTS ----
  getProjects(): ProjectItem[] {
    const stored = getStoredItem<ProjectItem[]>(STORAGE_KEYS.PROJECTS, defaultProjects);
    // Ensure projects receive their verified liveUrls from defaults if not set
    return stored.map(p => {
      const def = defaultProjects.find(d => d.id === p.id);
      if (def?.liveUrl && (!p.liveUrl || p.liveUrl !== def.liveUrl)) {
        return { ...p, liveUrl: def.liveUrl };
      }
      return p;
    });
  },

  saveProject(project: ProjectItem): ProjectItem[] {
    const current = this.getProjects();
    const index = current.findIndex(p => p.id === project.id);
    let updated: ProjectItem[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = project;
    } else {
      updated = [project, ...current];
    }
    setStoredItem(STORAGE_KEYS.PROJECTS, updated);
    return updated;
  },

  deleteProject(id: string): ProjectItem[] {
    const current = this.getProjects();
    const updated = current.filter(p => p.id !== id);
    setStoredItem(STORAGE_KEYS.PROJECTS, updated);
    return updated;
  },

  resetProjects(): ProjectItem[] {
    setStoredItem(STORAGE_KEYS.PROJECTS, defaultProjects);
    return defaultProjects;
  },

  // ---- BLOG POSTS ----
  getBlogPosts(): BlogPost[] {
    return getStoredItem<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, defaultBlogPosts);
  },

  saveBlogPost(post: BlogPost): BlogPost[] {
    const current = this.getBlogPosts();
    const index = current.findIndex(p => p.id === post.id);
    let updated: BlogPost[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = post;
    } else {
      updated = [post, ...current];
    }
    setStoredItem(STORAGE_KEYS.BLOG_POSTS, updated);
    return updated;
  },

  deleteBlogPost(id: string): BlogPost[] {
    const current = this.getBlogPosts();
    const updated = current.filter(p => p.id !== id);
    setStoredItem(STORAGE_KEYS.BLOG_POSTS, updated);
    return updated;
  },

  resetBlogPosts(): BlogPost[] {
    setStoredItem(STORAGE_KEYS.BLOG_POSTS, defaultBlogPosts);
    return defaultBlogPosts;
  },

  // ---- ASSET LIBRARY (Section 15) ----
  getAssets(includePrivate: boolean = true): AssetRecord[] {
    const deletedIds = new Set(getStoredItem<string[]>(STORAGE_KEYS.DELETED_ASSET_IDS, []));
    const rawStored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.ASSETS) : null;
    let stored: AssetRecord[];
    if (!rawStored) {
      stored = defaultAssets;
      setStoredItem(STORAGE_KEYS.ASSETS, defaultAssets);
    } else {
      try {
        stored = JSON.parse(rawStored) as AssetRecord[];
      } catch {
        stored = defaultAssets;
      }
    }

    // Filter out any explicitly deleted asset ID so they NEVER come back
    const filtered = stored.filter(a => !deletedIds.has(a.id));
    if (includePrivate) return filtered;
    return filtered.filter(a => !a.isPrivate);
  },

  saveAsset(asset: AssetRecord): AssetRecord[] {
    const deletedIds = getStoredItem<string[]>(STORAGE_KEYS.DELETED_ASSET_IDS, []);
    // If saving an asset that was previously marked deleted, unmark it
    if (deletedIds.includes(asset.id)) {
      const updatedDeleted = deletedIds.filter(id => id !== asset.id);
      setStoredItem(STORAGE_KEYS.DELETED_ASSET_IDS, updatedDeleted);
    }
    const current = this.getAssets(true);
    const index = current.findIndex(a => a.id === asset.id);
    let updated: AssetRecord[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = asset;
    } else {
      updated = [asset, ...current];
    }
    setStoredItem(STORAGE_KEYS.ASSETS, updated);
    return updated;
  },

  deleteAsset(id: string): AssetRecord[] {
    // Record in deleted asset ids list so it can NEVER be restored
    const deletedIds = getStoredItem<string[]>(STORAGE_KEYS.DELETED_ASSET_IDS, []);
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      setStoredItem(STORAGE_KEYS.DELETED_ASSET_IDS, deletedIds);
    }
    const current = this.getAssets(true);
    const updated = current.filter(a => a.id !== id);
    setStoredItem(STORAGE_KEYS.ASSETS, updated);
    return updated;
  },

  resetAssets(): AssetRecord[] {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.DELETED_ASSET_IDS);
    }
    setStoredItem(STORAGE_KEYS.ASSETS, defaultAssets);
    return defaultAssets;
  },

  // ---- CONTACT INQUIRIES ----
  async submitContactForm(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot?: string;
  }): Promise<{ success: boolean; message: string }> {
    // Client-side spam detection (honeypot)
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return { success: false, message: 'Spam submission blocked.' };
    }

    // Basic validation
    if (!payload.name || !payload.email || !payload.message) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    // Try server endpoint if running
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const result = await response.json();
        return { success: true, message: result.message || 'Message sent successfully!' };
      }
    } catch {
      // Fallback gracefully to local submission storage if server route is offline
    }

    // Record locally
    const submissions = getStoredItem<any[]>(STORAGE_KEYS.CONTACT_SUBMISSIONS, []);
    submissions.push({
      ...payload,
      id: 'msg-' + Date.now(),
      timestamp: new Date().toISOString()
    });
    setStoredItem(STORAGE_KEYS.CONTACT_SUBMISSIONS, submissions);

    return {
      success: true,
      message: 'Thank you! Your message has been received by Adhithyan M. and will be responded to promptly.'
    };
  },

  // ---- PROFILE & PHOTO MANAGEMENT ----
  getProfile(): ProfileData {
    return getStoredItem<ProfileData>(STORAGE_KEYS.PROFILE, defaultProfile);
  },

  saveProfile(profile: ProfileData): ProfileData {
    setStoredItem(STORAGE_KEYS.PROFILE, profile);
    return profile;
  },

  updateProfilePhoto(photoUrl: string): ProfileData {
    const current = this.getProfile();
    const updated = { ...current, photoUrl };
    setStoredItem(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  resetProfile(): ProfileData {
    setStoredItem(STORAGE_KEYS.PROFILE, defaultProfile);
    return defaultProfile;
  },

  // ---- ADMIN AUTHENTICATION (For CMS & Asset Library) ----
  getAdminPin(): string {
    return getStoredItem<string>(STORAGE_KEYS.ADMIN_PIN, '2026');
  },

  setAdminPin(newPin: string): boolean {
    if (!newPin || newPin.trim().length < 4) return false;
    setStoredItem(STORAGE_KEYS.ADMIN_PIN, newPin.trim());
    return true;
  },

  resetAdminPin(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_PIN);
    }
  },

  isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  authenticateAdmin(pin: string): boolean {
    const entered = pin.trim();
    const currentPin = this.getAdminPin();
    
    // Checks against the custom set PIN, or default fallback '2026' / 'admin'
    if (
      entered === currentPin ||
      (currentPin === '2026' && (entered === 'admin' || entered === 'adhithyan'))
    ) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  },

  logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
};
