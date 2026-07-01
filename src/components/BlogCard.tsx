import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  readTime: string;
  isDark: boolean;
  tags?: string[];
  className?: string;
  blogId: string;
}

const BlogCard = ({ title, description, imageUrl, date, readTime, isDark, tags = [], className = '', blogId }: BlogCardProps) => {
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

    if (blogId) {
      navigate(`/blog/${blogId}`);
      window.scrollTo(0, 0);
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
        
        {/* Read Time badge */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold shadow-lg transition-all duration-300 bg-black/60 text-white border border-white/10">
          <Clock size={14} className="text-[#00d2ff]" />
          <span>{readTime}</span>
        </div>
      </div>

      {/* Bottom half: Details */}
      <div className={`p-6 flex flex-col flex-grow z-0 ${isDark ? 'glass-card-details border-t border-white/10' : 'glass-card-details-light border-t border-slate-200'}`}>
        <div className={`flex items-center gap-1.5 text-xs font-semibold mb-3 ${isDark ? 'text-[#00d2ff]' : 'text-blue-600'}`}>
          <Calendar size={14} />
          <span>{date}</span>
        </div>

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
    </motion.div>
  );
};

export default BlogCard;
