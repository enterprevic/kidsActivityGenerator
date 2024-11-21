import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Sticker = ({ emoji, onClick, isSelected }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`text-2xl p-2 rounded-full ${
      isSelected ? 'bg-primary/20' : 'hover:bg-gray-100'
    }`}
    onClick={() => onClick(emoji)}
  >
    {emoji}
  </motion.button>
);

const JournalEntry = ({ activity, date, stickers, rating, notes, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);
  const [currentStickers, setCurrentStickers] = useState(stickers);
  const [currentRating, setCurrentRating] = useState(rating);

  const availableStickers = ['⭐', '🌟', '🎨', '🎮', '🎪', '🎭', '🎯', '🎲', '🌈', '🦄', '🚀', '🌺'];
  const ratings = ['😕', '😊', '🤗', '🥳', '🤩'];

  const handleSave = () => {
    onUpdate({
      stickers: currentStickers,
      rating: currentRating,
      notes: currentNotes,
    });
    setIsEditing(false);
  };

  const toggleSticker = (sticker) => {
    setCurrentStickers(prev =>
      prev.includes(sticker)
        ? prev.filter(s => s !== sticker)
        : [...prev, sticker]
    );
  };

  return (
    <motion.div
      layout
      className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-xl mb-1">{activity.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? '✕' : '✏️'}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <h4 className="font-semibold mb-2">How was it? 🤔</h4>
              <div className="flex gap-2">
                {ratings.map((r, i) => (
                  <motion.button
                    key={r}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-2xl p-2 rounded-full ${
                      currentRating === i ? 'bg-primary/20' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentRating(i)}
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Add stickers! ✨</h4>
              <div className="flex flex-wrap gap-2">
                {availableStickers.map(sticker => (
                  <Sticker
                    key={sticker}
                    emoji={sticker}
                    onClick={toggleSticker}
                    isSelected={currentStickers.includes(sticker)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Your thoughts 📝</h4>
              <textarea
                value={currentNotes}
                onChange={e => setCurrentNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/50 focus:bg-white"
                rows={3}
                placeholder="Write about your experience..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-primary text-white rounded-full"
              onClick={handleSave}
            >
              Save Entry ✨
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{ratings[currentRating]}</span>
              <div className="flex flex-wrap gap-1">
                {currentStickers.map((sticker, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl"
                  >
                    {sticker}
                  </motion.span>
                ))}
              </div>
            </div>

            {currentNotes && (
              <p className="text-gray-600 italic">"{currentNotes}"</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ActivityJournal = ({ activities = [] }) => {
  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : {};
  });

  const updateEntry = (activityId, date, updates) => {
    setJournalEntries(prev => {
      const key = `${activityId}-${date}`;
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          ...updates,
        },
      };
      localStorage.setItem('journalEntries', JSON.stringify(updated));
      return updated;
    });
  };

  if (!Array.isArray(activities)) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Activity Journal 📖</h2>
          <p className="text-gray-600">
            Complete some activities to start your journal!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Activity Journal 📖</h2>
        <p className="text-gray-600">
          {activities.length > 0
            ? "Keep track of your favorite activities and memories!"
            : "Complete some activities to start your journal!"}
        </p>
      </div>

      <div className="grid gap-4">
        {activities.map((activity) => {
          const key = `${activity.id || activity.title}-${activity.completedAt}`;
          const entry = journalEntries[key] || {
            stickers: [],
            rating: 2,
            notes: '',
          };

          return (
            <JournalEntry
              key={key}
              activity={activity}
              date={activity.completedAt}
              stickers={entry.stickers}
              rating={entry.rating}
              notes={entry.notes}
              onUpdate={(updates) => updateEntry(activity.id || activity.title, activity.completedAt, updates)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ActivityJournal;
