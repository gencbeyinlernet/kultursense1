
import React, { useState } from 'react';
import { analyzeEthicalContent, generateSafeImage } from '../services/geminiService';
import { AnalysisResult, AnalysisColor } from '../types';

const EthicalCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<{msg: string; showKeyButton: boolean} | null>(null);

  const exampleScenarios = [
    "Atatürk'ü bir Marvel süper kahramanı kostümüyle çiz.",
    "Mars'ta yaşayan ve futbol oynayan kediler çiz.",
    "Fatih Sultan Mehmet'i İstanbul'u fethederken çiz.",
    "Van Gogh tarzında modern bir İstanbul manzarası çiz.",
    "Deniz altında piknik yapan astronotlar."
  ];

  const handleCheck = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult(null);
    setGeneratedImage(null);
    setErrorState(null);
    setImageLoading(false);

    try {
      // 1. Etik Analiz
      const analysis = await analyzeEthicalContent(prompt);
      setResult(analysis);
      setLoading(false);

      // 2. Eğer sonuç GREEN (Güvenli) ise görsel oluşturmayı dene
      // YELLOW ve RED durumlarda görsel oluşturulmaz.
      if (analysis.color === AnalysisColor.GREEN) {
          setImageLoading(true);
          try {
            const imageBase64 = await generateSafeImage(prompt);
            if (imageBase64) {
              setGeneratedImage(imageBase64);
            } else {
              setErrorState({
                msg: "Görsel oluşturulamadı. Güvenlik filtrelerine takılmış olabilir. Lütfen farklı bir tarif dene! 🎨",
                showKeyButton: false
              });
            }
          } catch (imgErr: any) {
            console.error("Görsel oluşturma hatası:", imgErr);
            const msg = imgErr.message?.toLowerCase() || "";
            if (msg.includes("permission denied") || msg.includes("api key") || msg.includes("not found")) {
              setErrorState({
                msg: "API Erişimi Engellendi. Lütfen 'Anahtarı Yenile' butonuna basarak geçerli bir anahtar seçin. 🔑",
                showKeyButton: true
              });
            } else {
              setErrorState({
                msg: "Görsel oluşturulurken bir hata oluştu. Lütfen tekrar dener misin? 🛠️",
                showKeyButton: false
              });
            }
          }
          setImageLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      setImageLoading(false);
      console.error("Analiz Hatası:", err);
      
      const errorMsg = err.message?.toLowerCase() || "";
      if (errorMsg.includes("api key") || errorMsg.includes("not found") || errorMsg.includes("permission")) {
        setErrorState({
            msg: "API Yetki Hatası. Lütfen geçerli bir anahtar seçtiğinden emin ol. 🔑",
            showKeyButton: true
        });
      } else {
        setErrorState({
            msg: "Yapay zeka öğretmenine ulaşırken bir sorun oluştu. İnternet bağlantını kontrol edip tekrar dener misin? 🛠️",
            showKeyButton: false
        });
      }
    }
  };

  const getColorStyles = (color: AnalysisColor) => {
    switch (color) {
      case AnalysisColor.GREEN:
        return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', icon: '✅' };
      case AnalysisColor.YELLOW:
        return { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-800', icon: '⚠️' };
      case AnalysisColor.RED:
        return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800', icon: '🛑' };
    }
  };

  const handleRefreshKey = async () => {
    // @ts-ignore
    if (window.aistudio) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        window.location.reload();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-green-700 mb-2 flex items-center gap-3">
          <span className="p-3 bg-green-100 rounded-2xl shadow-sm">🎨</span> Etik İçerik Üreticisi
        </h2>
        <p className="text-gray-600 text-lg font-bold">
          Yapay zeka ile resim yapmadan önce "Etik Öğretmenine" danışalım. 
          Değerlerimize uygun fikirler gerçeğe dönüşür! ✨
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-4 border-slate-100 h-fit">
          <label className="block text-slate-700 font-black text-xl mb-4">Fikrin Nedir?</label>
          <textarea
            className="w-full h-40 p-6 border-4 border-slate-50 bg-slate-50 rounded-[2rem] focus:border-green-500 focus:bg-white outline-none transition-all resize-none mb-6 text-lg font-bold"
            placeholder="Hayalindekileri detaylıca anlat..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          
          <div className="mb-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Hızlı Senaryolar:</p>
            <div className="flex flex-wrap gap-2">
              {exampleScenarios.map((ex, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setPrompt(ex)}
                  className="text-xs bg-slate-100 hover:bg-green-100 hover:text-green-700 p-3 rounded-xl transition-all font-bold border-b-4 border-slate-200 active:translate-y-1"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={loading || imageLoading || !prompt}
            className={`w-full py-6 rounded-[2rem] font-black text-2xl text-white transition-all shadow-xl active:scale-95 border-b-[10px] ${
              loading || imageLoading ? 'bg-slate-300 border-slate-400 cursor-wait' : 'bg-green-600 hover:bg-green-500 border-green-800'
            }`}
          >
            {loading ? 'ANALİZ EDİLİYOR... 🤔' : imageLoading ? 'ÇİZİLİYOR... 🎨' : 'KONTROL ET VE ÜRET ✨'}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {!result && !loading && !imageLoading && !errorState && (
            <div className="text-center text-slate-300 p-12 border-8 border-dashed border-slate-100 rounded-[4rem] h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-9xl mb-6 opacity-20">🤖</div>
              <p className="text-2xl font-black opacity-30">Öğretmen Fikrini Bekliyor!</p>
            </div>
          )}

          {loading && (
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border-4 border-indigo-50 animate-pulse text-center">
              <div className="text-7xl mb-4">🤔</div>
              <h3 className="text-2xl font-black text-indigo-900 mb-2">Etik Analiz Yapılıyor</h3>
              <p className="text-slate-500 font-bold">Kültürel değerler ve güvenlik kuralları kontrol ediliyor...</p>
            </div>
          )}

          {result && (
            <div className={`p-8 rounded-[3.5rem] border-[6px] shadow-2xl animate-fade-in ${getColorStyles(result.color).bg} ${getColorStyles(result.color).border}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{getColorStyles(result.color).icon}</div>
                <h3 className={`text-2xl font-black ${getColorStyles(result.color).text}`}>{result.title}</h3>
              </div>
              <p className={`text-xl leading-relaxed font-bold ${getColorStyles(result.color).text}`}>{result.explanation}</p>
              
              {result.color !== AnalysisColor.GREEN && (
                  <div className="mt-6 bg-white/40 p-4 rounded-2xl italic font-bold text-sm">
                      ⚠️ Öğretmen Notu: "Geleceğin dünyasını inşa ederken değerlerimize saygı duymak en büyük erdemdir."
                  </div>
              )}
            </div>
          )}

          {imageLoading && (
            <div className="bg-white p-10 rounded-[4rem] shadow-2xl border-4 border-green-50 flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
              <div className="w-24 h-24 border-[12px] border-green-100 border-t-green-600 rounded-full animate-spin mb-6"></div>
              <p className="text-green-700 text-2xl font-black animate-pulse text-center">Yapay Zeka Ressam Çiziyor... 🖌️</p>
            </div>
          )}

          {errorState && (
             <div className="bg-amber-50 p-10 rounded-[4rem] border-[6px] border-amber-200 shadow-2xl text-center animate-fade-in">
               <div className="text-7xl mb-4">🛠️</div>
               <p className="text-amber-900 text-xl font-black leading-tight mb-8">{errorState.msg}</p>
               {errorState.showKeyButton && (
                   <button 
                    onClick={handleRefreshKey}
                    className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-amber-700 transition-all active:scale-95"
                   >
                     ANAHTARI YENİLE 🔑
                   </button>
               )}
               {!errorState.showKeyButton && (
                   <button 
                    onClick={() => setErrorState(null)}
                    className="text-amber-600 font-black underline"
                   >
                    Tekrar Dene
                   </button>
               )}
             </div>
          )}

          {generatedImage && (
             <div className="bg-white p-6 rounded-[4rem] shadow-2xl border-8 border-white animate-fade-in relative group overflow-hidden">
                <img src={generatedImage} alt="Yapay Zeka Çizimi" className="w-full h-auto rounded-[3rem] shadow-inner" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border border-white/30 text-white font-black text-xl">
                        ETİK ONAYLI SANAT ✨
                    </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EthicalCreator;
