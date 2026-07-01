import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

const GithubActivity = ({ isDark }: { isDark: boolean }) => {
  // Custom theme perfectly matching the cyan/blue neon aesthetic
  const explicitTheme = {
    light: ['#e2e8f0', '#bae6fd', '#7dd3fc', '#38bdf8', '#0284c7'],
    dark: ['#1e293b', '#0c4a6e', '#0369a1', '#0284c7', '#38bdf8'],
  };

  return (
    <div className="mt-15 scroll-mt-15">
      <h3 className="text-[1.7rem] font-bold tracking-tight mb-8">github.</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`p-6 rounded-2xl backdrop-blur-md border border-white/10 ${isDark
          ? 'bg-white/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]'
          : 'bg-white/50 shadow-sm border-slate-200'
          } overflow-hidden flex justify-center w-full`}
      >
        <div
          className="w-full overflow-x-auto pb-2 hide-scrollbar-all"
          style={{ display: 'flex', direction: 'rtl' }}
        >
          <div style={{ direction: 'ltr', minWidth: 'max-content', margin: '0 auto' }}>
            <GitHubCalendar
              username="ShravNaik"
              theme={explicitTheme}
              colorScheme={isDark ? 'dark' : 'light'}
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              style={{
                color: isDark ? '#e2e8f0' : '#334155'
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GithubActivity;
