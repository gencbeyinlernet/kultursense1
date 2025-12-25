
import React, { useState, useMemo } from 'react';

const TASKS_DATA = [
  { id: 1, text: "Okul sitesi", cat: 'SAFE', icon: '🏫', feedback: "Resmi okul siteleri güvenli bilgi kaynaklarıdır. ✅" },
  { id: 2, text: "Bedava oyun linki", cat: 'DANGER', icon: '🎮', feedback: "Bedava vaatler genellikle şifre çalmak için kurulan tuzaklardır! 🛑" },
  { id: 3, text: "Şifre isteyen yabancı", cat: 'DANGER', icon: '👤', feedback: "Gerçek yetkililer veya güvenilir kişiler asla senin şifreni istemez. 🛑" },
  { id: 4, text: "Öğretmen e-postası", cat: 'SAFE', icon: '📧', feedback: "Tanıdığın öğretmenlerinden gelen e-postalar genellikle güvenlidir ama yine de linklere dikkat etmelisin. ✅" },
  { id: 5, text: "Kütüphane girişi", cat: 'SAFE', icon: '📚', feedback: "Eğitimle ilgili resmi portallar güvenli bölgelerdir. ✅" },
  { id: 6, text: "Banka bilgilerini soran SMS", cat: 'DANGER', icon: '📱', feedback: "Bankalar asla SMS ile şifre veya kart bilgisi istemez. Bu bir dolandırıcılık yöntemidir. 🛑" },
  { id: 7, text: "Güncelleme uyarısı (Resmi)", cat: 'SAFE', icon: '⚙️', feedback: "Cihazını güncel tutmak seni yeni virüslerden korur. ✅" },
  { id: 8, text: "Piyango kazandınız mesajı", cat: 'DANGER', icon: '💰', feedback: "Katılmadığın bir çekilişi kazanamazsın. Bu bir oltalamadır! 🛑" },
  { id: 9, text: "Aile grubuna gelen fotoğraf", cat: 'SAFE', icon: '👨‍👩‍👧', feedback: "Ailenle kurduğun kapalı gruplar güvenli paylaşım alanlarıdır. ✅" },
  { id: 10, text: "Kamera izni isteyen fener app", cat: 'DANGER', icon: '🔦', feedback: "Bir el feneri uygulamasının kameranı izlemesine veya rehberine bakmasına gerek yoktur! 🛑" },
  { id: 11, text: "Güvenilir antivirüs uyarısı", cat: 'SAFE', icon: '🛡️', feedback: "Antivirüs yazılımları bilgisayarının koruyucu kalkanlarıdır. ✅" },
  { id: 12, setScore: (s: number) => {}, text: "Seni takip eden sahte hesap", cat: 'DANGER', icon: '🕵️', feedback: "Tanımadığın kişilerin seni takip etmesine izin verme, bilgilerini görebilirler. 🛑" },
  { id: 13, text: "Resmi devlet sitesi (.gov.tr)", cat: 'SAFE', icon: '🇹🇷', feedback: ".gov.tr uzantılı siteler devletin resmi ve güvenli kapılarıdır. ✅" },
  { id: 14, text: "Gizli numara araması", cat: 'DANGER', icon: '📞', feedback: "Tanımadığın ve gizli numaralardan gelen aramalar tehlikeli olabilir, açmamak en iyisidir. 🛑" },
  { id: 15, text: "E-okul girişi", cat: 'SAFE', icon: '🎓', feedback: "E-okul gibi resmi sistemler güvenli dijital araçlardır. ✅" },
  { id: 16, text: "Bilinmeyen uygulama linki", cat: 'DANGER', icon: '📦', feedback: "Kaynağını bilmediğin dosyalar cihazına virüs bulaştırabilir. 🛑" },
  { id: 17, text: "Arkadaşından gelen normal selam", cat: 'SAFE', icon: '👋', feedback: "Arkadaşlarınla iletişim kurmak güzeldir, sadece özel bilgilerini paylaşma. ✅" },
  { id: 18, text: "Konum isteyen yabancı", cat: 'DANGER', icon: '📍', feedback: "Konumun senin en özel bilgilerinden biridir, kimseyle paylaşma! 🛑" },
  { id: 19, text: "Wikipedia bilgisi", cat: 'SAFE', icon: '🌐', feedback: "Bilgi öğrenmek için kullanılan siteler genellikle güvenlidir ama bilgiyi başka yerlerden de teyit etmelisin. ✅" },
  { id: 20, text: "Kimlik No isteyen 'Gelecek Falı' oyunu", cat: 'DANGER', icon: '🔮', feedback: "T.C. Kimlik numaran gibi hassas bilgiler asla oyunlar veya testlerle paylaşılmamalıdır! 🛑" },
];

const Level1Games: React.FC<{ onComplete: (points: number) => void }> = ({ onComplete }) => {
  const shuffledTasks = useMemo(() => {
    return [...TASKS_DATA].sort(() => Math.random() - 0.5);
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string, isCorrect: boolean } | null>(null);

  const handleAction = (cat: 'SAFE' | 'DANGER') => {
    if (feedback) return;
    const isCorrect = shuffledTasks[currentIdx].cat === cat;
    if (isCorrect) {
      setPoints(p => p + 10);
    } else {
      setPoints(p => Math.max(0, p - 5));
    }
    setFeedback({ msg: shuffledTasks[currentIdx].feedback, isCorrect });
  };

  const nextTask = () => {
    setFeedback(null);
    if (currentIdx < shuffledTasks.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto py-12 animate-fade-in text-center">
        <div className="bg-white p-16 rounded-[4rem] shadow-2xl border-b-[16px] border-green-500">
          <div className="text-9xl mb-8">🏆</div>
          <h2 className="text-5xl font-black text-slate-800 mb-4">SEVİYE 1 TAMAMLANDI!</h2>
          <p className="text-2xl font-bold text-slate-500 mb-12">Güvenlik Yolundaki Tüm Tuzakları Aştın!</p>
          <div className="bg-green-100 text-green-700 py-6 px-12 rounded-3xl inline-block mb-12">
            <div className="text-xs uppercase font-black tracking-widest mb-1">Kazanılan Puan</div>
            <div className="text-6xl font-black">{points}</div>
          </div>
          <br/>
          <button 
            onClick={() => onComplete(points)} 
            className="bg-green-600 text-white px-20 py-8 rounded-[2.5rem] font-black text-3xl shadow-2xl hover:bg-green-700 active:scale-95 transition-all"
          >
            ANA SAYFAYA DÖN 🏠
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">
      <div className="bg-green-600 rounded-[3rem] p-8 text-white shadow-2xl flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black mb-1 uppercase tracking-tighter text-shadow-sm">🟢 SEVİYE 1: GÜVENLİK YOLU</h2>
          <p className="opacity-90 font-bold">Puan: {points}</p>
        </div>
        <div className="text-4xl font-black">{currentIdx + 1}/20</div>
      </div>

      <div className={`bg-white rounded-[4rem] p-12 shadow-2xl border-b-[16px] border-green-100 text-center transition-all ${feedback ? 'scale-95 opacity-50' : ''}`}>
        <div className="mb-8 flex justify-center">
           <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center text-7xl animate-bounce shadow-inner">
             {shuffledTasks[currentIdx].icon}
           </div>
        </div>
        <h3 className="text-4xl font-black text-slate-800 mb-4">{shuffledTasks[currentIdx].text}</h3>
        <p className="text-xl text-slate-500 font-bold mb-12">Bu öğe sence ne kadar güvenli?</p>

        <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
          <button onClick={() => handleAction('SAFE')} className="bg-green-500 hover:bg-green-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl transform active:scale-95 transition-all border-b-8 border-green-800">GÜVENLİ ✅</button>
          <button onClick={() => handleAction('DANGER')} className="bg-red-500 hover:bg-red-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl transform active:scale-95 transition-all border-b-8 border-red-800">TEHLİKELİ 🛑</button>
        </div>
      </div>

      {feedback && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in`}>
          <div className="bg-white rounded-[3.5rem] p-10 max-w-lg w-full shadow-2xl text-center border-t-[12px] border-indigo-500">
            <div className="text-7xl mb-6">{feedback.isCorrect ? '🌟' : '💡'}</div>
            <h4 className={`text-2xl font-black mb-4 ${feedback.isCorrect ? 'text-green-600' : 'text-amber-600'}`}>
              {feedback.isCorrect ? 'HARİKA SEÇİM!' : 'BİR İPUCU!'}
            </h4>
            <p className="text-xl text-slate-600 font-bold mb-10 leading-relaxed">{feedback.msg}</p>
            <button 
              onClick={nextTask} 
              className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-indigo-700 active:scale-95 transition-all"
            >
              DEVAM ET ⏭️
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        {shuffledTasks.map((t, i) => (
          <div key={i} className={`w-8 h-8 rounded-full border-2 transition-all ${i < currentIdx ? 'bg-green-500 border-green-600' : i === currentIdx ? 'bg-amber-400 border-amber-600 scale-125' : 'bg-slate-100 border-slate-200'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Level1Games;
