
import React, { useState, useMemo } from 'react';

const rawTeamScenarios = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  situation: [
    "Yapay Zeka hastanedeki ilaçları yanlış dağıtıyor!",
    "Sahte bir video her yerde yayılıyor.",
    "Bir uygulama çocukların fotoğraflarını izinsiz alıyor.",
    "Tasarım robotu çok korkutucu resimler çiziyor.",
    "Oyun içi algoritma sadece zenginlere yardım ediyor.",
    "Sohbet botu kullanıcılara kötü sözler söylüyor.",
    "Yapay Zeka ile üretilen haberde çok büyük hatalar var.",
    "Kütüphane robotu kitapları yakıyor!",
    "Bir Yapay Zeka asistanı şifreleri başkasına veriyor.",
    "Okul filtresi eğitim sitelerini bile engelliyor.",
    "Akıllı ev sistemi kapıları kimseye açmıyor!",
    "Trafik Yapay Zeka'sı tüm ışıkları aynı anda yeşil yaptı.",
    "Görsel üretim botu insanları tek tip çiziyor.",
    "Banka algoritması öğrencilere para vermiyor.",
    "Yapay Zeka ile ses taklidi yapıp birini dolandırıyorlar.",
    "Robot öğretmen öğrencilere yanlış matematik öğretiyor.",
    "Sosyal medya algoritması insanları kavga ettiriyor.",
    "Bir robot, insanların özel günlüklerini okuyor.",
    "Yapay Zeka, tarihi olayları yanlış anlatıp kitapları değiştiriyor.",
    "Son Görev: Yapay Zeka dünyayı ele geçirmeye çalışıyor!"
  ][i],
  feedback: [
    "Hatalı verileri tespit etmek ve teknik açığı bulmak için Dedektif'e ihtiyacımız vardı. 🔍",
    "Görüntüleri analiz etmek ve dezenformasyonu durdurmak Etik Analistinin işidir. ⚖️",
    "Gizlilik ihlallerini raporlamak ve güvenliği sağlamak Etik Analisti sorumluluğundadır. ⚖️",
    "Görsel çıktılardaki hataları ve tarzı düzeltmek Tasarımcının görevidir. 🎨",
    "Sistemdeki adaletsizliği ve ayrımcılığı Etik Analisti çözmelidir. ⚖️",
    "Yapay Zeka'nın dilini ve etik davranış kurallarını Etik Analisti belirler. ⚖️",
    "Haberin sahteliğini ve kaynak hatalarını Dedektif bulur. 🔍",
    "Mantıksal hatayı ve teknik arızayı Dedektif tespit etmelidir. 🔍",
    "Veri güvenliği ve etik kurallar Etik Analistinin ana uzmanlık alanıdır. ⚖️",
    "Kısıtlamaların adaletini ve eğitim etkisini Etik Analisti inceler. ⚖️",
    "Sistemdeki teknik kilitlenmeyi Dedektif çözebilir. 🔍",
    "Akışı analiz etmek ve kuralları denetlemek Etik Analistinin görevidir. ⚖️",
    "Görsel temsildeki çeşitliliği sağlamak Tasarımcı uzmanlığıdır. 🎨",
    "Adil puanlama ve finansal etik kuralları Etik Analisti düzenler. ⚖️",
    "Ses klonlamasını ve sahtekarlığı Dedektif ortaya çıkarır. 🔍",
    "Öğretim metodunun doğruluğunu ve tarafsızlığını Etik Analisti denetler. ⚖️",
    "Algoritmanın toplum üzerindeki etkisini Etik Analisti analiz eder. ⚖️",
    "Özel hayatın gizliliğini korumak Etik Analistinin en büyük görevidir. ⚖️",
    "Bilgi kirliliğini ve tarihi çarpıtmaları Dedektif durdurur. 🔍",
    "Geleceği kurtarmak için etik kuralları ve insan denetimini Etik Analisti sağlamalıdır! 🥇"
  ][i],
  options: [
    { label: "DEDEKTİF 🔍", desc: "Gerçeği bulur.", roleId: 0 },
    { label: "ETİK ANALİSTİ ⚖️", desc: "Adaleti sağlar.", roleId: 1 },
    { label: "TASARIMCI 🎨", desc: "Görünümü düzeltir.", roleId: 2 }
  ],
  correctRoleId: [0, 1, 1, 2, 1, 1, 0, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 1, 0, 1][i]
}));

const Level7Games: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const shuffledScenarios = useMemo(() => {
    return [...rawTeamScenarios]
      .sort(() => Math.random() - 0.5)
      .map(s => ({
        ...s,
        options: [...s.options].sort(() => Math.random() - 0.5)
      }));
  }, []);

  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ msg: string, isCorrect: boolean } | null>(null);

  const handleAssign = (optionIdx: number) => {
    if (feedback) return;
    const selectedRole = shuffledScenarios[idx].options[optionIdx];
    const isCorrect = selectedRole.roleId === shuffledScenarios[idx].correctRoleId;
    setFeedback({ msg: shuffledScenarios[idx].feedback, isCorrect });
  };

  const nextScenario = () => {
    setFeedback(null);
    if (idx < shuffledScenarios.length - 1) {
      setIdx(idx + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-center px-4 pb-12">
      <div className="bg-stone-600 rounded-[3rem] p-10 text-white shadow-2xl border-b-[12px] border-stone-800/30">
        <h2 className="text-4xl font-black mb-2 uppercase">🟤 SEVİYE 7: İŞ BİRLİĞİ VE TAKIM</h2>
        <p className="text-xl opacity-90 font-bold">20 Kriz Durumuna Uzman Ata! Görev: {idx + 1}/20</p>
      </div>

      <div className={`bg-white p-12 rounded-[4rem] shadow-2xl border-b-[16px] border-stone-100 flex flex-col items-center transition-all ${feedback ? 'opacity-40 blur-sm' : ''}`}>
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-5xl mb-8 shadow-inner border-2 border-slate-50">🚨</div>
        <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">DİKKAT! ACİL DURUM:</h3>
        <div className="bg-red-50 text-red-900 p-8 rounded-[2.5rem] border-4 border-red-100 text-2xl font-bold mb-12 max-w-2xl shadow-sm italic leading-relaxed">
          "{shuffledScenarios[idx].situation}"
        </div>
        
        <p className="text-slate-400 font-black uppercase tracking-widest text-sm mb-6">Hangi uzmanı göndermelisin?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
           {shuffledScenarios[idx].options.map((opt, oIdx) => (
             <button 
               key={oIdx} 
               onClick={() => handleAssign(oIdx)}
               className="p-8 bg-stone-50 border-4 border-slate-100 rounded-[2.5rem] hover:border-stone-500 hover:bg-white transition-all group shadow-sm"
             >
               <div className="text-xl font-black text-stone-700 group-hover:text-stone-900">{opt.label}</div>
               <div className="text-xs text-slate-400 font-bold mt-2 uppercase">{opt.desc}</div>
             </button>
           ))}
        </div>
      </div>

      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
           <div className="bg-white rounded-[4rem] p-12 max-w-xl w-full shadow-2xl text-center border-t-[16px] border-stone-500">
             <div className="text-7xl mb-6">{feedback.isCorrect ? '🤝' : '🚩'}</div>
             <h4 className={`text-3xl font-black mb-6 ${feedback.isCorrect ? 'text-green-600' : 'text-stone-600'}`}>
               {feedback.isCorrect ? 'GÖREV BAŞARIYLA ATANDI!' : 'EKİBİ TEKRAR DÜŞÜN'}
             </h4>
             <p className="text-2xl text-slate-600 font-bold mb-12 leading-relaxed">{feedback.msg}</p>
             <button 
               onClick={nextScenario} 
               className="w-full bg-stone-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-stone-700 active:scale-95 transition-all"
             >
               DEVAM ET ⏭️
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Level7Games;
