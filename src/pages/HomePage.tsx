"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Menu, X, Play, Pause } from "lucide-react"

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const shapes: Array<{
      x: number
      y: number
      baseRadius: number
      currentRadius: number
      morphPhase: number
      speed: number
      color: string
      vx: number
      vy: number
    }> = []

    const colors = [
      "rgba(247, 150, 28, 0.06)",
      "rgba(247, 150, 28, 0.04)", 
      "rgba(247, 150, 28, 0.03)"
    ]
    
    for (let i = 0; i < 3; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseRadius: 100 + Math.random() * 100,
        currentRadius: 100 + Math.random() * 100,
        morphPhase: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.001,
        color: colors[i],
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      })
    }

    let animationFrame: number
    let lastTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = Math.min((currentTime - lastTime) / 16, 2)
      lastTime = currentTime

      if (!isPlaying) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        shape.morphPhase += shape.speed * deltaTime

        const morphAmount = Math.sin(shape.morphPhase) * 0.25
        shape.currentRadius = shape.baseRadius * (1 + morphAmount)

        ctx.fillStyle = shape.color
        ctx.beginPath()

        const points = 6
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2
          const distortion = Math.sin(shape.morphPhase + angle * 2) * 12
          const radius = shape.currentRadius + distortion
          const px = shape.x + Math.cos(angle) * radius
          const py = shape.y + Math.sin(angle) * radius

          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()

        shape.x += shape.vx * deltaTime
        shape.y += shape.vy * deltaTime

        if (shape.x < -200) shape.x = canvas.width + 200
        if (shape.x > canvas.width + 200) shape.x = -200
        if (shape.y < -200) shape.y = canvas.height + 200
        if (shape.y > canvas.height + 200) shape.y = -200
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-white text-gray-900 relative font-sans">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ willChange: 'contents' }} />

      {/* Background Animation Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? "Pause animation" : "Play animation"}
      >
        {isPlaying ? <Pause className="w-5 h-5 text-gray-700" /> : <Play className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761421748/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b-removebg-preview_puicov.png"
                alt="Zenstrin Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["Zenstrin", "ZenFinder", "Blog", "Contact Us"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="relative text-gray-700 hover:text-[#f7961c] transition-colors duration-300 font-medium text-sm group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f7961c] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 z-50" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-lg">
              <div className="p-6 space-y-4">
                {["Zenstrin", "ZenFinder", "Blog", "Contact Us"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="block text-gray-700 hover:text-[#f7961c] transition-colors duration-300 font-medium py-2 border-b border-gray-100 last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="w-full px-6 py-3 bg-[#f7961c] text-white font-semibold transition-all duration-300 rounded-lg hover:bg-[#e0861a] mt-4">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative max-w-6xl mx-auto text-center space-y-8 z-10">
          <div className="flex justify-center mb-8">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="block text-gray-900">Empowering the</span>
            <span className="block text-[#f7961c] mt-4">Future of Real Estate</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Intelligent platforms that merge AI innovation with human experience, creating products that redefine speed,
            trust, and simplicity in the digital world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <button className="group relative px-10 py-4 bg-[#f7961c] text-white font-semibold transition-all duration-300 flex items-center space-x-3 rounded-lg hover:bg-[#e0861a] hover:shadow-xl hover:-translate-y-1">
              <span className="relative">Request Demo</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="px-10 py-4 border-2 border-gray-900 text-gray-900 font-semibold transition-all duration-300 rounded-lg hover:bg-gray-900 hover:text-white hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Zenstrin Features Section */}
      <section id="zenstrin" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">Zenstrin</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-6 leading-relaxed">
              A complete ecosystem for landlords, agents, and property managers to manage their portfolios effortlessly.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-orange-50 border border-orange-200 rounded-full">
              <span className="text-[#f7961c] font-semibold text-lg">
                Save up to 30% in administrative time with automation
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <FeatureCard
              title="Tenant & Lease Management"
              description="Simplify renewals, rent tracking, and communication."
            />
            <FeatureCard
              title="Maintenance Automation"
              description="Log issues, assign contractors, and monitor progress."
            />
            <FeatureCard
              title="Financial Sync"
              description="Integrate with tools like Xero for seamless accounting."
            />
            <FeatureCard
              title="Compliance Hub"
              description="Stay on top of safety, inspections, and legal obligations."
            />
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white border border-orange-200 p-10 text-center rounded-2xl shadow-sm">
            <p className="text-gray-700 text-lg font-light mb-4 leading-relaxed">
              <span className="font-semibold text-[#f7961c]">Why Zenstrin?</span> The global property management software
              market is expected to reach <span className="font-semibold text-[#f7961c]">$5.4 billion by 2030</span>, growing
              at 8.1% CAGR.
            </p>
            <p className="text-gray-600 font-light text-sm">
              Help small to mid-size agencies stay competitive through modern tech adoption without enterprise
              complexity.
            </p>
          </div>
        </div>
      </section>

      {/* ZenFinder Features Section */}
      <section id="zenfinder" className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">ZenFinder</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-6 leading-relaxed">
              Find a service provider in seconds — just by speaking. An AI-powered, voice-first marketplace that
              instantly connects users with real service providers.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white border border-orange-200 rounded-full shadow-sm">
              <span className="text-[#f7961c] font-semibold text-lg">
                Voice commerce market forecasted to exceed $55 billion by 2026
              </span>
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-5xl mx-auto mb-20">
            <h3 className="text-3xl font-bold text-center mb-16 text-gray-900">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "User Speaks Their Need", desc: '"I need a plumber."', icon: "🎤" },
                { step: "2", title: "AI Instantly Matches", desc: "Finds qualified options nearby.", icon: "🤖" },
                { step: "3", title: "Live Connection", desc: "Connects both parties in real-time.", icon: "🔗" },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-white border-2 border-orange-200 text-[#f7961c] flex items-center justify-center mx-auto rounded-2xl text-4xl shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 group-hover:border-[#f7961c]">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-[#f7961c] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Speed" description="Connects to a provider in seconds." />
            <FeatureCard title="Simplicity" description="Voice-driven, no forms or browsing." />
            <FeatureCard title="Human Touch" description="Real conversations, not chatbots." />
            <FeatureCard
              title="Breadth"
              description="From plumbers to personal trainers — one platform for all."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">The Future of Simplicity is Here</h2>
          <p className="text-xl text-gray-600 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            Whether you're managing properties or finding a reliable professional, Zenstrin Technologies bridges the gap
            between AI automation and human interaction — delivering trust, speed, and intelligence at scale.
          </p>
          <button className="group relative px-12 py-5 bg-[#f7961c] text-white font-semibold transition-all duration-300 flex items-center space-x-3 mx-auto rounded-lg hover:bg-[#e0861a] hover:shadow-xl hover:-translate-y-1">
            <span className="relative text-lg">Get Started Today</span>
            <ArrowRight className="w-6 h-6 relative group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761421748/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b-removebg-preview_puicov.png"
                  alt="Zenstrin Logo"
                  className="h-12 w-auto"
                />
                <span className="text-xl font-semibold text-gray-900">ZENSTRIN</span>
              </div>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Empowering the future of real estate and AI-driven commerce with cutting-edge technology and
                human-centric design.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Products</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  <a
                    href="#zenstrin"
                    className="hover:text-[#f7961c] transition-colors duration-300 font-medium"
                  >
                    Property Management Software
                  </a>
                </li>
                <li>
                  <a
                    href="#zenfinder"
                    className="hover:text-[#f7961c] transition-colors duration-300 font-medium"
                  >
                    ZenFinder
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  <a href="#blog" className="hover:text-[#f7961c] transition-colors duration-300 font-medium">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact-us" className="hover:text-[#f7961c] transition-colors duration-300 font-medium">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Legal</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  <a
                    href="#privacy-policy"
                    className="hover:text-[#f7961c] transition-colors duration-300 font-medium"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Zenstrin Technologies. All rights reserved. Building the future, today.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="group relative p-8 bg-white border border-gray-200 hover:border-[#f7961c] transition-all duration-300 rounded-2xl hover:shadow-lg hover:-translate-y-1">
      <div className="relative mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#f7961c] to-[#e0861a] text-white flex items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
          <div className="text-xl font-bold">✦</div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#f7961c] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 font-light leading-relaxed text-sm">{description}</p>
    </div>
  )
}

export default HomePage