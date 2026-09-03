import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProjectDisplayData {
  id: string;
  title: string;
  location?: string;
  description?: string;
  category: string;
  images: string[];
  coverImage?: string;
  beforeImages?: string[];
  materials?: string[];
  scope?: string;
}

interface ProjectDisplayProps {
  project: ProjectDisplayData;
  onSelect?: () => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ project, onSelect, isSelected = false, showDetails = false }) => {
  const coverImage = project.coverImage ?? project.images[project.images.length - 1] ?? project.beforeImages?.[0];
  const [activeImage, setActiveImage] = useState(Math.max(project.images.indexOf(coverImage ?? ''), 0));
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const lightboxImages = [...project.images, ...(project.beforeImages ?? [])];
  const showPrevious = () => setActiveImage((current) => (current - 1 + project.images.length) % project.images.length);
  const showNext = () => setActiveImage((current) => (current + 1) % project.images.length);
  const showPreviousLightboxImage = () => setLightboxImage((current) => current === null ? null : (current - 1 + lightboxImages.length) % lightboxImages.length);
  const showNextLightboxImage = () => setLightboxImage((current) => current === null ? null : (current + 1) % lightboxImages.length);

  useEffect(() => {
    if (lightboxImage === null) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null);
      if (event.key === 'ArrowLeft') showPreviousLightboxImage();
      if (event.key === 'ArrowRight') showNextLightboxImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, lightboxImages.length]);

  if (!showDetails) {
    return (
      <button type="button" onClick={onSelect} aria-pressed={isSelected} aria-label={`View ${project.title} project`} className={`group relative shrink-0 w-64 overflow-hidden rounded-2xl shadow-lg text-left transition-all ${isSelected ? 'ring-4 ring-gold' : 'hover:shadow-xl'}`}>
        {coverImage && <img src={coverImage} alt={project.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <div className="flex items-center gap-1 text-sm opacity-90"><Maximize2 size={15} /> View project</div>
        </div>
      </button>
    );
  }

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 rounded-3xl p-5 md:p-8 shadow-xl">
      <div>
        {project.images[activeImage] && <button type="button" onClick={() => setLightboxImage(activeImage)} aria-label={`Enlarge ${project.title} image ${activeImage + 1}`} className="group block w-full cursor-zoom-in"><img src={project.images[activeImage]} alt={`${project.title} ${activeImage + 1}`} className="w-full aspect-[4/3] object-cover rounded-xl transition-opacity group-hover:opacity-90" /></button>}
        {project.images.length > 1 && <div className="flex items-center gap-3 mt-4"><button type="button" onClick={showPrevious} aria-label="Previous project image" className="p-2 rounded-full bg-white text-navy shadow hover:bg-gold"><ChevronLeft size={20} /></button><div className="flex gap-2 overflow-x-auto">{project.images.map((image, index) => <button type="button" key={image} onClick={() => setActiveImage(index)} aria-label={`Show project image ${index + 1}`} className={`shrink-0 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-gold' : 'border-transparent'}`}><img src={image} alt="" className="w-16 h-12 object-cover" /></button>)}</div><button type="button" onClick={showNext} aria-label="Next project image" className="p-2 rounded-full bg-white text-navy shadow hover:bg-gold"><ChevronRight size={20} /></button></div>}
        {project.beforeImages && project.beforeImages.length > 0 && <div className="mt-6"><h4 className="font-bold text-navy mb-3 uppercase text-xs tracking-wider">Before</h4><div className="grid grid-cols-2 gap-3">{project.beforeImages.map((image, index) => <button type="button" key={image} onClick={() => setLightboxImage(project.images.length + index)} aria-label={`Enlarge ${project.title} before image ${index + 1}`} className="group cursor-zoom-in"><img src={image} alt={`${project.title} before ${index + 1}`} className="w-full aspect-[4/3] object-cover rounded-lg transition-opacity group-hover:opacity-90" /></button>)}</div></div>}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-navy mb-2">{project.title}</h2>
        {project.location && <p className="text-gold font-bold mb-4">{project.location}</p>}
        {project.description && <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>}
        {project.materials && project.materials.length > 0 && <div className="mb-6"><h4 className="font-bold text-navy mb-2 uppercase text-xs tracking-wider">Materials Used:</h4><div className="flex flex-wrap gap-2">{project.materials.map((material) => <span key={material} className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{material}</span>)}</div></div>}
        {project.scope && <div className="mb-8"><h4 className="font-bold text-navy mb-2 uppercase text-xs tracking-wider">Scope of Work:</h4><p className="text-gray-600 text-sm leading-relaxed">{project.scope}</p></div>}
        <Link to="/contact" className="block text-center bg-navy text-white px-6 py-3 rounded-md font-bold hover:bg-navy-800 transition-all">Get a Similar Project</Link>
      </div>
      {lightboxImage !== null && lightboxImages[lightboxImage] && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`${project.title} image viewer`} onClick={() => setLightboxImage(null)}><button type="button" onClick={() => setLightboxImage(null)} aria-label="Close image viewer" className="absolute right-5 top-5 z-10 rounded-full bg-white/20 p-3 text-white hover:bg-white/40"><X size={24} /></button><button type="button" onClick={(event) => { event.stopPropagation(); showPreviousLightboxImage(); }} aria-label="Previous enlarged image" className="absolute left-4 rounded-full bg-white/20 p-3 text-white hover:bg-white/40"><ChevronLeft size={28} /></button><img src={lightboxImages[lightboxImage]} alt={`${project.title} enlarged image ${lightboxImage + 1}`} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} /><button type="button" onClick={(event) => { event.stopPropagation(); showNextLightboxImage(); }} aria-label="Next enlarged image" className="absolute right-4 rounded-full bg-white/20 p-3 text-white hover:bg-white/40"><ChevronRight size={28} /></button></div>}
    </article>
  );
};

export default ProjectDisplay;
