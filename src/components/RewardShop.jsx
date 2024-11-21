import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const shopItems = [
  {
    id: 'theme_space',
    name: 'Space Theme',
    description: 'Transform your app into a cosmic adventure!',
    price: 500,
    icon: '🚀',
    type: 'theme',
    preview: {
      primary: '#6B46C1',
      secondary: '#805AD5',
      accent: '#9F7AEA',
      background: 'space',
    },
  },
  {
    id: 'theme_ocean',
    name: 'Ocean Theme',
    description: 'Dive into an underwater experience!',
    price: 500,
    icon: '🌊',
    type: 'theme',
    preview: {
      primary: '#2B6CB0',
      secondary: '#4299E1',
      accent: '#63B3ED',
      background: 'ocean',
    },
  },
  {
    id: 'pet_costume_wizard',
    name: 'Wizard Costume',
    description: 'A magical outfit for your pet!',
    price: 300,
    icon: '🧙‍♂️',
    type: 'costume',
  },
  {
    id: 'pet_costume_superhero',
    name: 'Superhero Costume',
    description: 'Transform your pet into a superhero!',
    price: 300,
    icon: '🦸‍♂️',
    type: 'costume',
  },
  {
    id: 'special_effects_rainbow',
    name: 'Rainbow Trail',
    description: 'Leave a trail of rainbows as you move!',
    price: 200,
    icon: '🌈',
    type: 'effect',
  },
  {
    id: 'special_effects_sparkles',
    name: 'Sparkle Effect',
    description: 'Add sparkles to your interactions!',
    price: 200,
    icon: '✨',
    type: 'effect',
  },
];

const ShopItem = ({ item, points, onPurchase, owned }) => {
  const [showPreview, setShowPreview] = useState(false);
  const canAfford = points >= item.price;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur p-4 rounded-xl shadow-md relative overflow-hidden"
    >
      {/* Preview overlay for themes */}
      <AnimatePresence>
        {showPreview && item.type === 'theme' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br z-10"
            style={{
              background: `linear-gradient(to bottom right, ${item.preview.primary}, ${item.preview.secondary}, ${item.preview.accent})`,
            }}
          >
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setShowPreview(false)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="font-semibold">{item.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        </div>
        <div className="text-sm font-semibold text-primary">
          {item.price} pts
        </div>
      </div>

      <div className="flex justify-between items-center">
        {item.type === 'theme' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-full bg-gray-200 text-sm"
            onClick={() => setShowPreview(true)}
          >
            Preview
          </motion.button>
        )}
        {owned ? (
          <span className="text-green-500 text-sm">Owned ✓</span>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-white text-sm ${
              canAfford ? 'bg-primary' : 'bg-gray-400'
            }`}
            onClick={() => canAfford && onPurchase(item)}
            disabled={!canAfford}
          >
            {canAfford ? 'Purchase' : 'Not enough points'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const RewardShop = ({ points, onPurchase }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ownedItems, setOwnedItems] = useState(() => {
    const saved = localStorage.getItem('ownedItems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showPurchase, setShowPurchase] = useState(null);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🎁' },
    { id: 'theme', name: 'Themes', icon: '🎨' },
    { id: 'costume', name: 'Pet Costumes', icon: '👔' },
    { id: 'effect', name: 'Special Effects', icon: '✨' },
  ];

  const filteredItems = shopItems.filter(
    item => selectedCategory === 'all' || item.type === selectedCategory
  );

  const handlePurchase = (item) => {
    if (points >= item.price) {
      setOwnedItems(prev => {
        const next = new Set(prev).add(item.id);
        localStorage.setItem('ownedItems', JSON.stringify([...next]));
        return next;
      });
      setShowPurchase(item);
      onPurchase(item.price); // Pass the price directly
      
      // Apply the purchased item's effect
      if (item.type === 'theme') {
        document.documentElement.style.setProperty('--primary-color', item.preview.primary);
        document.documentElement.style.setProperty('--secondary-color', item.preview.secondary);
        document.documentElement.style.setProperty('--accent-color', item.preview.accent);
        localStorage.setItem('activeTheme', item.id);
      } else if (item.type === 'effect') {
        localStorage.setItem('activeEffect', item.id);
      } else if (item.type === 'costume') {
        localStorage.setItem('activeCostume', item.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-white/80 hover:bg-white'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span>{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Shop items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <ShopItem
            key={item.id}
            item={item}
            points={points}
            onPurchase={handlePurchase}
            owned={ownedItems.has(item.id)}
          />
        ))}
      </div>

      {/* Purchase confirmation popup */}
      <AnimatePresence>
        {showPurchase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setShowPurchase(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">{showPurchase.icon}</div>
              <h3 className="text-2xl font-bold mb-2">Item Purchased!</h3>
              <p className="text-gray-600 mb-4">{showPurchase.name}</p>
              <p className="text-xl text-primary">-{showPurchase.price} points</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewardShop;
