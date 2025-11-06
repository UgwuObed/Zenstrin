import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Send } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
//import { functions } from './firebase/firebase';
import { functions } from '../firebase/firebase';


function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    interest: 'ZenFinder',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
 
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (formData.firstName && formData.lastName && formData.email && formData.message) {
      setIsSubmitting(true);
      setError('');
      
      try {
        const newContactMessage = httpsCallable(functions, 'newContactMessage');
        await newContactMessage({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          subject: `${formData.interest}${formData.company ? ' - ' + formData.company : ''}`,
          comments: formData.message
        });
        
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            interest: 'ZenFinder',
            message: ''
          });
        }, 3000);
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Failed to send message. Please try again or email us directly.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a href="/">
                <img 
                  src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg" 
                  alt="Zenstrin Logo" 
                  className="h-16 w-auto" 
                />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Home</a>
              <a href="/blog" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Blog</a>
              <a href="/contact" className="text-[#f7961c] font-medium">Contact Us</a>
            </div>

            <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="/blog" className="block text-gray-700 hover:text-[#f7961c] transition-colors">Blog</a>
              <a href="/contact" className="block text-[#f7961c]">Contact Us</a>
              <button className="w-full px-6 py-2 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-gray-900">Get in Touch</h1>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Let's discuss how Zenstrin Technologies can transform your business. Our team is ready to help you get started.
          </p>
        </div>
      </section>

      {/* ZenFinder CTA (primary) */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-[#fff7ec] to-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-[#f7961c] font-semibold uppercase tracking-wider text-sm mb-2">ZenFinder</div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Talk to us about the voice-first marketplace</h2>
              <p className="text-gray-700 font-light max-w-2xl">Let our team show you how ZenFinder connects users to providers in seconds and how you can launch in your market.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a href="/blog" className="px-6 py-3 rounded-full bg-[#f7961c] hover:bg-[#e08515] text-white text-center font-medium transition-colors">Learn about ZenFinder</a>
              <a href="#contact-form" className="px-6 py-3 rounded-full border border-[#f7961c] text-[#f7961c] hover:bg-[#fff2e3] text-center font-medium transition-colors">Contact sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Us"
              info="hello@zenstrin.com"
              subInfo="We'll respond within 24 hours"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Call Us"
              info="+1 (555) 123-4567"
              subInfo="Mon-Fri 9am to 6pm EST"
            />
            <ContactCard
              icon={<MapPin className="w-6 h-6" />}
              title="Visit Us"
              info="San Francisco, CA"
              subInfo="Schedule an appointment"
            />
          </div>

          {/* Contact Form (secondary) */}
          <div className="max-w-3xl mx-auto" id="contact-form">
            <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 font-light">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Thank you for your message! We'll be in touch soon.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f7961c] transition-colors"
                      placeholder="John"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f7961c] transition-colors"
                      placeholder="Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f7961c] transition-colors"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f7961c] transition-colors"
                    placeholder="Your Company"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I'm interested in *</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f7961c] transition-colors bg-white"
                    disabled={isSubmitting}
                  >
                    <option value="Zenstrin">Zenstrin - Property Management</option>
                    <option value="ZenFinder">ZenFinder - Voice Marketplace</option>
                    <option value="Both">Both Products</option>
                    <option value="Partnership">Partnership Opportunities</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f7961c] transition-colors resize-none"
                    placeholder="Tell us about your needs..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center font-light">
            Quick answers to common questions about our products and services.
          </p>

          <div className="space-y-6">
            <FAQItem
              question="What is Zenstrin?"
              answer="Zenstrin is a comprehensive property management software designed for landlords, agents, and property managers. It automates tenant management, maintenance tracking, financial reporting, and compliance monitoring."
            />
            <FAQItem
              question="How does ZenFinder work?"
              answer="ZenFinder is a voice-first marketplace that connects users with service providers instantly. Simply speak your need, and our AI matches you with qualified professionals nearby in seconds."
            />
            <FAQItem
              question="Is there a free trial available?"
              answer="Yes! We offer a 14-day free trial for both Zenstrin and ZenFinder. No credit card required to get started."
            />
            <FAQItem
              question="What kind of support do you provide?"
              answer="We provide 24/7 customer support via email, phone, and live chat. Our dedicated team is here to help you succeed with our platforms."
            />
            <FAQItem
              question="Can I integrate Zenstrin with my existing tools?"
              answer="Absolutely! Zenstrin integrates seamlessly with popular accounting software like Xero, QuickBooks, and other essential business tools."
            />
          </div>
        </div>
      </section>
{/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761421748/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b-removebg-preview_puicov.png" 
                  alt="Zenstrin Logo" 
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-gray-600 text-sm font-light">Empowering the future of real estate and AI-driven commerce</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Products</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="https://www.zenstrin.com" className="hover:text-[#f7961c] transition-colors">Property Management Software</a></li>
                <li><a href="https://www.zenfinder.ai" className="hover:text-[#f7961c] transition-colors">ZenFinder</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="/blog" className="hover:text-[#f7961c] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="/privacy-policy" className="hover:text-[#f7961c] transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            <p>&copy; 2025 Zenstrin Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactCard({ icon, title, info, subInfo }: { icon: React.ReactNode; title: string; info: string; subInfo: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-[#f7961c] transition-colors duration-200">
      <div className="w-12 h-12 bg-[#f7961c] text-white flex items-center justify-center mx-auto mb-4 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-900 font-medium mb-1">{info}</p>
      <p className="text-gray-600 text-sm font-light">{subInfo}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className={`text-[#f7961c] text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 font-light">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ContactPage;