
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const LogoMascotAuth = () => {
  return (
    <div className="relative w-32 h-32 animate-float group mx-auto mb-10">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-[2.5rem] shadow-2xl border-b-8 border-indigo-700 transform group-hover:rotate-6 transition-transform">
        <div className="absolute top-2 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
      </div>
      <div className="absolute top-[35%] left-[20%] w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
      </div>
      <div className="absolute top-[35%] right-[20%] w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
      </div>
      {/* Cheerful Smile */}
      <div className="absolute bottom-[32%] left-1/2 -translate-x-1/2 w-10 h-5 border-b-4 border-slate-900 rounded-full"></div>
      {/* Cheeks */}
      <div className="absolute top-[50%] left-[15%] w-4 h-2 bg-pink-300/40 rounded-full blur-sm"></div>
      <div className="absolute top-[50%] right-[15%] w-4 h-2 bg-pink-300/40 rounded-full blur-sm"></div>
      <div className="absolute -top-4 -right-4 text-5xl">🎓</div>
      <div className="absolute -bottom-2 -left-2 text-3xl">✨</div>
    </div>
  );
};

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatAsEmail = (name: string) => `${name.trim().toLowerCase()}@kuktursense.local`;

  const translateError = (msg: string): string => {
    const message = msg.toLowerCase();
    if (message.includes('user already registered')) return 'Bu kullanıcı adı zaten alınmış! Başka bir isim denemeye ne dersin? 🧐';
    if (message.includes('invalid login credentials')) return 'Kullanıcı adı veya şifre hatalı görünüyor! Tekrar kontrol edelim mi? 🤔';
    if (message.includes('password should be at least 6 characters')) return 'Şifren en az 6 karakter olmalı! Güvenliğin için bu önemli. 🔑';
    if (message.includes('email not confirmed')) return 'E-posta henüz onaylanmamış. Lütfen bekle. 📧';
    if (message.includes('rate limit')) return 'Çok fazla deneme yaptın! Biraz dinlenip tekrar gelmeye ne dersin? ⏳';
    if (message.includes('invalid email')) return 'Kullanıcı adın uygun formatta değil. 📧';
    return 'Küçük bir sorun oluştu. Lütfen tekrar dene veya bir büyüğünden yardım iste! 🛠️';
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) {
      setError('Kullanıcı adın en az 3 karakter olmalı! 😊');
      return;
    }

    setLoading(true);
    setError(null);

    const email = formatAsEmail(username);

    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({ 
          email: email, 
          password 
        });
        if (loginError) throw loginError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ 
          email: email, 
          password 
        });
        if (signUpError) throw signUpError;
        alert('Harika! Hesabın oluşturuldu. Şimdi giriş yapabilirsin. 🎊');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 auth-gradient bg-indigo-50">
      <div className="max-w-lg w-full bg-white rounded-[4rem] shadow-2xl p-10 md:p-14 transform transition-all duration-500 border-b-[16px] border-black/10 text-center">
        <div className="text-center">
          <LogoMascotAuth />
          <h2 className="text-5xl font-black text-indigo-900 leading-tight">KültürSense</h2>
          <p className="text-slate-500 font-black text-xl mt-4 uppercase tracking-widest">
            {isLogin ? 'Hoş Geldin, Rehber! ✨' : 'Yeni Maceranı Başlat! 🎒'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-8 mt-10">
          <div>
            <label className="block text-xl font-black text-slate-700 mb-3 ml-2 text-left">Kullanıcı Adın</label>
            <div className="relative">
               <span className="absolute left-6 top-6 text-3xl opacity-50">👤</span>
               <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full min-h-[76px] p-6 pl-16 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] focus:border-indigo-400 focus:bg-white outline-none transition-all text-xl font-bold"
                placeholder="Kullanıcı adın..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xl font-black text-slate-700 mb-3 ml-2 text-left">Şifren</label>
            <div className="relative">
              <span className="absolute left-6 top-6 text-3xl opacity-50">🔑</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[76px] p-6 pl-16 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] focus:border-indigo-400 focus:bg-white outline-none transition-all text-xl font-bold"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-lg font-black border-4 border-red-100 flex items-center gap-4 animate-shake">
              <span className="text-4xl">🚨</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full min-h-[84px] rounded-[2.5rem] font-black text-3xl text-white transition-all active:scale-95 shadow-2xl ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 border-b-[12px] border-indigo-900'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 border-6 border-white/30 border-t-white rounded-full animate-spin"></div>
                Yükleniyor...
              </span>
            ) : isLogin ? 'BAŞLAT! 🚀' : 'KAYDOL! ✨'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-indigo-600 font-black text-xl hover:text-indigo-800 transition-all underline decoration-indigo-200 underline-offset-8"
          >
            {isLogin ? 'Hesabın yok mu? Buraya tıkla!' : 'Zaten üye misin? Giriş yap!'}
          </button>
        </div>
      </div>
      
      {/* Tübitak Disclaimer */}
      <div className="mt-12 max-w-2xl px-6 text-center">
        <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed opacity-80">
          "Tübitak 2204A Proje Yarışması Kapsamında" Burak Turgut ve öğrencilerinin hazırladığı çalışmadır. 
          Herkesin kullanımına açıktır. Geliştirilmeye devam etmektedir. | 2026
        </p>
      </div>
    </div>
  );
};

export default Auth;
