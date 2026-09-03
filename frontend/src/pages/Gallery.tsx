import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectDisplay from '../components/ProjectDisplay';
import { PROJECTS } from '../data/gallery';
import { useParams } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0]?.id);
  const projectRowRef = useRef<HTMLDivElement>(null);
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((project) => project.category)))];
  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === filter);
  const selectedProject = filteredProjects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0];

  const { projectid } = useParams<{ projectid: string }>();
  useEffect(() => {
    if (projectid) {
      const project = PROJECTS.find((p) => p.id === projectid);
      if (project) {
        setSelectedProjectId(project.id);

        requestAnimationFrame(() => {
          document.getElementById('selectedProject')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      }
    }
  }, [projectid]);

  const scrollProjects = (direction: 'left' | 'right') => {
    projectRowRef.current?.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1645651964715-d200ce0939cc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-200">Quality craftsmanship in every project</p>
        </div>
      </section>

      <section className="py-5 lg:py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setFilter(category)} className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${filter === category ? 'bg-navy text-white scale-105 shadow-md' : 'bg-gray-100 text-navy hover:bg-gray-200'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="relative px-12">
          <div className="pointer-events-none absolute left-12 top-2 bottom-5 z-1 w-2 bg-linear-to-b from-transparent via-black/25 to-transparent shadow-[8px_0_12px_-8px_rgba(0,0,0,0.55)]" />
          <button type="button" onClick={() => scrollProjects('left')} aria-label="Scroll projects left" title="Scroll projects left" className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy p-3 text-white shadow-lg transition-colors hover:bg-gold hover:text-navy">
            <ChevronLeft size={22} />
          </button>
          <motion.div ref={projectRowRef} layout className="flex gap-5 overflow-x-auto px-1 pt-2 pb-5 snap-x scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => <ProjectDisplay key={project.id} project={project} isSelected={project.id === selectedProject?.id} onSelect={() => setSelectedProjectId(project.id)} />)}
            </AnimatePresence>
          </motion.div>
          <div className="pointer-events-none absolute right-12 top-2 bottom-5 z-1 w-2 bg-linear-to-b from-transparent via-black/25 to-transparent shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.55)]" />
          <button type="button" onClick={() => scrollProjects('right')} aria-label="Scroll projects right" title="Scroll projects right" className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy p-3 text-white shadow-lg transition-colors hover:bg-gold hover:text-navy">
            <ChevronRight size={22} />
          </button>
        </div>
        <div id="selectedProject" style={{ scrollMarginTop: '100px' }}>
          <AnimatePresence mode="wait">
            {selectedProject && <motion.div key={selectedProject.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="mt-10"><ProjectDisplay project={selectedProject} showDetails /></motion.div>}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
