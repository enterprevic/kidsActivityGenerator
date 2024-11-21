import { motion } from 'framer-motion';
import Modal from './Modal';

const PointsGuide = ({ isOpen, onClose }) => {
  const pointCategories = [
    {
      title: 'Activity Completion',
      points: 50,
      description: 'Complete any activity',
      icon: '🎯',
      examples: ['Complete a craft project', 'Finish an educational game']
    },
    {
      title: 'First Daily Activity',
      points: 100,
      description: 'Complete your first activity of the day',
      icon: '🌟',
      examples: ['Start your day with learning', 'Begin with a morning activity']
    },
    {
      title: 'Daily Streak',
      points: 25,
      description: 'Maintain your daily activity streak',
      icon: '🔥',
      examples: ['Complete activities 2 days in a row', 'Keep your momentum going']
    },
    {
      title: 'Weekend Warrior',
      points: 30,
      description: 'Complete activities on weekends',
      icon: '🎉',
      examples: ['Saturday morning projects', 'Sunday family activities']
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Earn Points ⭐">
      <div className="space-y-6">
        {pointCategories.map((category) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="font-bold text-primary">
                  +{category.points} pts
                </div>
              </div>

              <div className="mt-3 pl-11">
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Examples:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {category.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t text-center text-gray-600 text-sm">
        Points can be spent in the shop on themes, pet costumes, and special effects!
      </div>
    </Modal>
  );
};

export default PointsGuide;
