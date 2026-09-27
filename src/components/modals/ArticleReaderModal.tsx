import { useEffect } from 'react';
import { X, Calendar, Clock, User, Tag, ArrowRight, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { BlogPost } from '../../types/portfolio';

interface ArticleReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export function ArticleReaderModal({ post, onClose, onSelectProject }: ArticleReaderModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#insights');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0E1218] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              type="button"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share article link"
              aria-label="Share article"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Author */}
        <div className="space-y-4">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src="/src/assets/images/adhithyan_m_portrait_1790490458597.jpg"
                alt="Adhithyan M."
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                {post.author}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                BBA (Hons) · Marketing & Digital Strategy Researcher
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Markdown-like Body */}
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line font-sans">
          {post.content.trim()}
        </div>

        {/* Tags (zero-pill text metadata style) */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>Article Topics & Index Tags</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
            {post.tags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-2">
                <span>#{tag}</span>
                {idx < post.tags.length - 1 && (
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Published on Adhithyan M. Portfolio & Research Journal</span>
          <button
            onClick={onClose}
            type="button"
            className="font-medium hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
