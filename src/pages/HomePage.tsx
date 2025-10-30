import React, { useEffect, useRef, useState } from 'react';

export default function ZenstrinLandingPage() {
  const codeBackgroundRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
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

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #1a1a1a;
          line-height: 1.6;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .landing-page {
          width: 100%;
          overflow-x: hidden;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px;
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
          color: #f7961c;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: color 0.3s ease;
        }

        .mobile-menu a:hover {
          color: white;
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

        .hero::before,
        .hero::after {
          content: '';
          position: absolute;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: scanLine 3s ease-in-out infinite;
          z-index: 5;
        }

        .hero::before {
          left: 80px;
          animation-delay: 0s;
        }

        .hero::after {
          right: 80px;
          animation-delay: 1.5s;
        }

        @keyframes scanLine {
          0%, 100% {
            opacity: 0;
            transform: translateY(-50%);
          }
          50% {
            opacity: 1;
            transform: translateY(150%);
          }
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

        .code-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: 
            linear-gradient(90deg, 
              rgba(247, 150, 28, 0.05) 0%, 
              transparent 2%, 
              transparent 98%, 
              rgba(247, 150, 28, 0.05) 100%
            );
          pointer-events: none;
          z-index: 3;
        }
        
        @keyframes scrollCode {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20%); }
        }
        
        .code-line {
          opacity: 0;
          animation: fadeIn 2s ease-in-out forwards, shimmer 3s ease-in-out infinite, glitch 5s ease-in-out infinite;
          transition: transform 0.15s ease-out, text-shadow 0.15s ease-out, color 0.15s ease-out;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes glitch {
          0%, 90%, 100% { 
            transform: translateX(0);
            filter: blur(0);
          }
          92% { 
            transform: translateX(-2px);
            filter: blur(0.5px);
          }
          94% { 
            transform: translateX(2px);
            filter: blur(0);
          }
          96% { 
            transform: translateX(-1px);
          }
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 1s ease, transform 1s ease;
        }

        .hero-content::before,
        .hero-content::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 60%;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent);
          top: 20%;
        }

        .hero-content::before {
          left: -40px;
          animation: pulse 2s ease-in-out infinite;
        }

        .hero-content::after {
          right: -40px;
          animation: pulse 2s ease-in-out infinite 1s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
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
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        h1 {
          font-size: 80px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          line-height: 1.1;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
        }
        
        h1 .highlight {
          color: #f7961c;
          display: block;
          position: relative;
          overflow: hidden;
        }

        h1 .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #f7961c;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s ease;
        }

        h1:hover .highlight::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .hero-subtitle {
          font-size: 28px;
          color: #a0a0a0;
          margin-bottom: 50px;
          font-weight: 400;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
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
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-primary:hover {
          background: #f7961c;
          border-color: #f7961c;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(247, 150, 28, 0.3);
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
          position: relative;
          overflow: hidden;
        }

        .btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .btn-secondary:hover::before {
          left: 100%;
        }
        
        .btn-secondary:hover {
          border-color: #f7961c;
          color: #f7961c;
          transform: translateY(-2px);
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
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.6s ease forwards;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
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
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.6s ease forwards;
        }

        .stat:nth-child(1) { animation-delay: 0.1s; }
        .stat:nth-child(2) { animation-delay: 0.2s; }
        .stat:nth-child(3) { animation-delay: 0.3s; }
        
        .stat-number {
          font-size: 64px;
          font-weight: 700;
          color: #ffffff;
          display: block;
          margin-bottom: 10px;
          transition: transform 0.3s ease;
        }

        .stat:hover .stat-number {
          transform: scale(1.1);
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
          position: relative;
        }

        .footer-links a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #f7961c;
          transition: width 0.3s ease;
        }

        .footer-links a:hover::after {
          width: 100%;
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
          .container {
            padding: 0 30px;
          }

          .hero::before {
            left: 20px;
          }

          .hero::after {
            right: 20px;
          }

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
          
          .feature-grid {
            grid-template-columns: 1fr;
          }
          
          .stats {
            gap: 40px;
          }

          .footer-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 20px;
          }

          h1 {
            font-size: 36px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            text-align: center;
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
        <a href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
        <a href="/contact" className="nav-cta">Contact Us ↗</a>
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
            <div className="hero-tag">[ EMPOWERING MARKETPLACE & REAL ESTATE ]</div>
            <h1>
              WE'RE THE MAKERS OF
              <span className="highlight">[ ZENFINDER ]</span>
            </h1>
            <p className="hero-subtitle">Voice-first AI marketplace</p>
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
            <div className="section-tag">Zenstrin Platform</div>
            <h2 className="section-title">Enterprise property management solution</h2>
            <p className="section-description">
              Streamline operations across your entire portfolio with intelligent automation.
              Reduce administrative overhead by 30% while improving tenant satisfaction and compliance tracking.
            </p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Lease Administration</h3>
              <p className="feature-text">
                Centralized tenant management with automated renewals, digital signatures, and rent collection tracking. Real-time visibility across all properties.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Work Order Management</h3>
              <p className="feature-text">
                End-to-end maintenance workflow from request submission to completion. Contractor assignment, progress tracking, and automated status updates.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="feature-title">Financial Integration</h3>
              <p className="feature-text">
                Seamless synchronization with Xero, QuickBooks, and major accounting platforms. Automated reconciliation, expense tracking, and financial reporting.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Regulatory Compliance</h3>
              <p className="feature-text">
                Automated compliance monitoring with scheduled inspections, safety certifications, and regulatory deadline tracking. Stay audit-ready at all times.
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