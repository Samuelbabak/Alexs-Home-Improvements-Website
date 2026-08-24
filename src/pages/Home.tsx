import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Phone, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Placeholder Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Completed home improvement work" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <div className="relative z-10 max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Quality Home Improvement <span className="text-gold">Done Right</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-gray-200"
          >
            Remodels, Repairs, Decks, Roofing, and General Construction Services in Asheville & Leicester, NC.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-gold text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FileText size={20} /> Get Free Estimate
            </Link>
            <Link 
              to="/gallery" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Our Work <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-lg font-medium"
          >
            <a href="tel:XXX-XXX-XXXX" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone size={20} /> XXX-XXX-XXXX
            </a>
            <a href="mailto:info@alexshomeimprovement.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail size={20} /> info@alexshomeimprovement.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-10 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'Locally Owned',
              'Free Estimates',
              'Quality Craftsmanship',
              'Reliable Service',
              'Licensed & Insured',
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-navy font-semibold text-sm md:text-base">
                <CheckCircle size={18} className="text-gold" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">Our Services</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We specialize in high-quality home improvements tailored to your needs. From complete remodels to small repairs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Decks" 
              description="New composite and wood decks, repair and replacement." 
              image="https://images.unsplash.com/photo-1573869908170-64b53a60d8da?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ServiceCard 
              title="Remodeling" 
              description="Kitchens, bathrooms, and full home interior remodeling." 
              image="https://plus.unsplash.com/premium_photo-1683141037836-e5a26067194d?q=80&w=1726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ServiceCard 
              title="Roofing" 
              description="Full roof replacement, storm damage repair, and maintenance." 
              image="https://images.unsplash.com/photo-1633759593085-1eaeb724fc88?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ServiceCard 
              title="Repairs" 
              description="General carpentry, drywall, painting, and home fixes." 
              image="https://images.unsplash.com/photo-1645651964715-d200ce0939cc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ServiceCard 
              title="Construction" 
              description="Doors, trim, framing, and other general construction." 
              image="https://images.unsplash.com/photo-1715760374522-a609a0c2f65e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdv la la la" 
            />
            <ServiceCard 
              title="More Services" 
              description="Custom solutions for your specific home improvement needs." 
              image="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
          </div>
          <Link 
            to="/services" 
            className="mt-16 inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-md font-bold hover:bg-navy-800 transition-all duration-300"
          >
            View All Services <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-navy mb-4">Featured Projects</h2>
              <p className="text-gray-600">See how we've helped our neighbors in Asheville and Leicester.</p>
            </div>
            <Link 
              to="/gallery" 
              className="text-navy font-bold hover:text-gold transition-colors flex items-center gap-2"
            >
              View Full Gallery <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Deck Replacement" 
              location="Asheville, NC" 
              description="Old weathered deck transformed into a large composite entertainment space." 
              image="https://images.unsplash.com/photo-1573869908170-64b53a60d8da?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ProjectCard 
              title="Kitchen Remodel" 
              location="Leicester, NC" 
              description="Modern open-concept kitchen with custom cabinetry and quartz countertops." 
              image="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ProjectCard 
              title="Roof Installation" 
              location="Asheville, NC" 
              description="Full architectural shingle roof replacement with upgraded underlayment." 
              image="https://images.unsplash.com/photo-1603517431529-6ba96d7525bb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpbmdsZXN8ZW58MHx8MHx8fDA%3D" 
            />
            <ProjectCard 
              title="Bathroom Upgrade" 
              location="Leicester, NC" 
              description="Full master bathroom remodel with walk-in shower and double vanity." 
              image="https://images.unsplash.com/photo-1601760561441-16420502c7e0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ProjectCard 
              title="Exterior Painting" 
              location="Asheville, NC" 
              description="Complete exterior painting and trim repair for historic bungalow." 
              image="https://images.unsplash.com/photo-1645651964715-d200ce0939cc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <ProjectCard 
              title="Door Installation" 
              location="Leicester, NC" 
              description="Installation of energy-efficient front doors and trim work." 
              image="https://images.unsplash.com/photo-1715760374522-a609a0c2f65e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdv la la la" 
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">Customer Reviews</h2>
          <div className="flex items-center justify-center gap-2 text-gold mb-8">
            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            <span className="text-navy font-bold ml-2">Based on 20+ Reviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <ReviewCard 
              name="Sarah J." 
              project="Deck Construction" 
              text="Alex did an amazing job on our deck. He was professional, on time, and the quality of the work is top-notch." 
            />
            <ReviewCard 
              name="Mike R." 
              project="Kitchen Remodel" 
              text="Highly recommend Alex for any home improvement. Our kitchen looks incredible and the process was seamless." 
            />
            <ReviewCard 
              name="Linda K." 
              project="Roofing Repair" 
              text="Fast, reliable, and fair pricing. Alex fixed our roof leak quickly and it's been bone dry since." 
            />
          </div>
          <Link 
            to="/reviews" 
            className="mt-12 inline-block bg-navy text-white px-8 py-3 rounded-md font-bold hover:bg-navy-800 transition-all duration-300"
          >
            Read All Reviews
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504307631853-506127f6347b?q=80&w=2070&auto=format&fit=crop" 
            alt="Construction background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-xl mb-10 text-gray-300">
            Get a professional estimate for your home improvement project today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:XXX-XXX-XXXX" className="w-full sm:w-auto bg-gold text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-all duration-300">
              Call Now
            </a>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              Request Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-4 z-50 shadow-lg">
        <a href="tel:XXX-XXX-XXXX" className="flex flex-col items-center text-navy font-bold">
          <Phone size={24} />
          <span className="text-xs">Call</span>
        </a>
        <a href="mailto:info@alexshomeimprovement.com" className="flex flex-col items-center text-navy font-bold">
          <Mail size={24} />
          <span className="text-xs">Email</span>
        </a>
        <Link to="/contact" className="flex flex-col items-center text-navy font-bold">
          <FileText size={24} />
          <span className="text-xs">Estimate</span>
        </Link>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ title: string; description: string; image: string }> = ({ title, description, image }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to="/services" className="text-gold font-bold flex items-center gap-1 hover:text-navy transition-colors">
        Learn More <ArrowRight size={16} />
      </Link>
    </div>
  </div>
);

const ProjectCard: React.FC<{ title: string; location: string; description: string; image: string }> = ({ title, location, description, image }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-on-hover transition-all duration-300 group">
    <div className="relative h-56 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-navy">{title}</h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">{location}</span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  </div>
);

const ReviewCard: React.FC<{ name: string; project: string; text: string }> = ({ name, project, text }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gold">
    <div className="flex items-center gap-2 mb-4">
      <div className="h-10 w-10 bg-navy rounded-full flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-navy">{name}</p>
        <p className="text-xs text-gray-500">{project}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">"{text}"</p>
  </div>
);

export default Home;
