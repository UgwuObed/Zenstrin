import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Calendar, User, Clock, Search, ArrowLeft } from 'lucide-react';
import { getAllPosts } from '../data/blogPost';

const blogPosts = getAllPosts();

function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [highlightedPostId, setHighlightedPostId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash routing when component mounts
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const postId = hash.replace('#', '');
        setHighlightedPostId(postId);
        
        // Scroll to the post after a short delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(`post-${postId}`);
          if (element) {
            const yOffset = -100; // Adjust for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            
            // Add highlight effect
            element.style.transition = 'all 0.5s ease';
            element.style.boxShadow = '0 0 0 3px rgba(247, 150, 28, 0.3)';
            element.style.backgroundColor = 'rgba(247, 150, 28, 0.05)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
              element.style.boxShadow = '';
              element.style.backgroundColor = '';
              setHighlightedPostId(null);
            }, 3000);
          }
        }, 100);
      }
    };

    // Check for hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const categories = ['All', 'Product Launch', 'Funding', 'Property Management', 'AI & Voice Tech', 'Industry Insights', 'Product Updates'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
              <a href="/">
                <img 
                  src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg" 
                  alt="Zenstrin Logo" 
                  className="h-16 w-auto" 
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Zenstrin</a>
              <a href="/blog" className="text-[#f7961c] font-medium">Blog</a>
              <a href="/contact" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">Contact Us</a>
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
              <div 
                id={`post-${blogPosts[0].id}`}
                className={`bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-[#f7961c] transition-colors duration-200 cursor-pointer ${
                  highlightedPostId === blogPosts[0].id.toString() ? 'ring-2 ring-[#f7961c] bg-orange-50' : ''
                }`} 
                onClick={() => setSelectedPost(blogPosts[0])}
              >
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
              <BlogCard 
                key={post.id} 
                post={post} 
                onReadMore={() => setSelectedPost(post)}
                isHighlighted={highlightedPostId === post.id.toString()}
              />
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
                <li><a href="/#zenstrin-features" className="hover:text-[#f7961c] transition-colors">Property Management Software</a></li>
                <li><a href="/#zenfinder-features" className="hover:text-[#f7961c] transition-colors">ZenFinder</a></li>
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

function BlogCard({ post, onReadMore, isHighlighted }: { post: any, onReadMore: () => void, isHighlighted?: boolean }) {
  return (
    <div 
      id={`post-${post.id}`}
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#f7961c] transition-all duration-200 hover:shadow-lg cursor-pointer ${
        isHighlighted ? 'ring-2 ring-[#f7961c] bg-orange-50' : ''
      }`} 
      onClick={onReadMore}
    >
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
  const relatedPosts = blogPosts.filter(p => 
    p.id !== post.id && p.category === post.category
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
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
              className="flex items-center text-gray-700 hover:text-[#f7961c] transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
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
            <span className="inline-block px-4 py-2 bg-[#f7961c] text-white text-sm font-medium rounded-full mb-6 shadow-sm">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7961c] to-[#e08515] flex items-center justify-center text-white font-semibold mr-3">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2 text-[#f7961c]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-[#f7961c]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-16 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-72 md:h-[500px] object-cover"
            />
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg md:prose-xl max-w-none 
            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-headings:mt-8
            prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-[#f7961c] prose-h2:pl-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-li:text-gray-700 prose-li:mb-2
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ol:my-6
            prose-a:text-[#f7961c] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-[#f7961c] prose-blockquote:bg-orange-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer - Share & Tags */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {['AI', 'PropTech', 'Innovation'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-sm font-medium">Share:</span>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#f7961c] hover:text-white transition-all flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#f7961c] hover:text-white transition-all flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#f7961c] hover:text-white transition-all flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-[#f7961c] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-[#f7961c] font-medium text-sm">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={onBack}
              className="group flex items-center text-[#f7961c] font-semibold hover:text-[#e08515] transition-colors text-lg"
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
                <li><a href="/#zenstrin-features" className="hover:text-[#f7961c] transition-colors">Property Management Software</a></li>
                <li><a href="/#zenfinder-features" className="hover:text-[#f7961c] transition-colors">ZenFinder</a></li>
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

export default BlogPage;