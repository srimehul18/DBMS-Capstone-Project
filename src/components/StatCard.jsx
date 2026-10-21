
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "teal",
}) {
  const themes = {
    teal: {
      icon: "bg-[#e8faf7] text-[#16a995]",
      line: "bg-[#16a995]",
    },
    green: {
      icon: "bg-[#e7f7ee] text-[#25845b]",
      line: "bg-[#25845b]",
    },
    aqua: {
      icon: "bg-[#e9f5fb] text-[#4489a5]",
      line: "bg-[#4489a5]",
    },
    mint: {
      icon: "bg-[#eff8e8] text-[#719d4b]",
      line: "bg-[#719d4b]",
    },
  };

  const theme = themes[accent] || themes.teal;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e5efed] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#78918c]">
            {title}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#183b37]">
            {value}
          </h3>
          <p className="mt-2 text-xs text-[#91a6a1]">{subtitle}</p>
        </div>

        {Icon && (
          <div className={`rounded-xl p-3 ${theme.icon}`}>
            <Icon size={23} />
          </div>
        )}
      </div>

      <div className={`absolute bottom-0 left-0 h-1 w-full ${theme.line} opacity-70`} />
    </div>
  );
}
