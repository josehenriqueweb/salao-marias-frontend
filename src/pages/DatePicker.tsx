import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { PT_MONTHS, PT_DAYS, getAvailableSlotsForDate } from "@/data";

function isSalonOpen(date: Date): boolean {
  const dow = date.getDay();
  return dow >= 2 && dow <= 6;
}

export default function DatePicker() {
  const { setView, selectedService, setSelectedDate, bookings } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  if (!selectedService) {
    setView("services");
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { year, month } = viewDate;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setViewDate(v => {
      if (v.month === 0) return { year: v.year - 1, month: 11 };
      return { year: v.year, month: v.month - 1 };
    });
  };
  const nextMonth = () => {
    setViewDate(v => {
      if (v.month === 11) return { year: v.year + 1, month: 0 };
      return { year: v.year, month: v.month + 1 };
    });
  };

  const handleSelect = (day: number) => {
    const d = new Date(year, month, day);
    if (d < today || !isSalonOpen(d)) return;
    const str = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (selectedService && getAvailableSlotsForDate(selectedService, str, bookings).length === 0) return;
    setSelected(str);
  };

  const handleNext = () => {
    if (!selected) return;
    setSelectedDate(selected);
    setView("time-picker");
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setView("services")}
              className="flex items-center gap-2 text-[#6B6487] text-sm hover:text-[#9180C4] transition-colors mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Voltar
            </button>
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-2">Passo 2 de 4</p>
            <h1 className="text-4xl text-[#1E1A2E] mb-2">Escolha a data</h1>
            <p className="text-[#6B6487]">Serviço: <span className="text-[#1E1A2E] font-medium">{selectedService.name}</span></p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-10">
            {["Serviço", "Data", "Horário", "Resumo"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i <= 1 ? "bg-[#9180C4] text-white" : "bg-[#F2EEFB] text-[#9180C4]"}`}>
                  {i < 1 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === 1 ? "text-[#1E1A2E] font-medium" : "text-[#6B6487]"}`}>{step}</span>
                {i < 3 && <div className="flex-1 h-px bg-[#DDD6F7]" />}
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="border border-[#DDD6F7] rounded-3xl p-6 bg-white shadow-sm">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} disabled={year === today.getFullYear() && month <= today.getMonth()} aria-label="Mês anterior" className="w-9 h-9 rounded-full border border-[#DDD6F7] flex items-center justify-center hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-[#6B6487] disabled:opacity-40 disabled:cursor-not-allowed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="font-semibold text-[#1E1A2E]">
                {PT_MONTHS[month]} {year}
              </span>
              <button onClick={nextMonth} className="w-9 h-9 rounded-full border border-[#DDD6F7] flex items-center justify-center hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-[#6B6487]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {PT_DAYS.map(d => (
                <div key={d} className="text-center text-xs text-[#6B6487] font-medium py-2">{d}</div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, idx) => {
                if (!day) return <div key={`e-${idx}`} />;
                const date = new Date(year, month, day);
                date.setHours(0, 0, 0, 0);
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isPast = date < today;
                const isClosed = !isSalonOpen(date);
                const isFull = !!selectedService && getAvailableSlotsForDate(selectedService, dateStr, bookings).length === 0;
                const isDisabled = isPast || isClosed || isFull;
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = selected === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => handleSelect(day)}
                    disabled={isDisabled}
                    className={[
                      "aspect-square min-w-0 rounded-xl flex items-center justify-center text-sm font-medium transition-all",
                      isSelected
                        ? "bg-[#9180C4] text-white shadow-md"
                        : isDisabled
                        ? "text-[#DDD6F7] cursor-not-allowed"
                        : isToday
                        ? "border-2 border-[#9180C4] text-[#9180C4] hover:bg-[#F2EEFB]"
                        : "text-[#1E1A2E] hover:bg-[#F2EEFB] hover:text-[#9180C4]",
                    ].join(" ")}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#DDD6F7] text-xs text-[#6B6487]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#9180C4]" />
                <span>Selecionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#9180C4]" />
                <span>Hoje</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#F2EEFB] border border-[#DDD6F7]" />
                <span>Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#F8F8F8]" />
                <span>Indisponível</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setView("services")}
              className="px-6 py-3 border border-[#DDD6F7] rounded-full text-[#6B6487] hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-sm font-medium"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="px-8 py-3 bg-[#9180C4] text-white rounded-full font-medium hover:bg-[#7660B8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              Escolher horário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
