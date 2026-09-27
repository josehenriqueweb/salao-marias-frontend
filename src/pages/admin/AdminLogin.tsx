import { useState } from "react";
import { useApp } from "@/context/AppContext";
import logoImg from "@/imports/image.png";

export default function AdminLogin() {
  const { setIsAdminLoggedIn, setView, setAdminSection } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

 const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // TODO: Integrar com a futura API em Spring Boot para validação real no banco de dados
  if (email === "admin@teste.com" && password === "1234") {
    setIsAdminLoggedIn(true);
    setAdminSection("dashboard");
    setView("admin-dashboard");
  } else {
    setError("E-mail ou senha incorretos.");
  }
};

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src={logoImg}
            alt="Salão Marias"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow-md"
          />
          <div className="font-serif text-2xl text-[#9180C4] tracking-wide">MARIAS</div>
          <div className="text-xs text-[#6B6487] tracking-widest uppercase mt-1">Área Administrativa</div>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#DDD6F7] rounded-3xl p-8 shadow-sm">
          {!showReset ? (
            <>
              <h1 className="text-2xl font-serif text-[#1E1A2E] mb-1">Entrar</h1>
              <p className="text-sm text-[#6B6487] mb-6">Acesso restrito a funcionários autorizados.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B6487] mb-1.5">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    placeholder="seu@email.com"
                    className="w-full border border-[#DDD6F7] rounded-xl px-4 py-3 text-sm text-[#1E1A2E] placeholder-[#C4BEE0] focus:outline-none focus:border-[#9180C4] focus:ring-2 focus:ring-[#9180C4]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B6487] mb-1.5">Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full border border-[#DDD6F7] rounded-xl px-4 py-3 text-sm text-[#1E1A2E] placeholder-[#C4BEE0] focus:outline-none focus:border-[#9180C4] focus:ring-2 focus:ring-[#9180C4]/20 transition-all"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#9180C4] text-white py-3 rounded-xl font-medium hover:bg-[#7660B8] transition-colors active:scale-95"
                >
                  Entrar
                </button>
              </form>

              <button
                onClick={() => setShowReset(true)}
                className="w-full text-center text-sm text-[#6B6487] hover:text-[#9180C4] transition-colors mt-4"
              >
                Esqueci minha senha
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setShowReset(false); setResetSent(false); }}
                className="flex items-center gap-2 text-[#6B6487] text-sm hover:text-[#9180C4] transition-colors mb-5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Voltar
              </button>
              <h2 className="text-2xl font-serif text-[#1E1A2E] mb-1">Recuperar senha</h2>
              <p className="text-sm text-[#6B6487] mb-6">Enviaremos um link de redefinição para o seu e-mail.</p>

              {resetSent ? (
                <div className="bg-[#F2EEFB] border border-[#DDD6F7] rounded-2xl p-4 text-center">
                  <div className="text-[#9180C4] text-2xl mb-2">✓</div>
                  <div className="font-medium text-[#1E1A2E] mb-1">E-mail enviado!</div>
                  <div className="text-sm text-[#6B6487]">Verifique sua caixa de entrada.</div>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B6487] mb-1.5">E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full border border-[#DDD6F7] rounded-xl px-4 py-3 text-sm text-[#1E1A2E] placeholder-[#C4BEE0] focus:outline-none focus:border-[#9180C4] focus:ring-2 focus:ring-[#9180C4]/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#9180C4] text-white py-3 rounded-xl font-medium hover:bg-[#7660B8] transition-colors"
                  >
                    Enviar link
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setView("home")}
            className="text-sm text-[#6B6487] hover:text-[#9180C4] transition-colors"
          >
            Voltar ao site
          </button>
        </div>
      </div>
    </div>
  );
}
