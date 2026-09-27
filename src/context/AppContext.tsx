import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Service, SERVICES } from "@/data";

export type Booking = {
  id: string;
  service: Service;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  status: "confirmed" | "cancelled";
  sessionId: string;
  createdAt: string;
};

type AppContextType = {
  view: string;
  setView: (v: string) => void;
  selectedService: Service | null;
  setSelectedService: (s: Service | null) => void;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
  clientName: string;
  setClientName: (n: string) => void;
  clientPhone: string;
  setClientPhone: (p: string) => void;
  bookings: Booking[];
  addBooking: (data: Omit<Booking, "id" | "sessionId" | "createdAt" | "status">) => string;
  cancelBooking: (id: string) => void;
  lastBookingId: string | null;
  setLastBookingId: (id: string | null) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (v: boolean) => void;
  adminSection: string;
  setAdminSection: (s: string) => void;
  sessionId: string;
};

const AppContext = createContext<AppContextType | null>(null);

function buildInitialBookings(): Booking[] {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const addDays = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return d;
  };

  const nextOpen = (offset: number) => {
    let d = addDays(offset);
    while ([0, 1].includes(d.getDay())) d.setDate(d.getDate() + 1);
    return d;
  };

  const svc = (id: number) => SERVICES.find(s => s.id === id)!;

  return [
    {
      id: "MRS-DEMO01",
      service: svc(1),
      date: fmt(today),
      time: "09:00",
      clientName: "Ana Lima",
      clientPhone: "(11) 98765-4321",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO02",
      service: svc(3),
      date: fmt(today),
      time: "11:00",
      clientName: "Carla Santos",
      clientPhone: "(11) 91234-5678",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO03",
      service: svc(5),
      date: fmt(today),
      time: "14:00",
      clientName: "Juliana Costa",
      clientPhone: "(11) 99876-5432",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO04",
      service: svc(2),
      date: fmt(nextOpen(1)),
      time: "09:00",
      clientName: "Mariana Silva",
      clientPhone: "(11) 97654-3210",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO05",
      service: svc(8),
      date: fmt(nextOpen(1)),
      time: "13:00",
      clientName: "Patricia Oliveira",
      clientPhone: "(11) 96543-2109",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO06",
      service: svc(4),
      date: fmt(nextOpen(3)),
      time: "10:00",
      clientName: "Fernanda Rocha",
      clientPhone: "(11) 95432-1098",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO07",
      service: svc(7),
      date: fmt(nextOpen(3)),
      time: "15:00",
      clientName: "Bianca Mendes",
      clientPhone: "(11) 94321-0987",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO08",
      service: svc(6),
      date: fmt(nextOpen(5)),
      time: "08:00",
      clientName: "Luciana Ferreira",
      clientPhone: "(11) 93210-9876",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO09",
      service: svc(1),
      date: fmt(addDays(-2)),
      time: "10:00",
      clientName: "Renata Alves",
      clientPhone: "(11) 92109-8765",
      status: "confirmed",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO10",
      service: svc(3),
      date: fmt(addDays(-4)),
      time: "14:00",
      clientName: "Camila Torres",
      clientPhone: "(11) 91098-7654",
      status: "cancelled",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "MRS-DEMO11",
      service: svc(5),
      date: fmt(addDays(-6)),
      time: "16:00",
      clientName: "Daniela Nunes",
      clientPhone: "(11) 90987-6543",
      status: "cancelled",
      sessionId: "demo",
      createdAt: new Date().toISOString(),
    },
  ];
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState("home");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [lastBookingId, setLastBookingId] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSection, setAdminSection] = useState("dashboard");

  const [sessionId] = useState(() => {
    let id = localStorage.getItem("marias_session");
    if (!id) {
      id = Math.random().toString(36).slice(2, 10).toUpperCase();
      localStorage.setItem("marias_session", id);
    }
    return id;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem("marias_bookings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return buildInitialBookings();
  });

  useEffect(() => {
    localStorage.setItem("marias_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (data: Omit<Booking, "id" | "sessionId" | "createdAt" | "status">) => {
    const id =
      "MRS-" +
      Date.now().toString(36).toUpperCase().slice(-6);
    const booking: Booking = {
      ...data,
      id,
      status: "confirmed",
      sessionId,
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, booking]);
    return id;
  };

  const cancelBooking = (id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  return (
    <AppContext.Provider
      value={{
        view, setView,
        selectedService, setSelectedService,
        selectedDate, setSelectedDate,
        selectedTime, setSelectedTime,
        clientName, setClientName,
        clientPhone, setClientPhone,
        bookings, addBooking, cancelBooking,
        lastBookingId, setLastBookingId,
        isAdminLoggedIn, setIsAdminLoggedIn,
        adminSection, setAdminSection,
        sessionId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
