
import React, { useState } from 'react';
import { Hero } from '../types';

const HEROES: Hero[] = [
  { id: '1', name: 'Cesur Aslan', icon: '🦁', power: 'Liderlik', color: 'bg-orange-500' },
  { id: '2', name: 'Zeki Kedi', icon: '🐱', power: 'Hızlı Analiz', color: 'bg-yellow-400' },
  { id: '3', name: 'Sadık Köpek', icon: '🐶', power: 'Güvenlik Uzmanı', color: 'bg-stone-500' },
  { id: '4', name: 'Sakin Panda', icon: '🐼', power: 'Dijital Denge', color: 'bg-slate-800' },
  { id: '5', name: 'Kurnaz Tilki', icon: '🦊', power: 'Yalan Avcısı', color: 'bg-orange-600' },
  { id: '6', name: 'Hızlı Tavşan', icon: '🐰', power: 'Veri Hızı', color: 'bg-pink-400' },
  { id: '7', name: 'Bilge Baykuş', icon: '🦉', power: 'Etik Rehber', color: 'bg-indigo-600' },
  { id: '8', name: 'Meraklı Maymun', icon: '🐵', power: 'Kaşif Ruhu', color: 'bg-amber-700' },
  { id: '9', name: 'Güçlü Ayı', icon: '🐻', power: 'Siber Kalkan', color: 'bg-stone-700' },
  { id: '10', name: 'Neşeli Kurbağa', icon: '🐸', power: 'İletişim Gücü', color: 'bg-green-500' },
  { id: '11', name: 'Uykucu Koala', icon: '🐨', power: 'Huzurlu İnternet', color: 'bg-gray-400' },
  { id: '12', name: 'Bilge Fil', icon: '🐘', power: 'Dev Hafıza', color: 'bg-blue-400' },
  { id: '13', name: 'Atik Kaplan', icon: '🐯', power: 'Refleks Kralı', color: 'bg-orange-400' },
  { id: '14', name: 'Hayalperest At', icon: '🦄', power: 'Yaratıcı Tasarım', color: 'bg-purple-400' },
  { id: '15', name: 'Sosyal Penguen', icon: '🐧', power: 'Takım Çalışması', color: 'bg-blue-600' },
  { id: '16', name: 'Gözlemci Zürafa', icon: '🦒', power: 'Geniş Vizyon', color: 'bg-yellow-600' },
  { id: '17', name: 'Çalışkan Arı', icon: '🐝', power: 'Üretkenlik', color: 'bg-yellow-500' },
  { id: '18', name: 'Zarif Kelebek', icon: '🦋', power: 'Değişim Uzmanı', color: 'bg-cyan-400' },
  { id: '19', name: 'Sabırlı Kaplumbağa', icon: '🐢', power: 'Derin Bilgi', color: 'bg-emerald-600' },
  { id: '20', name: 'Ahtapot Mucit', icon: '🐙', power: 'Çoklu Görev', color: 'bg-pink-500' }
];

interface HeroSelectionProps {
  onSelect: (hero: Hero) => void;
}

const HeroSelection: React.FC<HeroSelectionProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const currentHero = HEROES.find(h => h.id === selectedId);

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-12 px-4 animate-fade-in">
      <div className="max-w-6xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black text-indigo-900 tracking-tight">DİJİTAL KAHRAMANINI SEÇ!</h1>
          <p className="text-xl text-slate-600 font-bold">Bu macerada sana eşlik edecek hayvan dostunu belirle.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {HEROES.map((hero) => (
            <button
              key={hero.id}
              onClick={() => setSelectedId(hero.id)}
              className={`relative p-6 rounded-[2.5rem] bg-white border-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl ${
                selectedId === hero.id ? 'border-indigo-600 scale-105 ring-4 ring-indigo-200' : 'border-transparent hover:border-indigo-200'
              }`}
            >
              <div className={`w-20 h-20 mx-auto rounded-full ${hero.color} flex items-center justify-center text-5xl mb-4 shadow-inner`}>
                {hero.icon}
              </div>
              <h3 className="font-black text-slate-800 text-lg leading-tight mb-1">{hero.name}</h3>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{hero.power}</div>
              
              {selectedId === hero.id && (
                <div className="absolute -top-3 -right-3 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg animate-bounce">
                  ✨
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="pt-8">
          <button
            disabled={!selectedId}
            onClick={() => currentHero && onSelect(currentHero)}
            className={`min-h-[84px] px-16 rounded-full font-black text-3xl text-white shadow-2xl transition-all ${
              !selectedId ? 'bg-slate-300 cursor-not-allowed opacity-50' : 'bg-indigo-600 hover:bg-indigo-700 border-b-8 border-indigo-900 active:scale-95'
            }`}
          >
            MACERAYA BAŞLA! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSelection;
