import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { formatDate, formatCurrency } from "@/data";

export default function Confirmation() {
  const {
    setView, selectedService, selectedDate, selectedTime,
    lastBookingId, clientName,
  } = useApp();

  if (!selectedService || !selectedDate || !selectedTime || !lastBookingId) {
    setView("home");
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-[#F2EEFB] flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9180C4" strokeWidth="1.5" strokeLinecap="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
          </div>

          <h1 className="text-4xl text-[#1E1A2E] mb-3">Agendamento confirmado!</h1>
          <p className="text-[#6B6487] mb-10">
            Tudo certo, <span className="text-[#1E1A2E] font-medium">{clientName.split(" ")[0]}</span>! Seu horário foi reservado com sucesso.
          </p>

          {/* Booking card */}
          <div className="border border-[#DDD6F7] rounded-3xl p-6 bg-white shadow-sm text-left mb-6">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#F2EEFB]">
              <span className="text-xs text-[#6B6487] uppercase tracking-widest font-medium">Código do agendamento</span>
              <span className="font-mono font-semibold text-[#9180C4] bg-[#F2EEFB] px-3 py-1 rounded-full text-sm">
                {lastBookingId}
              </span>
            </div>
            <div className="space-y-4">
              {[
                { label: "Serviço", value: selectedService.name },
                { label: "Data", value: formatDate(selectedDate) },
                { label: "Horário", value: selectedTime },
                {
                  label: "Duração",
                  value: selectedService.duration >= 60
                    ? `${selectedService.duration / 60}h${selectedService.duration % 60 ? ` ${selectedService.duration % 60}min` : ""}`
                    : `${selectedService.duration}min`,
                },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-[#6B6487]">{row.label}</span>
                  <span className="font-medium text-[#1E1A2E]">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#DDD6F7] flex justify-between items-center">
              <span className="font-semibold text-[#1E1A2E]">Total</span>
              <span className="text-xl font-serif text-[#9180C4]">{formatCurrency(selectedService.price)}</span>
            </div>
          </div>

          <div className="bg-[#F2EEFB] border border-[#DDD6F7] rounded-2xl p-4 mb-8 text-sm text-[#6B6487] text-left">
            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9180C4" strokeWidth="1.5" strokeLinecap="round" className="shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              <span>Caso precise cancelar ou reagendar, acesse <strong className="text-[#1E1A2E]">Meus Agendamentos</strong> com antecedência mínima de 2 horas.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setView("my-bookings")}
              className="flex-1 border border-[#DDD6F7] rounded-full py-3 text-[#6B6487] hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-sm font-medium"
            >
              Ver meus agendamentos
            </button>
            <button
              onClick={() => setView("home")}
              className="flex-1 bg-[#9180C4] text-white rounded-full py-3 font-medium hover:bg-[#7660B8] transition-colors text-sm"
            >
              Voltar para o início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
