
import {
  LayoutDashboard,
  Building2,
  Users,
  ReceiptText,
  Wallet,
  ClipboardList,
  BriefcaseBusiness,
  CarFront,
  Car,
  CalendarDays,
  ShieldCheck,
  ChevronLeft,
  Leaf
} from "lucide-react"

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "SOCIETY MANAGEMENT",
    items: [
      { name: "Apartments", icon: Building2 },
      { name: "Residents", icon: Users },
      { name: "Maintenance", icon: ReceiptText },
      { name: "Payments", icon: Wallet },
      { name: "Complaints", icon: ClipboardList },
      { name: "Staff", icon: BriefcaseBusiness }
    ]
  },
  {
    title: "FACILITIES",
    items: [
      { name: "Amenities", icon: CalendarDays },
      { name: "Visitors", icon: ShieldCheck }
    ]
  }
]

export default function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed
}) {
  return (
    <aside
      className={`${
        collapsed ? "w-[84px]" : "w-[260px]"
      } flex h-screen shrink-0 flex-col border-r border-[#e5efed] bg-white transition-all duration-300`}
    >
      <div className="flex h-[84px] items-center gap-3 border-b border-[#edf3f1] px-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8faf7] text-[#16a995]">
          <Leaf size={25} />
        </div>

        {!collapsed && (
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#176b5b]">
              MySociety
            </h1>
            <p className="text-[11px] font-medium tracking-wide text-[#78918c]">
              COMMUNITY PORTAL
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {navigation.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-[#91a6a1]">
                {group.title}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map(({ name, icon: Icon }) => {
                const active = activePage === name

                return (
                  <button
                    key={name}
                    title={collapsed ? name : undefined}
                    onClick={() => setActivePage(name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#e8faf7] text-[#118575]"
                        : "text-[#718781] hover:bg-[#f5fbfa] hover:text-[#176b5b]"
                    }`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={active ? 2.4 : 1.8}
                      className="shrink-0"
                    />

                    {!collapsed && <span>{name}</span>}

                    {!collapsed && active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#16a995]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#edf3f1] p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-xl p-3 text-sm text-[#78918c] hover:bg-[#f5fbfa]"
        >
          <ChevronLeft
            size={18}
            className={collapsed ? "rotate-180" : ""}
          />
          {!collapsed && "Collapse sidebar"}
        </button>
      </div>
    </aside>
  )
}
