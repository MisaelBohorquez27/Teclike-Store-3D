import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Columna 1: About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">About Us</h3>
            <p className="mb-6">
              We specialize in high-quality 3D models for designers and architects. Our collection helps you bring creative visions to life with precision and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <address className="not-italic">
              <p className="mb-3">123, Design District,</p>
              <p className="mb-3">Creative City, CC 90210</p>
              <p className="mb-3">support@vective3d.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>

          {/* Columna 3: Enlaces */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Pages</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors flex items-center"> - Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"> - Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"> - Carrito</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"> - Novedades</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"> - Ayuda y Contacto</a></li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Subscribe</h3>
            <p className="mb-4">Subscribe to our mailing list to get the latest updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-gray-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            Copyrights © {new Date().getFullYear()} - Vective3D, All Rights Reserved.<br />
            Distributed By - YourTeamName
          </p>
        </div>
      </div>
    </footer>
  );
}