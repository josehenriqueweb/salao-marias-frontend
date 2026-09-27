import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { getAvailableSlotsForDate, getAvailableSlotsForService, formatDate } from "@/data";

export default function TimePicker() {
  const { setView, selectedService, selectedDate, setSelectedTime, bookings } = useApp();
  const [selected, setSelected] = useState<string | null>(null);

  if (!selectedService || !selectedDate) {
    setView("services");
    return null;
  }

  const availableSlots = getAvailableSlotsForDate(selectedService, selectedDate, bookings);

  const handleNext = () => {
    if (!selected) return;
    setSelectedTime(selected);
    setView("summary");
  };

  const [dd, mm, yyyy] = formatDate(selectedDate).split("/");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setView("date-picker")}
              className="flex items-center gap-2 text-[#6B6487] text-sm hover:text-[#9180C4] transition-colors mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Voltar
            </button>
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-2">Passo 3 de 4</p>
            <h1 className="text-4xl text-[#1E1A2E] mb-2">Escolha o horário</h1>
            <p className="text-[#6B6487]">
              {selectedService.name} &middot; {dd}/{mm}/{yyyy}
            </p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-10">
            {["Serviço", "Data", "Horário", "Resumo"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i <= 2 ? "bg-[#9180C4] text-white" : "bg-[#F2EEFB] text-[#9180C4]"}`}>
                  {i < 2 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === 2 ? "text-[#1E1A2E] font-medium" : "text-[#6B6487]"}`}>{step}</span>
                {i < 3 && <div className="flex-1 h-px bg-[#DDD6F7]" />}
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="border border-[#DDD6F7] rounded-3xl p-6 bg-white shadow-sm mb-6">
            <h3 className="font-semibold text-[#1E1A2E] mb-5 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9180C4" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              Horários disponíveis
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {getAvailableSlotsForService(selectedService).map(slot => {
                const isUnavailable = !availableSlots.includes(slot);
                const isSelected = selected === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => !isUnavailable && setSelected(slot)}
                    disabled={isUnavailable}
                    className={[
                      "py-3 px-2 rounded-xl text-sm font-medium transition-all text-center relative",
                      isSelected
                        ? "bg-[#9180C4] text-white shadow-md"
                        : isUnavailable
                        ? "bg-[#F8F8F8] text-[#DDD6F7] cursor-not-allowed line-through"
                        : "bg-[#FAF8FF] text-[#1E1A2E] border border-[#DDD6F7] hover:border-[#9180C4] hover:text-[#9180C4] hover:bg-[#F2EEFB]",
                    ].join(" ")}
                  >
                    {slot}
                    {isUnavailable && (
                      <span className="block text-[10px] mt-0.5 text-[#DDD6F7] no-underline" style={{ textDecoration: "none" }}>Indisponível</span>
                    )}
                    {!isUnavailable && (
                      <span className="block text-[10px] mt-0.5 text-[#9180C4] opacity-70">Disponível</span>
                    )}
                  </button>
                );
              })}
            </div>
            {availableSlots.length === 0 && (
              <p className="mt-4 rounded-xl bg-[#FAF8FF] p-4 text-sm text-[#6B6487]">
                Não há horários disponíveis nesta data. Escolha outra data.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 pt-4 border-t border-[#DDD6F7] text-xs text-[#6B6487]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#9180C4]" />
                <span>Selecionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#FAF8FF] border border-[#DDD6F7]" />
                <span>Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#F8F8F8]" />
                <span>Ocupado</span>
              </div>
            </div>
          </div>

          {selected && (
            <div className="bg-[#F2EEFB] border border-[#DDD6F7] rounded-2xl p-4 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9180C4] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                {selected}
              </div>
              <div>
                <div className="font-medium text-[#1E1A2E] text-sm">Horário selecionado</div>
                <div className="text-xs text-[#6B6487]">{selectedService.name} &middot; {dd}/{mm}/{yyyy}</div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setView("date-picker")}
              className="px-6 py-3 border border-[#DDD6F7] rounded-full text-[#6B6487] hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-sm font-medium"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="px-8 py-3 bg-[#9180C4] text-white rounded-full font-medium hover:bg-[#7660B8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
