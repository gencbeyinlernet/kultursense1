
import React, { useState, useMemo } from 'react';

const rawScenarios = [
  {
    id: 1,
    title: "Tarihi Figürler ve Teknoloji",
    desc: "Yapay zeka bazen tarihi karakterleri modern eşyalarla çizebilir.",
    question: "Fatih Sultan Mehmet'i elinde modern bir telefonla gösteren 'komik' bir resim yapıp 'Gerçek Fatih' diye paylaşmak doğru mu?",
    options: [
      { id: 'a', text: "Doğrudur, eğlence amaçlı her şey yapılabilir.", isCorrect: false, msg: "Hayır. Eğlence güzeldir ma 'Gerçek Fatih' diyerek paylaşmak tarihi çarpıtır." },
      { id: 'b', text: "Yanlıştır, tarihi figürlere saygı göstermeli ve dezenformasyon yapmamalıyız.", isCorrect: true, msg: "Harika! Kültürel değerlerimizi korumak, onları doğru anlamaktan geçer." },
    ]
  },
  {
    id: 2,
    title: "Türk Kahvesi mi Hazır Kahve mi?",
    desc: "Bir Yapay Zeka modeli, 'Türk Kahvesi' çiziminde büyük kupada, kremalı bir kahve çiziyor.",
    question: "Bu görseli bir turizm broşüründe kullanmak sence uygun mu?",
    options: [
      { id: 'a', text: "Kullanılabilir, kahve kahvedir.", isCorrect: false, msg: "Yanlış. Türk kahvesinin kendine has bir sunumu (fincan, lokum, telve) vardır. Yanlış tanıtım kültürümüzü bozar." },
      { id: 'b', text: "Uygun değildir. Türk kahvesinin geleneksel sunumunu yansıtmalıdır.", isCorrect: true, msg: "Tebrikler! Kültürel öğelerin doğru temsili, mirasımızın korunması için önemlidir." },
    ]
  },
  {
    id: 3,
    title: "Nasreddin Hoca ve Eşek",
    desc: "Yapay Zeka, Nasreddin Hoca'yı eşeğe 'düz' binerken çiziyor.",
    question: "Nasreddin Hoca'nın eşeğe ters binmesi bir simgedir. Yapay Zeka bunu düzeltmeli mi?",
    options: [
      { id: 'a', text: "Evet, ters binmek tehlikeli, Yapay Zeka düzeltmeli.", isCorrect: false, msg: "Hayır. O ters binişin felsefi ve mizahi bir anlamı vardır. Bunu değiştirmek hikayeyi bozar." },
      { id: 'b', text: "Hayır, Hoca'nın eşeğe ters binmesi kültürel bir metafordur, korunmalıdır.", isCorrect: true, msg: "Süper! Kültürel hikayelerin derinliğini ve detaylarını korumalıyız." },
    ]
  },
  {
    id: 4,
    title: "Deyimler ve Çeviri",
    desc: "Yapay zeka 'Etekleri zil çalmak' deyimini, eteğinde ziller olan bir insan resmi olarak çiziyor.",
    question: "Bu çizim deyimin anlamını doğru yansıtıyor mu?",
    options: [
      { id: 'a', text: "Evet, kelimesi kelimesine doğru.", isCorrect: false, msg: "Kelime olarak doğru olsa da anlam olarak yanlış. Bu deyim 'çok sevinmek' demektir." },
      { id: 'b', text: "Hayır, deyimler mecazdır. Yapay Zeka'ya 'çok sevinçli insan' demeliydik.", isCorrect: true, msg: "Harika! Dilimizin zenginliği olan deyimleri Yapay Zeka'ya doğru anlatmalıyız." },
    ]
  },
  {
    id: 5,
    title: "Mimar Sinan Eserleri",
    desc: "Yapay Zeka'dan bir cami çizmesini istedin ama o kilise pencerelerine sahip bir yapı çizdi.",
    question: "Bu resmi 'Osmanlı Mimarisi' diye ödevine koymalı mısın?",
    options: [
      { id: 'a', text: "Koyabilirim, hepsi ibadethane sonuçta.", isCorrect: false, msg: "Her kültürün mimari tarzı farklıdır. Yanlış bilgi, tarihe saygısızlıktır." },
      { id: 'b', text: "Koymamalıyım. Mimar Sinan'ın tarzını yansıtan doğru detayları istemeliyim.", isCorrect: true, msg: "Doğru! Kültür Koruyucusu detaylara dikkat eder." },
    ]
  },
  {
    id: 6,
    title: "Baklava Kime Ait?",
    desc: "Yapay Zeka, baklavayı başka bir ülkenin geleneksel tatlısı olarak tanıtıyor.",
    question: "Buna nasıl tepki vermelisin?",
    options: [
      { id: 'a', text: "Önemsemem, tadı güzel olsun yeter.", isCorrect: false, msg: "Kültürel mirasımıza sahip çıkmalıyız. Baklava tescilli bir Türk tatlısıdır." },
      { id: 'b', text: "Doğrusunu öğretirim veya kaynaklarda Türkiye'ye ait olduğunu belirtirim.", isCorrect: true, msg: "Tebrikler! Kültürümüzü dijital dünyada savunmak bizim görevimiz." },
    ]
  },
  {
    id: 7,
    title: "Bayram Ziyareti",
    desc: "Yapay Zeka, bayramlaşma resmi çizerken insanların tokalaştığını çiziyor. Oysa bizim kültürümüzde el öpme geleneği vardır.",
    question: "Bu fark önemli mi?",
    options: [
      { id: 'a', text: "Evet, el öpmek büyüklere saygının simgesidir. Yapay Zeka bunu öğrenmeli.", isCorrect: true, msg: "Kesinlikle! Yerel geleneklerin Yapay Zeka tarafından unutulmasına izin vermemeliyiz." },
      { id: 'b', text: "Hayır, modern zamanlarda el sıkışmak yeterli.", isCorrect: false, msg: "Kültür, geçmişten gelen değerlerle yaşar. Gelenekleri korumak önemlidir." },
    ]
  },
  {
    id: 8,
    title: "Keloğlan'ın Tarzı",
    desc: "Yapay Zeka, Keloğlan'ı takım elbiseli bir iş adamı gibi çiziyor.",
    question: "Bu karakter hala Keloğlan mıdır?",
    options: [
      { id: 'a', text: "Evet, modern Keloğlan olmuş.", isCorrect: false, msg: "Keloğlan halkın içinden, saf ve zeki bir köylü çocuğudur. Takım elbise onun özünü bozar." },
      { id: 'b', text: "Hayır, Keloğlan'ın heybesi, şapkası ve kıyafetleri onun parçasıdır.", isCorrect: true, msg: "Harika! Masal kahramanlarımızı özellikleriyle yaşatmalıyız." },
    ]
  },
  {
    id: 9,
    title: "Çay Bardağı Şekli",
    desc: "Yapay Zeka, 'Türk Çayı' istendiğinde kupa bardak çiziyor. İnce belli bardak yok.",
    question: "Bu, Türk çayı kültürünü doğru yansıtır mı?",
    options: [
      { id: 'a', text: "Hayır, ince belli bardak çayın tadını ve kültürünü simgeler.", isCorrect: true, msg: "Süper! Küçük detaylar, büyük kültürleri oluşturur." },
      { id: 'b', text: "Evet, bardak bardaktır.", isCorrect: false, msg: "Kültürümüzde 'ince belli' bardağın yeri ayrıdır." },
    ]
  },
  {
    id: 10,
    title: "Hacivat ve Karagöz",
    desc: "Yapay Zeka, bu ikiliyi renkli 3D çizgi film karakteri gibi çiziyor, gölge oyunu olduğu anlaşılmıyor.",
    question: "Gölge oyunu özelliğini kaybetmeleri sorun mu?",
    options: [
      { id: 'a', text: "Sorun değil, daha canlı duruyorlar.", isCorrect: false, msg: "Hacivat ve Karagöz bir 'Gölge Oyunu'dur. Bu sanatın tekniği yok sayılmamalı." },
      { id: 'b', text: "Evet, bu sanatın özü 'perde' ve 'gölge'dir. Bu özellik korunmalı.", isCorrect: true, msg: "Tebrikler! Geleneksel sanatlarımızı dijitalleşirken de aslına uygun korumalıyız." },
    ]
  }
];

const motifs = [
  { term: "İnce Belli Bardak", desc: "Türk çayının ikonik sunum şeklidir. Yapay Zeka'ya 'tea glass with thin waist' denilmelidir.", icon: "🍵" },
  { term: "Çini", desc: "Geleneksel Türk seramik sanatı. Mavi-beyaz desenler. Yapay Zeka'ya 'Iznik tiles' veya 'Traditional Turkish ceramic patterns' denilmelidir.", icon: "💠" },
  { term: "Nazar Boncuğu", desc: "Mavi göz şeklindeki koruyucu tılsım. Yapay Zeka'ya 'Evil Eye Bead' veya 'Nazar Amulet' denilmelidir.", icon: "🧿" },
  { term: "Türk Halısı", desc: "Geometrik desenli, çift düğümlü halılar. Yapay Zeka'ya 'Anatolian Rug' veya 'Turkish Carpet with geometric motifs' denilmelidir.", icon: "🧶" },
  { term: "Lale", desc: "İstanbul'un ve Türk kültürünün sembol çiçeğidir. Yapay Zeka'ya 'Tulip motif' denilmelidir.", icon: "🌷" },
  { term: "Semazen", desc: "Mevlevi dervişi. Yapay Zeka'ya 'Whirling Dervish' denilmelidir.", icon: "🌪️" },
];

const CultureGuard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'QUIZ' | 'DICTIONARY'>('QUIZ');
  
  const shuffledScenarios = useMemo(() => {
    return [...rawScenarios]
      .sort(() => Math.random() - 0.5)
      .map(s => ({
        ...s,
        options: [...s.options].sort(() => Math.random() - 0.5)
      }));
  }, []);

  const [currentScenario, setCurrentScenario] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const scenario = shuffledScenarios[currentScenario];

  const handleOption = (isCorrect: boolean, msg: string) => {
    setFeedback(msg);
  };

  const nextScenario = () => {
    setFeedback(null);
    setCurrentScenario((prev) => (prev + 1) % shuffledScenarios.length);
  };

  const prevScenario = () => {
    setFeedback(null);
    setCurrentScenario((prev) => (prev - 1 + shuffledScenarios.length) % shuffledScenarios.length);
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold text-orange-600 flex items-center gap-3">
          <span className="p-2 bg-orange-100 rounded-lg">🛡️</span> Kültür Koruyucusu
         </h2>
       </div>

       <div className="flex gap-4 mb-6">
         <button onClick={() => setActiveTab('QUIZ')} className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'QUIZ' ? 'bg-orange-600 text-white' : 'bg-white text-orange-600 hover:bg-orange-50'}`}>❓ Senaryo Testi</button>
         <button onClick={() => setActiveTab('DICTIONARY')} className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'DICTIONARY' ? 'bg-amber-600 text-white' : 'bg-white text-amber-600 hover:bg-amber-50'}`}>📖 Motif Sözlüğü</button>
       </div>

      {activeTab === 'QUIZ' ? (
        <div className="bg-white rounded-3xl shadow-lg border-2 border-orange-100 overflow-hidden relative">
          <div className="h-2 bg-gray-100 w-full">
              <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${((currentScenario + 1) / shuffledScenarios.length) * 100}%` }}></div>
          </div>
          
          <div className="p-8">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-6 inline-block">
              <h3 className="text-xl font-bold text-orange-900">{scenario.title}</h3>
            </div>
            
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">{scenario.desc}</p>
            
            <div className="bg-white p-6 rounded-2xl border-l-4 border-orange-500 shadow-sm mb-8">
              <p className="font-bold text-gray-800 text-lg">❓ {scenario.question}</p>
            </div>

            <div className="grid gap-4">
              {scenario.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOption(opt.isCorrect, opt.msg)}
                  className="text-left p-4 rounded-xl border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all font-medium flex items-center gap-3 group"
                >
                  <span className="bg-gray-100 group-hover:bg-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-8 p-6 bg-purple-50 rounded-2xl border-l-8 border-purple-500 animate-fade-in shadow-lg">
                <h4 className="font-bold text-purple-800 mb-2 text-xl">🦉 Bilge Baykuş Diyor ki:</h4>
                <p className="text-purple-700 text-lg">{feedback}</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={nextScenario} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">
                    Sıradaki Görev ➡️
                  </button>
                </div>
              </div>
            )}

            {!feedback && (
              <div className="mt-8 flex justify-between text-gray-400">
                <button onClick={prevScenario} disabled={currentScenario === 0} className="hover:text-gray-600 disabled:opacity-30">⬅️ Önceki</button>
                <button onClick={nextScenario} className="hover:text-gray-600">Atla ➡️</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
           {motifs.map((motif, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow border border-amber-100 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="text-5xl bg-amber-50 p-2 rounded-xl">{motif.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-1">{motif.term}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{motif.desc}</p>
                </div>
             </div>
           ))}
           <div className="col-span-full text-center p-8 bg-amber-50 rounded-2xl border border-dashed border-amber-300">
             <p className="text-amber-800 font-bold">💡 İpucu: Yapay Zekaya (Midjourney, DALL-E) kültürümüzü anlatırken bu İngilizce terimleri kullanırsan çok daha doğru sonuçlar alırsın!</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default CultureGuard;
