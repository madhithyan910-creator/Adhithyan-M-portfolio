import { useState, useEffect } from 'react';
import { X, Lock, KeyRound, Layers, RotateCcw, ShieldCheck, LogOut, UserCheck } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { AssetLibrary } from './AssetLibrary';
import { CMSManager } from './CMSManager';
import { ProfileSecuritySettings } from './ProfileSecuritySettings';
import { ProjectItem, BlogPost, ProfileData, AssetRecord } from '../../types/portfolio';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  blogPosts: BlogPost[];
  profile: ProfileData;
  onUpdateProjects: (projects: ProjectItem[]) => void;
  onUpdateBlogPosts: (posts: BlogPost[]) => void;
  onUpdateProfile: (profile: ProfileData) => void;
}

export function AdminModal({
  isOpen,
  onClose,
  projects,
  blogPosts,
  profile,
  onUpdateProjects,
  onUpdateBlogPosts,
  onUpdateProfile
}: AdminModalProps) {
  // Always start unauthenticated each time admin modal is opened!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'settings' | 'cms'>('settings');
  const [assetPickerTarget, setAssetPickerTarget] = useState<'profile-photo' | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Require PIN each time entering admin
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(false);
      setPinInput('');
      setAuthError('');
      setShowResetConfirm(false);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAuthenticated(false);
      setPinInput('');
      setAuthError('');
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (StorageService.authenticateAdmin(pinInput)) {
      setIsAuthenticated(true);
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError('Invalid PIN code. Hint: Default is 2026 or your custom set PIN.');
    }
  };

  const handleLogout = () => {
    StorageService.logoutAdmin();
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    onClose();
  };

  const handleConfirmResetData = () => {
    const resetProjs = StorageService.resetProjects();
    const resetBlogs = StorageService.resetBlogPosts();
    const resetProf = StorageService.resetProfile();
    StorageService.resetAssets();
    StorageService.resetAdminPin();
    onUpdateProjects(resetProjs);
    onUpdateBlogPosts(resetBlogs);
    onUpdateProfile(resetProf);
    setShowResetConfirm(false);
  };

  const handleAssetPicked = (asset: AssetRecord) => {
    if (assetPickerTarget === 'profile-photo') {
      const updated = StorageService.updateProfilePhoto(asset.url);
      onUpdateProfile(updated);
    }
    setAssetPickerTarget(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 dark:bg-black/85 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-[#0A0D12] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-[#0E1218]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Portfolio Administration & Settings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personal Management Area for Adhithyan M.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock / Sign Out</span>
              </button>
            )}

            <button
              onClick={handleClose}
              type="button"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close admin area"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* PIN Authentication Gate - Prompted Every Single Time */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#F8F9FA] dark:bg-[#0A0D12]">
            <form
              onSubmit={handleLogin}
              className="max-w-sm w-full p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1218] shadow-lg space-y-5 text-center"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Owner Authentication
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your owner security PIN or password to manage photo, assets, and projects.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Security PIN / Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter PIN (e.g. 2026)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141A23] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 text-center tracking-widest font-mono text-sm"
                  />
                </div>
                {authError && <p className="text-[11px] text-rose-500 font-semibold">{authError}</p>}
                <p className="text-[10px] text-slate-400 text-center">
                  Default PIN: <code className="font-mono text-blue-600 dark:text-blue-400">2026</code> (Customizable inside)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Access Administration Area
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard - 2 Unified Tabs (No separate asset library tab) */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] flex items-center justify-between gap-4 shrink-0 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Photo, PIN & Assets Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cms')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'cms'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Headless CMS Manager</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {!showResetConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap cursor-pointer"
                    title="Reset all content to verified resume defaults"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Reset to Defaults</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-md border border-rose-200 dark:border-rose-900">
                    <span className="text-rose-700 dark:text-rose-300">Reset everything?</span>
                    <button
                      type="button"
                      onClick={handleConfirmResetData}
                      className="px-2 py-0.5 bg-rose-600 text-white rounded font-semibold cursor-pointer"
                    >
                      Yes, Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(false)}
                      className="text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Tab Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA] dark:bg-[#0A0D12]">
              {activeTab === 'settings' && (
                <ProfileSecuritySettings
                  profile={profile}
                  onUpdateProfile={onUpdateProfile}
                  onOpenAssetPicker={() => setAssetPickerTarget('profile-photo')}
                />
              )}

              {activeTab === 'cms' && (
                <CMSManager
                  projects={projects}
                  blogPosts={blogPosts}
                  onUpdateProjects={onUpdateProjects}
                  onUpdateBlogPosts={onUpdateBlogPosts}
                />
              )}
            </div>
          </div>
        )}

        {/* Modal Asset Selector for Profile Photo */}
        {assetPickerTarget && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0E1218] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Select Profile Photo from Asset Library
                </h3>
                <button
                  type="button"
                  onClick={() => setAssetPickerTarget(null)}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <AssetLibrary selectionMode={true} onSelectAsset={handleAssetPicked} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
