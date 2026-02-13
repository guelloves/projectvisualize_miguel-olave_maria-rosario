import { motion } from 'framer-motion';
import { Quote, Rocket, Eye } from 'lucide-react';

const personas = [
  {
    id: 'hustler',
    name: 'Alex Rivera',
    role: 'CS Major & Startup Founder',
    persona: 'The Hustler',
    icon: Rocket,
    color: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1683796491683-9e7aad6a0a5e?w=300&h=300&fit=crop&crop=face',
    quote: 'Between my degree, my startup, and freelance work, my brain was running three operating systems. VISUALIZE gave me one dashboard for all of it. Zen Mode alone saved my sanity during finals week.',
    stat: 'Manages 3 projects simultaneously',
  },
  {
    id: 'visual-learner',
    name: 'Priya Sharma',
    role: 'Architecture Student',
    persona: 'The Visual Learner',
    icon: Eye,
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1638452033979-14fba9e17fbb?w=300&h=300&fit=crop&crop=face',
    quote: 'I can\'t learn from walls of text. I need to see connections, map relationships, draw it out. Visual Magnet literally organizes my thoughts the way my brain already works. It\'s like the tool was built for people like me.',
    stat: 'GPA improved from 3.2 to 3.8',
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
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
            Real Stories
          </span>
          <h2
            data-testid="testimonials-title"
            className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4"
          >
            Built for People Like You
          </h2>
          <p className="font-outfit text-base md:text-lg text-viz-textSecondary max-w-2xl mx-auto tracking-wide leading-relaxed">
            Meet the students who transformed how they work, study, and create.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {personas.map((persona, idx) => (
            <motion.div
              key={persona.id}
              data-testid={`testimonial-card-${persona.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="card-lift glass rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Glow background */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ backgroundColor: persona.color }}
              />

              {/* Persona badge */}
              <div className="flex items-center gap-2 mb-6">
                <persona.icon size={14} style={{ color: persona.color }} />
                <span
                  className="font-outfit text-xs tracking-widest uppercase font-medium"
                  style={{ color: persona.color }}
                >
                  {persona.persona}
                </span>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote
                  size={28}
                  className="absolute -top-1 -left-1 opacity-20"
                  style={{ color: persona.color }}
                />
                <p className="font-outfit text-base text-white/80 leading-relaxed tracking-wide pl-6">
                  "{persona.quote}"
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-viz-border/30">
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="w-12 h-12 rounded-full object-cover"
                  style={{ border: `2px solid ${persona.color}40` }}
                  loading="lazy"
                />
                <div>
                  <p className="font-outfit text-sm font-medium text-white">{persona.name}</p>
                  <p className="font-outfit text-xs text-viz-textSecondary">{persona.role}</p>
                </div>
              </div>

              {/* Stat badge */}
              <div
                className="mt-4 inline-block px-3 py-1.5 rounded-full font-outfit text-xs tracking-wide"
                style={{
                  backgroundColor: `${persona.color}10`,
                  color: persona.color,
                  border: `1px solid ${persona.color}20`,
                }}
              >
                {persona.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
