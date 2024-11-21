import { motion } from 'framer-motion';
import Modal from './Modal';

const ActivityModal = ({ activity, isOpen, onClose, onRegenerate, handleActivityComplete }) => {
  if (!activity) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={activity.title}
      className="max-w-2xl"
    >
      <div className="space-y-6">
        <p className="text-gray-700">{activity.description}</p>

        <div>
          <h3 className="font-semibold text-lg mb-2">You'll need:</h3>
          <ul className="list-disc list-inside space-y-1">
            {activity.resources.map((resource, index) => (
              <li key={index} className="text-gray-700">{resource}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2">
            {activity.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700">{instruction}</li>
            ))}
          </ol>
        </div>

        <div className="bg-primary/5 p-4 rounded-xl">
          <h3 className="font-semibold mb-1">Fun fact:</h3>
          <p className="text-gray-600">{activity.funFact}</p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-primary text-white rounded-full font-semibold 
              shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            onClick={onRegenerate}
          >
            Generate New Activity! 🎉
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-green-500 text-white rounded-full font-semibold 
              shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-shadow"
            onClick={() => {
              onClose();
              handleActivityComplete(activity);
            }}
          >
            Complete Activity! ⭐
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityModal;
