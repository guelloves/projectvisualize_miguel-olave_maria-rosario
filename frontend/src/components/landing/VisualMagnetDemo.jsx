import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnet, LayoutGrid, Shuffle } from 'lucide-react';

const magnetCards = [
  { id: 1, text: 'User Interview Notes', tag: 'Research', color: '#7C3AED' },
  { id: 2, text: 'Competitor Pricing', tag: 'Research', color: '#7C3AED' },
  { id: 3, text: 'Sprint Velocity Chart', tag: 'Metrics', color: '#10B981' },
  { id: 4, text: 'Homepage Wireframe', tag: 'Design', color: '#FFD02F' },
  { id: 5, text: 'NPS Survey Results', tag: 'Research', color: '#7C3AED' },
  { id: 6, text: 'Conversion Funnel', tag: 'Metrics', color: '#10B981' },
  { id: 7, text: 'Brand Guidelines', tag: 'Design', color: '#FFD02F' },
  { id: 8, text: 'A/B Test Results', tag: 'Metrics', color: '#10B981' },
  { id: 9, text: 'App Icon Concepts', tag: 'Design', color: '#FFD02F' },
];

const scatteredPositions = [
  { x: 8, y: 5, rot: -12 },
  { x: 60, y: 2, rot: 8 },
  { x: 35, y: 10, rot: -5 },
  { x: 75, y: 40, rot: 15 },
  { x: 5, y: 55, rot: -8 },
  { x: 45, y: 50, rot: 10 },
  { x: 20, y: 35, rot: -18 },
  { x: 68, y: 65, rot: 6 },
  { x: 50, y: 75, rot: -10 },
];

const groupedByTag = {
  Research: [0, 1, 4],
  Metrics: [2, 5, 7],
  Design: [3, 6, 8],
};

const organizedPositions = (() => {
  const positions = new Array(9);
  const tags = Object.keys(groupedByTag);
  tags.forEach((tag, colIdx) => {
    groupedByTag[tag].forEach((cardIdx, rowIdx) => {
      positions[cardIdx] = {
        x: 3 + colIdx * 33,
        y: 5 + rowIdx * 32,
        rot: 0,
      };
    });
  });
  return positions;
})();

export const VisualMagnetDemo = () => {
  const [organized, setOrganized] = useState(false);

  const positions = organized ? organizedPositions : scatteredPositions;

  return (
    <section
      id="visual-magnet"
      data-testid="visual-magnet-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-outfit text-sm tracking-widest uppercase text-viz-mint mb-4 block">
            Pillar II
          </span>
          <h2
            data-testid="visual-magnet-title"
            className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4"
          >
            Visual Magnet
          </h2>
          <p className="font-outfit text-base md:text-lg text-viz-textSecondary max-w-2xl mx-auto tracking-wide leading-relaxed">
            Related items attract each other. Scattered sticky notes auto-cluster into frames and mind maps.
            Your canvas organizes itself.
          </p>
        </motion.div>

        {/* Control */}
        <div className="flex justify-center mb-10">
          <button
            data-testid="magnet-toggle"
            onClick={() => setOrganized(!organized)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-outfit text-sm font-medium tracking-wide transition-all duration-500 cursor-pointer ${
              organized
                ? 'bg-viz-mint/10 text-viz-mint border border-viz-mint/30 hover:bg-viz-mint/20'
                : 'bg-viz-surface text-viz-textSecondary border border-viz-border hover:border-viz-violet/50 hover:text-white'
            }`}
          >
            {organized ? (
              <>
                <Shuffle size={16} />
                Scatter Cards
              </>
            ) : (
              <>
                <Magnet size={16} />
                Activate Magnet
              </>
            )}
          </button>
        </div>

        {/* Canvas */}
        <div
          data-testid="magnet-canvas"
          className="max-w-4xl mx-auto glass rounded-2xl p-6 relative overflow-hidden"
          style={{ minHeight: '460px' }}
        >
          {/* Column headers when organized */}
          <AnimatePresence>
            {organized && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-3 left-0 right-0 flex px-6"
              >
                {Object.keys(groupedByTag).map((tag, i) => (
                  <div
                    key={tag}
                    className="flex-1 flex items-center gap-2"
                    style={{ paddingLeft: `${i * 2}px` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          tag === 'Research' ? '#7C3AED' : tag === 'Metrics' ? '#10B981' : '#FFD02F',
                      }}
                    />
                    <span className="font-outfit text-xs tracking-widest uppercase text-viz-textSecondary">
                      {tag}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cards */}
          <div className="relative w-full" style={{ height: '400px', marginTop: organized ? '24px' : '0' }}>
            {magnetCards.map((card, idx) => {
              const pos = positions[idx];
              return (
                <motion.div
                  key={card.id}
                  data-testid={`magnet-card-${card.id}`}
                  layout
                  animate={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    rotate: pos.rot,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                  className="absolute w-[28%] cursor-default"
                >
                  <div
                    className="rounded-lg p-4 border transition-all duration-500"
                    style={{
                      backgroundColor: organized ? `${card.color}10` : 'rgba(255,255,255,0.03)',
                      borderColor: organized ? `${card.color}40` : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: card.color }}
                      />
                      <span
                        className="font-outfit text-[10px] tracking-widest uppercase"
                        style={{ color: card.color }}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <p className="font-outfit text-sm text-white/80">{card.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Suggestion badge */}
          <AnimatePresence>
            {organized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 right-4 glass rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <LayoutGrid size={14} className="text-viz-mint" />
                <span className="font-outfit text-xs text-viz-mint tracking-wide">
                  3 frames auto-generated
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
