"use client"

import { useEffect, useRef, useState } from "react"
import { getFeaturedPosts } from '../data/blogPost';

export default function ZenstrinLandingPage() {
  const codeBackgroundRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const featuredCodeRef = useRef<HTMLDivElement | null>(null)
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [stats, setStats] = useState({ items: 0, providers: 0, success: 0 })
  const statsRef = useRef<HTMLDivElement | null>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  

  const featuredPosts = getFeaturedPosts().map(post => ({
    id: `post-${post.id}`,
    tag: post.category,
    from: 'From our blog',
    title: post.title,
    href: `/blog#${post.id}`, 
    image: post.image,
    excerpt: post.excerpt
  }));

  const featuredGridRef = useRef<HTMLDivElement | null>(null)
  const scrollFeatured = (direction: number) => {
    const el = featuredGridRef.current
    if (!el) return
    const amount = Math.max(320, el.clientWidth / 2)
    el.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  useEffect(() => {
    const grid = featuredGridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll('.featured-blog-card'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.2 }
    )
    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true)
          animateCounter()
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [statsVisible])

  const animateCounter = () => {
    let itemsCount = 0
    let providersCount = 0
    let successCount = 0
    const interval = setInterval(() => {
      if (itemsCount < 500) itemsCount += Math.random() * 50
      if (providersCount < 200) providersCount += Math.random() * 25
      if (successCount < 98) successCount += Math.random() * 12

      setStats({
        items: Math.min(Math.floor(itemsCount), 500),
        providers: Math.min(Math.floor(providersCount), 200),
        success: Math.min(Math.floor(successCount), 98),
      })

      if (itemsCount >= 500 && providersCount >= 200 && successCount >= 98) {
        clearInterval(interval)
      }
    }, 30)
  }

  useEffect(() => {
    const codeBackground = codeBackgroundRef.current
    if (!codeBackground) return

    const characters = "+-=/*<>[]{}()#@$%&|\\%%%%####@@@***+++===---:::;;;,,,111000//\\\\||"
    const charsPerLine = 300
    const lines = 180

    let codeHTML = ""
    for (let i = 0; i < lines; i++) {
      let line = ""
      for (let j = 0; j < charsPerLine; j++) {
        if (Math.random() > 0.5) {
          line += characters[Math.floor(Math.random() * characters.length)]
        } else {
          line += " "
        }
      }
      codeHTML += `<div class="code-line">${line}</div>`
    }
    codeBackground.innerHTML = codeHTML
  }, [])

  useEffect(() => {
    if (!featuredCodeRef.current) return
    const characters = "+-=/*<>[]{}()#@$%&|\\%%%%####@@@***+++===---:::;;;,,,111000//\\\\||"
    const charsPerLine = 300
    const lines = 160
    let codeHTML = ""
    for (let i = 0; i < lines; i++) {
      let line = ""
      for (let j = 0; j < charsPerLine; j++) {
        if (Math.random() > 0.5) {
          line += characters[Math.floor(Math.random() * characters.length)]
        } else {
          line += " "
        }
      }
      codeHTML += `<div class="code-line">${line}</div>`
    }
    featuredCodeRef.current.innerHTML = codeHTML
  }, [])


  useEffect(() => {
    const container = heroRef.current
    if (!container) return

  
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const maxRadius = 180
    const maxOffset = 16
    let rafId: number

    const animate = (time: number) => {
      const rect = container.getBoundingClientRect()
   
      const t = time / 1000
      const mouseX = rect.width / 2 + Math.cos(t * 1.0) * rect.width * 0.3
      const mouseY = rect.height / 2 + Math.sin(t * 1.6) * rect.height * 0.25

      const codeLines = container.querySelectorAll<HTMLDivElement>('.code-line')
      codeLines.forEach((line) => {
        const lineRect = line.getBoundingClientRect()
        const lineY = lineRect.top - rect.top + lineRect.height / 2
        const lineX = lineRect.left - rect.left + lineRect.width / 2
        const dx = mouseX - lineX
        const dy = mouseY - lineY
        const distance = Math.hypot(dx, dy)
        if (distance < maxRadius) {
          const intensity = (maxRadius - distance) / maxRadius
          const unitX = dx / (distance || 1)
          const unitY = dy / (distance || 1)
          const offset = (intensity * intensity) * maxOffset
          const tx = unitX * offset
          const ty = unitY * offset
          ;(line as HTMLElement).style.transform = `translate(${tx}px, ${ty}px) scale(${1 + intensity * 0.03})`
          ;(line as HTMLElement).style.textShadow = `0 0 ${6 + intensity * 8}px rgba(247, 150, 28, ${0.25 + intensity * 0.25})`
          ;(line as HTMLElement).style.color = `rgba(247, 150, 28, ${0.4 + intensity * 0.2})`
        } else {
          ;(line as HTMLElement).style.transform = 'translate(0, 0) scale(1)'
          ;(line as HTMLElement).style.textShadow = '0 0 2px rgba(247, 150, 28, 0.35)'
          ;(line as HTMLElement).style.color = 'rgba(247, 150, 28, 0.4)'
        }
      })

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (!featuredCodeRef.current) return
    const characters = "+-=/*<>[]{}()#@$%&|\\%%%%####@@@***+++===---:::;;;,,,111000//\\\\||"
    const charsPerLine = 300
    const lines = 160
    let codeHTML = ""
    for (let i = 0; i < lines; i++) {
      let line = ""
      for (let j = 0; j < charsPerLine; j++) {
        if (Math.random() > 0.5) {
          line += characters[Math.floor(Math.random() * characters.length)]
        } else {
          line += " "
        }
      }
      codeHTML += `<div class="code-line">${line}</div>`
    }
    featuredCodeRef.current.innerHTML = codeHTML
  }, [])



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
          padding: 12px 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
          height: 56px; /* layout box size stays the same */
          width: auto;
          transform: scale(1.2); /* visually larger without affecting navbar layout */
          transform-origin: left center;
          transition: transform 0.3s ease;
        }

        .logo img:hover {
          transform: scale(1.25);
        }
        
        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
          align-items: center;
        }
        
        .nav-links a {
          color: #f7961c;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;
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
          color: #f7961c;
        }

        .nav-links a:hover::after {
          width: 100%;
        }
        
        .nav-cta {
          background: #1a1a1a;
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        header.scrolled .nav-cta {
          background: #f7961c;
          border-color: #f7961c;
        }
        

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1001;
          transition: transform 0.3s ease;
        }

        .mobile-menu-btn:hover {
          transform: scale(1.1);
        }

        .mobile-menu-btn svg {
          width: 24px;
          height: 24px;
          stroke: #1a1a1a;
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
          transition: all 0.3s ease;
        }

        .mobile-menu a:hover {
          color: #1a1a1a;
          padding-left: 8px;
        }

        .mobile-menu .nav-cta {
          margin-top: 20px;
          display: block;
          width: 100%;
          text-align: center;
          background: #f7961c;
          color: #ffffff;
          border: 1px solid #f7961c;
          font-weight: 700;
          padding: 14px 18px;
          border-radius: 8px;
        }
        
        .hero {
          position: relative;
          min-height: 115vh;
          display: flex;
          align-items: center;
          background: #0a0a0f;
          overflow: hidden;
        }

        .hero::before,
        .hero::after {
          content: '';
          display: none; /* disable moving scan lines */
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
          font-size: 16px;
          line-height: 1.4;
          color: rgba(247, 150, 28, 0.4);
          overflow: hidden;
          white-space: pre;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          z-index: 2;
          transform: translateY(0);
          animation: none !important;
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
              rgba(247, 150, 28, 0.08) 0%, 
              transparent 2%, 
              transparent 98%, 
              rgba(247, 150, 28, 0.08) 100%
            );
          pointer-events: none;
          z-index: 3;
        }
        
        
    .code-line {
      opacity: 1;
      animation: none !important;
      transition: transform 0.2s ease-out, text-shadow 0.2s ease-out, color 0.2s ease-out;
      text-shadow: 0 0 2px rgba(247, 150, 28, 0.35);
      will-change: opacity, transform;
    }

    .code-line:nth-child(3n) { animation-delay: 0.6s; }
    .code-line:nth-child(4n) { animation-delay: 1.2s; }
    .code-line:nth-child(5n) { animation-delay: 1.8s; }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.8; }
        }

        @keyframes codeDrift {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-30px) translateX(-20px); }
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
          transform: ${isVisible ? "translateY(0)" : "translateY(30px)"};
          transition: opacity 1s ease, transform 1s ease;
        }

        .hero-right-cta {
          position: absolute;
          right: 60px;
          bottom: 60px;
          z-index: 11;
        }

        .hero-right-cta .cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #0a0a0f;
          background: #e0e6ff;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 14px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hero-right-cta .cta:hover {
          transform: translateY(-2px);
          background: #f7961c;
          color: #ffffff;
        }

        .featured-blog-section {
          background: #0a0a0f;
          padding: 40px 0 120px;
          position: relative;
        }

        .featured-blog-section .code-background {
          z-index: 0;
          opacity: 0.3;
          animation: none !important;
        }

        .featured-blog-header {
          max-width: 1200px;
          margin: -40px auto 24px;
          padding: 0 60px;
          color: #cfd8ff;
        }

        .featured-nav {
          max-width: 1200px;
          margin: 16px auto 0;
          padding: 0 60px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .featured-nav button {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: #cfd8ff;
          padding: 8px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .featured-nav button:hover {
          background: rgba(247,150,28,0.15);
          border-color: rgba(247,150,28,0.45);
          transform: translateY(-1px);
        }

        .featured-blog-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          position: relative;
          z-index: 1;
          overflow: visible;
        }

        .featured-blog-card {
          background: rgba(9, 12, 20, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 22px 22px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
          transition: transform 0.25s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.25s ease, opacity 0.4s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
        }

        .featured-blog-card:hover {
          transform: translateY(-6px);
          border-color: rgba(247, 150, 28, 0.5);
          background: rgba(12, 16, 24, 0.82);
          box-shadow: 0 28px 70px rgba(0,0,0,0.55);
        }

        .featured-blog-card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 10% 10%, rgba(247,150,28,0.12), transparent 30%),
                      radial-gradient(circle at 90% 20%, rgba(79,108,182,0.18), transparent 35%),
                      radial-gradient(circle at 50% 120%, rgba(247,150,28,0.08), transparent 40%);
          animation: glowShift 6s ease-in-out infinite;
        }

        .featured-blog-card.in {
          animation: cardEnter 0.6s ease forwards;
        }

        .featured-blog-card.in:nth-child(2) { animation-delay: 0.08s; }
        .featured-blog-card.in:nth-child(3) { animation-delay: 0.16s; }
        .featured-blog-card.in:nth-child(4) { animation-delay: 0.24s; }
        .featured-blog-card.in:nth-child(5) { animation-delay: 0.32s; }

        .featured-thumb {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0e1420;
        }

        .featured-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.05);
          transition: transform 0.4s ease;
        }

        .featured-blog-card:hover .featured-thumb img {
          transform: scale(1.04);
        }

        .featured-blog-card .meta {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #9fb0ff;
        }

        .featured-blog-card .title {
          margin-top: 12px;
          color: #e9eeff;
          font-size: 24px;
          line-height: 1.25;
          font-weight: 800;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .featured-blog-card .excerpt {
          margin-top: 8px;
          color: #9fb0ff;
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .featured-blog-card .actions {
          margin-top: 16px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .featured-blog-card .actions a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-weight: 600;
        }

        .featured-blog-card .read {
          color: #0a0a0f;
          background: #e0e6ff;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 10px 14px;
          border-radius: 8px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .featured-blog-card .read:hover {  
          transform: translateY(-2px);
          background: #f7961c;
          color: #ffffff;
        }

        .featured-blog-card .more {
          color: #cfd8ff;
        }

        /* Responsive featured grid */
        @media (max-width: 1024px) {
          .featured-blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .featured-blog-header {
            padding: 0 30px;
          }
          .featured-blog-grid {
            max-width: 100%;
            margin: 0;
            padding: 0 30px;
            display: flex;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            overscroll-behavior-x: contain;
            scroll-padding: 0 30px;
          }
          .featured-blog-card {
            flex: 0 0 85%;
            scroll-snap-align: start;
            min-width: 0; /* prevent overflow issues */
          }
          .featured-blog-card:last-child { margin-right: 30px; }
          .featured-blog-grid::-webkit-scrollbar { display: none; }
          .featured-blog-section::before,
          .featured-blog-section::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 40px;
            pointer-events: none;
            z-index: 2;
          }
          .featured-blog-section::before {
            left: 0;
            background: linear-gradient(90deg, rgba(10,10,15,1), rgba(10,10,15,0));
          }
          .featured-blog-section::after {
            right: 0;
            background: linear-gradient(270deg, rgba(10,10,15,1), rgba(10,10,15,0));
          }
          .featured-blog-card .title { font-size: 20px; }
          .featured-blog-card .excerpt { font-size: 13px; }
          .featured-nav { display: none; }
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowShift {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .featured-blog-card::before { animation: none; }
          .featured-blog-card.in { animation: none; opacity: 1; transform: none; }
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
        }

        .hero-content::after {
          right: -40px;
        }

        /* pulse animation disabled */
        
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
          /* float animation disabled */
        }

        /* float animation removed */
        
        h1 {
          font-size: 80px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          line-height: 1.1;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? "translateY(0)" : "translateY(30px)"};
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
          transform: ${isVisible ? "translateY(0)" : "translateY(30px)"};
          transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? "translateY(0)" : "translateY(30px)"};
          transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
        }

        .featured-post {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          backdrop-filter: blur(6px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? "translateY(0)" : "translateY(30px)"};
          transition: opacity 1s ease 0.75s, transform 1s ease 0.75s, background 0.3s ease, border-color 0.3s ease;
        }

        .featured-post .badge {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #f7961c;
          background: rgba(247, 150, 28, 0.15);
          border: 1px solid rgba(247, 150, 28, 0.35);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .featured-post a {
          color: #cfd8ff;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .featured-post:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(247, 150, 28, 0.5);
        }

        .featured-post a:hover {
          color: #ffffff;
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
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(247, 150, 28, 0.4);
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
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(247, 150, 28, 0.2);
        }
        
        .white-section {
          background: #ffffff;
          padding: 120px 0;
        }
        
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 80px;
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        
        .section-tag {
          color: #f7961c;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.2s;
        }
        
        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.2;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.3s;
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(15px);
          }
        }
        
        .section-description {
          font-size: 20px;
          color: #666;
          line-height: 1.6;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.4s;
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
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
          border: 2px solid transparent;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.6s ease forwards;
          position: relative;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f7961c, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover::before {
          opacity: 1;
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
          transform: translateY(-12px);
          border-color: #f7961c;
          box-shadow: 0 20px 50px rgba(247, 150, 28, 0.15);
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
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.15) rotate(-5deg);
          box-shadow: 0 12px 30px rgba(247, 150, 28, 0.3);
        }
        
        .feature-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .feature-card:hover .feature-title {
          color: #f7961c;
        }
        
        .feature-text {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          transition: color 0.3s ease;
        }
        
        .team-section {
          background: #f7961c;
          padding: 120px 0;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(0,0,0,0.1), transparent 50%);
          pointer-events: none;
        }
        
        .team-section .section-tag {
          color: rgba(255, 255, 255, 0.9);
          animation-delay: 0.1s;
        }
        
        .team-section .section-title {
          color: #ffffff;
          animation-delay: 0.15s;
        }
        
        .team-section .section-description {
          color: rgba(255, 255, 255, 0.95);
          animation-delay: 0.2s;
        }
        
        .stats {
          display: flex;
          justify-content: center;
          gap: 80px;
          flex-wrap: wrap;
          margin-top: 60px;
          position: relative;
          z-index: 1;
        }
        
        .stat {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.6s ease forwards;
          transition: transform 0.3s ease;
        }

        .stat:nth-child(1) { animation-delay: 0.1s; }
        .stat:nth-child(2) { animation-delay: 0.2s; }
        .stat:nth-child(3) { animation-delay: 0.3s; }

        .stat:hover {
          transform: translateY(-8px);
        }
        
        .stat-number {
          font-size: 64px;
          font-weight: 700;
          color: #1a1a1a;
          display: block;
          margin-bottom: 10px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .stat:hover .stat-number {
          transform: scale(1.15);
          text-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .stat-label {
          font-size: 16px;
          color: rgba(2, 2, 2, 0.95);
          font-weight: 500;
          transition: opacity 0.3s ease;
        }

        .stat:hover .stat-label {
          opacity: 0.7;
        }
        
        .cta-section {
          background: #0a0a0f;
          padding: 120px 0;
          text-align: center;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(247, 150, 28, 0.1), transparent);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }

        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -50%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(247, 150, 28, 0.05), transparent);
          border-radius: 50%;
          animation: float 10s ease-in-out infinite 2s;
        }
        
        .cta-section .section-title {
          color: #ffffff;
          margin-bottom: 30px;
          position: relative;
          z-index: 1;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.1s;
        }
        
        .cta-section .section-description {
          color: #a0a0a0;
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.2s;
        }

        .cta-section .btn-primary {
          position: relative;
          z-index: 1;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.3s;
        }
        
        footer {
          background: #ffffff;
          padding: 60px 0 40px;
          border-top: 1px solid #e0e0e0;
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.1s;
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
          transition: all 0.3s ease;
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
          transform: translateY(-2px);
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

          /* Improve header CTA appearance on mobile */
          .nav-cta {
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 700;
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

      <header className={scrollY > 50 ? "scrolled" : ""}>
        <div className="container">
          <nav>
            <div className="logo">
              <img
                src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761421748/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b-removebg-preview_puicov.png"
                alt="Zenstrin Logo"
              />
            </div>
            <ul className="nav-links">
              <li>
                <a href="#zenfinder">ZenFinder</a>
              </li>
              <li>
                <a href="#zenstrin">Zenstrin</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/contact" className="nav-cta">
                  Contact Us ↗
                </a>
              </li>
            </ul>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
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

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <a href="#zenstrin" onClick={() => setIsMenuOpen(false)}>
          Zenstrin
        </a>
        <a href="https://www.zenfinder.ai" onClick={() => setIsMenuOpen(false)}>
          ZenFinder
        </a>
        <a href="/blog" onClick={() => setIsMenuOpen(false)}>
          Blog
        </a>
        <a href="/contact" className="nav-cta">
          Contact Us ↗
        </a>
      </div>

      <section className="hero" ref={heroRef} onMouseMove={(e) => {
        if (!heroRef.current) return
        const rect = heroRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const maxRadius = 180
        const maxOffset = 12
        const codeLines = heroRef.current.querySelectorAll<HTMLDivElement>(".code-line")
        codeLines.forEach((line) => {
          const lineRect = line.getBoundingClientRect()
          const lineY = lineRect.top - rect.top + lineRect.height / 2
          const lineX = lineRect.left - rect.left + lineRect.width / 2
          const dx = mouseX - lineX
          const dy = mouseY - lineY
          const distance = Math.hypot(dx, dy)
          if (distance < maxRadius) {
            const intensity = (maxRadius - distance) / maxRadius
            const unitX = dx / (distance || 1)
            const unitY = dy / (distance || 1)
            const offset = (intensity * intensity) * maxOffset
            const tx = unitX * offset
            const ty = unitY * offset
            ;(line as HTMLElement).style.transform = `translate(${tx}px, ${ty}px) scale(${1 + intensity * 0.03})`
            ;(line as HTMLElement).style.textShadow = `0 0 ${6 + intensity * 8}px rgba(247, 150, 28, ${0.25 + intensity * 0.25})`
            ;(line as HTMLElement).style.color = `rgba(247, 150, 28, ${0.4 + intensity * 0.2})`
          } else {
            ;(line as HTMLElement).style.transform = "translate(0, 0) scale(1)"
            ;(line as HTMLElement).style.textShadow = "0 0 2px rgba(247, 150, 28, 0.35)"
            ;(line as HTMLElement).style.color = "rgba(247, 150, 28, 0.4)"
          }
        })
      }} onMouseLeave={() => {
        if (!heroRef.current) return
        const codeLines = heroRef.current.querySelectorAll<HTMLDivElement>(".code-line")
        codeLines.forEach((line) => {
          ;(line as HTMLElement).style.transform = "translate(0, 0) scale(1)"
          ;(line as HTMLElement).style.textShadow = "0 0 2px rgba(247, 150, 28, 0.35)"
          ;(line as HTMLElement).style.color = "rgba(247, 150, 28, 0.4)"
        })
      }}>
        <div className="code-background" ref={codeBackgroundRef}></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">[ EMPOWERING MARKETPLACE & REAL ESTATE ]</div>
            <h1>
              WE'RE THE MAKERS OF
              <span className="highlight">[ ZENFINDER ]</span>
            </h1>
            <p className="hero-subtitle">ZenFinder — the voice-first AI marketplace</p>
            <div className="hero-buttons">
              <a href="https://www.zenfinder.ai" className="btn-primary">
                TRY NOW ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-blog-section" aria-labelledby="featured-blog-heading">
        <div className="code-background" ref={featuredCodeRef}></div>
        <div className="featured-blog-header">
          <div className="meta" id="featured-blog-heading">Featured • From our blog</div>
        </div>
        <div className="featured-blog-grid" ref={featuredGridRef}>
          {featuredPosts.map((post) => (
            <div key={post.id} className="featured-blog-card">
              {post.image && (
                <div className="featured-thumb">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              <div className="meta">
                <span>{post.tag}</span>
                <span>•</span>
                <span>{post.from}</span>
              </div>
              <h3 className="title">{post.title}</h3>
              {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
              <div className="actions">
                <a className="read" href={post.href} aria-label={`Read ${post.title}`}>Read now ↗</a>
                <a className="more" href="/blog">More posts →</a>
              </div>
            </div>
          ))}
        </div>
        <div className="featured-nav">
          <button type="button" aria-label="Scroll left" onClick={() => scrollFeatured(-1)}>◀</button>
          <button type="button" aria-label="Scroll right" onClick={() => scrollFeatured(1)}>▶</button>
        </div>
      </section>

      <section id="zenfinder" className="white-section" ref={statsRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">ZENFINDER</div>
            <h2 className="section-title">Voice-first AI marketplace</h2>
            <p className="section-description">
              Find a service provider in seconds — just by speaking. An AI-powered, voice-first marketplace that
              instantly connects users with real service providers.
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-number">{stats.items}+</span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.providers}+</span>
              <span className="stat-label">Service Providers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{stats.success}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      <section id="zenstrin" className="team-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Zenstrin Platform</div>
            <h2 className="section-title">Enterprise property management solution</h2>
            <p className="section-description">
              Streamline operations across your entire portfolio with intelligent automation. Reduce administrative
              overhead by 30% while improving tenant satisfaction and compliance tracking.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Lease Administration</h3>
              <p className="feature-text">
                Centralized tenant management with automated renewals, digital signatures, and rent collection tracking.
                Real-time visibility across all properties.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Work Order Management</h3>
              <p className="feature-text">
                End-to-end maintenance workflow from request submission to completion. Contractor assignment, progress
                tracking, and automated status updates.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="feature-title">Financial Integration</h3>
              <p className="feature-text">
                Seamless synchronization with Xero, QuickBooks, and major accounting platforms. Automated
                reconciliation, expense tracking, and financial reporting.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Regulatory Compliance</h3>
              <p className="feature-text">
                Automated compliance monitoring with scheduled inspections, safety certifications, and regulatory
                deadline tracking. Stay audit-ready at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="cta-section">
        <div className="container">
          <h2 className="section-title">The future of simplicity is here</h2>
          <p className="section-description">
            Whether you're managing properties or finding a reliable professional, Zenstrin Technologies bridges the gap
            between AI automation and human interaction.
          </p>
          <a href="/contact" className="btn-primary">
            Get Started Today
          </a>
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
  )
}