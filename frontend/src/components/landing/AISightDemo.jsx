import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, X } from 'lucide-react';

const boardItems = [
  { id: 1, text: 'Anatomy of the Heart', tags: ['anatomy', 'heart', 'medical', 'exam'], x: 5, y: 8, color: '#F87171' },
  { id: 2, text: 'Tort Law Precedents', tags: ['law', 'tort', 'legal', 'precedent'], x: 55, y: 5, color: '#60A5FA' },
  { id: 3, text: 'Cubism Influences', tags: ['art', 'cubism', 'picasso', 'design'], x: 30, y: 40, color: '#FFD02F' },
  { id: 4, text: 'Exam Notes - Biology', tags: ['exam', 'biology', 'notes', 'medical'], x: 70, y: 35, color: '#F87171' },
  { id: 5, text: 'Contract Law Review', tags: ['law', 'contract', 'legal', 'review'], x: 8, y: 60, color: '#60A5FA' },
  { id: 6, text: 'Color Theory Workshop', tags: ['art', 'color', 'design', 'workshop'], x: 48, y: 65, color: '#FFD02F' },
  { id: 7, text: 'Nervous System Map', tags: ['anatomy', 'nervous', 'medical', 'exam'], x: 75, y: 62, color: '#F87171' },
  { id: 8, text: 'Mood Board - Summer', tags: ['art', 'mood', 'design', 'summer'], x: 25, y: 18, color: '#FFD02F' },
  { id: 9, text: 'Case Study: Miranda', tags: ['law', 'case', 'legal', 'miranda'], x: 62, y: 80, color: '#60A5FA' },
];

const cannedQueries = [
  { query: 'Show me the Exam notes', matchTags: ['exam'] },
  { query: 'Find all law content', matchTags: ['law', 'legal'] },
  { query: 'art and design items', matchTags: ['art', 'design'] },
  { query: 'medical anatomy', matchTags: ['medical', 'anatomy'] },
];

const suggestions = [
  'Show me the Exam notes',
  'Find all law content',
  'art and design items',
  'medical anatomy',
];

export const AISightDemo = () => {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [matchedIds, setMatchedIds] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  const processQuery = (q) => {
    const lower = q.toLowerCase();
    const matched = cannedQueries.find((cq) =>
      cq.query.toLowerCase().includes(lower) || lower.includes(cq.query.toLowerCase().split(' ').slice(0, 2).join(' '))
    );

    if (matched) {
      const ids = boardItems
        .filter((item) => item.tags.some((tag) => matched.matchTags.includes(tag)))
        .map((item) => item.id);
      setMatchedIds(ids);
    } else {
      // Fuzzy: match any tag containing any word in query
      const words = lower.split(/\s+/).filter(w => w.length > 2);
      const ids = boardItems
        .filter((item) =>
          item.tags.some((tag) => words.some((word) => tag.includes(word) || word.includes(tag)))
        )
        .map((item) => item.id);
      setMatchedIds(ids);
    }
    setActiveQuery(q);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      processQuery(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    processQuery(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setActiveQuery('');
    setMatchedIds([]);
  };

  useEffect(() => {
    if (query.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 300);
      return () => clearTimeout(timer);
    }
    setIsTyping(false);
  }, [query]);

  const isActive = matchedIds.length > 0;

  return (
    <section
      id="ai-sight"
      data-testid="ai-sight-section"
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
          <span className="font-outfit text-sm tracking-widest uppercase text-viz-yellow mb-4 block">
            Pillar III
          </span>
          <h2
            data-testid="ai-sight-title"
            className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4"
          >
            AI Sight
          </h2>
          <p className="font-outfit text-base md:text-lg text-viz-textSecondary max-w-2xl mx-auto tracking-wide leading-relaxed">
            Don't just search for text. Lens your board. Ask in natural language and watch
            AI Sight dim the noise and illuminate what matters.
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <form onSubmit={handleSearch}>
            <div
              data-testid="ai-sight-search-container"
              className={`glass rounded-xl flex items-center gap-3 px-5 py-3 transition-all duration-500 ${
                isActive ? 'glow-violet border-viz-violet/40' : 'border-viz-border/30'
              }`}
              style={{ borderWidth: '1px' }}
            >
              <Search size={18} className="text-viz-textSecondary flex-shrink-0" />
              <input
                ref={inputRef}
                data-testid="ai-sight-input"
                type="text"
                placeholder='Try: "Show me the Exam notes"'
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="flex-1 bg-transparent font-outfit text-sm text-white placeholder:text-viz-textSecondary/60 outline-none tracking-wide"
              />
              {query && (
                <button
                  data-testid="ai-sight-clear"
                  type="button"
                  onClick={clearSearch}
                  className="text-viz-textSecondary hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
              <button
                data-testid="ai-sight-submit"
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-viz-violet/20 text-viz-violetLight hover:bg-viz-violet/30 transition-colors font-outfit text-xs font-medium cursor-pointer"
              >
                <Zap size={12} />
                Lens
              </button>
            </div>
          </form>

          {/* Suggestions dropdown */}
          <AnimatePresence>
            {showSuggestions && !activeQuery && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-full mt-2 left-0 right-0 glass rounded-xl p-2 z-20"
              >
                <p className="px-3 py-1 font-outfit text-xs text-viz-textSecondary/60 tracking-wider uppercase">
                  Try these queries
                </p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    data-testid={`ai-sight-suggestion-${s.toLowerCase().replace(/\s/g, '-')}`}
                    onClick={() => handleSuggestionClick(s)}
                    className="w-full text-left px-3 py-2 rounded-lg font-outfit text-sm text-viz-textSecondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Board visualization */}
        <div
          data-testid="ai-sight-board"
          className="max-w-4xl mx-auto glass rounded-2xl p-6 relative overflow-hidden"
          style={{ minHeight: '420px' }}
        >
          {/* Active query indicator */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 glass rounded-lg px-3 py-1.5"
              >
                <Zap size={12} className="text-viz-violet" />
                <span className="font-outfit text-xs text-viz-violetLight tracking-wide">
                  {matchedIds.length} items matched
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Board items */}
          <div className="relative w-full" style={{ height: '380px' }}>
            {boardItems.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const shouldDim = isActive && !isMatched;

              return (
                <motion.div
                  key={item.id}
                  data-testid={`ai-sight-item-${item.id}`}
                  className={`absolute rounded-lg p-4 border transition-all duration-600 ${
                    shouldDim ? 'dimmed' : isMatched ? 'illuminated' : ''
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    width: '30%',
                    backgroundColor: shouldDim
                      ? 'rgba(255,255,255,0.01)'
                      : isMatched
                      ? `${item.color}15`
                      : 'rgba(255,255,255,0.03)',
                    borderColor: shouldDim
                      ? 'rgba(255,255,255,0.02)'
                      : isMatched
                      ? `${item.color}50`
                      : 'rgba(255,255,255,0.06)',
                  }}
                  animate={{
                    scale: isMatched ? 1.05 : shouldDim ? 0.95 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-2 transition-opacity duration-600"
                    style={{
                      backgroundColor: item.color,
                      opacity: shouldDim ? 0.1 : 1,
                    }}
                  />
                  <p
                    className="font-outfit text-sm transition-colors duration-600"
                    style={{
                      color: shouldDim ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center font-outfit text-xs text-viz-textSecondary/50 mt-6 tracking-wide">
          Powered by Visual Semantic logic — isolating data points based on user intent
        </p>
      </div>
    </section>
  );
};
