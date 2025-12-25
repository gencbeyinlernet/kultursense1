
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardComponent from './modules/Dashboard';
import RealVsFake from './modules/RealVsFake';
import CultureGuard from './modules/CultureGuard';
import EthicalCreator from './modules/EthicalCreator';
import Academy from './modules/Academy';
import PromptLab from './modules/PromptLab';
import Library from './modules/Library';
import DigitalCitizenship from './modules/DigitalCitizenship';
import Level1Games from './modules/Level1Games';
import Level2Games from './modules/Level2Games';
import Level3Games from './modules/Level3Games';
import Level4Games from './modules/Level4Games';
import Level5Games from './modules/Level5Games';
import Level6Games from './modules/Level6Games';
import Level7Games from './modules/Level7Games';
import Level8Games from './modules/Level8Games';
import Level9Games from './modules/Level9Games';
import Level10Games from './modules/Level10Games';
import FinalGame from './modules/FinalGame';
import Intro from './modules/Intro';
import HeroSelection from './modules/HeroSelection';
import Auth from './components/Auth';
import { ModuleView, Hero } from './types';
import { supabase } from './services/supabase';

function App() {
  const [session, setSession] = useState<any>(null);
  const [currentView, setCurrentView] = useState<ModuleView>(ModuleView.DASHBOARD);
  const [viewHistory, setViewHistory] = useState<ModuleView[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [selectedHero, setSelectedHero] = useState<Hero | null>(() => {
    const saved = localStorage.getItem('selected_hero');
    return saved ? JSON.parse(saved) : null;
  });

  const [showIntro, setShowIntro] = useState(() => {
    const seen = sessionStorage.getItem('seen_intro');
    return !seen;
  });

  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem('completed_levels');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setCurrentView(ModuleView.DASHBOARD);
        setViewHistory([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateTo = (view: ModuleView) => {
    if (view === ModuleView.DASHBOARD) {
      setViewHistory([]);
    } else if (view !== currentView) {
      setViewHistory(prev => [...prev, currentView]);
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const completeLevel = (level: number, points: number = 100) => {
    if (!completedLevels.includes(level)) {
      const newLevels = [...completedLevels, level];
      setCompletedLevels(newLevels);
      localStorage.setItem('completed_levels', JSON.stringify(newLevels));
    }
    navigateTo(ModuleView.DASHBOARD);
  };

  const handleHeroSelect = (hero: Hero) => {
    setSelectedHero(hero);
    localStorage.setItem('selected_hero', JSON.stringify(hero));
    setCurrentView(ModuleView.DASHBOARD);
  };

  const handleStartApp = () => {
    setShowIntro(false);
    sessionStorage.setItem('seen_intro', 'true');
    if (!selectedHero) {
      setCurrentView(ModuleView.HERO_SELECTION);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-600 font-bold">KültürSense Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  if (showIntro) {
    return <Intro onStart={handleStartApp} />;
  }

  if (!selectedHero || currentView === ModuleView.HERO_SELECTION) {
    return <HeroSelection onSelect={handleHeroSelect} />;
  }

  const renderView = () => {
    const allLevelsDone = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(lvl => completedLevels.includes(lvl));

    switch (currentView) {
      case ModuleView.DASHBOARD:
        return <DashboardComponent setView={navigateTo} completedLevels={completedLevels} selectedHero={selectedHero} />;
      case ModuleView.FINAL_GAME:
        return allLevelsDone ? <FinalGame onComplete={() => navigateTo(ModuleView.DASHBOARD)} /> : <DashboardComponent setView={navigateTo} completedLevels={completedLevels} selectedHero={selectedHero} />;
      case ModuleView.LEVEL_1:
        return <Level1Games onComplete={(p) => completeLevel(1, p)} />;
      case ModuleView.LEVEL_2:
        return <Level2Games onComplete={(p) => completeLevel(2, p)} />;
      case ModuleView.LEVEL_3:
        return <Level3Games onComplete={() => completeLevel(3, 100)} />;
      case ModuleView.LEVEL_4:
        return <Level4Games onComplete={() => completeLevel(4, 150)} />;
      case ModuleView.LEVEL_5:
        return <Level5Games onComplete={() => completeLevel(5, 200)} />;
      case ModuleView.LEVEL_6:
        return <Level6Games onComplete={() => completeLevel(6, 120)} />;
      case ModuleView.LEVEL_7:
        return <Level7Games onComplete={() => completeLevel(7, 180)} />;
      case ModuleView.LEVEL_8:
        return <Level8Games onComplete={() => completeLevel(8, 250)} />;
      case ModuleView.LEVEL_9:
        return <Level9Games onComplete={() => completeLevel(9, 300)} />;
      case ModuleView.LEVEL_10:
        return <Level10Games onComplete={() => completeLevel(10, 400)} />;
      case ModuleView.PROMPT_LAB:
        return <PromptLab />;
      case ModuleView.REAL_VS_FAKE:
        return <RealVsFake />;
      case ModuleView.CULTURE_GUARD:
        return <CultureGuard />;
      case ModuleView.ETHICAL_CREATOR:
        return <EthicalCreator />;
      case ModuleView.AI_ACADEMY:
        return <Academy />;
      case ModuleView.LIBRARY:
        return <Library />;
      case ModuleView.DIGITAL_CITIZEN:
        return <DigitalCitizenship />;
      default:
        return <DashboardComponent setView={navigateTo} completedLevels={completedLevels} selectedHero={selectedHero} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex">
      <Sidebar currentView={currentView} setView={navigateTo} completedLevels={completedLevels} selectedHero={selectedHero} />
      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto mt-12 md:mt-0">
          {currentView !== ModuleView.DASHBOARD && (
            <div className="mb-8 flex flex-wrap gap-4 animate-fade-in no-print">
              <button 
                onClick={() => navigateTo(ModuleView.DASHBOARD)}
                className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-md hover:bg-slate-50 transition-all text-indigo-600 font-black border-2 border-indigo-50 active:scale-95 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🏠</span>
                <span className="uppercase tracking-tight text-sm">Ana Sayfa</span>
              </button>
            </div>
          )}
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
