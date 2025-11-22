import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface FooterProps {
  companyName?: string;
  currentYear?: number;
}

export function Footer({ 
  companyName = "Vective3D", 
  currentYear = new Date().getFullYear() 
}: FooterProps) {
  
  // Datos configurables para fácil mantenimiento
  const footerData = {
    company: {
      name: companyName,
      description: "We specialize in high-quality 3D models for designers, architects, and developers. Our collection helps you bring creative visions to life with precision and style.",
      socialMedia: [
        { icon: FaFacebook, href: "https://facebook.com/vective3d", label: "Facebook" },
        { icon: FaTwitter, href: "https://twitter.com/vective3d", label: "Twitter" },
        { icon: FaInstagram, href: "https://instagram.com/vective3d", label: "Instagram" },
        { icon: FaLinkedin, href: "https://linkedin.com/company/vective3d", label: "LinkedIn" },
      ]
    },
    contact: {
      address: "123 Design District, Creative City, CC 90210",
      email: "support@vective3d.com",
      phone: "+1 (555) 123-4567"
    },
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/products", label: "Products" },
      { href: "/cart", label: "Cart" },
      { href: "/news", label: "News" },
      { href: "/contact", label: "Help & Contact" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ]
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para suscribirse al newsletter
    console.log("Newsletter subscription logic here");
  };

  return (
    <footer className="TitleColor2 Footer-bg pt-16 pb-8 shadow-lg relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Columna 1: Brand & Social */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="TitleColor2 text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {footerData.company.name}
              </h3>
              <p className="SubtitleColor2 text-sm leading-relaxed mb-6">
                {footerData.company.description}
              </p>
            </div>
            
            <div className="flex space-x-4">
              {footerData.company.socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-white/10"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Get in Touch</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                <span className="text-sm text-gray-300">{footerData.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" size={16} />
                <a 
                  href={`mailto:${footerData.contact.email}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {footerData.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 flex-shrink-0" size={16} />
                <a 
                  href={`tel:${footerData.contact.phone.replace(/\D/g, '')}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {footerData.contact.phone}
                </a>
              </div>
            </address>
          </div>

          {/* Columna 3: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {footerData.links.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Stay Updated</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Get the latest updates on new products and exclusive offers.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    aria-label="Email for newsletter subscription"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm"
                >
                  Subscribe Now
                </button>
              </form>
              
              <p className="text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400">
                © {currentYear} {footerData.company.name}. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links */}
            <nav aria-label="Legal links">
              <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
                {footerData.legal.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}