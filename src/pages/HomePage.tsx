import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Code2, Brain, Menu, X } from 'lucide-react';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg" 
                alt="Zenstrin Logo" 
                className="h-16 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#zenstrin-features" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Zenstrin</a>
              <a href="#zenfinder-features" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">ZenFinder</a>
              <a href="/blog" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Blog</a>
              <a href="/contact" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Contact Us</a>
              <button className="px-6 py-2 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full">
                Request Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#zenstrin-features" className="block text-gray-700 hover:text-[#f7961c] transition-colors">Zenstrin</a>
              <a href="#zenfinder-features" className="block text-gray-700 hover:text-[#f7961c] transition-colors">ZenFinder</a>
              <a href="/blog" className="block text-gray-700 hover:text-[#f7961c] transition-colors">Blog</a>
              <a href="/contact" className="block text-gray-700 hover:text-[#f7961c] transition-colors">Contact Us</a>
              <button className="w-full px-6 py-2 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="relative max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-gray-900">
            Empowering the Future of
            <span className="block font-semibold text-[#f7961c] mt-2">
              Real Estate and AI-Driven Commerce
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Intelligent platforms that merge AI innovation with human experience, creating products that redefine speed, trust, and simplicity in the digital world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="group px-8 py-3 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 flex items-center space-x-2 rounded-full">
              <span>Request Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 border border-gray-300 hover:border-[#f7961c] text-gray-700 font-medium transition-colors duration-200 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Zenstrin Features Section */}
      <section id="zenstrin-features" className="py-20 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Zenstrin — Smart Property Management Software
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light mb-2">
            A complete ecosystem for landlords, agents, and property managers to manage their portfolios effortlessly.
          </p>
          <p className="text-sm text-[#f7961c] font-medium">
            Save up to 30% in administrative time with automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Tenant & Lease Management"
            description="Simplify renewals, rent tracking, and communication."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Maintenance Automation"
            description="Log issues, assign contractors, and monitor progress."
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="Financial Sync"
            description="Integrate with tools like Xero for seamless accounting."
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Compliance Hub"
            description="Stay on top of safety, inspections, and legal obligations."
          />
        </div>

        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 p-8 text-center rounded-lg">
          <p className="text-gray-700 font-light mb-2">
            <span className="font-semibold text-gray-900">Why Zenstrin?</span> The global property management software market is expected to reach{' '}
            <span className="font-semibold text-[#f7961c]">$5.4 billion by 2030</span>, growing at 8.1% CAGR.
          </p>
          <p className="text-gray-600 text-sm font-light">
            Help small to mid-size agencies stay competitive through modern tech adoption without enterprise complexity.
          </p>
        </div>
      </section>

      {/* ZenFinder Features Section */}
      <section id="zenfinder-features" className="py-20 px-6 relative bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            ZenFinder — The Voice-First Marketplace
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light mb-2">
            Find a service provider in seconds — just by speaking. An AI-powered, voice-first marketplace that instantly connects users with real service providers.
          </p>
          <p className="text-sm text-[#f7961c] font-medium">
            Voice commerce market forecasted to exceed $55 billion by 2026
          </p>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f7961c] text-white flex items-center justify-center mx-auto mb-4 rounded-full text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">User Speaks Their Need</h4>
              <p className="text-gray-600 text-sm font-light">"I need a plumber."</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f7961c] text-white flex items-center justify-center mx-auto mb-4 rounded-full text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">AI Instantly Matches</h4>
              <p className="text-gray-600 text-sm font-light">Finds qualified options nearby.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f7961c] text-white flex items-center justify-center mx-auto mb-4 rounded-full text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Live Connection</h4>
              <p className="text-gray-600 text-sm font-light">Connects both parties in real-time.</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Speed"
            description="Connects to a provider in seconds."
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Simplicity"
            description="Voice-driven, no forms or browsing."
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="Human Touch"
            description="Real conversations, not chatbots."
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Breadth"
            description="From plumbers to personal trainers — one platform for all."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            The Future of Simplicity is Here
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-light max-w-3xl mx-auto">
            Whether you're managing properties or finding a reliable professional, Zenstrin Technologies bridges the gap between AI automation and human interaction — delivering trust, speed, and intelligence at scale.
          </p>
          <button className="group px-10 py-3 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto rounded-full">
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg" 
                  alt="Zenstrin Logo" 
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-gray-600 text-sm font-light">Empowering the future of real estate and AI-driven commerce</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Products</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#zenstrin-features" className="hover:text-[#f7961c] transition-colors">Zenstrin</a></li>
                <li><a href="#zenfinder-features" className="hover:text-[#f7961c] transition-colors">ZenFinder</a></li>
                <li><a href="#" className="hover:text-[#f7961c] transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-[#f7961c] transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-[#f7961c] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#f7961c] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="/privacy" className="hover:text-[#f7961c] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#f7961c] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#f7961c] transition-colors">Security</a></li>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white border border-gray-200 hover:border-[#f7961c] transition-colors duration-200 rounded-lg">
      <div className="w-12 h-12 bg-[#f7961c] text-white flex items-center justify-center mb-4 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm font-light">{description}</p>
    </div>
  );
}

export default HomePage;