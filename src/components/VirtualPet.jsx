import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const petTypes = {
  dragon: {
    name: 'Dragon',
    emoji: '🐲',
    stages: ['🥚', '🐣', '🐲'],
    specialPower: 'Breathes sparkles',
  },
  unicorn: {
    name: 'Unicorn',
    emoji: '🦄',
    stages: ['🥚', '🐣', '🦄'],
    specialPower: 'Creates rainbows',
  },
  phoenix: {
    name: 'Phoenix',
    emoji: '🦅',
    stages: ['🥚', '🐣', '🦅'],
    specialPower: 'Glows with magic',
  },
};

const VirtualPet = ({ completedActivities, points }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [petStage, setPetStage] = useState(0);
  const [petHappiness, setPetHappiness] = useState(100);
  const [showPetAction, setShowPetAction] = useState(false);
  const [lastFed, setLastFed] = useState(Date.now());

  useEffect(() => {
    const savedPet = localStorage.getItem('virtualPet');
    if (savedPet) {
      const pet = JSON.parse(savedPet);
      setSelectedPet(pet.type);
      setPetStage(pet.stage);
      setPetHappiness(pet.happiness);
      setLastFed(pet.lastFed);
    }
  }, []);

  useEffect(() => {
    if (selectedPet) {
      const interval = setInterval(() => {
        setPetHappiness(prev => {
          const timeSinceLastFed = (Date.now() - lastFed) / (1000 * 60 * 60); // hours
          const newHappiness = Math.max(0, prev - (timeSinceLastFed * 0.5));
          
          // Save pet state
          localStorage.setItem('virtualPet', JSON.stringify({
            type: selectedPet,
            stage: petStage,
            happiness: newHappiness,
            lastFed: lastFed,
          }));
          
          return newHappiness;
        });
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [selectedPet, lastFed]);

  useEffect(() => {
    // Level up pet based on completed activities
    const newStage = Math.min(2, Math.floor(completedActivities.length / 5));
    setPetStage(newStage);
  }, [completedActivities]);

  const feedPet = () => {
    if (points >= 10) {
      setPetHappiness(prev => Math.min(100, prev + 20));
      setLastFed(Date.now());
      setShowPetAction(true);
      setTimeout(() => setShowPetAction(false), 2000);
      // Emit event to deduct points
      window.dispatchEvent(new CustomEvent('deductPoints', { detail: 10 }));
    }
  };

  const playWithPet = () => {
    if (points >= 5) {
      setPetHappiness(prev => Math.min(100, prev + 10));
      setShowPetAction(true);
      setTimeout(() => setShowPetAction(false), 2000);
      // Emit event to deduct points
      window.dispatchEvent(new CustomEvent('deductPoints', { detail: 5 }));
    }
  };

  if (!selectedPet) {
    return (
      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Choose Your Pet!</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(petTypes).map(([type, pet]) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl text-center"
              onClick={() => setSelectedPet(type)}
            >
              <div className="text-4xl mb-2">{pet.emoji}</div>
              <div className="font-semibold">{pet.name}</div>
              <div className="text-sm text-gray-600">{pet.specialPower}</div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const pet = petTypes[selectedPet];

  return (
    <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg">
      <div className="text-center">
        <motion.div
          className="text-6xl mb-4 inline-block"
          animate={showPetAction ? {
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          } : {}}
        >
          {pet.stages[petStage]}
        </motion.div>
        
        <AnimatePresence>
          {showPetAction && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-2xl absolute top-0 left-1/2 transform -translate-x-1/2"
            >
              {petStage === 2 ? '✨' : '💕'}
            </motion.div>
          )}
        </AnimatePresence>

        <h3 className="font-bold mb-2">
          {pet.name} - Level {petStage + 1}
        </h3>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Happiness</div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              animate={{ width: `${petHappiness}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-full disabled:opacity-50"
            onClick={feedPet}
            disabled={points < 10}
          >
            Feed (10 pts) 🍎
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-secondary text-white rounded-full disabled:opacity-50"
            onClick={playWithPet}
            disabled={points < 5}
          >
            Play (5 pts) 🎾
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VirtualPet;
