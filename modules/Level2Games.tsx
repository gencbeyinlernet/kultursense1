
import React, { useState, useMemo } from 'react';

const rawScenarios = [
  {
    id: 1,
    text: "Sosyal medyada birisi seninle ilgili yanlış bir şey paylaşmış.",
    options: [
      { text: "Ben de ona yazarım", isCorrect: false },
      { text: "Aileme söylerim", isCorrect: true }
    ],
    feedback: "Kişisel saldırılara ailemize haber vererek yasal yoldan çözüm bulmalıyız. 🛡️"
  },
  {
    id: 2,
    text: "Bedava oyun parası veren bir site şifreni istiyor.",
    options: [
      { text: "Hemen veririm", isCorrect: false },
      { text: "Asla vermem", isCorrect: true }
    ],
    feedback: "Şifreler asla kimseyle paylaşılmaz, bedava vaatlere inanmamalıyız. 🔐"
  },
  {
    id: 3,
    text: "Arkadaşın birinin fotoğrafıyla dalga geçiyor.",
    options: [
      { text: "Ben de gülerim", isCorrect: false },
      { text: "Onu uyarırım", isCorrect: true }
    ],
    feedback: "Zorbalığa ortak olmamalı, arkadaşımızı nazikçe uyarmalıyız. 🤝"
  },
  {
    id: 4,
    text: "Bilmediğin bir numaradan 'Naber' diye mesaj geldi.",
    options: [
      { text: "Cevap veririm", isCorrect: false },
      { text: "Hemen engellerim", isCorrect: true }
    ],
    feedback: "Tanımadığımız kişileri hemen engellemek en güvenli yoldur. 🚫"
  },
  {
    id: 5,
    text: "Bir Yapay Zeka botu sana ödevini direkt kopyalamayı önerdi.",
    options: [
      { text: "Kopyalarım", isCorrect: false },
      { text: "Kendim yaparım", isCorrect: true }
    ],
    feedback: "Kendi emeğimizle yapmak öğrenmenin tek yoludur, Yapay Zeka sadece bir yardımcıdır. 🎓"
  },
  {
    id: 6,
    text: "Kameranın ışığı sen açmadığın halde yanıyor.",
    options: [
      { text: "Önemsemem", isCorrect: false },
      { text: "Hemen kapatırım", isCorrect: true }
    ],
    feedback: "İzin dışı kamera erişimi bir siber güvenlik açığıdır, önlem almalıyız. 🎥"
  },
  {
    id: 7,
    text: "Bir oyun sitesi yaşını 18'den büyük seçmeni istiyor.",
    options: [
      { text: "Büyük seçerim", isCorrect: false },
      { text: "Doğruyu seçerim", isCorrect: true }
    ],
    feedback: "Dijital kurallar bizi korumak için vardır, her zaman doğruyu beyan etmeliyiz. ⚖️"
  },
  {
    id: 8,
    text: "Birisi grupta senin hoşlanmadığın bir fotoğrafını attı.",
    options: [
      { text: "Ben de atarım", isCorrect: false },
      { text: "Silmesini rica ederim", isCorrect: true }
    ],
    feedback: "Saygı dijital ortamda da esastır, rahatsız olduğumuzda silinmesini istemeliyiz. 🖼️"
  },
  {
    id: 9,
    text: "Yapay Zeka ile bir ünlüye söylemediği bir şeyi söyletmek ister misin?",
    options: [
      { text: "Evet eğlenceli", isCorrect: false },
      { text: "Hayır etik değil", isCorrect: true }
    ],
    feedback: "Yapay Zeka ile dezenformasyon üretmek büyük bir etik suçtur ve başkalarına zarar verir. 🛑"
  },
  {
    id: 10,
    text: "Bedava film izleme sitesinde 10 tane reklam açıldı.",
    options: [
      { text: "Hepsine tıklarım", isCorrect: false },
      { text: "Siteden çıkarım", isCorrect: true }
    ],
    feedback: "Güvenilmeyen sitelerden hemen uzaklaşmak bizi virüslerden korur. 🌐"
  },
  {
    id: 11,
    text: "Bir arkadaşın 'kimsenin haberi yok gel buraya üye ol' dedi.",
    options: [
      { text: "Hemen giderim", isCorrect: false },
      { text: "Güvenilir mi bakarım", isCorrect: true }
    ],
    feedback: "Gizli gruplar her zaman güvenli olmayabilir, önce araştırmalıyız. 🕵️"
  },
  {
    id: 12,
    text: "Sohbet botu sana çok kaba bir cevap verdi.",
    options: [
      { text: "Ben de kaba olurum", isCorrect: false },
      { text: "Rapor ederim", isCorrect: true }
    ],
    feedback: "Kötülüğe kötülükle değil, raporlama sistemini kullanarak karşılık vermeliyiz. 📢"
  },
  {
    id: 13,
    text: "Birisi 'şifreni verirsen senin hesabını kasarız' diyor.",
    options: [
      { text: "Tamam derim", isCorrect: false },
      { text: "Şifre gizlidir", isCorrect: true }
    ],
    feedback: "Hesap güvenliği senin sorumluluğundadır, şifre asla emanet edilmez. 🔑"
  },
  {
    id: 14,
    text: "İnternette gördüğün bir haber çok saçma ama herkes paylaşıyor.",
    options: [
      { text: "Ben de paylaşırım", isCorrect: false },
      { text: "Doğruluğunu araştırırım", isCorrect: true }
    ],
    feedback: "Her gördüğümüze inanmamalı, bilginin kaynağını kontrol etmeliyiz. 📊"
  },
  {
    id: 15,
    text: "Bir oyun içi satın alma butonu 'Hemen Bas' diye parlıyor.",
    options: [
      { text: "Basarım", isCorrect: false },
      { text: "Aileme danışırım", isCorrect: true }
    ],
    feedback: "Reklamlar ve parlak butonlar seni yanıltmasın, her zaman bir büyüğüne sor. 💰"
  },
  {
    id: 16,
    text: "Arkadaşın Yapay Zeka ile birinin sesini taklit edip şaka yapacak.",
    options: [
      { text: "Çok komik olur", isCorrect: false },
      { text: "Bu yanlış bir davranış", isCorrect: true }
    ],
    feedback: "İzinsiz ses veya görüntü taklidi etik değildir ve insanların güvenini bozar. 🗣️"
  },
  {
    id: 17,
    text: "Senin adınla sahte bir hesap açılmış.",
    options: [
      { text: "Olsun meşhur olurum", isCorrect: false },
      { text: "Şikayet ederim", isCorrect: true }
    ],
    feedback: "Sahte hesapları raporlamak dijital dünyayı daha temiz bir yer yapar. 👤"
  },
  {
    id: 18,
    text: "Birisi sana 'gerçek adresini ver hediye yollayalım' diyor.",
    options: [
      { text: "Veririm", isCorrect: false },
      { text: "Adres gizli bilgidir", isCorrect: true }
    ],
    feedback: "Adres en hassas bilgindir, yabancılara asla verilmez. 📍"
  },
  {
    id: 19,
    text: "Bir sınav sorusunun cevabını Yapay Zeka'ya çözdürdün.",
    options: [
      { text: "Direkt yazarım", isCorrect: false },
      { text: "Öğrenmek için bakarım", isCorrect: true }
    ],
    feedback: "Önemli olan cevap değil, konuyu gerçekten öğrenmektir. 💡"
  },
  {
    id: 20,
    text: "Son görev: Dijital geleceğini sen mi yönetmelisin?",
    options: [
      { text: "Yapay Zeka yönetsin", isCorrect: false },
      { text: "Ben yöneteceğim!", isCorrect: true }
    ],
    feedback: "Geleceğini sen yönetmelisin, teknoloji sadece senin emrinde bir araçtır! 🚀"
  }
];

const Level2Games: React.FC<{ onComplete: (p: number) => void }> = ({ onComplete }) => {
  const shuffledScenarios = useMemo(() => {
    return [...rawScenarios]
      .sort(() => Math.random() - 0.5)
      .map(s => ({
        ...s,
        options: [...s.options].sort(() => Math.random() - 0.5)
      }));
  }, []);

  const [idx, setIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string, isCorrect: boolean } | null>(null);

  const handleChoice = (optionIdx: number) => {
    if (feedback) return;
    const isCorrect = shuffledScenarios[idx].options[optionIdx].isCorrect;
    if (isCorrect) {
      setPoints(p => p + 10);
    } else {
      setPoints(p => Math.max(0, p - 5));
    }
    setFeedback({ msg: shuffledScenarios[idx].feedback, isCorrect });
  };

  const nextStep = () => {
    setFeedback(null);
    if (idx < shuffledScenarios.length - 1) setIdx(idx + 1);
    else setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto py-12 animate-fade-in text-center">
        <div className="bg-white p-16 rounded-[4rem] shadow-2xl border-b-[16px] border-amber-500">
          <div className="text-9xl mb-8">🎯</div>
          <h2 className="text-5xl font-black text-slate-800 mb-4">SEVİYE 2 TAMAMLANDI!</h2>
          <p className="text-2xl font-bold text-slate-500 mb-12">Karar Labirentinden Başarıyla Çıktın!</p>
          <div className="bg-amber-100 text-amber-700 py-6 px-12 rounded-3xl inline-block mb-12">
            <div className="text-xs uppercase font-black tracking-widest mb-1">Kazanılan Puan</div>
            <div className="text-6xl font-black">{points}</div>
          </div>
          <br/>
          <button 
            onClick={() => onComplete(points)} 
            className="bg-amber-600 text-white px-20 py-8 rounded-[2.5rem] font-black text-3xl shadow-2xl hover:bg-amber-700 active:scale-95 transition-all"
          >
            ANA SAYFAYA DÖN 🏠
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-center px-4">
      <div className="bg-amber-500 rounded-[3rem] p-8 text-white shadow-2xl flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase">🟡 SEVİYE 2: KARAR LABİRENTİ</h2>
        <div className="bg-white/20 px-6 py-2 rounded-full font-black">{idx + 1}/20</div>
      </div>

      <div className={`bg-white p-12 rounded-[4rem] shadow-2xl border-b-[16px] border-amber-100 relative overflow-hidden transition-all ${feedback ? 'opacity-50 grayscale' : ''}`}>
        <div className="text-7xl mb-8 animate-bounce">🤔</div>
        <h3 className="text-3xl font-black text-slate-800 mb-12 leading-snug">{shuffledScenarios[idx].text}</h3>
        
        <div className="grid gap-4 max-w-2xl mx-auto">
          {shuffledScenarios[idx].options.map((opt, i) => (
            <button key={i} onClick={() => handleChoice(i)} className="p-8 rounded-[2rem] border-4 border-slate-100 hover:border-amber-400 hover:bg-amber-50 text-2xl font-black text-slate-700 transition-all text-left flex justify-between items-center group">
              <span>{opt.text}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">👉</span>
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
           <div className="bg-white rounded-[4rem] p-12 max-w-xl w-full shadow-2xl text-center border-t-[16px] border-amber-500 relative">
             <div className="text-8xl mb-6">{feedback.isCorrect ? '✅' : '🧭'}</div>
             <h4 className={`text-3xl font-black mb-6 ${feedback.isCorrect ? 'text-green-600' : 'text-amber-600'}`}>
               {feedback.isCorrect ? 'HARİKA KARAR!' : 'DOĞRU YOLU BULALIM'}
             </h4>
             <p className="text-2xl text-slate-600 font-bold mb-12 leading-relaxed">{feedback.msg}</p>
             <button 
               onClick={nextStep} 
               className="w-full bg-amber-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-amber-700 active:scale-95 transition-all border-b-8 border-amber-800"
             >
               DEVAM ET ⏭️
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Level2Games;
