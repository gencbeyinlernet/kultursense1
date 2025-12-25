
import React, { useState, useMemo, useRef } from 'react';

type ModuleType = 
  | 'DIGITAL_CITY' | 'ESCAPE_ROOM' | 'INFO_HUNTER' | 'CROSSWORD' | 'SCRABBLE' 
  | 'TANGRAM' | 'ETHICAL_PRODUCER' | 'QA' | 'MEMORY' 
  | 'MATCHING' | 'FILL_BLANKS';

interface GameModule {
  id: ModuleType;
  title: string;
  icon: string;
  description: string;
  color: string;
}

const modules: GameModule[] = [
  { id: 'DIGITAL_CITY', title: 'Dijital Şehir', icon: '🏙️', description: 'Şehri Koru!', color: 'bg-indigo-600' },
  { id: 'ESCAPE_ROOM', title: 'Kaçış Odası', icon: '🧩', description: 'Kapıları Aç!', color: 'bg-slate-800' },
  { id: 'INFO_HUNTER', title: 'Bilgi Avcıları', icon: '🕵️‍♂️', description: 'Dedektif Görevi', color: 'bg-amber-500' },
  { id: 'CROSSWORD', title: 'Veri Tamiri', icon: '📝', description: 'Bozuk Veriyi Düzelt', color: 'bg-indigo-500' },
  { id: 'SCRABBLE', title: 'Sihirli Kelime', icon: '🔠', description: 'Değeri Bul', color: 'bg-purple-500' },
  { id: 'TANGRAM', title: 'Yapay Zeka Mimarı', icon: '📐', description: 'Şekli Tamamla', color: 'bg-orange-500' },
  { id: 'ETHICAL_PRODUCER', title: 'Sanat Atölyesi', icon: '🌱', description: 'Birlikte Üretelim', color: 'bg-emerald-500' },
  { id: 'QA', title: 'Bilge Robot', icon: '🤖', description: 'Doğru Karar Ver', color: 'bg-red-500' },
  { id: 'MEMORY', title: 'Zihin Gücü', icon: '🧠', description: 'Odaklan ve Bul', color: 'bg-cyan-500' },
  { id: 'MATCHING', title: 'Bağlantı Kur', icon: '🤝', description: 'Güvenli Çizgi', color: 'bg-orange-500' },
  { id: 'FILL_BLANKS', title: 'Muhafız Yemini', icon: '✍️', description: 'Manifestoyu Tamamla', color: 'bg-slate-700' },
];

const FinalGame: React.FC<{ onComplete: (scores: any) => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [phase, setPhase] = useState<'INTRO' | 'PLAYING' | 'RESULT' | 'CERTIFICATE'>('INTRO');
  const [userName, setUserName] = useState('');
  const [moduleState, setModuleState] = useState<any>({});
  const [taskDone, setTaskDone] = useState(false);
  const [producerFeedback, setProducerFeedback] = useState<string | null>(null);

  const activeModule = modules[currentModuleIdx];

  const handleTaskComplete = () => {
    setTaskDone(true);
  };

  const nextModule = () => {
    if (currentModuleIdx < modules.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setTaskDone(false);
      setModuleState({});
      setProducerFeedback(null);
    } else {
      setPhase('RESULT');
    }
  };

  const generateAndDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 850;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 850);

    ctx.strokeStyle = '#312e81'; 
    ctx.lineWidth = 30;
    ctx.strokeRect(15, 15, 1170, 820);
    
    ctx.strokeStyle = '#fbbf24'; 
    ctx.lineWidth = 5;
    ctx.strokeRect(55, 55, 1090, 740);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold 60px Nunito, sans-serif';
    ctx.fillText('DİJİTAL REHBER SERTİFİKASI', 600, 180);

    ctx.font = '700 24px Nunito, sans-serif';
    ctx.fillStyle = '#6366f1';
    ctx.fillText('KÜLTÜRSENSE ETİK TEKNOLOJİ AKADEMİSİ', 600, 230);

    ctx.fillStyle = '#4b5563';
    ctx.font = '600 28px Nunito, sans-serif';
    ctx.fillText('Yapay zeka etiği ve dijital okuryazarlık alanındaki', 600, 340);
    ctx.fillText('10 ana seviye ve final görevlerini başarıyla tamamlayan', 600, 380);

    ctx.fillStyle = '#1e1b4b';
    ctx.font = '900 80px Nunito, sans-serif';
    ctx.fillText(userName.toUpperCase(), 600, 500);

    ctx.fillStyle = '#b45309';
    ctx.font = '800 36px Nunito, sans-serif';
    ctx.fillText('ÜSTÜN BAŞARILI DİJİTAL REHBER', 600, 600);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px Nunito, sans-serif';
    ctx.fillText(`Sertifika No: KS-${Math.floor(Math.random() * 100000)}`, 600, 700);
    ctx.fillText(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, 600, 730);

    ctx.beginPath();
    ctx.arc(1000, 650, 80, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 24px Nunito, sans-serif';
    ctx.fillText('ETİK', 1000, 645);
    ctx.fillText('ONAYLI', 1000, 675);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `KulturSense_Sertifika_${userName}.png`;
    link.href = dataUrl;
    link.click();
    
    onComplete({ score: 1000 });
  };

  const renderGameModule = () => {
    switch (activeModule.id) {
      case 'DIGITAL_CITY':
        const locations = [
          { id: 'school', name: 'Okul', icon: '🏫', event: 'Bir arkadaşın "Ödevini bitirdiysen şifreni ver ben de bakayım" diyor.' },
          { id: 'game', name: 'Oyun Alanı', icon: '🎮', event: 'Ekranda "Tebrikler! 1000 Elmas kazandın, almak için tıkla" yazıyor.' },
          { id: 'home', name: 'Ev', icon: '🏠', event: 'Sosyal medyada bir yabancı sana "Nerede oturuyorsun? Sana hediye yollayalım" dedi.' },
          { id: 'msg', name: 'Mesaj Merkezi', icon: '💬', event: 'Hiç tanımadığın birinden "Naber, kamera açar mısın?" diye bir mesaj geldi.' }
        ];

        const citySafeCount = moduleState.safeLocations?.length || 0;
        const currentLocation = locations.find(l => l.id === moduleState.activeLocation);

        const handleCityAction = (action: 'APPROACH' | 'AVOID' | 'REPORT') => {
          if (!currentLocation) return;
          
          if (action === 'REPORT' || action === 'AVOID') {
            const newSafe = Array.from(new Set([...(moduleState.safeLocations || []), currentLocation.id]));
            setModuleState({ ...moduleState, safeLocations: newSafe, activeLocation: null });
            if (newSafe.length === 4) handleTaskComplete();
            setProducerFeedback(action === 'REPORT' ? "Harika! Bildirerek mahalleyi daha güvenli yaptın. ✅" : "Akıllıca! Uzaklaşarak kendini korudun. 👍");
          } else {
            setProducerFeedback("Bu tehlikeli bir seçim! Tekrar düşünmelisin. ❌");
          }
        };

        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 flex justify-between items-center">
               <div className="text-left">
                  <h4 className="text-xl font-black text-indigo-900">🏙️ Şehir Güvenliği</h4>
                  <p className="text-sm font-bold text-slate-500 italic">"Geleceğin dünyası senin seçimlerinle kuruluyor."</p>
               </div>
               <div className="bg-white px-6 py-2 rounded-2xl border-2 border-indigo-200 font-black text-2xl text-indigo-600">
                  %{Math.floor((citySafeCount / 4) * 100)} GÜVENLİ
               </div>
            </div>

            {!currentLocation ? (
              <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto p-4 bg-slate-100 rounded-[3rem] border-4 border-dashed border-slate-200">
                {locations.map(loc => {
                  const isSafe = (moduleState.safeLocations || []).includes(loc.id);
                  return (
                    <button 
                      key={loc.id}
                      onClick={() => setModuleState({ ...moduleState, activeLocation: loc.id })}
                      className={`p-10 rounded-[2.5rem] bg-white shadow-xl transition-all transform hover:scale-105 active:scale-95 border-b-8 ${isSafe ? 'border-green-500 opacity-60' : 'border-indigo-200'}`}
                    >
                      <div className="text-6xl mb-4">{loc.icon}</div>
                      <div className="font-black text-slate-800">{loc.name}</div>
                      {isSafe && <div className="text-xs font-black text-green-600 mt-2 uppercase tracking-widest">GÜVENLİ ✅</div>}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-indigo-50 animate-fade-in">
                <div className="text-8xl mb-6">{currentLocation.icon}</div>
                <h4 className="text-2xl font-black text-slate-800 mb-4">{currentLocation.name} Bölgesinde Olay!</h4>
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 border-l-8 border-indigo-500 italic text-xl">
                    "{currentLocation.event}"
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <button onClick={() => handleCityAction('APPROACH')} className="bg-slate-100 hover:bg-red-100 p-6 rounded-2xl font-black text-slate-800 border-b-4 border-slate-300">YAKLAŞ 🏃‍♂️</button>
                  <button onClick={() => handleCityAction('AVOID')} className="bg-amber-100 hover:bg-amber-200 p-6 rounded-2xl font-black text-amber-800 border-b-4 border-amber-300">UZAKLAŞ 🏃‍♀️</button>
                  <button onClick={() => handleCityAction('REPORT')} className="bg-green-100 hover:bg-green-200 p-6 rounded-2xl font-black text-green-800 border-b-4 border-green-300">BİLDİR 📢</button>
                </div>
              </div>
            )}

            {producerFeedback && (
              <div className={`mt-4 p-4 rounded-2xl font-bold animate-fade-in ${producerFeedback.includes('❌') ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                {producerFeedback}
              </div>
            )}
          </div>
        );

      case 'ESCAPE_ROOM':
        const escapeLocks = [
          { 
            id: 'PASSWORD', 
            label: 'Güçlü Şifre', 
            icon: '🔐',
            question: 'Seni en iyi hangi şifre korur?',
            options: [
              { text: '123456', isCorrect: false, fb: 'Çok zayıf! Hackerlar bunu 1 saniyede çözer.' },
              { text: 'adim123', isCorrect: false, fb: 'Kişisel bilgiler şifre olmamalıdır.' },
              { text: 'K7!uR*26s', isCorrect: true, fb: 'Harika! Büyük-küçük harf, rakam ve sembol içeren karmaşık şifre en iyisidir.' }
            ]
          },
          { 
            id: 'FAKE_NEWS', 
            label: 'Haber Analizi', 
            icon: '🔍',
            question: 'Hangi habere inanmalısın?',
            options: [
              { text: '"İnanılmaz! Robotlar okulda öğretmenlerin yerini alıyor!" (Kaynaksız)', isCorrect: false, fb: 'Şok edici ve kaynağı olmayan haberler genellikle sahtedir.' },
              { text: '"Milli Eğitim Bakanlığı, teknoloji derslerini artırıyor." (Resmi Site)', isCorrect: true, fb: 'Doğru! Resmi kaynaklardan gelen haberler her zaman daha güvenilirdir.' }
            ]
          },
          { 
            id: 'BULLYING', 
            label: 'Siber Zorbalık', 
            icon: '🛑',
            question: 'Biri grupta sana kaba bir mesaj attı. Ne yaparsın?',
            options: [
              { text: 'Ben de ona kaba yazarım', isCorrect: false, fb: 'Kavgaya ortak olmak sorunu büyütür.' },
              { text: 'Mesajı raporla ve aileme söyle', isCorrect: true, fb: 'En doğrusu! Bildirerek ve yardım isteyerek zorbalığı durdurabilirsin.' }
            ]
          },
          { 
            id: 'AI_HELP', 
            label: 'Yapay Zeka Yardımı', 
            icon: '🤖',
            question: 'Ödevinde yapay zekayı nasıl kullanmalısın?',
            options: [
              { text: 'Ödevi tamamen ona yazdırırım', isCorrect: false, fb: 'Bu kopya çekmektir ve seni geliştirmez.' },
              { text: 'Anlamadığım yerleri ona sorar, fikir alırım', isCorrect: true, fb: 'Mükemmel! Yapay Zeka bir yardımcıdır, asıl işi sen yapmalısın.' }
            ]
          }
        ];

        const openedLocks = moduleState.openedLocks || [];
        const currentLockIdx = openedLocks.length;
        const currentLock = escapeLocks[currentLockIdx];

        const handleEscapeAction = (isCorrect: boolean, fb: string) => {
          if (isCorrect) {
            const nextLocks = [...openedLocks, currentLock.id];
            setModuleState({ ...moduleState, openedLocks: nextLocks });
            setProducerFeedback(`Tebrikler! ${currentLock.label} kilidini açtın. 🔓`);
            if (nextLocks.length === 4) handleTaskComplete();
          } else {
            setProducerFeedback(`${fb} ❌ Tekrar dene!`);
          }
        };

        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="bg-slate-900 p-8 rounded-[3rem] border-4 border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="flex justify-center gap-6 mb-10">
                {escapeLocks.map((lock, i) => (
                  <div 
                    key={lock.id} 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 border-b-4 ${
                      openedLocks.includes(lock.id) ? 'bg-green-50 border-green-700 text-white' : 
                      i === currentLockIdx ? 'bg-indigo-600 border-indigo-800 text-white animate-pulse' : 
                      'bg-slate-800 border-slate-950 text-slate-600'
                    }`}
                  >
                    {openedLocks.includes(lock.id) ? '🔓' : lock.icon}
                  </div>
                ))}
              </div>

              {!taskDone ? (
                <div className="animate-fade-in">
                  <h4 className="text-white text-sm font-black uppercase tracking-widest opacity-40 mb-2">Kilit {currentLockIdx + 1}: {currentLock.label}</h4>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-8">🧩 {currentLock.question}</h3>
                  <div className="grid gap-4 max-w-xl mx-auto">
                    {currentLock.options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleEscapeAction(opt.isCorrect, opt.fb)}
                        className="bg-slate-800 hover:bg-slate-700 text-white p-6 rounded-2xl font-black text-xl border-b-4 border-slate-950 transition-all text-left flex justify-between items-center group"
                      >
                        <span>{opt.text}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">🔑</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in py-10">
                  <div className="text-9xl mb-6">🏆</div>
                  <h3 className="text-4xl font-black text-white mb-4">ODADAN ÇIKTIN!</h3>
                  <p className="text-green-400 font-black text-xl uppercase tracking-widest animate-pulse">"DİJİTAL GÜVENLİK USTASI" UNVANINI KAZANDIN</p>
                </div>
              )}
            </div>

            {producerFeedback && (
              <div className={`mt-4 p-4 rounded-2xl font-bold animate-fade-in ${producerFeedback.includes('❌') ? 'text-red-400 bg-red-950/30' : 'text-green-400 bg-green-950/30'}`}>
                {producerFeedback}
              </div>
            )}
          </div>
        );

      case 'INFO_HUNTER':
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="bg-amber-50 p-6 md:p-8 rounded-[3rem] border-4 border-amber-100 mb-6 relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase shadow-lg">
                DEDEKTİF DOSYASI #003
              </div>
              <h4 className="text-2xl font-black text-amber-900 mb-4 mt-2">Hangi Haber Güvenilir? 🕵️‍♂️</h4>
              
              <div className="flex flex-wrap justify-center gap-4 mb-2">
                 <div className="bg-white/60 px-4 py-2 rounded-xl border-2 border-amber-200 text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-2">
                    <span>🕵️‍♂️ İPUCU 1:</span> Kaynak var mı?
                 </div>
                 <div className="bg-white/60 px-4 py-2 rounded-xl border-2 border-amber-200 text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-2">
                    <span>🕵️‍♂️ İPUCU 2:</span> Çok mu korkutucu?
                 </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <button 
                onClick={() => setProducerFeedback("Bu haber bir tuzak! 🚨 'İnanılmaz' ve 'çok korkutucu' kelimeler kullanılmış, üstelik kaynağı belirsiz. Sahte bilgilerin en büyük silahı korkudur! ❌")}
                className={`group relative p-8 bg-white border-4 rounded-[3rem] transition-all transform hover:scale-105 active:scale-95 text-left shadow-xl ${producerFeedback && !taskDone ? 'border-red-500 ring-4 ring-red-100 bg-red-50' : 'border-slate-100 hover:border-amber-400'}`}
              >
                <div className="absolute -top-4 -right-4 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">🚨</div>
                <div className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-3">ŞOK EDİCİ HABER!</div>
                <h5 className="text-2xl font-black text-slate-800 leading-tight mb-4 uppercase">
                  "İNANILMAZ! ROBOTLAR TÜM DÜNYAYI ELE GEÇİRDİ, YARIN ARTIK HİÇBİR OKUL AÇILMAYACAK!"
                </h5>
                <div className="mt-6 pt-6 border-t-2 border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-xl">🌐</div>
                  <div>
                    <div className="text-[9px] font-black text-slate-400 uppercase">KAYNAK</div>
                    <div className="text-xs font-bold text-slate-600 text-red-500">Belirsiz / Bilinmiyor</div>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  setProducerFeedback("Tebrikler Dedektif! 🏆 Haberin sade diline ve resmi kaynağına bakarak doğruyu buldun. Eleştirel düşünme gücün harika! ✅");
                  handleTaskComplete();
                }}
                className={`group relative p-8 bg-white border-4 rounded-[3rem] transition-all transform hover:scale-105 active:scale-95 text-left shadow-xl ${taskDone ? 'border-green-500 ring-4 ring-green-100 bg-green-50' : 'border-slate-100 hover:border-amber-400'}`}
              >
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg -rotate-12 group-hover:rotate-0 transition-transform">📰</div>
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">RESMİ BİLGİLENDİRME</div>
                <h5 className="text-2xl font-black text-slate-800 leading-tight mb-4">
                  "Bazı okullarımızda deneme amaçlı yardımcı eğitim robotları kullanılmaya başlandı."
                </h5>
                <div className="mt-6 pt-6 border-t-2 border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">🏛️</div>
                  <div>
                    <div className="text-[9px] font-black text-slate-400 uppercase">KAYNAK</div>
                    <div className="text-xs font-bold text-slate-600 text-blue-600">Milli Eğitim Bakanlığı</div>
                  </div>
                </div>
              </button>
            </div>

            {producerFeedback && (
              <div className={`mt-10 p-8 rounded-[2.5rem] border-4 animate-fade-in shadow-lg ${taskDone ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                <p className="text-2xl font-black leading-relaxed">{producerFeedback}</p>
              </div>
            )}
          </div>
        );

      case 'CROSSWORD':
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="bg-indigo-50 p-8 rounded-[3rem] border-2 border-indigo-100 mb-6">
                <div className="text-6xl mb-4">🔧</div>
                <h4 className="text-2xl font-black text-indigo-900 mb-2">Vaka: Bozuk Veri Paketi!</h4>
                <p className="text-indigo-700 italic">"Siber saldırı sonucunda önemli bir veri paketi bozuldu. Paketi tamir etmek için eksik harfi bul."</p>
            </div>
            <p className="text-3xl font-black text-slate-700 tracking-widest">V <span className="text-indigo-600 border-b-8 border-indigo-200 px-4">_</span> R İ</p>
            <div className="flex justify-center gap-4 mt-8">
                {['A', 'E', 'O', 'I'].map(harf => (
                    <button 
                        key={harf}
                        onClick={() => {
                            if (harf === 'E') handleTaskComplete();
                            else alert('Yanlış veri! Paketi bozabilirsin. ❌');
                        }}
                        className={`w-20 h-20 rounded-2xl font-black text-3xl shadow-xl transition-all active:scale-90 ${taskDone && harf === 'E' ? 'bg-green-500 text-white' : 'bg-white text-indigo-600 border-4 border-indigo-50 hover:border-indigo-500'}`}
                    >
                        {harf}
                    </button>
                ))}
            </div>
            {taskDone && <div className="text-green-500 font-black text-2xl animate-bounce mt-8">VERİ PAKETİ TAMİR EDİLDİ! ✅ (VERİ)</div>}
          </div>
        );

      case 'SCRABBLE':
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="bg-purple-50 p-8 rounded-[3rem] border-2 border-purple-100 mb-6">
                <div className="text-6xl mb-4">🧙‍♂️</div>
                <h4 className="text-2xl font-black text-purple-900 mb-2">Kelime Sihirbazı Atölyesi</h4>
                <p className="text-purple-700 italic">"Dijital dünyanın en güçlü tılsımını oluşturmak için harfleri doğru sırayla birleştir."</p>
            </div>
            <div className="flex justify-center gap-4">
               {['İ', 'T', 'E', 'K'].map((h) => (
                 <button 
                  key={h}
                  onClick={() => {
                    const current = (moduleState.val || '') + h;
                    setModuleState({ val: current });
                    if (current === 'ETİK') handleTaskComplete();
                    if (!'ETİK'.startsWith(current)) {
                        setModuleState({ val: '' });
                        alert('Büyü bozuldu! Baştan başla. ✨');
                    }
                  }}
                  className="w-16 h-16 bg-white border-4 border-purple-200 rounded-xl flex items-center justify-center text-3xl font-black text-purple-600 hover:bg-purple-50 hover:scale-110 shadow-lg"
                 >
                   {h}
                 </button>
               ))}
            </div>
            <div className="text-5xl font-black text-purple-900 tracking-[1rem] h-14 mt-8 drop-shadow-md">{moduleState.val || '____'}</div>
            {taskDone && <p className="text-green-500 font-black text-xl animate-pulse">SİHİRLİ KELİME: ETİK! 🌟</p>}
          </div>
        );

      case 'ETHICAL_PRODUCER':
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="bg-emerald-50 p-8 rounded-[3rem] border-2 border-emerald-100 mb-6">
              <div className="text-6xl mb-4">🖼️</div>
              <h4 className="text-2xl font-black text-emerald-900 mb-2">Sanat Atölyesi: Doğa Afişi</h4>
              <p className="text-emerald-700 italic">"Yapay zeka asistanınla birlikte bir afiş hazırlayacaksın. Nasıl ilerlemek istersin?"</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button 
                onClick={() => setProducerFeedback("Bu yöntem etik değildir! Başkasının emeğini çalmak yerine kendi yaratıcılığını kullanmalısın. ❌")}
                className="p-8 bg-white border-4 border-slate-100 rounded-[2.5rem] hover:border-red-400 hover:bg-red-50 transition-all group shadow-xl"
              >
                <div className="text-4xl mb-4">📋</div>
                <div className="font-black text-slate-800 text-lg">Başka birinin resmini bulup kopyalamasını isterim.</div>
                <div className="text-xs text-red-500 font-bold mt-4 uppercase">RİSKLİ YOL</div>
              </button>
              
              <button 
                onClick={() => {
                  setProducerFeedback("Harika seçim! Yapay zekâ senin yardımcındır, asıl üretici sensin. Bu etik ve bilinçli bir kullanımdır! ✅");
                  handleTaskComplete();
                }}
                className="p-8 bg-white border-4 border-slate-100 rounded-[2.5rem] hover:border-emerald-500 hover:bg-emerald-50 transition-all group shadow-xl"
              >
                <div className="text-4xl mb-4">🎨</div>
                <div className="font-black text-slate-800 text-lg">Kendi fikrimi söylerim, Yapay Zeka'nın bana farklı taslaklar sunmasını beklerim.</div>
                <div className="text-xs text-emerald-500 font-bold mt-4 uppercase">BİLİNÇLİ YOL</div>
              </button>
            </div>

            {producerFeedback && (
              <div className={`mt-8 p-6 rounded-[2rem] border-4 animate-fade-in ${taskDone ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                <p className="text-xl font-black">{producerFeedback}</p>
                {taskDone && <p className="mt-2 text-sm opacity-80 uppercase font-black tracking-widest italic">"Sen üretirsin, teknoloji sadece fırçandır."</p>}
              </div>
            )}
          </div>
        );

      case 'QA':
        return (
          <div className="space-y-8 animate-fade-in max-w-2xl mx-auto text-center">
            <div className="bg-red-50 p-10 rounded-[4rem] border-4 border-red-100 shadow-xl relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl">🤖</div>
              <h4 className="text-2xl font-black text-red-900 mt-6 mb-4">Bilge Robot'un Sorusu:</h4>
              <p className="text-xl font-bold text-red-700 italic">"Dostum, sence yapay zeka senin yerine tüm ödevlerini yapmalı mı?"</p>
            </div>
            <div className="grid gap-4 mt-12">
              <button 
                onClick={handleTaskComplete} 
                className={`p-6 bg-white border-4 border-slate-100 rounded-3xl hover:border-green-500 font-black text-xl text-left transition-all ${taskDone ? 'border-green-500 bg-green-50' : ''}`}
              >
                Hayır, o sadece anlamadığım yerlerde bana fikir veren bir yardımcıdır. 👨‍🎓
              </button>
              <button 
                onClick={() => alert('Bilge Robot üzüldü: "Eğer ben yaparsam sen nasıl gelişirsin?" 🤖💔')} 
                className="p-6 bg-white border-4 border-slate-100 rounded-3xl hover:border-red-500 font-black text-xl text-left transition-all"
              >
                Evet, o benden daha hızlı yapıyor, zamanım bana kalır. 🎮
              </button>
            </div>
            {taskDone && <p className="text-green-600 font-black text-xl animate-bounce">Aferin! Sen kontrol edensin. 🏆</p>}
          </div>
        );

      case 'FILL_BLANKS':
        return (
          <div className="space-y-8 animate-fade-in max-w-2xl mx-auto text-center">
             <div className="bg-slate-800 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">✍️</div>
                <h4 className="text-2xl font-black mb-8 uppercase tracking-widest text-slate-400">Dijital Muhafız Yemini</h4>
                <p className="text-3xl font-black leading-relaxed">
                  "Yapay zeka her zaman bir <span className="text-amber-400 border-b-4 border-amber-400 px-4">?</span> tarafından denetlenmelidir."
                </p>
             </div>
             <div className="grid grid-cols-2 gap-6 mt-12">
               <button onClick={handleTaskComplete} className="bg-indigo-600 text-white py-6 rounded-3xl font-black text-3xl shadow-xl hover:bg-indigo-700 active:scale-95 transition-all">İNSAN</button>
               <button onClick={() => alert('Unutma, makineler hata yapabilir! 🤖')} className="bg-slate-200 text-slate-800 py-6 rounded-3xl font-black text-3xl shadow-xl hover:bg-slate-300">ROBOT</button>
             </div>
             {taskDone && <p className="text-slate-800 font-black text-2xl animate-pulse">MUHAFIZ YEMİNİ TAMAMLANDI! 🛡️</p>}
          </div>
        );

      default:
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="text-9xl animate-float">{activeModule.icon}</div>
            <p className="text-2xl font-black text-slate-800">{activeModule.description}</p>
            <button 
              onClick={handleTaskComplete}
              className={`px-12 py-6 rounded-full font-black text-2xl text-white shadow-xl ${activeModule.color} transform active:scale-95 transition-all animate-pulse`}
            >
              GÖREVİ GERÇEKLEŞTİR ⚡
            </button>
          </div>
        );
    }
  };

  if (phase === 'INTRO') {
    return (
      <div className="max-w-4xl mx-auto py-12 animate-fade-in text-center">
         <div className="bg-indigo-600 rounded-[4rem] p-16 text-white shadow-2xl border-b-[20px] border-indigo-900">
            <div className="text-9xl mb-10 animate-float">💎</div>
            <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase">Büyük Final!</h2>
            <p className="text-2xl font-bold opacity-90 mb-12 leading-relaxed">
              Bu bir atlama yarışı değil, bir ustalık yolculuğudur. 10 ana seviye ve final görevlerini başarıyla tamamla ve Dijital Rehber Sertifikanı kazan!
            </p>
            <button 
              onClick={() => setPhase('PLAYING')}
              className="bg-white text-indigo-600 px-20 py-8 rounded-full font-black text-4xl shadow-2xl hover:bg-indigo-50 active:scale-95 transition-all border-b-8 border-indigo-200"
            >
              YOLCULUĞA BAŞLA 🚀
            </button>
         </div>
      </div>
    );
  }

  if (phase === 'RESULT') {
    return (
      <div className="max-w-3xl mx-auto py-12 animate-fade-in text-center">
        <div className="bg-white rounded-[4rem] p-16 shadow-2xl border-b-[20px] border-slate-100">
           <div className="text-9xl mb-8">🏅</div>
           <h2 className="text-5xl font-black text-indigo-900 mb-4">EFSANEVİ BAŞARI!</h2>
           <p className="text-xl font-bold text-slate-500 mb-12 uppercase tracking-widest">Geleceğin dünyası seninle daha güvenli.</p>
           
           <div className="bg-indigo-50 p-10 rounded-[3rem] mb-12 border-4 border-white shadow-inner">
              <label className="block text-sm font-black text-indigo-400 uppercase tracking-widest mb-4 text-left">Sertifika Sahibi:</label>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="İsim ve Soyisim..."
                className="w-full h-24 text-center text-4xl font-black text-indigo-900 bg-white rounded-[2rem] border-4 border-indigo-100 focus:border-indigo-500 outline-none px-8 shadow-sm"
              />
           </div>

           <button 
             disabled={userName.length < 3}
             onClick={() => setPhase('CERTIFICATE')}
             className={`w-full h-24 rounded-full font-black text-3xl text-white shadow-2xl transition-all ${userName.length < 3 ? 'bg-slate-300' : 'bg-green-600 hover:bg-green-700 border-b-8 border-green-900 active:scale-95'}`}
           >
             SERTİFİKAMIZI HAZIRLA ✨
           </button>
        </div>
      </div>
    );
  }

  if (phase === 'CERTIFICATE') {
    return (
      <div className="max-w-6xl mx-auto py-12 animate-fade-in text-center space-y-12">
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        <div className="bg-white border-[24px] border-indigo-900 p-12 shadow-2xl rounded-sm mx-auto relative overflow-hidden text-center">
           <div className="relative z-10 space-y-10 border-4 border-amber-400 p-12">
              <div className="flex justify-center"><div className="w-24 h-24 bg-indigo-900 rounded-2xl flex items-center justify-center text-white text-4xl font-black">KS</div></div>
              <h3 className="text-5xl font-black text-indigo-950">DİJİTAL REHBER SERTİFİKASI</h3>
              <p className="text-xl font-bold text-slate-500 max-w-2xl mx-auto">
                Yapay zeka etiği ve dijital okuryazarlık alanındaki tüm zorlu sınavları başarıyla tamamlayan;
              </p>
              <h4 className="text-7xl font-black text-indigo-950 uppercase border-b-8 border-slate-100 inline-block px-12 pb-4">
                {userName}
              </h4>
              <p className="text-3xl font-black text-amber-600 italic">"Üstün Başarılı Dijital Rehber"</p>
              
              <div className="flex justify-between items-end pt-16">
                 <div className="text-left text-slate-400 font-bold">
                    No: KS-FINAL<br/>
                    {new Date().toLocaleDateString('tr-TR')}
                 </div>
                 <div className="w-32 h-32 bg-amber-400 rounded-full border-8 border-amber-600 flex items-center justify-center shadow-xl rotate-12">
                    <span className="text-amber-900 font-black text-xs uppercase text-center leading-none">ETİK<br/>ONAYLI</span>
                 </div>
                 <div className="text-right">
                    <div className="w-48 h-0.5 bg-slate-300 mb-2"></div>
                    <div className="font-black text-indigo-950">KültürSense Kurulu</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Resmi Onay Belgesi</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center no-print">
          <button onClick={generateAndDownload} className="bg-indigo-600 text-white px-16 py-8 rounded-full font-black text-3xl shadow-2xl hover:bg-indigo-700 border-b-8 border-indigo-900 active:scale-95 transition-all">
            SERTİFİKAMIZI İNDİR 📥
          </button>
          <button onClick={() => window.print()} className="bg-slate-800 text-white px-16 py-8 rounded-full font-black text-3xl shadow-2xl hover:bg-black border-b-8 border-slate-950 active:scale-95 transition-all">
            YAZDIR 🖨️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-24 px-4">
      <div className="flex justify-between items-center bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border-b-[12px] border-indigo-50">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {modules.map((m, i) => (
            <div 
              key={m.id} 
              className={`h-4 rounded-full transition-all duration-500 shrink-0 ${
                i === currentModuleIdx ? 'bg-indigo-600 w-24 md:w-32' : 
                i < currentModuleIdx ? 'bg-green-500 w-6 md:w-8' : 
                'bg-slate-100 w-6 md:w-8'
              }`}
            ></div>
          ))}
        </div>
        <div className="text-indigo-600 font-black text-xl md:text-2xl uppercase tracking-widest bg-indigo-50 px-6 py-2 rounded-2xl shrink-0">
          {currentModuleIdx + 1}/11
        </div>
      </div>

      <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border-b-[24px] border-slate-50 text-center relative overflow-hidden min-h-[500px] flex flex-col justify-center">
        <div className="absolute top-0 left-0 p-12 opacity-5 text-9xl pointer-events-none">{activeModule.icon}</div>
        
        <div className="relative z-10">
          <div className={`inline-block px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest text-white mb-8 ${activeModule.color}`}>
            {activeModule.title}
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">{activeModule.description}</h3>
          
          <div className="mt-8">
            {renderGameModule()}
          </div>

          {taskDone && (
            <div className="mt-16 animate-fade-in">
              <button 
                onClick={nextModule}
                className="bg-green-500 hover:bg-green-600 text-white px-20 py-8 rounded-[3rem] font-black text-4xl shadow-2xl border-b-[12px] border-green-800 transform hover:scale-105 active:scale-95 transition-all"
              >
                SONRAKİ GÖREV ⏭️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalGame;
