import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Phone, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      id: 'decks',
      title: 'Deck Construction',
      description: 'We build outdoor living spaces that last. From traditional wood to modern composite materials, we handle everything from design to final nail.',
      features: ['New Decks', 'Composite Decks', 'Wood Decks', 'Repair Work'],
      image: 'https://images.unsplash.com/photo-1573869908170-64b53a60d8da?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      faq: [
        { q: 'How long does a deck take to build?', a: 'Depending on size and material, typically 1-3 weeks.' },
        { q: 'Do you handle permits?', a: 'Yes, we can help manage the permit process with local Asheville/Leicester authorities.' },
      ],
    },
    {
      id: 'remodeling',
      title: 'Home Remodeling',
      description: 'Transform your interior spaces into something you love. We specialize in functional and beautiful updates for kitchens, bathrooms, and living areas.',
      features: ['Kitchens', 'Bathrooms', 'Floors', 'Drywall', 'Painting'],
      image: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by-1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      faq: [
        { q: 'Do you provide design services?', a: 'We work with your vision or can help you select materials and layouts.' },
        { q: 'How do you handle timelines?', a: 'We provide a detailed project schedule and strive to meet every milestone.' },
      ],
    },
    {
      id: 'roofing',
      title: 'Roofing Services',
      description: 'A strong roof is your home\'s first line of defense. We provide full replacements and expert repair work to keep you dry and safe.',
      features: ['Full Replacement', 'Storm Damage Repair', 'General Maintenance', 'Gutter Cleaning'],
      image: 'https://images.unsplash.com/photo-1603517431529-6ba96d7525bb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpbmdsZXN8ZW58MHx8MHx8fDA%3D',
      faq: [
        { q: 'Do you offer emergency repairs?', a: 'Yes, we prioritize storm damage and urgent leaks.' },
        { q: 'What materials do you use?', a: 'We use high-quality architectural shingles and flashing.' },
      ],
    },
    {
      id: 'general',
      title: 'General Carpentry & Repairs',
      description: 'No job is too small. From trim work and door installations to structural framing, we bring professional quality to every task.',
      features: ['Doors', 'Trim', 'Framing', 'Deck Repairs', 'Handyman Services'],
      image: 'https://images.unsplash.com/photo-1645651964715-d200ce0939cc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by-1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      faq: [
        { q: 'Do you do small repairs?', a: 'Yes, we handle a wide range of smaller home maintenance tasks.' },
        { q: 'Are you insured?', a: 'Yes, we are fully licensed and insured for your peace of mind.' },
      ],
    },
    {
      id: 'plumbing',
      title: 'Plumbing Services',
      description: 'Expert plumbing solutions to keep your home running smoothly. From leak repairs to full system upgrades.',
      features: ['Leak Repair', 'Pipe Installation', 'Fixture Upgrades', 'Drain Cleaning'],
      image: 'https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGx1bWJlcnxlbnwwfHwwfHx8MA%3D%3D',
      faq: [
        { q: 'Do you handle emergency leaks?', a: 'Yes, we offer prompt service for urgent plumbing issues.' },
        { q: 'Can you install new fixtures?', a: 'Absolutely, we can help you choose and install modern faucets, sinks, and showers.' },
      ],
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1606676539940-12768ce0e762?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Home improvement background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-200">Expert Craftsmanship for Your Home</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <div key={service.id} className="mb-24 last:mb-0">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full md:w-1/2">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-auto rounded-2xl shadow-2xl overflow-hidden object-cover" 
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{service.title}</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-navy font-medium">
                      <CheckCircle size={18} className="text-gold" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-md font-bold hover:bg-navy-800 transition-all duration-300"
                >
                  Request a Quote <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* FAQ for each service */}
            <div className="mt-12 bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-6 text-center">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.faq.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-bold text-navy mb-2">{item.q}</p>
                    <p className="text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;
