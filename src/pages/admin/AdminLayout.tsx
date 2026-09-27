import { useState } from "react";
import { useApp, Booking } from "@/context/AppContext";
import { SERVICES, formatDate, formatCurrency, PT_MONTHS, PT_DAYS } from "@/data";
import logoImg from "@/imports/image.png";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "bookings", label: "Agendamentos", icon: "list" },
  { id: "clients", label: "Clientes", icon: "users" },
  { id: "services", label: "Serviços", icon: "scissors" },
  { id: "hours", label: "Horários", icon: "clock" },
  { id: "settings", label: "Configurações", icon: "settings" },
];

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
    list: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 12h12M9 6h12M9 18h12M4.5 6h.01M4.5 12h.01M4.5 18h.01" /></svg>,
    users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    scissors: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></svg>,
    clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  };
  return <>{icons[name] ?? null}</>;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ bookings }: { bookings: Booking[] }) {
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  const todayB = bookings.filter(b => b.date === today && b.status === "confirmed");
  const futureB = bookings.filter(b => b.date > today && b.status === "confirmed");
  const cancelledB = bookings.filter(b => b.status === "cancelled");
  const pastConfirmed = bookings.filter(b => b.date < today && b.status === "confirmed");
  const received = pastConfirmed.reduce((s, b) => s + b.service.price, 0);
  const pending = futureB.reduce((s, b) => s + b.service.price, 0);
  const uniqueClients = new Set(bookings.map(b => b.clientPhone)).size;

  const stats = [
    { label: "Agendamentos hoje", value: todayB.length, color: "bg-[#F2EEFB] text-[#9180C4]", icon: "calendar" },
    { label: "Agendamentos futuros", value: futureB.length, color: "bg-blue-50 text-blue-600", icon: "list" },
    { label: "Cancelados", value: cancelledB.length, color: "bg-red-50 text-red-500", icon: "clock" },
    { label: "Valores recebidos", value: formatCurrency(received), color: "bg-green-50 text-green-600", icon: "grid" },
    { label: "Valores pendentes", value: formatCurrency(pending), color: "bg-amber-50 text-amber-600", icon: "grid" },
    { label: "Total de clientes", value: uniqueClients, color: "bg-purple-50 text-purple-600", icon: "users" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-serif text-[#1E1A2E] mb-1">Dashboard</h2>
      <p className="text-sm text-[#6B6487] mb-8">
        {now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-[#DDD6F7] rounded-2xl p-5 hover:shadow-sm transition-shadow">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} />
            </div>
            <div className="text-2xl font-serif text-[#1E1A2E] mb-1">{s.value}</div>
            <div className="text-xs text-[#6B6487]">{s.label}</div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-[#1E1A2E] mb-4">Agenda de hoje</h3>
      {todayB.length === 0 ? (
        <div className="bg-[#FAF8FF] border border-[#DDD6F7] rounded-2xl p-8 text-center text-[#6B6487] text-sm">
          Nenhum agendamento para hoje.
        </div>
      ) : (
        <div className="space-y-3">
          {todayB.sort((a, b) => a.time.localeCompare(b.time)).map(b => (
            <div key={b.id} className="bg-white border border-[#DDD6F7] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#F2EEFB] flex flex-col items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-[#9180C4]">{b.time}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#1E1A2E] text-sm truncate">{b.clientName}</div>
                <div className="text-xs text-[#6B6487]">{b.service.name}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-[#9180C4]">{formatCurrency(b.service.price)}</div>
                <div className="text-xs text-[#6B6487]">{b.service.duration}min</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Agenda (week view) ───────────────────────────────────────────────────────

function Agenda({ bookings }: { bookings: Booking[] }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekStart = (offset: number) => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) + offset * 7;
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const weekStart = getWeekStart(weekOffset);
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i + 1);
    return d;
  });

  const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-[#1E1A2E]">Agenda</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWeekOffset(w => w - 1)}
            className="w-8 h-8 rounded-full border border-[#DDD6F7] flex items-center justify-center hover:border-[#9180C4] text-[#6B6487] hover:text-[#9180C4] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="text-sm font-medium text-[#1E1A2E] min-w-[180px] text-center">
            {weekDays[0].toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} —{" "}
            {weekDays[5].toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <button
            onClick={() => setWeekOffset(w => w + 1)}
            className="w-8 h-8 rounded-full border border-[#DDD6F7] flex items-center justify-center hover:border-[#9180C4] text-[#6B6487] hover:text-[#9180C4] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 gap-1 mb-2">
            <div className="text-xs text-[#6B6487] py-2 text-center" />
            {weekDays.map(d => (
              <div key={d.toISOString()} className={`text-xs font-medium py-2 text-center rounded-lg ${fmt(d) === new Date().toISOString().split("T")[0] ? "bg-[#F2EEFB] text-[#9180C4]" : "text-[#6B6487]"}`}>
                <div>{PT_DAYS[d.getDay()]}</div>
                <div className="text-base text-[#1E1A2E]">{d.getDate()}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-7 gap-1">
                <div className="text-xs text-[#6B6487] py-2 text-right pr-2">{hour}</div>
                {weekDays.map(d => {
                  const dateStr = fmt(d);
                  const booking = bookings.find(
                    b => b.date === dateStr && b.time === hour && b.status === "confirmed"
                  );
                  return (
                    <div
                      key={d.toISOString()}
                      className={`min-h-[44px] rounded-lg p-1 border ${booking ? "bg-[#F2EEFB] border-[#9180C4]/30" : "border-[#F2EEFB]"}`}
                    >
                      {booking && (
                        <div className="text-[10px] leading-tight">
                          <div className="font-semibold text-[#9180C4] truncate">{booking.clientName.split(" ")[0]}</div>
                          <div className="text-[#6B6487] truncate">{booking.service.name}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Bookings list ────────────────────────────────────────────────────────────

function BookingsList({ bookings, cancelBooking }: { bookings: Booking[]; cancelBooking: (id: string) => void }) {
  const [filter, setFilter] = useState<"all" | "confirmed" | "cancelled">("all");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const filtered = bookings
    .filter(b => filter === "all" || b.status === filter)
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

  const statusLabel = (b: Booking) => {
    if (b.status === "cancelled") return { label: "Cancelado", style: "bg-red-50 text-red-600 border-red-200" };
    if (b.date < today) return { label: "Concluído", style: "bg-[#F2EEFB] text-[#9180C4] border-[#DDD6F7]" };
    return { label: "Confirmado", style: "bg-green-50 text-green-700 border-green-200" };
  };

  return (
    <div>
      <h2 className="text-2xl font-serif text-[#1E1A2E] mb-6">Agendamentos</h2>

      <div className="flex gap-2 mb-6">
        {(["all", "confirmed", "cancelled"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${filter === f ? "bg-[#9180C4] text-white border-[#9180C4]" : "border-[#DDD6F7] text-[#6B6487] hover:border-[#9180C4] hover:text-[#9180C4]"}`}
          >
            {f === "all" ? "Todos" : f === "confirmed" ? "Confirmados" : "Cancelados"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(b => {
          const { label, style } = statusLabel(b);
          return (
            <div key={b.id} className="bg-white border border-[#DDD6F7] rounded-2xl p-4 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-[#1E1A2E] text-sm">{b.clientName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${style}`}>{label}</span>
                </div>
                <div className="text-xs text-[#6B6487]">{b.service.name} &middot; {formatDate(b.date)} &middot; {b.time}</div>
                <div className="text-xs text-[#C4BEE0] font-mono mt-0.5">{b.id}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-[#9180C4]">{formatCurrency(b.service.price)}</div>
                <div className="text-xs text-[#6B6487]">{b.clientPhone}</div>
                {b.status === "confirmed" && b.date >= today && (
                  <button
                    onClick={() => setCancelId(b.id)}
                    className="text-xs text-red-500 border border-red-200 hover:border-red-400 px-3 py-1 rounded-full transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {cancelId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-serif text-[#1E1A2E] text-center mb-2">Cancelar agendamento?</h3>
            <p className="text-[#6B6487] text-sm text-center mb-6">O horário ficará disponível para outras clientes.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 border border-[#DDD6F7] rounded-full py-2.5 text-[#6B6487] text-sm font-medium hover:border-[#9180C4] hover:text-[#9180C4] transition-colors">Voltar</button>
              <button onClick={() => { cancelBooking(cancelId); setCancelId(null); }} className="flex-1 bg-red-500 text-white rounded-full py-2.5 text-sm font-medium hover:bg-red-600 transition-colors">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Clients ──────────────────────────────────────────────────────────────────

function Clients({ bookings }: { bookings: Booking[] }) {
  const clientMap = new Map<string, { name: string; phone: string; count: number; total: number }>();
  bookings.forEach(b => {
    const key = b.clientPhone;
    if (!clientMap.has(key)) {
      clientMap.set(key, { name: b.clientName, phone: b.clientPhone, count: 0, total: 0 });
    }
    const c = clientMap.get(key)!;
    if (b.status === "confirmed") {
      c.count++;
      c.total += b.service.price;
    }
  });
  const clients = [...clientMap.values()].sort((a, b) => b.total - a.total);

  return (
    <div>
      <h2 className="text-2xl font-serif text-[#1E1A2E] mb-6">Clientes</h2>
      <div className="bg-white border border-[#DDD6F7] rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-[#FAF8FF]">
            <tr>
              {["Nome", "Telefone", "Agendamentos", "Total gasto"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B6487] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EEFB]">
            {clients.map(c => (
              <tr key={c.phone} className="hover:bg-[#FAF8FF] transition-colors">
                <td className="px-4 py-3 font-medium text-[#1E1A2E]">{c.name}</td>
                <td className="px-4 py-3 text-[#6B6487]">{c.phone}</td>
                <td className="px-4 py-3">
                  <span className="bg-[#F2EEFB] text-[#9180C4] px-2.5 py-1 rounded-full text-xs font-medium">{c.count}</span>
                </td>
                <td className="px-4 py-3 font-medium text-[#9180C4]">{formatCurrency(c.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-[#1E1A2E]">Serviços</h2>
        <button className="bg-[#9180C4] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#7660B8] transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Novo serviço
        </button>
      </div>
      <div className="bg-white border border-[#DDD6F7] rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-[#FAF8FF]">
            <tr>
              {["Serviço", "Categoria", "Duração", "Preço", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B6487] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EEFB]">
            {SERVICES.map(s => (
              <tr key={s.id} className="hover:bg-[#FAF8FF] transition-colors">
                <td className="px-4 py-3 font-medium text-[#1E1A2E]">{s.name}</td>
                <td className="px-4 py-3"><span className="bg-[#F2EEFB] text-[#9180C4] px-2.5 py-1 rounded-full text-xs">{s.category}</span></td>
                <td className="px-4 py-3 text-[#6B6487]">{s.duration >= 60 ? `${s.duration / 60}h${s.duration % 60 ? ` ${s.duration % 60}min` : ""}` : `${s.duration}min`}</td>
                <td className="px-4 py-3 font-medium text-[#9180C4]">{formatCurrency(s.price)}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-[#6B6487] hover:text-[#9180C4] transition-colors">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Hours ────────────────────────────────────────────────────────────────────

function Hours() {
  const schedule = [
    { day: "Segunda-feira", open: false, start: "", end: "" },
    { day: "Terça-feira", open: true, start: "08:00", end: "18:00" },
    { day: "Quarta-feira", open: true, start: "08:00", end: "18:00" },
    { day: "Quinta-feira", open: true, start: "08:00", end: "18:00" },
    { day: "Sexta-feira", open: true, start: "08:00", end: "18:00" },
    { day: "Sábado", open: true, start: "08:00", end: "18:00" },
    { day: "Domingo", open: false, start: "", end: "" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-serif text-[#1E1A2E] mb-6">Horários de funcionamento</h2>
      <div className="bg-white border border-[#DDD6F7] rounded-2xl overflow-hidden">
        {schedule.map((s, i) => (
          <div key={s.day} className={`flex items-center justify-between px-6 py-4 ${i < schedule.length - 1 ? "border-b border-[#F2EEFB]" : ""}`}>
            <span className="font-medium text-[#1E1A2E] text-sm">{s.day}</span>
            {s.open ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#6B6487]">{s.start} — {s.end}</span>
                <span className="bg-green-50 text-green-700 border border-green-200 text-xs px-2.5 py-1 rounded-full">Aberto</span>
              </div>
            ) : (
              <span className="bg-[#F8F8F8] text-[#C4BEE0] border border-[#DDD6F7] text-xs px-2.5 py-1 rounded-full">Fechado</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-serif text-[#1E1A2E] mb-6">Configurações</h2>
      <div className="space-y-6 max-w-xl">
        {[
          { label: "Nome do salão", value: "Salão Marias" },
          { label: "E-mail de contato", value: "contato@salaomarias.com.br" },
          { label: "Telefone", value: "(11) 99999-8888" },
          { label: "Endereço", value: "Rua das Flores, 247 — Jardim Primavera, SP" },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-[#6B6487] mb-1.5">{f.label}</label>
            <input
              defaultValue={f.value}
              className="w-full border border-[#DDD6F7] rounded-xl px-4 py-3 text-sm text-[#1E1A2E] focus:outline-none focus:border-[#9180C4] focus:ring-2 focus:ring-[#9180C4]/20 transition-all"
            />
          </div>
        ))}
        <button className="bg-[#9180C4] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#7660B8] transition-colors">
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout() {
  const { adminSection, setAdminSection, setIsAdminLoggedIn, setView, bookings, cancelBooking } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setView("home");
  };

  const renderSection = () => {
    switch (adminSection) {
      case "dashboard": return <Dashboard bookings={bookings} />;
      case "agenda": return <Agenda bookings={bookings} />;
      case "bookings": return <BookingsList bookings={bookings} cancelBooking={cancelBooking} />;
      case "clients": return <Clients bookings={bookings} />;
      case "services": return <ServicesAdmin />;
      case "hours": return <Hours />;
      case "settings": return <Settings />;
      default: return <Dashboard bookings={bookings} />;
    }
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? "" : ""}`}>
      <div className="p-5 border-b border-[#DDD6F7] flex items-center gap-3">
        <img src={logoImg} alt="Logo" className="w-9 h-9 rounded-full object-cover" />
        <div>
          <div className="font-serif text-[#9180C4] text-sm tracking-wide">MARIAS</div>
          <div className="text-[10px] text-[#6B6487] tracking-widest uppercase">Admin</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => { setAdminSection(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${adminSection === item.id ? "bg-[#9180C4] text-white" : "text-[#6B6487] hover:bg-[#F2EEFB] hover:text-[#9180C4]"}`}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-[#DDD6F7] space-y-1">
        <button
          onClick={() => setView("home")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B6487] hover:bg-[#F2EEFB] hover:text-[#9180C4] transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          Ver site
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <Icon name="logout" />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-[#FAF8FF]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-[#DDD6F7] shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-60 bg-white flex flex-col h-full shadow-xl border-r border-[#DDD6F7]">
            <Sidebar mobile />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#DDD6F7] px-6 h-14 flex items-center justify-between shrink-0">
          <button
            className="md:hidden text-[#6B6487] hover:text-[#9180C4] transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <div className="text-sm font-medium text-[#1E1A2E]">
            {NAV_ITEMS.find(n => n.id === adminSection)?.label ?? "Dashboard"}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F2EEFB] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9180C4" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
