import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const challengeTypes = {
  daily: {
    title: 'Daily Challenges',
    emoji: '📅',
    duration: 24 * 60 * 60 * 1000, // 24 hours
    rewards: 50,
  },
  weekly: {
    title: 'Weekly Quests',
    emoji: '🎯',
    duration: 7 * 24 * 60 * 60 * 1000, // 7 days
    rewards: 200,
  },
  special: {
    title: 'Special Events',
    emoji: '🌟',
    duration: 3 * 24 * 60 * 60 * 1000, // 3 days
    rewards: 100,
  },
};

const challenges = [
  {
    id: 'creative_streak',
    type: 'daily',
    title: 'Creative Streak',
    description: 'Complete 3 creative activities',
    requirement: 3,
    category: 'Creative',
  },
  {
    id: 'outdoor_explorer',
    type: 'daily',
    title: 'Outdoor Explorer',
    description: 'Complete 2 outdoor activities',
    requirement: 2,
    category: 'Outdoor',
  },
  {
    id: 'brain_boost',
    type: 'weekly',
    title: 'Brain Boost',
    description: 'Complete 5 educational activities',
    requirement: 5,
    category: 'Educational',
  },
  {
    id: 'activity_master',
    type: 'weekly',
    title: 'Activity Master',
    description: 'Complete 10 activities of any type',
    requirement: 10,
    category: 'any',
  },
  {
    id: 'weekend_special',
    type: 'special',
    title: 'Weekend Special',
    description: 'Complete 4 activities in one day',
    requirement: 4,
    category: 'any',
  },
];

const ChallengeCard = ({ challenge, progress, onClaim, claimed }) => {
  const type = challengeTypes[challenge.type];
  const isComplete = progress >= challenge.requirement;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur p-4 rounded-xl shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{type.emoji}</span>
            <h3 className="font-semibold">{challenge.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
        </div>
        <div className="text-sm font-semibold text-primary">
          +{type.rewards} pts
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(progress / challenge.requirement) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>{progress}/{challenge.requirement} completed</span>
          {claimed ? (
            <span className="text-green-500">Claimed ✓</span>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-white ${
                isComplete ? 'bg-primary' : 'bg-gray-400'
              }`}
              onClick={() => isComplete && onClaim(challenge)}
              disabled={!isComplete}
            >
              Claim
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Challenges = ({ completedActivities }) => {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [claimedChallenges, setClaimedChallenges] = useState(new Set());
  const [showReward, setShowReward] = useState(null);

  useEffect(() => {
    // Load saved challenges and claimed status
    const saved = localStorage.getItem('activeChallenges');
    const claimed = localStorage.getItem('claimedChallenges');
    
    if (saved) {
      setActiveChallenges(JSON.parse(saved));
    } else {
      // Initialize with some random challenges
      const initial = challenges
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setActiveChallenges(initial);
      localStorage.setItem('activeChallenges', JSON.stringify(initial));
    }

    if (claimed) {
      setClaimedChallenges(new Set(JSON.parse(claimed)));
    }
  }, []);

  const calculateProgress = (challenge) => {
    if (challenge.category === 'any') {
      return completedActivities.length;
    }
    return completedActivities.filter(
      activity => activity.category === challenge.category
    ).length;
  };

  const handleClaim = (challenge) => {
    setShowReward(challengeTypes[challenge.type].rewards);
    setClaimedChallenges(prev => {
      const next = new Set(prev).add(challenge.id);
      localStorage.setItem('claimedChallenges', JSON.stringify([...next]));
      return next;
    });
    // Emit event to add points
    window.dispatchEvent(
      new CustomEvent('addPoints', {
        detail: challengeTypes[challenge.type].rewards
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeChallenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            progress={calculateProgress(challenge)}
            onClaim={handleClaim}
            claimed={claimedChallenges.has(challenge.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setShowReward(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Challenge Complete!</h3>
              <p className="text-xl text-primary">+{showReward} points</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Challenges;
