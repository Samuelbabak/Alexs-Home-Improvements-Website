import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, HardHat, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="About background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Alex</h1>
          <p className="text-xl text-gray-200">Craftsmanship, Integrity, and Local Pride</p>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/media/professional_headshot_AHI.jpeg" 
              alt="Alex at work" 
              className="w-full h-auto rounded-3xl shadow-2xl" 
            />
            <div className="absolute -bottom-6 -right-6 bg-gold p-6 rounded-2xl text-navy font-bold text-center shadow-xl hidden md:block">
              <p className="text-2xl">10+</p>
              <p className="text-xs uppercase">Years Exp.</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Meet Alex</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                I started Alex's Home Improvement with a simple goal: to provide my neighbors in Asheville and Leicester with a contractor they can actually trust.
              </p>
              <p>
                With over a decade of experience in general construction, I've handled everything from basic repairs to full-scale home remodels. I believe that a home is the biggest investment most people make, and it deserves to be treated with respect and quality craftsmanship.
              </p>
              <p>
                My approach is simple: I show up on time, I do the job right the first time, and I don't leave until you're 100% satisfied. Whether it's a new composite deck for your summer BBQs or a complete kitchen overhaul, I treat every project as if it were for my own family.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-2xl border-b-4 border-gold text-center">
            <div className="flex justify-center mb-4 text-navy">
              <Award size={48} />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Quality First</h3>
            <p className="text-gray-600">I don't cut corners. I use premium materials and time-tested techniques to ensure your home stays beautiful for years.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border-b-4 border-gold text-center">
            <div className="flex justify-center mb-4 text-navy">
              <HardHat size={48} />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Reliable Service</h3>
            <p className="text-gray-600">Communication is key. You'll always know exactly where your project stands and when I'll be on-site.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border-b-4 border-gold text-center">
            <div className="flex justify-center mb-4 text-navy">
              <Heart size={48} />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Local Pride</h3>
            <p className="text-gray-600">Being based in Asheville/Leicester, I take pride in improving our community one home at a time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
