
import React, { useState, useMemo } from 'react';
import { Book } from '../types';

interface LibraryBook extends Book {
  level: 'PRIMARY' | 'SECONDARY' | 'WORLD' | 'LANGUAGE';
}

const allBooks: LibraryBook[] = [
  // --- İLKÖĞRETİM TÜRK & DÜNYA EDEBİYATI (ÖNCEKİLER) ---
  { id: 1, title: "Dede Korkut Kitabı", author: "Anonim", coverColor: "bg-red-700", category: "HISTORY", level: "PRIMARY", summary: "Türk kültürünün en eski destansı hikayeleri.", aiConnection: "Kültürel köklerimizi anlamak için temel bir veri kaynağıdır." },
  { id: 2, title: "Mesnevi'den Seçmeler", author: "Mevlana", coverColor: "bg-amber-600", category: "HISTORY", level: "PRIMARY", summary: "Eğitici ve ahlaki hikayeler.", aiConnection: "Yapay zekaya evrensel etik değerleri öğretmek için rehberdir." },
  { id: 3, title: "Karagöz ile Hacivat", author: "Geleneksel", coverColor: "bg-indigo-500", category: "VOCABULARY", level: "PRIMARY", summary: "Gölge oyunu diyalogları.", aiConnection: "Mizahın dil algoritmasındaki önemini gösterir." },
  { id: 200, title: "Küçük Prens", author: "Saint-Exupéry", coverColor: "bg-sky-400", category: "FUTURE", level: "WORLD", summary: "Duygusal bir yolculuk hikayesi.", aiConnection: "Soyut düşünme yeteneğini yapay zekaya aktarmayı temsil eder." },

  // --- ORTAÖĞRETİM (LİSE) - SÖYLEV & TİYATRO ---
  { id: 500, title: "Nutuk", author: "Mustafa Kemal Atatürk", coverColor: "bg-red-600", category: "HISTORY", level: "SECONDARY", summary: "Türkiye Cumhuriyeti'nin kuruluşunun belgesel niteliğindeki anlatımı.", aiConnection: "Tarihsel verilerin aslına uygun korunması ve sahte haber (deepfake) ile mücadelede referans kaynaktır." },
  { id: 501, title: "Faust", author: "Goethe", coverColor: "bg-slate-900", category: "FUTURE", level: "SECONDARY", summary: "Bilgiye doymayan bir ruhun felsefi dramı.", aiConnection: "Sınırsız güç ve bilgiye ulaşma isteğinin (Yapay Zeka gibi) etik sınırlarını tartışır." },

  // --- ORTAÖĞRETİM - HİKAYE ---
  { id: 502, title: "Gurbet Hikayeleri", author: "Refik Halit Karay", coverColor: "bg-amber-700", category: "VOCABULARY", level: "SECONDARY", summary: "Sıla özlemi ve insan manzaralarını anlatan derin öyküler.", aiConnection: "Duygu analizi sistemlerinde 'özlem' ve 'yalnızlık' gibi karmaşık hislerin tespiti için veri sağlar." },
  { id: 503, title: "Kelile ve Dimne", author: "Beydeba", coverColor: "bg-emerald-600", category: "HISTORY", level: "SECONDARY", summary: "Hayvanlar üzerinden siyaset ve ahlak dersleri veren antik fabllar.", aiConnection: "Mantık yürütme (reasoning) ve stratejik düşünme algoritmalarının temel yapısını örneklendirir." },
  { id: 504, title: "Memleket Hikayeleri", author: "Refik Halit Karay", coverColor: "bg-orange-600", category: "VOCABULARY", level: "SECONDARY", summary: "Anadolu'nun gerçekçi bir dille anlatıldığı klasik öyküler.", aiConnection: "Doğal Dil İşleme (NLP) modellerinin yerel ağızları ve kültürel bağlamları tanımasını sağlar." },

  // --- ORTAÖĞRETİM - ŞİİR ---
  { id: 505, title: "Çile", author: "Necip Fazıl Kısakürek", coverColor: "bg-black", category: "FUTURE", level: "SECONDARY", summary: "İnsanın varoluş sancılarını ve mistik düşüncelerini işleyen şiirler.", aiConnection: "Metafıziksel kavramların ve derin felsefi sorgulamaların yapay zeka tarafından analiz edilmesine örnektir." },
  { id: 506, title: "Dostlar Beni Hatırlasın", author: "Aşık Veysel", coverColor: "bg-amber-800", category: "HISTORY", level: "SECONDARY", summary: "Toprakla, doğayla ve insanla özdeşleşen halk şiiri hazinesi.", aiConnection: "Yapay zekanın insani duyarlılığı ve 'gönül' kavramını anlaması için bir veri setidir." },
  { id: 507, title: "Kutadgu Bilig", author: "Yusuf Has Hacib", coverColor: "bg-indigo-900", category: "HISTORY", level: "SECONDARY", summary: "Mutluluk veren bilgi; devlet yönetimi ve toplum düzeni üzerine nasihatler.", aiConnection: "Kural tabanlı sistemlerin (Rule-based systems) ve toplum yönetimi algoritmalarının en eski örneğidir." },
  { id: 508, title: "Safahat", author: "Mehmet Akif Ersoy", coverColor: "bg-green-800", category: "VOCABULARY", level: "SECONDARY", summary: "Toplumun acılarını, inancını ve kurtuluş mücadelesini anlatan manzum eser.", aiConnection: "Büyük veri setlerinde toplumsal değerlerin ve dil estetiğinin korunmasını temsil eder." },

  // --- ORTAÖĞRETİM - DENEME & FELSEFE ---
  { id: 509, title: "Beş Şehir", author: "Ahmet Hamdi Tanpınar", coverColor: "bg-sky-700", category: "HISTORY", level: "SECONDARY", summary: "İstanbul, Ankara, Erzurum, Konya ve Bursa'nın kültürel ve tarihi analizi.", aiConnection: "Şehirlerin dijital ikizleri (digital twins) oluşturulurken kültürel derinliğin korunması gerektiğini hatırlatır." },
  { id: 510, title: "Bu Ülke", author: "Cemil Meriç", coverColor: "bg-red-800", category: "FUTURE", level: "SECONDARY", summary: "Kültür, medeniyet ve aydın olma üzerine sarsıcı bir deneme.", aiConnection: "Yapay zeka etiğinde 'önyargısız düşünce' ve kültürel bağımsızlık için temel bir felsefi rehberdir." },
  { id: 511, title: "Devlet", author: "Platon", coverColor: "bg-slate-700", category: "FUTURE", level: "SECONDARY", summary: "İdeal devlet ve adalet kavramları üzerine kurucu bir metin.", aiConnection: "Geleceğin Yapay Zeka tarafından yönetilen sistemlerinde adaletin nasıl sağlanması gerektiğini tartışır." },
  { id: 512, title: "Türkçenin Sırları", author: "Nihad Sami Banarlı", coverColor: "bg-indigo-500", category: "VOCABULARY", level: "LANGUAGE", summary: "Türkçenin güzelliğini, tarihini ve estetiğini anlatan bir eser.", aiConnection: "Yapay zekanın dilimizi kaba bir çeviriyle değil, 'sırlarıyla' ve ruhuyla öğrenmesi için şarttır." },

  // --- ORTAÖĞRETİM - GEZİ, ANI, BİYOGRAFİ & DİĞER ---
  { id: 513, title: "Seyahatname", author: "Evliya Çelebi", coverColor: "bg-amber-500", category: "HISTORY", level: "SECONDARY", summary: "17. yüzyıl dünyasının devasa bir panoraması.", aiConnection: "Büyük Veri (Big Data) toplama ve gözlem yapma yeteneğinin tarihteki en büyük örneğidir." },
  { id: 514, title: "Çankaya", author: "Falih Rıfkı Atay", coverColor: "bg-red-900", category: "HISTORY", level: "SECONDARY", summary: "Cumhuriyet tarihine ve Atatürk'ün hayatına tanıklık eden anılar.", aiConnection: "Biyografik verilerin dijital arşivlenmesi ve tarihsel gerçekliğin teyit edilmesini simgeler." },
  { id: 515, title: "Suyu Arayan Adam", author: "Şevket Süreyya Aydemir", coverColor: "bg-blue-900", category: "HISTORY", level: "SECONDARY", summary: "Bir aydının kendini ve bir toplumu inşa etme hikayesi.", aiConnection: "Karakter gelişimi algoritmaları ve insanın 'anlam arayışı' üzerine bir vaka çalışmasıdır." },
  { id: 516, title: "Nasreddin Hoca Fıkraları", author: "Anonim", coverColor: "bg-yellow-400", category: "VOCABULARY", level: "LANGUAGE", summary: "Zeka ve mizahın harmanlandığı halk bilgeliği.", aiConnection: "Yapay zekanın en zorlandığı alan olan 'ironi' ve 'satirik düşünce'yi anlaması için kritiktir." },
  { id: 517, title: "Türk Masalları", author: "Naki Tezel", coverColor: "bg-rose-500", category: "VOCABULARY", level: "SECONDARY", summary: "Kültürümüzün bilinçaltını yansıtan zengin masal derlemesi.", aiConnection: "Yaratıcı üretkenlik (Generative AI) için yerel ve özgün hikaye örüntüleri sunar." }
];

const Library: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PRIMARY' | 'SECONDARY' | 'WORLD' | 'LANGUAGE'>('ALL');

  const filteredBooks = useMemo(() => {
    return filter === 'ALL' ? allBooks : allBooks.filter(b => b.level === filter);
  }, [filter]);

  const categories = [
    { id: 'ALL', label: 'Tümü', icon: '🌈' },
    { id: 'PRIMARY', label: 'İlköğretim', icon: '🏫' },
    { id: 'SECONDARY', label: 'Ortaöğretim', icon: '🎓' },
    { id: 'WORLD', label: 'Dünya Klasikleri', icon: '🌍' },
    { id: 'LANGUAGE', label: 'Dil & Kültür', icon: '🇹🇷' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4">
       <div className="mb-12 text-center">
         <h2 className="text-5xl font-black text-indigo-900 mb-4 tracking-tighter">📚 Sanal Kütüphane</h2>
         <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">
           Milli Eğitim müfredatı, lise hazinesi ve dünya klasikleri burada! 
           <br/><span className="text-indigo-600">Her eser, dijital geleceğini doğru inşa etmen için bir yapı taşıdır.</span>
         </p>
       </div>

       <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setFilter(cat.id as any); setSelectedBook(null); }}
              className={`px-6 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2 border-b-4 ${
                filter === cat.id 
                  ? 'bg-indigo-600 text-white border-indigo-900 scale-105 shadow-xl' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-indigo-50'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
       </div>

       <div className="bg-[#5D2E0C] p-6 md:p-10 rounded-[3rem] shadow-2xl border-b-[20px] border-[#3D1E08] relative mb-12">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-10 items-end min-h-[300px]">
            {filteredBooks.map((book) => (
              <div 
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className={`
                  ${book.coverColor} 
                  h-40 md:h-52 w-full rounded-tr-xl rounded-br-xl rounded-tl-sm rounded-bl-sm 
                  shadow-[4px_0_10px_rgba(0,0,0,0.3)] cursor-pointer transform hover:-translate-y-6 hover:rotate-2 transition-all duration-300
                  relative flex items-center justify-center text-center p-3 border-l-[6px] border-white/20
                  group
                `}
              >
                <div className="text-white font-serif font-black text-[10px] md:text-xs drop-shadow-md line-clamp-4 leading-tight">
                  {book.title.toUpperCase()}
                </div>
                <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-white/20"></div>
                {book.category === 'HISTORY' && (
                  <div className="absolute -top-2 -right-2 bg-amber-400 w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-[10px] border border-amber-600">🏛️</div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/30"></div>
       </div>

       <div className="bg-white p-10 md:p-14 min-h-[400px] border-4 border-slate-100 rounded-[4rem] shadow-2xl relative overflow-hidden transition-all">
         {selectedBook ? (
           <div className="animate-fade-in flex flex-col md:flex-row gap-12 items-start">
             <div className={`w-48 h-72 ${selectedBook.coverColor} rounded-2xl shadow-2xl flex-shrink-0 hidden md:block transition-all border-l-8 border-white/20 relative`}>
                <div className="absolute inset-0 bg-black/5 rounded-2xl"></div>
             </div>
             <div className="flex-1 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest">
                    {selectedBook.level === 'PRIMARY' ? 'İlköğretim' : selectedBook.level === 'SECONDARY' ? 'Ortaöğretim' : selectedBook.level === 'WORLD' ? 'Dünya Klasikleri' : 'Dil & Kültür'}
                  </span>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    selectedBook.category === 'VOCABULARY' ? 'bg-green-100 text-green-700' : 
                    selectedBook.category === 'HISTORY' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedBook.category === 'VOCABULARY' ? 'Kelime Hazinesi' : selectedBook.category === 'HISTORY' ? 'Tarih Bilinci' : 'Gelecek Vizyonu'}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-4xl font-black text-slate-800 mb-2 leading-tight">{selectedBook.title}</h3>
                  <p className="text-xl text-slate-400 font-bold italic">Yazar: {selectedBook.author}</p>
                </div>
                
                <p className="text-xl text-slate-600 leading-relaxed font-bold">
                  {selectedBook.summary}
                </p>
                
                <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-125 transition-transform duration-500">🤖</div>
                  <h4 className="font-black text-white flex items-center gap-3 mb-3 text-lg">
                    <span className="bg-white/20 p-2 rounded-xl">🤖</span> YAPAY ZEKA BAĞLANTISI
                  </h4>
                  <p className="text-indigo-50 text-lg font-bold leading-snug">
                    {selectedBook.aiConnection}
                  </p>
                </div>
             </div>
           </div>
         ) : (
           <div className="text-center text-slate-300 py-20">
             <div className="text-9xl mb-8 opacity-20 animate-float">📖</div>
             <p className="text-2xl font-black opacity-30">İçeriğini ve Yapay Zeka ile bağlantısını görmek için raftan bir lise kitabı seç!</p>
           </div>
         )}
       </div>
    </div>
  );
};

export default Library;
