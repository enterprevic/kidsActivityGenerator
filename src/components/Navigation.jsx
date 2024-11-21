import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PointsGuide from './PointsGuide';

const Navigation = ({ points }) => {
  const [showPointsGuide, setShowPointsGuide] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-xl text-primary">
              Kids Activity Generator
            </Link>

            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPointsGuide(true)}
                className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
              >
                <span>{points} points ⭐</span>
                <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                  How to earn?
                </span>
              </motion.button>

              <div className="flex gap-4">
                <NavLink to="/" exact>
                  Home 🏠
                </NavLink>
                <NavLink to="/shop">
                  Shop 🛍️
                </NavLink>
                <NavLink to="/journal">
                  Journal 📖
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <PointsGuide isOpen={showPointsGuide} onClose={() => setShowPointsGuide(false)} />
    </>
  );
};

const NavLink = ({ to, children, exact }) => {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-3 py-2 rounded-full hover:bg-primary/10 transition-colors"
      >
        {children}
      </motion.div>
    </Link>
  );
};

export default Navigation;
