'use client';

import { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';
import { submitRecruitmentForm } from '@/app/actions/submit-recruitment';
import { toast } from 'sonner';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

export default function RecruitmentPage() {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || 'en';
  const t = dictionaries[currentLang]?.recruitment || dictionaries.en.recruitment;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    message: '',
    profilePicture: '',
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        setFormData((prev) => ({ ...prev, profilePicture: compressedBase64 }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, profilePicture: '' }));
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await submitRecruitmentForm(formData);
      
      if (response.success) {
        setSubmitted(true);
        toast.success(t.successTitle || 'Application Submitted!');
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', role: '', experience: '', message: '', profilePicture: '' });
          setFileName('');
          setSubmitted(false);
        }, 3000);
      } else {
        toast.error(response.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
                    <p className="text-muted-foreground text-sm">abdelhamidelaali@gmail.com</p>
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
                      <option value="First Rusher">First Rusher</option>
                      <option value="Second Rusher">Second Rusher</option>
                      <option value="Support Specialist">Support Specialist</option>
                      <option value="Cover AWM">Cover AWM</option>
                      <option value="Bomber">Bomber</option>
                      <option value="Esports Coach">Esports Coach</option>
                      <option value="Team Manager">Team Manager</option>
                      <option value="Other">Other</option>
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

                  {/* Game Profile Picture (Optional) */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center justify-between">
                      <span>{t.gameProfilePic}</span>
                      <span className="text-xs text-muted-foreground font-normal">{t.optional}</span>
                    </label>

                    {formData.profilePicture ? (
                      <div className="relative rounded-lg border border-accent/40 bg-accent/5 p-4 flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden border border-accent/30 flex-shrink-0 bg-black">
                          <img src={formData.profilePicture} alt="Game Profile Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{fileName || 'Profile_Screenshot.png'}</p>
                          <p className="text-xs text-accent font-medium mt-1">✓ Screenshot Attached</p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-smooth"
                          title={t.removeImage}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border hover:border-accent/50 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:bg-accent/5 group"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                            <UploadCloud size={24} />
                          </div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {t.gameProfilePic}
                          </p>
                          <p className="text-xs text-muted-foreground max-w-sm">
                            {t.uploadHint}
                          </p>
                        </div>
                      </div>
                    )}
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
