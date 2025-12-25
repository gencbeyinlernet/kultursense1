
import React, { useState, useEffect } from 'react';

const Level6Games: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [cards, setCards] = useState<{ id: number; term: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [phase, setPhase] = useState<'MEMORY' | 'QUIZ'>('MEMORY');

  useEffect(() => {
    const terms = [
      "Algoritma", "Büyük Veri", "Etik", "Yapay Zeka", 
      "Makine", "Kodlama", "Bulut", "Güvenlik",
      "Gelecek", "Bilim"
    ]; // 10 pairs = 20 cards
    const deck = [...terms, ...terms].map((t, i) => ({ 
      id: i, 
      term: t, 
      flipped: false, 
      matched: false 
    }));
    setCards(deck.sort(() => Math.random() - 0.5));
  }, []);

  // HATA DÜZELTİLDİ: index parametresi artık dizideki gerçek konumu temsil ediyor.
  const handleFlip = (index: number) => {
    // Zaten 2 kart açıksa veya bu kart zaten açık/eşleşmişse işlem yapma
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flipped, index];
    setFlipped(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [idx1, idx2] = newFlippedIndices;
      if (cards[idx1].term === cards[idx2].term) {
        // Eşleşme durumu
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[idx1].matched = true;
          matchedCards[idx2].matched = true;
          setCards(matchedCards);
          setFlipped([]);
        }, 500);
      } else {
        // Eşleşmeme durumu - Kartları geri kapat
        setTimeout(() => {
          const closedCards = [...cards];
          closedCards[idx1].flipped = false;
          closedCards[idx2].flipped = false;
          setCards(closedCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const allMatched = cards.length > 0 && cards.every(c => c.matched);

  if (phase === 'QUIZ') {
    return (
      <div className="max-w-3xl mx-auto space-y-12 animate-fade-in text-center py-12">
        <div className="bg-white p-16 rounded-[4rem] shadow-2xl border-b-[16px] border-blue-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl">🧠</div>
           <div className="text-8xl mb-8 relative">🧠</div>
           <h3 className="text-4xl font-black text-slate-800 mb-6">ZİHİN GÜCÜN ARTTI!</h3>
           <p className="text-2xl font-bold text-slate-500 mb-12 leading-relaxed">
             Dijital kavramları hafızana kazıdın. Artık bir YZ kavram uzmanısın!
           </p>
           <button onClick={onComplete} className="bg-blue-600 text-white px-20 py-8 rounded-[2.5rem] font-black text-4xl shadow-2xl hover:bg-blue-700 active:scale-95 transition-all border-b-8 border-blue-900">
             GÖREVİ TAMAMLA 🏆
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in text-center pb-24">
      <div className="bg-blue-600 rounded-[3.5rem] p-10 text-white shadow-2xl border-b-[12px] border-blue-900/30">
        <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter text-shadow-sm">🔵 SEVİYE 6: KAVRAM HAFIZASI</h2>
        <p className="text-xl opacity-90 font-bold">10 Çifti Eşleştirerek Dijital Terimleri Öğren!</p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 px-2">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            onClick={() => handleFlip(index)} 
            className={`
              relative h-32 md:h-44 rounded-[2rem] border-4 cursor-pointer transition-all duration-500 
              flex items-center justify-center p-3 text-center font-black shadow-xl 
              ${card.flipped || card.matched 
                ? 'bg-white border-blue-500 text-blue-600' 
                : 'bg-gradient-to-br from-blue-400 to-indigo-500 border-white/20 text-white hover:scale-105 active:scale-95'
              }
              ${card.matched ? 'opacity-40 grayscale-[50%] scale-95 border-green-400' : ''}
            `}
          >
            {card.flipped || card.matched ? (
              <span className="text-xs md:text-xl leading-tight animate-fade-in font-black uppercase">{card.term}</span>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-5xl mb-1">🤖</span>
                <span className="text-[9px] md:text-xs uppercase tracking-widest opacity-60 font-black">KültürSense</span>
              </div>
            )}
            
            {card.matched && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm shadow-lg animate-bounce">
                ✅
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-3xl border-2 border-dashed border-blue-200 inline-block shadow-sm">
        <p className="text-blue-800 font-black text-xl uppercase tracking-tight">
          {allMatched 
            ? "Tüm kavramlar eşleşti! Harikasın! ✨" 
            : `Bulunan Çift: ${cards.filter(c => c.matched).length / 2} / 10`}
        </p>
      </div>

      {allMatched && (
        <div className="pt-8">
          <button 
            onClick={() => setPhase('QUIZ')} 
            className="bg-green-500 text-white px-20 py-8 rounded-[2.5rem] font-black text-4xl shadow-2xl animate-bounce border-b-[12px] border-green-700 hover:bg-green-600 transition-all active:scale-95"
          >
            BİLGİNİ ONAYLA! ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default Level6Games;
