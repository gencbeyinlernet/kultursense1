
import React, { useState, useEffect, useRef } from 'react';

interface FallingItem {
  id: number;
  x: number;
  type: 'GOOD' | 'BAD' | 'GOLD';
  startTime: number;
  speed: number;
}

const Level5Games: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [catches, setCatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [shake, setShake] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const typeRand = Math.random();
      let type: 'GOOD' | 'BAD' | 'GOLD' = 'GOOD';
      if (typeRand < 0.35) type = 'BAD';
      else if (typeRand > 0.92) type = 'GOLD';

      setItems(prev => [
        ...prev, 
        { 
          id: Date.now() + Math.random(), 
          x: Math.random() * 85 + 7.5, 
          type: type,
          startTime: Date.now(),
          speed: 3 + Math.random() * 2 // Variable speeds
        }
      ]);
    }, 900);

    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setItems(prev => prev.filter(item => now - item.startTime < 5000));
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  const catchItem = (id: number, type: 'GOOD' | 'BAD' | 'GOLD') => {
    if (type === 'BAD') {
      setScore(s => Math.max(0, s - 50));
      setCombo(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      const points = type === 'GOLD' ? 50 : 10;
      setScore(s => s + points + (combo * 2));
      setCatches(c => type === 'GOLD' ? c + 2 : c + 1);
      setCombo(prev => prev + 1);
    }
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const isCompleted = catches >= 20;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-center px-4 pb-12">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl border-b-8 border-indigo-950">
        <h2 className="text-3xl md:text-4xl font-black mb-1 uppercase tracking-tight">🟣 SEVİYE 5: VERİ AYIKLAMA</h2>
        <p className="text-lg font-bold opacity-80">Güvenli Verileri (💎) Topla, Virüslerden (💣) Kaç!</p>
      </div>
      
      <div 
        ref={gameAreaRef}
        className={`relative h-[650px] bg-slate-950 rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-purple-500/30 transition-transform ${shake ? 'animate-shake' : ''}`}
      >
        {/* Modernized Background DATA text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
           <div className="text-[15rem] font-black text-white/[0.03] leading-none mb-[-2rem]">DATA</div>
           <div className="text-[15rem] font-black text-white/[0.03] leading-none">STREAM</div>
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Top HUD */}
        <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-2xl text-white shadow-xl">
               <div className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Digital Score</div>
               <div className="text-3xl font-black">{score.toLocaleString()}</div>
            </div>
            {combo > 1 && (
              <div className="animate-bounce bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter self-start shadow-lg">
                COMBO x{combo} 🔥
              </div>
            )}
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-3xl text-white shadow-xl min-w-[160px]">
             <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-purple-400">Integrity</span>
                <span className="text-lg font-black">{Math.min(100, Math.floor((catches/20)*100))}%</span>
             </div>
             <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500" style={{ width: `${Math.min(100, (catches/20)*100)}%` }}></div>
             </div>
             <div className="mt-2 text-[10px] font-bold text-center opacity-60 uppercase">{catches} / 20 Verified</div>
          </div>
        </div>
        
        {/* Falling Items */}
        {items.map(item => (
          <button 
            key={item.id}
            onClick={() => catchItem(item.id, item.type)}
            className={`absolute text-6xl md:text-7xl transform -translate-x-1/2 transition-transform hover:scale-125 active:scale-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
            style={{ 
              left: `${item.x}%`,
              animation: `fall ${item.speed}s linear forwards`
            }}
          >
            {item.type === 'GOOD' ? '💎' : item.type === 'GOLD' ? '🌟' : '💣'}
          </button>
        ))}

        {isCompleted && (
          <div className="absolute inset-0 bg-indigo-900/95 flex flex-col items-center justify-center p-12 text-white z-20 animate-fade-in backdrop-blur-sm">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="text-[10rem] relative animate-bounce">🎓</div>
            </div>
            <h3 className="text-6xl font-black mb-2 tracking-tighter">DATA MASTER!</h3>
            <p className="text-2xl font-bold mb-10 opacity-80 max-w-md">Tüm kritik verileri güvenli bir şekilde ayıkladın ve sisteme yükledin.</p>
            
            <div className="flex gap-4">
              <button 
                onClick={onComplete} 
                className="bg-white text-indigo-900 px-16 py-6 rounded-[2.5rem] font-black text-3xl shadow-2xl transform transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-200"
              >
                GÖREVİ BİTİR 🚀
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
         <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-indigo-100">
            <span className="text-3xl block mb-1">💎</span>
            <span className="text-[10px] font-black text-indigo-600 uppercase">Standard Data</span>
         </div>
         <div className="bg-amber-50 p-4 rounded-3xl shadow-md border-b-4 border-amber-200">
            <span className="text-3xl block mb-1">🌟</span>
            <span className="text-[10px] font-black text-amber-700 uppercase">Premium Data</span>
         </div>
         <div className="bg-red-50 p-4 rounded-3xl shadow-md border-b-4 border-red-200">
            <span className="text-3xl block mb-1">💣</span>
            <span className="text-[10px] font-black text-red-700 uppercase">Malware / Virus</span>
         </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { top: -100px; transform: translateX(-50%) rotate(0deg); }
          100% { top: 110%; transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 0); }
          20%, 40%, 60%, 80% { transform: translate(10px, 0); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default Level5Games;
