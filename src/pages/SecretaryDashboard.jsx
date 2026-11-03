import { useEffect, useMemo, useState } from "react"
import {
  Building2,
  Users,
  Wallet,
  ClipboardList,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2
} from "lucide-react"
import StatCard from "../components/StatCard"

const API_BASE = "http://localhost:5000/api"

function StatusBadge({ status }) {
  const normalized = String(status || "Pending")
  const styles = {
    Paid: "bg-[#e7f7ee] text-[#25845b]",
    Successful: "bg-[#e7f7ee] text-[#25845b]",
    Pending: "bg-[#fff6df] text-[#a87917]",
    Overdue: "bg-[#fff0ed] text-[#c45a4a]",
    Failed: "bg-[#fff0ed] text-[#c45a4a]",
    Refunded: "bg-gray-100 text-gray-600",
    Open: "bg-[#e9f5fb] text-[#4489a5]",
    "In Progress": "bg-[#e8faf7] text-[#118575]",
    Resolved: "bg-[#e7f7ee] text-[#25845b]",
    Closed: "bg-[#e7f7ee] text-[#25845b]",
    High: "bg-[#fff0ed] text-[#c45a4a]",
    Medium: "bg-[#fff6df] text-[#a87917]",
    Low: "bg-[#e8faf7] text-[#118575]"
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[normalized] || "bg-gray-100 text-gray-600"}`}>
      {normalized}
    </span>
  )
}

function getRows(result) {
  if (Array.isArray(result)) return result
  if (Array.isArray(result?.data)) return result.data
  if (Array.isArray(result?.rows)) return result.rows
  return []
}

function getId(row) {
  return row.id ?? row.billId ?? row.paymentId ?? row.complaintId ?? row.apartmentId ?? row.residentId
}

function getBillMonth(bill) {
  const value = bill.billingMonth ?? bill.month ?? bill.billing_month
  return value ? String(value).slice(0, 7) : ""
}

function getPaymentDate(payment) {
  return payment.payDate ?? payment.paymentDate ?? payment.payment_date ?? payment.date
}

function getPaymentAmount(payment) {
  return Number(payment.amount ?? payment.amountPaid ?? payment.amount_paid ?? 0) || 0
}

function getPaymentStatus(payment) {
  return String(payment.status ?? "Pending").toLowerCase()
}

function isSuccessful(payment) {
  return ["successful", "paid"].includes(getPaymentStatus(payment))
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0)
}

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

export default function SecretaryDashboard() {
  const [data, setData] = useState({
    apartments: [],
    residents: [],
    maintenance: [],
    payments: [],
    complaints: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      setLoading(true)
      setError("")

      try {
        const resources = [
          ["apartments", "/apartments"],
          ["residents", "/residents"],
          ["maintenance", "/maintenance"],
          ["payments", "/payments"],
          ["complaints", "/complaints"]
        ]

        const entries = await Promise.all(
          resources.map(async ([key, path]) => {
            const response = await fetch(`${API_BASE}${path}`)
            if (!response.ok) throw new Error(`Unable to load ${key}`)
            return [key, getRows(await response.json())]
          })
        )

        if (!cancelled) setData(Object.fromEntries(entries))
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load dashboard data")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadDashboard()
    return () => {
      cancelled = true
    }
  }, [])

  const currentDate = new Date()
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`
  const monthLabel = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric"
  })

  const metrics = useMemo(() => {
    const monthBills = data.maintenance.filter((bill) => getBillMonth(bill) === currentMonth)
    const monthBillIds = new Set(monthBills.map((bill) => String(getId(bill))))

    const successfulPaymentsThisMonth = data.payments.filter((payment) => {
      const date = getPaymentDate(payment)
      return isSuccessful(payment) && date && String(date).slice(0, 7) === currentMonth
    })

    const totalBilled = monthBills.reduce((sum, bill) => {
      const amount = Number(bill.amount) || 0
      const lateFee = Number(bill.lateFee ?? bill.late_fee) || 0
      return sum + amount + lateFee
    }, 0)

    const totalCollected = successfulPaymentsThisMonth.reduce(
      (sum, payment) => sum + getPaymentAmount(payment),
      0
    )

    const outstanding = monthBills.reduce((sum, bill) => {
      const balance = bill.outstandingBalance ?? bill.outstanding_balance ?? bill.balance
      if (balance != null) return sum + Math.max(0, Number(balance) || 0)

      const billId = String(getId(bill))
      const paid = data.payments
        .filter((payment) => String(payment.billId ?? payment.bill_id) === billId && isSuccessful(payment))
        .reduce((total, payment) => total + getPaymentAmount(payment), 0)

      return sum + Math.max(0, (Number(bill.amount) || 0) + (Number(bill.lateFee ?? bill.late_fee) || 0) - paid)
    }, 0)

    const openComplaints = data.complaints.filter(
      (complaint) => !["resolved", "closed"].includes(String(complaint.status).toLowerCase())
    )

    const complaintBreakdown = [
      {
        label: "Open",
        count: data.complaints.filter((item) => String(item.status).toLowerCase() === "open").length,
        color: "#63b9d0"
      },
      {
        label: "In Progress",
        count: data.complaints.filter((item) => String(item.status).toLowerCase() === "in progress").length,
        color: "#16a995"
      },
      {
        label: "Resolved",
        count: data.complaints.filter((item) => String(item.status).toLowerCase() === "resolved").length,
        color: "#6db58a"
      }
    ]

    const recentPayments = [...data.payments]
      .sort((a, b) => new Date(getPaymentDate(b) || 0) - new Date(getPaymentDate(a) || 0))
      .slice(0, 4)

    return {
      monthBills,
      totalBilled,
      totalCollected,
      outstanding,
      openComplaints,
      complaintBreakdown,
      recentPayments,
      collectionPercent: totalBilled > 0 ? Math.min(100, Math.round((totalCollected / totalBilled) * 100)) : 0,
      monthBillIds
    }
  }, [data, currentMonth])

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#e5efed] bg-white p-10 text-center text-[#668780]">
        Loading society dashboard...
      </div>
    )
  }

  const stats = [
    {
      title: "Total Apartments",
      value: data.apartments.length.toLocaleString("en-IN"),
      subtitle: "Registered apartments",
      icon: Building2,
      accent: "teal"
    },
    {
      title: "Registered Residents",
      value: data.residents.length.toLocaleString("en-IN"),
      subtitle: "Owners and tenants",
      icon: Users,
      accent: "green"
    },
    {
      title: "Maintenance Collected",
      value: formatMoney(metrics.totalCollected),
      subtitle: "Successful payments this month",
      icon: Wallet,
      accent: "aqua"
    },
    {
      title: "Open Complaints",
      value: metrics.openComplaints.length.toLocaleString("en-IN"),
      subtitle: "Unresolved complaints",
      icon: ClipboardList,
      accent: "mint"
    }
  ]

  return (
    <div className="space-y-7">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}. Check that the backend is running and the API endpoints are available.
        </div>
      )}

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e2f8f3] via-[#edf9f6] to-[#f7fcfb] p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#118575]">
            <span className="h-2 w-2 rounded-full bg-[#16a995]" />
            SOCIETY OVERVIEW
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#176b5b] sm:text-3xl">
            Welcome back, Secretary!
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#668780]">
            Here is the latest overview of your community, maintenance collection and resident requests.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-medium text-[#53776e]">
              <CheckCircle2 size={15} className="text-[#16a995]" />
              Society portal active
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-medium text-[#53776e]">
              <Clock3 size={15} className="text-[#16a995]" />
              {currentDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border-[32px] border-white/40" />
        <div className="pointer-events-none absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-[#b9eee1]/40" />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#183b37]">Society at a glance</h2>
          <p className="mt-1 text-sm text-[#78918c]">A live summary of your community.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e5efed] bg-white p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-[#183b37]">Maintenance collection</h2>
              <p className="mt-1 text-sm text-[#78918c]">Current-month bills and successful payments</p>
            </div>
            <span className="rounded-lg bg-[#e8faf7] px-3 py-1.5 text-xs font-semibold text-[#118575]">{monthLabel}</span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#f5fbfa] p-4">
              <p className="text-xs text-[#78918c]">Total billed</p>
              <p className="mt-2 text-2xl font-bold text-[#183b37]">{formatMoney(metrics.totalBilled)}</p>
            </div>
            <div className="rounded-xl bg-[#eaf8f0] p-4">
              <p className="text-xs text-[#56836d]">Collected this month</p>
              <p className="mt-2 text-2xl font-bold text-[#25845b]">{formatMoney(metrics.totalCollected)}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#25845b]">
                <ArrowUpRight size={14} /> {metrics.collectionPercent}% of billed amount
              </p>
            </div>
            <div className="rounded-xl bg-[#fff8e9] p-4">
              <p className="text-xs text-[#987f4d]">Outstanding</p>
              <p className="mt-2 text-2xl font-bold text-[#a87917]">{formatMoney(metrics.outstanding)}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#a87917]">
                <ArrowDownRight size={14} /> Remaining on current-month bills
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-medium text-[#53776e]">Collection progress</span>
              <span className="font-bold text-[#118575]">{metrics.collectionPercent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#e8f2ef]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#16a995] to-[#65cdb1]"
                style={{ width: `${metrics.collectionPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5efed] bg-white p-5">
          <h2 className="font-bold text-[#183b37]">Complaint status</h2>
          <p className="mt-1 text-sm text-[#78918c]">Current database breakdown</p>
          <div className="mt-6 space-y-5">
            {metrics.complaintBreakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#668780]">{item.label}</span>
                  <span className="font-bold text-[#183b37]">{item.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#edf4f2]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${data.complaints.length ? (item.count / data.complaints.length) * 100 : 0}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-[#f5fbfa] p-3 text-xs leading-5 text-[#78918c]">
            {data.complaints.length} complaints recorded in the database.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-5">
        <div className="overflow-hidden rounded-2xl border border-[#e5efed] bg-white 2xl:col-span-3">
          <div className="flex items-center justify-between border-b border-[#edf3f1] p-5">
            <div>
              <h2 className="font-bold text-[#183b37]">Recent payments</h2>
              <p className="mt-1 text-xs text-[#78918c]">Latest maintenance transactions</p>
            </div>
            <span className="rounded-lg bg-[#e8faf7] px-3 py-2 text-xs font-semibold text-[#118575]">
              {metrics.recentPayments.length} records
            </span>
          </div>
          {metrics.recentPayments.length === 0 ? (
            <p className="p-5 text-sm text-[#78918c]">No payment records found.</p>
          ) : (
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
                  {metrics.recentPayments.map((payment, index) => (
                    <tr key={getId(payment) ?? index} className="border-t border-[#edf3f1] hover:bg-[#f8fcfb]">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#183b37]">
                          {payment.resident ?? payment.residentName ?? payment.name ?? `Resident ${payment.residentId ?? ""}`}
                        </p>
                        <p className="mt-1 text-xs text-[#91a6a1]">
                          {payment.apartment ?? payment.apartmentNo ?? payment.apartmentNumber ?? "Apartment not provided"}
                          {` · ${getId(payment) ?? "—"}`}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#78918c]">{formatDate(getPaymentDate(payment))}</td>
                      <td className="px-5 py-4 font-semibold text-[#183b37]">{formatMoney(getPaymentAmount(payment))}</td>
                      <td className="px-5 py-4"><StatusBadge status={payment.status ?? "Pending"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e5efed] bg-white 2xl:col-span-2">
          <div className="border-b border-[#edf3f1] p-5">
            <h2 className="font-bold text-[#183b37]">Recent complaints</h2>
            <p className="mt-1 text-xs text-[#78918c]">Issues reported by residents</p>
          </div>
          {data.complaints.length === 0 ? (
            <p className="p-5 text-sm text-[#78918c]">No complaints have been recorded.</p>
          ) : (
            <div className="divide-y divide-[#edf3f1]">
              {[...data.complaints].slice(-5).reverse().map((complaint, index) => (
                <div key={getId(complaint) ?? index} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#183b37]">
                        {complaint.title ?? complaint.subject ?? complaint.description ?? "Resident complaint"}
                      </p>
                      <p className="mt-1 text-xs text-[#78918c]">
                        {getId(complaint) ?? "—"} · {complaint.apartment ?? complaint.apartmentNo ?? complaint.apartmentNumber ?? "Apartment not provided"}
                      </p>
                    </div>
                    <StatusBadge status={complaint.priority ?? "Medium"} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-[#78918c]">{complaint.category ?? "General"}</span>
                    <StatusBadge status={complaint.status ?? "Open"} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <p className="text-center text-xs text-[#91a6a1]">MySociety dashboard · Live data from your database</p>
    </div>
  )
}
