//import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogs } from '../data/blogs';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

interface BlogDetailsProps {
  isDark: boolean;
}

export default function BlogDetails({ isDark }: BlogDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-3xl font-bold mb-4">Blog Post Not Found</h2>
        <Link to="/#blogs" className="text-blue-500 hover:underline">Return to Blogs</Link>
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
        to="/#blogs"
        className={`inline-flex items-center gap-2 mb-8 group transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">Back to Blogs</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-6 text-sm font-semibold mb-6 flex-wrap">
          <div className={`flex items-center gap-2 ${isDark ? 'text-[#00d2ff]' : 'text-blue-600'}`}>
            <Calendar size={16} />
            <span>{blog.date}</span>
          </div>
          <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Clock size={16} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {blog.tags.map((tag, idx) => (
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
      </div>

      {/* Main Banner */}
      <div className={`w-full rounded-3xl overflow-hidden border mb-16 ${isDark ? 'border-white/10' : 'border-slate-200'} shadow-2xl`}>
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2">
          <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert text-slate-300' : 'text-slate-700'} whitespace-pre-line leading-relaxed space-y-6`}>
            {blog.content}
          </div>
        </div>
        <div className={`p-8 rounded-3xl border h-fit ${isDark ? 'bg-[#101010] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
          <h4 className="font-bold text-lg mb-6">Article Details</h4>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#063b53] border border-[#0a749d] text-[#00d2ff]' : 'bg-blue-100 border border-blue-200 text-blue-600'}`}>
                <User size={20} />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Written by</p>
                <p className="font-semibold">Shravan Naik</p>
              </div>
            </div>
            <hr className={`border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`} />
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} mb-1`}>Published</p>
              <p className="font-semibold">{blog.date}</p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} mb-1`}>Reading Time</p>
              <p className="font-semibold">{blog.readTime}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
