import { AppProvider, useApp } from "@/context/AppContext";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import DatePicker from "@/pages/DatePicker";
import TimePicker from "@/pages/TimePicker";
import Summary from "@/pages/Summary";
import Confirmation from "@/pages/Confirmation";
import MyBookings from "@/pages/MyBookings";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";

function Router() {
  const { view, isAdminLoggedIn } = useApp();

  if (view === "admin-login") return <AdminLogin />;
  if (view.startsWith("admin")) {
    if (!isAdminLoggedIn) return <AdminLogin />;
    return <AdminLayout />;
  }

  switch (view) {
    case "services": return <Services />;
    case "date-picker": return <DatePicker />;
    case "time-picker": return <TimePicker />;
    case "summary": return <Summary />;
    case "confirmation": return <Confirmation />;
    case "my-bookings": return <MyBookings />;
    default: return <Home />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
