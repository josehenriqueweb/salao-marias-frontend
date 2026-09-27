import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { SERVICES, formatCurrency } from "@/data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Cabelo: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 3h12l1 9H5L6 3z" /><path d="M5 12a7 7 0 0 0 14 0" />
    </svg>
  ),
  Unhas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4z" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  ),
  Estética: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export default function Services() {
  const { setView, setSelectedService } = useApp();

  const categories = [...new Set(SERVICES.map(s => s.category))];

  const handleSelect = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setView("date-picker");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <button
              type="button"
              onClick={() => setView("home")}
              className="mb-6 flex items-center gap-2 text-sm text-[#6B6487] transition-colors hover:text-[#9180C4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9180C4]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Voltar ao início
            </button>
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-2">Passo 1 de 4</p>
            <h1 className="text-4xl text-[#1E1A2E] mb-2">Escolha o serviço</h1>
            <p className="text-[#6B6487]">Selecione o serviço que deseja agendar.</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-12">
            {["Serviço", "Data", "Horário", "Resumo"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i === 0 ? "bg-[#9180C4] text-white" : "bg-[#F2EEFB] text-[#9180C4]"}`}>
                  {i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === 0 ? "text-[#1E1A2E] font-medium" : "text-[#6B6487]"}`}>{step}</span>
                {i < 3 && <div className="flex-1 h-px bg-[#DDD6F7]" />}
              </div>
            ))}
          </div>

          {/* Services by category */}
          {categories.map(cat => (
            <div key={cat} className="mb-10">
              <div id={`category-${cat}`} className="flex items-center gap-2 mb-5 scroll-mt-28">
                <span className="text-[#9180C4]">{CATEGORY_ICONS[cat]}</span>
                <h2 className="text-lg font-semibold text-[#1E1A2E]">{cat}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.filter(s => s.category === cat).map(service => (
                  <div
                    key={service.id}
                    className="min-w-0 border border-[#DDD6F7] rounded-2xl p-5 bg-white hover:border-[#9180C4] hover:shadow-lg hover:shadow-[#9180C4]/10 transition-all group"
                  >
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="min-w-0 break-words font-semibold text-[#1E1A2E] text-base">{service.name}</h3>
                      <span className="text-[#9180C4] font-semibold text-base ml-4 shrink-0">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                    <p className="break-words text-sm text-[#6B6487] leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-[#6B6487] shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                        </svg>
                        {service.duration >= 60
                          ? `${service.duration / 60}h${service.duration % 60 ? ` ${service.duration % 60}min` : ""}`
                          : `${service.duration}min`}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelect(service)}
                        className="min-h-10 shrink-0 whitespace-nowrap rounded-full bg-[#9180C4] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7660B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7660B8] active:scale-95"
                      >
                        Selecionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
