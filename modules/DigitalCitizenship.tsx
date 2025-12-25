import React, { useState } from 'react';

const DigitalCitizenship: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PASSWORD' | 'FOOTPRINT' | 'ECHO' | 'BALANCE'>('PASSWORD');

  // --- TAB 1: Şifre Laboratuvarı ---
  const PasswordLab = () => {
    const [password, setPassword] = useState('');
    
    const checkStrength = (pass: string) => {
      let score = 0;
      if (pass.length > 7) score += 1;
      if (pass.length > 11) score += 1;
      if (/[A-Z]/.test(pass)) score += 1;
      if (/[0-9]/.test(pass)) score += 1;
      if (/[^A-Za-z0-9]/.test(pass)) score += 1;
      return score;
    };

    const score = checkStrength(password);
    const width = (score / 5) * 100;
    
    let color = 'bg-red-500';
    let label = 'Çok Zayıf 😱';
    if (score > 1) { color = 'bg-orange-500'; label = 'Zayıf 😕'; }
    if (score > 2) { color = 'bg-yellow-500'; label = 'Orta 😐'; }
    if (score > 3) { color = 'bg-blue-500'; label = 'Güçlü 💪'; }
    if (score > 4) { color = 'bg-green-500'; label = 'Süper Güçlü! 🛡️'; }

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800">🔐 Şifre Laboratuvarı</h3>
        <p className="text-gray-600">Hackerların tahmin edemeyeceği bir şifre oluşturabilir misin? (Merak etme, şifreni kaydetmiyoruz!)</p>
        
        <input 
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifreni buraya yazıp dene..."
          className="w-full p-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none"
        />

        <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${width}%` }}></div>
        </div>
        <p className={`font-bold text-xl ${color.replace('bg-', 'text-')}`}>{password ? label : 'Bir şeyler yaz...'}</p>

        <div className="bg-slate-50 p-4 rounded-xl text-sm space-y-2 text-slate-700">
          <p>✅ En az 8 karakter olmalı</p>
          <p>✅ Büyük harf (A-Z) içermeli</p>
          <p>✅ Rakam (0-9) içermeli</p>
          <p>✅ Sembol (@, !, #) içermeli</p>
        </div>
      </div>
    );
  };

  // --- TAB 2: Dijital Ayak İzi Temizliği ---
  const FootprintCleaner = () => {
    const [posts, setPosts] = useState([
      { id: 1, text: "Bugün hava çok güzel! ☀️", risky: false, deleted: false },
      { id: 2, text: "Ev adresim: Çiçek Mah. No:5 🏠", risky: true, deleted: false },
      { id: 3, text: "2 hafta tatile gidiyoruz, ev boş! ✈️", risky: true, deleted: false },
      { id: 4, text: "Kedim Pamuk çok tatlı 🐈", risky: false, deleted: false },
      { id: 5, text: "Okul numaram 12345, şifrem 12345 🔑", risky: true, deleted: false },
    ]);

    const handleDelete = (id: number, isRisky: boolean) => {
      setPosts(posts.map(p => p.id === id ? { ...p, deleted: true } : p));
      if (isRisky) alert("Tebrikler! Tehlikeli bir bilgiyi sildin ve güvendesin. ✅");
      else alert("Bu zararsız bir paylaşımdı ama silmek senin tercihin. 👍");
    };

    const riskyLeft = posts.filter(p => p.risky && !p.deleted).length;

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-blue-800">👣 Ayak İzi Temizliği</h3>
        <p className="text-gray-600">Aşağıda bir sosyal medya profili var. <b>Tehlikeli</b> bilgileri bul ve "Sil" butonuna basarak temizle!</p>
        
        <div className="bg-gray-100 p-4 rounded-xl space-y-3 max-h-80 overflow-y-auto">
          {posts.map(post => (
            !post.deleted && (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center animate-fade-in">
                <span>{post.text}</span>
                <button 
                  onClick={() => handleDelete(post.id, post.risky)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-sm font-bold"
                >
                  Sil 🗑️
                </button>
              </div>
            )
          ))}
          {posts.every(p => p.deleted) && <div className="text-center text-gray-500">Tüm gönderiler silindi.</div>}
        </div>

        {riskyLeft === 0 ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold">
            Harika! Profil tamamen güvenli. 🎉
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center">
            Dikkat! Hala silinmesi gereken {riskyLeft} tehlikeli gönderi var. 🕵️‍♂️
          </div>
        )}
      </div>
    );
  };

  // --- TAB 3: Yankı Odası (Algoritma) ---
  const EchoChamber = () => {
    const [feed, setFeed] = useState<string[]>([]);
    const [counts, setCounts] = useState({ cat: 0, football: 0, space: 0 });

    const handleLike = (topic: 'cat' | 'football' | 'space') => {
      const newItems = Array(3).fill(
        topic === 'cat' ? 'Kedi Videosu 🐈' : 
        topic === 'football' ? 'Gol Videosu ⚽' : 'Roket Fırlatma 🚀'
      );
      setFeed([...newItems, ...feed].slice(0, 8));
      setCounts({ ...counts, [topic]: counts[topic] + 1 });
    };

    const total = counts.cat + counts.football + counts.space;
    const isBubble = total > 5 && (counts.cat > total * 0.8 || counts.football > total * 0.8 || counts.space > total * 0.8);

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-purple-800">📢 Yankı Odası Simülatörü</h3>
        <p className="text-gray-600">Bir konuyu beğendiğinde algoritmanın sana nasıl sadece o konuyu gösterdiğini izle.</p>
        
        <div className="flex justify-center gap-4">
          <button onClick={() => handleLike('cat')} className="p-4 bg-orange-100 rounded-xl hover:scale-105 transition">🐈 Beğen</button>
          <button onClick={() => handleLike('football')} className="p-4 bg-green-100 rounded-xl hover:scale-105 transition">⚽ Beğen</button>
          <button onClick={() => handleLike('space')} className="p-4 bg-indigo-100 rounded-xl hover:scale-105 transition">🚀 Beğen</button>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl min-h-[200px] border-2 border-gray-200">
           <h4 className="text-sm font-bold text-gray-400 mb-2">SENİN ANA SAYFAN (AKIŞ)</h4>
           {feed.length === 0 ? (
             <p className="text-center text-gray-400 mt-8">Henüz hiçbir şeyi beğenmedin. Akış boş.</p>
           ) : (
             <div className="space-y-2">
               {feed.map((item, i) => (
                 <div key={i} className="bg-white p-3 rounded shadow-sm border border-gray-100 animate-pulse">{item}</div>
               ))}
             </div>
           )}
        </div>

        {isBubble && (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl border-l-4 border-red-500 animate-bounce">
            <b>Uyarı: Yankı Odasına Düştün! 🎈</b>
            <br/>Artık sadece tek bir tür içerik görüyorsun. Dünyada başka şeyler de var, unutma!
            <button onClick={() => {setFeed([]); setCounts({cat:0, football:0, space:0})}} className="ml-4 underline">Sıfırla</button>
          </div>
        )}
      </div>
    );
  };

  // --- TAB 4: Dijital Denge ---
  const BalanceCalc = () => {
    const [hours, setHours] = useState({ game: 0, sleep: 8, study: 0, outside: 0 });
    
    const total = hours.game + hours.sleep + hours.study + hours.outside;
    const score = (hours.sleep >= 8 ? 2 : 0) + (hours.outside >= 2 ? 2 : 0) + (hours.study >= 2 ? 2 : 0) - (hours.game > 3 ? 2 : 0);

    let status = "Hesaplanıyor...";
    if (total > 24) status = "Günde sadece 24 saat var! 🕰️";
    else if (score >= 4) status = "Harika! Çok dengeli bir hayatın var. 🧘‍♂️";
    else if (score >= 0) status = "İdare eder, ama biraz daha dikkat. 🤔";
    else status = "Dikkat! Teknoloji seni yönetmeye başlamış (Dijital Zombi?). 🧟‍♂️";

    return (
      <div className="space-y-6">
         <h3 className="text-2xl font-bold text-teal-800">⚖️ Dijital Denge Terazisi</h3>
         <p className="text-gray-600">Bir gününü nasıl geçiriyorsun? Saatleri gir, sonucunu gör.</p>

         <div className="grid grid-cols-2 gap-4">
            <label className="block bg-blue-50 p-3 rounded-lg">
              <span className="block text-sm font-bold text-blue-800">😴 Uyku (Saat)</span>
              <input type="number" min="0" max="24" value={hours.sleep} onChange={e => setHours({...hours, sleep: +e.target.value})} className="w-full mt-1 p-2 rounded border"/>
            </label>
            <label className="block bg-red-50 p-3 rounded-lg">
              <span className="block text-sm font-bold text-red-800">🎮 Oyun/Tablet (Saat)</span>
              <input type="number" min="0" max="24" value={hours.game} onChange={e => setHours({...hours, game: +e.target.value})} className="w-full mt-1 p-2 rounded border"/>
            </label>
            <label className="block bg-yellow-50 p-3 rounded-lg">
              <span className="block text-sm font-bold text-yellow-800">📚 Ders/Okuma (Saat)</span>
              <input type="number" min="0" max="24" value={hours.study} onChange={e => setHours({...hours, study: +e.target.value})} className="w-full mt-1 p-2 rounded border"/>
            </label>
            <label className="block bg-green-50 p-3 rounded-lg">
              <span className="block text-sm font-bold text-green-800">🌳 Dışarı/Spor (Saat)</span>
              <input type="number" min="0" max="24" value={hours.outside} onChange={e => setHours({...hours, outside: +e.target.value})} className="w-full mt-1 p-2 rounded border"/>
            </label>
         </div>

         <div className={`p-6 rounded-xl text-center text-xl font-bold border-4 transition-all ${total > 24 ? 'bg-gray-200 border-gray-400' : score >= 4 ? 'bg-teal-100 border-teal-500 text-teal-900' : 'bg-orange-100 border-orange-500 text-orange-900'}`}>
            {status}
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-4xl">🌍</span> Dijital Vatandaşlık Merkezi
        </h2>
        <p className="text-gray-600 text-lg">İnternetin güvenli ve bilinçli bir kahramanı olmak için 4 farklı aracı kullan.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={() => setActiveTab('PASSWORD')} className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'PASSWORD' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>🔐 Şifre Kalkanı</button>
        <button onClick={() => setActiveTab('FOOTPRINT')} className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'FOOTPRINT' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 hover:bg-blue-50'}`}>👣 Ayak İzi</button>
        <button onClick={() => setActiveTab('ECHO')} className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'ECHO' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-purple-600 hover:bg-purple-50'}`}>📢 Yankı Odası</button>
        <button onClick={() => setActiveTab('BALANCE')} className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'BALANCE' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-teal-600 hover:bg-teal-50'}`}>⚖️ Dijital Denge</button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100 min-h-[400px]">
        {activeTab === 'PASSWORD' && <PasswordLab />}
        {activeTab === 'FOOTPRINT' && <FootprintCleaner />}
        {activeTab === 'ECHO' && <EchoChamber />}
        {activeTab === 'BALANCE' && <BalanceCalc />}
      </div>
    </div>
  );
};

export default DigitalCitizenship;