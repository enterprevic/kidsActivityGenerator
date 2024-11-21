import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { generateActivity } from './services/openai';
import RewardSystem from './components/RewardSystem';
import RewardShop from './components/RewardShop';
import ActivityJournal from './components/ActivityJournal';
import ActivityModal from './components/ActivityModal';
import {
  MagicCursor,
  AnimatedBackground,
  Tooltip,
  SuccessPopup,
  ProgressBar,
  FlipCard,
  LoadingSpinner,
  ParticleEffect
} from './components/UIEffects';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import EffectsManager from './components/effects/EffectsManager';
import VirtualPet from './components/pet/VirtualPet';

// Floating emoji animation component
const FloatingEmoji = ({ emoji, delay }) => (
  <motion.div
    initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
    animate={{
      y: window.innerHeight + 20,
      opacity: [0, 1, 1, 0],
      rotate: [0, 360],
      x: `${Math.random() * 200 - 100}vw`,
    }}
    transition={{
      duration: 15,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute text-3xl pointer-events-none z-0"
  >
    {emoji}
  </motion.div>
);

const FilterButton = ({ label, icon, isSelected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
      isSelected 
        ? 'bg-primary text-white shadow-lg' 
        : 'bg-white/50 hover:bg-white/80'
    }`}
  >
    <span className="text-xl">{icon}</span>
    {label}
  </motion.button>
);

function App() {
  const [currentActivity, setCurrentActivity] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    timeRequired: '',
    energyLevel: '',
    ageRange: ''
  });
  const [completedActivities, setCompletedActivities] = useState(() => {
    const saved = localStorage.getItem('completedActivities');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(() => {
    const savedStreak = localStorage.getItem('dailyStreak');
    return savedStreak ? parseInt(savedStreak) : 0;
  });
  const [lastActivityDate, setLastActivityDate] = useState(() => {
    const savedDate = localStorage.getItem('lastActivityDate');
    return savedDate ? new Date(savedDate) : null;
  });
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  // Point reward values
  const POINTS = {
    COMPLETE_ACTIVITY: 50,
    DAILY_STREAK: 25,
    FIRST_ACTIVITY: 100,
    WEEKEND_BONUS: 30,
  };

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    const streak = localStorage.getItem('dailyStreak');
    const lastDate = localStorage.getItem('lastActivityDate');
    if (streak) setDailyStreak(parseInt(streak));
    if (lastDate) setLastActivityDate(new Date(lastDate));
  }, []);

  useEffect(() => {
    localStorage.setItem('completedActivities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  const addPoints = (amount, reason) => {
    setPoints(prev => prev + amount);
    // Show success popup with points earned
    setShowSuccess({
      message: `+${amount} points earned! ${reason}`,
      type: 'points'
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === prev[filterType] ? '' : value
    }));
  };

  const generateNewActivity = async () => {
    setLoading(true);
    setError(null);
    try {
      const activity = await generateActivity(filters);
      setCurrentActivity(activity);
      setShowActivityModal(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C']
      });
    } catch (err) {
      setError('Failed to generate activity. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityComplete = (activity) => {
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const isFirstToday = !completedActivities.some(
      a => new Date(a.completedAt).toDateString() === now.toDateString()
    );

    // Base points for completing activity
    addPoints(POINTS.COMPLETE_ACTIVITY, "Activity completed! 🎯");

    // Bonus for first activity of the day
    if (isFirstToday) {
      addPoints(POINTS.FIRST_ACTIVITY, "First activity of the day! 🌟");
    }

    // Weekend bonus
    if (isWeekend) {
      addPoints(POINTS.WEEKEND_BONUS, "Weekend warrior bonus! 🎉");
    }

    // Update completed activities with a unique ID
    const activityWithId = {
      ...activity,
      id: Date.now().toString(),
      completedAt: now.toISOString()
    };

    setCompletedActivities(prev => [...prev, activityWithId]);
    setShowActivityModal(false);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastDate = lastActivityDate ? new Date(lastActivityDate).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (!lastDate || lastDate === yesterday) {
      const newStreak = dailyStreak + 1;
      setDailyStreak(newStreak);
      localStorage.setItem('dailyStreak', newStreak.toString());
      
      // Award points for maintaining streak
      addPoints(POINTS.DAILY_STREAK, `${newStreak} day streak! Keep it up! 🔥`);
    } else if (lastDate !== today) {
      setDailyStreak(1);
      localStorage.setItem('dailyStreak', '1');
    }

    setLastActivityDate(today);
    localStorage.setItem('lastActivityDate', today);
  };

  const handlePurchase = (cost) => {
    setPoints(points - cost);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
        <Navigation points={points} />
        <EffectsManager />
        <VirtualPet />
        
        <Routes>
          <Route path="/" element={(
            <main className="container mx-auto px-4 pt-24 pb-12">
              {/* Activity Generation Section */}
              <section className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-6">
                  Kids Activity Generator
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Generate fun, educational activities for your kids! 
                  Complete activities to earn points and unlock rewards.
                </p>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {Object.entries({
                    category: ['Indoor', 'Outdoor', 'Creative', 'Educational'],
                    timeRequired: ['Short', 'Medium', 'Long'],
                    energyLevel: ['Low', 'Medium', 'High'],
                    ageRange: ['Toddler', 'Preschooler', 'School Age']
                  }).map(([filterType, options]) => (
                    <div key={filterType} className="space-y-2">
                      <h3 className="font-semibold capitalize">{filterType.replace(/([A-Z])/g, ' $1')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {options.map(option => (
                          <Tooltip key={option} text={`Filter by ${option}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleFilterChange(filterType, option)}
                              className={`px-4 py-2 rounded-full text-sm ${
                                filters[filterType] === option
                                  ? 'bg-primary text-white'
                                  : 'bg-white/80 hover:bg-white'
                              }`}
                            >
                              {option}
                            </motion.button>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateNewActivity}
                  disabled={loading}
                  className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold 
                    shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                >
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    'Generate Activity! 🎨'
                  )}
                </motion.button>

                {error && (
                  <p className="text-red-500 mt-4">{error}</p>
                )}
              </section>

              {/* Activity Modal */}
              <ActivityModal
                activity={currentActivity}
                isOpen={showActivityModal}
                onClose={() => setShowActivityModal(false)}
                onRegenerate={generateNewActivity}
                handleActivityComplete={handleActivityComplete}
              />

              {/* Floating Emojis */}
              {['🎨', '🎮', '📚', '🎭', '🧩', '🎪'].map((emoji, index) => (
                <FloatingEmoji key={index} emoji={emoji} delay={index * 2} />
              ))}
            </main>
          )} />
            
          <Route path="/shop" element={
            <RewardShop 
              points={points} 
              onPurchase={(cost) => setPoints(prevPoints => prevPoints - cost)} 
            />
          } />
          <Route path="/journal" element={<ActivityJournal activities={completedActivities} />} />
        </Routes>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccess && (
            <SuccessPopup message={showSuccess.message} onClose={() => setShowSuccess(null)} />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
