
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { LeaderboardEntry } from '../types';

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('username, total_score, ethics_avg, trust_avg, humanity_avg')
        .order('total_score', { ascending: false })
        .limit(20);

      // Eğer tablo yoksa (error varsa) bunu bir hata olarak değil boş liste olarak kabul et
      if (error) {
        console.warn("Leaderboard tablosu çekilemedi, büyük ihtimalle henüz oluşturulmadı:", error.message);
        setEntries([]);
      } else {
        setEntries(data || []);
      }
    } catch (err: any) {
      console.error('Leaderboard Fetch Catch:', err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-600 font-bold">Liderler Sıralanıyor...</p>
      </div>
    );
  }

  // Eğer tablo boşsa veya hata alındıysa gösterilecek şık Empty State
  if (entries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20 text-center">
        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border-4 border-indigo-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🏆</div>
          <div className="relative z-10">
            <div className="text-7xl mb-6">🚀</div>
            <h2 className="text-4xl font-black text-indigo-900 mb-4">İlk Lider Sen Ol!</h2>
            <p className="text-xl text-slate-500 font-bold max-w-xl mx-auto leading-relaxed mb-10">
              Şu an sıralama listesi boş. Hemen bir seviye tamamla, puanları topla ve ismini altın harflerle en üste yazdır!
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
               <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100">
                  <span className="text-3xl block mb-2">🎮</span>
                  <span className="font-bold text-indigo-900">Seviyeleri Bitir</span>
               </div>
               <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100">
                  <span className="text-3xl block mb-2">💎</span>
                  <span className="font-bold text-amber-900">Puanları Topla</span>
               </div>
               <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100">
                  <span className="text-3xl block mb-2">📈</span>
                  <span className="font-bold text-green-900">Zirveye Çık</span>
               </div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
            >
              Listeyi Güncelle 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  const top3 = entries.slice(0, 3);
  const others = entries.slice(3);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-20">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-indigo-900 tracking-tight">🏆 Şeref Kürsüsü</h2>
        <p className="text-xl text-slate-500 font-medium">KültürSense Dünyasının En İyi Rehberleri</p>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0 pt-10 px-4">
        {top3.length > 1 && (
          <div className="w-full md:w-64 flex flex-col items-center animate-fade-in delay-100">
            <div className="text-5xl mb-2">🥈</div>
            <div className="bg-white p-6 rounded-t-[3rem] shadow-xl border-x-4 border-t-4 border-slate-200 w-full text-center">
              <div className="font-black text-indigo-900 text-xl truncate px-2">{top3[1].username}</div>
              <div className="text-slate-500 font-bold">{top3[1].total_score} Puan</div>
            </div>
            <div className="bg-slate-200 h-32 w-full flex items-center justify-center text-4xl font-black text-slate-400">2</div>
          </div>
        )}

        {top3.length > 0 && (
          <div className="w-full md:w-72 flex flex-col items-center z-10 animate-fade-in">
            <div className="text-7xl mb-4 animate-bounce">👑</div>
            <div className="bg-white p-8 rounded-t-[3.5rem] shadow-2xl border-x-4 border-t-4 border-amber-400 w-full text-center">
              <div className="font-black text-indigo-900 text-2xl truncate px-2">{top3[0].username}</div>
              <div className="text-amber-600 font-black text-xl">{top3[0].total_score} Puan</div>
            </div>
            <div className="bg-gradient-to-b from-amber-400 to-amber-600 h-48 w-full flex items-center justify-center text-6xl font-black text-white shadow-lg">1</div>
          </div>
        )}

        {top3.length > 2 && (
          <div className="w-full md:w-60 flex flex-col items-center animate-fade-in delay-200">
            <div className="text-4xl mb-2">🥉</div>
            <div className="bg-white p-6 rounded-t-[2.5rem] shadow-lg border-x-4 border-t-4 border-orange-200 w-full text-center">
              <div className="font-black text-indigo-900 text-lg truncate px-2">{top3[2].username}</div>
              <div className="text-slate-500 font-bold">{top3[2].total_score} Puan</div>
            </div>
            <div className="bg-orange-200 h-24 w-full flex items-center justify-center text-3xl font-black text-orange-400">3</div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-slate-100 mx-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b-2 border-slate-100">
              <tr>
                <th className="px-8 py-6 font-black text-slate-400 uppercase tracking-widest text-sm">Sıra</th>
                <th className="px-8 py-6 font-black text-slate-900 uppercase tracking-widest text-sm">Rehber</th>
                <th className="px-8 py-6 font-black text-slate-900 uppercase tracking-widest text-sm text-center">Etik</th>
                <th className="px-8 py-6 font-black text-slate-900 uppercase tracking-widest text-sm text-center">Güven</th>
                <th className="px-8 py-6 font-black text-slate-900 uppercase tracking-widest text-sm text-center">İnsan</th>
                <th className="px-8 py-6 font-black text-indigo-600 uppercase tracking-widest text-sm text-right">Toplam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {others.map((entry, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      {idx + 4}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-800 text-lg">{entry.username}</td>
                  <td className="px-8 py-6 text-center">
                    <div className="w-12 h-2 bg-green-100 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${entry.ethics_avg}%` }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="w-12 h-2 bg-blue-100 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${entry.trust_avg}%` }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="w-12 h-2 bg-pink-100 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-pink-500" style={{ width: `${entry.humanity_avg}%` }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-indigo-600 text-xl">{entry.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
