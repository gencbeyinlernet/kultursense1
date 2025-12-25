
import React, { useState } from 'react';

type LumiZone = 'WHISPER_FOREST' | 'GLITTER_SEA' | 'LEARNING_HOUSE' | 'HEART_SQUARE' | 'FESTIVAL';

const Level10Games: React.FC<{ onComplete: (p: number) => void }> = ({ onComplete }) => {
  const [zone, setZone] = useState<LumiZone>('WHISPER_FOREST');
  const [taskState, setTaskState] = useState<any>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // characters: Lumi 🌟, Zeki 🤖, Mimi 🐰, Poko 🐢

  const renderForest = () => {
    const handleChoice = (isPrivate: boolean) => {
      if (isPrivate) {
        setIsDark(true);
        setFeedback("Eyvah! Orman biraz karardı... 🌲🌑 Çiçeklere her bilgiyi söylememeliyiz. Sırlarımız bize özeldir!");
        setTimeout(() => setIsDark(false), 2000);
      } else {
        setTaskState({ done: true });
        setFeedback("Harika! Nazikçe reddederek kendini korudun. 🌟 Işıklar parlamaya devam ediyor!");
      }
    };

    return (
      <div className={`space-y-8 animate-fade-in text-center transition-colors duration-1000 ${isDark ? 'bg-slate-900 p-8 rounded-[3rem]' : ''}`}>
        <div className="bg-emerald-50 p-8 rounded-[3rem] border-4 border-emerald-200">
          <div className="text-7xl mb-4">🌳🌸</div>
          <h4 className="text-2xl font-black text-emerald-900 mb-2">Fısıltı Ormanı</h4>
          <p className="text-emerald-700 italic">"Konuşan çiçekler Lumi'ye sorular soruyor. Dikkatli ol!"</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-emerald-100 max-w-xl mx-auto">
          <p className="text-2xl font-black text-slate-800 mb-8">"Lumi, adını ve ev adresini bize söyler misin? Çok merak ediyoruz! 🌸"</p>
          <div className="grid gap-4">
             <button onClick={() => handleChoice(true)} className="p-6 bg-slate-100 text-slate-600 rounded-3xl font-black text-xl hover:bg-slate-200 transition-all">Tabii ki söylerim, siz çok tatlısınız!</button>
             <button onClick={() => handleChoice(false)} className="p-6 bg-emerald-600 text-white rounded-3xl font-black text-xl hover:bg-emerald-700 shadow-lg transition-all">Hayır, bu bilgiler bana özeldir. Üzgünüm! ✋</button>
          </div>
        </div>

        {taskState.done && (
          <button 
            onClick={() => { setZone('GLITTER_SEA'); setTaskState({}); setFeedback(null); }}
            className="bg-emerald-600 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl border-b-8 border-emerald-800 animate-bounce mt-8"
          >
            DENİZE DOĞRU! 🌊
          </button>
        )}
      </div>
    );
  };

  const renderSea = () => {
    const handleAction = (correct: boolean) => {
      if (correct) {
        setTaskState({ done: true });
        setFeedback("Tebrikler! Mimi aceleci davrandı ama sen onu durdurdun. Güvenli olmayan linkler adaya zarar verebilir! 🌊✅");
      } else {
        setFeedback("Eyvah! Mimi hemen tıkladı ve küçük bir virüs dalgası geldi. 🌊🆘 Bir dahaki sefere daha dikkatli olalım!");
      }
    };

    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-cyan-50 p-8 rounded-[3rem] border-4 border-cyan-200">
          <div className="text-7xl mb-4">🌊⛵</div>
          <h4 className="text-2xl font-black text-cyan-900 mb-2">Parıltılı Link Denizi</h4>
          <p className="text-cyan-700 italic">"Mimi denizde yüzen parlayan bir kutu gördü. Üstünde 'Tıkla ve Kazan' yazıyor!"</p>
        </div>

        <div className="flex justify-center mb-8">
           <div className="text-8xl animate-float">🐰🚤🎁</div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-cyan-100 max-w-xl mx-auto">
          <p className="text-2xl font-black text-slate-800 mb-8">"Mimi hemen tıklamak istiyor! Ne yapmalısın?"</p>
          <div className="grid gap-4">
             <button onClick={() => handleAction(true)} className="p-6 bg-cyan-600 text-white rounded-3xl font-black text-xl hover:bg-cyan-700 shadow-lg">Dur! Önce bir büyüklere soralım veya linki kontrol edelim. 🔍</button>
             <button onClick={() => handleAction(false)} className="p-6 bg-slate-100 text-slate-600 rounded-3xl font-black text-xl hover:bg-slate-200">Hemen açalım, belki içinde altın vardır! 🎁</button>
          </div>
        </div>

        {taskState.done && (
          <button 
            onClick={() => { setZone('LEARNING_HOUSE'); setTaskState({}); setFeedback(null); }}
            className="bg-cyan-600 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl border-b-8 border-cyan-800 animate-bounce mt-8"
          >
            ZEKİ'Yİ EĞİTELİM! 🤖
          </button>
        )}
      </div>
    );
  };

  const renderLearningHouse = () => {
    const handleTeach = (correct: boolean) => {
      if (correct) {
        setTaskState({ done: true });
        setFeedback("Zeki çok mutlu! 🤖🎉 İnsanların kararlarının her zaman daha önemli olduğunu öğrendi. 'Senin denetimin benim için rehber' diyor!");
      } else {
        setFeedback("Zeki'nin ışıkları söndü... 🤖🔇 Makineler her zaman doğruyu bilemez, senin rehberliğine ihtiyacı var!");
      }
    };

    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-indigo-50 p-8 rounded-[3rem] border-4 border-indigo-200">
          <div className="text-7xl mb-4">🤖🎓</div>
          <h4 className="text-2xl font-black text-indigo-900 mb-2">Zeki’nin Öğrenme Evi</h4>
          <p className="text-indigo-700 italic">"Zeki bir Yapay Zeka robotu. Ona doğruyu sen öğretmelisin."</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-indigo-100 max-w-xl mx-auto">
          <p className="text-2xl font-black text-slate-800 mb-8">Zeki Soruyor: "İnternette gördüğüm her bilgiyi doğru kabul edip kaydedeyim mi? 🤖"</p>
          <div className="grid gap-4">
             <button onClick={() => handleTeach(true)} className="p-6 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:bg-indigo-700 shadow-lg">Hayır! Önce doğruluğunu kontrol etmelisin. 🧐</button>
             <button onClick={() => handleTeach(false)} className="p-6 bg-slate-100 text-slate-600 rounded-3xl font-black text-xl hover:bg-slate-200">Evet, ne kadar çok bilgi o kadar zekice! 📚</button>
          </div>
        </div>

        {taskState.done && (
          <button 
            onClick={() => { setZone('HEART_SQUARE'); setTaskState({}); setFeedback(null); }}
            className="bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl border-b-8 border-indigo-800 animate-bounce mt-8"
          >
            KALP MEYDANI'NA! ❤️
          </button>
        )}
      </div>
    );
  };

  const renderHeartSquare = () => {
    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-red-50 p-8 rounded-[3rem] border-4 border-red-200">
          <div className="text-7xl mb-4">🧸❤️</div>
          <h4 className="text-2xl font-black text-red-900 mb-2">Kalp Meydanı</h4>
          <p className="text-red-700 italic">"Mimi ona gelen kırıcı bir mesaj yüzünden çok üzgün. Lumi olarak ne yaparsın?"</p>
        </div>

        <div className="flex justify-center mb-10">
           <div className="text-[10rem] animate-pulse">🐰😢</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <button onClick={() => { setFeedback("🌸 Mimi'ye sarıldın ve yalnız olmadığını söyledin. Meydan çiçek açtı!"); setTaskState({done: true}); }} className="p-8 bg-red-100 border-4 border-red-200 rounded-[2.5rem] hover:bg-red-500 hover:text-white transition-all">
             <div className="text-5xl mb-2">🤗</div>
             <div className="font-black uppercase text-xs">Destek Ol</div>
          </button>
          <button onClick={() => { setFeedback("🚩 Kötü mesajı hemen yetkililere bildirdin. Harika bir Dijital Muhafızsın!"); setTaskState({done: true}); }} className="p-8 bg-slate-800 border-4 border-slate-900 rounded-[2.5rem] hover:bg-black text-white transition-all">
             <div className="text-5xl mb-2">🚩</div>
             <div className="font-black uppercase text-xs">Bildir</div>
          </button>
          <button onClick={() => { setFeedback("👨‍🏫 Poko ile birlikte durumu öğretmenine anlattın. En güvenli yolu seçtin!"); setTaskState({done: true}); }} className="p-8 bg-amber-100 border-4 border-amber-200 rounded-[2.5rem] hover:bg-amber-500 hover:text-white transition-all">
             <div className="text-5xl mb-2">👨‍🏫</div>
             <div className="font-black uppercase text-xs">Büyüklere Sor</div>
          </button>
        </div>

        {taskState.done && (
          <button 
            onClick={() => { setZone('FESTIVAL'); setFeedback(null); }}
            className="bg-red-600 text-white px-16 py-6 rounded-full font-black text-3xl shadow-xl border-b-8 border-red-800 mt-10 animate-bounce"
          >
            IŞIK ADASI FESTİVALİ! 🌈
          </button>
        )}
      </div>
    );
  };

  const renderFestival = () => {
    return (
      <div className="space-y-10 animate-fade-in text-center py-10">
         <div className="relative inline-block">
            <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-30 animate-pulse scale-150"></div>
            <div className="text-[12rem] relative">🏰✨🌈</div>
         </div>
         <h3 className="text-6xl font-black text-indigo-900 tracking-tighter">IŞIK ADASI KURTARILDI!</h3>
         <p className="text-2xl font-bold text-slate-600 max-w-2xl mx-auto italic leading-relaxed">
           "Zeki, Mimi ve Poko artık çok mutlu! Lumi'nin rehberliğinde ada eskisinden daha parlak."
         </p>
         <div className="bg-amber-500 text-white p-10 rounded-[4rem] shadow-2xl border-b-[16px] border-amber-700">
            <div className="text-5xl mb-6">👑</div>
            <h4 className="text-3xl font-black mb-4 uppercase">IŞIK ADASI'NIN DİJİTAL REHBERİ!</h4>
            <p className="text-xl font-bold opacity-80 mb-8">"Yapay zekâ yardım eder, ama doğruyu her zaman insanlar seçer 💙"</p>
            <button 
              onClick={() => onComplete(400)}
              className="bg-white text-amber-600 px-16 py-6 rounded-full font-black text-3xl shadow-xl hover:bg-slate-50 transition-all active:scale-95 border-b-8 border-amber-200"
            >
              MACERAYI TAMAMLA 🏆
            </button>
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-amber-600 tracking-tight">🌟 LUMİ VE IŞIK ADASI</h2>
        <p className="text-xl text-slate-500 font-bold mt-2">AKILLI YARDIMCILAR, DOĞRU SEÇİMLER</p>
      </div>

      <div className="bg-white rounded-[4rem] p-12 shadow-2xl border-b-[20px] border-slate-50 min-h-[650px] flex flex-col justify-center">
        {zone === 'WHISPER_FOREST' && renderForest()}
        {zone === 'GLITTER_SEA' && renderSea()}
        {zone === 'LEARNING_HOUSE' && renderLearningHouse()}
        {zone === 'HEART_SQUARE' && renderHeartSquare()}
        {zone === 'FESTIVAL' && renderFestival()}

        {feedback && (
          <div className="mt-10 p-6 bg-white border-4 border-dashed border-amber-200 rounded-[2rem] animate-fade-in shadow-sm">
             <p className="text-2xl font-black text-amber-800">{feedback}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-12">
        {['WHISPER_FOREST', 'GLITTER_SEA', 'LEARNING_HOUSE', 'HEART_SQUARE', 'FESTIVAL'].map((z, i) => (
          <div key={z} className={`h-4 rounded-full transition-all duration-500 ${zone === z ? 'bg-amber-500 w-16' : 'bg-slate-200 w-4'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Level10Games;
