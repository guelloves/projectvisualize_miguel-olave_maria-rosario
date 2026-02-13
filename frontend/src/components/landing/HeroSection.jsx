import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const chaosItems = [
  { id: 1, text: 'Sprint Review', color: '#FFD02F', rotation: -12, x: 5, y: 8 },
  { id: 2, text: 'User Research', color: '#F87171', rotation: 8, x: 55, y: 5 },
  { id: 3, text: 'Design System', color: '#60A5FA', rotation: -5, x: 30, y: 45 },
  { id: 4, text: 'Bug Fixes', color: '#FB923C', rotation: 15, x: 70, y: 35 },
  { id: 5, text: 'Roadmap Q3', color: '#A78BFA', rotation: -20, x: 15, y: 65 },
  { id: 6, text: 'Competitor Analysis', color: '#34D399', rotation: 10, x: 60, y: 60 },
  { id: 7, text: 'Stakeholder Sync', color: '#FFD02F', rotation: -8, x: 40, y: 20 },
  { id: 8, text: 'Wireframes v3', color: '#F472B6', rotation: 12, x: 80, y: 15 },
  { id: 9, text: 'KPI Tracking', color: '#818CF8', rotation: -15, x: 10, y: 40 },
];

const organizedPositions = [
  { x: 5, y: 5, rotation: 0 },
  { x: 35, y: 5, rotation: 0 },
  { x: 65, y: 5, rotation: 0 },
  { x: 5, y: 35, rotation: 0 },
  { x: 35, y: 35, rotation: 0 },
  { x: 65, y: 35, rotation: 0 },
  { x: 5, y: 65, rotation: 0 },
  { x: 35, y: 65, rotation: 0 },
  { x: 65, y: 65, rotation: 0 },
];

export const HeroSection = () => {
  const [clarity, setClarity] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleSlider = (e) => {
    setClarity(Number(e.target.value));
  };

  const lerp = (a, b, t) => a + (b - a) * t;
  const t = clarity / 100;

  return (
    <section
      data-testid="hero-section"
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124, 58, 237, ${0.08 + t * 0.07}), transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-viz-mint animate-pulse" />
              <span className="font-outfit text-sm tracking-widest text-viz-mint uppercase">
                Project VISUALIZE
              </span>
            </div>

            <h1
              data-testid="hero-title"
              className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6"
            >
              From{' '}
              <span className="text-viz-textSecondary line-through decoration-viz-textSecondary/40">
                Chaos
              </span>{' '}
              to{' '}
              <span className="text-glow-violet text-viz-violetLight">Clarity</span>
            </h1>

            <p
              data-testid="hero-subtitle"
              className="font-outfit text-base md:text-lg text-viz-textSecondary tracking-wide leading-relaxed max-w-lg mb-8"
            >
              Miro's infinite canvas reimagined. We stripped away the clutter, surfaced what matters,
              and built an interface that thinks with you — not against you.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                data-testid="hero-cta-primary"
                onClick={() => {
                  const el = document.querySelector('#zen-mode');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-outfit font-medium text-sm px-7 py-3.5 rounded-full bg-viz-violet text-white hover:bg-viz-violetLight transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center gap-2 cursor-pointer"
              >
                Explore the Revolution
                <ArrowRight size={16} />
              </button>
              <button
                data-testid="hero-cta-secondary"
                onClick={() => {
                  const el = document.querySelector('#ai-sight');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-outfit font-medium text-sm px-7 py-3.5 rounded-full border border-viz-border text-viz-textSecondary hover:text-white hover:border-viz-violet/50 transition-all duration-300 cursor-pointer"
              >
                See AI Sight
              </button>
            </div>

            {/* Slider */}
            <div data-testid="chaos-slider-container" className="max-w-md">
              <div className="flex justify-between mb-3">
                <span className="font-outfit text-xs tracking-widest uppercase text-viz-textSecondary">
                  Chaos
                </span>
                <span className="font-outfit text-xs tracking-widest uppercase text-viz-mint">
                  Clarity
                </span>
              </div>
              <input
                data-testid="chaos-to-clarity-slider"
                type="range"
                min="0"
                max="100"
                value={clarity}
                onChange={handleSlider}
                className="chaos-slider w-full"
              />
              <p className="font-outfit text-xs text-viz-textSecondary mt-2 tracking-wide">
                Drag to transform the workspace
              </p>
            </div>
          </motion.div>

          {/* Right: Interactive Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div
              data-testid="hero-canvas"
              className="relative w-full aspect-square max-w-md mx-auto rounded-2xl border border-viz-border/50 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #0a0a0a, #121212)`,
              }}
            >
              {/* Grid lines that appear with clarity */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: t * 0.3 }}
              >
                {[1, 2].map((i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-px bg-viz-border/30"
                    style={{ left: `${i * 33.33}%` }}
                  />
                ))}
                {[1, 2].map((i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-px bg-viz-border/30"
                    style={{ top: `${i * 33.33}%` }}
                  />
                ))}
              </div>

              {/* Sticky notes */}
              {chaosItems.map((item, idx) => {
                const org = organizedPositions[idx];
                const currentX = lerp(item.x, org.x, t);
                const currentY = lerp(item.y, org.y, t);
                const currentRot = lerp(item.rotation, org.rotation, t);
                const bgOpacity = lerp(0.7, 1, t);

                return (
                  <motion.div
                    key={item.id}
                    data-testid={`hero-sticky-note-${item.id}`}
                    className="sticky-note select-none"
                    style={{
                      left: `${currentX}%`,
                      top: `${currentY}%`,
                      transform: `rotate(${currentRot}deg)`,
                      backgroundColor: item.color,
                      opacity: bgOpacity,
                      color: '#1a1a1a',
                      width: '28%',
                      minHeight: '24%',
                      fontSize: '11px',
                      fontWeight: 500,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: t > 0.5 ? '8px' : '3px',
                      zIndex: idx,
                    }}
                  >
                    {item.text}
                  </motion.div>
                );
              })}

              {/* Clarity label overlay */}
              {t > 0.7 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-viz-mint" />
                  <span className="font-outfit text-xs text-viz-mint tracking-wide">Organized</span>
                </motion.div>
              )}
            </div>

            {/* Decorative orb */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
              style={{ background: 'rgba(124, 58, 237, 0.15)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
