import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { projects } from '../data/projects';
import MagneticButton from '../components/MagneticButton';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ProjectDetailsProps {
  isDark: boolean;
}

export default function ProjectDetails({ isDark }: ProjectDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      className="max-w-4xl mx-auto py-10"
    >
      <Link
        to="/"
        className={`inline-flex items-center gap-2 mb-8 group transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">Back to Projects</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${isDark
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-black/5 border-slate-200 text-slate-700'
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-10">
          {project.githubLink && (
            <MagneticButton proximity={60} pull={0.4}>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
              >
                <GithubIcon size={20} />
                View Source
              </a>
            </MagneticButton>
          )}
          {project.link && (
            <MagneticButton proximity={40} pull={0.3}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            </MagneticButton>
          )}
        </div>
      </div>

      {/* Main Banner / Video Player */}
      <div className={`w-full rounded-3xl overflow-hidden border mb-16 ${isDark ? 'border-white/10 bg-black/40' : 'border-slate-200 bg-slate-100'} shadow-2xl flex items-center justify-center`}>
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            poster={project.imageUrl}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[70vh] object-cover"
          />
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            onClick={() => setZoomedImg(project.imageUrl)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-6">Overview</h3>
          <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert text-slate-300' : 'text-slate-700'} whitespace-pre-line`}>
            {project.longDescription}
          </div>
        </div>
        <div className={`p-8 rounded-3xl border h-fit ${isDark ? 'bg-[#101010] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className="font-bold text-lg mb-4">Project Details</h4>
          <div className="space-y-4">
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Role</p>
              <p className="font-semibold">{project.Role}</p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Timeline</p>
              <p className="font-semibold">{project.Timeline}</p>
            </div>
          </div>
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setZoomedImg(img)}
                className={`rounded-2xl overflow-hidden border cursor-pointer group ${isDark ? 'border-white/10' : 'border-slate-200'}`}
              >
                <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {createPortal(
        <AnimatePresence>
          {zoomedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedImg(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setZoomedImg(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
                <img
                  src={zoomedImg}
                  alt="Zoomed project view"
                  className="w-full h-auto max-h-[85vh] object-contain select-none"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
