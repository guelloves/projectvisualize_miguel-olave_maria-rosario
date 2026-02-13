import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, StickyNote, LayoutGrid, Table2, Link2, FileText, Brain, Lightbulb } from 'lucide-react';

const ideationTools = [
  { icon: StickyNote, label: 'Sticky Notes', color: '#FFD02F' },
  { icon: Pencil, label: 'Freehand Pen', color: '#F87171' },
  { icon: Brain, label: 'Mind Map', color: '#A78BFA' },
  { icon: Lightbulb, label: 'Brainstorm', color: '#34D399' },
];

const executionTools = [
  { icon: LayoutGrid, label: 'Kanban Board', color: '#60A5FA' },
  { icon: Table2, label: 'Data Tables', color: '#10B981' },
  { icon: Link2, label: 'Jira Sync', color: '#818CF8' },
  { icon: FileText, label: 'Sprint Docs', color: '#FB923C' },
];

const ideationNotes = [
  { text: 'What if we add a chatbot?', x: 10, y: 15, color: '#FFD02F', rotation: -3 },
  { text: 'Research competitor UX', x: 55, y: 10, color: '#F87171', rotation: 5 },
  { text: 'User pain points', x: 25, y: 55, color: '#A78BFA', rotation: -8 },
  { text: 'Sketch mobile layout', x: 60, y: 50, color: '#34D399', rotation: 2 },
];

const executionCards = [
  { title: 'To Do', items: ['Finalize API', 'Write tests'], color: '#60A5FA' },
  { title: 'In Progress', items: ['Auth flow', 'Dashboard UI'], color: '#FFD02F' },
  { title: 'Done', items: ['DB schema', 'Onboarding'], color: '#10B981' },
];

export const ZenModeDemo = () => {
  const [mode, setMode] = useState('ideation');

  return (
    <section
      id="zen-mode"
      data-testid="zen-mode-section"
      className="py-24 md:py-32 relative"
    >
      {/* Divider */}
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-outfit text-sm tracking-widest uppercase text-viz-violet mb-4 block">
            Pillar I
          </span>
          <h2
            data-testid="zen-mode-title"
            className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4"
          >
            Zen Mode
          </h2>
          <p className="font-outfit text-base md:text-lg text-viz-textSecondary max-w-2xl mx-auto tracking-wide leading-relaxed">
            One toggle. Two worlds. Slide left to brainstorm freely. Slide right to execute with precision.
            Your canvas adapts to your headspace.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div
            data-testid="zen-mode-trigger"
            className="glass rounded-full p-1.5 flex items-center gap-0 relative"
            style={{ width: '280px' }}
          >
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-viz-violet/80"
              style={{ width: 'calc(50% - 6px)' }}
              animate={{ left: mode === 'ideation' ? '6px' : 'calc(50%)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              data-testid="zen-toggle-ideation"
              onClick={() => setMode('ideation')}
              className={`relative z-10 flex-1 py-2.5 rounded-full font-outfit text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                mode === 'ideation' ? 'text-white' : 'text-viz-textSecondary'
              }`}
            >
              Ideation
            </button>
            <button
              data-testid="zen-toggle-execution"
              onClick={() => setMode('execution')}
              className={`relative z-10 flex-1 py-2.5 rounded-full font-outfit text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
                mode === 'execution' ? 'text-white' : 'text-viz-textSecondary'
              }`}
            >
              Execution
            </button>
          </div>
        </div>

        {/* Demo area */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-6 max-w-5xl mx-auto">
          {/* Sidebar tools */}
          <motion.div
            className="glass rounded-xl p-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible"
            layout
          >
            <AnimatePresence mode="wait">
              {(mode === 'ideation' ? ideationTools : executionTools).map((tool, i) => (
                <motion.div
                  key={tool.label}
                  data-testid={`zen-tool-${tool.label.toLowerCase().replace(/\s/g, '-')}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer min-w-max"
                >
                  <tool.icon size={18} style={{ color: tool.color }} />
                  <span className="font-outfit text-sm text-viz-textSecondary">{tool.label}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Canvas area */}
          <div
            data-testid="zen-canvas"
            className="glass rounded-xl p-6 min-h-[360px] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {mode === 'ideation' ? (
                <motion.div
                  key="ideation-canvas"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full min-h-[320px]"
                >
                  {ideationNotes.map((note, i) => (
                    <motion.div
                      key={note.text}
                      initial={{ opacity: 0, scale: 0.5, rotate: note.rotation * 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
                      transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
                      className="absolute px-4 py-3 rounded-md shadow-lg font-outfit text-xs text-[#1a1a1a] font-medium select-none"
                      style={{
                        left: `${note.x}%`,
                        top: `${note.y}%`,
                        backgroundColor: note.color,
                        transform: `rotate(${note.rotation}deg)`,
                        maxWidth: '160px',
                      }}
                    >
                      {note.text}
                    </motion.div>
                  ))}
                  {/* Freehand sketch lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
                    <motion.path
                      d="M 80 200 Q 150 120 240 180 Q 330 240 400 160"
                      stroke="#A78BFA"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="execution-canvas"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-3 gap-4 h-full min-h-[320px]"
                >
                  {executionCards.map((col, i) => (
                    <motion.div
                      key={col.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="bg-white/[0.03] rounded-lg p-4 border border-viz-border/30"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: col.color }}
                        />
                        <span className="font-outfit text-sm font-medium text-white">
                          {col.title}
                        </span>
                      </div>
                      {col.items.map((item, j) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 + j * 0.1 + 0.3 }}
                          className="bg-white/[0.04] rounded-md px-3 py-2 mb-2 font-outfit text-xs text-viz-textSecondary"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
