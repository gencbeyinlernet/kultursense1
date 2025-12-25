
import React, { useState, useMemo } from 'react';

const rawDialogues = [
  {
    id: 1,
    char: "Arda",
    text: "Yapay Zeka ile senin sahte videonu yapmışlar!",
    options: [
      { text: "Gülüp geçelim", isCorrect: false },
      { text: "Hemen raporlayalım", isCorrect: true }
    ],
    feedback: "Sahte videoları durdurmanın yolu raporlamak ve kimseye yaymamaktır. 🛡️"
  },
  {
    id: 2,
    char: "Zeynep",
    text: "Bu ödevi Yapay Zeka'ye mi yaptırsam?",
    options: [
      { text: "Evet çok kolay", isCorrect: false },
      { text: "Hayır, öğrenmelisin", isCorrect: true }
    ],
    feedback: "Yapay Zeka senin yerine ödev yapmaz, sadece senin konuyu anlamana yardım eder. 🎓"
  },
  {
    id: 3,
    char: "Can",
    text: "Birisi grupta çok kaba konuşuyor.",
    options: [
      { text: "Sen de ona yaz", isCorrect: false },
      { text: "Admin'e söyle", isCorrect: true }
    ],
    feedback: "Nezaket dijitalde de kuraldır, zorbalığı mutlaka yetkiliye bildir. 🤝"
  },
  {
    id: 4,
    char: "Ece",
    text: "Sence şifrem '123456' olsa kolay mı olur?",
    options: [
      { text: "Evet iyidir", isCorrect: false },
      { text: "Hayır, çok zayıf", isCorrect: true }
    ],
    feedback: "Sıralı sayılar en kolay tahmin edilen şifrelerdir, karmaşık olanları seç. 🔐"
  },
  {
    id: 5,
    char: "Mert",
    text: "Bu linke tıklarsam bedava altın verir mi?",
    options: [
      { text: "Kesin verir", isCorrect: false },
      { text: "Sakın tıklama", isCorrect: true }
    ],
    feedback: "Bedava vaadi bir oltalama yöntemidir, asla şüpheli linklere tıklama. 🛑"
  },
  {
    id: 6,
    char: "Selin",
    text: "Yapay Zeka her şeyi bilir mi sence?",
    options: [
      { text: "Kesinlikle bilir", isCorrect: false },
      { text: "Bazen hata yapar", isCorrect: true }
    ],
    feedback: "Yapay Zeka sadece verileri birleştirir, her zaman doğru söylemeyebilir. 🤖"
  },
  {
    id: 7,
    char: "Ali",
    text: "Kameramı bantlamalı mıyım?",
    options: [
      { text: "Gerek yok", isCorrect: false },
      { text: "Güvenlik için iyi olur", isCorrect: true }
    ],
    feedback: "Kamera fiziksel bir güvenlik açığıdır, kullanılmadığında kapatmak iyidir. 📷"
  },
  {
    id: 8,
    char: "Deniz",
    text: "Fotoğrafıma çok kötü yorum gelmiş.",
    options: [
      { text: "Sen de ona yaz", isCorrect: false },
      { text: "Salla gitsin / Engelle", isCorrect: true }
    ],
    feedback: "Siber zorbaları engellemek ve umursamamak onları durdurmanın en iyi yoludur. 🚫"
  },
  {
    id: 9,
    char: "Pelin",
    text: "Bu haber doğru mu acaba?",
    options: [
      { text: "Hemen inan", isCorrect: false },
      { text: "Kaynağına bak", isCorrect: true }
    ],
    feedback: "Haberlerin kaynağını doğrulamak (teyit etmek) bir dijital okuryazarlık kuralıdır. 📊"
  },
  {
    id: 10,
    char: "Barış",
    text: "Özel bilgilerimi Yapay Zeka botuna yazayım mı?",
    options: [
      { text: "Tabii, sırdaş olur", isCorrect: false },
      { text: "Hayır, verin çalınır", isCorrect: true }
    ],
    feedback: "Yapay Zeka şirketleri bu verileri depolayabilir, özel sırlar asla yazılmaz. 🔑"
  },
  {
    id: 11,
    char: "Su",
    text: "Oyun oynamaktan uykum geldi ama devam etsem mi?",
    options: [
      { text: "Biraz daha oyna", isCorrect: false },
      { text: "Hemen dinlen", isCorrect: true }
    ],
    feedback: "Dijital denge sağlığımız için kritiktir, ekran başından kalkmayı bilmelisin. 🧘"
  },
  {
    id: 12,
    char: "Kaan",
    text: "Bu şarkının bestesi çalıntı olabilir mi?",
    options: [
      { text: "Kimse anlamaz", isCorrect: false },
      { text: "Telif hakkı önemlidir", isCorrect: true }
    ],
    feedback: "Başkalarının eserlerini izinsiz kullanmak emeğe saygısızlıktır. ⚖️"
  },
  {
    id: 13,
    char: "Lale",
    text: "Kendi Yapay Zeka modelimi yapmak istiyorum, çok mu zor?",
    options: [
      { text: "Çok zor vazgeç", isCorrect: false },
      { text: "Adım adım öğrenebilirsin", isCorrect: true }
    ],
    feedback: "Yapay Zeka öğrenmek bir yolculuktur, her gün bir şeyler öğrenerek başarabilirsin. 🚀"
  },
  {
    id: 14,
    char: "Bora",
    text: "Deepfake nedir biliyor musun?",
    options: [
      { text: "Derin sahtelik", isCorrect: true },
      { text: "Bir tür oyun", isCorrect: false }
    ],
    feedback: "Deepfake, gerçeği çarpıtmak için yapılan sahte içerik teknolojisidir. 🕵️"
  },
  {
    id: 15,
    char: "İpek",
    text: "Dijital ayak izi ne demek?",
    options: [
      { text: "Ayakkabı izi", isCorrect: false },
      { text: "Dijital geçmişin", isCorrect: true }
    ],
    feedback: "Dijital ayak izi, internetteki her hareketinin bıraktığı kalıcı hasardır. 👣"
  },
  {
    id: 16,
    char: "Umut",
    text: "İnternette herkes dürüst müdür?",
    options: [
      { text: "Evet herkes iyi", isCorrect: false },
      { text: "Hayır, dikkatli olmalısın", isCorrect: true }
    ],
    feedback: "İnternette her profil gerçek değildir, her zaman mesafeli olmalısın. 🌍"
  },
  {
    id: 17,
    char: "Melis",
    text: "Yapay Zeka öğretmenimin yerini tutabilir mi?",
    options: [
      { text: "Kesinlikle evet", isCorrect: false },
      { text: "Sadece bir araçtır", isCorrect: true }
    ],
    feedback: "Yapay Zeka bir bilgidir ama öğretmen bir sevgidir, empati yeteneği yoktur. ❤️"
  },
  {
    id: 18,
    char: "Cem",
    text: "Bu site güvenli mi nasıl anlarım?",
    options: [
      { text: "Güzel duruyorsa", isCorrect: false },
      { text: "Adresine ve kilide bak", isCorrect: true }
    ],
    feedback: "HTTPS ve kilit simgesi güvenliğin ilk işaretleridir, her zaman kontrol et. 🔐"
  },
  {
    id: 19,
    char: "Azra",
    text: "Sosyal medya beni mutsuz ediyor.",
    options: [
      { text: "Daha çok gir", isCorrect: false },
      { text: "Biraz ara ver", isCorrect: true }
    ],
    feedback: "Duygusal sağlığın için sosyal medyaya ara vermek en iyi çözümdür. ✨"
  },
  {
    id: 20,
    char: "Bilge",
    text: "Son soru: Teknoloji etik olmalı mı?",
    options: [
      { text: "Gerek yok", isCorrect: false },
      { text: "Evet, en önemli kural!", isCorrect: true }
    ],
    feedback: "Etik olmayan bir teknoloji, insanlığa fayda değil zarar getirir! 🏆"
  }
];

const Level3Games: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const shuffledDialogues = useMemo(() => {
    return [...rawDialogues]
      .sort(() => Math.random() - 0.5)
      .map(d => ({
        ...d,
        options: [...d.options].sort(() => Math.random() - 0.5)
      }));
  }, []);

  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<{ msg: string, isCorrect: boolean } | null>(null);

  const handleChoice = (i: number) => {
    if (feedback) return;
    const isCorrect = shuffledDialogues[step].options[i].isCorrect;
    setFeedback({ msg: shuffledDialogues[step].feedback, isCorrect });
  };

  const nextDialogue = () => {
    setFeedback(null);
    if (step < shuffledDialogues.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-center px-4">
      <div className="bg-orange-600 rounded-[3rem] p-8 text-white shadow-2xl flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-tight">🟠 SEVİYE 3: ETİK SOHBETLER</h2>
        <div className="bg-white/20 px-6 py-2 rounded-full font-black">{step + 1}/20</div>
      </div>

      <div className={`bg-white p-12 rounded-[4rem] shadow-2xl border-b-[16px] border-orange-100 flex flex-col items-center transition-all ${feedback ? 'opacity-40 grayscale' : ''}`}>
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-white">👤</div>
          <div className="absolute -bottom-2 bg-orange-600 text-white px-4 py-1 rounded-full font-black text-sm uppercase">{shuffledDialogues[step].char}</div>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-[3rem] text-3xl font-bold text-slate-800 mb-12 relative border-2 border-slate-100 shadow-sm max-w-2xl">
          "{shuffledDialogues[step].text}"
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-50 border-r-2 border-b-2 border-slate-100 rotate-45"></div>
        </div>

        <div className="grid gap-4 w-full max-w-xl">
          {shuffledDialogues[step].options.map((opt, i) => (
            <button key={i} onClick={() => handleChoice(i)} className="p-6 rounded-[2rem] bg-orange-600 text-white text-2xl font-black hover:bg-orange-700 active:scale-95 transition-all shadow-xl">
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
           <div className="bg-white rounded-[4rem] p-12 max-w-xl w-full shadow-2xl text-center border-t-[16px] border-orange-500">
             <div className="text-7xl mb-6">{feedback.isCorrect ? '🦁' : '🦉'}</div>
             <h4 className={`text-3xl font-black mb-6 ${feedback.isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
               {feedback.isCorrect ? 'DOĞRU TAVSİYE!' : 'BİRAZ DÜŞÜNELİM'}
             </h4>
             <p className="text-2xl text-slate-600 font-bold mb-12 leading-relaxed">{feedback.msg}</p>
             <button 
               onClick={nextDialogue} 
               className="w-full bg-orange-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-orange-700 active:scale-95 transition-all"
             >
               DEVAM ET ⏭️
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Level3Games;
