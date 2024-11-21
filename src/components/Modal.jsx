import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg bg-white rounded-2xl shadow-xl z-50 
                overflow-hidden m-4 ${className}`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
