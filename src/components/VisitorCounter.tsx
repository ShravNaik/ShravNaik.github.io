import React, { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter({ isDark }: { isDark: boolean }) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent double fetching/incrementing in React StrictMode
    if (hasFetched.current) return;
    hasFetched.current = true;

    // Fetch visit count using CountAPI
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('https://countapi.mileshilliard.com/api/v1/hit/shravnaik_portfolio_visits');
        const data = await response.json();
        setCount(Number(data.value));
      } catch (error) {
        console.error('Error fetching visitor count from CountAPI:', error);
        // Fallback count in case CountAPI is blocked by adblockers or offline
        setCount(1337);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div className={`group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
      isDark 
        ? 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10' 
        : 'bg-white/80 border-slate-200 text-slate-700 hover:border-blue-500/50 hover:shadow-blue-500/10'
    }`}>
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r transition-opacity duration-300 opacity-0 group-hover:opacity-10 pointer-events-none ${
        isDark ? 'from-cyan-500 to-blue-500' : 'from-blue-600 to-indigo-600'
      }`} />
      <Eye className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
        isDark ? 'text-cyan-400' : 'text-blue-600'
      }`} />
      <div className="flex items-center gap-1.5 font-medium text-xs tracking-wide">
        <span className="uppercase opacity-80 font-semibold tracking-wider">Site Visits:</span>
        <span className={`font-bold transition-all duration-300 ${
          isDark ? 'text-cyan-300 group-hover:text-cyan-200' : 'text-blue-600 group-hover:text-blue-700'
        }`}>
          {loading ? (
            <span className="inline-block w-8 h-3 bg-current/20 animate-pulse rounded-sm align-middle" />
          ) : (
            count?.toLocaleString()
          )}
        </span>
      </div>
    </div>
  );
}
