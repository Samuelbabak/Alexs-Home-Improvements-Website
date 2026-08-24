import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  category: string;
  image: string;
  materials: string[];
  scope: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Deck Replacement',
    location: 'Asheville, NC',
    description: 'Old weathered deck transformed into a large composite entertainment space.',
    category: 'Decks',
    image: 'https://images.unsplash.com/photo-1573869908170-64b53a60d8da?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    materials: ['Trex Composite', 'Pressure Treated Lumber', 'Steel Fasteners'],
    scope: 'Full demolition of existing deck, installation of new footings, and building a 400 sq ft composite deck.',
  },
  {
    id: '2',
    title: 'Kitchen Remodel',
    location: 'Leicester, NC',
    description: 'Modern open-concept kitchen with custom cabinetry and quartz countertops.',
    category: 'Remodels',
    image: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    materials: ['Quartz Countertops', 'Custom Oak Cabinets', 'Subway Tile'],
    scope: 'Complete gut of kitchen, plumbing and electrical updates, new flooring, and custom cabinetry installation.',
  },
  {
    id: '3',
    title: 'Roof Installation',
    location: 'Asheville, NC',
    description: 'Full architectural shingle roof replacement with upgraded underlayment.',
    category: 'Roofs',
    image: 'https://images.unsplash.com/photo-1603517431529-6ba96d7525bb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpbmdsZXN8ZW58MHx8MHx8fDA%3D',
    materials: ['Architectural Shingles', 'Synthetic Underlayment', 'Ridge Vents'],
    scope: 'Tear-off of old shingles, deck inspection and repair, installation of new shingles and flashing.',
  },
  {
    id: '4',
    title: 'Bathroom Upgrade',
    location: 'Leicester, NC',
    description: 'Full master bathroom remodel with walk-in shower and double vanity.',
    category: 'Remodels',
    image: 'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    materials: ['Porcelain Tile', 'Double Vanity', 'Frameless Glass'],
    scope: 'Demo of old bath, waterproofing of shower area, new plumbing fixtures, and tiling.',
  },
  {
    id: '5',
    title: 'Exterior Painting',
    location: 'Asheville, NC',
    description: 'Complete exterior painting and trim repair for historic bungalow.',
    category: 'Repairs',
    image: 'https://images.unsplash.com/photo-1778342259272-142fa3f81859?q=80&w=788&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    materials: ['Low-VOC Exterior Paint', 'Wood Filler', 'Caulk'],
    scope: 'Scraping, sanding, trim repair, and two coats of premium exterior paint.',
  },
  {
    id: '6',
    title: 'Door Installation',
    location: 'Leicester, NC',
    description: 'Installation of energy-efficient front doors and trim work.',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1559871753-75a00941f6b2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    materials: ['Fiberglass Doors', 'Pine Trim', 'Custom Hardware'],
    scope: 'Removal of old doors, framing adjustment, and installation of new high-efficiency doors with custom trim.',
  },
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);

  const categories = ['All', 'Decks', 'Roofs', 'Remodels', 'Repairs', 'Construction'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a85af40?q=80&w=2070&auto=format&fit=crop" 
            alt="Gallery background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-200">Quality craftsmanship in every project</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                filter === cat 
                ? 'bg-navy text-white scale-105 shadow-md' 
                : 'bg-gray-100 text-navy hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id} 
                className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm opacity-90">
                      <Maximize2 size={16} /> View Project Details
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/3 h-96 md:h-auto">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="w-full md:w-1/3 p-8 overflow-y-auto">
                <h3 className="text-3xl font-bold text-navy mb-2">{selectedImage.title}</h3>
                <p className="text-gold font-bold mb-4">{selectedImage.location}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="mb-6">
                  <h4 className="font-bold text-navy mb-2 uppercase text-xs tracking-wider">Materials Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.materials.map((m, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="font-bold text-navy mb-2 uppercase text-xs tracking-wider">Scope of Work:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedImage.scope}
                  </p>
                </div>
                <Link 
                  to="/contact" 
                  className="block text-center bg-navy text-white px-6 py-3 rounded-md font-bold hover:bg-navy-800 transition-all duration-300"
                >
                  Get a Similar Project
                </Link>
              </div>
            </motion.div>
          </motion.div> )}
        </AnimatePresence>
      </div>
      );
};

export default Gallery;
