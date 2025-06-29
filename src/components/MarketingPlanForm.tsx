import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const MarketingPlanForm: React.FC = () => {
  const { isDarkMode, formData, updateFormData, setMarketingPlan, incrementUsage, usageCount } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usageCount >= 2) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockPlan = generateMockMarketingPlan(formData);
    setMarketingPlan(mockPlan);
    incrementUsage();
    setIsGenerating(false);
  };

  const generateMockMarketingPlan = (data: typeof formData) => {
    return `# 7-Day Marketing Plan for ${data.productName}

## Executive Summary
This comprehensive marketing plan is designed to help ${data.productName} acquire its first 100 users within 7 days through targeted strategies and focused execution.

## Product Overview
**Product:** ${data.productName}
**Description:** ${data.productDescription}
**Target Audience:** ${data.targetAudience}
**Budget:** ${data.budget}
**Primary Goals:** ${data.goals}

## Day-by-Day Action Plan

### Day 1: Foundation & Setup
**Objective:** Establish your marketing foundation

**Tasks:**
• Set up Google Analytics and tracking pixels
• Create social media profiles (Twitter, LinkedIn, Product Hunt)
• Prepare launch assets (screenshots, demo videos, press kit)
• Write your elevator pitch and key messaging
• Set up email capture system

**Expected Outcome:** Marketing infrastructure ready for launch

### Day 2: Content Creation & SEO
**Objective:** Create valuable content to attract your target audience

**Tasks:**
• Write 3 blog posts addressing your target audience's pain points
• Create a landing page optimized for conversions
• Set up basic SEO (meta tags, keywords, sitemap)
• Prepare social media content calendar
• Create a product demo video

**Expected Outcome:** Content foundation established for organic discovery

### Day 3: Community Engagement
**Objective:** Build relationships in relevant communities

**Tasks:**
• Join 5-10 relevant online communities (Reddit, Discord, Slack groups)
• Engage authentically in discussions (don't pitch immediately)
• Share valuable insights and help solve problems
• Connect with potential users on LinkedIn
• Participate in relevant Twitter conversations

**Expected Outcome:** 50+ meaningful community interactions

### Day 4: Product Hunt & Launch Preparation
**Objective:** Prepare for major launch platforms

**Tasks:**
• Submit to Product Hunt (schedule for optimal day)
• Reach out to your network for launch day support
• Prepare launch day social media posts
• Create email announcement for your list
• Set up launch day tracking and monitoring

**Expected Outcome:** Launch strategy ready for execution

### Day 5: Launch Day Execution
**Objective:** Execute your launch and maximize visibility

**Tasks:**
• Go live on Product Hunt at 12:01 AM PST
• Send launch announcement to your email list
• Post on all social media channels
• Engage with Product Hunt comments throughout the day
• Reach out to press and bloggers with your story

**Expected Outcome:** 200+ Product Hunt votes, 25+ new users

### Day 6: Influencer & Partnership Outreach
**Objective:** Leverage relationships for growth

**Tasks:**
• Identify 20 micro-influencers in your niche
• Craft personalized outreach messages
• Offer free access in exchange for honest reviews
• Reach out to complementary SaaS tools for partnerships
• Connect with industry newsletters for features

**Expected Outcome:** 5+ influencer partnerships, 2+ newsletter features

### Day 7: Optimization & Follow-up
**Objective:** Optimize based on data and maintain momentum

**Tasks:**
• Analyze week's performance data
• A/B test your landing page elements
• Follow up with warm leads from the week
• Plan next week's content and outreach
• Celebrate your wins and document lessons learned

**Expected Outcome:** 15+ additional users, clear optimization plan

## Key Metrics to Track

### Primary Metrics:
• **User Signups:** Target 100 users by end of week
• **Conversion Rate:** Landing page visitors to signups
• **Traffic Sources:** Which channels drive the most quality traffic
• **Engagement Rate:** How users interact with your product

### Secondary Metrics:
• Social media followers and engagement
• Email list growth
• Product Hunt ranking and votes
• Press mentions and backlinks

## Budget Allocation (Based on ${data.budget})

### Recommended Spend:
• **Paid Ads:** 40% - Focus on high-intent keywords
• **Tools & Software:** 25% - Analytics, email marketing, design tools
• **Content Creation:** 20% - Video editing, graphics, copywriting
• **Influencer Partnerships:** 15% - Micro-influencer collaborations

## Success Factors

### Critical Success Factors:
1. **Consistent Execution:** Follow the daily plan without skipping steps
2. **Authentic Engagement:** Focus on building real relationships, not just pitching
3. **Data-Driven Decisions:** Track everything and optimize based on results
4. **Quality Over Quantity:** Better to have 50 engaged users than 200 inactive ones

### Common Pitfalls to Avoid:
• Trying to be everywhere at once
• Focusing only on vanity metrics
• Not following up with interested prospects
• Giving up after day 3 if results aren't immediate

## Next Steps After Week 1

### Week 2 Focus Areas:
• Double down on the channels that worked best
• Implement user feedback and iterate on your product
• Start building a content marketing engine
• Develop a referral program for existing users

### Long-term Strategy:
• Build a sustainable content marketing system
• Develop strategic partnerships
• Implement a comprehensive email marketing funnel
• Scale the tactics that proved most effective

## Conclusion

This 7-day plan is designed to give ${data.productName} maximum visibility and user acquisition in a short timeframe. Success depends on consistent execution, authentic engagement, and rapid iteration based on data.

Remember: The goal isn't just to get 100 users, but to get 100 users who love your product and will become advocates for your brand.

**Ready to launch? Let's make it happen! 🚀**

---

*Generated by SaaSMarketry Lite - Your AI Marketing Strategist*`;
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