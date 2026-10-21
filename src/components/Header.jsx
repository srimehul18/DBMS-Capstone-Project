
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Header({ activePage }) {
  return (
    <header className="flex min-h-[84px] flex-wrap items-center justify-between gap-4 border-b border-[#e5efed] bg-white px-5 py-4 sm:px-8">
      <div>
        <p className="mb-1 text-xs font-medium text-[#78918c]">
          MySociety / {activePage}
        </p>
        <h2 className="text-xl font-bold text-[#183b37]">
          {activePage}
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <label className="hidden items-center gap-2 rounded-xl border border-[#e5efed] bg-[#f8fcfb] px-3 py-2.5 md:flex">
          <Search size={17} className="text-[#78918c]" />
          <input
            type="search"
            placeholder="Search anything..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-[#9aada8] lg:w-52"
          />
        </label>

        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-[#78918c] hover:bg-[#e8faf7] hover:text-[#118575]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#16a995]" />
        </button>

        <div className="hidden h-9 w-px bg-[#e5efed] sm:block" />

        <button className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8f4ed] text-sm font-bold text-[#176b5b]">
            AD
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[#183b37]">
              Admin
            </p>
            <p className="text-xs text-[#78918c]">Administrator</p>
          </div>
          <ChevronDown size={15} className="hidden text-[#78918c] sm:block" />
        </button>
      </div>
    </header>
  );
}
