import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { formatDate, formatCurrency } from "@/data";

export default function MyBookings() {
  const { setView, bookings, sessionId, cancelBooking } = useApp();
  const [cancelId, setCancelId] = useState<string | null>(null);

  const myBookings = bookings
    .filter(b => b.sessionId === sessionId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleCancel = (id: string) => {
    cancelBooking(id);
    setCancelId(null);
  };

  const getStatusLabel = (status: string, date: string) => {
    if (status === "cancelled") return "Cancelado";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(date + "T00:00:00");
    if (bookingDate < today) return "Concluído";
    return "Confirmado";
  };

  const getStatusStyle = (status: string, date: string) => {
    const label = getStatusLabel(status, date);
    if (label === "Cancelado") return "bg-red-50 text-red-600 border-red-200";
    if (label === "Concluído") return "bg-[#F2EEFB] text-[#9180C4] border-[#DDD6F7]";
    return "bg-green-50 text-green-700 border-green-200";
  };

  const canCancel = (status: string, date: string, time: string) => {
    if (status === "cancelled") return false;
    const now = new Date();
    const [h, m] = time.split(":").map(Number);
    const appointmentDate = new Date(date + "T00:00:00");
    appointmentDate.setHours(h, m, 0, 0);
    const diff = appointmentDate.getTime() - now.getTime();
    return diff > 2 * 60 * 60 * 1000;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 text-[#6B6487] text-sm hover:text-[#9180C4] transition-colors mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Voltar ao início
            </button>
            <h1 className="text-4xl text-[#1E1A2E] mb-2">Meus agendamentos</h1>
            <p className="text-[#6B6487]">Gerencie seus horários no Salão Marias.</p>
          </div>

          {myBookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#F2EEFB] flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9180C4" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3 className="text-xl text-[#1E1A2E] mb-2">Nenhum agendamento ainda</h3>
              <p className="text-[#6B6487] text-sm mb-6">Que tal agendar o seu primeiro horário?</p>
              <button
                onClick={() => setView("services")}
                className="bg-[#9180C4] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7660B8] transition-colors"
              >
                Agendar agora
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myBookings.map(booking => {
                const label = getStatusLabel(booking.status, booking.date);
                const statusStyle = getStatusStyle(booking.status, booking.date);
                const cancellable = canCancel(booking.status, booking.date, booking.time);

                return (
                  <div
                    key={booking.id}
                    className={`border rounded-2xl p-5 bg-white transition-all ${booking.status === "cancelled" ? "border-[#F0EEF5] opacity-70" : "border-[#DDD6F7] hover:shadow-md hover:shadow-[#9180C4]/10"}`}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-3">
                          <h3 className="font-semibold text-[#1E1A2E]">{booking.service.name}</h3>
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusStyle}`}>
                            {label}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { icon: "cal", label: formatDate(booking.date) },
                            { icon: "time", label: booking.time },
                            { icon: "dur", label: booking.service.duration >= 60
                                ? `${booking.service.duration / 60}h${booking.service.duration % 60 ? ` ${booking.service.duration % 60}min` : ""}`
                                : `${booking.service.duration}min` },
                            { icon: "price", label: formatCurrency(booking.service.price) },
                          ].map(({ icon, label: lbl }) => (
                            <div key={icon} className="flex items-center gap-1.5 text-sm text-[#6B6487]">
                              {icon === "cal" && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                              )}
                              {icon === "time" && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                </svg>
                              )}
                              {icon === "dur" && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                </svg>
                              )}
                              {icon === "price" && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                              )}
                              {lbl}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-[#C4BEE0] font-mono">{booking.id}</div>
                      </div>
                      {cancellable && (
                        <button
                          onClick={() => setCancelId(booking.id)}
                          className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full transition-colors shrink-0"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 text-center">
                <button
                  onClick={() => setView("services")}
                  className="bg-[#9180C4] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7660B8] transition-colors text-sm"
                >
                  Novo agendamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-[#1E1A2E] text-center mb-2">Cancelar agendamento?</h3>
            <p className="text-[#6B6487] text-sm text-center mb-6 leading-relaxed">
              Tem certeza que deseja cancelar este agendamento? O horário ficará disponível para outras clientes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 border border-[#DDD6F7] rounded-full py-2.5 text-[#6B6487] hover:border-[#9180C4] hover:text-[#9180C4] transition-colors text-sm font-medium"
              >
                Voltar
              </button>
              <button
                onClick={() => handleCancel(cancelId)}
                className="flex-1 bg-red-500 text-white rounded-full py-2.5 font-medium hover:bg-red-600 transition-colors text-sm"
              >
                Confirmar cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
