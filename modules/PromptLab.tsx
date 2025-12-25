
import React, { useState, useMemo } from 'react';

interface PromptScenario {
  id: number;
  goal: string;
  weakPrompt: string;
  strongPrompt: string;
  explanation: string;
}

interface WordGame {
  word: string;
  synonyms: string[];
  options: string[];
}

const wordChallenges: WordGame[] = [
  { word: "Güzel", synonyms: ["Muazzam", "Büyüleyici", "Şahane", "Estetik"], options: ["Kötü", "Muazzam", "Çirkin", "Basit"] },
  { word: "Hızlı", synonyms: ["Süratli", "Çevik", "Atik", "Seri"], options: ["Yavaş", "Ağır", "Süratli", "Durgun"] },
  { word: "Büyük", synonyms: ["Devasa", "Muhteşem", "Heybetli", "Ulu"], options: ["Devasa", "Minik", "Ufak", "İnce"] },
  { word: "Kızgın", synonyms: ["Öfkeli", "Barut Gibi", "Sinirli"], options: ["Sakin", "Öfkeli", "Mutlu", "Neşeli"] },
  { word: "Mutlu", synonyms: ["Neşeli", "Sevinçli", "Huzurlu", "Keyifli"], options: ["Üzgün", "Kederli", "Neşeli", "Dertli"] },
  { word: "Korkak", synonyms: ["Ürkek", "Çekingen", "Endişeli"], options: ["Cesur", "Yiğit", "Ürkek", "Atılgan"] },
  { word: "Zeki", synonyms: ["Akıllı", "Kurnaz", "Bilge", "Zehir Gibi"], options: ["Akıllı", "Saf", "Dalgın", "Unutkan"] },
  { word: "Küçük", synonyms: ["Minik", "Ufak", "Minyatür", "Cüce"], options: ["Kocaman", "Minyatür", "Dev", "Geniş"] },
  { word: "Yaşlı", synonyms: ["İhtiyar", "Güngörmüş", "Tecrübeli"], options: ["Genç", "Toy", "İhtiyar", "Taze"] },
  { word: "Zor", synonyms: ["Çetin", "Güç", "Meşakkatli"], options: ["Kolay", "Basit", "Çetin", "Rahat"] },
];

const scenarios: PromptScenario[] = [
  {
    id: 1,
    goal: "Yapay zekaya bir kedi resmi çizdirmek istiyorsun.",
    weakPrompt: "Kedi çiz.",
    strongPrompt: "Güneşli bir İstanbul sabahında, boğaz kenarındaki eski bir duvarda uyuklayan, turuncu tüylü sevimli bir tekir kedi çiz.",
    explanation: "Harika seçim! Detaylı, sıfatlarla dolu zengin bir Türkçe kullanırsan hayalindeki resme ulaşırsın."
  },
  {
    id: 2,
    goal: "Ödevin için Fatih Sultan Mehmet hakkında bilgi almak istiyorsun.",
    weakPrompt: "Fatih kimdir anlat.",
    strongPrompt: "Fatih Sultan Mehmet'in bilime ve sanata verdiği önemi anlatan, 5. sınıf seviyesinde, anlaşılır ve eğitici bir yazı hazırlar mısın?",
    explanation: "Süpersin! Hedef kitleyi (5. sınıf) ve konuyu (bilim/sanat) belirtmek cevabı mükemmelleştirir."
  },
  {
    id: 3,
    goal: "Arkadaşına doğum günü sürprizi planlamak istiyorsun.",
    weakPrompt: "Sürpriz fikir ver.",
    strongPrompt: "En yakın arkadaşım uzayı ve yıldızları çok seviyor. Onun için evde yapabileceğimiz, uzay temalı ve bütçesi uygun 3 yaratıcı doğum günü sürprizi önerir misin?",
    explanation: "Mükemmel! Duygularını ve kısıtlamaları (bütçe, ev ortamı) belirtmek işe yarar."
  },
  {
    id: 4,
    goal: "Bir hikaye yazdırmak istiyorsun.",
    weakPrompt: "Bana hikaye yaz.",
    strongPrompt: "Ana karakteri cesur bir karınca olan, ormandaki diğer böceklere yardımlaşmayı öğreten, sonu mutlu biten kısa bir fabl yazar mısın?",
    explanation: "Harika! Karakteri, konuyu ve hikaye türünü (fabl) seçmek Yapay Zeka'ya rehberlik eder."
  },
  {
    id: 5,
    goal: "Kodlama öğrenirken takıldın.",
    weakPrompt: "Kodum çalışmıyor.",
    strongPrompt: "Python'da bir hesap makinesi yapmaya çalışıyorum ama 'SyntaxError' hatası alıyorum. İşte yazdığım kod aşağıda, hatamı bulup açıklar mısın?",
    explanation: "Çok iyi! Hatayı ve kodunu paylaşmak, sorunun çözümünü hızlandırır."
  },
  {
    id: 6,
    goal: "Sağlıklı beslenmek istiyorsun.",
    weakPrompt: "Ne yiyeyim?",
    strongPrompt: "Sabah kahvaltısı için yumurta ve peynir içeren, yapımı 10 dakikayı geçmeyen, okul öncesi yiyebileceğim enerjik ve sağlıklı bir tarif öner.",
    explanation: "Süper! Malzemeleri ve zamanı belirtmek sana en uygun cevabı getirir."
  },
  {
    id: 7,
    goal: "Bir şiir yazdırmak istiyorsun.",
    weakPrompt: "Şiir yaz.",
    strongPrompt: "23 Nisan coşkusunu anlatan, içinde 'bayrak', 'çocuk' ve 'gelecek' kelimeleri geçen, 4 kıtalık kafiyeli bir şiir yazar mısın?",
    explanation: "Harika! Temayı, anahtar kelimeleri ve uzunluğu belirttin."
  },
  {
    id: 8,
    goal: "İngilizce pratik yapmak istiyorsun.",
    weakPrompt: "İngilizce konuşalım.",
    strongPrompt: "Sen Londra'da bir turistsin, ben de sana yol tarifi veren bir polisim. Benimle A2 seviyesinde basit İngilizce ile diyalog kurar mısın?",
    explanation: "Mükemmel! Yapay Zeka'ya bir 'rol' (persona) vermek diyaloğu çok daha gerçekçi yapar."
  },
  {
    id: 9,
    goal: "Resim dersi için fikir arıyorsun.",
    weakPrompt: "Ne çizeyim?",
    strongPrompt: "Sulu boya ile yapabileceğim, doğa temalı, içinde göl ve dağ olan, yeni başlayanlar için kolay ama etkileyici bir manzara resmi fikri ver.",
    explanation: "Harika! Malzemeyi (sulu boya) ve zorluk derecesini belirttin."
  },
  {
    id: 10,
    goal: "Kitap özeti istiyorsun.",
    weakPrompt: "Kitabı özetle.",
    strongPrompt: "Küçük Prens kitabının ana fikrini ve verdiği en önemli 3 dersi, maddeler halinde özetler misin?",
    explanation: "Süper! Sadece özet değil, 'dersleri' ve 'formatı' (madde madde) da istedin."
  }
];

const emojiChallenges = [
  { emojis: "🚀🌕👨‍🚀", prompt: "Bir astronotun aya roketle iniş yapması." },
  { emojis: "🏰🐉👸", prompt: "Prensesi koruyan ejderhanın olduğu eski bir kale." },
  { emojis: "🏖️🍦🦀", prompt: "Kumsalda dondurma yiyen bir yengeç." },
  { emojis: "🌲⛺🔥", prompt: "Ormanda kamp ateşi etrafında bir çadır." },
];

const PromptLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VOCAB' | 'PROMPT' | 'EMOJI'>('VOCAB');
  const [vocabIndex, setVocabIndex] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const [isPromptComplete, setIsPromptComplete] = useState(false);
  
  const [vocabFeedback, setVocabFeedback] = useState<{ msg: string, isCorrect: boolean } | null>(null);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const [emojiIndex, setEmojiIndex] = useState(0);
  const [emojiInput, setEmojiInput] = useState('');
  const [emojiFeedback, setEmojiFeedback] = useState<string | null>(null);

  // Karıştırılmış senaryolar ve seçenekleri
  const shuffledScenarios = useMemo(() => {
    return [...scenarios]
      .sort(() => Math.random() - 0.5)
      .map(s => {
        const options = [
          { text: s.weakPrompt, isCorrect: false },
          { text: s.strongPrompt, isCorrect: true }
        ].sort(() => Math.random() - 0.5);
        return { ...s, shuffledOptions: options };
      });
  }, []);

  const handleVocabChoice = (option: string) => {
    if (vocabFeedback) return;
    const isCorrect = wordChallenges[vocabIndex].synonyms.includes(option);
    setVocabFeedback({ 
      msg: isCorrect ? "Doğru! Kelime hazinen gelişiyor! 🎉" : "Tekrar dene! Daha güçlü bir kelime bulmalısın. 🕵️",
      isCorrect 
    });
  };

  const nextVocab = () => {
    setVocabFeedback(null);
    if (vocabIndex < wordChallenges.length - 1) {
      setVocabIndex(vocabIndex + 1);
    } else {
      setActiveTab('PROMPT');
    }
  };

  const handlePromptChoice = (isCorrect: boolean, explanation: string, optionIdx: number) => {
    if (showFeedback) return;
    setSelectedOptionId(optionIdx);
    if (isCorrect) {
      setShowFeedback(`✅ ${explanation}`);
      setScore(s => s + 1);
    } else {
      setShowFeedback("❌ Bu seçim Yapay Zeka'nın kafasını biraz karıştırabilir. Diğeri çok daha detaylı ve net!");
    }
  };

  const nextPrompt = () => {
    if (promptIndex < shuffledScenarios.length - 1) {
      setPromptIndex(c => c + 1);
      setShowFeedback(null);
      setSelectedOptionId(null);
    } else {
      setIsPromptComplete(true);
    }
  };

  const resetPromptGame = () => {
    setPromptIndex(0);
    setScore(0);
    setIsPromptComplete(false);
    setShowFeedback(null);
    setSelectedOptionId(null);
  };

  const checkEmojiAnswer = () => {
    if (emojiInput.length > 5) {
      setEmojiFeedback(`Harika betimleme! Yapay Zeka bunu kesin anlardı. 🎨\nDoğru cevap: ${emojiChallenges[emojiIndex].prompt}`);
    } else {
      setEmojiFeedback("Biraz daha detaylı yazmalısın! Daha çok kelime kullan. ✍️");
    }
  };

  const nextEmoji = () => {
    setEmojiFeedback(null);
    if (emojiIndex < emojiChallenges.length - 1) {
      setEmojiIndex(emojiIndex + 1);
      setEmojiInput('');
    } else {
      setEmojiIndex(0);
      setEmojiInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden border-b-[12px] border-purple-700/30">
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-3 flex items-center gap-3">
            <span>✨</span> Kelime Sihirbazı Atölyesi
          </h2>
          <p className="text-pink-100 text-xl font-bold opacity-90">
            Dili ne kadar iyi kullanırsan, Yapay Zeka seni o kadar iyi anlar!
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🧙‍♂️</div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={() => { setActiveTab('VOCAB'); setIsPromptComplete(false); }} className={`px-8 py-4 rounded-2xl font-black transition-all ${activeTab === 'VOCAB' ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-white text-purple-600 hover:bg-purple-50'}`}>🕵️‍♀️ Kelime Avcısı</button>
        <button onClick={() => { setActiveTab('PROMPT'); setIsPromptComplete(false); }} className={`px-8 py-4 rounded-2xl font-black transition-all ${activeTab === 'PROMPT' ? 'bg-pink-600 text-white shadow-lg scale-105' : 'bg-white text-pink-600 hover:bg-pink-50'}`}>📝 Prompt Doktoru</button>
        <button onClick={() => { setActiveTab('EMOJI'); setIsPromptComplete(false); }} className={`px-8 py-4 rounded-2xl font-black transition-all ${activeTab === 'EMOJI' ? 'bg-yellow-500 text-white shadow-lg scale-105' : 'bg-white text-yellow-600 hover:bg-yellow-50'}`}>🤪 Emoji Tercümanı</button>
      </div>

      <div className="bg-white rounded-[4rem] shadow-2xl border-4 border-slate-100 p-8 md:p-12 min-h-[500px] relative">
        
        {activeTab === 'VOCAB' && (
          <div className="text-center max-w-xl mx-auto animate-fade-in">
            <h3 className="text-3xl font-black text-slate-800 mb-2">Kelime Avcısı</h3>
            <p className="mb-10 text-slate-500 font-bold italic">"{wordChallenges[vocabIndex].word}" kelimesinin yerine daha güçlü ne diyebiliriz?</p>
            <div className="grid grid-cols-2 gap-4">
               {wordChallenges[vocabIndex].options.map((opt) => (
                 <button key={opt} onClick={() => handleVocabChoice(opt)} className="p-8 bg-purple-50 hover:bg-purple-500 hover:text-white rounded-3xl font-black text-2xl text-purple-900 transition-all border-4 border-purple-100 shadow-sm">
                   {opt}
                 </button>
               ))}
            </div>

            {vocabFeedback && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                 <div className="bg-white rounded-[4rem] p-12 max-w-md w-full shadow-2xl text-center border-t-[16px] border-purple-500">
                    <div className="text-8xl mb-6">{vocabFeedback.isCorrect ? '✅' : '🕵️'}</div>
                    <p className="text-3xl font-black text-slate-700 mb-10 leading-tight">{vocabFeedback.msg}</p>
                    <button onClick={vocabFeedback.isCorrect ? nextVocab : () => setVocabFeedback(null)} className="w-full bg-purple-600 text-white py-8 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-purple-700 transition-all border-b-8 border-purple-800">
                      {vocabFeedback.isCorrect ? 'SIRADAKİ KELİME ⏭️' : 'TEKRAR DENE'}
                    </button>
                 </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'PROMPT' && !isPromptComplete && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-pink-50 p-6 rounded-[2.5rem] border-2 border-pink-100 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-pink-600 uppercase tracking-widest text-sm">Görev {promptIndex + 1} / {shuffledScenarios.length}</span>
                <span className="bg-white px-4 py-1 rounded-full font-black text-pink-600 shadow-sm">SKOR: {score}</span>
              </div>
              <div className="h-3 w-full bg-pink-100 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${((promptIndex + 1) / shuffledScenarios.length) * 100}%` }}></div>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-10 leading-tight">
              "{shuffledScenarios[promptIndex].goal}"
            </h3>
            
            <div className="space-y-4">
              {shuffledScenarios[promptIndex].shuffledOptions.map((opt, idx) => (
                <button 
                  key={idx}
                  disabled={showFeedback !== null}
                  onClick={() => handlePromptChoice(opt.isCorrect, shuffledScenarios[promptIndex].explanation, idx)} 
                  className={`w-full text-left p-8 rounded-[2.5rem] border-4 transition-all font-bold text-xl flex items-center gap-6 shadow-sm ${
                    showFeedback 
                      ? opt.isCorrect 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : selectedOptionId === idx ? 'border-red-500 bg-red-50 text-red-700' : 'opacity-40 grayscale border-slate-100'
                      : 'border-slate-100 hover:border-pink-400 hover:bg-pink-50 text-slate-600'
                  }`}
                >
                  <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-black ${showFeedback && opt.isCorrect ? 'bg-green-500 text-white' : 'bg-pink-100 text-pink-600'}`}>
                    {idx === 0 ? 'A' : 'B'}
                  </span> 
                  {opt.text}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className={`mt-10 p-8 rounded-[3rem] animate-fade-in border-l-[12px] shadow-lg ${showFeedback.startsWith('✅') ? 'bg-green-50 text-green-800 border-green-500' : 'bg-red-50 text-red-800 border-red-500'}`}>
                <p className="text-2xl font-bold leading-snug mb-8">{showFeedback}</p>
                <button onClick={nextPrompt} className="w-full bg-pink-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-pink-700 transition-all border-b-8 border-pink-900 active:scale-95">
                  {promptIndex < shuffledScenarios.length - 1 ? 'SIRADAKİ SORU ⏭️' : 'SONUÇLARI GÖR 🏆'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'PROMPT' && isPromptComplete && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in py-10">
            <div className="text-[12rem] mb-8 animate-bounce">🎓</div>
            <h3 className="text-5xl font-black text-pink-600 mb-4 tracking-tighter">SINAV TAMAMLANDI!</h3>
            <p className="text-2xl font-bold text-slate-500 mb-10 leading-relaxed italic">
              "Yapay Zeka Akademisi Giriş Sınavı'nı başarıyla bitirdin."
            </p>
            
            <div className="bg-pink-50 p-10 rounded-[4rem] border-4 border-pink-100 mb-12 shadow-inner">
               <div className="text-[10px] font-black uppercase text-pink-400 tracking-[0.3em] mb-4">ALINAN PUAN</div>
               <div className="text-8xl font-black text-pink-600 leading-none">{score * 10}</div>
               <div className="mt-6 text-xl font-black text-slate-600 uppercase">
                  {score >= 8 ? 'ÜSTÜN BAŞARILI PROMPT USTASI 🌟' : score >= 5 ? 'BİLİNÇLİ YAZAR ✏️' : 'YENİ ÖĞRENCİ 🌱'}
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={resetPromptGame} className="bg-pink-600 text-white px-12 py-6 rounded-full font-black text-2xl shadow-xl hover:bg-pink-700 transition-all border-b-8 border-pink-900 active:scale-95">
                SINAVI TEKRARLA 🔄
              </button>
              <button onClick={() => setActiveTab('VOCAB')} className="bg-slate-800 text-white px-12 py-6 rounded-full font-black text-2xl shadow-xl hover:bg-black transition-all border-b-8 border-slate-950 active:scale-95">
                ATÖLYEYE DÖN 🏠
              </button>
            </div>
          </div>
        )}

        {activeTab === 'EMOJI' && (
          <div className="text-center max-w-xl mx-auto animate-fade-in">
            <h3 className="text-3xl font-black text-yellow-600 mb-2">Emoji Tercümanı</h3>
            <p className="text-slate-500 mb-10 font-bold italic">Yapay Zeka bu emojileri görselleştirseydi nasıl tarif ederdin?</p>
            <div className="text-8xl mb-12 tracking-widest animate-float drop-shadow-xl">{emojiChallenges[emojiIndex].emojis}</div>
            <textarea 
              value={emojiInput}
              onChange={(e) => setEmojiInput(e.target.value)}
              placeholder="Hikayeyi detaylıca anlat, mesela: 'Mavi bir gökyüzünde parlayan turuncu bir güneş...'"
              className="w-full p-8 border-4 border-yellow-100 rounded-[2.5rem] focus:border-yellow-400 outline-none mb-8 text-2xl font-bold bg-yellow-50/30 shadow-inner"
              rows={3}
            />
            <button onClick={checkEmojiAnswer} className="w-full bg-yellow-500 text-white py-6 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-yellow-600 transition-all border-b-8 border-yellow-700 active:scale-95">
              TERCÜMEYİ KONTROL ET 🕵️‍♂️
            </button>

            {emojiFeedback && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                 <div className="bg-white rounded-[4rem] p-12 max-w-lg w-full shadow-2xl text-center border-t-[16px] border-yellow-500">
                    <div className="text-8xl mb-6">🎨</div>
                    <p className="text-2xl font-bold text-slate-700 mb-10 whitespace-pre-wrap leading-relaxed">{emojiFeedback}</p>
                    <button onClick={nextEmoji} className="w-full bg-yellow-500 text-white py-6 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-yellow-600 transition-all border-b-8 border-yellow-700 active:scale-95">
                      DEVAM ET ⏭️
                    </button>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptLab;
