"use client";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

interface FooterProps {
  companyName?: string;
  currentYear?: number;
}

export function Footer({ 
  companyName = "Vective3D", 
  currentYear = new Date().getFullYear() 
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const footerData = {
    company: {
      name: companyName,
      description: "We specialize in high-quality 3D models for designers, architects, and developers. Bringing creative visions to life with precision and innovation.",
      socialMedia: [
        { icon: FaFacebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
        { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-cyan-400" },
        { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
        { icon: FaLinkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-300" },
      ]
    },
    contact: {
      address: "123 Design District, Creative City, CC 90210",
      email: "support@vective3d.com",
      phone: "+1 (555) 123-4567"
    },
    links: [
      { href: "/", label: "Home", emoji: "🏠" },
      { href: "/products", label: "3D Models", emoji: "🎨" },
      { href: "/categories", label: "Categories", emoji: "📁" },
      { href: "/sale", label: "Hot Deals", emoji: "🔥" },
      { href: "/about", label: "About Us", emoji: "👥" },
      { href: "/contact", label: "Contact", emoji: "📞" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/licensing", label: "3D Licensing" },
    ]
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Subscribed:", email);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-bounce"></div>
      </div>

      {/* Patrón de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12 mb-16">
          
          {/* Brand Section - Full width on mobile, then normal */}
          <div className="xl:col-span-1">
            <div className="mb-8">
              {/* Logo/Title con efecto neón */}
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                {footerData.company.name}
                <span className="text-cyan-400 text-4xl">.</span>
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
                {footerData.company.description}
              </p>
            </div>
            
            {/* Social Media con efectos hover */}
            <div className="flex space-x-3">
              {footerData.company.socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`
                    relative p-3 rounded-xl bg-white/5 border border-white/10 
                    backdrop-blur-sm transition-all duration-300 group
                    hover:bg-white/10 hover:border-white/20 hover:scale-110 
                    ${social.color} hover:shadow-lg hover:shadow-cyan-500/25
                  `}
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon size={18} className="transition-transform group-hover:scale-110" />
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links con emojis */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Explore
            </h3>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {footerData.links.map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  className="group flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 hover:translate-x-2 border border-transparent hover:border-white/10"
                >
                  <span className="text-lg transform group-hover:scale-110 transition-transform">
                    {link.emoji}
                  </span>
                  <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                    {link.label}
                  </span>
                  <FaArrowRight className="ml-auto text-cyan-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={12} />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info con iconos animados */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Contact
            </h3>
            <div className="space-y-4">
              {[
                { icon: FaMapMarkerAlt, text: footerData.contact.address, color: "text-cyan-400" },
                { icon: FaEnvelope, text: footerData.contact.email, color: "text-blue-400", href: `mailto:${footerData.contact.email}` },
                { icon: FaPhone, text: footerData.contact.phone, color: "text-green-400", href: `tel:${footerData.contact.phone.replace(/\D/g, '')}` },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 group"
                >
                  <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${item.color}`}>
                    <item.icon size={16} className="animate-float" />
                  </div>
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-gray-300 group-hover:text-white text-sm leading-relaxed transition-colors flex-1"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 group-hover:text-white text-sm leading-relaxed transition-colors flex-1">
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter con efecto glassmorphism */}
          <div className="lg:col-span-2 xl:col-span-1">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                🚀 Stay Updated
              </h3>
              
              <p className="text-gray-300 text-sm mb-6">
                Get exclusive 3D model releases, tips, and special offers delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm backdrop-blur-sm"
                    aria-label="Email for newsletter subscription"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform
                    focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm
                    ${isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Subscribe Now 
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={12} />
                    </span>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                No spam ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} {footerData.company.name}. Crafted with ❤️ for the 3D community.
              </p>
            </div>
            
            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              {footerData.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Efecto de partículas en el borde inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
    </footer>
  );
}