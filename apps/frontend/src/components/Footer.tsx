"use client";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Subscription } from "./Subscription";

interface FooterProps {
  companyName?: string;
  currentYear?: number;
}

export function Footer({
  companyName = "Teclike",
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
    useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerData = {
    company: {
      name: companyName,
      description:
        "Somos una importadora con experiencia de mas de 5 años en el mercado, buscamos posicionarnos y brindar a nuestro cliente productos de calidad y duradero a un buen precio.",
      socialMedia: [
        {
          icon: FaFacebook,
          href: "#",
          label: "Facebook",
          color: "hover:text-blue-400",
        },
        {
          icon: FaTwitter,
          href: "#",
          label: "Twitter",
          color: "hover:text-cyan-400",
        },
        {
          icon: FaInstagram,
          href: "#",
          label: "Instagram",
          color: "hover:text-pink-400",
        },
        {
          icon: FaLinkedin,
          href: "#",
          label: "LinkedIn",
          color: "hover:text-blue-300",
        },
      ],
    },
    contact: {
      address: "123 Design District, Creative City, CC 90210",
      email: "support@vective3d.com",
      phone: "+1 (555) 123-4567",
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
    ],
  };

  return (
    <footer className="relative section-bg text-neutral bg-gradient-to-br overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80" />

        {/* Patrón de grid sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Efectos de luz */}
        <div className="absolute -top-64 -left-64 w-128 h-128 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-64 -right-64 w-128 h-128 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
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
              <h3 className="text-3xl font-bold mb-4 text-gradient-primary drop-shadow-lg">
                {footerData.company.name}
                <span className="text-4xl">.</span>
              </h3>

              <p className="text-sm leading-relaxed mb-6 backdrop-blur-sm  rounded-lg p-4 border card-bg-2">
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
                  <social.icon
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links con emojisss */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gradient-primary flex items-center">
              <span className="w-2 h-2 primary-bg rounded-full mr-2 animate-pulse"></span>
              Explora
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
                  <span className="text-neutral-1 font-medium text-sm">
                    {link.label}
                  </span>
                  <FaArrowRight
                    className="ml-auto text-primary opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    size={12}
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info con iconos animadosss */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gradient-primary flex items-center">
              <span className="w-2 h-2 primary-bg rounded-full mr-2 animate-pulse"></span>
              Contacto
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: FaMapMarkerAlt,
                  text: footerData.contact.address,
                  color: "text-cyan-400",
                },
                {
                  icon: FaEnvelope,
                  text: footerData.contact.email,
                  color: "text-blue-400",
                  href: `mailto:${footerData.contact.email}`,
                },
                {
                  icon: FaPhone,
                  text: footerData.contact.phone,
                  color: "text-green-400",
                  href: `tel:${footerData.contact.phone.replace(/\D/g, "")}`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 group"
                >
                  <div
                    className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${item.color}`}
                  >
                    <item.icon size={16} className="animate-float" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-neutral-1 text-sm leading-relaxed transition-colors flex-1"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-neutral-1 text-sm leading-relaxed transition-colors flex-1">
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
              <h3 className="text-lg font-semibold mb-4 text-gradient-primary">
                Mantente Actualizado
              </h3>

              <p className="text-neutral text-sm mb-6">
                Subscríbete para no perder ni una novedad sobre nuestros productos
              </p>

              <Subscription />

              <p className="text-xs text-gray-400 mt-4 text-center">
                Sin spam. Cancele su suscripción en cualquier momento.
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
                © {currentYear} {footerData.company.name}. Hecho con pasión por
                el equipo de desarrollo.
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
