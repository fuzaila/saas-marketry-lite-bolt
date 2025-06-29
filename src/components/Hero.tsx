import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const Hero: React.FC = () => {
  const { isDarkMode } = useAppStore();

  const features = [
    {
      icon: <Rocket className="w-5 h-5" />,
      text: "7-Day Marketing Plan"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Targeted Strategies"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Growth Focused"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center py-12 mb-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-4xl md:text-6xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Get Your First{' '}
        <span className="gradient-text">100 Users</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Generate a personalized 7-day marketing plan for your SaaS product.
        From launch to your first paying customers.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700 text-gray-300'
                : 'bg-white/50 border-gray-200 text-gray-700'
            }`}
          >
            {feature.icon}
            <span className="text-sm font-medium">{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        ✨ Free • No signup required • 2 plans per session
      </motion.div>
    </motion.section>
  );
};