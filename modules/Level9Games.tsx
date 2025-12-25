
import React, { useState, useEffect } from 'react';

type IslandZone = 'FOREST' | 'SEA' | 'BIBI_HOUSE' | 'FRIENDSHIP_SQUARE' | 'FESTIVAL';

const Level9Games: React.FC<{ onComplete: (p: number) => void }> = ({ onComplete }) => {
  const [zone, setZone] = useState<IslandZone>('FOREST');
  const [points, setPoints] = useState(0);
  const [taskState, setTaskState] = useState<any>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  // Sub-game: Encrypted Forest (Simple Password Builder)
  const renderForest = () => {
    const pieces = [
      { id: 'num', icon: '🔢', label: 'Rakam' },
      { id: 'let', icon: '🔤', label: 'Harf' },
      { id: 'emo', icon: '💎', label: 'Sembol' }
    ];

    const selected = taskState.selected || [];
    const isStrong = selected.length === 3;

    const handleSelect = (id: string) => {
      if (selected.includes(id)) return;
      const next = [...selected, id];
      setTaskState({ ...taskState, selected: next });
      if (next.length === 3) {
        setFeedback("Vay canına! Çok güçlü bir anahtar oluşturdun! 🗝️ Sandık açılıyor...");
      }
    };

    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-emerald-50 p-8 rounded-[3rem] border-4 border-emerald-200">
          <div className="text-7xl mb-4">🏝️</div>
          <h4 className="text-2xl font-black text-emerald-900 mb-2">Şifreli Orman</h4>
          <p className="text-emerald-700 italic">"Pixi'nin kilitli sandığını açmak için parçaları topla!"</p>
        </div>

        <div className="flex justify-center gap-6">
          {pieces.map(p => (
            <button 
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`w-28 h-28 rounded-3xl shadow-xl flex flex-col items-center justify-center transition-all ${selected.includes(p.id) ? 'bg-emerald-500 text-white scale-90' : 'bg-white text-emerald-600 hover:scale-110'}`}
            >
              <div className="text-4xl">{p.icon}</div>
              <div className="text-[10px] font-black uppercase mt-1">{p.label}</div>
            </button>
          ))}
        </div>

        <div className="h-24 flex items-center justify-center">
          <div className={`text-9xl transition-all duration-700 ${isStrong ? 'opacity-100 rotate-12 scale-110' : 'opacity-30'}`}>
            {isStrong ? '🔓' : '🔒'}
          </div>
        </div>

        {isStrong && (
          <button 
            onClick={() => { setZone('SEA'); setTaskState({}); setFeedback(null); }}
            className="bg-emerald-600 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl border-b-8 border-emerald-800 animate-bounce"
          >
            DENİZE GİDELİM! 🌊
          </button>
        )}
      </div>
    );
  };

  // Sub-game: Link Bubbles Sea
  const renderSea = () => {
    const bubbles = [
      { id: 1, text: "E-Okul Girişi", safe: true, icon: '🎓' },
      { id: 2, text: "Bedava 1 Milyon Altın!", safe: false, icon: '🎁' },
      { id: 3, text: "Hava Durumu", safe: true, icon: '☀️' },
      { id: 4, text: "Seni Kim Seviyor Testi?", safe: false, icon: '❓' },
      { id: 5, text: "Kütüphane Kitapları", safe: true, icon: '📚' }
    ];

    const popped = taskState.popped || [];

    const handlePop = (b: any) => {
      if (b.safe) {
        setTaskState({ ...taskState, popped: [...popped, b.id] });
        if (popped.length + 1 === 3) setFeedback("Harika! Sadece güvenli balonları seçtin. 🎈");
      } else {
        setFeedback("Olamaz! Bu balon riskli görünüyor... Hmm, biraz daha dikkatli deneyelim 😊");
      }
    };

    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-blue-50 p-8 rounded-[3rem] border-4 border-blue-200">
          <div className="text-7xl mb-4">🌊</div>
          <h4 className="text-2xl font-black text-blue-900 mb-2">Link Balonları Denizi</h4>
          <p className="text-blue-700 italic">"Mino baloncukları patlatmayı seviyor ama sadece GÜVENLİ olanları!"</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {bubbles.map(b => (
            !popped.includes(b.id) && (
              <button 
                key={b.id}
                onClick={() => handlePop(b)}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shadow-lg text-white font-black text-xs p-4 flex flex-col items-center justify-center animate-float hover:scale-110 border-4 border-white/30"
              >
                <div className="text-4xl mb-2">{b.icon}</div>
                <div>{b.text}</div>
              </button>
            )
          ))}
        </div>

        {popped.length >= 3 && (
          <button 
            onClick={() => { setZone('BIBI_HOUSE'); setTaskState({}); setFeedback(null); }}
            className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl border-b-8 border-blue-800"
          >
            BİBİ'NİN EVİNE! 🤖
          </button>
        )}
      </div>
    );
  };

  // Sub-game: Bibi's House (Yapay Zeka Etiği)
  const renderBibiHouse = () => {
    const handleTeach = (correct: boolean) => {
      if (correct) {
        setTaskState({ ...taskState, done: true });
        setFeedback("Bibi dans ediyor! 🤖🎉 Ona çok güzel bir şey öğrettin.");
      } else {
        setFeedback("Bibi'nin kafası karıştı... 🤖❓ Bir daha düşünelim mi?");
      }
    };

    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-purple-50 p-8 rounded-[3rem] border-4 border-purple-200">
          <div className="text-7xl mb-4">🤖</div>
          <h4 className="text-2xl font-black text-purple-900 mb-2">Bibi’nin Öğrenme Evi</h4>
          <p className="text-purple-700 italic">"Robot Bibi sana bir soru sordu, ona doğru yolu göster!"</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-purple-100 max-w-xl mx-auto">
          <p className="text-2xl font-black text-slate-800 mb-8">"Bibi, herkesin fotoğrafını izinsiz saklamalı mı?"</p>
          <div className="grid gap-4">
             <button onClick={() => handleTeach(true)} className="p-6 bg-purple-600 text-white rounded-3xl font-black text-xl hover:bg-purple-700 shadow-lg transition-all">Hayır, sormadan asla yapmamalısın! ✋</button>
             <button onClick={() => handleTeach(false)} className="p-6 bg-slate-100 text-slate-600 rounded-3xl font-black text-xl hover:bg-slate-200">Evet, ne kadar çok veri o kadar iyi.</button>
          </div>
        </div>

        {taskState.done && (
          <button 
            onClick={() => { setZone('FRIENDSHIP_SQUARE'); setTaskState({}); setFeedback(null); }}
            className="bg-purple-600 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl border-b-8 border-purple-800 animate-bounce"
          >
            DOSTLUK MEYDANI'NA! 🧸
          </button>
        )}
      </div>
    );
  };

  // Sub-game: Friendship Square (Empathy)
  const renderSquare = () => {
    return (
      <div className="space-y-8 animate-fade-in text-center">
        <div className="bg-pink-50 p-8 rounded-[3rem] border-4 border-pink-200">
          <div className="text-7xl mb-4">🧸</div>
          <h4 className="text-2xl font-black text-pink-900 mb-2">Dostluk Meydanı</h4>
          <p className="text-pink-700 italic">"TıkTık bir mesaj yüzünden üzgün görünüyor. Ne yaparsın?"</p>
        </div>

        <div className="flex justify-center mb-10">
           <div className="text-[10rem] animate-pulse">🐢😢</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <button onClick={() => { setFeedback("🌸 TıkTık'a destek oldun! Meydan çiçek açmaya başladı."); setTaskState({done: true}); }} className="p-8 bg-pink-100 border-4 border-pink-200 rounded-[2.5rem] hover:bg-pink-500 hover:text-white transition-all">
             <div className="text-5xl mb-2">🤗</div>
             <div className="font-black uppercase text-xs">Yardım Et</div>
          </button>
          <button onClick={() => { setFeedback("🚩 Zorbalığı bildirdin. Harika bir Dijital Dostsun!"); setTaskState({done: true}); }} className="p-8 bg-indigo-100 border-4 border-indigo-200 rounded-[2.5rem] hover:bg-indigo-500 hover:text-white transition-all">
             <div className="text-5xl mb-2">🚩</div>
             <div className="font-black uppercase text-xs">Bildir</div>
          </button>
          <button onClick={() => { setFeedback("👩‍🏫 Büyüklerine söylemek çok akıllıca bir fikir!"); setTaskState({done: true}); }} className="p-8 bg-amber-100 border-4 border-amber-200 rounded-[2.5rem] hover:bg-amber-500 hover:text-white transition-all">
             <div className="text-5xl mb-2">👩‍🏫</div>
             <div className="font-black uppercase text-xs">Büyüklere Söyle</div>
          </button>
        </div>

        {taskState.done && (
          <button 
            onClick={() => { setZone('FESTIVAL'); setFeedback(null); }}
            className="bg-pink-600 text-white px-16 py-6 rounded-full font-black text-3xl shadow-xl border-b-8 border-pink-800 mt-10 animate-bounce"
          >
            FESTİVAL BAŞLASIN! 🎊
          </button>
        )}
      </div>
    );
  };

  // Final: Island Festival
  const renderFestival = () => {
    return (
      <div className="space-y-10 animate-fade-in text-center py-10">
         <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 animate-pulse scale-150"></div>
            <div className="text-[12rem] relative">🌈🎡🎊</div>
         </div>
         <h3 className="text-6xl font-black text-indigo-900 tracking-tighter">RENKLİ ADA FESTİVALİ!</h3>
         <p className="text-2xl font-bold text-slate-600 max-w-2xl mx-auto italic leading-relaxed">
           "Pixi, Bibi, TıkTık ve Mino çok mutlu! Sayende ada artık tertemiz ve güvenli bir yer."
         </p>
         <div className="bg-indigo-600 text-white p-10 rounded-[4rem] shadow-2xl border-b-[16px] border-indigo-900">
            <div className="text-5xl mb-6">🥇</div>
            <h4 className="text-3xl font-black mb-4 uppercase">DİJİTAL DOST İLAN EDİLDİN!</h4>
            <p className="text-xl font-bold opacity-80 mb-8">"Teknolojiyi doğru kullanan herkes iyi bir dijital dosttur 💙"</p>
            <button 
              onClick={() => onComplete(300)}
              className="bg-white text-indigo-900 px-16 py-6 rounded-full font-black text-3xl shadow-xl hover:bg-slate-50 transition-all active:scale-95 border-b-8 border-indigo-200"
            >
              MACERAYI BİTİR 🏆
            </button>
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-cyan-700 tracking-tight">🌈 PİXİ & ARKADAŞLARI</h2>
        <p className="text-xl text-slate-500 font-bold mt-2">DİJİTAL MACERA ADASI</p>
      </div>

      <div className="bg-white rounded-[4rem] p-12 shadow-2xl border-b-[20px] border-slate-50 min-h-[600px] flex flex-col justify-center">
        {zone === 'FOREST' && renderForest()}
        {zone === 'SEA' && renderSea()}
        {zone === 'BIBI_HOUSE' && renderBibiHouse()}
        {zone === 'FRIENDSHIP_SQUARE' && renderSquare()}
        {zone === 'FESTIVAL' && renderFestival()}

        {feedback && (
          <div className="mt-10 p-6 bg-white border-4 border-dashed border-cyan-200 rounded-[2rem] animate-fade-in shadow-sm">
             <p className="text-2xl font-black text-cyan-800">{feedback}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-12">
        {['FOREST', 'SEA', 'BIBI_HOUSE', 'FRIENDSHIP_SQUARE', 'FESTIVAL'].map((z, i) => (
          <div key={z} className={`h-4 rounded-full transition-all duration-500 ${zone === z ? 'bg-cyan-500 w-16' : 'bg-slate-200 w-4'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Level9Games;
