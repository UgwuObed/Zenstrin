import React, { useEffect, useRef, useState } from 'react';

export default function ZenstrinLandingPage() {
  const codeBackgroundRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const codeBackground = codeBackgroundRef.current;
    if (!codeBackground) return;

    const characters = '+-=/*<>[]{}()#@$%&|\\';
    const charsPerLine = 200;
    const lines = 100;

    let codeHTML = '';
    for (let i = 0; i < lines; i++) {
      let line = '';
      for (let j = 0; j < charsPerLine; j++) {
        if (Math.random() > 0.7) {
          line += characters[Math.floor(Math.random() * characters.length)];
        } else {
          line += ' ';
        }
      }
      const delay = i * 0.02;
      const duration = 2 + Math.random() * 2;
      codeHTML += `<div class="code-line" style="animation-delay: ${delay}s; animation-duration: ${duration}s">${line}</div>`;
    }
    codeBackground.innerHTML = codeHTML;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const codeLines = heroRef.current.querySelectorAll<HTMLDivElement>('.code-line');
    codeLines.forEach((line) => {
      const lineRect = line.getBoundingClientRect();
      const lineY = lineRect.top - rect.top + lineRect.height / 2;
      const lineX = lineRect.left - rect.left + lineRect.width / 2;

      const distance = Math.hypot(lineX - mouseX, lineY - mouseY);

      if (distance < 150) {
        const intensity = (150 - distance) / 150;
        const dx = lineX - mouseX;
        const dy = lineY - mouseY;
        const angle = Math.atan2(dy, dx);
        const pushAmount = intensity * intensity * 20;
        const pushX = Math.cos(angle) * pushAmount;
        const pushY = Math.sin(angle) * pushAmount;
        const glowIntensity = intensity * 0.8;

        (line as HTMLElement).style.transform = `translate(${pushX}px, ${pushY}px) scale(${1 + intensity * 0.12})`;
        (line as HTMLElement).style.textShadow = `0 0 ${glowIntensity * 30}px rgba(247, 150, 28, ${glowIntensity})`;
        (line as HTMLElement).style.color = `rgba(100, 150, 200, ${0.25 + intensity * 0.35})`;
      } else {
        (line as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
        (line as HTMLElement).style.textShadow = 'none';
        (line as HTMLElement).style.color = 'rgba(100, 150, 200, 0.25)';
      }
    });
  };

  const handleMouseLeave = () => {
    if (!heroRef.current) return;
    
    const codeLines = heroRef.current.querySelectorAll<HTMLDivElement>('.code-line');
    codeLines.forEach(line => {
      (line as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
      (line as HTMLElement).style.textShadow = 'none';
      (line as HTMLElement).style.color = 'rgba(100, 150, 200, 0.25)';
    });
  };

  return (
    <div className="landing-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          color: #1a1a1a;
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        .landing-page {
          width: 100%;
          overflow-x: hidden;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 20px 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .logo img {
          height: 50px;
          width: auto;
        }
        
        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
          align-items: center;
        }
        
        .nav-links a {
          color: #ffffff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
        }

        header.scrolled .nav-links a {
          color: #1a1a1a;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #f7961c;
          transition: width 0.3s ease;
        }
        
        .nav-links a:hover {
          color: white;
        }

        .nav-links a:hover::after {
          width: 100%;
        }
        
        .nav-cta {
          background: #1a1a1a;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        header.scrolled .nav-cta {
          background: #f7961c;
          border-color: #f7961c;
        }
        
        .nav-cta:hover {
          background: #f7961c;
          border-color: #f7961c;
          transform: translateY(-2px);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1001;
        }

        .mobile-menu-btn svg {
          width: 24px;
          height: 24px;
          stroke: #ffffff;
        }

        header.scrolled .mobile-menu-btn svg {
          stroke: #1a1a1a;
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          padding: 80px 40px 40px;
          z-index: 999;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu.open {
          display: block;
        }

        .mobile-menu a {
          display: block;
          padding: 16px 0;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: color 0.3s ease;
        }

        .mobile-menu a:hover {
          color: #f7961c;
        }

        .mobile-menu .nav-cta {
          margin-top: 20px;
          display: inline-block;
        }
        
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #0a0a0f;
          overflow: hidden;
        }
        
        .code-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(100, 150, 200, 0.25);
          overflow: hidden;
          white-space: pre;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          animation: scrollCode 60s linear infinite;
          z-index: 2;
        }
        
        @keyframes scrollCode {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20%); }
        }
        
        .code-line {
          opacity: 0;
          animation: fadeIn 2s ease-in-out forwards, shimmer 3s ease-in-out infinite;
          transition: transform 0.15s ease-out, text-shadow 0.15s ease-out, color 0.15s ease-out;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1000px;
        }
        
        .hero-tag {
          display: inline-block;
          padding: 10px 20px;
          background: rgba(247, 150, 28, 0.15);
          border: 1px solid rgba(247, 150, 28, 0.3);
          border-radius: 4px;
          color: #a8c5e6;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 40px;
        }
        
        h1 {
          font-size: 80px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          line-height: 1.1;
        }
        
        h1 .highlight {
          color: #f7961c;
          display: block;
        }
        
        .hero-subtitle {
          font-size: 28px;
          color: #a0a0a0;
          margin-bottom: 50px;
          font-weight: 400;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          display: inline-block;
          padding: 18px 40px;
          background: #ffffff;
          color: #0a0a0f;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          border: 2px solid #ffffff;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background: #f7961c;
          border-color: #f7961c;
          color: #ffffff;
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          display: inline-block;
          padding: 18px 40px;
          background: transparent;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
        
        .btn-secondary:hover {
          border-color: #f7961c;
          color: #f7961c;
        }
        
        .white-section {
          background: #ffffff;
          padding: 120px 0;
        }
        
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 80px;
        }
        
        .section-tag {
          color: #f7961c;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }
        
        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .section-description {
          font-size: 20px;
          color: #666;
          line-height: 1.6;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }
        
        .feature-card {
          padding: 40px;
          background: #fafafa;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #f7961c;
          box-shadow: 0 10px 30px rgba(247, 150, 28, 0.1);
        }
        
        .feature-icon {
          width: 60px;
          height: 60px;
          background: #f7961c;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 25px;
          color: #ffffff;
        }
        
        .feature-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
        }
        
        .feature-text {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
        }
        
        .team-section {
          background: #f7961c;
          padding: 120px 0;
          color: #ffffff;
        }
        
        .team-section .section-tag {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .team-section .section-title {
          color: #ffffff;
        }
        
        .team-section .section-description {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .stats {
          display: flex;
          justify-content: center;
          gap: 80px;
          flex-wrap: wrap;
          margin-top: 60px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          font-size: 64px;
          font-weight: 700;
          color: #ffffff;
          display: block;
          margin-bottom: 10px;
        }
        
        .stat-label {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        .cta-section {
          background: #0a0a0f;
          padding: 120px 0;
          text-align: center;
          color: #ffffff;
        }
        
        .cta-section .section-title {
          color: #ffffff;
          margin-bottom: 30px;
        }
        
        .cta-section .section-description {
          color: #a0a0a0;
          margin-bottom: 50px;
        }
        
        footer {
          background: #ffffff;
          padding: 60px 0 40px;
          border-top: 1px solid #e0e0e0;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 40px;
        }
        
        .footer-links {
          display: flex;
          gap: 40px;
        }
        
        .footer-links a {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #f7961c;
        }
        
        .copyright {
          text-align: center;
          color: #999;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 48px;
          }
          
          .hero-subtitle {
            font-size: 20px;
          }
          
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
          
          .container {
            padding: 0 20px;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
          }
          
          .stats {
            gap: 40px;
          }
        }
      `}</style>

      <header className={scrollY > 50 ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            <div className="logo">
              <img
                src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761421748/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b-removebg-preview_puicov.png"
                alt="Zenstrin Logo"
              />
            </div>
            <ul className="nav-links">
              <li><a href="#zenstrin">Zenstrin</a></li>
              <li><a href="#zenfinder">ZenFinder</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact" className="nav-cta">Contact Us ↗</a></li>
            </ul>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <a href="#zenstrin" onClick={() => setIsMenuOpen(false)}>Zenstrin</a>
        <a href="#zenfinder" onClick={() => setIsMenuOpen(false)}>ZenFinder</a>
        <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
        <a href="#" className="nav-cta">Get Started ↗</a>
      </div>

      <section 
        className="hero" 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="code-background" ref={codeBackgroundRef}></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">[ EMPOWERING REAL ESTATE ]</div>
            <h1>
              WE'RE THE MAKERS OF
              <span className="highlight">[ ZENSTRIN ]</span>
            </h1>
            <p className="hero-subtitle">The AI-powered property management platform</p>
            <div className="hero-buttons">
              <a href="#" className="btn-primary">REQUEST DEMO ↗</a>
              <a href="#" className="btn-secondary">LEARN MORE ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section id="zenstrin" className="white-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">ZENSTRIN PLATFORM</div>
            <h2 className="section-title">Complete property management ecosystem</h2>
            <p className="section-description">
              A complete ecosystem for landlords, agents, and property managers to manage their 
              portfolios effortlessly. Save up to 30% in administrative time with automation.
            </p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3 className="feature-title">Tenant & Lease Management</h3>
              <p className="feature-text">
                Simplify renewals, rent tracking, and communication with an intuitive dashboard.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3 className="feature-title">Maintenance Automation</h3>
              <p className="feature-text">
                Log issues, assign contractors, and monitor progress in real-time.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Financial Sync</h3>
              <p className="feature-text">
                Integrate with tools like Xero for seamless accounting and reporting.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3 className="feature-title">Compliance Hub</h3>
              <p className="feature-text">
                Stay on top of safety, inspections, and legal obligations effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="zenfinder" className="team-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">ZENFINDER</div>
            <h2 className="section-title">Voice-first AI marketplace</h2>
            <p className="section-description">
              Find a service provider in seconds — just by speaking. An AI-powered, voice-first 
              marketplace that instantly connects users with real service providers.
            </p>
          </div>
          
          <div className="stats">
            <div className="stat">
              <span className="stat-number">⚡</span>
              <span className="stat-label">Instant Connections</span>
            </div>
            <div className="stat">
              <span className="stat-number">🎤</span>
              <span className="stat-label">Voice-Driven</span>
            </div>
            <div className="stat">
              <span className="stat-number">🤝</span>
              <span className="stat-label">Human Touch</span>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="cta-section">
        <div className="container">
          <h2 className="section-title">The future of simplicity is here</h2>
          <p className="section-description">
            Whether you're managing properties or finding a reliable professional, Zenstrin 
            Technologies bridges the gap between AI automation and human interaction.
          </p>
          <a href="#contact" className="btn-primary">Get Started Today</a>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <img
                src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761421748/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b-removebg-preview_puicov.png"
                alt="Zenstrin Logo"
                style={{ height: '40px' }}
              />
            </div>
            <div className="footer-links">
              <a href="#zenstrin">Zenstrin</a>
              <a href="#zenfinder">ZenFinder</a>
              <a href="/blog">Blog</a>
              <a href="/contact">Contact</a>
              <a href="/privacy-policy">Privacy</a>
            </div>
          </div>
          <p className="copyright">© 2025 Zenstrin Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}