import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { submitContactMessage } from '../services/api';

export const Contact: React.FC = () => {
  const { profile } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Your name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message content is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to deliver message. Please try again.');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-28 bg-[#020817] relative border-t border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Contact Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                LET'S WORK WITH DATA
              </h2>
              
              <p className="text-base sm:text-lg text-[#00D4FF] font-medium mt-3 leading-relaxed">
                Have a project, research problem or business challenge?
              </p>
              
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                Let's turn your data into something useful.
              </p>

              <div className="mt-6">
                <a
                  href={`mailto:${profile?.email || 'phostacolliner@gmail.com'}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all shadow-lg shadow-[#0D6EFD]/30"
                >
                  <span>Let's Connect</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4 pt-4 border-t border-blue-900/40">
              
              {/* Phone */}
              <a
                href={`tel:${profile?.phone || '0722450893'}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#081B35]/70 hover:bg-[#081B35] border border-blue-900/30 hover:border-[#00D4FF]/50 transition-all text-slate-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06152B] border border-blue-800/40 flex items-center justify-center text-[#00D4FF] group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Phone</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#00D4FF] transition-colors">
                    {profile?.phone || '0722450893'}
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile?.email || 'phostacolliner@gmail.com'}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#081B35]/70 hover:bg-[#081B35] border border-blue-900/30 hover:border-[#00D4FF]/50 transition-all text-slate-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06152B] border border-blue-800/40 flex items-center justify-center text-[#00D4FF] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#00D4FF] transition-colors">
                    {profile?.email || 'phostacolliner@gmail.com'}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#081B35]/70 border border-blue-900/30 text-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#06152B] border border-blue-800/40 flex items-center justify-center text-[#00D4FF]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Location</div>
                  <div className="text-sm font-semibold text-white">{profile?.location || 'Nairobi, Kenya'}</div>
                </div>
              </div>

              {/* LinkedIn */}
              <a
                href={profile?.linkedin || "https://linkedin.com/in/colliner-phosta"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#081B35]/70 hover:bg-[#081B35] border border-blue-900/30 hover:border-[#00D4FF]/50 transition-all text-slate-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06152B] border border-blue-800/40 flex items-center justify-center text-[#00D4FF] group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">LinkedIn</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#00D4FF] transition-colors">
                    {profile?.linkedin ? profile.linkedin.replace(/^https?:\/\//, '') : 'linkedin.com/in/colliner-phosta'}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={profile?.github || "https://github.com/phostacolliner"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#081B35]/70 hover:bg-[#081B35] border border-blue-900/30 hover:border-[#00D4FF]/50 transition-all text-slate-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06152B] border border-blue-800/40 flex items-center justify-center text-[#00D4FF] group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">GitHub</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#00D4FF] transition-colors">
                    {profile?.github ? profile.github.replace(/^https?:\/\//, '') : 'github.com/phostacolliner'}
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#06152B] border border-blue-900/50 shadow-2xl shadow-black/80 space-y-6">
              
              <div className="border-b border-blue-900/40 pb-4">
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Fill out the form below to discuss project scopes, econometric analyses, or consulting opportunities.
                </p>
              </div>

              {submitSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3 animate-in fade-in duration-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. Colliner will respond promptly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name and Email side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                      Your Name <span className="text-[#00D4FF]">*</span>
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#081B35] border ${
                        errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-blue-900/50 focus:border-[#00D4FF]'
                      } text-white placeholder-slate-500 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                      Your Email <span className="text-[#00D4FF]">*</span>
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      placeholder="e.g. jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#081B35] border ${
                        errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-blue-900/50 focus:border-[#00D4FF]'
                      } text-white placeholder-slate-500 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Subject <span className="text-[#00D4FF]">*</span>
                  </label>
                  <input
                    id="contact-form-subject"
                    type="text"
                    placeholder="e.g. Power BI Dashboard Development / Econometric Research"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-[#081B35] border ${
                      errors.subject ? 'border-rose-500 ring-1 ring-rose-500' : 'border-blue-900/50 focus:border-[#00D4FF]'
                    } text-white placeholder-slate-500 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.subject && <p className="text-rose-400 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Your Message <span className="text-[#00D4FF]">*</span>
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    placeholder="Briefly describe your objectives, data requirements, or timelines..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-[#081B35] border ${
                      errors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-blue-900/50 focus:border-[#00D4FF]'
                    } text-white placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all shadow-lg shadow-[#0D6EFD]/30 hover:shadow-[0_0_20px_rgba(13,110,253,0.4)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
