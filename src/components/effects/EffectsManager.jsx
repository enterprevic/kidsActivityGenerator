import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const effectConfigs = {
  'special_effects_rainbow': {
    apply: (e) => {
      const rainbow = document.createElement('div');
      rainbow.style.position = 'fixed';
      rainbow.style.left = `${e.clientX}px`;
      rainbow.style.top = `${e.clientY}px`;
      rainbow.style.width = '10px';
      rainbow.style.height = '10px';
      rainbow.style.borderRadius = '50%';
      rainbow.style.pointerEvents = 'none';
      rainbow.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      rainbow.style.zIndex = '9999';
      document.body.appendChild(rainbow);

      const animation = rainbow.animate(
        [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(2)' }
        ],
        {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      );

      animation.onfinish = () => rainbow.remove();
    }
  },
  'special_effects_sparkles': {
    apply: (e) => {
      const colors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'];
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { 
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        },
        colors: colors,
        shapes: ['star'],
        scalar: 0.7
      });
    }
  }
};

const EffectsManager = () => {
  const [activeEffect, setActiveEffect] = useState(null);

  useEffect(() => {
    // Load active effect from localStorage
    const savedEffect = localStorage.getItem('activeEffect');
    if (savedEffect) {
      setActiveEffect(savedEffect);
    }

    // Listen for effect changes
    const handleEffectChange = () => {
      const newEffect = localStorage.getItem('activeEffect');
      setActiveEffect(newEffect);
    };

    window.addEventListener('storage', handleEffectChange);
    return () => window.removeEventListener('storage', handleEffectChange);
  }, []);

  useEffect(() => {
    if (!activeEffect) return;

    const effect = effectConfigs[activeEffect];
    if (!effect) return;

    const handleMouseMove = (e) => {
      if (Math.random() < 0.1) { // Only trigger 10% of the time for performance
        effect.apply(e);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [activeEffect]);

  return null; // This is a behavior-only component
};

export default EffectsManager;
