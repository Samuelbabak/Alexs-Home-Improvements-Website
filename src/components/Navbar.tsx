import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, FileText, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/media/medium-transparent.png" alt="Alex's Home Improvements Logo" className="h-12 w-auto" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="hover:text-gold transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="bg-gold text-navy px-4 py-2 rounded-md font-bold hover:bg-white transition-all duration-200"
            >
              Get Free Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-navy-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-navy-700 hover:text-gold transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-bold bg-gold text-navy text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
