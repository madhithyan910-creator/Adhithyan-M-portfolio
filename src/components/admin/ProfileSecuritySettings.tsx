import { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Shield,
  User,
  Sparkles,
  FolderOpen
} from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { StorageService } from '../../services/storage';
import { AssetLibrary } from './AssetLibrary';

interface ProfileSecuritySettingsProps {
  profile: ProfileData;
  onUpdateProfile: (profile: ProfileData) => void;
  onOpenAssetPicker: (target: 'profile-photo') => void;
}

export function ProfileSecuritySettings({
  profile,
  onUpdateProfile,
  onOpenAssetPicker
}: ProfileSecuritySettingsProps) {
  // Photo states
  const [photoUrl, setPhotoUrl] = useState<string>(profile.photoUrl);
  const [photoSaved, setPhotoSaved] = useState<boolean>(false);
  const [showPhotoResetConfirm, setShowPhotoResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security PIN states
  const [currentPin, setCurrentPin] = useState<string>(() => StorageService.getAdminPin());
  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [pinSuccess, setPinSuccess] = useState<string>('');
  const [showPinResetConfirm, setShowPinResetConfirm] = useState(false);

  // Handle local file upload (converts to base64 Data URL)
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        setPhotoUrl(resultUrl);
        // Automatically save and record as an asset
        const updated = StorageService.updateProfilePhoto(resultUrl);
        onUpdateProfile(updated);
        setPhotoSaved(true);
        setTimeout(() => setPhotoSaved(false), 3000);

        // Save to Asset Library automatically too
        StorageService.saveAsset({
          id: 'custom-photo-' + Date.now(),
          name: file.name || 'Adhithyan_Profile_Photo.jpg',
          description: 'Updated profile portrait photo',
          fileType: 'image',
          mimeType: file.type || 'image/jpeg',
          fileSize: file.size,
          uploadDate: new Date().toISOString().split('T')[0],
          category: 'Profile Images',
          tags: ['Profile', 'Headshot', 'Custom'],
          isPrivate: false,
          url: resultUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;
    const updated = StorageService.updateProfilePhoto(photoUrl.trim());
    onUpdateProfile(updated);
    setPhotoSaved(true);
    setTimeout(() => setPhotoSaved(false), 3000);
  };

  const handleExecuteResetPhoto = () => {
    const defaultData = StorageService.resetProfile();
    setPhotoUrl(defaultData.photoUrl);
    onUpdateProfile(defaultData);
    setShowPhotoResetConfirm(false);
    setPhotoSaved(true);
    setTimeout(() => setPhotoSaved(false), 3000);
  };

  // Handle PIN change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setPinSuccess('');

    if (!newPin.trim()) {
      setPinError('Please enter a new PIN or password.');
      return;
    }

    if (newPin.trim().length < 4) {
      setPinError('PIN or password must be at least 4 characters long.');
      return;
    }

    if (newPin !== confirmPin) {
      setPinError('New PIN and Confirm PIN do not match.');
      return;
    }

    const success = StorageService.setAdminPin(newPin.trim());
    if (success) {
      setCurrentPin(newPin.trim());
      setNewPin('');
      setConfirmPin('');
      setPinSuccess('Admin PIN successfully updated! Use your new password every time you log in.');
      setTimeout(() => setPinSuccess(''), 5000);
    } else {
      setPinError('Failed to update PIN. Please try again.');
    }
  };

  const handleExecuteResetPin = () => {
    StorageService.resetAdminPin();
    setCurrentPin('2026');
    setNewPin('');
    setConfirmPin('');
    setShowPinResetConfirm(false);
    setPinSuccess('PIN has been reset back to default: 2026');
    setTimeout(() => setPinSuccess(''), 5000);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Overview Banner */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-semibold text-slate-900 dark:text-white">
            Photo, PIN & Asset Library Settings
          </div>
          <p>
            Update your profile photo anytime, customize your Admin Security PIN/Password from <code className="font-mono text-blue-600 dark:text-blue-400">2026</code> to your wish, and manage your full asset library with PPT presentations, research documents, and project images below.
          </p>
        </div>
      </div>

      {/* Top 2 Cards: Profile Photo & Admin PIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Change Profile Photo */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E] space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Profile Photo
              </h3>
            </div>
            {photoSaved && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </span>
            )}
          </div>

          {/* Current Photo Preview */}
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0 shadow-md">
              <img
                src={photoUrl}
                alt="Adhithyan M. Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>`;
                  }
                }}
              />
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {profile.name}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Visible across the Hero section, Official Resume paper preview, and Footer.
              </p>
              <div className="pt-1">
                {!showPhotoResetConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowPhotoResetConfirm(true)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Default Studio Photo</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-[11px] bg-amber-50 dark:bg-amber-950/30 p-1.5 rounded-lg border border-amber-200 dark:border-amber-900">
                    <span className="text-amber-800 dark:text-amber-300">Reset photo?</span>
                    <button
                      type="button"
                      onClick={handleExecuteResetPhoto}
                      className="px-2 py-0.5 bg-blue-600 text-white rounded font-semibold cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPhotoResetConfirm(false)}
                      className="text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload New Photo from Device */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Upload from Your Phone or Computer
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoFileChange}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Photo (JPG, PNG, WEBP)</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenAssetPicker('profile-photo')}
                className="inline-flex items-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                title="Select existing image from Asset Library"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Choose Asset</span>
              </button>
            </div>
          </div>

          {/* Direct Image URL */}
          <form onSubmit={handleSavePhotoUrl} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Or Enter Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://... or /src/assets/images/..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Update
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Change Security PIN / Password */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E] space-y-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Admin PIN / Password
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Active PIN: {currentPin}
              </span>
            </div>

            <form onSubmit={handleChangePin} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  New Desired PIN or Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter any PIN or password (e.g. 9845, secret2026)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Confirm New PIN / Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="Re-type new PIN / password to confirm"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {pinError && (
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              {pinSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{pinSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Save New PIN / Password
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Revert to original PIN?</span>
            {!showPinResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowPinResetConfirm(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Reset PIN to 2026
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExecuteResetPin}
                  className="px-2 py-0.5 bg-rose-600 text-white rounded font-semibold cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowPinResetConfirm(false)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Asset Library & Media Manager (Integrated right under Photo & PIN Settings) */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Project Presentations, Documents & Asset Library
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your PowerPoint presentations (.pptx), research documentation, spreadsheets, and project prototype media in one unified place.
            </p>
          </div>
        </div>

        {/* Embedded AssetLibrary Component */}
        <AssetLibrary />
      </div>
    </div>
  );
}
