
import React, { useState, useEffect, useMemo } from 'react';

interface MatchItem {
  id: number;
  word: string;
  meaning: string;
}

const MATCH_DATA: MatchItem[] = [
  { id: 1, word: "Dijital Okuryazarlık", meaning: "Teknolojiyi güvenli ve etkili kullanma becerisi." },
  { id: 2, word: "Yapay Zeka", meaning: "İnsan zekasını taklit eden bilgisayar sistemleri." },
  { id: 3, word: "Etik", meaning: "Doğru ve yanlışı ayırt etmemizi sağlayan ahlaki kurallar." },
  { id: 4, word: "Algoritma", meaning: "Bir sorunu çözmek için izlenen adım adım yol." },
  { id: 5, word: "Siber Zorbalık", meaning: "Dijital araçları kullanarak başkalarına zarar verme." },
  { id: 6, word: "Veri Gizliliği", meaning: "Kişisel bilgilerin izinsiz paylaşılmasını önleme." },
  { id: 7, word: "Büyük Veri", meaning: "Dijital dünyada toplanan devasa miktardaki bilgi." },
  { id: 8, word: "Oltalama (Phishing)", meaning: "Sahte mesajlarla şifre çalmaya çalışma tuzağı." },
  { id: 9, word: "Deepfake", meaning: "Yapay zeka ile üretilen sahte ses ve görüntüler." },
  { id: 10, word: "Bulut Bilişim", meaning: "Verileri internet üzerindeki sunucularda saklama." }
];

const Level8Games: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; type: 'SUCCESS' | 'ERROR' } | null>(null);

  // Sayfa yüklendiğinde listeleri karıştırıyoruz
  const shuffledWords = useMemo(() => 
    [...MATCH_DATA].sort(() => Math.random() - 0.5), []
  );
  
  const shuffledMeanings = useMemo(() => 
    [...MATCH_DATA].sort(() => Math.random() - 0.5), []
  );

  const handleSelectWord = (id: number) => {
    if (matches.includes(id)) return;
    setSelectedWord(id);
    checkMatch(id, selectedMeaning);
  };

  const handleSelectMeaning = (id: number) => {
    if (matches.includes(id)) return;
    setSelectedMeaning(id);
    checkMatch(selectedWord, id);
  };

  const checkMatch = (wordId: number | null, meaningId: number | null) => {
    if (wordId !== null && meaningId !== null) {
      if (wordId === meaningId) {
        setMatches(prev => [...prev, wordId]);
        setFeedback({ text: "Harika! Doğru eşleşme. 🌟", type: 'SUCCESS' });
        setSelectedWord(null);
        setSelectedMeaning(null);
      } else {
        setFeedback({ text: "Hatalı eşleşme, tekrar dene! 🧐", type: 'ERROR' });
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedMeaning(null);
        }, 1000);
      }
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const isCompleted = matches.length === MATCH_DATA.length;

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in text-center px-4 pb-24">
      <div className="bg-gray-900 rounded-[3.5rem] p-10 text-white shadow-2xl border-4 border-gray-700">
        <h2 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter">⚫ SEVİYE 8: DİJİTAL KAVRAM EŞLEŞTİRME</h2>
        <p className="text-xl opacity-90 font-bold">Kelimeleri Doğru Anlamlarıyla Eşleştirerek Görevi Tamamla!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        {/* Sol Sütun: Kelimeler */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-6">Kavramlar</h3>
          {shuffledWords.map(item => (
            <button
              key={item.id}
              disabled={matches.includes(item.id)}
              onClick={() => handleSelectWord(item.id)}
              className={`w-full p-6 rounded-2xl font-black text-xl transition-all shadow-md transform active:scale-95 border-b-8 ${
                matches.includes(item.id) 
                  ? 'bg-green-100 text-green-700 border-green-500 opacity-50 cursor-default' 
                  : selectedWord === item.id 
                    ? 'bg-indigo-600 text-white border-indigo-800 scale-105' 
                    : 'bg-white text-gray-700 hover:bg-indigo-50 border-slate-200'
              }`}
            >
              {item.word} {matches.includes(item.id) && '✅'}
            </button>
          ))}
        </div>

        {/* Sağ Sütun: Anlamlar */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-6">Anlamlar</h3>
          {shuffledMeanings.map(item => (
            <button
              key={item.id}
              disabled={matches.includes(item.id)}
              onClick={() => handleSelectMeaning(item.id)}
              className={`w-full p-6 rounded-2xl font-bold text-lg transition-all shadow-md transform active:scale-95 border-b-8 text-left ${
                matches.includes(item.id) 
                  ? 'bg-green-100 text-green-700 border-green-500 opacity-50 cursor-default' 
                  : selectedMeaning === item.id 
                    ? 'bg-indigo-600 text-white border-indigo-800 scale-105' 
                    : 'bg-white text-gray-700 hover:bg-indigo-50 border-slate-200'
              }`}
            >
              {item.meaning}
            </button>
          ))}
        </div>

        {/* Feedback Popup */}
        {feedback && (
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-8 rounded-[2.5rem] border-4 shadow-2xl animate-bounce ${
            feedback.type === 'SUCCESS' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'
          }`}>
            <p className="text-3xl font-black">{feedback.text}</p>
          </div>
        )}
      </div>

      <div className="mt-12 bg-white/50 p-6 rounded-3xl border-2 border-dashed border-gray-300 inline-block">
        <p className="text-2xl font-black text-gray-600">
          İlerleme: {matches.length} / {MATCH_DATA.length}
        </p>
      </div>

      {isCompleted && (
        <div className="animate-fade-in pt-12 space-y-8">
           <div className="bg-amber-50 p-12 rounded-[4rem] border-4 border-amber-200 shadow-inner">
              <h3 className="text-5xl font-black text-amber-900 mb-4">MÜKEMMEL BİLGİ! 🏆</h3>
              <p className="text-2xl font-bold text-amber-700 italic">"Dijital dünyayı yöneten kavramları artık bir uzman gibi biliyorsun."</p>
           </div>
           <button 
              onClick={onComplete} 
              className="bg-gray-900 text-white px-24 py-10 rounded-[3rem] font-black text-5xl shadow-2xl hover:bg-black transform transition-all hover:scale-110 active:scale-95 border-b-[16px] border-black/40"
           >
              GÖREVİ TAMAMLA! 🏁
           </button>
        </div>
      )}
    </div>
  );
};

export default Level8Games;
