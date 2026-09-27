export type Service = {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
};

export const SERVICES: Service[] = [
  {
    id: 1,
    name: "Corte de Cabelo",
    description: "Corte personalizado para o seu tipo e estilo de cabelo, com lavagem e finalização incluídas.",
    duration: 60,
    price: 85,
    category: "Cabelo",
  },
  {
    id: 2,
    name: "Coloração Completa",
    description: "Coloração com produtos de alta qualidade, cobrindo os fios do comprimento à raiz.",
    duration: 120,
    price: 220,
    category: "Cabelo",
  },
  {
    id: 3,
    name: "Escova e Hidratação",
    description: "Escova profissional com tratamento de hidratação profunda para fios secos ou danificados.",
    duration: 90,
    price: 130,
    category: "Cabelo",
  },
  {
    id: 4,
    name: "Tratamento Capilar",
    description: "Reconstrução, nutrição e hidratação dos fios com produtos profissionais de alto desempenho.",
    duration: 120,
    price: 190,
    category: "Cabelo",
  },
  {
    id: 5,
    name: "Manicure",
    description: "Cuidado completo para as mãos e unhas com esmaltação e finalização impecável.",
    duration: 45,
    price: 50,
    category: "Unhas",
  },
  {
    id: 6,
    name: "Pedicure",
    description: "Tratamento completo para os pés com esfoliação, hidratação e esmaltação.",
    duration: 60,
    price: 60,
    category: "Unhas",
  },
  {
    id: 7,
    name: "Design de Sobrancelhas",
    description: "Modelagem e design de sobrancelhas com fio ou pinça, definindo o traço ideal ao seu rosto.",
    duration: 30,
    price: 45,
    category: "Estética",
  },
  {
    id: 8,
    name: "Maquiagem",
    description: "Maquiagem profissional para qualquer ocasião — dia a dia, festa ou evento especial.",
    duration: 60,
    price: 160,
    category: "Estética",
  },
];

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

export function getAvailableSlotsForService(service: Service): string[] {
  const endHour = 18;
  return TIME_SLOTS.filter(slot => {
    const [h] = slot.split(":").map(Number);
    return h + Math.ceil(service.duration / 60) <= endHour;
  });
}

export function getAvailableSlotsForDate(
  service: Service,
  date: string,
  bookings: { date: string; time: string; service: Service; status: string }[],
): string[] {
  const [year, month, day] = date.split("-").map(Number);
  const requestedDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return getAvailableSlotsForService(service).filter((slot) => {
    const [hour, minute] = slot.split(":").map(Number);
    const start = hour * 60 + minute;
    const end = start + service.duration;

    if (requestedDate.getTime() === today.getTime()) {
      const now = new Date();
      if (start <= now.getHours() * 60 + now.getMinutes()) return false;
    }

    return !bookings.some((booking) => {
      if (booking.date !== date || booking.status !== "confirmed") return false;
      const [bookedHour, bookedMinute] = booking.time.split(":").map(Number);
      const bookedStart = bookedHour * 60 + bookedMinute;
      const bookedEnd = bookedStart + booking.service.duration;
      return start < bookedEnd && end > bookedStart;
    });
  });
}

export const PT_MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export const PT_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
