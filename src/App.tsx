import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketingPlanForm } from './components/MarketingPlanForm';
import { MarketingPlanDisplay } from './components/MarketingPlanDisplay';
import { UsageLimitToast } from './components/UsageLimitToast';
import { useAppStore } from './store/useAppStore';

function App() {
  const { isDarkMode, marketingPlan } = useAppStore();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      <div className="gradient-bg min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {!marketingPlan ? (
            <>
              <Hero />
              <MarketingPlanForm />
            </>
          ) : (
            <MarketingPlanDisplay />
          )}
        </main>
        <UsageLimitToast />
      </div>
    </div>
  );
}

export default App;