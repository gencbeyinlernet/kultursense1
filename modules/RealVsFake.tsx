
import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../types';

const rawQuestions: QuizQuestion[] = [
  { id: 1, image: 'https://picsum.photos/seed/kultur1/800/600', text: "Bu fotoğraftaki kişinin ellerine dikkatli bak. Yapay zeka parmak sayısını bazen karıştırabilir. Ne görüyorsun?", options: [{ id: 'a', text: 'Gerçek bir fotoğraf', isCorrect: false }, { id: 'b', text: 'Yapay Zeka Hatası (Anatomi Bozuk)', isCorrect: true }], explanation: "Yapay Zeka bazen parmakları 6 tane çizebilir veya birbirine karıştırabilir. Bu en büyük sahtelik ipucudur! ✅" },
  { id: 2, image: 'https://picsum.photos/seed/kultur2/800/600', text: "Sana 'Bedava Oyun Parası' vaat eden bir link geldi ve linkte garip semboller var. Ne yaparsın?", options: [{ id: 'a', text: 'Hemen tıklarım', isCorrect: false }, { id: 'b', text: 'Oltalama (Phishing) - Silerim', isCorrect: true }], explanation: "Bedava hediye vaat eden linkler genellikle şifre çalmak içindir. Asla tıklama! 🛑" },
  { id: 3, image: 'https://picsum.photos/seed/kultur3/800/600', text: "Ünlü bir şarkıcı videoda konuşuyor ama sesi biraz robotik geliyor ve ağız hareketleri uyumsuz.", options: [{ id: 'a', text: 'Deepfake (Sahte Video)', isCorrect: true }, { id: 'b', text: 'Kötü İnternet', isCorrect: false }], explanation: "Ses klonlama ve yüz değiştirme teknolojileri (Deepfake) bazen bu tip senkronizasyon hataları bırakır. 🤖" },
  { id: 4, image: 'https://picsum.photos/seed/kultur4/800/600', text: "Güneş arkadan geliyor ama gölgeler öne doğru düşüyor. Sence bu mümkün mü?", options: [{ id: 'a', text: 'Gerçek Fotoğraf', isCorrect: false }, { id: 'b', text: 'Dijital Oynama / Yapay Zeka', isCorrect: true }], explanation: "Doğa kuralları asla şaşmaz! Yanlış gölgeler görselin sahte veya Yapay Zeka ürünü olduğunu kanıtlar. ☀️" },
  { id: 5, image: 'https://picsum.photos/seed/kultur5/800/600', text: "Sadece tek bir haber sitesinde 'Okullar Kapanıyor' yazıyor ama resmi sitelerde yok.", options: [{ id: 'a', text: 'Yalan Haber (Dezenformasyon)', isCorrect: true }, { id: 'b', text: 'Gizli Bilgi', isCorrect: false }], explanation: "Şaşırtıcı haberleri mutlaka resmi kaynaklardan teyit etmelisin. Bilgi kirliliğine dikkat! 📊" }
];

for(let i=6; i<=20; i++) {
  rawQuestions.push({
    id: i,
    image: `https://picsum.photos/seed/detective${i}/800/600`,
    text: `Vaka #${i}: Bu görseldeki detaylar çok bulanık ve arka plandaki yazılar anlamsız görünüyor.`,
    options: [
      { id: 'a', text: 'Yapay Zeka Üretimi', isCorrect: true },
      { id: 'b', text: 'Kötü Kamera Çekimi', isCorrect: false }
    ],
    explanation: "Yapay Zeka bazen arka plan detaylarını ve metinleri anlamsız şekillere dönüştürür. Detaylar her zaman gerçeği söyler! 🔍"
  });
}

const RealVsFake: React.FC = () => {
  // Soruları ve her sorunun kendi seçeneklerini karıştırıyoruz
  const shuffledQuestions = useMemo(() => {
    return [...rawQuestions]
      .sort(() => Math.random() - 0.5)
      .map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
  }, []);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelected(id);
    setShowResult(true);
    const correct = shuffledQuestions[currentQ].options.find(o => o.id === id)?.isCorrect;
    if (correct) setScore(s => s + 5);
  };

  const nextQuestion = () => {
    if (currentQ < shuffledQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      alert(`Dedektiflik Görevi Tamamlandı! Puanın: ${score} / 100`);
      setCurrentQ(0);
      setSelected(null);
      setShowResult(false);
      setScore(0);
    }
  };

  const question = shuffledQuestions[currentQ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12 px-2">
      <div className="bg-red-600 rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl flex flex-col md:flex-row justify-between items-center border-b-8 border-red-800">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">🕵️‍♂️ GERÇEKLİK DEDEKTİFİ</h2>
          <p className="text-sm md:text-xl font-bold opacity-90">Soru-Cevap Oyunu: Sahteyi Ayıkla!</p>
        </div>
        <div className="bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/30 text-center">
           <div className="text-[10px] font-black uppercase tracking-widest">SKOR</div>
           <div className="text-3xl font-black">{score}</div>
        </div>
      </div>
      
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border-b-[12px] border-slate-100 p-4 md:p-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-[2rem] overflow-hidden shadow-lg border-2 border-slate-50">
            <img src={question.image} alt="Kanıt" className="w-full h-[300px] md:h-[450px] object-cover" />
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full font-black text-xs shadow-lg">#{question.id}</div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100">
               <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">{question.text}</h3>
            </div>
            
            <div className="grid gap-3">
              {question.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`min-h-[64px] p-5 rounded-2xl border-4 text-left font-black text-lg transition-all ${
                    showResult 
                      ? opt.isCorrect 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : selected === opt.id ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-50 opacity-30'
                      : 'border-slate-100 hover:border-red-400 hover:bg-red-50 text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${showResult && opt.isCorrect ? 'bg-green-500 text-white' : 'bg-slate-200'}`}>
                      {opt.id.toUpperCase()}
                    </span>
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-indigo-600 p-6 rounded-[2.5rem] text-white animate-fade-in shadow-xl">
                <h4 className="font-black mb-1 text-indigo-200 uppercase tracking-widest text-[10px]">💡 ÖĞRETİCİ GERİ BİLDİRİM:</h4>
                <p className="text-lg font-bold leading-relaxed mb-6">{question.explanation}</p>
                <button onClick={nextQuestion} className="w-full bg-white text-indigo-600 py-4 rounded-xl font-black shadow-lg active:scale-95 transition-all">
                  DEVAM ET ⏭️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealVsFake;
