import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, type Variants } from 'framer-motion';
import { FileText, School, BookOpen, GraduationCap, Terminal, type LucideIcon } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import GithubActivity from '../components/GithubActivity';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import AnimeQuote from '../components/AnimeQuote';

import { projects } from '../data/projects';
import { blogs } from '../data/blogs';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

interface EducationCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  isDark: boolean;
}
const EducationCard = ({ icon: Icon, category, title, description, isDark }: EducationCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  const background = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(57,132,255,0.1)'}, transparent)`;
  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col md:items-center md:text-center p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${isDark ? 'bg-[#101010] border-white/10 hover:border-blue-500/50 shadow-xl' : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
        }`}
    >
      {/* Spotlight overlay following mouse */}
      <motion.div
        className="absolute inset-0 z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background }}
      ></motion.div>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 group-hover:scale-110 relative z-20 ${isDark ? 'bg-[#063b53] border border-[#0a749d] text-[#00d2ff]' : 'bg-blue-100 border border-blue-200 text-blue-600'
        }`}>
        <Icon size={32} />
      </div>
      <span className={`w-fit text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 relative z-20 ${isDark ? 'bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/20' : 'bg-blue-50 text-blue-600 border border-blue-100'
        }`}>
        {category}
      </span>
      <h4 className={`text-2xl font-bold mb-3 tracking-tight relative z-20 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h4>
      <p className={`text-base leading-relaxed relative z-20 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  );
};

interface TechCardProps {
  title: string;
  technologies: string[];
  isDark: boolean;
}

const TechCard = ({ title, technologies, isDark }: TechCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(57,132,255,0.1)'}, transparent)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${isDark ? 'glass-card-details border-white/10 hover:border-blue-500/50 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md'
        }`}
    >
      {/* Spotlight overlay following mouse */}
      <motion.div
        className="absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background }}
      ></motion.div>

      <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 relative z-20 ${isDark ? 'text-[#00d2ff]' : 'text-blue-600'}`}>{title}</h4>
      <div className="flex flex-wrap gap-2.5 relative z-20">
        {technologies.map((tech) => (
          <span key={tech} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white/5 border-white/10 text-white hover:border-[#00d2ff]/40 hover:bg-[#00d2ff]/10' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-blue-50'}`}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

interface HomeProps {
  isDark: boolean;
}

export default function Home({ isDark }: HomeProps) {
  const contactMouseX = useMotionValue(0);
  const contactMouseY = useMotionValue(0);

  const handleContactMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    contactMouseX.set(clientX - left);
    contactMouseY.set(clientY - top);
  };

  const contactBg = useMotionTemplate`radial-gradient(circle 300px at ${contactMouseX}px ${contactMouseY}px, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(57,132,255,0.1)'}, transparent)`;

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
      } else {
        console.error("Form error:", data);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
    }
  };

  return (
    <main>
      <motion.div className="mb-10" variants={fadeInUp}>
        <h2 className={`text-xl md:text-2xl mb-2 font-bold ${isDark ? 'text-[#ffffff]' : 'text-slate-900'}`}>hello there, i'm</h2>
        <div className="flex items-center gap-6 mb-8 flex-wrap">
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight leading-none">Shravan Naik</h1>
          <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 mt-2 transition-colors ${isDark ? 'bg-[#063b53] border border-[#0a749d]' : 'bg-blue-100 border border-blue-200'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#00d2ff]' : 'bg-blue-500'}`}></div>
            <span className={`text-lg ${isDark ? 'text-[#bae6fd]' : 'text-blue-700'}`}>learning</span>
          </div>
        </div>
        <p className={`text-xl md:text-[1.35rem] transition-colors ${isDark ? 'text-[#d1d5db]' : 'text-slate-600'}`}>
          currently learning <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>python, mathematics, data science, and machine learning.</strong>
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 md:gap-14 ml-0 sm:ml-4 md:ml-10 mt-8 md:mt-0" variants={fadeInUp}>
        <MagneticButton proximity={50} pull={0.4}>
          <a href="https://github.com/ShravNaik" target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center gap-3 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" width="36" height="36" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="text-sm font-semibold tracking-wide">GitHub</span>
          </a>
        </MagneticButton>
        <MagneticButton proximity={50} pull={0.4}>
          <a href="https://www.linkedin.com/in/shravan-naik-971062326" target='_blank' rel="noopener noreferrer" className={`flex flex-col items-center gap-3 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" width="36" height="36" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-sm font-semibold tracking-wide">LinkedIn</span>
          </a>
        </MagneticButton>
        <MagneticButton proximity={50} pull={0.4}>
          <a href="https://x.com/ShravNaik" target="_blank" rel='noopener noreferrer' className={`flex flex-col items-center gap-3 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" width="36" height="36" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            <span className="text-sm font-semibold tracking-wide">X</span>
          </a>
        </MagneticButton>
        <MagneticButton proximity={50} pull={0.4}>
          <a href="/resume.pdf" download className={`flex flex-col items-center gap-3 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <FileText size={36} strokeWidth={1.5} />
            <span className="text-sm font-semibold tracking-wide">Resume</span>
          </a>
        </MagneticButton>
      </motion.div>

      {/* About Me */}
      <motion.div variants={fadeInUp} className="mt-16 scroll-mt-16" id="about">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-6">about me.</h3>
        <div className={`ml-4 md:ml-10 border-l-3 ${isDark ? 'border-[#00d2ff]' : 'border-blue-500/40'} pl-6 py-1`}>
          <p className={`text-base md:text-[1.15rem] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            I'm a passionate developer and tech enthusiast with a deep curiosity for how things work under the hood.
            My journey in technology is driven by a love for solving complex problems and building
            innovative, scalable solutions. Whether it's crafting beautiful, dynamic user interfaces or diving deep
            into the intricate world of data science and machine learning algorithms, I'm constantly eager to learn and grow.
            <br /><br />
            I thrive in environments where creativity meets logic, and I believe in writing code that is not only functional
            but also elegant and maintainable. When I'm not at my keyboard, I'm likely exploring emerging tech trends,
            exploring mathematics, or brainstorming my next big project.
          </p>
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div variants={fadeInUp} className="mt-16 scroll-mt-16">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-6">technologies.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4 md:ml-10">
          <TechCard title="Languages" technologies={['Python', 'C', 'C++', 'JavaScript', 'SQL']} isDark={isDark} />
          <TechCard title="Libraries" technologies={['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn']} isDark={isDark} />
          <TechCard title="Frameworks" technologies={['React', 'React Native', 'Expo', 'Flask']} isDark={isDark} />
          <TechCard title="AI & Assistants" technologies={['Claude', 'Gemini', 'Antigravity']} isDark={isDark} />
        </div>
      </motion.div>

      <GithubActivity isDark={isDark} />

      {/* Projects */}
      <motion.div variants={fadeInUp} className="mt-15 scroll-mt-15" id="projects">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-8">projects.</h3>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              className={project.gridSpan || "md:col-span-1 lg:col-span-1"}
              isDark={isDark}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags || []}
              link={project.link}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </motion.div>

      {/* Blogs */}
      <motion.div variants={fadeInUp} className="mt-15 scroll-mt-15" id="blogs">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-8">blogs.</h3>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blogId={blog.id}
              className={blog.gridSpan || "md:col-span-1 lg:col-span-1"}
              isDark={isDark}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.imageUrl}
              date={blog.date}
              readTime={blog.readTime}
              tags={blog.tags || []}
            />
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div variants={fadeInUp} className="mt-16 scroll-mt-16" id="education">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-8">education.</h3>

        <div className="relative ml-4 md:ml-10">
          {/* Connecting Line for desktop */}
          <div className={`absolute top-[50%] left-[40px] right-[40px] hidden md:block h-[5px] ${isDark ? 'bg-blue-500/50' : 'bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200'}`}></div>

          {/* Connecting Line for mobile */}
          <div className={`absolute top-[10%] bottom-[40px] left-[40px] md:hidden w-[5px] ${isDark ? 'bg-blue-500/50' : 'bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200'}`}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
            <EducationCard
              icon={GraduationCap}
              category="College"
              title="Padre Conceicao College of Engineering"
              description="Pursuing higher education in information technology and honours in data science."
              isDark={isDark}
            />
            <EducationCard
              icon={BookOpen}
              category="Higher Secondary"
              title="Deepvihar Higher Secondary School"
              description="Specialized focus on advanced mathematics, physics, and science streams."
              isDark={isDark}
            />
            <EducationCard
              icon={School}
              category="Secondary Education"
              title="Murgaon High School"
              description="Foundation in general academics, mathematics, and core sciences."
              isDark={isDark}
            />

          </div>
        </div>
      </motion.div>

      {/* Let's Connect Section */}
      <motion.div variants={fadeInUp} className="mt-15 scroll-mt-15 mb-24" id="contact">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-8">let's connect.</h3>

        <div
          onMouseMove={handleContactMouseMove}
          className={`group relative p-8 md:p-12 rounded-3xl border transition-all duration-300 overflow-hidden ${isDark ? 'bg-[#101010] border-white/10 hover:border-blue-500/50 shadow-2xl' : 'bg-white border-slate-200 hover:border-blue-400 backdrop-blur-md shadow-xl'} max-w-3xl mx-auto`}
        >
          {/* Spotlight overlay following mouse */}
          <motion.div
            className="absolute inset-0 z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: contactBg }}
          ></motion.div>

          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-12 text-center relative z-20"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl ${isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-600 border border-emerald-200'}`}>
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className={`text-2xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Message Sent Successfully!</h4>
              <p className={`text-lg mb-8 max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Thanks for reaching out! I've received your message and will get back to you soon.</p>

              <MagneticButton>
                <button
                  onClick={() => setFormStatus('idle')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-white shadow-white/5' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-slate-200/50'}`}
                >
                  Send Another Message
                </button>
              </MagneticButton>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 relative z-20">
              <input type="hidden" name="access_key" value="f54c81a8-8757-4aba-84d5-eb5f1c297176" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                  <input type="text" name="name" id="name" required className={`px-4 py-3 rounded-xl outline-none border focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-[#0f172a]/50 border-white/10 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} placeholder="John Doe" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                  <input type="email" name="email" id="email" required className={`px-4 py-3 rounded-xl outline-none border focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-[#0f172a]/50 border-white/10 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} placeholder="john@example.com" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                <textarea name="message" id="message" required rows={5} className={`px-4 py-3 rounded-xl outline-none border focus:ring-2 focus:ring-blue-500 transition-all resize-none ${isDark ? 'bg-[#0f172a]/50 border-white/10 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} placeholder="Hi, I'd like to talk about..."></textarea>
              </div>

              <MagneticButton className="w-full md:w-auto md:ml-auto mt-4" proximity={90} pull={0.4}>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all ${formStatus === 'submitting'
                    ? (isDark ? 'bg-blue-800/50 text-white/50 cursor-not-allowed' : 'bg-blue-300 text-white/80 cursor-not-allowed')
                    : (isDark ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30')
                    }`}
                >
                  <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </MagneticButton>
              {formStatus === 'error' && (
                <p className="text-red-500 text-sm text-center font-medium mt-2">Oops! Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </motion.div>

      {/* Fun Section */}
      <motion.div variants={fadeInUp} className="mt-16 scroll-mt-16 mb-24" id="fun">
        <h3 className="text-[1.7rem] font-bold tracking-tight mb-8">fun.</h3>

        <div className="flex flex-col gap-12 max-w-3xl mx-auto px-4 md:px-0">

          {/* Decryption Puzzle */}
          <div className={`p-8 rounded-3xl border transition-all duration-300 ${isDark ? 'bg-[#101010] border-white/10 hover:border-blue-500/50 shadow-xl' : 'bg-blue-50 border-blue-200 hover:border-blue-400 shadow-lg'} backdrop-blur-md flex flex-col md:flex-row items-center gap-6 md:gap-8`}>
            <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-xl ${isDark ? 'bg-[#063b53] border-[#0a749d] text-[#00d2ff]' : 'bg-blue-100 border-blue-200 text-blue-600'}`}>
              <Terminal size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#00ff70] shadow-[0_0_8px_#00ff70]' : 'bg-emerald-500'} animate-pulse`}></span>
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#00ff70]' : 'text-emerald-600'}`}>Encrypted Transmission</span>
              </div>
              <h4 className={`text-xl font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The Decryption Puzzle
              </h4>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                "I am a rectangular array of quantities in linear algebra, the mathematical bedrock of neural network weight transformations, and a simulated reality where Neo was offered the red pill. What am I?"
              </p>
              <div className={`inline-block px-4 py-2 rounded-xl text-xs font-bold border ${isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
                💡 <span className="italic">Type the 6-letter answer anywhere on your keyboard to unlock a secret mode...</span>
              </div>
            </div>
          </div>

          {/* Daily Anime Quote */}
          <AnimeQuote isDark={isDark} />
        </div>
      </motion.div>
    </main>
  );
}
