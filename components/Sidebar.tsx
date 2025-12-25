
import React from 'react';
import { ModuleView, Hero } from '../types';
import { supabase } from '../services/supabase';

const LogoMascot = ({ size = "normal", hero }: { size?: "small" | "normal" | "large", hero?: Hero | null }) => {
  const dimensions = size === "small" ? "w-10 h-10" : size === "large" ? "w-32 h-32" : "w-16 h-16";
  
  if (hero) {
    return (
      <div className={`relative ${dimensions} animate-float group flex items-center justify-center rounded-[1.5rem] ${hero.color} shadow-lg border-b-4 border-black/20 text-3xl`}>
        {hero.icon}
      </div>
    );
  }

  return (
    <div className={`relative ${dimensions} animate-float group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-[2rem] shadow-lg border-b-4 border-indigo-700 transform group-hover:scale-110 transition-transform duration-300">
        <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full"></div>
      </div>
      <div className="absolute top-1/3 left-[20%] w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-[20%] w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-7 h-3.5 border-b-4 border-slate-900 rounded-full"></div>
    </div>
  );
};

interface SidebarProps {
  currentView: ModuleView;
  setView: (view: ModuleView) => void;
  completedLevels: number[];
  selectedHero?: Hero | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, completedLevels, selectedHero }) => {
  const isFinalUnlocked = completedLevels.includes(10);

  const menuItems = [
    { id: ModuleView.DASHBOARD, label: 'Ana Sayfa', icon: '🏠', color: 'bg-indigo-500', locked: false },
    { id: ModuleView.FINAL_GAME, label: '🌟 ANA OYUN', icon: isFinalUnlocked ? '💎' : '🔒', color: isFinalUnlocked ? 'bg-gradient-to-r from-amber-500 to-yellow-600' : 'bg-gray-400', locked: !isFinalUnlocked },
    { id: ModuleView.LEVEL_1, label: 'Seviye 1', icon: '🎮', color: 'bg-green-500', locked: false },
    { id: ModuleView.LEVEL_2, label: 'Seviye 2', icon: '🕹️', color: 'bg-yellow-500', locked: false },
    { id: ModuleView.LEVEL_3, label: 'Seviye 3', icon: '🚀', color: 'bg-orange-600', locked: false },
    { id: ModuleView.LEVEL_4, label: 'Seviye 4', icon: '⚖️', color: 'bg-red-600', locked: false },
    { id: ModuleView.LEVEL_5, label: 'Seviye 5', icon: '🏛️', color: 'bg-purple-600', locked: false },
    { id: ModuleView.LEVEL_6, label: 'Seviye 6', icon: '🌐', color: 'bg-blue-600', locked: false },
    { id: ModuleView.LEVEL_7, label: 'Seviye 7', icon: '📊', color: 'bg-stone-600', locked: false },
    { id: ModuleView.LEVEL_8, label: 'Seviye 8', icon: '🏁', color: 'bg-gray-900', locked: false },
    { id: ModuleView.LEVEL_9, label: 'Seviye 9', icon: '🏝️', color: 'bg-cyan-600', locked: false },
    { id: ModuleView.LEVEL_10, label: 'Seviye 10', icon: '🌟', color: 'bg-amber-600', locked: false },
    { id: ModuleView.PROMPT_LAB, label: 'Kelime Sihirbazı', icon: '✨', color: 'bg-pink-500', locked: false },
    { id: ModuleView.AI_ACADEMY, label: 'Yapay Zeka Akademisi', icon: '🎓', color: 'bg-purple-500', locked: false },
    { id: ModuleView.LIBRARY, label: 'Kütüphane', icon: '📚', color: 'bg-emerald-500', locked: false },
    { id: ModuleView.ETHICAL_CREATOR, label: 'Etik Üretici', icon: '🎨', color: 'bg-green-500', locked: false },
    { id: ModuleView.REAL_VS_FAKE, label: 'Gerçeklik Dedektifi', icon: '🕵️‍♂️', color: 'bg-red-500', locked: false },
    { id: ModuleView.CULTURE_GUARD, label: 'Kültür Koruyucusu', icon: '🛡️', color: 'bg-orange-500', locked: false },
    { id: ModuleView.DIGITAL_CITIZEN, label: 'Dijital Vatandaş', icon: '🌍', color: 'bg-blue-500', locked: false },
  ];

  const handleLogout = async () => {
    if (confirm('Oturumu kapatmak istediğine emin misin?')) {
      await supabase.auth.signOut();
      localStorage.removeItem('selected_hero');
      window.location.reload();
    }
  };

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 flex flex-col z-10 hidden md:flex border-r border-gray-100">
      <div 
        className="p-6 border-b border-gray-100 bg-white flex flex-col items-center cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setView(ModuleView.DASHBOARD)}
      >
        <div className="flex items-center gap-4">
           <LogoMascot hero={selectedHero} />
           <div>
             <h1 className="text-xl font-black text-indigo-900 leading-none">{selectedHero ? selectedHero.name.split(' ')[0] : 'Kültür'}</h1>
             <h1 className="text-xl font-black text-indigo-500 leading-none">{selectedHero ? selectedHero.name.split(' ')[1] : 'Sense'}</h1>
           </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            disabled={item.locked}
            onClick={() => setView(item.id)}
            className={`w-full min-h-[52px] flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              currentView === item.id
                ? `${item.color} text-white shadow-md transform scale-[1.02]`
                : item.locked 
                  ? 'text-gray-300 cursor-not-allowed grayscale'
                  : 'text-gray-600 hover:bg-indigo-50 hover:pl-6'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-black uppercase tracking-tight text-[11px]">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-5 border-t border-gray-100 bg-gray-50/50 text-center">
        {selectedHero && (
          <button
            onClick={() => setView(ModuleView.HERO_SELECTION)}
            className="w-full mb-2 min-h-[40px] flex items-center justify-center gap-2 px-4 py-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest border border-indigo-100"
          >
            🔄 Kahramanı Değiştir
          </button>
        )}
        <button
          onClick={handleLogout}
          className="w-full min-h-[40px] flex items-center justify-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest border border-red-100"
        >
          <span>👋 Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
