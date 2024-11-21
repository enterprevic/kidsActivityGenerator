import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Animated cursor effect that follows mouse movement
export const MagicCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
      transition={{ type: "spring", mass: 0.2, stiffness: 100 }}
    >
      <div className="w-full h-full rounded-full bg-white opacity-50 blur-sm" />
    </motion.div>
  );
};

// Animated background patterns
export const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10"
        initial={{ scale: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
        animate={{
          scale: [1, 2, 1],
          x: [null, Math.random() * window.innerWidth],
          y: [null, Math.random() * window.innerHeight],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50,
        }}
      />
    ))}
  </div>
);

// Interactive tooltip component
export const Tooltip = ({ children, text }) => (
  <motion.div className="group relative inline-block">
    {children}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileHover={{ opacity: 1, y: 0 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800" />
    </motion.div>
  </motion.div>
);

// Success message popup
export const SuccessPopup = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
  >
    <div className="flex items-center gap-2">
      <span>✨</span>
      {message}
      <button onClick={onClose} className="ml-4 hover:opacity-80">×</button>
    </div>
  </motion.div>
);

// Animated progress bar
export const ProgressBar = ({ progress, total }) => (
  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
    <motion.div
      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary"
      initial={{ width: 0 }}
      animate={{ width: `${(progress / total) * 100}%` }}
      transition={{ type: "spring", stiffness: 50 }}
    />
  </div>
);

// Interactive card flip component
export const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-full perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full backface-hidden">
          {frontContent}
        </div>
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

// Animated loading spinner
export const LoadingSpinner = () => (
  <motion.div
    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

// Particle effect system
export const ParticleEffect = ({ emoji }) => {
  const [particles, setParticles] = useState([]);

  const createParticle = (x, y) => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 2 + 1;
    const lifetime = Math.random() * 1000 + 1000;
    
    return {
      id: Math.random(),
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 2,
      lifetime,
      createdAt: Date.now(),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(particles => {
        const now = Date.now();
        return particles
          .filter(p => now - p.createdAt < p.lifetime)
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
          }));
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const addParticles = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 10 }, () =>
      createParticle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      )
    );
    setParticles(p => [...p, ...newParticles]);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={addParticles}
        className="text-2xl"
      >
        {emoji}
      </motion.button>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none text-xl"
          style={{
            x: particle.x,
            y: particle.y,
            opacity: 1 - (Date.now() - particle.createdAt) / particle.lifetime,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </>
  );
};
