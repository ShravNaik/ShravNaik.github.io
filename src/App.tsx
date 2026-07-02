import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, ArrowUp } from 'lucide-react';
import MagneticButton from './components/MagneticButton';
import VisitorCounter from './components/VisitorCounter';
import { motion, useScroll, useMotionValueEvent, type Variants } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import BlogDetails from './pages/BlogDetails';
import ParticleTrail from './components/ParticleTrail';
import EasterEgg from './components/EasterEgg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

function MainApp() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 50 && isScrolled) {
      setIsScrolled(false);
    }
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    currentTarget.style.setProperty('--mouse-x', `${clientX}px`);
    currentTarget.style.setProperty('--mouse-y', `${clientY}px`);
  };

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-[#F5F5F5] text-slate-900'}`}
      >
        <ParticleTrail isDark={isDark} />
        <EasterEgg />

        {/* Background Grid */}
        <div className={`fixed inset-0 bg-[size:40px_40px] ${isDark ? 'bg-[linear-gradient(to_right,#181818_1px,transparent_1px),linear-gradient(to_bottom,#181818_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#E1E1E1_1px,transparent_1px),linear-gradient(to_bottom,#E1E1E1_1px,transparent_1px)]'}`}></div>

        {/* Interactive Bright Grid */}
        <div
          className={`fixed inset-0 pointer-events-none bg-[size:40px_40px] ${isDark ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#3984FF_1px,transparent_1px),linear-gradient(to_bottom,#3984FF_1px,transparent_1px)]'}`}
          style={{
            maskImage: 'radial-gradient(circle 200px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)',
            WebkitMaskImage: 'radial-gradient(circle 250px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)'
          }}
        ></div>

        {/* Gradient Overlay to hide top gridlines */}
        <div className={`absolute top-0 w-full h-[100vh] pointer-events-none ${isDark ? 'bg-gradient-to-b from-[#00215C] via-[#001124cc] to-transparent'
          : 'bg-gradient-to-b from-[#6FA5FD] via-[#f3f4f6cc] to-transparent'}`}></div>

        {/* Bottom Gradient Overlay for Footer */}
        <div className={`absolute bottom-0 w-full h-[50vh] pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-[#001124cc] to-[#00215C]'
          : 'bg-gradient-to-b from-transparent via-[#f3f4f6cc] to-[#6FA5FD]'}`}></div>

        {/* Circular Cyan Glow (Color Dodge) */}
        <div className={`absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-[#7DECFF] opacity-40 mix-blend-color-dodge' : 'bg-[#00D9FF] opacity-40 mix-blend-color-dodge'}`}></div>

        {/* Circular Cyan Glow near bottom left */}
        <div className={`absolute top-[20%] right-[-20%] w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-[#052358] opacity-90' : 'bg-[#042A5C] opacity-30 mix-blend-screen'}`}></div>

        <div className={`absolute bottom-[30%] left-[-200px] w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-[#004B71] opacity-90' : 'bg-[#042A5C] opacity-30 mix-blend-screen'}`}></div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Navbar */}
          <motion.header
            className="flex justify-between items-center mb-26 sticky top-4 z-50 backdrop-blur-sm py-4 -my-4"
            variants={fadeInUp}
          >
            <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tight flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span>S</span>
              <motion.span
                initial={false}
                animate={{
                  width: isScrolled ? 0 : 'auto',
                  opacity: isScrolled ? 0 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like ease out
                className="overflow-hidden whitespace-nowrap inline-block"
              >
                hravan&nbsp;
              </motion.span>
              <span>N.</span>
            </Link>
            <nav className={`flex items-center gap-3 sm:gap-4 md:gap-8 text-sm sm:text-base md:text-[1.5rem] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <MagneticButton><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-current ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>projects</a></MagneticButton>
              <MagneticButton><a href="#blogs" onClick={(e) => handleNavClick(e, 'blogs')} className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-current ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>blogs</a></MagneticButton>
              <MagneticButton><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-current ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>contact</a></MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`ml-2 transition-colors cursor-pointer ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Moon size={20} strokeWidth={2} /> : <Sun size={20} strokeWidth={2} />}
                </button>
              </MagneticButton>
            </nav>
          </motion.header>

          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/project/:id" element={<ProjectDetails isDark={isDark} />} />
            <Route path="/blog/:id" element={<BlogDetails isDark={isDark} />} />
          </Routes>

          {/* Footer */}
          <footer className={`mt-12 py-8 border-t ${isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'} flex flex-col md:flex-row items-center justify-between text-sm gap-4`}>
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Shravan N. All rights reserved.
            </p>
            <div className="my-2 md:my-0">
              <VisitorCounter isDark={isDark} />
            </div>
            <div className="flex items-center gap-6 font-medium">
              <a href="https://github.com/ShravNaik" target="_blank" rel="noopener noreferrer" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
                GitHub
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
                LinkedIn
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
                Contact
              </a>
              <MagneticButton>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer ${isDark
                    ? 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:border-blue-500/50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10'
                    }`}
                  aria-label="Elevate to top"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">Top</span>
                  <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>
            </div>
          </footer>
        </motion.div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
