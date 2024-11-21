import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const badges = {
  explorer: {
    name: 'Explorer',
    icon: '🌟',
    description: 'Try 5 different activities',
    requirement: 5
  },
  artist: {
    name: 'Creative Artist',
    icon: '🎨',
    description: 'Complete 3 creative activities',
    requirement: 3
  },
  scientist: {
    name: 'Mini Scientist',
    icon: '🔬',
    description: 'Complete 3 educational activities',
    requirement: 3
  },
  athlete: {
    name: 'Active Star',
    icon: '⭐',
    description: 'Complete 3 high-energy activities',
    requirement: 3
  },
  naturalist: {
    name: 'Nature Explorer',
    icon: '🌿',
    description: 'Complete 3 outdoor activities',
    requirement: 3
  }
};

const Badge = ({ badge, progress, isUnlocked }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-4 rounded-xl ${
      isUnlocked 
        ? 'bg-gradient-to-r from-primary/20 to-secondary/20' 
        : 'bg-gray-100'
    }`}
  >
    <motion.div
      animate={isUnlocked ? {
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      } : {}}
      transition={{ duration: 0.5 }}
      className="text-4xl mb-2"
    >
      {badge.icon}
    </motion.div>
    <h3 className="font-semibold mb-1">{badge.name}</h3>
    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(progress / badge.requirement) * 100}%` }}
        className="bg-primary rounded-full h-2"
      />
    </div>
    <p className="text-xs text-gray-500 mt-1">
      {progress}/{badge.requirement} completed
    </p>
  </motion.div>
);

const RewardSystem = ({ completedActivities }) => {
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const [progress, setProgress] = useState({
    explorer: 0,
    artist: 0,
    scientist: 0,
    athlete: 0,
    naturalist: 0
  });

  useEffect(() => {
    const newProgress = {
      explorer: new Set(completedActivities).size,
      artist: completedActivities.filter(a => a.category === 'Creative').length,
      scientist: completedActivities.filter(a => a.category === 'Educational').length,
      athlete: completedActivities.filter(a => a.energyLevel === 'high').length,
      naturalist: completedActivities.filter(a => !a.indoor).length
    };

    // Check for newly unlocked badges
    Object.entries(badges).forEach(([key, badge]) => {
      if (newProgress[key] >= badge.requirement && progress[key] < badge.requirement) {
        setNewBadge(badge);
        setShowBadgePopup(true);
      }
    });

    setProgress(newProgress);
  }, [completedActivities]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your Achievements 🏆
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(badges).map(([key, badge]) => (
          <Badge
            key={key}
            badge={badge}
            progress={progress[key]}
            isUnlocked={progress[key] >= badge.requirement}
          />
        ))}
      </div>

      <AnimatePresence>
        {showBadgePopup && newBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setShowBadgePopup(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 1 }}
                className="text-6xl mb-4"
              >
                {newBadge.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">
                New Badge Unlocked!
              </h3>
              <p className="text-xl font-semibold mb-2">{newBadge.name}</p>
              <p className="text-gray-600">{newBadge.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-full"
                onClick={() => setShowBadgePopup(false)}
              >
                Awesome! 🎉
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewardSystem;
