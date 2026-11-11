import ModulePage from "./ModulePage"

const columns = [
  { key: "id", label: "Visitor ID" },
  { key: "name", label: "Visitor Name" },
  { key: "apartment", label: "Visiting Apartment" },
  { key: "phone", label: "Phone" },
  { key: "purpose", label: "Purpose" },
  { key: "entryTime", label: "Entry Time" },
  { key: "exitTime", label: "Exit Time" },
  { key: "status", label: "Status", status: true }
]

export default function Visitors({ role, resident }) {
  return (
    <ModulePage
      title="Visitors"
      description="Register visitors and automatically record their entry in the Security Log."
      apiEndpoint="/visitors"
      columns={columns}
      searchKeys={[
        "id",
        "name",
        "apartment",
        "phone",
        "purpose",
        "status"
      ]}
      addLabel="Register & Check In"
      role={role}
      resident={resident}
      allowAdd={role === "Secretary" || role === "Staff"}
      allowEdit={false}
      allowDelete={false}
      fields={[
        {
          key: "residentId",
          label: "Resident",
          optionsEndpoint: "/residents",
          placeholder: "Select a resident"
        },
        {
          key: "name",
          label: "Visitor Name",
          placeholder: "Enter visitor name"
        },
        {
          key: "phone",
          label: "Phone Number",
          placeholder: "Enter phone number",
          required: false
        },
        {
          key: "purpose",
          label: "Purpose of Visit",
          placeholder: "e.g. Delivery, Guest, Maintenance",
          required: false
        }
      ]}
    />
  )
}
