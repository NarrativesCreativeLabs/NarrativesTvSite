import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-textMain">
            Let's Create <span className="text-primary glow-primary">Together</span>
          </h2>
          <p className="text-xl text-textMuted max-w-3xl mx-auto">
            Have a project in mind? Get in touch and let's bring your story to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-mono uppercase tracking-wider text-textMuted mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-textMain focus:outline-none focus:border-primary focus:box-glow-primary transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono uppercase tracking-wider text-textMuted mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-textMain focus:outline-none focus:border-primary focus:box-glow-primary transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-mono uppercase tracking-wider text-textMuted mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-textMain focus:outline-none focus:border-primary focus:box-glow-primary transition-all duration-200"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono uppercase tracking-wider text-textMuted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-textMain focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cta-button bg-primary text-background border-primary hover:bg-primary-dark hover:border-primary-dark hover:box-glow-primary hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-textMain mb-6">Get in Touch</h3>
              <p className="text-textMuted leading-relaxed mb-8">
                Ready to start your next project? Reach out to us through any of the channels below, 
                or fill out the form and we'll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface/50 border border-border hover:border-primary hover:box-glow-primary transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-textMain font-bold mb-1">Email</h4>
                  <a href="mailto:hello@narratives.studio" className="text-textMuted hover:text-primary transition-colors duration-200">
                    hello@narratives.studio
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface/50 border border-border hover:border-primary hover:box-glow-primary transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-textMain font-bold mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-textMuted hover:text-primary transition-colors duration-200">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface/50 border border-border hover:border-primary hover:box-glow-primary transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-textMain font-bold mb-1">Location</h4>
                  <p className="text-textMuted">
                    123 Creative Street<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Placeholder */}
            <div className="pt-8">
              <h4 className="text-textMain font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((platform, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-lg bg-surface/50 border border-border hover:border-primary hover:bg-primary/10 hover:box-glow-primary flex items-center justify-center text-textMuted hover:text-primary transition-all duration-300"
                  >
                    {platform.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
