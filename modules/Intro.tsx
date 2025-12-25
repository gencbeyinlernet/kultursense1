
import React from 'react';

interface IntroProps {
  onStart: () => void;
}

const LogoMascotLarge = () => {
  return (
    <div className="relative w-56 h-56 md:w-64 md:h-64 animate-float group cursor-pointer">
      {/* Brain Body - Friendly & Vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-[4rem] shadow-2xl border-b-[12px] border-indigo-700 transform group-hover:scale-105 transition-transform duration-500">
        <div className="absolute top-4 left-6 w-12 h-12 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-black/5 rounded-full"></div>
      </div>
      {/* Large & Friendly Sparkling Eyes */}
      <div className="absolute top-[35%] left-[20%] w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
        <div className="w-5 h-5 bg-slate-900 rounded-full"></div>
      </div>
      <div className="absolute top-[35%] right-[20%] w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
        <div className="w-5 h-5 bg-slate-900 rounded-full"></div>
      </div>
      {/* Blushing Cheeks */}
      <div className="absolute top-[52%] left-[15%] w-10 h-5 bg-pink-300/40 rounded-full blur-md"></div>
      <div className="absolute top-[52%] right-[15%] w-10 h-5 bg-pink-300/40 rounded-full blur-md"></div>
      {/* Big Cheerful Smile */}
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-24 h-12 border-b-8 border-slate-900 rounded-full"></div>
      {/* Large Graduation Cap */}
      <div className="absolute -top-10 -right-6 transform rotate-12 drop-shadow-2xl">
        <span className="text-8xl">🎓</span>
      </div>
      {/* Sparkles of Knowledge */}
      <div className="absolute -top-4 -left-8 text-6xl animate-pulse">✨</div>
      <div className="absolute bottom-0 -right-12 text-5xl animate-bounce">💡</div>
    </div>
  );
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#f0f9ff] flex flex-col items-center py-8 px-4 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl w-full bg-white rounded-[4rem] shadow-2xl p-8 md:p-16 border-b-[16px] border-indigo-100 mb-8">
        
        <div className="text-center mb-12 flex flex-col items-center">
          <LogoMascotLarge />
          
          <h1 className="text-5xl md:text-7xl font-black text-indigo-900 mt-16 mb-4 tracking-tight">KültürSense</h1>
          <div className="h-2 w-32 bg-orange-500 mx-auto rounded-full mb-6"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 uppercase leading-tight">Oyna, Düşün, Doğruyu Seç!</h2>
        </div>

        <div className="space-y-14 text-slate-700">
          
          <div className="bg-indigo-50 p-10 rounded-[3rem] border-l-[12px] border-indigo-500 shadow-inner">
            <p className="text-xl md:text-2xl mb-10 leading-relaxed font-black text-indigo-900 text-center">
              Yapay zekâyı etik ve bilinçli kullanmayı öğrenmek için <span className="text-orange-600">15 farklı oyun türü</span> seni bekliyor!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
              {[
                { label: "Strateji", icon: "🏙️" },
                { label: "Hafıza", icon: "🧠" },
                { label: "Refleks", icon: "⚡" },
                { label: "Hikâye", icon: "📚" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-md border-2 border-indigo-100 hover:scale-110 transition-transform cursor-default">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="font-black text-slate-800 text-xs uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-10 border-t-4 border-slate-50">
             <button 
               onClick={onStart}
               className="w-full md:w-auto min-h-[84px] bg-orange-600 hover:bg-orange-500 text-white px-20 py-8 rounded-full font-black text-3xl md:text-4xl shadow-2xl transform transition-all hover:scale-105 active:scale-95 border-b-[12px] border-orange-800"
             >
               MACERAYA BAŞLA! 🚀
             </button>
          </div>
        </div>
      </div>

      {/* Tübitak Disclaimer */}
      <div className="max-w-2xl w-full px-6 text-center pb-12">
        <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed opacity-80">
          "Tübitak 2204A Proje Yarışması Kapsamında" Burak Turgut ve öğrencilerinin hazırladığı çalışmadır. 
          Herkesin kullanımına açıktır. Geliştirilmeye devam etmektedir. | 2026
        </p>
      </div>
    </div>
  );
};

export default Intro;
