import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Menu, X, Calendar, User, Clock, Search } from 'lucide-react';

function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Property Management', 'AI & Voice Tech', 'Industry Insights', 'Product Updates'];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Property Management: AI-Powered Automation',
      excerpt: 'Discover how artificial intelligence is transforming the property management industry and helping landlords save up to 30% in administrative time.',
      category: 'Property Management',
      author: 'Sarah Johnson',
      date: 'October 15, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Voice Commerce: The $55 Billion Opportunity',
      excerpt: 'Exploring the explosive growth of voice-first marketplaces and how ZenFinder is leading the charge in connecting users with service providers.',
      category: 'AI & Voice Tech',
      author: 'Michael Chen',
      date: 'October 12, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Compliance Made Simple: Navigating Property Regulations in 2025',
      excerpt: 'A comprehensive guide to staying compliant with evolving property management regulations and how technology can help.',
      category: 'Industry Insights',
      author: 'David Martinez',
      date: 'October 8, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Introducing Zenstrin 2.0: Enhanced Tenant Communication Features',
      excerpt: 'We are excited to announce major updates to our tenant management system, including real-time chat and automated reminders.',
      category: 'Product Updates',
      author: 'Emily Davis',
      date: 'October 5, 2025',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'How Voice AI is Revolutionizing Customer Service',
      excerpt: 'Learn how businesses are leveraging voice AI technology to provide instant, personalized customer experiences.',
      category: 'AI & Voice Tech',
      author: 'Alex Thompson',
      date: 'October 1, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Small Property Managers: Competing in a Digital World',
      excerpt: 'Strategies and tools that help small to mid-size property management agencies stay competitive without enterprise budgets.',
      category: 'Industry Insights',
      author: 'Rachel Green',
      date: 'September 28, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-7 h-7 text-orange-500" />
              <span className="text-2xl font-semibold text-gray-900">
                Zenstrin
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Home</a>
              <a href="/blog" className="text-orange-500 font-medium">Blog</a>
              <a href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Contact Us</a>
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200 rounded-full">
                Get Started
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
              <a href="/" className="block text-gray-700 hover:text-orange-500 transition-colors">Home</a>
              <a href="/blog" className="block text-orange-500">Blog</a>
              <a href="/contact" className="block text-gray-700 hover:text-orange-500 transition-colors">Contact Us</a>
              <button className="w-full px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200 rounded-full">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-gray-900">
            Insights & Updates
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-light">
            Expert perspectives on property management, AI innovation, and the future of voice commerce.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {selectedCategory === 'All' && (
            <div className="mb-16">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-colors duration-200">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto bg-gray-200">
                    <img 
                      src={blogPosts[0].image} 
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full mb-4 w-fit">
                      Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 font-light">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{blogPosts[0].author}</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">{blogPosts[0].date}</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <button className="group flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(selectedCategory === 'All' ? 1 : 0).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-light">
            Get the latest insights on property management and AI innovation delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200 rounded-full whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <span className="text-xl font-semibold text-gray-900">Zenstrin</span>
              </div>
              <p className="text-gray-600 text-sm font-light">Empowering the future of real estate and AI-driven commerce</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Products</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="/#zenstrin-features" className="hover:text-orange-500 transition-colors">Zenstrin</a></li>
                <li><a href="/#zenfinder-features" className="hover:text-orange-500 transition-colors">ZenFinder</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-orange-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Security</a></li>
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

function BlogCard({ post }: { post: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all duration-200 hover:shadow-lg">
      <div className="h-48 bg-gray-200">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">
          {post.category}
        </span>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 font-light line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Calendar className="w-3 h-3 mr-1" />
          <span className="mr-3">{post.date}</span>
          <Clock className="w-3 h-3 mr-1" />
          <span>{post.readTime}</span>
        </div>
        <button className="group flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors text-sm">
          Read More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default BlogPage;