import Log from "./pages/Log"
import { useState } from "react"
import AppLayout from "./layouts/AppLayout"
import Dashboard from "./pages/Dashboard"
import Apartments from "./pages/Apartments"
import Residents from "./pages/Residents"
import Maintenance from "./pages/Maintenance"
import Payments from "./pages/Payments"
import Complaints from "./pages/Complaints"
import Staff from "./pages/Staff"
import Amenities from "./pages/Amenities"
import AmenityBookings from "./pages/AmenityBookings"
import Visitors from "./pages/Visitors"
import { ShieldCheck, UserRound, HardHat, Leaf, ArrowLeft } from "lucide-react"

const API_BASE = "http://localhost:5000/api"

const pages = {
  Dashboard,
  Apartments,
  Residents,
  Maintenance,
  Payments,
  Complaints,
  Staff,
  Amenities,
  "Amenity Bookings": AmenityBookings,
  Visitors,
  "Security Log": Log
}

const rolePermissions = {
  Secretary: Object.keys(pages),

  Resident: [
    "Dashboard",
    "Residents",
    "Maintenance",
    "Payments",
    "Amenities",
    "Amenity Bookings",
    "Complaints"
  ],

  Staff: [
    "Dashboard",
    "Complaints",
    "Visitors",
    "Security Log"
  ]
}

const roles = [
  {
    name: "Secretary",
    description: "Manage all society operations and modules",
    icon: ShieldCheck
  },
  {
    name: "Resident",
    description: "Access apartment services and personal society activities",
    icon: UserRound
  },
  {
    name: "Staff",
    description: "Handle complaints and visitor management",
    icon: HardHat
  }
]

function RoleSelection({ onSelectRole }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5fbfa] px-5 py-10">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8faf7] text-[#16a995]">
            <Leaf size={34} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#176b5b]">
            MySociety
          </h1>

          <p className="mt-2 text-sm text-[#78918c]">
            Apartment & Society Management System
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#244b43]">
            Continue as
          </h2>

          <p className="mt-2 text-sm text-[#78918c]">
            Select a role to access the relevant modules
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {roles.map(({ name, description, icon: Icon }) => (
            <button
              key={name}
              onClick={() => onSelectRole(name)}
              className="rounded-2xl border border-[#e5efed] bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#16a995] hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8faf7] text-[#16a995]">
                <Icon size={25} />
              </div>

              <h3 className="text-lg font-bold text-[#176b5b]">
                {name}
              </h3>

              <p className="mt-2 min-h-12 text-sm leading-6 text-[#78918c]">
                {description}
              </p>

              <div className="mt-5 text-sm font-semibold text-[#118575]">
                Continue as {name} →
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#91a6a1]">
          Demonstration role selection · No login required
        </p>
      </div>
    </div>
  )
}

function ResidentSelection({
  residents,
  loading,
  error,
  onSelectResident,
  onBack,
  onRetry
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5fbfa] px-5 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-[#e5efed] bg-white p-6 shadow-sm sm:p-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#65817a] transition hover:text-[#118575]"
        >
          <ArrowLeft size={17} />
          Back to role selection
        </button>

        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8faf7] text-[#16a995]">
          <UserRound size={25} />
        </div>

        <h1 className="text-2xl font-bold text-[#176b5b]">
          Select Resident
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#78918c]">
          Choose your resident record to continue to MySociety.
        </p>

        {loading ? (
          <div className="py-10 text-center text-sm text-[#78918c]">
            Loading residents...
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>

            <button
              onClick={onRetry}
              className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#176b5b] ring-1 ring-[#d9e8e4] hover:bg-[#f5fbfa]"
            >
              Try again
            </button>
          </div>
        ) : residents.length === 0 ? (
          <p className="mt-6 rounded-xl bg-[#f5fbfa] p-4 text-sm text-[#78918c]">
            No residents were found. Add a resident before continuing.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {residents.map((resident) => (
              <button
                key={resident.id}
                onClick={() => onSelectResident(resident)}
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-[#e5efed] p-4 text-left transition hover:border-[#16a995] hover:bg-[#f5fbfa]"
              >
                <div>
                  <p className="font-semibold text-[#244b43]">
                    {resident.name}
                  </p>
                  <p className="mt-1 text-sm text-[#78918c]">
                    Apartment {resident.apartment}
                  </p>
                </div>

                <span className="text-sm font-semibold text-[#118575]">
                  Select →
                </span>
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs leading-5 text-[#91a6a1]">
          Demonstration mode: selecting a resident does not verify their identity.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState(null)
  const [activePage, setActivePage] = useState("Dashboard")
  const [residents, setResidents] = useState([])
  const [selectedResident, setSelectedResident] = useState(null)
  const [loadingResidents, setLoadingResidents] = useState(false)
  const [residentError, setResidentError] = useState("")

  async function loadResidents() {
    setLoadingResidents(true)
    setResidentError("")

    try {
      const response = await fetch(`${API_BASE}/residents`)

      if (!response.ok) {
        throw new Error("Unable to load residents. Check that the backend is running.")
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error("The residents API returned an unexpected response.")
      }

      setResidents(data)
    } catch (error) {
      setResidents([])
      setResidentError(
        error.message || "Could not connect to the residents API."
      )
    } finally {
      setLoadingResidents(false)
    }
  }

  async function selectRole(selectedRole) {
    setSelectedResident(null)
    setActivePage("Dashboard")
    setRole(selectedRole)

    if (selectedRole === "Resident") {
      await loadResidents()
    }
  }

  function switchRole() {
    setRole(null)
    setSelectedResident(null)
    setActivePage("Dashboard")
    setResidents([])
    setResidentError("")
  }

  const allowedPages = role ? rolePermissions[role] : []

  const ActiveComponent = allowedPages.includes(activePage)
    ? pages[activePage]
    : Dashboard

  if (!role) {
    return <RoleSelection onSelectRole={selectRole} />
  }

  if (role === "Resident" && !selectedResident) {
    return (
      <ResidentSelection
        residents={residents}
        loading={loadingResidents}
        error={residentError}
        onSelectResident={setSelectedResident}
        onBack={switchRole}
        onRetry={loadResidents}
      />
    )
  }


  return (
    
<AppLayout
  activePage={activePage}
  setActivePage={setActivePage}
  role={role}
  resident={selectedResident}
  onSwitchRole={switchRole}
  allowedPages={allowedPages}
>
  <ActiveComponent role={role} resident={selectedResident} setActivePage={setActivePage}
/>
</AppLayout>
)}
