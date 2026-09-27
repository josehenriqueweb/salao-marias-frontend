import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import logoImg from "@/imports/image.png";
import salonImg from "@/imports/salao-marias.png";

const HERO_IMG = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&h=900&fit=crop&auto=format";
const SERVICES_IMG = salonImg;

const TESTIMONIALS = [
  {
    name: "Cristiano J. de Medeiros",
    text: "O salão Maria's é um ótimo estabelecimento para quem procura os serviços da beleza. Bem localizado, organizado, sempre muito limpo e com profissionais qualificados.",
    rating: 4,
  },
  {
    name: "Mônica Farias",
    text: "Sou cliente fiel! Shirley arrasa na escova não importa como o seu cabelo estiver!",
    rating: 5,
  },
  {
    name: "Joanna Barbosa",
    text: "Esse salão é melhor que sessão de terapia. Amo todas as profissionais deste espaço maravilhoso.",
    rating: 5,
  },
];

const HIGHLIGHTS = [
  {
    category: "Cabelo",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3C9 3 8 7 12 9C16 11 17 15 17 15" />
        <path d="M12 9C12 9 10 10 9 13C8 16 9 20 9 20" />
        <path d="M12 9C12 9 14 10 16 13" />
        <circle cx="7" cy="21" r="1" /><circle cx="12" cy="21" r="1" /><circle cx="17" cy="21" r="1" />
      </svg>
    ),
    title: "Cabelo",
    desc: "Corte, coloração, tratamentos e escova",
  },
  {
    category: "Estética",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h1m16 0h1M12 3v1m0 16v1" />
        <path d="M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707m11.314-11.314.707-.707" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8v1m0 6v1m-4-4h1m6 0h1" />
      </svg>
    ),
    title: "Estética",
    desc: "Maquiagem, sobrancelhas e depilação",
  },
  {
    category: "Unhas",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4a2 2 0 0 1 4 0v10a2 2 0 0 1-4 0V4z" />
        <path d="M13 6a2 2 0 0 1 4 0v8a2 2 0 0 1-4 0V6z" />
        <path d="M7 16c0 1.5 1 3 2 3s2-1.5 2-3" />
        <path d="M13 16c0 1.5 1 3 2 3s2-1.5 2-3" />
      </svg>
    ),
    title: "Unhas",
    desc: "Manicure, pedicure e pintura",
  },
];

export default function Home() {
  const { setView } = useApp();

  const handleHighlightClick = (category: string) => {
    setView("services");
    setTimeout(() => {
      const el = document.getElementById(`category-${category}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1A2E]/75 via-[#1E1A2E]/50 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Salão e Estética
            </div>
            <h1 className="text-5xl md:text-6xl text-white leading-tight mb-6">
              Beleza que<br />
              <span className="text-[#C9BEF0] italic">transforma</span>
            </h1>
            <p className="text-white/75 text-lg mb-10 leading-relaxed">
              No Salão Marias, cada visita é uma experiência de cuidado, estilo e autocuidado. Profissionais dedicadas, ambiente acolhedor e resultados que você vai amar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setView("services")}
                className="bg-[#9180C4] hover:bg-[#7660B8] text-white px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-[#9180C4]/30 active:scale-95"
              >
                Agendar horário
              </button>
              <button
                onClick={() => setView("services")}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full font-medium transition-all"
              >
                Ver serviços
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-3">O que oferecemos</p>
            <h2 className="text-4xl text-[#1E1A2E]">Nossos serviços</h2>
          </div>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h) => (
              <button
                key={h.title}
                type="button"
                className="w-full rounded-2xl border border-[#DDD6F7] bg-[#FAF8FF] p-6 text-center transition-all hover:border-[#9180C4] hover:shadow-md hover:shadow-[#9180C4]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9180C4] group"
                onClick={() => handleHighlightClick(h.category)}
              >
                <div className="text-[#9180C4] flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {h.icon}
                </div>
                <div className="font-semibold text-[#1E1A2E] mb-1">{h.title}</div>
                <div className="text-xs text-[#6B6487] leading-relaxed">{h.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About + Image */}
      <section className="py-20 px-6 bg-[#FAF8FF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-4">Sobre nós</p>
            <h2 className="text-4xl text-[#1E1A2E] mb-6 leading-tight">
              Um espaço feito<br />para você brilhar
            </h2>
            <p className="text-[#6B6487] leading-relaxed mb-6">
              O Salão Marias nasceu do desejo de criar um ambiente onde beleza e bem-estar andam juntos. Com profissionais altamente qualificadas e produtos de primeira linha, oferecemos serviços que valorizam a individualidade de cada cliente.
            </p>
            <p className="text-[#6B6487] leading-relaxed mb-8">
              Funcionamos de terça a sábado, das 08h às 18h, para que você possa se cuidar no melhor horário para sua rotina.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[["13+", "anos de experiência"], ["500+", "clientes satisfeitas"], ["4.7", "avaliação média"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-serif text-[#9180C4] mb-1">{n}</div>
                  <div className="text-xs text-[#6B6487]">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#DDD6F7]">
              <img
                src={SERVICES_IMG}
                alt="Interior do Salão Marias"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#DDD6F7] rounded-2xl p-4 shadow-lg">
              <img src={logoImg} alt="Logo" className="w-14 h-14 rounded-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="feedback" className="scroll-mt-20 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-3">Depoimentos</p>
            <h2 className="text-4xl text-[#1E1A2E]">O que nossas clientes dizem</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-[#DDD6F7] rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#9180C4">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#6B6487] text-sm leading-relaxed mb-4 italic">{`"${t.text}"`}</p>
                <div className="font-semibold text-[#1E1A2E] text-sm">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#9180C4]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl text-white mb-4">Pronta para se transformar?</h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            Agende o seu horário online em menos de 2 minutos e garanta um momento só para você.
          </p>
          <button
            onClick={() => { setView("services"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 80); }}
            className="bg-white text-[#9180C4] px-10 py-4 rounded-full font-semibold hover:bg-[#F4F1FB] transition-colors active:scale-95"
          >
            Agendar meu horário
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-20 px-6 bg-[#FAF8FF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-3">Localização</p>
            <h2 className="text-4xl text-[#1E1A2E]">Como nos encontrar</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                title: "Endereço",
                lines: ["Av. Beberibe, 1404", "Arruda - Recife, PE"],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.52 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15 15.91l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
                title: "Contato",
                lines: ["(81) 99591-9700", "(81) 3243-4258"],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: "Horário de funcionamento",
                lines: ["Terça a Sexta: 08h às 18h", "Sábado: 08h às 18h"],
              },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-[#DDD6F7] rounded-2xl p-6 text-center">
                <div className="text-[#9180C4] flex justify-center mb-4">{c.icon}</div>
                <div className="font-semibold text-[#1E1A2E] mb-2">{c.title}</div>
                {c.lines.map(l => (
                  <div key={l} className="text-sm text-[#6B6487]">{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DDD6F7] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-serif text-[#9180C4]">MARIAS</span>
            <span className="text-[#6B6487] text-sm">salão e estética</span>
          </div>
          <div className="text-xs text-[#6B6487]">
            © 2026 Salão Marias. Todos os direitos reservados.
          </div>
          <button
            onClick={() => setView("admin-login")}
            className="text-xs text-[#DDD6F7] hover:text-[#9180C4] transition-colors"
          >
            Área administrativa
          </button>
        </div>
      </footer>
    </div>
  );
}
