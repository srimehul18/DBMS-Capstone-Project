import { useEffect, useState } from "react"
import {
  Users,
  UserCheck,
  MessageSquareWarning,
  ShieldCheck,
  RefreshCw,
  Clock,
  ArrowRight,
  AlertCircle
} from "lucide-react"

const API_BASE = "http://localhost:5000/api"

function getArray(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function getDate(value) {
  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? null : date
}

function formatDateTime(value) {
  const date = getDate(value)

  if (!date) return "—"

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  })
}

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-[#e5efed] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#78918c]">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-[#176b5b]">
            {value}
          </p>

          <p className="mt-2 text-xs text-[#91a6a1]">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8faf7] text-[#16a995]">
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

function QuickAction({ title, description, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl border border-[#e5efed] bg-white p-4 text-left transition hover:border-[#16a995] hover:bg-[#f8fcfb]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8faf7] text-[#16a995]">
        <Icon size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[#244b43]">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#78918c]">
          {description}
        </p>
      </div>

      <ArrowRight size={17} className="text-[#78918c]" />
    </button>
  )
}

export default function StaffDashboard({ setActivePage }) {
  const [visitors, setVisitors] = useState([])
  const [logs, setLogs] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function loadDashboard() {
    setLoading(true)
    setError("")

    try {
      const endpoints = [
        `${API_BASE}/visitors`,
        `${API_BASE}/security-logs`,
        `${API_BASE}/complaints`
      ]

      const responses = await Promise.all(
        endpoints.map((url) => fetch(url))
      )

      const failedResponse = responses.find(
        (response) => !response.ok
      )

      if (failedResponse) {
        throw new Error(
          "Unable to load dashboard data. Check your backend and API routes."
        )
      }

      const [visitorData, logData, complaintData] =
        await Promise.all(
          responses.map((response) => response.json())
        )

      setVisitors(getArray(visitorData))
      setLogs(getArray(logData))
      setComplaints(getArray(complaintData))
    } catch (err) {
      setError(
        err.message || "Could not load staff dashboard."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const today = new Date()

  const visitorsToday = visitors.filter((visitor) => {
    const date = getDate(
      visitor.entryTime || visitor.entry_time
    )

    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }).length

  const insideCount = visitors.filter(
    (visitor) =>
      visitor.status === "Inside" &&
      !(visitor.exitTime || visitor.exit_time)
  ).length

  const pendingComplaints = complaints.filter((complaint) => {
    const status = String(
      complaint.status || ""
    ).toLowerCase()

    return ![
      "resolved",
      "closed",
      "completed"
    ].includes(status)
  }).length

  const recentLogs = [...logs]
    .sort((a, b) => {
      const dateA = getDate(a.entryTime || a.entry_time)
      const dateB = getDate(b.entryTime || b.entry_time)

      return (dateB?.getTime() || 0) -
        (dateA?.getTime() || 0)
    })
    .slice(0, 5)

  function goTo(page) {
    setActivePage(page)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[#16a995]">
            Staff workspace
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#176b5b]">
            Staff Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#78918c]">
            Monitor visitors, security activity and resident complaints.
          </p>
        </div>

        <button
          onClick={loadDashboard}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dcebe7] bg-white px-4 py-2.5 text-sm font-semibold text-[#176b5b] transition hover:bg-[#e8faf7] disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />

          <div>
            <p>{error}</p>

            <button
              onClick={loadDashboard}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Visitors Today"
          value={loading ? "—" : visitorsToday}
          description="Visitor records entered today"
          icon={Users}
        />

        <StatCard
          title="Currently Inside"
          value={loading ? "—" : insideCount}
          description="Visitors not yet checked out"
          icon={UserCheck}
        />

        <StatCard
          title="Pending Complaints"
          value={loading ? "—" : pendingComplaints}
          description="Complaints not marked resolved"
          icon={MessageSquareWarning}
        />

        <StatCard
          title="Security Records"
          value={loading ? "—" : logs.length}
          description="Total visitor log records"
          icon={ShieldCheck}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-[#e5efed] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5efed] p-5">
            <div>
              <h2 className="font-bold text-[#244b43]">
                Recent Security Activity
              </h2>

              <p className="mt-1 text-xs text-[#91a6a1]">
                Latest visitor log records
              </p>
            </div>

            <Clock size={20} className="text-[#16a995]" />
          </div>

          {loading ? (
            <p className="p-6 text-sm text-[#78918c]">
              Loading activity...
            </p>
          ) : recentLogs.length === 0 ? (
            <p className="p-6 text-sm text-[#78918c]">
              No security activity found.
            </p>
          ) : (
            <div className="divide-y divide-[#edf3f1]">
              {recentLogs.map((log) => {
                const status =
                  log.visitorStatus ||
                  log.status ||
                  "Unknown"

                return (
                  <div
                    key={log.id ?? log.log_id}
                    className="flex items-start justify-between gap-3 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#244b43]">
                        {log.visitorName ||
                          log.name ||
                          "Visitor"}
                      </p>

                      <p className="mt-1 text-xs text-[#78918c]">
                        {log.purpose || "No purpose recorded"}
                      </p>

                      <p className="mt-1 text-xs text-[#91a6a1]">
                        {formatDateTime(
                          log.entryTime || log.entry_time
                        )}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        status === "Inside"
                          ? "bg-emerald-50 text-emerald-700"
                          : status === "Checked Out"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          <div className="border-t border-[#e5efed] p-4">
            <button
              onClick={() => goTo("Security Log")}
              className="text-sm font-semibold text-[#118575] hover:underline"
            >
              Open Security Log →
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e5efed] bg-[#f8fcfb] p-5">
          <h2 className="font-bold text-[#244b43]">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-[#91a6a1]">
            Common staff tasks
          </p>

          <div className="mt-5 space-y-3">
            <QuickAction
              title="Manage Visitors"
              description="View visitor records and registrations"
              icon={Users}
              onClick={() => goTo("Visitors")}
            />

            <QuickAction
              title="Security Log"
              description="Review entries and check out visitors"
              icon={ShieldCheck}
              onClick={() => goTo("Security Log")}
            />

            <QuickAction
              title="Complaints"
              description="Review and follow up on complaints"
              icon={MessageSquareWarning}
              onClick={() => goTo("Complaints")}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
