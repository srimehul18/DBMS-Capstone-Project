
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function AppLayout({
  activePage,
  setActivePage,
  role,
  resident,
  onSwitchRole,
  allowedPages,
  children
}) {
  const [collapsed, setCollapsed] = useState(false)

  function navigateToPage(page) {
    if (allowedPages.includes(page)) {
      setActivePage(page)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5fbfa]">
      <div className="sticky top-0 h-screen">
        <Sidebar
          activePage={activePage}
          setActivePage={navigateToPage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          role={role}
          onSwitchRole={onSwitchRole}
          allowedPages={allowedPages}
        />
      </div>

      <main className="min-w-0 flex-1">
        <Header
          activePage={activePage}
          role={role}
          resident={resident}
        />

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
  )
}
