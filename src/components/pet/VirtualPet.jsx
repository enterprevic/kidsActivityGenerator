import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const petEmojis = {
  default: '🐱',
  wizard: '🧙‍♂️',
  superhero: '🦸‍♂️'
};

const costumes = {
  'pet_costume_wizard': {
    emoji: petEmojis.wizard,
    effects: {
      idle: [
        { scale: 1, y: 0 },
        { scale: 1.1, y: -5 },
        { scale: 1, y: 0 }
      ],
      click: [
        { rotate: 0 },
        { rotate: 360 }
      ]
    }
  },
  'pet_costume_superhero': {
    emoji: petEmojis.superhero,
    effects: {
      idle: [
        { scale: 1, x: 0 },
        { scale: 1.1, x: 10 },
        { scale: 1.1, x: -10 },
        { scale: 1, x: 0 }
      ],
      click: [
        { y: 0 },
        { y: -50 },
        { y: 0 }
      ]
    }
  }
};

const VirtualPet = () => {
  const [costume, setCostume] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedCostume = localStorage.getItem('activeCostume');
    if (savedCostume) {
      setCostume(savedCostume);
    }

    const handleCostumeChange = () => {
      const newCostume = localStorage.getItem('activeCostume');
      setCostume(newCostume);
    };

    window.addEventListener('storage', handleCostumeChange);
    return () => window.removeEventListener('storage', handleCostumeChange);
  }, []);

  const currentCostume = costume ? costumes[costume] : null;
  const currentEmoji = currentCostume ? currentCostume.emoji : petEmojis.default;

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Add encouraging message
    const messages = [
      "You're doing great! 🌟",
      "Keep it up! 💪",
      "Amazing work! 🎉",
      "You're awesome! ⭐",
      "Way to go! 🏆"
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    setMessages(prev => [...prev, { id: Date.now(), text: message }]);
    
    // Remove old messages
    setTimeout(() => {
      setMessages(prev => prev.slice(1));
    }, 2000);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating messages */}
      <AnimatePresence>
        {messages.map(message => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
          >
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
              {message.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Pet */}
      <motion.div
        className="text-4xl cursor-pointer select-none"
        animate={isAnimating ? currentCostume?.effects.click : currentCostume?.effects.idle}
        transition={{ 
          duration: isAnimating ? 0.5 : 2,
          repeat: isAnimating ? 0 : Infinity,
          ease: "easeInOut"
        }}
        onAnimationComplete={handleAnimationComplete}
        onClick={handleClick}
        drag
        dragConstraints={{
          top: -100,
          right: 100,
          bottom: 100,
          left: -100
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {currentEmoji}
      </motion.div>
    </div>
  );
};

export default VirtualPet;
