import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const CTAFooter = () => {
  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        data-testid="cta-section"
        className="py-24 md:py-32 relative"
      >
        <div className="section-divider mb-24" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* Glow orb */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 w-full h-full rounded-full blur-3xl bg-viz-violet/20 scale-150 animate-pulse-glow" />
              <div className="relative w-20 h-20 rounded-2xl bg-viz-violet/10 border border-viz-violet/30 flex items-center justify-center mx-auto">
                <span className="font-syne font-extrabold text-3xl text-viz-violetLight">V</span>
              </div>
            </div>

            <h2
              data-testid="cta-title"
              className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6 max-w-3xl mx-auto"
            >
              Ready to See Your Ideas{' '}
              <span className="text-glow-mint text-viz-mint">Clearly</span>?
            </h2>
            <p className="font-outfit text-base md:text-lg text-viz-textSecondary max-w-xl mx-auto tracking-wide leading-relaxed mb-10">
              Join the revolution. VISUALIZE transforms how you think, organize, and create on Miro's infinite canvas.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                data-testid="cta-primary-button"
                className="font-outfit font-medium text-sm px-8 py-4 rounded-full bg-viz-violet text-white hover:bg-viz-violetLight transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] flex items-center gap-2 cursor-pointer"
              >
                Start Visualizing
                <ArrowRight size={16} />
              </button>
              <button
                data-testid="cta-secondary-button"
                className="font-outfit font-medium text-sm px-8 py-4 rounded-full border border-viz-border text-viz-textSecondary hover:text-white hover:border-viz-violet/50 transition-all duration-300 cursor-pointer"
              >
                Watch the Demo
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-12 mt-16">
              {[
                { value: '3x', label: 'Faster Organization' },
                { value: '87%', label: 'Less Cognitive Load' },
                { value: '100K+', label: 'Students Onboarded' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="font-outfit text-xs text-viz-textSecondary tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        data-testid="footer"
        className="border-t border-viz-border/30 py-12"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-viz-violet flex items-center justify-center">
                <span className="font-syne font-extrabold text-white text-xs">V</span>
              </div>
              <span className="font-syne font-extrabold text-sm tracking-tight text-white">
                VISUALIZE
              </span>
              <span className="font-outfit text-xs text-viz-textSecondary ml-2">
                by Miro
              </span>
            </div>

            {/* Links */}
            <div className="flex justify-center gap-8">
              {['Features', 'Edu-Hub', 'About', 'Contact'].map((link) => (
                <button
                  key={link}
                  data-testid={`footer-link-${link.toLowerCase()}`}
                  className="font-outfit text-xs text-viz-textSecondary hover:text-white transition-colors tracking-wide cursor-pointer"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Social */}
            <div className="flex justify-end gap-4">
              {[
                { icon: Github, label: 'github' },
                { icon: Twitter, label: 'twitter' },
                { icon: Linkedin, label: 'linkedin' },
                { icon: Mail, label: 'email' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  data-testid={`footer-social-${label}`}
                  className="w-9 h-9 rounded-lg bg-viz-surface border border-viz-border/30 flex items-center justify-center text-viz-textSecondary hover:text-white hover:border-viz-violet/40 transition-all cursor-pointer"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-viz-border/20 text-center">
            <p className="font-outfit text-xs text-viz-textSecondary/50 tracking-wide">
              Project VISUALIZE — Redefining a Customer-centric Interface
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
