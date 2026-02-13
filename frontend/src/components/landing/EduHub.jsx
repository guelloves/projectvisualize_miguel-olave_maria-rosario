import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Scale, Palette } from 'lucide-react';

const categories = [
  {
    id: 'medical',
    label: 'Medical Students',
    icon: Stethoscope,
    color: '#F87171',
    image: 'https://images.unsplash.com/photo-1680449786212-de3b835dc467?w=600&h=400&fit=crop',
    title: 'Map the Nervous System',
    description: 'Visual learners in med school use VISUALIZE to create interactive anatomy maps. Drag, connect, and annotate — making complex systems feel intuitive.',
    features: ['Interactive anatomy diagrams', 'Color-coded system maps', 'Study group collaboration'],
  },
  {
    id: 'law',
    label: 'Law Students',
    icon: Scale,
    color: '#60A5FA',
    image: 'https://images.unsplash.com/photo-1669348849154-25e23e2ccf05?w=600&h=400&fit=crop',
    title: 'Connect Case Files',
    description: 'From precedent mapping to argument flowcharts, law students build visual case webs that reveal connections plain text can\'t show.',
    features: ['Case precedent linking', 'Argument flow diagrams', 'Evidence organization boards'],
  },
  {
    id: 'art',
    label: 'Art Students',
    icon: Palette,
    color: '#FFD02F',
    image: 'https://images.unsplash.com/photo-1725288342265-1b83d958e584?w=600&h=400&fit=crop',
    title: 'Build Mood Boards',
    description: 'Curate inspiration, map color palettes, and iterate on concepts — all on one infinite canvas that moves as fast as your creativity.',
    features: ['Infinite mood boards', 'Color palette extraction', 'Portfolio presentation mode'],
  },
];

export const EduHub = () => {
  const [activeTab, setActiveTab] = useState('medical');
  const active = categories.find((c) => c.id === activeTab);

  return (
    <section
      id="edu-hub"
      data-testid="edu-hub-section"
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
          <span className="font-outfit text-sm tracking-widest uppercase text-viz-textSecondary mb-4 block">
            Built for Students
          </span>
          <h2
            data-testid="edu-hub-title"
            className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4"
          >
            The Edu-Hub
          </h2>
          <p className="font-outfit text-base md:text-lg text-viz-textSecondary max-w-2xl mx-auto tracking-wide leading-relaxed">
            Whether you're dissecting anatomy, arguing cases, or curating inspiration — VISUALIZE adapts to your discipline.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-testid={`edu-tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-outfit text-sm font-medium tracking-wide transition-all duration-400 cursor-pointer ${
                activeTab === cat.id
                  ? 'text-white'
                  : 'text-viz-textSecondary border border-viz-border hover:border-viz-border/80'
              }`}
              style={
                activeTab === cat.id
                  ? { backgroundColor: `${cat.color}20`, borderColor: `${cat.color}40`, border: '1px solid' }
                  : {}
              }
            >
              <cat.icon
                size={16}
                style={{ color: activeTab === cat.id ? cat.color : undefined }}
              />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                data-testid={`edu-image-${activeTab}`}
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 40%, ${active.color}30 100%)`,
                }}
              />
              <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2">
                <span className="font-outfit text-xs tracking-wide" style={{ color: active.color }}>
                  {active.label}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center py-4">
              <h3
                data-testid={`edu-title-${activeTab}`}
                className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight text-white mb-4"
              >
                {active.title}
              </h3>
              <p className="font-outfit text-base text-viz-textSecondary tracking-wide leading-relaxed mb-8">
                {active.description}
              </p>
              <div className="space-y-3">
                {active.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: active.color }}
                    />
                    <span className="font-outfit text-sm text-white/80 tracking-wide">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
