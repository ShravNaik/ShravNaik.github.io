import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
//import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.19-.35 6.5-1.5 6.5-7.1a5.4 5.4 0 0 0-1.5-3.8c.15-.38.6-1.8-.15-3.8-1.2-.3-3.8 1.4-3.8 1.4a10.9 10.9 0 0 0-7 0s-2.6-1.7-3.8-1.4c-.75 2-.3 3.4-.15 3.8a5.4 5.4 0 0 0-1.5 3.8c0 5.6 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.02V22" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isDark: boolean;
  tags?: string[];
  link?: string;
  githubLink?: string;
  className?: string;
  projectId?: string;
}

const ProjectCard = ({ title, description, imageUrl, isDark, tags = [], link, githubLink, className = '', projectId }: ProjectCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navigate = useNavigate();

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(57,132,255,0.1)'}, transparent)`;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;

    if (projectId) {
      navigate(`/project/${projectId}`);
      window.scrollTo(0, 0);
    } else if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.1 }}
      className={`group cursor-pointer rounded-3xl flex flex-col border relative overflow-hidden ${isDark
        ? 'glass-card border-white/10 hover:border-blue-500/50 shadow-xl'
        : 'glass-card-light border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md'
        } transition-all duration-300 ${className}`}
    >
      {/* Spotlight overlay following mouse (covers entire card) */}
      <motion.div
        className="absolute inset-0 z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background }}
      ></motion.div>

      {/* Top half: Image (Standard 16:9 Aspect Ratio) */}
      <div className="relative w-full aspect-video rounded-t-[23px] overflow-hidden shrink-0 border-b border-white/5">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {/*
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full backdrop-blur-md hover:scale-110 transition-transform ${isDark ? 'bg-black/50 text-white hover:bg-black/70' : 'bg-white/60 text-slate-900 hover:bg-white/90'}`} aria-label={`View ${title}`}>
              <ArrowUpRight size={20} />
            </a>
          )}
          */}
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full backdrop-blur-md hover:scale-110 transition-transform ${isDark ? 'bg-black/50 text-white hover:bg-black/70' : 'bg-white/60 text-slate-900 hover:bg-white/90'}`} aria-label={`View ${title} on GitHub`}>
              <GithubIcon size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom half: Details */}
      <div className={`p-6 flex flex-col flex-grow z-0 ${isDark ? 'glass-card-details border-t border-white/10' : 'glass-card-details-light border-t border-slate-200'}`}>
        <h4 className={`text-2xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h4>
        <p className={`text-[0.95rem] line-clamp-3 leading-relaxed mb-6 flex-grow ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span key={i} className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-900/5 text-slate-700'}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-30">
          <span className="sr-only">View {title}</span>
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
