
import React, { useState } from 'react';
import { Lesson } from '../types';

const Academy: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<{msg: string, isCorrect: boolean} | null>(null);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Makine Öğrenimi Nedir?",
      content: "Bebeklerin yürümeyi düşe kalka öğrenmesi gibi, bilgisayarlar da verilerle deneme yanılma yaparak öğrenir. Buna 'Makine Öğrenimi' denir.",
      interactiveQuestion: "Sence bir makineye 'kedi'yi öğretmek için ona tek bir kedi resmi göstermek yeterli midir?",
      interactiveAnswer: false,
      explanation: "Harika! Binlerce farklı kedi (siyah, beyaz, yavru, uyuyan) göstermelisin ki her türlü kediyi tanıyabilsin. Çeşitlilik öğrenmenin temelidir.",
      icon: "🤖",
      color: "border-blue-400 bg-blue-50 text-blue-900"
    },
    {
      id: 2,
      title: "Algoritmalar ve Yankı Odaları",
      content: "Algoritmalar, sen neyi seviyorsan sana SADECE onu gösterir. Bu seni bir 'yankı odasına' hapseder ve farklı fikirleri duymanı engeller.",
      interactiveQuestion: "Sürekli aynı tür videoları izlersem, karşıma yeni ve farklı şeyler çıkar mı?",
      interactiveAnswer: false,
      explanation: "Doğru! Algoritma seni mutlu etmek için hep aynısını gösterir. Farklı fikirleri duymak için arada sırada bilmediğin konuları da araştırmalısın.",
      icon: "📢",
      color: "border-purple-400 bg-purple-50 text-purple-900"
    },
    {
      id: 3,
      title: "Veri Mahremiyeti",
      content: "Yapay zeka modelleri eğitilirken internetteki verileri kullanır. Paylaştığın her fotoğraf, yazdığın her yorum bu eğitim setine girebilir.",
      interactiveQuestion: "Özel bir sırrını 'herkese açık' bir Yapay Zeka sohbet botuna yazmak güvenli midir?",
      interactiveAnswer: false,
      explanation: "Kesinlikle! O bilgi sistemin bir parçası olabilir ve bir daha asla geri alınamaz. Dijital ortamda sırlar güvende değildir.",
      icon: "🔒",
      color: "border-green-400 bg-green-50 text-green-900"
    },
    {
      id: 4,
      title: "Yaratıcı Yapay Zeka (GenAI)",
      content: "Yapay zeka sadece analiz etmez, artık resim çizebilir, şiir yazabilir. Ama bunu yaparken var olan eserlerden 'esinlenir'.",
      interactiveQuestion: "Yapay Zeka'nın ürettiği her bilgi %100 doğru mudur?",
      interactiveAnswer: false,
      explanation: "Mükemmel tespit! Yapay Zeka bazen 'halüsinasyon' görür yani çok emin bir şekilde yalan uydurabilir. Her zaman güvenilir kaynaklardan kontrol etmelisin.",
      icon: "🎨",
      color: "border-orange-400 bg-orange-50 text-orange-900"
    },
    {
      id: 5,
      title: "Önyargı (Bias)",
      content: "Eğer Yapay Zeka'ya sadece erkek doktor resimleri gösterirsen, 'doktor çiz' dediğinde hep erkek çizer. Buna 'Önyargı' denir.",
      interactiveQuestion: "Yapay Zeka her zaman tarafsız ve adil midir?",
      interactiveAnswer: false,
      explanation: "Harika cevap. Yapay Zeka'yı biz insanlar eğitiriz. Eğer verilerimizde önyargı varsa, Yapay Zeka de bunu kopyalar ve haksızlık yapabilir.",
      icon: "⚖️",
      color: "border-red-400 bg-red-50 text-red-900"
    },
    {
      id: 6,
      title: "Sinir Ağları",
      content: "Yapay Zeka'nın beyni, insan beynindeki nöronlar gibi birbirine bağlı katmanlardan oluşur. Buna 'Yapay Sinir Ağı' denir.",
      interactiveQuestion: "Yapay Zeka insan beyninin aynısı mıdır?",
      interactiveAnswer: false,
      explanation: "Benzese de aynısı değildir. İnsanlar duyguları ve bilinciyle düşünür, Yapay Zeka ise matematiksel hesaplarla sonuç üretir. Empati yeteneği yoktur.",
      icon: "🧠",
      color: "border-pink-400 bg-pink-50 text-pink-900"
    },
    {
      id: 7,
      title: "Robotik ve Yapay Zeka",
      content: "Her robot yapay zekaya sahip değildir. Bazıları sadece kurmalı oyuncak gibidir. Yapay Zeka olan robotlar çevrelerini görüp karar verebilir.",
      interactiveQuestion: "Uzaktan kumandalı araba bir Yapay Zeka mıdır?",
      interactiveAnswer: false,
      explanation: "Kesinlikle değil. Kararları sen veriyorsun. Bir sistemin Yapay Zeka olması için kendi kendine veri toplayıp karar vermesi gerekir.",
      icon: "🦾",
      color: "border-slate-400 bg-slate-50 text-slate-900"
    },
    {
      id: 8,
      title: "Doğal Dil İşleme (NLP)",
      content: "Bilgisayarların insan dilini (Türkçe, İngilizce) anlamasına ve konuşmasına NLP denir. Çeviri programları buna örnektir.",
      interactiveQuestion: "Bilgisayar kelimelerin 'duygusunu' insan gibi hisseder mi?",
      interactiveAnswer: false,
      explanation: "Doğru! Sadece kelimelerin yan yana gelme ihtimalini hesaplar. 'Üzüldüm' yazdığında üzülmez, sadece o kelimenin anlamını bilir.",
      icon: "🗣️",
      color: "border-teal-400 bg-teal-50 text-teal-900"
    },
    {
      id: 9,
      title: "Yapay Zeka ve Çevre",
      content: "Büyük Yapay Zeka modellerini eğitmek için devasa bilgisayarlar günlerce çalışır ve çok fazla elektrik harcar.",
      interactiveQuestion: "Yapay Zeka kullanmanın çevreye bir maliyeti var mıdır?",
      interactiveAnswer: true,
      explanation: "Evet! Veri merkezleri devasa enerji harcar. Bu yüzden teknolojiyi bilinçsizce değil, faydalı amaçlar için kullanmalıyız.",
      icon: "🌱",
      color: "border-emerald-400 bg-emerald-50 text-emerald-900"
    },
    {
      id: 10,
      title: "Geleceğin Meslekleri",
      content: "Yapay Zeka bazı işleri yapabilir ama 'empati', 'liderlik' ve 'yaratıcılık' gerektiren işlerde insana her zaman ihtiyaç vardır.",
      interactiveQuestion: "Gelecekte insanlar hiç çalışmayacak mı?",
      interactiveAnswer: false,
      explanation: "Süper bir bakış açısı. İnsanlar çalışmaya devam edecek ama artık Yapay Zeka'yı yöneten ve denetleyen 'üst akıl' olacağız.",
      icon: "🚀",
      color: "border-indigo-400 bg-indigo-50 text-indigo-900"
    }
  ];

  const handleAnswer = (lesson: Lesson, answer: boolean) => {
    const isCorrect = answer === lesson.interactiveAnswer;
    setQuizResult({
      msg: lesson.explanation,
      isCorrect: isCorrect
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
        <span className="p-2 bg-indigo-100 rounded-lg">🎓</span> Yapay Zeka Akademisi
      </h2>
      <p className="text-gray-600 mb-8">
        Kartların üzerine tıkla, içindeki bilgiyi öğren ve mini testi çöz! Her ders seni bir Yapay Zeka uzmanına dönüştürür.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="relative group perspective">
            <div 
              onClick={() => { setActiveLesson(lesson.id); setQuizResult(null); }}
              className={`cursor-pointer p-6 rounded-[2.5rem] border-b-8 shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${lesson.color} h-full flex flex-col justify-between min-h-[300px] border-4`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-inner">{lesson.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-60 bg-white px-2 py-1 rounded-lg">Ders {lesson.id}</span>
                </div>
                <h3 className="text-xl font-black mb-3">{lesson.title}</h3>
                <p className="font-bold opacity-90 text-sm leading-relaxed">{lesson.content}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                 <span className="text-xs font-black bg-white/40 px-3 py-1 rounded-full">Testi Çöz ➡️</span>
              </div>
            </div>

            {activeLesson === lesson.id && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => { e.stopPropagation(); setActiveLesson(null); }}>
                <div className="bg-white rounded-[4rem] max-w-lg w-full p-10 shadow-2xl animate-float border-t-[16px] border-indigo-500" onClick={e => e.stopPropagation()}>
                  <div className="text-center mb-8">
                    <span className="text-7xl">{lesson.icon}</span>
                    <h3 className="text-3xl font-black text-slate-800 mt-4">{lesson.title}</h3>
                  </div>
                  
                  {!quizResult ? (
                    <div className="space-y-8">
                      <p className="text-2xl font-bold text-center text-slate-700 leading-snug">{lesson.interactiveQuestion}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(lesson, true)} className="bg-green-500 hover:bg-green-600 text-white py-6 rounded-3xl font-black text-2xl shadow-lg transition-all active:scale-95">EVET ✅</button>
                        <button onClick={() => handleAnswer(lesson, false)} className="bg-red-500 hover:bg-red-600 text-white py-6 rounded-3xl font-black text-2xl shadow-lg transition-all active:scale-95">HAYIR ❌</button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-8 animate-fade-in">
                      <div className={`p-8 rounded-3xl text-xl font-bold border-4 ${quizResult.isCorrect ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                         <div className="text-4xl mb-2">{quizResult.isCorrect ? '🌟' : '💡'}</div>
                         {quizResult.msg}
                      </div>
                      <button onClick={() => setActiveLesson(null)} className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-indigo-700 active:scale-95 transition-all">
                        DERSİ TAMAMLA ⏭️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Academy;
