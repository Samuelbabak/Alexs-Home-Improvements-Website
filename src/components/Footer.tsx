import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white py-12 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-to-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: About/Logo */}
          <div className="flex flex-col space-y-4">
            <img src="/media/medium-transparent.png" alt="Alex's Home Improvement Logo" className="h-12 w-auto object-contain" />
            <p className="text-gray-300 max-w-xs">
              Providing quality craftsmanship and reliable home improvement services to Asheville and Leicester, NC.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-gold font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="/reviews" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-gold font-bold text-lg">Contact Us</h3>
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone size={18} />
              <a href="tel:XXX-XXX-XXXX" className="hover:text-white transition-colors">XXX-XXX-XXXX</a>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail size={18} />
              <a href="mailto:info@alexshomeimprovement.com" className="hover:text-white transition-colors">info@alexshomeimprovement.com</a>
            </div>
            <p className="text-gray-300 mt-4">
              Serving Asheville & Leicester, NC
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Alex's Home Improvement. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
