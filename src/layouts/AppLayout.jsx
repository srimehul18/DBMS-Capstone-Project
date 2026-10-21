
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout({
  activePage,
  setActivePage,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f5fbfa]">
      <div className="sticky top-0 h-screen">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      <main className="min-w-0 flex-1">
        <Header activePage={activePage} />

        <div className="p-5 sm:p-8">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </div>

        <footer className="px-8 pb-6 text-center text-xs text-[#91a6a1]">
          MySociety · Apartment & Society Management System
        </footer>
      </main>
    </div>
  );
}
