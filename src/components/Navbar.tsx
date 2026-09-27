import { useState } from "react";
import { useApp } from "@/context/AppContext";
import logoImg from "@/imports/image.png";

export default function Navbar() {
  const { setView } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => {
    setView("home");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (sectionId: string) => {
    setView("home");
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const navItems = [
    { label: "Início", onClick: goHome },
    { label: "Serviços", onClick: () => { setView("services"); setMenuOpen(false); } },
    { label: "Feedback", onClick: () => goToSection("feedback") },
    { label: "Contato", onClick: () => goToSection("contato") },
    { label: "Meus Agendamentos", onClick: () => { setView("my-bookings"); setMenuOpen(false); } },
  ];

  return (
    <nav aria-label="Navegação principal" className="fixed top-0 left-0 right-0 z-50 border-b border-[#DDD6F7] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={goHome}
          aria-label="Salão Marias, início"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9180C4]"
        >
          <img src={logoImg} alt="" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-left leading-tight">
            <span className="block font-serif text-lg tracking-wide text-[#9180C4]">MARIAS</span>
            <span className="-mt-0.5 block text-[10px] uppercase tracking-widest text-[#6B6487]">salão e estética</span>
          </span>
        </button>

        <div className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} onClick={item.onClick}>{item.label}</NavLink>
          ))}
          <button
            type="button"
            onClick={() => setView("services")}
            className="rounded-full bg-[#9180C4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7660B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7660B8]"
          >
            Agendar horário
          </button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#6B6487] hover:bg-[#F2EEFB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9180C4] md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="flex flex-col gap-1 border-t border-[#DDD6F7] bg-white px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.label} onClick={item.onClick}>{item.label}</NavLink>
          ))}
          <button
            type="button"
            onClick={() => { setView("services"); setMenuOpen(false); }}
            className="mt-2 w-fit rounded-full bg-[#9180C4] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7660B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7660B8]"
          >
            Agendar horário
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md px-2 py-2 text-left text-sm font-medium text-[#6B6487] transition-colors hover:text-[#9180C4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9180C4] active:text-[#7660B8]"
    >
      {children}
    </button>
  );
}
