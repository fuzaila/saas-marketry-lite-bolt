import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isDarkMode: boolean;
  marketingPlan: string | null;
  usageCount: number;
  formData: {
    productName: string;
    productDescription: string;
    targetAudience: string;
    budget: string;
    goals: string;
  };
  toggleDarkMode: () => void;
  setMarketingPlan: (plan: string) => void;
  clearMarketingPlan: () => void;
  incrementUsage: () => void;
  resetUsage: () => void;
  updateFormData: (data: Partial<AppState['formData']>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      marketingPlan: null,
      usageCount: 0,
      formData: {
        productName: '',
        productDescription: '',
        targetAudience: '',
        budget: '',
        goals: '',
      },
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setMarketingPlan: (plan) => set({ marketingPlan: plan }),
      clearMarketingPlan: () => set({ marketingPlan: null }),
      incrementUsage: () => set((state) => ({ usageCount: state.usageCount + 1 })),
      resetUsage: () => set({ usageCount: 0 }),
      updateFormData: (data) => set((state) => ({ 
        formData: { ...state.formData, ...data } 
      })),
    }),
    {
      name: 'saasmarketry-storage',
    }
  )
);