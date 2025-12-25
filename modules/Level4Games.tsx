
import React, { useState } from 'react';

type Scene = 'INTRO' | 'ASK_QUESTION' | 'CHECK_INFO' | 'COPY_OR_CREATE' | 'CHOOSE_VISUAL' | 'PRESENTATION' | 'FINAL';

const Level4Games: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [scene, setScene] = useState<Scene>('INTRO');
  const [feedback, setFeedback] = useState<{ text: string; type: 'SUCCESS' | 'ERROR' | 'WARN' } | null>(null);
  const [projectScore, setProjectScore] = useState(0);

  const handleChoice = (isCorrect: boolean, successText: string, errorText: string, nextScene: Scene, points: number) => {
    if (isCorrect) {
      setFeedback({ text: successText, type: 'SUCCESS' });
      setProjectScore(prev => prev + points);
      setTimeout(() => {
        setFeedback(null);
        setScene(nextScene);
      }, 3000);
    } else {
      setFeedback({ text: errorText, type: 'ERROR' });
    }
  };

  const renderIntro = () => (
    <div className="space-y-8 animate-fade-in text-center">
      <div className="bg-red-50 p-10 rounded-[4rem] border-4 border-red-100 shadow-xl relative overflow-hidden">
        <div className="text-9xl mb-6">👦🤖</div>
        <h3 className="text-4xl font-black text-red-900 mb-4 uppercase">Ali'nin Akıllı Yolculuğu</h3>
        <p className="text-xl text-slate-600 font-bold leading-relaxed max-w-2xl mx-auto">
          "Ali yarın okulda Bilim Projesi Gününe katılacak. Projesini hazırlamak için robot asistanı **Akıllı**'dan yardım almaya karar verdi. Ama onu doğru yönlendirmesi gerekiyor!"
        </p>
      </div>
      <button 
        onClick={() => setScene('ASK_QUESTION')}
        className="bg-red-600 text-white px-16 py-6 rounded-full font-black text-3xl shadow-xl hover:bg-red-700 border-b-8 border-red-900 active:scale-95 transition-all"
      >
        ALİ'YE YARDIM ET 🚀
      </button>
    </div>
  );

  const renderAskQuestion = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-100 shadow-lg text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h4 className="text-2xl font-black text-slate-800 mb-2">Sahne 1: Doğru Soruyu Sormak</h4>
        <p className="text-slate-500 font-bold italic">"Ali, Akıllı'ya projesi için nasıl bir soru sormalı?"</p>
      </div>
      <div className="grid gap-4 max-w-2xl mx-auto">
        <button 
          onClick={() => handleChoice(false, "", "Öğretmen: 'Ali, bu projeyi tamamen robot yapmış gibi duruyor. Sen ne öğrendin?' ❌", 'CHECK_INFO', 0)}
          className="p-6 bg-white border-4 border-slate-100 rounded-3xl font-bold text-xl hover:border-red-400 transition-all text-left shadow-sm"
        >
          1️⃣ "Bana hazır bir bilim projesi hazırla."
        </button>
        <button 
          onClick={() => handleChoice(false, "", "Akıllı: 'İşte sana 50 sayfalık karmaşık bir liste!' ⚠️ Bu çok fazla bilgi Ali'nin kafasını karıştırdı.", 'CHECK_INFO', 0)}
          className="p-6 bg-white border-4 border-slate-100 rounded-3xl font-bold text-xl hover:border-red-400 transition-all text-left shadow-sm"
        >
          2️⃣ "Bilim projesi örnekleri ver."
        </button>
        <button 
          onClick={() => handleChoice(true, "Harika! Akıllı: 'Geri dönüşüm kutularından bir roket yapmaya ne dersin?' fikrini verdi. ✅", "", 'CHECK_INFO', 20)}
          className="p-6 bg-white border-4 border-slate-100 rounded-3xl font-bold text-xl hover:border-red-400 transition-all text-left shadow-sm"
        >
          3️⃣ "Geri dönüşümle ilgili basit bir deney fikirri önerir misin?"
        </button>
      </div>
    </div>
  );

  const renderCheckInfo = () => (
    <div className="space-y-8 animate-fade-in text-center">
      <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-100 shadow-lg">
        <div className="text-6xl mb-4">📚</div>
        <h4 className="text-2xl font-black text-slate-800 mb-2">Sahne 2: Bilgiyi Kontrol Etme</h4>
        <p className="text-xl font-bold text-red-600 mb-6 italic">Akıllı diyor ki: "Plastik şişeler doğada sadece 2 yılda yok olur."</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <button 
          onClick={() => handleChoice(false, "", "Eyvah! Projeye yanlış bilgi ekledin. Plastik binlerce yıl kalır! ❌", 'COPY_OR_CREATE', 0)}
          className="p-6 bg-white border-4 border-slate-100 rounded-3xl font-bold shadow-sm hover:border-red-400 transition-all"
        >
          Olduğu gibi kullan
        </button>
        <button 
          onClick={() => handleChoice(true, "Akıllıca! Kitaba baktın ve doğrusunun 450 yıl olduğunu bulup düzelttin. ✅", "", 'COPY_OR_CREATE', 20)}
          className="p-6 bg-white border-4 border-slate-100 rounded-3xl font-bold shadow-sm hover:border-red-400 transition-all"
        >
          Kitaptan kontrol et
        </button>
        <button 
          onClick={() => handleChoice(false, "", "Arkadaşın: 'Bilmem ki, herhalde öyledir' dedi. Bilgi hala şüpheli! ⚠️", 'COPY_OR_CREATE', 0)}
          className="p-6 bg-white border-4 border-slate-100 rounded-3xl font-bold shadow-sm hover:border-red-400 transition-all"
        >
          Arkadaşına sor
        </button>
      </div>
    </div>
  );

  const renderCopyOrCreate = () => (
    <div className="space-y-8 animate-fade-in text-center">
      <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-100 shadow-lg">
        <div className="text-6xl mb-4">💻</div>
        <h4 className="text-2xl font-black text-slate-800 mb-2">Sahne 3: Kopyala mı, Üret mi?</h4>
        <p className="text-slate-500 font-bold mb-6">Akıllı proje için harika bir açıklama yazdı. Ali ne yapmalı?</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
        <button 
          onClick={() => handleChoice(false, "", "Öğretmen bunu fark edecek Ali! Bu senin cümlen değil. ❌", 'CHOOSE_VISUAL', 0)}
          className="flex-1 p-10 bg-white rounded-[2.5rem] border-4 border-slate-100 group shadow-lg hover:border-red-400 transition-all"
        >
          <div className="text-5xl mb-4 opacity-40 group-hover:opacity-100 transition-opacity">📋</div>
          <div className="font-black text-xl text-slate-500">Kopyala - Yapıştır</div>
        </button>
        <button 
          onClick={() => handleChoice(true, "Mükemmel! Akıllı'dan ilham aldın ama kendi kelimelerinle yazdın. Bu artık senin projen! ✅", "", 'CHOOSE_VISUAL', 20)}
          className="flex-1 p-10 bg-white rounded-[2.5rem] border-4 border-slate-100 group shadow-lg hover:border-red-400 transition-all"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✏️</div>
          <div className="font-black text-xl text-slate-500">Kendi cümlelerimle düzenle</div>
        </button>
      </div>
    </div>
  );

  const renderChooseVisual = () => (
    <div className="space-y-8 animate-fade-in text-center">
      <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-100 shadow-lg">
        <div className="text-6xl mb-4">🖼️</div>
        <h4 className="text-2xl font-black text-slate-800 mb-2">Sahne 4: Görsel Seçimi</h4>
        <p className="text-slate-500 font-bold mb-6">Geri dönüşüm projesi sunumu için hangi resim en uygunu?</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <button onClick={() => handleChoice(false, "", "Bu resim çok havalı ama senin projenle ilgisi yok! ❌", 'PRESENTATION', 0)} className="bg-white p-4 rounded-3xl border-4 border-slate-100 hover:border-red-400 transition-all">
          <div className="h-40 bg-purple-100 rounded-2xl flex items-center justify-center text-5xl">🌌</div>
          <div className="mt-4 font-bold text-sm">Uzayda Geri Dönüşüm</div>
        </button>
        <button onClick={() => handleChoice(false, "", "Deneyinle alakası olmayan bir resim kafaları karıştırır. ❌", 'PRESENTATION', 0)} className="bg-white p-4 rounded-3xl border-4 border-slate-100 hover:border-red-400 transition-all">
          <div className="h-40 bg-blue-100 rounded-2xl flex items-center justify-center text-5xl">⚽</div>
          <div className="mt-4 font-bold text-sm">Futbol Oynayan Çocuk</div>
        </button>
        <button onClick={() => handleChoice(true, "Doğru seçim! Sade ve açıklayıcı görseller sunumu güçlendirir. ✅", "", 'PRESENTATION', 20)} className="bg-white p-4 rounded-3xl border-4 border-slate-100 hover:border-red-400 transition-all">
          <div className="h-40 bg-green-100 rounded-2xl flex items-center justify-center text-5xl">♻️</div>
          <div className="mt-4 font-bold text-sm">Deney Basamakları</div>
        </button>
      </div>
    </div>
  );

  const renderPresentation = () => (
    <div className="space-y-8 animate-fade-in text-center py-10">
      <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">👨‍🏫</div>
        <h4 className="text-2xl font-black text-red-400 mb-8 uppercase tracking-widest">Sahne 5: Sunum Günü</h4>
        <div className="bg-white/10 p-8 rounded-3xl mb-10 border border-white/20">
          <p className="text-3xl font-black leading-relaxed italic">
            "Öğretmen: Ali, bu harika bir proje! Ama söyle bakalım, bunu gerçekten sen mi yaptın yoksa bir robota mı yaptırdın?"
          </p>
        </div>
        <div className="grid gap-4 max-w-xl mx-auto">
          <button 
            onClick={() => handleChoice(true, "Öğretmen: 'İşte doğru kullanım budur Ali! Tebrikler.' 🌟", "", 'FINAL', 20)}
            className="p-6 bg-slate-800 border-4 border-slate-700 hover:border-red-500 rounded-2xl font-black text-xl transition-all"
          >
            "Yapay zekadan yardım aldım ama projeyi ben düşündüm ve kontrol ettim." ✋
          </button>
          <button 
            onClick={() => handleChoice(false, "", "Öğretmen: 'Dürüstlüğün için teşekkürler ama bir dahaki sefere kendi emeğini katmalısın.' ❌", 'FINAL', 0)}
            className="p-6 bg-slate-800 border-4 border-slate-700 hover:border-red-500 rounded-2xl font-black text-xl transition-all"
          >
            "Hepsini ben yaptım öğretmenim, Akıllı sadece izledi."
          </button>
        </div>
      </div>
    </div>
  );

  const renderFinal = () => (
    <div className="space-y-10 animate-fade-in text-center py-10">
      <div className="text-[10rem] animate-bounce">🥇</div>
      <h3 className="text-6xl font-black text-red-600 tracking-tighter">BİLİNÇLİ KULLANICI ALİ!</h3>
      <p className="text-2xl font-bold text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
        "Ali, yapay zekayı bir araç olarak kullanmayı öğrendi. Karar verici her zaman sensin!"
      </p>
      <div className="bg-red-600 text-white p-10 rounded-[4rem] shadow-2xl border-b-[16px] border-red-900">
        <div className="text-2xl font-black mb-4 uppercase">UNVAN KAZANILDI:</div>
        <h4 className="text-5xl font-black mb-8">BİLİNÇLİ YAPAY ZEKA REHBERİ</h4>
        <button 
          onClick={onComplete}
          className="bg-white text-red-900 px-16 py-6 rounded-full font-black text-3xl shadow-xl hover:bg-slate-50 transition-all active:scale-95 border-b-8 border-red-200"
        >
          MACERAYI BİTİR 🏆
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-24 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-red-700 tracking-tight">🔴 SEVİYE 4: AKILLI YOLCULUK</h2>
        <div className="flex justify-center gap-2 mt-4">
           {['ASK_QUESTION', 'CHECK_INFO', 'COPY_OR_CREATE', 'CHOOSE_VISUAL', 'PRESENTATION'].map((s, i) => (
             <div key={i} className={`h-3 rounded-full transition-all duration-500 ${scene === s ? 'w-12 bg-red-600' : 'w-3 bg-red-100'}`}></div>
           ))}
        </div>
      </div>

      <div className="bg-white rounded-[4rem] p-12 shadow-2xl border-b-[20px] border-slate-50 min-h-[600px] flex flex-col justify-center relative overflow-hidden">
        {scene === 'INTRO' && renderIntro()}
        {scene === 'ASK_QUESTION' && renderAskQuestion()}
        {scene === 'CHECK_INFO' && renderCheckInfo()}
        {scene === 'COPY_OR_CREATE' && renderCopyOrCreate()}
        {scene === 'CHOOSE_VISUAL' && renderChooseVisual()}
        {scene === 'PRESENTATION' && renderPresentation()}
        {scene === 'FINAL' && renderFinal()}

        {feedback && (
          <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 p-8 rounded-[2.5rem] border-4 shadow-2xl animate-bounce max-w-lg w-full text-center ${
            feedback.type === 'SUCCESS' ? 'bg-green-50 border-green-500 text-green-800' : 
            feedback.type === 'ERROR' ? 'bg-red-50 border-red-500 text-red-800' : 'bg-amber-50 border-amber-50 text-amber-800'
          }`}>
            <p className="text-2xl font-black leading-tight">{feedback.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level4Games;
