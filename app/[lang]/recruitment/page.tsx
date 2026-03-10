'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

export default function RecruitmentPage() {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || 'en';
  const t = dictionaries[currentLang]?.recruitment || dictionaries.en.recruitment;

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', experience: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', role: '', experience: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-accent">{t.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg"><Mail size={24} /></div>
                  <div>
                    <h3 className="font-semibold mb-2">{t.emailLabel}</h3>
                    <p className="text-muted-foreground text-sm">recruitment@blackwarriors.gg</p>
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-semibold mb-2">{t.phoneLabel}</h3>
                    <p className="text-muted-foreground text-sm">+212 (555) WARRIORS-1</p>
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-semibold mb-2">{t.hqLabel}</h3>
                    <p className="text-muted-foreground text-sm">Morocco, MENA</p>
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">{t.requirementsTitle}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[t.req1, t.req2, t.req3, t.req4, t.req5].map((req, i) => (
                    <li key={i} className="flex gap-2"><span className="text-accent">✓</span><span>{req}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl border border-border p-8 md:p-12">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="text-accent mb-4" size={48} />
                  <h2 className="text-2xl font-bold mb-2">{t.successTitle}</h2>
                  <p className="text-muted-foreground mb-6">{t.successMessage}</p>
                  <p className="text-accent font-semibold">{t.successCta}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">{t.fullName}</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground" placeholder={t.namePlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">{t.emailAddress}</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">{t.phoneNumber}</label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground" placeholder="+212 (555) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-semibold mb-2">{t.position}</label>
                    <select id="role" name="role" required value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground">
                      <option value="">{t.selectPosition}</option>
                      <option value="player">Player - AWM Specialist</option>
                      <option value="player">Player - Assault</option>
                      <option value="player">Player - Support</option>
                      <option value="player">Player - IGL</option>
                      <option value="player">Player - Flex</option>
                      <option value="coach">Esports Coach</option>
                      <option value="analyst">Game Analyst</option>
                      <option value="manager">Team Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold mb-2">{t.expLabel}</label>
                    <select id="experience" name="experience" required value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground">
                      <option value="">{t.selectExp}</option>
                      <option value="1">Less than 1 year</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">{t.tellUs}</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground resize-none" placeholder={t.messagePlaceholder} rows={5} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-accent text-accent-foreground font-bold rounded-lg transition-smooth hover:shadow-lg hover:glow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading ? (
                      <><div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />{t.submitting}</>
                    ) : (
                      <>{t.submit}<Send size={18} /></>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">{t.disclaimer}</p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Academy & Sponsor */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-xl border border-border p-8">
            <h3 className="text-2xl font-bold mb-4">{t.academyTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.academyDesc}</p>
            <p className="text-accent font-semibold">{t.academyCta}</p>
          </div>
          <div className="glass rounded-xl border border-border p-8">
            <h3 className="text-2xl font-bold mb-4">{t.sponsorTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.sponsorDesc}</p>
            <p className="text-accent font-semibold">{t.sponsorCta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
