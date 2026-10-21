
import {
  Building2,
  Users,
  Wallet,
  ClipboardList,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import StatCard from "../components/StatCard";

const stats = [
  {
    title: "Total Apartments",
    value: "248",
    subtitle: "Across 4 residential blocks",
    icon: Building2,
    accent: "teal",
  },
  {
    title: "Registered Residents",
    value: "386",
    subtitle: "Owners and tenants",
    icon: Users,
    accent: "green",
  },
  {
    title: "Maintenance Collected",
    value: "₹3.84L",
    subtitle: "Current month · Sample data",
    icon: Wallet,
    accent: "aqua",
  },
  {
    title: "Open Complaints",
    value: "12",
    subtitle: "4 marked high priority",
    icon: ClipboardList,
    accent: "mint",
  },
];


const payments = [
  {
    id: "PAY-1001",
    resident: "Mehul",
    apartment: "A-101",
    date: "21 Oct 2026",
    amount: 3500,
    status: "Paid",
  },
  {
    id: "PAY-1002",
    resident: "Arpit",
    apartment: "A-102",
    date: "20 Oct 2026",
    amount: 3500,
    status: "Pending",
  },
  {
    id: "PAY-1003",
    resident: "Chakshu",
    apartment: "B-201",
    date: "19 Oct 2026",
    amount: 4000,
    status: "Paid",
  },
  {
    id: "PAY-1004",
    resident: "Sagar",
    apartment: "C-104",
    date: "18 Oct 2026",
    amount: 3500,
    status: "Overdue",
  },
];


const complaints = [
  {
    id: "CMP-201",
    title: "Water leakage in bathroom",
    apartment: "A-203",
    category: "Plumbing",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "CMP-202",
    title: "Lift maintenance required",
    apartment: "B-Block",
    category: "Electrical",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "CMP-203",
    title: "Garden lights not working",
    apartment: "C-101",
    category: "Electrical",
    priority: "Low",
    status: "Resolved",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-[#e7f7ee] text-[#25845b]",
    Pending: "bg-[#fff6df] text-[#a87917]",
    Overdue: "bg-[#fff0ed] text-[#c45a4a]",
    Open: "bg-[#e9f5fb] text-[#4489a5]",
    "In Progress": "bg-[#e8faf7] text-[#118575]",
    Resolved: "bg-[#e7f7ee] text-[#25845b]",
    High: "bg-[#fff0ed] text-[#c45a4a]",
    Medium: "bg-[#fff6df] text-[#a87917]",
    Low: "bg-[#e8faf7] text-[#118575]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-7">
      {/* Welcome section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e2f8f3] via-[#edf9f6] to-[#f7fcfb] p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#118575]">
            <span className="h-2 w-2 rounded-full bg-[#16a995]" />
            SOCIETY OVERVIEW
          </span>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#176b5b] sm:text-3xl">
            Welcome back, Admin!
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#668780]">
            Here's what's happening in your community today.
            Keep track of residents, maintenance and daily operations
            all in one place.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-medium text-[#53776e]">
              <CheckCircle2 size={15} className="text-[#16a995]" />
              Society portal active
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-medium text-[#53776e]">
              <Clock3 size={15} className="text-[#16a995]" />
              Wednesday, 21 October
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border-[32px] border-white/40" />
        <div className="pointer-events-none absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-[#b9eee1]/40" />
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#183b37]">
              Society at a glance
            </h2>
            <p className="mt-1 text-sm text-[#78918c]">
              A quick summary of your community.
            </p>
          </div>
          <span className="hidden rounded-lg bg-white px-3 py-2 text-xs text-[#78918c] ring-1 ring-[#e5efed] sm:inline-block">
            Sample data
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      {/* Collection summary */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e5efed] bg-white p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-[#183b37]">
                Maintenance collection
              </h2>
              <p className="mt-1 text-sm text-[#78918c]">
                Illustrative monthly payment summary
              </p>
            </div>
            <span className="rounded-lg bg-[#e8faf7] px-3 py-1.5 text-xs font-semibold text-[#118575]">
              October 2026
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#f5fbfa] p-4">
              <p className="text-xs text-[#78918c]">Total billed</p>
              <p className="mt-2 text-2xl font-bold text-[#183b37]">
                ₹6.20L
              </p>
            </div>
            <div className="rounded-xl bg-[#eaf8f0] p-4">
              <p className="text-xs text-[#56836d]">Collected</p>
              <p className="mt-2 text-2xl font-bold text-[#25845b]">
                ₹3.84L
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#25845b]">
                <ArrowUpRight size={14} /> 62% collected
              </p>
            </div>
            <div className="rounded-xl bg-[#fff8e9] p-4">
              <p className="text-xs text-[#987f4d]">Outstanding</p>
              <p className="mt-2 text-2xl font-bold text-[#a87917]">
                ₹2.36L
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#a87917]">
                <ArrowDownRight size={14} /> Pending collection
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-medium text-[#53776e]">
                Collection progress
              </span>
              <span className="font-bold text-[#118575]">62%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#e8f2ef]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#16a995] to-[#65cdb1]"
                style={{ width: "62%" }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5efed] bg-white p-5">
          <h2 className="font-bold text-[#183b37]">Complaint status</h2>
          <p className="mt-1 text-sm text-[#78918c]">
            Current sample breakdown
          </p>

          <div className="mt-6 space-y-5">
            {[
              { label: "Open", count: 5, color: "#63b9d0" },
              { label: "In Progress", count: 4, color: "#16a995" },
              { label: "Resolved", count: 3, color: "#6db58a" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#668780]">{item.label}</span>
                  <span className="font-bold text-[#183b37]">
                    {item.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#edf4f2]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.count / 12) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-[#f5fbfa] p-3 text-xs leading-5 text-[#78918c]">
            These figures are demonstration values and aren't connected
            to a live database.
          </div>
        </div>
      </section>

      {/* Recent records */}
      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-5">
        <div className="overflow-hidden rounded-2xl border border-[#e5efed] bg-white 2xl:col-span-3">
          <div className="flex items-center justify-between border-b border-[#edf3f1] p-5">
            <div>
              <h2 className="font-bold text-[#183b37]">Recent payments</h2>
              <p className="mt-1 text-xs text-[#78918c]">
                Latest maintenance transactions
              </p>
            </div>
            <span className="rounded-lg bg-[#e8faf7] px-3 py-2 text-xs font-semibold text-[#118575]">
              4 records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-[#f8fcfb] text-xs text-[#78918c]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Resident</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-[#edf3f1] hover:bg-[#f8fcfb]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#183b37]">
                        {payment.resident}
                      </p>
                      <p className="mt-1 text-xs text-[#91a6a1]">
                        {payment.apartment} · {payment.id}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#78918c]">
                      {payment.date}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#183b37]">
                      {money(payment.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e5efed] bg-white 2xl:col-span-2">
          <div className="border-b border-[#edf3f1] p-5">
            <h2 className="font-bold text-[#183b37]">Recent complaints</h2>
            <p className="mt-1 text-xs text-[#78918c]">
              Issues reported by residents
            </p>
          </div>

          <div className="divide-y divide-[#edf3f1]">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#183b37]">
                      {complaint.title}
                    </p>
                    <p className="mt-1 text-xs text-[#78918c]">
                      {complaint.id} · {complaint.apartment}
                    </p>
                  </div>
                  <StatusBadge status={complaint.priority} />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-[#78918c]">
                    {complaint.category}
                  </span>
                  <StatusBadge status={complaint.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-[#91a6a1]">
        MySociety dashboard · All figures are fictional sample data
      </p>
    </div>
  );
}
