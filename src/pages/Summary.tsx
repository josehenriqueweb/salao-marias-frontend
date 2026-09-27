import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { formatDate, formatCurrency } from "@/data";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Summary() {
  const {
    setView, selectedService, selectedDate, selectedTime,
    clientName, setClientName, clientPhone, setClientPhone,
    addBooking, setLastBookingId,
  } = useApp();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientPhone(formatPhone(e.target.value));
  };

  if (!selectedService || !selectedDate || !selectedTime) {
    setView("services");
    return null;
  }

  const handleConfirm = () => {
    if (!clientName.trim() || !clientPhone.trim()) return;
    const id = addBooking({
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
    });
    setLastBookingId(id);
    setView("confirmation");
  };

  const formattedDate = formatDate(selectedDate);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setView("time-picker")}
              className="flex items-center gap-2 text-[#6B6487] text-sm hover:text-[#9180C4] transition-colors mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Voltar
            </button>
            <p className="text-[#9180C4] text-sm tracking-widest uppercase font-medium mb-2">Passo 4 de 4</p>
            <h1 className="text-4xl text-[#1E1A2E] mb-2">Resumo do agendamento</h1>
            <p className="text-[#6B6487]">Confirme os detalhes antes de finalizar.</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-10">
            {["Serviço", "Data", "Horário", "Resumo"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-[#9180C4] text-white">
                  {i < 3 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : 4}
                </div>
                <span className={`text-xs hidden sm:block ${i === 3 ? "text-[#1E1A2E] font-medium" : "text-[#6B6487]"}`}>{step}</span>
                {i < 3 && <div className="flex-1 h-px bg-[#9180C4]" />}
              </div>
            ))}
          </div>

          {/* Booking summary card */}
          <div className="border border-[#DDD6F7] rounded-3xl p-6 bg-white shadow-sm mb-6">
            <h3 className="font-semibold text-[#1E1A2E] mb-5">Detalhes do agendamento</h3>
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  ),
                  label: "Serviço",
                  value: selectedService.name,
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  ),
                  label: "Data",
                  value: formattedDate,
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                  ),
                  label: "Horário",
                  value: selectedTime,
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                  ),
                  label: "Duração",
                  value: selectedService.duration >= 60
                    ? `${selectedService.duration / 60}h${selectedService.duration % 60 ? ` ${selectedService.duration % 60}min` : ""}`
                    : `${selectedService.duration}min`,
                },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-[#F2EEFB] last:border-0">
                  <div className="flex items-center gap-3 text-[#6B6487]">
                    <span className="text-[#9180C4]">{row.icon}</span>
                    <span className="text-sm">{row.label}</span>
                  </div>
                  <span className="text-sm font-medium text-[#1E1A2E]">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#DDD6F7] flex justify-between items-center">
              <span className="font-semibold text-[#1E1A2E]">Total</span>
              <span className="text-xl font-serif text-[#9180C4]">{formatCurrency(selectedService.price)}</span>
            </div>
          </div>

          {/* Client data */}
          <div className="border border-[#DDD6F7] rounded-3xl p-6 bg-white shadow-sm mb-6">
            <h3 className="font-semibold text-[#1E1A2E] mb-5">Seus dados</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#6B6487] mb-1.5 font-medium">Nome completo</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full border border-[#DDD6F7] rounded-xl px-4 py-3 text-sm text-[#1E1A2E] placeholder-[#C4BEE0] focus:outline-none focus:border-[#9180C4] focus:ring-2 focus:ring-[#9180C4]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-[#6B6487] mb-1.5 font-medium">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={clientPhone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  maxLength={16}
                  className="w-full border border-[#DDD6F7] rounded-xl px-4 py-3 text-sm text-[#1E1A2E] placeholder-[#C4BEE0] focus:outline-none focus:border-[#9180C4] focus:ring-2 focus:ring-[#9180C4]/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setView("time-picker")}
              className="px-6 py-3 border border-[#DDD6F7] rounded-full text-[#6B6487] hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-sm font-medium"
            >
              Voltar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!clientName.trim() || !clientPhone.trim()}
              className="px-8 py-3 bg-[#9180C4] text-white rounded-full font-medium hover:bg-[#7660B8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              Confirmar agendamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
