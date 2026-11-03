
import ResidentDashboard from "./ResidentDashboard"
import SecretaryDashboard from "./SecretaryDashboard"
import StaffDashboard from "./StaffDashboard"

export default function Dashboard({
  role,
  resident,
  setActivePage
}) {
  if (role === "Resident") {
    return <ResidentDashboard resident={resident} />
  }

  if (role === "Staff") {
    return (
      <StaffDashboard
        setActivePage={setActivePage}
      />
    )
  }

  return <SecretaryDashboard />
}
