
import ModulePage from "./ModulePage"

const columns = [
  { key: "id", label: "Staff ID" },
  { key: "name", label: "Staff Name" },
  { key: "role", label: "Role" },
  { key: "department", label: "Department" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status", status: true }
]

export default function Staff() {
  return (
    <ModulePage
      title="Staff"
      description="Manage society staff, roles, and contact details."
      initialData={[]}
      columns={columns}
      searchKeys={[
        "name",
        "role",
        "department",
        "phone",
        "email",
        "status"
      ]}
      addLabel="Add Staff"
      apiEndpoint="/staff"
      fields={[
        {
          key: "name",
          label: "Full Name"
        },
        {
          key: "role",
          label: "Staff Role",
          options: [
            "Security Guard",
            "Security Supervisor",
            "Electrician",
            "Plumber",
            "Maintenance Supervisor",
            "Cleaner",
            "Other"
          ]
        },
        {
          key: "department",
          label: "Department",
          required: false,
          placeholder: "e.g. Maintenance"
        },
        {
          key: "phone",
          label: "Phone Number",
          type: "tel"
        },
        {
          key: "email",
          label: "Email",
          type: "email",
          required: false
        },
        {
          key: "status",
          label: "Status",
          options: ["Active", "Inactive"]
        }
      ]}
    />
  )
}
