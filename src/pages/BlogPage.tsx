import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Calendar, User, Clock, Search, ArrowLeft } from 'lucide-react';

// Blog post data moved to a separate constant for reusability
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Property Management: AI-Powered Automation',
    excerpt: 'Discover how artificial intelligence is transforming the property management industry and helping landlords save up to 30% in administrative time.',
    category: 'Property Management',
    author: 'Sarah Johnson',
    date: 'October 15, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
    content: `
      <p>Artificial intelligence is revolutionizing the property management industry in ways we never imagined. From automated tenant screening to predictive maintenance, AI-powered solutions are helping landlords and property managers save valuable time and resources.</p>
      
      <h2>The Rise of Smart Property Management</h2>
      <p>Traditional property management has long been plagued by manual processes, paperwork, and time-consuming administrative tasks. However, with the advent of AI technology, we're seeing a significant shift towards automation and efficiency.</p>
      
      <p>According to recent studies, property managers who implement AI solutions report saving up to 30% in administrative time. This translates to more time spent on strategic decision-making and tenant relationships rather than mundane tasks.</p>
      
      <h2>Key AI Applications in Property Management</h2>
      <ul>
        <li><strong>Automated Tenant Screening:</strong> AI algorithms can analyze applicant data, credit history, and rental patterns to provide comprehensive tenant assessments.</li>
        <li><strong>Predictive Maintenance:</strong> Machine learning models can predict when maintenance issues are likely to occur, allowing for proactive repairs.</li>
        <li><strong>Smart Communication:</strong> AI-powered chatbots handle routine tenant inquiries 24/7, freeing up property managers for more complex issues.</li>
        <li><strong>Rent Optimization:</strong> AI analyzes market data to suggest optimal rental prices based on location, amenities, and market trends.</li>
      </ul>
      
      <h2>Real-World Impact</h2>
      <p>One property management company reported a 45% reduction in maintenance costs after implementing AI-powered predictive maintenance. Another saw tenant satisfaction scores increase by 35% due to faster response times and improved communication.</p>
      
      <p>The future of property management is here, and it's powered by artificial intelligence. As these technologies continue to evolve, we can expect even greater efficiencies and innovations in the industry.</p>
    `
  },
  {
    id: 2,
    title: 'Voice Commerce: The $55 Billion Opportunity',
    excerpt: 'Exploring the explosive growth of voice-first marketplaces and how ZenFinder is leading the charge in connecting users with service providers.',
    category: 'AI & Voice Tech',
    author: 'Michael Chen',
    date: 'October 12, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop',
    content: `
      <p>Voice commerce is rapidly emerging as one of the most exciting frontiers in digital commerce, with projections indicating it will become a $55 billion market by 2027. This transformative technology is changing how consumers discover and purchase services.</p>
      
      <h2>The Voice-First Revolution</h2>
      <p>With the proliferation of smart speakers and voice assistants, consumers are increasingly comfortable using voice commands to search for services, make purchases, and interact with businesses. This shift represents a fundamental change in user behavior that forward-thinking companies are leveraging.</p>
      
      <h2>ZenFinder's Innovative Approach</h2>
      <p>At ZenFinder, we're pioneering voice-first marketplace technology that connects users with local service providers through natural language interactions. Our platform understands context, preferences, and location to deliver highly relevant recommendations.</p>
      
      <p>Key features of our voice commerce platform include:</p>
      <ul>
        <li>Natural language processing for intuitive user interactions</li>
        <li>Personalized recommendations based on user history and preferences</li>
        <li>Seamless integration with existing service provider systems</li>
        <li>Real-time availability and booking capabilities</li>
      </ul>
      
      <h2>Market Impact and Opportunities</h2>
      <p>Early adopters of voice commerce are seeing remarkable results. Service providers using ZenFinder report a 60% increase in qualified leads and a 40% reduction in customer acquisition costs. For consumers, the convenience of finding and booking services through voice commands is driving higher engagement and satisfaction.</p>
      
      <p>As voice technology continues to improve and consumer adoption grows, the opportunities in voice commerce will only expand. Businesses that embrace this technology now will be well-positioned to capture market share in this rapidly growing segment.</p>
    `
  },
  {
    id: 3,
    title: 'Compliance Made Simple: Navigating Property Regulations in 2025',
    excerpt: 'A comprehensive guide to staying compliant with evolving property management regulations and how technology can help.',
    category: 'Industry Insights',
    author: 'David Martinez',
    date: 'October 8, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    content: `
      <p>Staying compliant with property management regulations has never been more challenging—or more important. With new laws and regulations emerging at both state and federal levels, property managers need robust systems to ensure compliance and avoid costly penalties.</p>
      
      <h2>The Changing Regulatory Landscape</h2>
      <p>2025 has brought significant changes to property management regulations, including updated fair housing requirements, new energy efficiency standards, and enhanced tenant protection laws. Keeping up with these changes manually is nearly impossible for busy property managers.</p>
      
      <h2>Technology Solutions for Compliance</h2>
      <p>Modern property management platforms like Zenstrin are incorporating compliance features that automatically update with regulatory changes. These systems provide:</p>
      
      <ul>
        <li>Automated document generation with current legal requirements</li>
        <li>Real-time alerts about regulatory changes in your area</li>
        <li>Compliance checklists for property inspections and maintenance</li>
        <li>Digital record-keeping for audit trails</li>
      </ul>
      
      <h2>Best Practices for Compliance Management</h2>
      <p>Beyond technology, successful compliance management requires a proactive approach:</p>
      
      <ol>
        <li>Regular training for staff on current regulations</li>
        <li>Documented processes for common compliance scenarios</li>
        <li>Quarterly reviews of compliance procedures</li>
        <li>Partnership with legal experts specializing in property law</li>
      </ol>
      
      <h2>The Cost of Non-Compliance</h2>
      <p>The financial and reputational costs of compliance failures can be devastating. Fines for regulatory violations have increased by 25% in the past year alone, not to mention the potential for lawsuits and damage to your brand reputation.</p>
      
      <p>By leveraging technology and implementing strong compliance processes, property managers can navigate the complex regulatory environment with confidence and focus on growing their business.</p>
    `
  },
  {
    id: 4,
    title: 'Introducing Zenstrin 2.0: Enhanced Tenant Communication Features',
    excerpt: 'We are excited to announce major updates to our tenant management system, including real-time chat and automated reminders.',
    category: 'Product Updates',
    author: 'Emily Davis',
    date: 'October 5, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    content: `
      <p>We're thrilled to announce the release of Zenstrin 2.0, our most significant update yet, featuring groundbreaking improvements to tenant communication and engagement tools.</p>
      
      <h2>Real-Time Chat System</h2>
      <p>Our new real-time chat feature enables instant communication between property managers and tenants. Unlike email or traditional messaging, this system provides immediate responses and keeps all communication organized in one place.</p>
      
      <p>Key benefits include:</p>
      <ul>
        <li>Faster response times to tenant inquiries</li>
        <li>Reduced communication gaps and misunderstandings</li>
        <li>Automated responses for common questions</li>
        <li>Secure message history for reference</li>
      </ul>
      
      <h2>Smart Automated Reminders</h2>
      <p>Never miss important deadlines again with our enhanced automated reminder system. Zenstrin 2.0 now sends intelligent reminders for:</p>
      
      <ul>
        <li>Rent payments and due dates</li>
        <li>Maintenance schedule updates</li>
        <li>Lease renewal deadlines</li>
        <li>Property inspection appointments</li>
        <li>Community events and notices</li>
      </ul>
      
      <h2>Enhanced Mobile Experience</h2>
      <p>We've completely redesigned our mobile app with a focus on user experience. Tenants can now:</p>
      
      <ul>
        <li>Submit maintenance requests with photos</li>
        <li>Pay rent securely through the app</li>
        <li>Access important documents anytime</li>
        <li>Receive push notifications for urgent updates</li>
      </ul>
      
      <h2>Getting Started with Zenstrin 2.0</h2>
      <p>Existing customers will automatically receive the update, and we've prepared comprehensive guides and training materials to help you make the most of these new features. Schedule a demo with our team to see Zenstrin 2.0 in action and learn how it can transform your tenant communication strategy.</p>
    `
  },
  {
    id: 5,
    title: 'How Voice AI is Revolutionizing Customer Service',
    excerpt: 'Learn how businesses are leveraging voice AI technology to provide instant, personalized customer experiences.',
    category: 'AI & Voice Tech',
    author: 'Alex Thompson',
    date: 'October 1, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop',
    content: `
      <p>Voice AI is transforming customer service from a cost center to a strategic advantage. Businesses that implement voice AI solutions are seeing dramatic improvements in customer satisfaction, operational efficiency, and cost reduction.</p>
      
      <h2>The Evolution of Customer Service</h2>
      <p>Traditional customer service models rely heavily on human agents, leading to long wait times, inconsistent experiences, and high operational costs. Voice AI changes this paradigm by providing instant, personalized assistance 24/7.</p>
      
      <h2>Key Benefits of Voice AI in Customer Service</h2>
      <ul>
        <li><strong>24/7 Availability:</strong> Voice AI systems never sleep, providing constant support to customers across time zones.</li>
        <li><strong>Instant Responses:</strong> Customers get immediate answers to their questions without waiting on hold.</li>
        <li><strong>Personalized Interactions:</strong> Advanced AI understands context and customer history to provide tailored assistance.</li>
        <li><strong>Multilingual Support:</strong> Serve customers in their preferred language without hiring bilingual staff.</li>
        <li><strong>Scalability:</strong> Handle thousands of simultaneous conversations without additional costs.</li>
      </ul>
      
      <h2>Real-World Success Stories</h2>
      <p>Companies implementing voice AI for customer service report impressive results:</p>
      
      <ul>
        <li>A major retail chain reduced customer service costs by 40% while improving satisfaction scores</li>
        <li>A financial services company handled 60% of customer inquiries through voice AI, freeing human agents for complex issues</li>
        <li>A property management firm saw a 50% reduction in call volume to their support center</li>
      </ul>
      
      <h2>Implementing Voice AI Successfully</h2>
      <p>Successful voice AI implementation requires careful planning:</p>
      
      <ol>
        <li>Identify common customer inquiries that can be automated</li>
        <li>Design natural, conversational flows</li>
        <li>Ensure seamless handoff to human agents when needed</li>
        <li>Continuously train and improve the AI based on real interactions</li>
      </ol>
      
      <p>The future of customer service is conversational, personalized, and available everywhere. Voice AI is making this future a reality today.</p>
    `
  },
  {
    id: 6,
    title: 'Small Property Managers: Competing in a Digital World',
    excerpt: 'Strategies and tools that help small to mid-size property management agencies stay competitive without enterprise budgets.',
    category: 'Industry Insights',
    author: 'Rachel Green',
    date: 'September 28, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    content: `
      <p>Small and mid-size property management companies face unique challenges in today's digital landscape. While large corporations have massive budgets for technology and marketing, smaller agencies can leverage smart strategies and affordable tools to compete effectively.</p>
      
      <h2>The Digital Advantage for Smaller Players</h2>
      <p>While large companies struggle with bureaucracy and slow decision-making, smaller property managers can be more agile and responsive. This flexibility, combined with the right technology, creates significant competitive advantages.</p>
      
      <h2>Essential Tools for Small Property Managers</h2>
      <p>You don't need enterprise-level budgets to access powerful property management tools. Focus on these essential categories:</p>
      
      <ul>
        <li><strong>All-in-One Management Platforms:</strong> Solutions like Zenstrin provide comprehensive features at affordable price points</li>
        <li><strong>Digital Marketing Tools:</strong> Cost-effective platforms for social media management and email marketing</li>
        <li><strong>Communication Systems:</strong> Automated messaging and tenant portals improve service without increasing staff</li>
        <li><strong>Financial Management:</strong> Cloud-based accounting and rent collection systems</li>
      </ul>
      
      <h2>Differentiation Strategies</h2>
      <p>Smaller agencies can compete by focusing on areas where large companies often fall short:</p>
      
      <ol>
        <li><strong>Personalized Service:</strong> Build strong relationships with property owners and tenants</li>
        <li><strong>Local Expertise:</strong> Leverage deep knowledge of specific neighborhoods and markets</li>
        <li><strong>Specialization:</strong> Focus on specific property types or client segments</li>
        <li><strong>Community Involvement:</strong> Build reputation through local partnerships and sponsorships</li>
      </ol>
      
      <h2>Cost-Effective Marketing Approaches</h2>
      <p>Smart marketing doesn't require big budgets:</p>
      
      <ul>
        <li>Leverage social media to build community and showcase properties</li>
        <li>Implement referral programs to generate qualified leads</li>
        <li>Create valuable content that demonstrates your expertise</li>
        <li>Optimize your website for local search results</li>
      </ul>
      
      <h2>Success Stories</h2>
      <p>Many small property management companies are thriving by embracing these strategies. One agency with just 200 units under management increased their portfolio by 35% in one year by focusing on personalized service and leveraging affordable technology tools.</p>
      
      <p>The key is to be strategic about where you invest your limited resources and focus on delivering exceptional value where large competitors can't easily match you.</p>
    `
  }
];

function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Property Management', 'AI & Voice Tech', 'Industry Insights', 'Product Updates'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // If a post is selected, show the article detail view
  if (selectedPost) {
    return <ArticleDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
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

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Home</a>
              <a href="/blog" className="text-[#f7961c] font-medium">Blog</a>
              <a href="/contact" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Contact Us</a>
              <button className="px-6 py-2 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full">
                Request Demo
              </button>
            </div>

            <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="/" className="block text-gray-700 hover:text-[#f7961c] transition-colors">Home</a>
              <a href="/blog" className="block text-[#f7961c]">Blog</a>
              <a href="/contact" className="block text-gray-700 hover:text-[#f7961c] transition-colors">Contact Us</a>
              <button className="w-full px-6 py-2 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full">
                Request Demo
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
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#f7961c] transition-colors"
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
                    ? 'bg-[#f7961c] text-white'
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
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-[#f7961c] transition-colors duration-200 cursor-pointer" onClick={() => setSelectedPost(blogPosts[0])}>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto bg-gray-200">
                    <img 
                      src={blogPosts[0].image} 
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-[#f7961c] text-white text-xs font-medium rounded-full mb-4 w-fit">
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
                    <div className="group flex items-center text-[#f7961c] font-medium hover:text-[#e08515] transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(selectedCategory === 'All' ? 1 : 0).map((post) => (
              <BlogCard key={post.id} post={post} onReadMore={() => setSelectedPost(post)} />
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
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#f7961c] transition-colors"
            />
            <button className="px-8 py-3 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full whitespace-nowrap">
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
                <li><a href="/#zenstrin-features" className="hover:text-[#f7961c] transition-colors">Zenstrin</a></li>
                <li><a href="/#zenfinder-features" className="hover:text-[#f7961c] transition-colors">ZenFinder</a></li>
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
                <li><a href="/privacy-policy" className="hover:text-[#f7961c] transition-colors">Privacy</a></li>
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

function BlogCard({ post, onReadMore }: { post: any, onReadMore: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#f7961c] transition-all duration-200 hover:shadow-lg cursor-pointer" onClick={onReadMore}>
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
        <div className="group flex items-center text-[#f7961c] font-medium hover:text-[#e08515] transition-colors text-sm">
          Read More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function ArticleDetail({ post, onBack }: { post: any, onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg" 
                alt="Zenstrin Logo" 
                className="h-16 w-auto"
              />
            </div>
            <button
              onClick={onBack}
              className="flex items-center text-gray-700 hover:text-[#f7961c] transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </button>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Header */}
          <header className="mb-12">
            <span className="inline-block px-4 py-2 bg-[#f7961c] text-white text-sm font-medium rounded-full mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center text-gray-600 gap-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back to Blog Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={onBack}
              className="group flex items-center text-[#f7961c] font-medium hover:text-[#e08515] transition-colors text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </button>
          </div>
        </div>
      </article>

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
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#f7961c] transition-colors"
            />
            <button className="px-8 py-3 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full whitespace-nowrap">
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
                <li><a href="/#zenstrin-features" className="hover:text-[#f7961c] transition-colors">Zenstrin</a></li>
                <li><a href="/#zenfinder-features" className="hover:text-[#f7961c] transition-colors">ZenFinder</a></li>
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
                <li><a href="/privacy-policy" className="hover:text-[#f7961c] transition-colors">Privacy</a></li>
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

export default BlogPage;