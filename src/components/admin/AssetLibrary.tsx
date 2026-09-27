import { useState, useRef } from 'react';
import {
  UploadCloud,
  Search,
  Grid,
  List,
  Eye,
  Trash2,
  Copy,
  Check,
  Lock,
  Globe,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Presentation,
  Link,
  Edit2,
  Plus,
  FolderOpen,
  X,
  AlertTriangle,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { AssetRecord, AssetCategory } from '../../types/portfolio';
import { StorageService } from '../../services/storage';

interface AssetLibraryProps {
  onSelectAsset?: (asset: AssetRecord) => void;
  selectionMode?: boolean;
}

export function AssetLibrary({ onSelectAsset, selectionMode = false }: AssetLibraryProps) {
  const [assets, setAssets] = useState<AssetRecord[]>(() => StorageService.getAssets(true));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVisibility, setSelectedVisibility] = useState<'All' | 'Public' | 'Private'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<AssetRecord | null>(null);
  const [editingAsset, setEditingAsset] = useState<AssetRecord | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<AssetRecord | null>(null);

  // Change Image state
  const [assetToChangeImage, setAssetToChangeImage] = useState<AssetRecord | null>(null);
  const [changeImageToast, setChangeImageToast] = useState<string | null>(null);
  const [editFileMessage, setEditFileMessage] = useState<string>('');
  const directChangeFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Add Asset Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetDescription, setNewAssetDescription] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState<AssetCategory>('Presentations');
  const [newAssetType, setNewAssetType] = useState<AssetRecord['fileType']>('presentation');
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [newAssetTags, setNewAssetTags] = useState('');
  const [newAssetIsPrivate, setNewAssetIsPrivate] = useState(false);
  const [addSuccessMessage, setAddSuccessMessage] = useState('');

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const categories: (AssetCategory | 'All')[] = [
    'All',
    'Presentations',
    'Project Documents',
    'Project Images',
    'Screenshots',
    'Resumes',
    'Certificates',
    'Profile Images',
    'Blog Media',
    'Other'
  ];

  // Filter & sort logic
  const filteredAssets = assets
    .filter((asset) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' || asset.category === selectedCategory;

      const matchesVis =
        selectedVisibility === 'All' ||
        (selectedVisibility === 'Private' && asset.isPrivate) ||
        (selectedVisibility === 'Public' && !asset.isPrivate);

      return matchesSearch && matchesCat && matchesVis;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'size') return b.fileSize - a.fileSize;
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });

  // Handle file uploads (converts file to data URL and extracts metadata)
  const processUploadedFile = (file: File) => {
    setUploadStatus(`Processing ${file.name}...`);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = (e.target?.result as string) || '';
      let fileType: AssetRecord['fileType'] = 'document';
      let detectedCategory: AssetCategory = 'Other';

      const lowerName = file.name.toLowerCase();
      if (file.type.startsWith('image/')) {
        fileType = 'image';
        detectedCategory = lowerName.includes('profile') ? 'Profile Images' : 'Project Images';
      } else if (file.type.includes('pdf')) {
        fileType = 'pdf';
        detectedCategory = lowerName.includes('resume') ? 'Resumes' : 'Project Documents';
      } else if (lowerName.endsWith('.pptx') || lowerName.endsWith('.ppt')) {
        fileType = 'presentation';
        detectedCategory = 'Presentations';
      } else if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.csv') || lowerName.endsWith('.xls')) {
        fileType = 'spreadsheet';
        detectedCategory = 'Project Documents';
      } else if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) {
        fileType = 'document';
        detectedCategory = 'Project Documents';
      }

      const newAsset: AssetRecord = {
        id: 'asset-' + Date.now(),
        name: file.name,
        description: `Uploaded document: ${file.name}`,
        fileType,
        mimeType: file.type || 'application/octet-stream',
        fileSize: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        category: detectedCategory,
        tags: [detectedCategory.toLowerCase(), fileType, 'project'],
        isPrivate: false,
        url: dataUrl
      };

      const updated = StorageService.saveAsset(newAsset);
      setAssets(updated);
      setUploadStatus(`Uploaded ${file.name} successfully!`);
      setTimeout(() => setUploadStatus(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        processUploadedFile(e.dataTransfer.files[i]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        processUploadedFile(e.target.files[i]);
      }
    }
  };

  // Change Image Handlers
  const handleTriggerChangeImage = (asset: AssetRecord) => {
    setAssetToChangeImage(asset);
    setTimeout(() => {
      directChangeFileInputRef.current?.click();
    }, 50);
  };

  const handleDirectImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && assetToChangeImage) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const updatedAsset: AssetRecord = {
          ...assetToChangeImage,
          url: dataUrl,
          fileSize: file.size,
          mimeType: file.type || assetToChangeImage.mimeType,
          fileType: file.type.startsWith('image/') ? 'image' : assetToChangeImage.fileType,
          uploadDate: new Date().toISOString().split('T')[0]
        };
        const updatedList = StorageService.saveAsset(updatedAsset);
        setAssets(updatedList);
        if (previewAsset?.id === updatedAsset.id) {
          setPreviewAsset(updatedAsset);
        }
        if (editingAsset?.id === updatedAsset.id) {
          setEditingAsset(updatedAsset);
        }
        setChangeImageToast(`Changed image for "${updatedAsset.name}" successfully!`);
        setTimeout(() => setChangeImageToast(null), 3500);
        setAssetToChangeImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingAsset) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setEditingAsset({
          ...editingAsset,
          url: dataUrl,
          fileSize: file.size,
          mimeType: file.type || editingAsset.mimeType,
          fileType: file.type.startsWith('image/') ? 'image' : editingAsset.fileType
        });
        setEditFileMessage(`Selected new file: ${file.name} (${formatBytes(file.size)})`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Safe delete handler without window.confirm
  const handleConfirmDelete = () => {
    if (!assetToDelete) return;
    const updated = StorageService.deleteAsset(assetToDelete.id);
    setAssets(updated);
    if (previewAsset?.id === assetToDelete.id) {
      setPreviewAsset(null);
    }
    setAssetToDelete(null);
  };

  const handleToggleVisibility = (asset: AssetRecord) => {
    const updated = StorageService.saveAsset({
      ...asset,
      isPrivate: !asset.isPrivate
    });
    setAssets(updated);
  };

  const handleCopyUrl = (asset: AssetRecord) => {
    const targetUrl = asset.url.startsWith('data:') ? window.location.origin + '#' + asset.id : asset.url;
    navigator.clipboard.writeText(targetUrl);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAsset) return;
    const updated = StorageService.saveAsset(editingAsset);
    setAssets(updated);
    setEditingAsset(null);
  };

  // Create new asset manually or from URL
  const handleCreateNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;

    const tagsArray = newAssetTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const assetItem: AssetRecord = {
      id: 'asset-' + Date.now(),
      name: newAssetName.trim(),
      description: newAssetDescription.trim() || `Asset: ${newAssetName.trim()}`,
      fileType: newAssetType,
      mimeType:
        newAssetType === 'presentation'
          ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
          : newAssetType === 'pdf'
          ? 'application/pdf'
          : newAssetType === 'spreadsheet'
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : newAssetType === 'image'
          ? 'image/png'
          : 'application/octet-stream',
      fileSize: 1500000,
      uploadDate: new Date().toISOString().split('T')[0],
      category: newAssetCategory,
      tags: tagsArray.length > 0 ? tagsArray : [newAssetCategory.toLowerCase(), newAssetType],
      isPrivate: newAssetIsPrivate,
      url: newAssetUrl.trim() || '#'
    };

    const updated = StorageService.saveAsset(assetItem);
    setAssets(updated);
    setAddSuccessMessage(`Asset "${assetItem.name}" added successfully!`);

    // Reset form
    setNewAssetName('');
    setNewAssetDescription('');
    setNewAssetUrl('');
    setNewAssetTags('');
    setNewAssetIsPrivate(false);

    setTimeout(() => {
      setAddSuccessMessage('');
      setIsAddModalOpen(false);
    }, 1200);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getAssetIcon = (type: AssetRecord['fileType']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case 'pdf':
      case 'document':
        return <FileText className="w-4 h-4 text-rose-500" />;
      case 'presentation':
        return <Presentation className="w-4 h-4 text-amber-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
      default:
        return <Link className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Direct "Change Image" on any Asset */}
      <input
        ref={directChangeFileInputRef}
        type="file"
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv"
        onChange={handleDirectImageFileSelected}
      />

      {/* Change Image Toast Alert */}
      {changeImageToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{changeImageToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setChangeImageToast(null)}
            className="p-1 text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-white rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-2 ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-[#12161E]/50 hover:border-slate-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
          accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv"
        />

        <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          Click or Drag & Drop Professional Assets
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Supports PPT, PPTX (presentations), PDF (reports & resumes), PNG, JPG, WEBP, DOCX, XLSX.
        </p>

        {uploadStatus && (
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 animate-pulse pt-2">
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PPTs, documents, images..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Actions & Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* Add New Asset Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Asset</span>
            </button>

            {/* Visibility filter */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              {(['All', 'Public', 'Private'] as const).map((vis) => (
                <button
                  key={vis}
                  type="button"
                  onClick={() => setSelectedVisibility(vis)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    selectedVisibility === vis
                      ? 'bg-white dark:bg-[#12161E] text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {vis}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort assets"
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#12161E] text-slate-700 dark:text-slate-300"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'grid' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400'}`}
                title="Grid view"
                aria-label="Grid view"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400'}`}
                title="List view"
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Display List / Grid */}
      {filteredAssets.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 space-y-2">
          <FolderOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No assets match current criteria
          </div>
          <div className="text-xs text-slate-500">
            Try adjusting your search query, selecting "All", or click "+ Add New Asset" above.
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E] overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
            >
              {/* Asset Preview Thumbnail */}
              <div
                className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => {
                  if (selectionMode && onSelectAsset) {
                    onSelectAsset(asset);
                  } else {
                    setPreviewAsset(asset);
                  }
                }}
              >
                {asset.fileType === 'image' ? (
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div class="flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center">
                            <span class="font-semibold">${asset.category}</span>
                            <span class="text-[10px] mt-1 opacity-70">${asset.fileType.toUpperCase()}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center space-y-1.5">
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 shadow-xs">
                      {getAssetIcon(asset.fileType)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[160px]">
                      {asset.name}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                      {asset.fileType}
                    </span>
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 backdrop-blur-sm text-white capitalize flex items-center gap-1">
                    {getAssetIcon(asset.fileType)}
                    <span className="line-clamp-1">{asset.fileType}</span>
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  {asset.isPrivate ? (
                    <span className="p-1 rounded bg-amber-500/90 text-white flex items-center" title="Private to Admin">
                      <Lock className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="p-1 rounded bg-emerald-500/90 text-white flex items-center" title="Public Asset">
                      <Globe className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Change Image Hover Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerChangeImage(asset);
                  }}
                  className="absolute bottom-2 right-2 px-2 py-1 rounded bg-slate-900/85 hover:bg-blue-600 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-xs transition-colors cursor-pointer border border-white/20 shadow-xs z-10"
                  title="Change Image / Replace File"
                >
                  <ImageIcon className="w-3 h-3 text-blue-400" />
                  <span>Change</span>
                </button>
              </div>

              {/* Asset Info */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{asset.category}</span>
                    <span>·</span>
                    <span>{formatBytes(asset.fileSize)}</span>
                  </div>
                  <h4
                    className="text-xs font-semibold text-slate-900 dark:text-white truncate pt-0.5"
                    title={asset.name}
                  >
                    {asset.name}
                  </h4>
                  {asset.description && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {asset.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  {selectionMode ? (
                    <button
                      type="button"
                      onClick={() => onSelectAsset && onSelectAsset(asset)}
                      className="w-full py-1 text-center font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                      Select Asset
                    </button>
                  ) : (
                    <>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewAsset(asset)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          title="Preview asset"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(asset)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          title="Copy link / URL"
                        >
                          {copiedId === asset.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTriggerChangeImage(asset)}
                          className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                          title="Change Image / Replace File"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingAsset(asset)}
                          className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                          title="Edit metadata"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleVisibility(asset)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          title={asset.isPrivate ? 'Make Public' : 'Make Private'}
                        >
                          {asset.isPrivate ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Globe className="w-3.5 h-3.5 text-emerald-500" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAssetToDelete(asset)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 dark:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                          title="Delete asset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12161E] overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-3 sm:px-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getAssetIcon(asset.fileType)}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="font-semibold text-slate-900 dark:text-white truncate">
                      {asset.name}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{asset.category}</span>
                      <span>·</span>
                      <span>{formatBytes(asset.fileSize)}</span>
                      <span>·</span>
                      <span>{asset.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      asset.isPrivate
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    {asset.isPrivate ? 'Private' : 'Public'}
                  </span>

                  {selectionMode ? (
                    <button
                      type="button"
                      onClick={() => onSelectAsset && onSelectAsset(asset)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                      Select
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewAsset(asset)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(asset)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title="Copy Link"
                      >
                        {copiedId === asset.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTriggerChangeImage(asset)}
                        className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                        title="Change Image / Replace File"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAsset(asset)}
                        className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                        title="Edit Metadata"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssetToDelete(asset)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 dark:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ADD NEW ASSET MODAL --- */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-[#12161E] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Add New Asset (PPT, Document, or Image)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Upload a file from your device or specify an asset link.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Upload from Device */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#181E29] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-blue-500" />
                <span>Upload Local File</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Choose a PowerPoint presentation (.pptx/.ppt), PDF, Word document, Excel sheet, or image.
              </p>
              <input
                ref={modalFileInputRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    processUploadedFile(e.target.files[0]);
                    setIsAddModalOpen(false);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => modalFileInputRef.current?.click()}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Browse & Select File from Device
              </button>
            </div>

            <div className="relative flex items-center py-1">
              <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="shrink-0 mx-3 text-[10px] uppercase font-semibold text-slate-400">
                Or Add via Details / Link
              </span>
              <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Add Asset Form */}
            <form onSubmit={handleCreateNewAsset} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Asset Title / File Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  placeholder="e.g. AFCAT_Master_Strategy_Deck.pptx"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    File Type
                  </label>
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    <option value="presentation">Presentation (PPT / PPTX)</option>
                    <option value="document">Project Document (DOC / TXT)</option>
                    <option value="pdf">PDF Document</option>
                    <option value="spreadsheet">Spreadsheet (XLSX / CSV)</option>
                    <option value="image">Image (PNG / JPG / SVG)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={newAssetCategory}
                    onChange={(e) => setNewAssetCategory(e.target.value as AssetCategory)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Asset URL or File Location
                </label>
                <input
                  type="text"
                  value={newAssetUrl}
                  onChange={(e) => setNewAssetUrl(e.target.value)}
                  placeholder="https://... or /src/assets/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newAssetDescription}
                  onChange={(e) => setNewAssetDescription(e.target.value)}
                  placeholder="Key project highlights, deck contents, or research summary..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newAssetTags}
                    onChange={(e) => setNewAssetTags(e.target.value)}
                    placeholder="PPT, GTM, Strategy, AFCAT"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Visibility
                  </label>
                  <select
                    value={newAssetIsPrivate ? 'private' : 'public'}
                    onChange={(e) => setNewAssetIsPrivate(e.target.value === 'private')}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private (Admin only)</option>
                  </select>
                </div>
              </div>

              {addSuccessMessage && (
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{addSuccessMessage}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- IN-UI SAFE DELETE CONFIRMATION MODAL --- */}
      {assetToDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setAssetToDelete(null)}
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
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Delete Asset</h4>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">
                "{assetToDelete.name}"
              </strong>{' '}
              from your Asset Library?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setAssetToDelete(null)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs cursor-pointer"
              >
                Yes, Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PREVIEW MODAL --- */}
      {previewAsset && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewAsset(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white dark:bg-[#12161E] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {getAssetIcon(previewAsset.fileType)}
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate max-w-md">
                  {previewAsset.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewAsset(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800">
              {previewAsset.fileType === 'image' ? (
                <img
                  src={previewAsset.url}
                  alt={previewAsset.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-6 space-y-2">
                  <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800 inline-block shadow-xs">
                    {getAssetIcon(previewAsset.fileType)}
                  </div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">
                    {previewAsset.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {previewAsset.mimeType} · {formatBytes(previewAsset.fileSize)}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-slate-600 dark:text-slate-300">
                {previewAsset.description}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {previewAsset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">
                Uploaded: {previewAsset.uploadDate}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTriggerChangeImage(previewAsset)}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer flex items-center gap-1.5"
                  title="Upload or change image for this asset"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Change Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingAsset(previewAsset);
                    setPreviewAsset(null);
                  }}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewAsset)}
                  className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Copy URL / Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT METADATA MODAL --- */}
      {editingAsset && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setEditingAsset(null)}
        >
          <form
            onSubmit={handleSaveMetadata}
            className="relative max-w-md w-full bg-white dark:bg-[#12161E] rounded-2xl p-6 space-y-4 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                Edit Asset Metadata
              </h3>
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Asset Display Name
                </label>
                <input
                  type="text"
                  value={editingAsset.name}
                  onChange={(e) => setEditingAsset({ ...editingAsset, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                />
              </div>

              {/* Dedicated Change Image / File Upload Section */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#181E29] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    <span>Change Image / Replace File</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer shadow-xs"
                  >
                    Browse Device
                  </button>
                </div>

                <input
                  ref={editFileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv"
                  onChange={handleEditFileChange}
                />

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shrink-0 flex items-center justify-center">
                    {editingAsset.fileType === 'image' || editingAsset.url.startsWith('data:image') || editingAsset.url.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) ? (
                      <img src={editingAsset.url} alt={editingAsset.name} className="w-full h-full object-cover" />
                    ) : (
                      getAssetIcon(editingAsset.fileType)
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      Upload a replacement image from your device or modify the URL below.
                    </div>
                    {editFileMessage && (
                      <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{editFileMessage}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingAsset.description}
                  onChange={(e) => setEditingAsset({ ...editingAsset, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={editingAsset.category}
                    onChange={(e) => setEditingAsset({ ...editingAsset, category: e.target.value as AssetCategory })}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    {categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Visibility
                  </label>
                  <select
                    value={editingAsset.isPrivate ? 'private' : 'public'}
                    onChange={(e) => setEditingAsset({ ...editingAsset, isPrivate: e.target.value === 'private' })}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private (Admin only)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Source URL / File Path
                </label>
                <input
                  type="text"
                  value={editingAsset.url}
                  onChange={(e) => setEditingAsset({ ...editingAsset, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#181E29] text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer shadow-xs"
              >
                Save Metadata
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
