import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const UsageLimitToast: React.FC = () => {
  const { usageCount, isDarkMode, resetUsage } = useAppStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (usageCount >= 2) {
      setShowToast(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowToast(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [usageCount]);

  const handleShare = async () => {
    const text = "Just used SaaSMarketry Lite to create my 7-day marketing plan! 🚀 Perfect for SaaS founders looking to get their first 100 users. Highly recommend!";
    const url = "https://saasmarketry.com";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SaaSMarketry',
          text: text,
          url: url,
        });
      } catch (error) {
        // If native sharing fails or is cancelled, fall back to Twitter
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
      }
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
    
    resetUsage();
    setShowToast(false);
  };

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className={`p-4 rounded-2xl shadow-2xl border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className={`font-semibold text-sm ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Free tier maxed out! 🎉
                </h3>
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Share on X to reset your usage and help others discover SaaSMarketry Lite
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className={`p-1 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold text-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on X to Reset</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};