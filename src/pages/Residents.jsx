
import ModulePage from "./ModulePage"

const secretaryColumns = [
  { key: "id", label: "Resident ID" },
  { key: "name", label: "Resident Name" },
  { key: "apartment", label: "Apartment" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", status: true },
  { key: "status", label: "Status", status: true }
]

const residentColumns = [
  { key: "id", label: "Resident ID" },
  { key: "name", label: "Resident Name" },
  { key: "apartment", label: "Apartment" },
  { key: "role", label: "Role", status: true },
  { key: "status", label: "Status", status: true }
]

const fields = [
  { key: "name", label: "Full Name" },
  { key: "apartment", label: "Apartment Number" },
  { key: "phone", label: "Phone Number", type: "tel" },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: false
  },
  {
    key: "role",
    label: "Resident Role",
    options: ["Owner", "Tenant"]
  },
  {
    key: "status",
    label: "Status",
    options: ["Active", "Inactive"]
  }
]

export default function Residents({ role }) {
  const isSecretary = role === "Secretary"

  return (
    <ModulePage
      title="Residents"
      description={
        isSecretary
          ? "Manage resident contact details and apartment assignments."
          : "Browse resident names and apartment assignments."
      }
      initialData={[]}
      columns={isSecretary ? secretaryColumns : residentColumns}
      searchKeys={["name", "apartment", "role", "status"]}
      addLabel="Add Resident"
      apiEndpoint="/residents"
      role={isSecretary ? "Secretary" : undefined}
      allowAdd={isSecretary}
      allowEdit={isSecretary}
      allowDelete={isSecretary}
      fields={fields}
    />
  )
}
