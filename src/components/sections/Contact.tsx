import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, UserCheck, MessageSquare } from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { PROFILE as defaultProfile } from '../../data/initialData';
import { StorageService } from '../../services/storage';

interface ContactProps {
  profile?: ProfileData;
}

export function Contact({ profile = defaultProfile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    honeypot: '' // hidden anti-spam field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim()) {
      errs.message = 'Please include a message or inquiry details.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your inquiry.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerMessage('');

    try {
      const res = await StorageService.submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() + (formData.company ? ` [${formData.company.trim()}]` : ''),
        message: formData.message.trim(),
        honeypot: formData.honeypot
      });

      if (res.success) {
        setSubmitted(true);
        setServerMessage(res.message);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          company: '',
          honeypot: ''
        });
      } else {
        setErrors({ form: res.message });
      }
    } catch {
      setErrors({ form: 'An error occurred while submitting your message. Please reach out via email directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // vCard file download
  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:M.;Adhithyan;;;
FN:${profile.name}
TITLE:${profile.title}
EMAIL;TYPE=PREF,INTERNET:${profile.email}
TEL;TYPE=CELL:${profile.phone.replace(/\s+/g, '')}
ADR;TYPE=HOME:;;${profile.location};;;India
URL:${profile.github}
NOTE:${profile.summary}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Adhithyan_M_Contact.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800/80 scroll-mt-16 bg-white dark:bg-[#07090D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Professional Inquiries & Opportunities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Interested in discussing an internship, graduate opportunity, research collaboration, or project? Send a direct note below or connect via email or phone.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Recruiter Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Primary Email
                    </div>
                    <div className="font-medium text-slate-900 dark:text-white truncate">
                      {profile.email}
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline pt-0.5 cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy Email Address'}</span>
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Telephone
                    </div>
                    <a
                      href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                      className="font-medium text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Location & Mobility
                    </div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      {profile.location}
                    </div>
                    <div className="text-xs text-slate-500">
                      Open to on-site, hybrid, and remote opportunities across India.
                    </div>
                  </div>
                </div>
              </div>

              {/* vCard Button */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  onClick={handleDownloadVCard}
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#141A23] border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>Download Contact vCard (.vcf)</span>
                </button>
              </div>
            </div>

            {/* Recruiter Guarantee Card */}
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                <span>Response Turnaround</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Adhithyan regularly monitors this inbox and strives to acknowledge recruiter inquiries and interview invitations within 24 business hours.
              </p>
            </div>

          </div>

          {/* Right Column: Secure Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0E1218] shadow-xs">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {serverMessage || 'Thank you for reaching out! Adhithyan M. has received your message and will review it promptly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2 cursor-pointer"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Honeypot field (hidden from legitimate users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  {errors.form && (
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jane Doe"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#141A23] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden transition-colors ${
                          errors.name
                            ? 'border-rose-400 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#141A23] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden transition-colors ${
                          errors.email
                            ? 'border-rose-400 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Organization / Company */}
                    <div className="space-y-1">
                      <label htmlFor="company" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Company / Institution (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141A23] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Internship / Role Inquiry"
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#141A23] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden transition-colors ${
                          errors.subject
                            ? 'border-rose-400 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                        }`}
                      />
                      {errors.subject && <p className="text-[11px] text-rose-500">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding your team, role expectations, or collaboration..."
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#141A23] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden resize-none transition-colors ${
                        errors.message
                          ? 'border-rose-400 focus:border-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-500">{errors.message}</p>}
                  </div>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    No account required. Submissions are delivered directly to Adhithyan’s professional inbox.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Delivering Securely...' : 'Send Message'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
