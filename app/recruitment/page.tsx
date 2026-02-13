'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

export default function RecruitmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setLoading(false);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        experience: '',
        message: '',
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Join <span className="text-accent">The Warriors</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Are you ready to compete at the highest level? BLACK WARRIORS is always searching for elite talent. If you have what it takes, we want to hear from you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Email */}
              <div className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      recruitment@blackwarriors.gg
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      +91 (555) WARRIORS-1
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Headquarters</h3>
                    <p className="text-muted-foreground text-sm">
                      Mumbai, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="glass p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">What We're Looking For</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Competitive Free Fire experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Tournament proven track record</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Team player mentality</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Willingness to relocate</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Dedication to excellence</span>
                  </li>
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
                  <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in BLACK WARRIORS. Our recruitment team will review your application and contact you within 7 days.
                  </p>
                  <p className="text-accent font-semibold">
                    Good luck, future warrior! 🦁
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground"
                      placeholder="+91 (555) 000-0000"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-semibold mb-2">
                      Position Applying For *
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground"
                    >
                      <option value="">Select a position</option>
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

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold mb-2">
                      Years of Competitive Experience *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground"
                    >
                      <option value="">Select experience level</option>
                      <option value="1">Less than 1 year</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Tell Us About Yourself
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-smooth text-foreground placeholder-muted-foreground resize-none"
                      placeholder="Share your achievements, goals, and why you want to join BLACK WARRIORS..."
                      rows={5}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-accent text-accent-foreground font-bold rounded-lg transition-smooth hover:shadow-lg hover:glow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to be contacted by BLACK WARRIORS recruitment team.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-xl border border-border p-8">
            <h3 className="text-2xl font-bold mb-4">Academy Program</h3>
            <p className="text-muted-foreground mb-4">
              Not quite ready for the main roster? Our academy program is designed to develop emerging talent through intensive training, coaching, and competitive exposure.
            </p>
            <p className="text-accent font-semibold">
              Apply for Academy → Limited spots available
            </p>
          </div>

          <div className="glass rounded-xl border border-border p-8">
            <h3 className="text-2xl font-bold mb-4">Sponsorship Opportunities</h3>
            <p className="text-muted-foreground mb-4">
              Interested in partnering with BLACK WARRIORS? We offer comprehensive sponsorship packages for brands looking to reach the competitive gaming community.
            </p>
            <p className="text-accent font-semibold">
              Contact us at sponsor@blackwarriors.gg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
