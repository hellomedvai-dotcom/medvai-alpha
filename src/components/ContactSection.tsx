import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { SpatialGlassCard } from './SpatialGlassCard';

interface ContactSectionProps {
  theme: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      
      <div className="relative z-10 w-full max-w-[1080px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-[760px] mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            isDark ? 'text-[#8A92A3] border border-white/10 bg-white/5' : 'text-slate-600 border border-black/10 bg-black/5'
          }`}>
            09 · Get in Touch
          </div>
          <h2 className={`font-heading font-bold text-3xl sm:text-5xl leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Let's Build Better Healthcare Together
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
            Whether you're a patient, doctor, researcher, engineer, designer or simply curious about MEDVAI, we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Email Channel Card (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <SpatialGlassCard isDark={isDark} floatIndex={1} className="p-8 sm:p-10 space-y-6">
              <h3 className="font-heading font-bold text-xl">Direct Communication</h3>

              <div className="flex items-start gap-4 pt-2">
                <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Official Email</h4>
                  <a
                    href="mailto:hellomedvai@gmail.com"
                    className="text-sm font-medium text-emerald-500 hover:underline transition-all block mt-0.5"
                  >
                    hellomedvai@gmail.com
                  </a>
                  <p className={`text-xs mt-1.5 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                    We personally read and reply to every message.
                  </p>
                </div>
              </div>
            </SpatialGlassCard>
          </div>

          {/* Contact Form (lg:col-span-7) */}
          <SpatialGlassCard isDark={isDark} floatIndex={2} className="lg:col-span-7 p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-500">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500" />
                <h3 className="font-heading font-bold text-2xl">Message Received</h3>
                <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-[#BFC5D2]' : 'text-slate-600'}`}>
                  Thank you for reaching out. We will respond directly to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-mono uppercase mb-2 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        isDark 
                          ? 'bg-black/60 border-white/15 text-white placeholder:text-slate-600' 
                          : 'bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono uppercase mb-2 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        isDark 
                          ? 'bg-black/60 border-white/15 text-white placeholder:text-slate-600' 
                          : 'bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-mono uppercase mb-2 ${isDark ? 'text-[#8A92A3]' : 'text-slate-500'}`}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Message"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none ${
                      isDark 
                        ? 'bg-black/60 border-white/15 text-white placeholder:text-slate-600' 
                        : 'bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isDark ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </SpatialGlassCard>

        </div>

      </div>
    </section>
  );
};
