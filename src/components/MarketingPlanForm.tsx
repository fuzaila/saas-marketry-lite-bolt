import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GeminiService } from '../services/geminiService';

export const MarketingPlanForm: React.FC = () => {
  const { isDarkMode, formData, updateFormData, setMarketingPlan, incrementUsage, usageCount } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usageCount >= 2) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const geminiService = new GeminiService();
      const marketingPlan = await geminiService.generateMarketingPlan(formData);
      setMarketingPlan(marketingPlan);
      incrementUsage();
    } catch (err) {
      console.error('Error generating marketing plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate marketing plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = usageCount >= 2;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`p-8 rounded-2xl border backdrop-blur-sm ${
          isDarkMode
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}>
          {error && (
            <div className={`mb-6 p-4 rounded-xl border ${
              isDarkMode
                ? 'bg-red-900/20 border-red-800 text-red-300'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => updateFormData({ productName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                placeholder="e.g., TaskMaster Pro"
                disabled={isDisabled}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Product Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.productDescription}
                onChange={(e) => updateFormData({ productDescription: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                placeholder="Describe what your product does and its key features..."
                disabled={isDisabled}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Target Audience *
              </label>
              <input
                type="text"
                required
                value={formData.targetAudience}
                onChange={(e) => updateFormData({ targetAudience: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                placeholder="e.g., Small business owners, Freelancers, Marketing teams"
                disabled={isDisabled}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Marketing Budget *
              </label>
              <select
                required
                value={formData.budget}
                onChange={(e) => updateFormData({ budget: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                disabled={isDisabled}
              >
                <option value="">Select your budget range</option>
                <option value="$0-$500">$0 - $500</option>
                <option value="$500-$2000">$500 - $2,000</option>
                <option value="$2000-$5000">$2,000 - $5,000</option>
                <option value="$5000+">$5,000+</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Primary Goals *
              </label>
              <textarea
                required
                rows={2}
                value={formData.goals}
                onChange={(e) => updateFormData({ goals: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                placeholder="e.g., Get first 100 users, Generate $5k MRR, Build brand awareness"
                disabled={isDisabled}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isGenerating || isDisabled}
            whileHover={!isGenerating && !isDisabled ? { scale: 1.02 } : {}}
            whileTap={!isGenerating && !isDisabled ? { scale: 0.98 } : {}}
            className={`w-full mt-8 px-8 py-4 rounded-xl font-semibold text-white transition-all ${
              isGenerating || isDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Your Marketing Plan...</span>
              </div>
            ) : isDisabled ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Usage Limit Reached (2/2)</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Generate My 7-Day Marketing Plan</span>
              </div>
            )}
          </motion.button>

          <div className={`text-center mt-4 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {usageCount}/2 plans generated this session
          </div>
        </div>
      </form>
    </motion.section>
  );
};