
import React from 'react';
import { ModuleView, Hero } from '../types';

interface DashboardProps {
  setView: (view: ModuleView) => void;
  completedLevels: number[];
  selectedHero?: Hero | null;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, completedLevels, selectedHero }) => {
  const allLevelsDone = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(lvl => completedLevels.includes(lvl));
  
  const categories = [
    {
      title: "Ustalık Yolculuğu",
      items: [
        { 
          title: "🌟 ANA OYUN", 
          icon: allLevelsDone ? "💎" : "🔒", 
          desc: allLevelsDone ? "Büyük Görev Aktif!" : `Kilitli: ${completedLevels.length}/10 Seviye`, 
          view: ModuleView.FINAL_GAME, 
          type: "FİNAL MODÜLÜ",
          color: allLevelsDone 
            ? "bg-gradient-to-br from-amber-500 to-yellow-700 text-white border-amber-300 scale-105 shadow-xl animate-pulse" 
            : "bg-gray-100 border-gray-200 text-gray-400 grayscale cursor-not-allowed",
          locked: !allLevelsDone
        },
      ]
    },
    {
      title: "Oyun Deneyimleri",
      items: [
        { id: 1, title: "Seviye 1", icon: "🎮", desc: "Güvenlik Yolu", type: "Eğitsel Mini Oyun", view: ModuleView.LEVEL_1, color: "bg-green-50 border-green-200 text-green-800" },
        { id: 2, title: "Seviye 2", icon: "🕹️", desc: "Karar Labirenti", type: "Seçim ve Karar", view: ModuleView.LEVEL_2, color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
        { id: 3, title: "Seviye 3", icon: "🚀", desc: "Etik Sohbetler", type: "Hikâye ve Rol Yapma", view: ModuleView.LEVEL_3, color: "bg-orange-50 border-orange-200 text-orange-800" },
        { id: 4, title: "Seviye 4", icon: "⚖️", desc: "Şehir Yönetimi", type: "Strateji ve Simülasyon", view: ModuleView.LEVEL_4, color: "bg-red-50 border-red-200 text-red-800" },
        { id: 5, title: "Seviye 5", icon: "🏛️", desc: "Veri Yakalama", type: "Refleks ve Dikkat", view: ModuleView.LEVEL_5, color: "bg-purple-50 border-purple-200 text-purple-800" },
        { id: 6, title: "Seviye 6", icon: "🌐", desc: "Kavram Bulmaca", type: "Hafıza ve Eşleştirme", view: ModuleView.LEVEL_6, color: "bg-blue-50 border-blue-200 text-blue-800" },
        { id: 7, title: "Seviye 7", icon: "📊", desc: "Takım Ataması", type: "İş Birliği ve Takım", view: ModuleView.LEVEL_7, color: "bg-stone-50 border-stone-200 text-stone-800" },
        { id: 8, title: "Seviye 8", icon: "🏁", desc: "Gelecek Manifestosu", type: "Yaratıcılık ve Tasarım", view: ModuleView.LEVEL_8, color: "bg-gray-100 border-gray-300 text-gray-900" },
        { id: 9, title: "Seviye 9", icon: "🏝️", desc: "Macera Adası", type: "Keşif ve Karakter", view: ModuleView.LEVEL_9, color: "bg-cyan-50 border-cyan-200 text-cyan-800" },
        { id: 10, title: "Seviye 10", icon: "🌟", desc: "Lumi ve Işık Adası", type: "Büyük Macera", view: ModuleView.LEVEL_10, color: "bg-amber-50 border-amber-200 text-amber-800" },
      ]
    },
    {
      title: "Özel Araçlar",
      items: [
        { title: "Kelime Sihirbazı", icon: "✨", desc: "Prompt Gücü", type: "Eğitsel / Dil", view: ModuleView.PROMPT_LAB, color: "bg-pink-50 border-pink-200 text-pink-800" },
        { title: "Gerçeklik Dedektifi", icon: "🕵️‍♂️", desc: "Yalan Avı", type: "Soru-Cevap / Quiz", view: ModuleView.REAL_VS_FAKE, color: "bg-red-50 border-red-200 text-red-800" },
        { title: "Etik Üretici", icon: "🎨", desc: "YZ Sanatı", type: "Yaratıcılık / Tasarım", view: ModuleView.ETHICAL_CREATOR, color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
        { title: "Dijital Vatandaş", icon: "🌍", desc: "Güvenlik", type: "Keşif / Macera", view: ModuleView.DIGITAL_CITIZEN, color: "bg-blue-50 border-blue-200 text-blue-800" },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-24 px-4 md:px-0">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden border-b-[16px] border-indigo-900/40">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Hoş Geldin, {selectedHero ? selectedHero.name : 'Rehber'}! {selectedHero?.icon}
            </h1>
            <p className="text-indigo-100 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-bold opacity-90">
              Süper Gücün: <span className="text-amber-400">{selectedHero?.power || 'Bilinçli Teknoloji'}</span>.
              Hazırsan maceraya devam edelim!
            </p>
            <div className="flex flex-wrap gap-5 justify-center md:justify-start">
               <button 
                onClick={() => allLevelsDone && setView(ModuleView.FINAL_GAME)} 
                className={`${allLevelsDone ? 'bg-amber-500 hover:bg-amber-400 active:scale-95' : 'bg-gray-600 opacity-50 cursor-not-allowed'} min-h-[64px] text-white px-12 py-5 rounded-full font-black text-2xl transition-all shadow-xl border-b-8 border-amber-700`}
               >
                 {allLevelsDone ? '💎 ANA OYUNU BAŞLAT' : `🔒 KİLİTLİ (${completedLevels.length}/10)`}
               </button>
            </div>
          </div>
          <div className="hidden lg:flex w-64 h-64 bg-white/10 rounded-[4rem] backdrop-blur-md items-center justify-center border-4 border-white/20 animate-float shadow-inner">
             <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center text-8xl">
                  {selectedHero?.icon || '🧠'}
                </div>
                <div className="text-white text-xl font-black uppercase tracking-widest">{completedLevels.length * 100} PUAN</div>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <h2 className="text-3xl font-black text-slate-800 mb-10 ml-4 flex items-center gap-4">
              <span className="w-3 h-12 bg-indigo-500 rounded-full inline-block shadow-sm"></span>
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {cat.items.map((item: any, itemIdx) => {
                const isCompleted = item.id ? completedLevels.includes(item.id) : false;
                return (
                  <div 
                    key={itemIdx}
                    onClick={() => !item.locked && setView(item.view)}
                    className={`p-10 rounded-[3rem] border-4 ${isCompleted ? 'bg-green-100 border-green-500 shadow-inner' : item.color} ${item.locked ? '' : 'cursor-pointer hover:-translate-y-3 hover:shadow-2xl active:scale-95'} transition-all duration-300 group flex flex-col items-center text-center`}
                  >
                    <div className="flex justify-between w-full items-start mb-8">
                      <span className="text-7xl group-hover:scale-125 transition-transform duration-300 drop-shadow-sm">{item.icon}</span>
                      {isCompleted && <span className="text-4xl animate-bounce">✅</span>}
                    </div>
                    <div className="text-[10px] font-black bg-black/5 px-3 py-1.5 rounded-lg mb-4 uppercase tracking-widest text-slate-500">
                      {item.type}
                    </div>
                    <h3 className="font-black text-2xl mb-3 leading-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-base opacity-80 font-bold leading-snug">{isCompleted ? 'Tamamlandı' : item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
